'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock, Zap } from 'lucide-react';
import { Button, ProgressBar } from '@/components/ui';
import { CharacterGuide } from '@/components/character';
import { Confetti, XPGain } from '@/components/game';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary, type VocabItem } from '@/lib/content/modules';

// Manglish reaction pools
const CORRECT_REACTIONS = [
  "Adipoli! That's the one!",
  "Seri! Perfect match machaa!",
  "Nailed it! Wunderbar!",
  "Wunderbar! German-il 'adipoli'!",
  "Kollaam! You're getting good!",
  "Sheriyaayi! That's right!",
];
const WRONG_REACTIONS = [
  "Aiyyo! Close one machaa!",
  "Paravaala, try again!",
  "Almost machaa! Look carefully!",
  "Hmm... not that one! Check again!",
  "Nope! But no worries, try once more!",
];
const COMBO_REACTIONS = [
  "ON FIRE machaa!",
  "Unstoppable! Adipoli streak!",
  "Combo master! Keep going!",
];
const COMPLETION_REACTIONS = [
  "ALL MATCHED! Adipoli da! You killed it!",
  "Perfect shopping trip! Kuttan is proud!",
  "Wunderbar! Market master level unlocked!",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function WordMatchGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, learnVocabulary } = useGameStore();

  const [gameState, setGameState] = useState<'intro' | 'playing' | 'complete'>('intro');
  const [words, setWords] = useState<VocabItem[]>([]);
  const [germanWords, setGermanWords] = useState<{ word: string; id: string; matched: boolean }[]>([]);
  const [englishWords, setEnglishWords] = useState<{ word: string; id: string; matched: boolean }[]>([]);
  const [selectedGerman, setSelectedGerman] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [streak, setStreak] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [matchedPronunciation, setMatchedPronunciation] = useState<{ word: string; pronunciation: string } | null>(null);
  const [wrongFeedback, setWrongFeedback] = useState<{ german: string; english: string } | null>(null);
  const [showWrong, setShowWrong] = useState(false);

  // Character & celebration state
  const [kuttanMood, setKuttanMood] = useState<'excited' | 'happy' | 'celebrating' | 'thinking' | 'sad'>('excited');
  const [kuttanMessage, setKuttanMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXPGain, setShowXPGain] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [showMatchConfetti, setShowMatchConfetti] = useState(false);
  const [lastMatchedId, setLastMatchedId] = useState<string | null>(null);

  const startTimeRef = useRef<number>(0);

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
    // Difficulty: pick 3 short/common words + 3 longer/harder words
    const sorted = [...allVocab].sort((a, b) => a.german.length - b.german.length);
    const easyPool = sorted.slice(0, Math.ceil(sorted.length / 2));
    const hardPool = sorted.slice(Math.ceil(sorted.length / 2));
    const easyPicks = shuffleArray(easyPool).slice(0, 3);
    const hardPicks = shuffleArray(hardPool).slice(0, 3);
    const selectedWords = [...easyPicks, ...hardPicks];
    setWords(selectedWords);
    setGermanWords(shuffleArray(selectedWords.map(w => ({ word: w.german, id: w.id, matched: false }))));
    setEnglishWords(shuffleArray(selectedWords.map(w => ({ word: w.english, id: w.id, matched: false }))));
    setSelectedGerman(null);
    setSelectedEnglish(null);
    setScore(0);
    setMistakes(0);
    setTimeLeft(60);
    setShowWrong(false);
    setStreak(0);
    setShowCombo(false);
    setMatchedPronunciation(null);
    setWrongFeedback(null);
    setKuttanMood('excited');
    setKuttanMessage('');
    setShowConfetti(false);
    setShowXPGain(false);
    setShowMatchConfetti(false);
    setLastMatchedId(null);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    startTimeRef.current = Date.now();
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    const xp = Math.max(10, score * 5 - mistakes * 2);
    setEarnedXP(xp);
    addXP(xp);
    setShowConfetti(true);
    setShowXPGain(true);

    if (score === words.length) {
      setKuttanMood('celebrating');
      setKuttanMessage(pickRandom(COMPLETION_REACTIONS));
    } else if (timeLeft === 0) {
      setKuttanMood('sad');
      setKuttanMessage("Time's up! But hey, you learned some words! Try again?");
    } else {
      setKuttanMood('happy');
      setKuttanMessage(`Nice effort! ${score} out of ${words.length} matched!`);
    }
  };

  const handleGermanClick = (id: string) => {
    if (germanWords.find(w => w.id === id)?.matched) return;
    setSelectedGerman(id);
    if (selectedEnglish) {
      checkMatch(id, selectedEnglish);
    }
  };

  const handleEnglishClick = (id: string) => {
    if (englishWords.find(w => w.id === id)?.matched) return;
    setSelectedEnglish(id);
    if (selectedGerman) {
      checkMatch(selectedGerman, id);
    }
  };

  const checkMatch = (germanId: string, englishId: string) => {
    if (germanId === englishId) {
      // Correct match
      setGermanWords(prev => prev.map(w => w.id === germanId ? { ...w, matched: true } : w));
      setEnglishWords(prev => prev.map(w => w.id === englishId ? { ...w, matched: true } : w));
      setScore(prev => prev + 1);
      learnVocabulary(germanId);
      setLastMatchedId(germanId);

      // Streak tracking
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Show match confetti burst
      setShowMatchConfetti(true);
      setTimeout(() => setShowMatchConfetti(false), 800);

      if (newStreak >= 3) {
        setShowCombo(true);
        setKuttanMood('celebrating');
        setKuttanMessage(pickRandom(COMBO_REACTIONS));
        setTimeout(() => setShowCombo(false), 1500);
      } else {
        setKuttanMood('happy');
        setKuttanMessage(pickRandom(CORRECT_REACTIONS));
      }

      // Show pronunciation for matched word
      const matchedWord = words.find(w => w.id === germanId);
      if (matchedWord) {
        setMatchedPronunciation({
          word: matchedWord.german,
          pronunciation: matchedWord.pronunciation,
        });
        setTimeout(() => setMatchedPronunciation(null), 2500);
      }

      // Check if all matched
      if (score + 1 === words.length) {
        setTimeout(endGame, 700);
      }
    } else {
      // Wrong match
      setMistakes(prev => prev + 1);
      setStreak(0);
      setShowWrong(true);
      setKuttanMood('thinking');
      setKuttanMessage(pickRandom(WRONG_REACTIONS));

      const germanWord = words.find(w => w.id === germanId);
      const englishWord = words.find(w => w.id === englishId);
      if (germanWord && englishWord) {
        setWrongFeedback({
          german: `${germanWord.german} = ${germanWord.english}`,
          english: `${englishWord.german} = ${englishWord.english}`,
        });
      }
      setTimeout(() => {
        setShowWrong(false);
        setWrongFeedback(null);
      }, 2000);
    }
    setSelectedGerman(null);
    setSelectedEnglish(null);
  };

  const matchedCount = germanWords.filter(w => w.matched).length;
  const progress = words.length > 0 ? (matchedCount / words.length) * 100 : 0;
  const totalTimeTaken = startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0;
  const accuracy = score + mistakes > 0 ? Math.round((score / (score + mistakes)) * 100) : 0;

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
          <div className="flex items-center gap-2">
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ffd93d]" />
              <span className={`font-bold text-sm ${timeLeft <= 10 ? 'text-[#e94560] animate-pulse' : 'text-[var(--foreground)]'}`}>
                {timeLeft}s
              </span>
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
                messages="Kuttan is at the market in Kochi! Help him match the German words to buy the right things!"
                mood="excited"
                size="md"
                showAppu={false}
                autoAdvanceMs={4000}
              />
            </div>

            <div className="glass-card p-6 w-full text-center">
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Word Match
              </h1>
              <p className="text-[var(--foreground)]/60 mb-6 text-sm">
                Match German words with their English meanings. Tap a German word, then tap its English translation!
              </p>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1.5 glass-card px-3 py-1.5">
                  <Clock className="w-4 h-4 text-[#ffd93d]" /> 60 seconds
                </span>
                <span className="flex items-center gap-1.5 glass-card px-3 py-1.5">
                  <Star className="w-4 h-4 text-[#ffd93d]" /> Up to 30 XP
                </span>
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
                      autoAdvanceMs={2500}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-[var(--foreground)]/50 text-xs">Progress</span>
                <span className="font-medium text-[var(--foreground)]/80 text-xs">{matchedCount}/{words.length} matched</span>
              </div>
              <ProgressBar progress={progress} color="success" size="md" />
            </div>

            {/* Score, Streak, Mistakes */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="glass-card px-4 py-2 text-center">
                <div className="text-xl font-bold text-[#00d9a5]">{score}</div>
                <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Correct</div>
              </div>
              <AnimatePresence>
                {streak >= 3 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="glass-card px-4 py-2 text-center border border-[#ffd93d]/30"
                  >
                    <div className="text-xl font-bold text-[#ffd93d]">{streak}x</div>
                    <div className="text-[10px] text-[#ffd93d]/70 uppercase tracking-wide">Streak</div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="glass-card px-4 py-2 text-center">
                <div className="text-xl font-bold text-[#e94560]">{mistakes}</div>
                <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Mistakes</div>
              </div>
            </div>

            {/* Combo Popup */}
            <AnimatePresence>
              {showCombo && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 mb-3"
                >
                  <span className="text-xl font-black text-[#ffd93d] bg-[#ffd93d]/15 backdrop-blur-sm px-5 py-2 rounded-full border border-[#ffd93d]/30">
                    {streak >= 5 ? '3x' : '2x'} COMBO!
                  </span>
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                    className="text-2xl"
                  >
                    🔥
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pronunciation display on match */}
            <AnimatePresence>
              {matchedPronunciation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center mb-3 bg-[#00d9a5]/10 border border-[#00d9a5]/30 backdrop-blur-sm rounded-xl px-4 py-2.5"
                >
                  <span className="font-bold text-[#00d9a5]">{matchedPronunciation.word}</span>
                  <span className="text-[#00d9a5]/70 text-sm ml-2">— say it: &quot;{matchedPronunciation.pronunciation}&quot;</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wrong answer teaching moment */}
            <AnimatePresence>
              {wrongFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-3 bg-[#e94560]/10 border border-[#e94560]/30 backdrop-blur-sm rounded-xl px-4 py-3"
                >
                  <p className="text-xs font-semibold text-[#e94560] mb-1.5">Correct pairs:</p>
                  <p className="text-sm text-[var(--foreground)]/80">{wrongFeedback.german}</p>
                  <p className="text-sm text-[var(--foreground)]/80">{wrongFeedback.english}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Game Board */}
            <div className="grid grid-cols-2 gap-4">
              {/* German Column */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-semibold text-[#ffd93d]/70 text-center mb-2 uppercase tracking-wider">
                  🇩🇪 German
                </h3>
                {germanWords.map((item) => (
                  <motion.button
                    key={item.id + '-german'}
                    onClick={() => handleGermanClick(item.id)}
                    disabled={item.matched}
                    whileTap={{ scale: item.matched ? 1 : 0.95 }}
                    animate={
                      item.matched && lastMatchedId === item.id
                        ? { scale: [1, 1.1, 1] }
                        : showWrong && selectedGerman === item.id
                        ? { x: [-5, 5, -5, 5, 0] }
                        : {}
                    }
                    className={`w-full p-3.5 rounded-xl text-center font-medium transition-all text-sm ${
                      item.matched
                        ? 'bg-[#00d9a5]/15 text-[#00d9a5] border border-[#00d9a5]/30 opacity-60 scale-95'
                        : selectedGerman === item.id
                        ? 'bg-[#ffd93d]/20 text-[#ffd93d] border-2 border-[#ffd93d] shadow-[0_0_15px_rgba(255,217,61,0.3)]'
                        : 'bg-[#d4a520]/10 border border-[#d4a520]/20 text-[var(--foreground)] hover:border-[#ffd93d]/50 hover:bg-[#d4a520]/15 backdrop-blur-sm'
                    }`}
                  >
                    {item.word}
                    {item.matched && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 inline-block"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* English Column */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-semibold text-[#00d9a5]/70 text-center mb-2 uppercase tracking-wider">
                  🇬🇧 English
                </h3>
                {englishWords.map((item) => (
                  <motion.button
                    key={item.id + '-english'}
                    onClick={() => handleEnglishClick(item.id)}
                    disabled={item.matched}
                    whileTap={{ scale: item.matched ? 1 : 0.95 }}
                    animate={
                      item.matched && lastMatchedId === item.id
                        ? { scale: [1, 1.1, 1] }
                        : showWrong && selectedEnglish === item.id
                        ? { x: [-5, 5, -5, 5, 0] }
                        : {}
                    }
                    className={`w-full p-3.5 rounded-xl text-center font-medium transition-all text-sm ${
                      item.matched
                        ? 'bg-[#00d9a5]/15 text-[#00d9a5] border border-[#00d9a5]/30 opacity-60 scale-95'
                        : selectedEnglish === item.id
                        ? 'bg-[#00d9a5]/20 text-[#00d9a5] border-2 border-[#00d9a5] shadow-[0_0_15px_rgba(0,217,165,0.3)]'
                        : 'bg-[#27ae60]/10 border border-[#27ae60]/20 text-[var(--foreground)] hover:border-[#00d9a5]/50 hover:bg-[#27ae60]/15 backdrop-blur-sm'
                    }`}
                  >
                    {item.word}
                    {item.matched && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 inline-block"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mini match confetti burst (per-match) */}
            <AnimatePresence>
              {showMatchConfetti && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`match-particle-${i}`}
                      className="absolute pointer-events-none"
                      style={{
                        left: '50%',
                        top: '40%',
                        width: 6,
                        height: 6,
                        borderRadius: i % 2 === 0 ? '50%' : '1px',
                        backgroundColor: ['#ffd93d', '#00d9a5', '#ff6b9d', '#a855f7'][i % 4],
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: (Math.cos((i * Math.PI * 2) / 8)) * 80,
                        y: (Math.sin((i * Math.PI * 2) / 8)) * 80,
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ===== COMPLETE SCREEN ===== */}
        {gameState === 'complete' && (
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
                showAppu={score === words.length}
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
                {score === words.length ? 'Perfect Run!' : timeLeft > 0 ? 'Great Job!' : "Time's Up!"}
              </h1>
              <p className="text-[var(--foreground)]/60 mb-6 text-sm">
                {score === words.length
                  ? `All ${words.length} words matched in ${60 - timeLeft}s! Adipoli!`
                  : `You matched ${score} out of ${words.length} words.`}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="glass-card p-3">
                  <div className="text-xl font-bold text-[#00d9a5]">{score}/{words.length}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Matched</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-xl font-bold text-[#e94560]">{mistakes}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Mistakes</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-xl font-bold text-[#ffd93d]">+{earnedXP}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">XP Earned</div>
                </div>
              </div>

              {/* Extra stats row */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass-card p-3">
                  <div className="text-lg font-bold text-[var(--foreground)]/80">
                    <Clock className="w-4 h-4 inline mr-1 text-[#ffd93d]" />
                    {60 - timeLeft}s
                  </div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Time Taken</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-lg font-bold text-[var(--foreground)]/80">
                    <Zap className="w-4 h-4 inline mr-1 text-[#00d9a5]" />
                    {accuracy}%
                  </div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Accuracy</div>
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
        )}
      </AnimatePresence>
    </div>
  );
}
