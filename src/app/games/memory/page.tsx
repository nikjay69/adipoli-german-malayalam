'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui';
import { CharacterGuide } from '@/components/character';
import { Confetti, XPGain } from '@/components/game';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary, type VocabItem } from '@/lib/content/modules';

// Manglish reaction pools
const MATCH_REACTIONS = [
  "Found it! Adipoli!",
  "Memory power machaa!",
  "Two down, keep going!",
  "Sheriyaayi! That's a pair!",
  "Kollaam! Good memory!",
  "Nailed it! Next pair!",
];
const MISMATCH_REACTIONS = [
  "Not a pair... try remembering!",
  "Close! Think harder machaa!",
  "Nope, flip again!",
  "Aiyyo! Remember where that was!",
  "Not quite! Focus!",
];
const ALL_FOUND_REACTIONS = [
  "ALL PAIRS FOUND! You're a memory champion! Adipoli da!",
  "Appu is impressed! Memory master level!",
  "Wunderbar! Every pair matched! Kuttan is proud!",
];
const HINT_MESSAGES = [
  "Psst... I think I saw a match somewhere in the top rows!",
  "Machaa... try flipping the ones you haven't touched yet!",
  "Hint: focus on remembering the last few flips!",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface MemoryCard {
  id: string;
  content: string;
  type: 'german' | 'english';
  vocabId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, learnVocabulary } = useGameStore();

  const [gameState, setGameState] = useState<'intro' | 'playing' | 'complete'>('intro');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // Character & celebration state
  const [kuttanMood, setKuttanMood] = useState<'thinking' | 'happy' | 'celebrating' | 'excited' | 'sad'>('thinking');
  const [kuttanMessage, setKuttanMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXPGain, setShowXPGain] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [showPairConfetti, setShowPairConfetti] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [lastMatchedVocabId, setLastMatchedVocabId] = useState<string | null>(null);

  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const initGame = useCallback(() => {
    const allVocab = getAllVocabulary();
    const selectedWords = shuffleArray(allVocab).slice(0, 6);

    const gameCards: MemoryCard[] = [];
    selectedWords.forEach((word, index) => {
      gameCards.push({
        id: `german-${index}`,
        content: word.german,
        type: 'german',
        vocabId: word.id,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: `english-${index}`,
        content: word.english,
        type: 'english',
        vocabId: word.id,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeElapsed(0);
    setIsChecking(false);
    setKuttanMood('thinking');
    setKuttanMessage('');
    setShowConfetti(false);
    setShowXPGain(false);
    setShowPairConfetti(false);
    setHintShown(false);
    setLastMatchedVocabId(null);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  // Hint after 30 seconds of playing
  useEffect(() => {
    if (gameState === 'playing' && !hintShown) {
      hintTimerRef.current = setTimeout(() => {
        if (matchedPairs < 6) {
          setKuttanMood('thinking');
          setKuttanMessage(pickRandom(HINT_MESSAGES));
          setHintShown(true);
        }
      }, 30000);
      return () => {
        if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, hintShown]);

  const startGame = () => {
    setGameState('playing');
  };

  const handleCardClick = (cardId: string) => {
    if (isChecking) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find(c => c.id === cardId)?.isMatched) return;
    if (flippedCards.length >= 2) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setIsChecking(true);

      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.vocabId === secondCard.vocabId && firstCard.type !== secondCard.type) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ));
          setLastMatchedVocabId(firstCard.vocabId);
          setShowPairConfetti(true);
          setTimeout(() => setShowPairConfetti(false), 800);

          setMatchedPairs(prev => {
            const newPairs = prev + 1;
            if (newPairs === 6) {
              endGame();
            } else {
              setKuttanMood('happy');
              setKuttanMessage(pickRandom(MATCH_REACTIONS));
            }
            return newPairs;
          });
          learnVocabulary(firstCard.vocabId);
          setFlippedCards([]);
          setIsChecking(false);
        }, 600);
      } else {
        // No match
        setKuttanMood('thinking');
        setKuttanMessage(pickRandom(MISMATCH_REACTIONS));
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    const baseXP = 30;
    const bonusXP = Math.max(0, 20 - Math.floor(moves / 3));
    const xp = baseXP + bonusXP;
    setEarnedXP(xp);
    addXP(xp);
    setShowConfetti(true);
    setShowXPGain(true);
    setKuttanMood('celebrating');
    setKuttanMessage(pickRandom(ALL_FOUND_REACTIONS));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Star rating based on moves
  const getStarRating = (): { stars: number; label: string; color: string } => {
    if (moves <= 15) return { stars: 3, label: 'Gold', color: '#ffd93d' };
    if (moves <= 20) return { stars: 2, label: 'Silver', color: '#c0c0c0' };
    if (moves <= 30) return { stars: 1, label: 'Bronze', color: '#cd7f32' };
    return { stars: 0, label: 'Keep practicing!', color: '#e94560' };
  };

  return (
    <div className="min-h-screen px-4 py-6 max-w-4xl mx-auto relative overflow-hidden">
      {/* Confetti layers */}
      <Confetti isActive={showConfetti} />

      {/* XP Gain popup */}
      <XPGain
        amount={earnedXP}
        isVisible={showXPGain}
        onComplete={() => setShowXPGain(false)}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        {gameState === 'playing' && (
          <div className="flex items-center gap-3">
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#ff6b9d]" />
              <span className="font-bold text-sm text-[var(--foreground)]">{moves}</span>
              <span className="text-[10px] text-[var(--foreground)]/50">moves</span>
            </div>
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ffd93d]" />
              <span className="font-bold text-sm text-[var(--foreground)]">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ===== INTRO SCREEN ===== */}
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            {/* Character intro */}
            <div className="mb-6">
              <CharacterGuide
                messages="Kuttan found pairs of German-English cards scattered on the beach! Help him find all matching pairs!"
                mood="thinking"
                size="md"
                showAppu={false}
                autoAdvanceMs={4000}
              />
            </div>

            <div className="glass-card p-6 w-full text-center">
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Memory Cards
              </h1>
              <p className="text-[var(--foreground)]/60 mb-6 text-sm">
                Flip cards and find matching German-English pairs. Remember where each card is!
              </p>
              <div className="flex items-center justify-center gap-4 mb-4 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1.5 glass-card px-3 py-1.5">
                  <span className="font-bold text-[#ff6b9d]">6</span> pairs to find
                </span>
                <span className="flex items-center gap-1.5 glass-card px-3 py-1.5">
                  <Star className="w-4 h-4 text-[#ffd93d]" /> Up to 50 XP
                </span>
              </div>

              {/* Star rating guide */}
              <div className="glass-card p-3 mb-6 text-xs text-[var(--foreground)]/50">
                <p className="mb-1 font-semibold text-[var(--foreground)]/70">Star rating:</p>
                <div className="flex justify-center gap-4">
                  <span>🥇 &le;15 moves</span>
                  <span>🥈 &le;20 moves</span>
                  <span>🥉 &le;30 moves</span>
                </div>
              </div>

              <Button onClick={startGame} size="lg" fullWidth>
                Start Game
              </Button>
            </div>
          </motion.div>
        )}

        {/* ===== PLAYING SCREEN ===== */}
        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Kuttan reaction bar */}
            <AnimatePresence mode="wait">
              {kuttanMessage && (
                <motion.div
                  key={kuttanMessage}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="shrink-0">
                    <CharacterGuide
                      messages={kuttanMessage}
                      mood={kuttanMood}
                      size="sm"
                      layout="horizontal"
                      showAppu={false}
                      autoAdvanceMs={3000}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats bar */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="glass-card px-4 py-2 text-center">
                <div className="text-xl font-bold text-[#ff6b9d]">{matchedPairs}/6</div>
                <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Pairs Found</div>
              </div>
              <div className="glass-card px-4 py-2 text-center">
                <div className="text-xl font-bold text-[var(--foreground)]/80">{moves}</div>
                <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Moves</div>
              </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {cards.map((card) => {
                const isFlipped = flippedCards.includes(card.id) || card.isMatched;
                const justMatched = card.isMatched && card.vocabId === lastMatchedVocabId;
                return (
                  <motion.div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    whileTap={{ scale: isFlipped ? 1 : 0.95 }}
                    className="aspect-square cursor-pointer"
                    style={{ perspective: '1000px' }}
                  >
                    <motion.div
                      animate={{
                        rotateY: isFlipped ? 180 : 0,
                        scale: justMatched ? [1, 1.05, 0.95] : 1,
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="relative w-full h-full"
                    >
                      {/* Card Back */}
                      <div
                        className={`absolute inset-0 rounded-xl flex items-center justify-center ${
                          card.isMatched
                            ? 'bg-[#00d9a5]/30'
                            : 'bg-gradient-to-br from-[#d4a520] to-[#e94560]'
                        } shadow-lg`}
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        {card.isMatched ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-2xl"
                          >
                            ✓
                          </motion.span>
                        ) : (
                          <span className="text-3xl text-white/90 font-bold">?</span>
                        )}
                      </div>

                      {/* Card Front */}
                      <div
                        className={`absolute inset-0 rounded-xl flex items-center justify-center p-2 ${
                          card.isMatched
                            ? 'bg-[#00d9a5]/10 border-2 border-[#00d9a5]/50 shadow-[0_0_12px_rgba(0,217,165,0.2)]'
                            : card.type === 'german'
                            ? 'bg-[#d4a520]/10 border-2 border-[#d4a520]/50'
                            : 'bg-[#27ae60]/10 border-2 border-[#27ae60]/50'
                        } backdrop-blur-sm`}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <div className="text-center">
                          {/* Language badge */}
                          <span className={`text-[9px] uppercase tracking-wider font-bold block mb-1 ${
                            card.isMatched
                              ? 'text-[#00d9a5]/70'
                              : card.type === 'german'
                              ? 'text-[#d4a520]/70'
                              : 'text-[#27ae60]/70'
                          }`}>
                            {card.type === 'german' ? '🇩🇪 DE' : '🇬🇧 EN'}
                          </span>
                          <span className={`font-semibold text-sm md:text-base ${
                            card.isMatched
                              ? 'text-[#00d9a5]'
                              : card.type === 'german'
                              ? 'text-[#ffd93d]'
                              : 'text-[#00d9a5]'
                          }`}>
                            {card.content}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mini pair-found confetti burst */}
            <AnimatePresence>
              {showPairConfetti && (
                <>
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={`pair-particle-${i}`}
                      className="absolute pointer-events-none"
                      style={{
                        left: '50%',
                        top: '50%',
                        width: 7,
                        height: 7,
                        borderRadius: i % 2 === 0 ? '50%' : '2px',
                        backgroundColor: ['#ffd93d', '#00d9a5', '#ff6b9d', '#a855f7', '#3b82f6'][i % 5],
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: (Math.cos((i * Math.PI * 2) / 10)) * 100,
                        y: (Math.sin((i * Math.PI * 2) / 10)) * 100,
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ===== COMPLETE SCREEN ===== */}
        {gameState === 'complete' && (() => {
          const rating = getStarRating();
          return (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              {/* Kuttan + Appu celebration */}
              <div className="mb-6">
                <CharacterGuide
                  messages={kuttanMessage}
                  mood="celebrating"
                  size="md"
                  showAppu={true}
                  appuMood="celebrating"
                  autoAdvanceMs={5000}
                />
              </div>

              <div className="glass-card p-6 w-full text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-gradient-to-br from-[#ffd93d] to-[#d4a520] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,217,61,0.3)]"
                >
                  <Trophy className="w-10 h-10 text-white" />
                </motion.div>

                <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                  All Pairs Found!
                </h1>
                <p className="text-[var(--foreground)]/60 mb-4 text-sm">
                  You found all 6 pairs in {moves} moves!
                </p>

                {/* Star rating display */}
                <div className="flex items-center justify-center gap-1 mb-5">
                  {[1, 2, 3].map((star) => (
                    <motion.span
                      key={star}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + star * 0.2, type: 'spring' }}
                      className="text-3xl"
                      style={{ color: star <= rating.stars ? rating.color : 'rgba(255,255,255,0.15)' }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-xs text-[var(--foreground)]/50 mb-5">
                  {rating.label} — {moves} moves
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="glass-card p-3">
                    <div className="text-xl font-bold text-[#ff6b9d]">{formatTime(timeElapsed)}</div>
                    <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Time</div>
                  </div>
                  <div className="glass-card p-3">
                    <div className="text-xl font-bold text-[var(--foreground)]/80">{moves}</div>
                    <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Moves</div>
                  </div>
                  <div className="glass-card p-3">
                    <div className="text-xl font-bold text-[#ffd93d]">+{earnedXP}</div>
                    <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">XP Earned</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={() => { initGame(); setGameState('intro'); }} fullWidth>
                    <RefreshCw className="w-5 h-5" />
                    Play Again
                  </Button>
                  <Button variant="ghost" onClick={() => router.push('/games')} fullWidth>
                    Back to Games
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
