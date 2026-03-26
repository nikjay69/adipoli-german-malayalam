'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, RefreshCw, Clock, Zap, Hash } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { Confetti, Stars } from '@/components/game';
import { useGameStore } from '@/lib/store';

// --- Manglish reaction pools ---
const CORRECT_REACTIONS = [
  "Seri! Exact price!",
  "Adipoli! Market maths on point!",
  "Wunderbar machaa! Shopkeeper is impressed!",
  "Richtig! That's the right price!",
  "Super ayi! You bargained perfectly!",
  "Sheriyaayi! Kochi fish market pro!",
];
const WRONG_REACTIONS = [
  "Aiyyo! Wrong price da!",
  "Paravaala machaa! German numbers are backwards!",
  "Not quite! 23 = drei-und-zwanzig (3 and 20)!",
  "Hmm! Remember: ones come BEFORE tens in German!",
  "Saaramilla! The reversed style trips everyone up!",
];
const STREAK_REACTIONS = [
  "ON FIRE! Market calculator!",
  "Rechenkönig! Math king!",
  "Unstoppable bargaining machaa!",
  "Fish market champion! Keep counting!",
  "Absolute number beast!",
];

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Number data ---
interface NumberEntry {
  number: number;
  german: string;
}

const ALL_NUMBERS: NumberEntry[] = [
  { number: 21, german: 'einundzwanzig' },
  { number: 23, german: 'dreiundzwanzig' },
  { number: 25, german: 'fünfundzwanzig' },
  { number: 27, german: 'siebenundzwanzig' },
  { number: 32, german: 'zweiunddreißig' },
  { number: 34, german: 'vierunddreißig' },
  { number: 36, german: 'sechsunddreißig' },
  { number: 38, german: 'achtunddreißig' },
  { number: 41, german: 'einundvierzig' },
  { number: 43, german: 'dreiundvierzig' },
  { number: 45, german: 'fünfundvierzig' },
  { number: 47, german: 'siebenundvierzig' },
  { number: 52, german: 'zweiundfünfzig' },
  { number: 54, german: 'vierundfünfzig' },
  { number: 56, german: 'sechsundfünfzig' },
  { number: 58, german: 'achtundfünfzig' },
  { number: 63, german: 'dreiundsechzig' },
  { number: 67, german: 'siebenundsechzig' },
  { number: 71, german: 'einundsiebzig' },
  { number: 74, german: 'vierundsiebzig' },
  { number: 76, german: 'sechsundsiebzig' },
  { number: 79, german: 'neunundsiebzig' },
  { number: 82, german: 'zweiundachtzig' },
  { number: 83, german: 'dreiundachtzig' },
  { number: 85, german: 'fünfundachtzig' },
  { number: 88, german: 'achtundachtzig' },
  { number: 91, german: 'einundneunzig' },
  { number: 93, german: 'dreiundneunzig' },
  { number: 96, german: 'sechsundneunzig' },
  { number: 99, german: 'neunundneunzig' },
];

// Generate a swapped number (swap tens and ones digits)
function swapDigits(n: number): number {
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  const swapped = ones * 10 + tens;
  return swapped >= 20 && swapped <= 99 ? swapped : n + 10 > 99 ? n - 10 : n + 10;
}

// Generate wrong options for digit mode (show number, pick digit)
function generateDigitOptions(correct: number, allNumbers: NumberEntry[]): number[] {
  const wrong: Set<number> = new Set();

  // Swapped digits version
  const swapped = swapDigits(correct);
  if (swapped !== correct) wrong.add(swapped);

  // Similar numbers
  const similar = [correct + 10, correct - 10, correct + 1, correct - 1].filter(
    (n) => n >= 20 && n <= 99 && n !== correct
  );
  for (const s of similar) {
    if (wrong.size < 3) wrong.add(s);
  }

  // Fill remaining with random
  while (wrong.size < 3) {
    const rand = allNumbers[Math.floor(Math.random() * allNumbers.length)].number;
    if (rand !== correct) wrong.add(rand);
  }

  const options = shuffleArray([correct, ...Array.from(wrong).slice(0, 3)]);
  return options;
}

