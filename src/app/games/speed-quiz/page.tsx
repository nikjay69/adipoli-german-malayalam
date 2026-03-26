'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, RefreshCw, Clock, Zap } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import { Confetti, Stars } from '@/components/game';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary, type VocabItem } from '@/lib/content/modules';

// --- Manglish reaction pools ---
const CORRECT_REACTIONS = [
  "Seri! That's right!",
  "Adipoli answer!",
  "Richtig! Embassy officer approves!",
  "Super machaa!",
  "Nailed it da!",
  "Officer nodding approvingly!",
];
const WRONG_REACTIONS = [
  "Aiyyo! Not quite...",
  "Paravaala, next one!",
  "Almost da!",
  "Hmm, the officer raised an eyebrow...",
  "Saaramilla, keep going!",
];
const STREAK_REACTIONS = [
  "ON FIRE!",
  "Unstoppable machaa!",
  "Visa is YOURS at this rate!",
  "Embassy officer clapping!",
  "Absolute beast mode!",
];

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Question {
  word: VocabItem;
  options: string[];
  correctAnswer: string;
}

export default function SpeedQuizGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, learnVocabulary } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'result' | 'complete'>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [reactionText, setReactionText] = useState('');
  const [kuttanMood, setKuttanMood] = useState<'excited' | 'happy' | 'thinking' | 'celebrating' | 'sad'>('excited');
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateQuestions = useCallback(() => {
    const allVocab = getAllVocabulary();
    const shuffledVocab = shuffleArray(allVocab);

    const newQuestions: Question[] = shuffledVocab.slice(0, 15).map(word => {
      const wrongAnswers = shuffleArray(
        allVocab.filter(v => v.id !== word.id).map(v => v.english)
      ).slice(0, 3);

      return {
        word,
        options: shuffleArray([word.english, ...wrongAnswers]),
        correctAnswer: word.english,
      };
    });

    setQuestions(newQuestions);
  }, []);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && !showResult) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
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
  }, [gameState, showResult, currentQuestion]);

  // End game when time runs out
  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
    setKuttanMood('thinking');
    setReactionText('');
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('complete');
    incrementGamesPlayed();
    const earnedXP = score * 5 + maxStreak * 3;
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

    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      learnVocabulary(questions[currentQuestion].word.id);
      setTimeLeft(prev => Math.min(prev + 2, 30));
      setKuttanMood('happy');

      if (newStreak >= 5) {
        setReactionText(pickRandom(STREAK_REACTIONS));
      } else if (newStreak >= 3) {
        setReactionText(pickRandom(STREAK_REACTIONS));
      } else {
        setReactionText(pickRandom(CORRECT_REACTIONS));
      }
    } else {
      setStreak(0);
      setKuttanMood('sad');
      setReactionText(pickRandom(WRONG_REACTIONS));
    }

    // Show correct answer for 1.5s on wrong, 0.8s on correct
    const delay = correct ? 800 : 1500;

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setKuttanMood('thinking');
        setReactionText('');
      } else {
        endGame();
      }
    }, delay);
  };

  const currentQ = questions[currentQuestion];
  const timerPct = (timeLeft / 30) * 100;
  const scorePct = questions.length > 0 ? (score / questions.length) * 100 : 0;

  // Visa decision text
  const getVisaDecision = () => {
    if (scorePct > 80) return { title: 'VISA APPROVED!', subtitle: "Kuttan is going to Germany!", emoji: '✈️' };
    if (scorePct >= 50) return { title: 'More Proof Needed', subtitle: "The officer needs more proof... but you did well!", emoji: '📋' };
    return { title: 'Try Again', subtitle: "Don't worry, you can try the interview again!", emoji: '💪' };
  };

  const getStars = () => {
    if (scorePct > 80) return 3;
    if (scorePct >= 50) return 2;
    if (scorePct >= 25) return 1;
    return 0;
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto relative">
      <Confetti isActive={showConfetti} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        {gameState === 'playing' && (
          <motion.div
            animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3, repeat: timeLeft <= 5 ? Infinity : 0 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full font-bold glass-card"
            style={{
              borderColor: timeLeft <= 5 ? 'var(--danger)' : 'var(--primary)',
              borderWidth: '1px',
              color: timeLeft <= 5 ? 'var(--danger)' : 'var(--primary)',
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
            {/* Character intro */}
            <CharacterGuide
              messages="Kuttan is at the German Embassy for his visa interview! Answer quickly to impress the officer!"
              mood="excited"
              size="lg"
              showAppu
              appuMood="happy"
              className="mb-6"
            />

            <div className="glass-card p-6 w-full text-center">
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2 gradient-text">
                Speed Quiz
              </h1>
              <p className="text-[var(--foreground)]/70 mb-4 text-sm">
                The visa officer will test your German! Answer fast — each correct answer buys you +2 seconds!
              </p>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 30 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[var(--primary)]" /> +2s per correct
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-[var(--primary)]" /> Up to 100 XP
                </span>
              </div>

              <button onClick={startGame} className="game-button text-lg w-full py-4">
                Start Interview
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== PLAYING SCREEN ==================== */}
        {gameState === 'playing' && currentQ && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-[var(--primary)]">{score}</div>
                  <div className="text-xs text-[var(--foreground)]/50">Score</div>
                </div>
                {streak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full font-bold"
                    style={{
                      background: streak >= 5
                        ? 'linear-gradient(135deg, #ff6b9d, #ffd93d)'
                        : streak >= 3
                        ? 'rgba(255, 107, 157, 0.2)'
                        : 'rgba(212, 165, 32, 0.15)',
                      color: streak >= 5 ? '#fff' : 'var(--primary)',
                      border: streak >= 3 ? '1px solid rgba(255, 107, 157, 0.4)' : '1px solid rgba(212, 165, 32, 0.2)',
                    }}
                  >
                    <Zap className="w-4 h-4" />
                    <span>{streak}x</span>
                    {streak >= 3 && <span className="ml-0.5">🔥</span>}
                  </motion.div>
                )}
              </div>
              <div className="text-sm text-[var(--foreground)]/50">
                Question {currentQuestion + 1}/{questions.length}
              </div>
            </div>

            {/* Timer Bar - smooth gradient that turns red */}
            <div className="mb-4">
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(245, 240, 232, 0.1)' }}>
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${timerPct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: timeLeft <= 5
                      ? 'linear-gradient(90deg, #c0392b, #e74c3c)'
                      : timeLeft <= 10
                      ? 'linear-gradient(90deg, #e67e22, #f39c12)'
                      : 'linear-gradient(90deg, #d4a520, #00d9a5)',
                  }}
                />
              </div>
            </div>

            {/* Kuttan reaction (compact, inline) */}
            <AnimatePresence>
              {reactionText && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl"
                  style={{
                    background: isCorrect
                      ? 'rgba(0, 217, 165, 0.12)'
                      : 'rgba(192, 57, 43, 0.12)',
                    border: isCorrect
                      ? '1px solid rgba(0, 217, 165, 0.3)'
                      : '1px solid rgba(192, 57, 43, 0.3)',
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

            {/* Question Card */}
            <div
              className="glass-card p-6 mb-4 text-center"
              style={{
                borderColor: streak >= 5 ? 'rgba(212, 165, 32, 0.5)' : undefined,
                boxShadow: streak >= 5 ? '0 0 20px rgba(212, 165, 32, 0.15)' : undefined,
              }}
            >
              <p className="text-sm text-[var(--foreground)]/50 mb-2">
                What does this mean?
              </p>
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-1">
                {currentQ.word.german}
              </h2>
              <p className="text-sm text-[var(--foreground)]/40">/{currentQ.word.pronunciation}/</p>

              {/* Show correct answer on wrong */}
              {showResult && !isCorrect && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 pt-3"
                  style={{ borderTop: '1px solid rgba(245, 240, 232, 0.1)' }}
                >
                  <p className="text-xs text-[var(--foreground)]/40 mb-1">Correct answer:</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--success)' }}>
                    {currentQ.correctAnswer}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Options - 2x2 grid with glass styling */}
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
                    whileTap={{ scale: showResult ? 1 : 0.95 }}
                    animate={showWrongShake ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={showWrongShake ? { duration: 0.3 } : undefined}
                    className="p-4 rounded-xl text-center font-medium transition-all"
                    style={{
                      background: showCorrectGlow
                        ? 'rgba(0, 217, 165, 0.2)'
                        : showWrongShake
                        ? 'rgba(192, 57, 43, 0.2)'
                        : 'var(--card-bg)',
                      border: showCorrectGlow
                        ? '2px solid rgba(0, 217, 165, 0.6)'
                        : showWrongShake
                        ? '2px solid rgba(192, 57, 43, 0.6)'
                        : '2px solid var(--card-border)',
                      color: showCorrectGlow
                        ? 'var(--success)'
                        : showWrongShake
                        ? 'var(--danger)'
                        : 'var(--foreground)',
                      boxShadow: showCorrectGlow
                        ? '0 0 15px rgba(0, 217, 165, 0.2)'
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
                style={{ color: 'var(--primary)' }}
              >
                The officer is VERY impressed! Visa looking good! ✈️
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
            {/* Visa Decision */}
            <motion.div
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="text-center mb-4"
            >
              <span className="text-6xl">{getVisaDecision().emoji}</span>
            </motion.div>

            {/* Character */}
            <CharacterGuide
              messages={getVisaDecision().subtitle}
              mood={kuttanMood as 'celebrating' | 'happy' | 'sad'}
              size="md"
              showAppu={scorePct > 80}
              appuMood={scorePct > 80 ? 'celebrating' : 'idle'}
              className="mb-4"
            />

            <div className="glass-card p-6 w-full text-center">
              <h1
                className="text-2xl font-bold mb-2"
                style={{
                  color: scorePct > 80 ? 'var(--success)' : scorePct >= 50 ? 'var(--primary)' : 'var(--foreground)',
                }}
              >
                {getVisaDecision().title}
              </h1>

              {/* Stars */}
              <div className="flex justify-center mb-4">
                <Stars rating={getStars()} size="lg" animated />
              </div>

              <p className="text-[var(--foreground)]/70 mb-6">
                You answered {score} out of {questions.length} correctly!
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{score}</div>
                  <div className="text-xs text-[var(--foreground)]/50">Correct</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold flex items-center justify-center gap-1" style={{ color: '#ff6b9d' }}>
                    <Zap className="w-5 h-5" />{maxStreak}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">Best Streak</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                    +{score * 5 + maxStreak * 3}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">XP Earned</div>
                </div>
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
                  Try Interview Again
                </button>
                <button
                  onClick={() => router.push('/games')}
                  className="w-full py-3 rounded-xl text-base font-medium text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                  style={{ background: 'rgba(245, 240, 232, 0.05)' }}
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
