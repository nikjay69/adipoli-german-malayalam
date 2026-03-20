'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock, Zap } from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary, type VocabItem } from '@/lib/content/modules';

interface Question {
  word: VocabItem;
  options: string[];
  correctAnswer: string;
}

export default function SpeedQuizGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, learnVocabulary } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

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
        correctAnswer: word.english
      };
    });

    setQuestions(newQuestions);
  }, []);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [gameState, timeLeft, showResult]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    const earnedXP = score * 5 + maxStreak * 3;
    addXP(earnedXP);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        return newStreak;
      });
      learnVocabulary(questions[currentQuestion].word.id);
      setTimeLeft(prev => Math.min(prev + 2, 30)); // Bonus time
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endGame();
      }
    }, 500);
  };

  const currentQ = questions[currentQuestion];

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
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3, repeat: timeLeft <= 5 ? Infinity : 0 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold ${
                timeLeft <= 5 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span>{timeLeft}s</span>
            </motion.div>
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
              <div className="text-6xl mb-4">⚡</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Speed Quiz
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Answer as many questions as you can! Each correct answer gives you +2 seconds. Build your streak for bonus XP!
              </p>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 30 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" /> +2s per correct
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Up to 100 XP
                </span>
              </div>
              <Button onClick={startGame} size="lg" fullWidth>
                Start Quiz
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && currentQ && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#e94560]">{score}</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
                {streak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
                  >
                    <Zap className="w-4 h-4" />
                    <span className="font-bold">{streak}x</span>
                  </motion.div>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Question {currentQuestion + 1}/{questions.length}
              </div>
            </div>

            {/* Timer Bar */}
            <div className="mb-6">
              <ProgressBar
                progress={(timeLeft / 30) * 100}
                color={timeLeft <= 5 ? 'warning' : 'primary'}
                size="sm"
              />
            </div>

            {/* Question */}
            <Card className="mb-4">
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  What does this mean?
                </p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {currentQ.word.german}
                </h2>
                <p className="text-sm text-gray-400">/{currentQ.word.pronunciation}/</p>
              </div>
            </Card>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQ.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    whileTap={{ scale: showResult ? 1 : 0.95 }}
                    className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${
                      showCorrect
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : showWrong
                        ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-[#e94560] text-gray-900 dark:text-white'
                    }`}
                  >
                    {option}
                  </motion.button>
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
                {score >= 10 ? 'Amazing!' : score >= 5 ? 'Good Job!' : 'Nice Try!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You answered {score} questions correctly!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#e94560]">{score}</div>
                  <div className="text-xs text-gray-500">Correct</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-500 flex items-center justify-center gap-1">
                    <Zap className="w-5 h-5" />{maxStreak}
                  </div>
                  <div className="text-xs text-gray-500">Best Streak</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-500">
                    +{score * 5 + maxStreak * 3}
                  </div>
                  <div className="text-xs text-gray-500">XP Earned</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={() => { generateQuestions(); startGame(); }} fullWidth>
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
