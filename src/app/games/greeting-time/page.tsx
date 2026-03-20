'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Sun, Sunrise, Sunset, Moon } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useGameStore } from '@/lib/store';

interface TimeQuestion {
  time: string;
  period: string;
  correctGreeting: string;
  options: string[];
  icon: React.ReactNode;
}

const greetings = ['Guten Morgen', 'Guten Tag', 'Guten Abend', 'Gute Nacht'];

const generateTimeQuestions = (): TimeQuestion[] => {
  const questions: TimeQuestion[] = [
    { time: '7:00 AM', period: 'morning', correctGreeting: 'Guten Morgen', options: greetings, icon: <Sunrise className="w-12 h-12 text-orange-400" /> },
    { time: '10:30 AM', period: 'morning', correctGreeting: 'Guten Morgen', options: greetings, icon: <Sunrise className="w-12 h-12 text-orange-400" /> },
    { time: '2:00 PM', period: 'afternoon', correctGreeting: 'Guten Tag', options: greetings, icon: <Sun className="w-12 h-12 text-yellow-400" /> },
    { time: '4:30 PM', period: 'afternoon', correctGreeting: 'Guten Tag', options: greetings, icon: <Sun className="w-12 h-12 text-yellow-400" /> },
    { time: '6:00 PM', period: 'evening', correctGreeting: 'Guten Abend', options: greetings, icon: <Sunset className="w-12 h-12 text-orange-500" /> },
    { time: '8:00 PM', period: 'evening', correctGreeting: 'Guten Abend', options: greetings, icon: <Sunset className="w-12 h-12 text-purple-400" /> },
    { time: '11:00 PM', period: 'night', correctGreeting: 'Gute Nacht', options: greetings, icon: <Moon className="w-12 h-12 text-indigo-400" /> },
    { time: '6:30 AM', period: 'morning', correctGreeting: 'Guten Morgen', options: greetings, icon: <Sunrise className="w-12 h-12 text-orange-400" /> },
    { time: '12:00 PM', period: 'afternoon', correctGreeting: 'Guten Tag', options: greetings, icon: <Sun className="w-12 h-12 text-yellow-400" /> },
    { time: '9:30 PM', period: 'night', correctGreeting: 'Gute Nacht', options: greetings, icon: <Moon className="w-12 h-12 text-indigo-400" /> },
  ];

  // Shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions.slice(0, 8);
};

export default function GreetingTimeGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<TimeQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const initGame = useCallback(() => {
    setQuestions(generateTimeQuestions());
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const startGame = () => {
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    addXP(score * 5 + 10);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === questions[currentQuestion].correctGreeting) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endGame();
      }
    }, 1200);
  };

  const currentQ = questions[currentQuestion];

  const getBackgroundGradient = () => {
    if (!currentQ) return 'from-gray-100 to-gray-200';
    switch (currentQ.period) {
      case 'morning': return 'from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30';
      case 'afternoon': return 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30';
      case 'evening': return 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30';
      case 'night': return 'from-indigo-200 to-purple-200 dark:from-indigo-900/30 dark:to-purple-900/30';
      default: return 'from-gray-100 to-gray-200';
    }
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
          <div className="text-sm text-gray-500">
            {currentQuestion + 1}/{questions.length}
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
              <div className="text-6xl mb-4">👋</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Greeting Time
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Choose the correct German greeting for different times of the day!
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Guide:</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <Sunrise className="w-4 h-4 text-orange-400" />
                    <span><strong>Guten Morgen</strong> - Morning (until ~11 AM)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <span><strong>Guten Tag</strong> - Day (11 AM - 6 PM)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sunset className="w-4 h-4 text-purple-400" />
                    <span><strong>Guten Abend</strong> - Evening (6 PM - 9 PM)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span><strong>Gute Nacht</strong> - Night (going to sleep)</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-gray-500">
                <span>8 questions</span>
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
        {gameState === 'playing' && currentQ && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Time Display */}
            <Card className={`bg-gradient-to-br ${getBackgroundGradient()} mb-6`}>
              <div className="text-center py-8">
                <div className="mb-4">{currentQ.icon}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  It's...
                </p>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {currentQ.time}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  What greeting would you use?
                </p>
              </div>
            </Card>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQ.correctGreeting;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    whileTap={{ scale: showResult ? 1 : 0.95 }}
                    animate={showWrong ? { x: [-5, 5, -5, 5, 0] } : {}}
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

            {/* Score Display */}
            <div className="mt-6 text-center">
              <span className="text-gray-500 dark:text-gray-400">
                Score: <span className="font-bold text-[#e94560]">{score}</span>/{currentQuestion + (showResult ? 1 : 0)}
              </span>
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
                {score === questions.length ? 'Perfect!' : score >= questions.length * 0.7 ? 'Great Job!' : 'Good Try!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You got {score} out of {questions.length} correct!
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-500">{score}/{questions.length}</div>
                  <div className="text-xs text-gray-500">Correct</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-500">+{score * 5 + 10}</div>
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
