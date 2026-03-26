'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, RefreshCw, Clock, Zap } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { Confetti, Stars } from '@/components/game';
import { useGameStore } from '@/lib/store';

// --- Manglish reaction pools ---
const CORRECT_REACTIONS = [
  "Seri! Perfect time!",
  "Adipoli! You read that clock like a pro!",
  "Wunderbar machaa! Time master!",
  "Richtig! The watchmaker is impressed!",
  "Super ayi! Clock reading level: expert!",
  "Sheriyaayi! German time = your time!",
];
const WRONG_REACTIONS = [
  "Aiyyo! That wasn't the right time!",
  "Paravaala machaa! German clocks are tricky!",
  "Not quite da... 'halb' means half TO the next hour!",
  "Hmm close! Remember: halb drei = 2:30, not 3:30!",
  "Saaramilla! Time telling takes practice!",
];
const STREAK_REACTIONS = [
  "ON FIRE! Clockwork precision!",
  "Unstoppable machaa! Swiss-level accuracy!",
  "Time Lord vibes! Keep it up!",
  "Absolute beast mode! Every second counts!",
  "Punctual like a German train!",
];

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Clock Face SVG Component ---
function ClockFace({
  hours,
  minutes,
  isWrong,
  isCorrect,
  streak,
}: {
  hours: number;
  minutes: number;
  isWrong: boolean;
  isCorrect: boolean;
  streak: number;
}) {
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;

  return (
    <div className="relative flex items-center justify-center">
      {/* Golden glow ring for streak 3+ */}
      {streak >= 3 && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 20px rgba(212,165,32,0.3)',
              '0 0 40px rgba(212,165,32,0.5)',
              '0 0 20px rgba(212,165,32,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: '100%', height: '100%' }}
        />
      )}

      {/* Correct: golden ring pulse */}
      <AnimatePresence>
        {isCorrect && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[#d4a520]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.3, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56">
        {/* Clock face background */}
        <circle cx="100" cy="100" r="95" fill="rgba(255,255,255,0.03)" />
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="rgba(245,240,232,0.2)"
          strokeWidth="3"
        />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30 - 90;
          const x1 = 100 + 75 * Math.cos((angle * Math.PI) / 180);
          const y1 = 100 + 75 * Math.sin((angle * Math.PI) / 180);
          const x2 = 100 + 85 * Math.cos((angle * Math.PI) / 180);
          const y2 = 100 + 85 * Math.sin((angle * Math.PI) / 180);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(245,240,232,0.5)"
              strokeWidth={i % 3 === 0 ? 3 : 1.5}
            />
          );
        })}

        {/* Hour numbers */}
        {[...Array(12)].map((_, i) => {
          const num = i === 0 ? 12 : i;
          const angle = i * 30 - 90;
          const x = 100 + 65 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 65 * Math.sin((angle * Math.PI) / 180);
          return (
            <text
              key={`num-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="rgba(245,240,232,0.4)"
              fontSize="12"
              fontWeight="bold"
            >
              {num}
            </text>
          );
        })}

        {/* Hour hand */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="50"
          stroke="#d4a520"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ transformOrigin: '100px 100px' }}
          animate={{
            rotate: isWrong ? [hourAngle, hourAngle + 720] : hourAngle,
          }}
          transition={
            isWrong
              ? { duration: 0.8, ease: 'easeInOut' }
              : { type: 'spring', stiffness: 50, damping: 12 }
          }
        />

        {/* Minute hand */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="rgba(245,240,232,0.9)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transformOrigin: '100px 100px' }}
          animate={{
            rotate: isWrong ? [minuteAngle, minuteAngle + 1080] : minuteAngle,
          }}
          transition={
            isWrong
              ? { duration: 0.8, ease: 'easeInOut' }
              : { type: 'spring', stiffness: 50, damping: 12 }
          }
        />

        {/* Center dot */}
        <circle cx="100" cy="100" r="5" fill="#d4a520" />
        <circle cx="100" cy="100" r="2" fill="rgba(245,240,232,0.9)" />
      </svg>
    </div>
  );
}

// --- Time question data ---
interface TimeQuestion {
  hours: number;
  minutes: number;
  correct: string;
  options: string[];
}

const ALL_TIME_QUESTIONS: TimeQuestion[] = [
  {
    hours: 3,
    minutes: 0,
    correct: 'Es ist drei Uhr',
    options: ['Es ist drei Uhr', 'Es ist halb drei', 'Es ist Viertel vor drei', 'Es ist Viertel nach drei'],
  },
  {
    hours: 7,
    minutes: 30,
    correct: 'Es ist halb acht',
    options: ['Es ist halb acht', 'Es ist halb sieben', 'Es ist sieben Uhr', 'Es ist Viertel nach sieben'],
  },
  {
    hours: 9,
    minutes: 15,
    correct: 'Es ist Viertel nach neun',
    options: ['Es ist Viertel nach neun', 'Es ist Viertel vor neun', 'Es ist halb neun', 'Es ist neun Uhr'],
  },
  {
    hours: 12,
    minutes: 0,
    correct: 'Es ist zwölf Uhr',
    options: ['Es ist zwölf Uhr', 'Es ist halb zwölf', 'Es ist Mitternacht', 'Es ist Viertel vor zwölf'],
  },
  {
    hours: 6,
    minutes: 45,
    correct: 'Es ist Viertel vor sieben',
    options: ['Es ist Viertel vor sieben', 'Es ist Viertel nach sechs', 'Es ist halb sieben', 'Es ist sechs Uhr'],
  },
  {
    hours: 1,
    minutes: 0,
    correct: 'Es ist ein Uhr',
    options: ['Es ist ein Uhr', 'Es ist halb eins', 'Es ist Viertel nach eins', 'Es ist Viertel vor eins'],
  },
  {
    hours: 10,
    minutes: 30,
    correct: 'Es ist halb elf',
    options: ['Es ist halb elf', 'Es ist halb zehn', 'Es ist zehn Uhr', 'Es ist Viertel nach zehn'],
  },
  {
    hours: 4,
    minutes: 15,
    correct: 'Es ist Viertel nach vier',
    options: ['Es ist Viertel nach vier', 'Es ist Viertel vor vier', 'Es ist halb vier', 'Es ist vier Uhr'],
  },
  {
    hours: 8,
    minutes: 45,
    correct: 'Es ist Viertel vor neun',
    options: ['Es ist Viertel vor neun', 'Es ist Viertel nach acht', 'Es ist halb neun', 'Es ist acht Uhr'],
  },
  {
    hours: 5,
    minutes: 30,
    correct: 'Es ist halb sechs',
    options: ['Es ist halb sechs', 'Es ist halb fünf', 'Es ist fünf Uhr', 'Es ist Viertel vor sechs'],
  },
  {
    hours: 2,
    minutes: 15,
    correct: 'Es ist Viertel nach zwei',
    options: ['Es ist Viertel nach zwei', 'Es ist Viertel vor zwei', 'Es ist halb zwei', 'Es ist zwei Uhr'],
  },
  {
    hours: 11,
    minutes: 45,
    correct: 'Es ist Viertel vor zwölf',
    options: ['Es ist Viertel vor zwölf', 'Es ist Viertel nach elf', 'Es ist halb zwölf', 'Es ist elf Uhr'],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function TimeAttackGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<TimeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrongClock, setIsWrongClock] = useState(false);
  const [isCorrectClock, setIsCorrectClock] = useState(false);
  const [reactionText, setReactionText] = useState('');
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generateQuestions = useCallback(() => {
    const shuffled = shuffleArray(ALL_TIME_QUESTIONS);
    const picked = shuffled.slice(0, 10).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setQuestions(picked);
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

  // End when time runs out
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
    setTimeLeft(45);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setIsWrongClock(false);
    setIsCorrectClock(false);
    setKuttanMood('thinking');
    setReactionText('');
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('complete');
    incrementGamesPlayed();
    const earnedXP = score * 8 + maxStreak * 5;
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

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedAnswer(answer);
    setShowResult(true);

    const correct = answer === questions[currentIndex].correct;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setIsCorrectClock(true);
      setIsWrongClock(false);
      setKuttanMood('happy');

      if (newStreak >= 3) {
        setReactionText(pickRandom(STREAK_REACTIONS));
      } else {
        setReactionText(pickRandom(CORRECT_REACTIONS));
      }
    } else {
      setStreak(0);
      setIsWrongClock(true);
      setIsCorrectClock(false);
      setKuttanMood('sad');
      setReactionText(pickRandom(WRONG_REACTIONS));
    }

    const delay = correct ? 1200 : 2000;
    setTimeout(() => {
      setIsWrongClock(false);
      setIsCorrectClock(false);
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
  const timerPct = (timeLeft / 45) * 100;
  const scorePct = questions.length > 0 ? (score / questions.length) * 100 : 0;

  const getCompletionData = () => {
    if (scorePct > 80)
      return {
        title: 'Time Master!',
        subtitle: "Adipoli machaa! Kuttan's watch is fixed and he's never late again!",
        emoji: '🕐',
      };
    if (scorePct >= 50)
      return {
        title: 'Getting There!',
        subtitle: 'Not bad da! A few more rounds and you\'ll be a Zeitmeister!',
        emoji: '⏰',
      };
    return {
      title: 'Keep Practicing!',
      subtitle: "Paravaala machaa! German time is confusing — 'halb drei' trips everyone up!",
      emoji: '💪',
    };
  };

  const getStars = () => {
    if (scorePct > 80) return 3;
    if (scorePct >= 50) return 2;
    if (scorePct >= 25) return 1;
    return 0;
  };

  const earnedXP = score * 8 + maxStreak * 5;

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
        {gameState === 'playing' && (
          <motion.div
            animate={{ scale: timeLeft <= 5 ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 0.4, repeat: timeLeft <= 5 ? Infinity : 0 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full font-bold glass-card"
            style={{
              borderColor: timeLeft <= 5 ? '#c0392b' : timeLeft <= 15 ? '#e67e22' : 'var(--card-border)',
              borderWidth: '1px',
              color: timeLeft <= 5 ? '#c0392b' : timeLeft <= 15 ? '#e67e22' : 'var(--foreground)',
            }}
          >
            <Clock className="w-5 h-5" />
            <span>{timeLeft}s</span>
          </motion.div>
        )}
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
              messages="Kuttan's watch broke at the Frankfurt Hauptbahnhof! He needs to read the station clocks to catch his trains. Help him tell the time in German!"
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
                🕐
              </motion.div>

              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2 gradient-text">
                Time Attack
              </h1>
              <p className="text-[var(--foreground)]/70 mb-4 text-sm">
                Read the clock and pick the correct German time phrase! Watch out for tricky
                &quot;halb&quot; and &quot;Viertel&quot; times!
              </p>

              {/* Quick tip */}
              <div
                className="glass-card p-3 mb-4 text-left text-sm"
                style={{
                  borderColor: 'rgba(212,165,32,0.3)',
                  background: 'rgba(212,165,32,0.05)',
                }}
              >
                <p className="font-bold text-[#d4a520] mb-1">Quick Tip:</p>
                <p className="text-[var(--foreground)]/60">
                  &quot;halb drei&quot; = 2:30 (half TO three), not 3:30!
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 45 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#d4a520]" /> 10 rounds
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-[#d4a520]" /> Up to 130 XP
                </span>
              </div>

              <button onClick={startGame} className="game-button text-lg w-full py-4">
                Start Time Attack
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
                        : timeLeft <= 15
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

            {/* Clock Card */}
            <motion.div
              className="glass-card p-6 mb-4 flex flex-col items-center"
              style={{
                borderColor: streak >= 3 ? 'rgba(212,165,32,0.5)' : undefined,
                boxShadow: streak >= 3 ? '0 0 30px rgba(212,165,32,0.15)' : undefined,
              }}
            >
              <p className="text-sm text-[var(--foreground)]/50 mb-3">What time is it?</p>
              <ClockFace
                hours={currentQ.hours}
                minutes={currentQ.minutes}
                isWrong={isWrongClock}
                isCorrect={isCorrectClock}
                streak={streak}
              />
              <p className="text-xs text-[var(--foreground)]/30 mt-2">
                {currentQ.hours === 0 ? 12 : currentQ.hours > 12 ? currentQ.hours - 12 : currentQ.hours}:
                {currentQ.minutes.toString().padStart(2, '0')}
              </p>
            </motion.div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const optionIsCorrect = option === currentQ.correct;
                const showCorrectGlow = showResult && optionIsCorrect;
                const showWrongShake = showResult && isSelected && !optionIsCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: showWrongShake ? [-5, 5, -5, 5, 0] : 0,
                    }}
                    transition={
                      showWrongShake
                        ? { duration: 0.3 }
                        : { delay: index * 0.08, type: 'spring', stiffness: 200 }
                    }
                    whileTap={showResult ? {} : { scale: 0.96 }}
                    className="p-4 rounded-xl text-center font-medium text-sm transition-all"
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
                        : 'none',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>

            {/* Streak message at 5+ */}
            {streak >= 5 && !showResult && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center mt-3 text-sm font-bold"
                style={{ color: '#d4a520' }}
              >
                Clockwork precision! Every train on time! 🚂
              </motion.p>
            )}
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
                animate={{ rotate: [0, 10, -10, 0] }}
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
                You told {score} out of {questions.length} times correctly!
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

              {/* Time tips */}
              <div
                className="glass-card p-3 mb-6 text-left text-xs"
                style={{
                  borderColor: 'rgba(212,165,32,0.3)',
                  background: 'rgba(212,165,32,0.05)',
                }}
              >
                <p className="font-bold text-[#d4a520] mb-1">Remember:</p>
                <p className="text-[var(--foreground)]/60">
                  halb drei = 2:30 | Viertel nach drei = 3:15 | Viertel vor drei = 2:45
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
                  Try Again
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
