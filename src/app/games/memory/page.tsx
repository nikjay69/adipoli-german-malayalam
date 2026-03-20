'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary, type VocabItem } from '@/lib/content/modules';

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

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

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
        isMatched: false
      });
      gameCards.push({
        id: `english-${index}`,
        content: word.english,
        type: 'english',
        vocabId: word.id,
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeElapsed(0);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

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
          setMatchedPairs(prev => {
            const newPairs = prev + 1;
            if (newPairs === 6) {
              endGame();
            }
            return newPairs;
          });
          learnVocabulary(firstCard.vocabId);
          setFlippedCards([]);
          setIsChecking(false);
        }, 600);
      } else {
        // No match
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
    addXP(baseXP + bonusXP);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        {gameState === 'playing' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-bold">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* Ready Screen */}
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="text-center">
              <div className="text-6xl mb-4">🃏</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Memory Cards
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Flip cards and find matching pairs! Match German words with their English translations.
              </p>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="font-bold">6</span> pairs to match
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Up to 50 XP
                </span>
              </div>
              <Button onClick={startGame} size="lg" fullWidth>
                Start Game
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#e94560]">{matchedPairs}/6</div>
                <div className="text-xs text-gray-500">Pairs Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0f3460]">{moves}</div>
                <div className="text-xs text-gray-500">Moves</div>
              </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {cards.map((card) => {
                const isFlipped = flippedCards.includes(card.id) || card.isMatched;
                return (
                  <motion.div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    whileTap={{ scale: isFlipped ? 1 : 0.95 }}
                    className="aspect-square cursor-pointer perspective-1000"
                  >
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="relative w-full h-full"
                    >
                      {/* Card Back */}
                      <div
                        className={`absolute inset-0 rounded-xl flex items-center justify-center backface-hidden ${
                          card.isMatched
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-br from-[#e94560] to-[#0f3460]'
                        }`}
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <span className="text-3xl text-white">?</span>
                      </div>
                      {/* Card Front */}
                      <div
                        className={`absolute inset-0 rounded-xl flex items-center justify-center p-2 backface-hidden ${
                          card.isMatched
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500'
                            : card.type === 'german'
                            ? 'bg-[#e94560]/10 border-2 border-[#e94560]'
                            : 'bg-[#0f3460]/10 border-2 border-[#0f3460]'
                        }`}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <span className={`text-center font-medium text-sm md:text-base ${
                          card.isMatched
                            ? 'text-emerald-700 dark:text-emerald-300'
                            : card.type === 'german'
                            ? 'text-[#e94560]'
                            : 'text-[#0f3460]'
                        }`}>
                          {card.content}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Complete Screen */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Excellent!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You found all pairs in {moves} moves!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#e94560]">{formatTime(timeElapsed)}</div>
                  <div className="text-xs text-gray-500">Time</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#0f3460]">{moves}</div>
                  <div className="text-xs text-gray-500">Moves</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-500">
                    +{30 + Math.max(0, 20 - Math.floor(moves / 3))}
                  </div>
                  <div className="text-xs text-gray-500">XP Earned</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={() => { initGame(); setGameState('ready'); }} fullWidth>
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </Button>
                <Button variant="ghost" onClick={() => router.push('/games')} fullWidth>
                  Back to Games
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