// Generate wrong options for word mode (show digit, pick German word)
function generateWordOptions(correctEntry: NumberEntry, allNumbers: NumberEntry[]): string[] {
  const wrong: Set<string> = new Set();

  // Swapped version
  const swappedNum = swapDigits(correctEntry.number);
  const swappedEntry = allNumbers.find((n) => n.number === swappedNum);
  if (swappedEntry && swappedEntry.german !== correctEntry.german) {
    wrong.add(swappedEntry.german);
  }

  // Similar sounding
  const nearby = allNumbers.filter(
    (n) =>
      n.number !== correctEntry.number &&
      (Math.abs(n.number - correctEntry.number) <= 11 ||
        n.number % 10 === correctEntry.number % 10 ||
        Math.floor(n.number / 10) === Math.floor(correctEntry.number / 10))
  );
  const shuffledNearby = shuffleArray(nearby);
  for (const n of shuffledNearby) {
    if (wrong.size < 3) wrong.add(n.german);
  }

  // Fill random
  while (wrong.size < 3) {
    const rand = allNumbers[Math.floor(Math.random() * allNumbers.length)];
    if (rand.german !== correctEntry.german) wrong.add(rand.german);
  }

  return shuffleArray([correctEntry.german, ...Array.from(wrong).slice(0, 3)]);
}

