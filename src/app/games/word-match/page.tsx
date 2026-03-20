'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, X, Clock } from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import { getAllVocabulary, type VocabItem } from '@/lib/content/modules';

export default function WordMatchGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, learnVocabulary } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [words, setWords] = useState<VocabItem[]>([]);
  const [germanWords, setGermanWords] = useState<{ word: string; id: string; matched: boolean }[]>([]);
  const [englishWords, setEnglishWords] = useState<{ word: string; id: string; matched: boolean }[]>([]);
  const [selectedGerman, setSelectedGerman] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showWrong, setShowWrong] = useState(false);

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
    setWords(selectedWords);
    setGermanWords(shuffleArray(selectedWords.map(w => ({ word: w.german, id: w.id, matched: false }))));
    setEnglishWords(shuffleArray(selectedWords.map(w => ({ word: w.english, id: w.id, matched: false }))));
    setSelectedGerman(null);
    setSelectedEnglish(null);
    setScore(0);
    setMistakes(0);
    setTimeLeft(60);
    setShowWrong(false);
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
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    const earnedXP = Math.max(10, score * 5 - mistakes * 2);
    addXP(earnedXP);
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

      // Check if all matched
      if (score + 1 === words.length) {
        setTimeout(endGame, 500);
      }
    } else {
      // Wrong match
      setMistakes(prev => prev + 1);
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 500);
    }
    setSelectedGerman(null);
    setSelectedEnglish(null);
  };

  const matchedCount = germanWords.filter(w => w.matched).length;
  const progress = (matchedCount / words.length) * 100;

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
          <div className="flex items-center gap-2 text-lg font-bold">
            <Clock className="w-5 h-5 text-amber-500" />
            <span className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}>
              {timeLeft}s
            </span>
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
              <div className="text-6xl mb-4">🎯</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Word Match
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Match German words with their English meanings. Click a German word, then click its English translation!
              </p>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 60 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Up to 30 XP
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
            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">Progress</span>
                <span className="font-medium">{matchedCount}/{words.length} matched</span>
              </div>
              <ProgressBar progress={progress} color="success" size="md" />
            </div>

            {/* Score & Mistakes */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-500">{score}</div>
                <div className="text-xs text-gray-500">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{mistakes}</div>
                <div className="text-xs text-gray-500">Mistakes</div>
              </div>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-2 gap-4">
              {/* German Column */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 text-center mb-2">
                  German
                </h3>
                {germanWords.map((item) => (
                  <motion.button
                    key={item.id + '-german'}
                    onClick={() => handleGermanClick(item.id)}
                    disabled={item.matched}
                    whileTap={{ scale: item.matched ? 1 : 0.95 }}
                    animate={showWrong && selectedGerman === item.id ? { x: [-5, 5, -5, 5, 0] } : {}}
                    className={`w-full p-4 rounded-xl text-center font-medium transition-all ${
                      item.matched
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 opacity-50'
                        : selectedGerman === item.id
                        ? 'bg-[#e94560] text-white'
                        : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#e94560]'
                    }`}
                  >
                    {item.word}
                  </motion.button>
                ))}
              </div>

              {/* English Column */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 text-center mb-2">
                  English
                </h3>
                {englishWords.map((item) => (
                  <motion.button
                    key={item.id + '-english'}
                    onClick={() => handleEnglishClick(item.id)}
                    disabled={item.matched}
                    whileTap={{ scale: item.matched ? 1 : 0.95 }}
                    animate={showWrong && selectedEnglish === item.id ? { x: [-5, 5, -5, 5, 0] } : {}}
                    className={`w-full p-4 rounded-xl text-center font-medium transition-all ${
                      item.matched
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 opacity-50'
                        : selectedEnglish === item.id
                        ? 'bg-[#0f3460] text-white'
                        : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#0f3460]'
                    }`}
                  >
                    {item.word}
                  </motion.button>
                ))}
              </div>
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
                {timeLeft > 0 ? 'Great Job!' : 'Time\'s Up!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {score === words.length
                  ? 'Perfect! You matched all words!'
                  : `You matched ${score} out of ${words.length} words.`}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-500">{score}</div>
                  <div className="text-xs text-gray-500">Correct</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-500">{mistakes}</div>
                  <div className="text-xs text-gray-500">Mistakes</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-500">
                    +{Math.max(10, score * 5 - mistakes * 2)}
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