interface Question {
  mode: 'word-to-digit' | 'digit-to-word';
  numberEntry: NumberEntry;
  options: (number | string)[];
  correctAnswer: number | string;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function NumberBlitzGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [reactionText, setReactionText] = useState('');
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCoinAnim, setShowCoinAnim] = useState(false);
  const [showRechenkonig, setShowRechenkonig] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generateQuestions = useCallback(() => {
    const shuffled = shuffleArray(ALL_NUMBERS);
    const picked = shuffled.slice(0, 15);
    const newQuestions: Question[] = picked.map((entry, i) => {
      // Alternate modes
      if (i % 2 === 0) {
        // Mode A: German word -> pick digit
        const options = generateDigitOptions(entry.number, ALL_NUMBERS);
        return {
          mode: 'word-to-digit' as const,
          numberEntry: entry,
          options,
          correctAnswer: entry.number,
        };
      } else {
        // Mode B: digit -> pick German word
        const options = generateWordOptions(entry, ALL_NUMBERS);
        return {
          mode: 'digit-to-word' as const,
          numberEntry: entry,
          options,
          correctAnswer: entry.german,
        };
      }
    });
    setQuestions(newQuestions);
  }, []);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && !showResult) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [gameState, showResult, currentIndex]);

  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCoins(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setKuttanMood('thinking');
    setReactionText('');
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('complete');
    incrementGamesPlayed();
    const earnedXP = score * 6 + maxStreak * 4;
    addXP(earnedXP);

    const pct = questions.length > 0 ? (score / questions.length) * 100 : 0;
    if (pct > 80) {
      setKuttanMood('celebrating');
      setShowConfetti(true);
    } else if (pct >= 50) {
      setKuttanMood('happy');
    } else {
      setKuttanMood('sad');
    }
  };

  const handleAnswer = (answer: string | number) => {
    if (showResult) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedAnswer(answer);
    setShowResult(true);

    const correct = answer === questions[currentIndex].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      setCoins((prev) => prev + 1);
      setShowCoinAnim(true);
      setTimeout(() => setShowCoinAnim(false), 600);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setTimeLeft((prev) => Math.min(prev + 2, 60));
      setKuttanMood('happy');

      if (newStreak >= 3) {
        setReactionText(pickRandom(STREAK_REACTIONS));
        if (newStreak === 3) {
          setShowRechenkonig(true);
          setTimeout(() => setShowRechenkonig(false), 1500);
        }
      } else {
        setReactionText(pickRandom(CORRECT_REACTIONS));
      }
    } else {
      setStreak(0);
      setKuttanMood('sad');
      setReactionText(pickRandom(WRONG_REACTIONS));
    }

    const delay = correct ? 800 : 1800;
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setKuttanMood('thinking');
        setReactionText('');
      } else {
        endGame();
      }
    }, delay);
  };

  const currentQ = questions[currentIndex];
  const timerPct = (timeLeft / 60) * 100;
  const scorePct = questions.length > 0 ? (score / questions.length) * 100 : 0;
  const earnedXP = score * 6 + maxStreak * 4;

  const getCompletionData = () => {
    if (scorePct > 80)
      return {
        title: 'Market Champion!',
        subtitle: "Adipoli machaa! Best fish market customer in all of Kochi! Nobody can cheat you on prices now!",
        emoji: '🐟',
      };
    if (scorePct >= 50)
      return {
        title: 'Good Bargainer!',
        subtitle: "Not bad da! You can handle most prices. A few more rounds and you'll outsmart any shopkeeper!",
        emoji: '🛒',
      };
    return {
      title: 'Keep Counting!',
      subtitle: "Paravaala machaa! German numbers are backwards compared to English — practice makes perfect!",
      emoji: '💪',
    };
  };

  const getStars = () => {
    if (scorePct > 80) return 3;
    if (scorePct >= 50) return 2;
    if (scorePct >= 25) return 1;
    return 0;
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto relative min-h-screen">
      <Confetti isActive={showConfetti} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        <div className="flex items-center gap-3">
          {gameState === 'playing' && (
            <>
              {/* Coin counter */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-full glass-card">
                <motion.span
                  className="text-lg"
                  animate={showCoinAnim ? { scale: [1, 1.4, 1], rotate: [0, 20, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  🪙
                </motion.span>
                <span className="text-sm font-bold text-[#d4a520]">{coins}</span>
              </div>
              <motion.div
                animate={{ scale: timeLeft <= 5 ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.4, repeat: timeLeft <= 5 ? Infinity : 0 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full font-bold glass-card"
                style={{
                  borderColor: timeLeft <= 5 ? '#c0392b' : timeLeft <= 10 ? '#e67e22' : 'var(--card-border)',
                  borderWidth: '1px',
                  color: timeLeft <= 5 ? '#c0392b' : timeLeft <= 10 ? '#e67e22' : 'var(--foreground)',
                }}
              >
                <Clock className="w-5 h-5" />
                <span>{timeLeft}s</span>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ==================== READY SCREEN ==================== */}
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <CharacterGuide
              messages="Kuttan is at the Kochi fish market! The prices are all in German numbers — and they go BACKWARDS! Quick, match them before the fish sells out!"
              mood="excited"
              size="lg"
              showAppu
              appuMood="happy"
              className="mb-6"
            />

            <div className="glass-card p-6 w-full text-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-6xl mb-4"
              >
                🐟
              </motion.div>

              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2 gradient-text">
                Number Blitz
              </h1>
              <p className="text-[var(--foreground)]/70 mb-4 text-sm">
                German numbers 20-99 are said BACKWARDS! 23 = &quot;drei-und-zwanzig&quot;
                (three-and-twenty). Match the prices fast!
              </p>

              {/* Quick tip */}
              <div
                className="glass-card p-3 mb-4 text-left text-sm"
                style={{
                  borderColor: 'rgba(212,165,32,0.3)',
                  background: 'rgba(212,165,32,0.05)',
                }}
              >
                <p className="font-bold text-[#d4a520] mb-1">Pattern:</p>
                <p className="text-[var(--foreground)]/60">
                  47 = <span className="text-[#ff6b9d] font-bold">sieben</span>und
                  <span className="text-[#00d9a5] font-bold">vierzig</span> (7 + 40)
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 30 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#d4a520]" /> +2s per correct
                </span>
                <span className="flex items-center gap-1">
                  <Hash className="w-4 h-4 text-[#d4a520]" /> 15 rounds
                </span>
              </div>

              {/* Wave animation at bottom */}
              <div className="relative overflow-hidden h-8 mb-4 rounded-xl">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-8"
                  style={{
                    background: 'linear-gradient(180deg, transparent, rgba(0,150,255,0.1))',
                  }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-4"
                  style={{
                    background: 'linear-gradient(180deg, transparent, rgba(0,150,255,0.15))',
                  }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
              </div>

              <button onClick={startGame} className="game-button text-lg w-full py-4">
                Start Shopping
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== PLAYING SCREEN ==================== */}
        {gameState === 'playing' && currentQ && (
          <motion.div
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
                    {score}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">Score</div>
                </div>
                {streak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full font-bold"
                    style={{
                      background:
                        streak >= 5
                          ? 'linear-gradient(135deg, #ff6b9d, #ffd93d)'
                          : streak >= 3
                          ? 'rgba(212,165,32,0.2)'
                          : 'rgba(212,165,32,0.1)',
                      color: streak >= 5 ? '#fff' : '#d4a520',
                      border: '1px solid rgba(212,165,32,0.3)',
                    }}
                  >
                    <Zap className="w-4 h-4" />
                    <span>{streak}x</span>
                    {streak >= 3 && <span className="ml-0.5">🔥</span>}
                  </motion.div>
                )}
              </div>
              <div className="text-sm text-[var(--foreground)]/50">
                {currentIndex + 1}/{questions.length}
              </div>
            </div>

            {/* Timer bar */}
            <div className="mb-4">
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: 'rgba(245,240,232,0.1)' }}
              >
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${timerPct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      timeLeft <= 5
                        ? 'linear-gradient(90deg, #c0392b, #e74c3c)'
                        : timeLeft <= 10
                        ? 'linear-gradient(90deg, #e67e22, #f39c12)'
                        : 'linear-gradient(90deg, #d4a520, #00d9a5)',
                  }}
                />
              </div>
            </div>

            {/* Kuttan reaction */}
            <AnimatePresence>
              {reactionText && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl"
                  style={{
                    background: isCorrect
                      ? 'rgba(0,217,165,0.12)'
                      : 'rgba(192,57,43,0.12)',
                    border: isCorrect
                      ? '1px solid rgba(0,217,165,0.3)'
                      : '1px solid rgba(192,57,43,0.3)',
                  }}
                >
                  <span className="text-lg">{isCorrect ? (streak >= 3 ? '🔥' : '✅') : '😬'}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)' }}
                  >
                    {reactionText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rechenkönig badge */}
            <AnimatePresence>
              {showRechenkonig && (
                <motion.div
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 mb-3"
                >
                  <span
                    className="px-4 py-2 rounded-full font-black text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #d4a520, #ffd93d)',
                      color: '#1a1a2e',
                    }}
                  >
                    👑 Rechenkönig!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question Card */}
            <motion.div
              className="glass-card p-6 mb-4 text-center"
              style={{
                borderColor: streak >= 3 ? 'rgba(212,165,32,0.5)' : undefined,
                boxShadow: streak >= 3 ? '0 0 30px rgba(212,165,32,0.15)' : undefined,
              }}
            >
              {/* Fish market price tag decoration */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🏷️
                </motion.span>
                <span className="text-xs text-[var(--foreground)]/40 uppercase tracking-wider">
                  {currentQ.mode === 'word-to-digit' ? 'What number is this?' : 'How do you say this?'}
                </span>
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🏷️
                </motion.span>
              </div>

              {currentQ.mode === 'word-to-digit' ? (
                <motion.h2
                  key={`word-${currentIndex}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] break-all"
                >
                  {currentQ.numberEntry.german}
                </motion.h2>
              ) : (
                <motion.h2
                  key={`digit-${currentIndex}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="text-5xl font-black"
                  style={{ color: '#d4a520' }}
                >
                  {currentQ.numberEntry.number}
                </motion.h2>
              )}

              {/* Show correct answer on wrong */}
              {showResult && !isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 pt-3"
                  style={{ borderTop: '1px solid rgba(245,240,232,0.1)' }}
                >
                  <p className="text-xs text-[var(--foreground)]/40 mb-1">Correct:</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--success)' }}>
                    {currentQ.mode === 'word-to-digit'
                      ? currentQ.numberEntry.number
                      : currentQ.numberEntry.german}{' '}
                    ={' '}
                    {currentQ.mode === 'word-to-digit'
                      ? currentQ.numberEntry.german
                      : currentQ.numberEntry.number}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const optionIsCorrect = option === currentQ.correctAnswer;
                const showCorrectGlow = showResult && optionIsCorrect;
                const showWrongShake = showResult && isSelected && !optionIsCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: showWrongShake ? [-5, 5, -5, 5, 0] : 0,
                    }}
                    transition={
                      showWrongShake
                        ? { duration: 0.3 }
                        : { delay: index * 0.06, type: 'spring', stiffness: 200 }
                    }
                    whileTap={showResult ? {} : { scale: 0.96 }}
                    className="p-4 rounded-xl text-center font-bold transition-all"
                    style={{
                      background: showCorrectGlow
                        ? 'rgba(0,217,165,0.2)'
                        : showWrongShake
                        ? 'rgba(192,57,43,0.2)'
                        : 'var(--card-bg)',
                      border: showCorrectGlow
                        ? '2px solid rgba(0,217,165,0.6)'
                        : showWrongShake
                        ? '2px solid rgba(192,57,43,0.6)'
                        : '2px solid var(--card-border)',
                      color: showCorrectGlow
                        ? 'var(--success)'
                        : showWrongShake
                        ? 'var(--danger)'
                        : 'var(--foreground)',
                      boxShadow: showCorrectGlow
                        ? '0 0 15px rgba(0,217,165,0.2)'
                        : showWrongShake
                        ? '0 0 15px rgba(192,57,43,0.2)'
                        : 'none',
                      backdropFilter: 'blur(8px)',
                      fontSize: currentQ.mode === 'digit-to-word' ? '0.8rem' : '1.25rem',
                    }}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>

            {/* Wave animation at bottom */}
            <div className="relative overflow-hidden h-6 mt-4 rounded-xl">
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-6"
                style={{
                  background: 'linear-gradient(180deg, transparent, rgba(0,150,255,0.08))',
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}

        {/* ==================== COMPLETE SCREEN ==================== */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="text-center mb-4"
            >
              <motion.span
                className="text-6xl inline-block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getCompletionData().emoji}
              </motion.span>
            </motion.div>

            <CharacterGuide
              messages={getCompletionData().subtitle}
              mood={kuttanMood}
              size="md"
              showAppu={scorePct > 80}
              appuMood={scorePct > 80 ? 'celebrating' : 'idle'}
              className="mb-4"
            />

            <div className="glass-card p-6 w-full text-center">
              <h1
                className="text-2xl font-bold mb-2"
                style={{
                  color:
                    scorePct > 80
                      ? 'var(--success)'
                      : scorePct >= 50
                      ? 'var(--primary)'
                      : 'var(--foreground)',
                }}
              >
                {getCompletionData().title}
              </h1>

              <div className="flex justify-center mb-4">
                <Stars rating={getStars()} size="lg" animated />
              </div>

              <p className="text-[var(--foreground)]/70 mb-6">
                You matched {score} out of {questions.length} prices correctly!
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                    {score}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">Correct</div>
                </div>
                <div className="glass-card p-3">
                  <div
                    className="text-2xl font-bold flex items-center justify-center gap-1"
                    style={{ color: '#ff6b9d' }}
                  >
                    <Zap className="w-5 h-5" />
                    {maxStreak}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">Best Streak</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: '#d4a520' }}>
                    +{earnedXP}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">XP Earned</div>
                </div>
              </div>

              {/* Number tip */}
              <div
                className="glass-card p-3 mb-6 text-left text-xs"
                style={{
                  borderColor: 'rgba(212,165,32,0.3)',
                  background: 'rgba(212,165,32,0.05)',
                }}
              >
                <p className="font-bold text-[#d4a520] mb-1">Number Pattern:</p>
                <p className="text-[var(--foreground)]/60">
                  German says ones FIRST: 45 = fünf(5)-und-vierzig(40)
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    generateQuestions();
                    setShowConfetti(false);
                    startGame();
                  }}
                  className="game-button text-base w-full py-3 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Shop Again
                </button>
                <button
                  onClick={() => router.push('/games')}
                  className="w-full py-3 rounded-xl text-base font-medium text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                  style={{ background: 'rgba(245,240,232,0.05)' }}
                >
                  Back to Games
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
