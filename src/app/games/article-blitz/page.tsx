'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock, Zap } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { useGameStore } from '@/lib/store';

interface NounItem {
  noun: string;
  article: 'der' | 'die' | 'das';
  english: string;
}

const NOUNS: NounItem[] = [
  { noun: "Hund", article: "der", english: "dog" },
  { noun: "Katze", article: "die", english: "cat" },
  { noun: "Buch", article: "das", english: "book" },
  { noun: "Tisch", article: "der", english: "table" },
  { noun: "Lampe", article: "die", english: "lamp" },
  { noun: "Auto", article: "das", english: "car" },
  { noun: "Mann", article: "der", english: "man" },
  { noun: "Frau", article: "die", english: "woman" },
  { noun: "Kind", article: "das", english: "child" },
  { noun: "Stuhl", article: "der", english: "chair" },
  { noun: "Blume", article: "die", english: "flower" },
  { noun: "Haus", article: "das", english: "house" },
  { noun: "Vater", article: "der", english: "father" },
  { noun: "Mutter", article: "die", english: "mother" },
  { noun: "Mädchen", article: "das", english: "girl" },
  { noun: "Apfel", article: "der", english: "apple" },
  { noun: "Zeitung", article: "die", english: "newspaper" },
  { noun: "Brot", article: "das", english: "bread" },
  { noun: "Kaffee", article: "der", english: "coffee" },
  { noun: "Milch", article: "die", english: "milk" },
  { noun: "Wasser", article: "das", english: "water" },
  { noun: "Bruder", article: "der", english: "brother" },
  { noun: "Schwester", article: "die", english: "sister" },
  { noun: "Bier", article: "das", english: "beer" },
  { noun: "Zug", article: "der", english: "train" },
  { noun: "Straße", article: "die", english: "street" },
  { noun: "Fenster", article: "das", english: "window" },
  { noun: "Bahnhof", article: "der", english: "station" },
  { noun: "Küche", article: "die", english: "kitchen" },
  { noun: "Zimmer", article: "das", english: "room" },
  { noun: "Schuh", article: "der", english: "shoe" },
  { noun: "Tasche", article: "die", english: "bag" },
  { noun: "Handy", article: "das", english: "phone" },
  { noun: "Arzt", article: "der", english: "doctor" },
  { noun: "Schule", article: "die", english: "school" },
  { noun: "Geld", article: "das", english: "money" },
  { noun: "Berg", article: "der", english: "mountain" },
  { noun: "Stadt", article: "die", english: "city" },
  { noun: "Land", article: "das", english: "country" },
  { noun: "Flughafen", article: "der", english: "airport" },
];

const ARTICLE_COLORS = {
  der: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', border: 'border-blue-500', hex: '#3b82f6' },
  die: { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', border: 'border-pink-500', hex: '#ec4899' },
  das: { bg: 'bg-[#d4a520]', hover: 'hover:bg-[#b8900e]', border: 'border-[#d4a520]', hex: '#d4a520' },
};

export default function ArticleBlitzGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [nouns, setNouns] = useState<NounItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [feedback, setFeedback] = useState<{ article: string; correct: boolean } | null>(null);
  const [timePenalty, setTimePenalty] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [tipText, setTipText] = useState('');
  const [showCorrectCard, setShowCorrectCard] = useState<{ article: string; noun: string } | null>(null);
  const [showCombo, setShowCombo] = useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateNouns = useCallback(() => {
    const shuffled = shuffleArray(NOUNS);
    setNouns(shuffled.slice(0, 20));
  }, []);

  useEffect(() => {
    generateNouns();
  }, [generateNouns]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !feedback) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft <= 0 && gameState === 'playing') {
      endGame();
    }
  }, [gameState, timeLeft, feedback]);

  const startGame = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(45);
    setFeedback(null);
    setTimePenalty(false);
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    const earnedXP = score * 4 + maxStreak * 2;
    addXP(earnedXP);
  };

  // Article tips based on noun endings
  const getArticleTip = (noun: string, article: string): string => {
    if (noun.endsWith('ung') || noun.endsWith('heit') || noun.endsWith('keit') || noun.endsWith('schaft') || noun.endsWith('tion'))
      return `Words ending in -${noun.slice(-3)} are usually DIE`;
    if (noun.endsWith('er') && article === 'der')
      return `Words ending in -er are often DER (masculine)`;
    if (noun.endsWith('chen') || noun.endsWith('lein'))
      return `Diminutives (-chen, -lein) are always DAS`;
    if (noun.endsWith('e') && article === 'die')
      return `Many words ending in -e are DIE (feminine)`;
    if (article === 'der') return `DER = masculine. Try to feel the pattern!`;
    if (article === 'die') return `DIE = feminine. Look for common endings!`;
    return `DAS = neuter. Some you just have to memorize!`;
  };

  const handleArticleChoice = (chosenArticle: 'der' | 'die' | 'das') => {
    if (feedback) return;

    const currentNoun = nouns[currentIndex];
    const isCorrect = chosenArticle === currentNoun.article;

    setFeedback({ article: chosenArticle, correct: isCorrect });

    if (isCorrect) {
      const newStreak = streak + 1;
      const points = newStreak >= 3 ? 2 : 1;
      setScore(prev => prev + points);
      setStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
      // Show combo indicator at 3+
      if (newStreak >= 3) {
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 800);
      }
    } else {
      setStreak(0);
      setTimeLeft(prev => Math.max(0, prev - 1));
      setTimePenalty(true);
      setTimeout(() => setTimePenalty(false), 400);

      const newWrongCount = wrongCount + 1;
      setWrongCount(newWrongCount);

      // Show correct article in a mini-card
      setShowCorrectCard({ article: currentNoun.article.toUpperCase(), noun: currentNoun.noun });

      // After 3 wrong answers, show a tip
      if (newWrongCount >= 3 && newWrongCount % 3 === 0) {
        setTipText(getArticleTip(currentNoun.noun, currentNoun.article));
        setShowTip(true);
      }
    }

    const delay = isCorrect ? 400 : 2000;
    setTimeout(() => {
      if (currentIndex < nouns.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setFeedback(null);
        setShowCorrectCard(null);
        setShowTip(false);
      } else {
        endGame();
      }
    }, delay);
  };

  const currentNoun = nouns[currentIndex];
  const progress = nouns.length > 0 ? ((currentIndex) / nouns.length) * 100 : 0;
  const earnedXP = score * 4 + maxStreak * 2;

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
              animate={{
                scale: timeLeft <= 5 ? [1, 1.1, 1] : 1,
                ...(timePenalty ? { x: [-3, 3, -3, 3, 0] } : {}),
              }}
              transition={{ duration: 0.3, repeat: timeLeft <= 5 ? Infinity : 0 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold ${
                timePenalty
                  ? 'bg-red-100 text-red-600'
                  : timeLeft <= 5
                  ? 'bg-red-100 text-red-600'
                  : 'bg-amber-100 text-amber-600'
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
              <div className="text-6xl mb-4">der die das</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Article Blitz
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Der, die, or das? Pick the correct article for each German noun as fast as you can! 3+ streak = double points!
              </p>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 45 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" /> 20 nouns
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Streak bonus
                </span>
              </div>

              {/* Article color legend */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm font-bold">DER</span>
                <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-sm font-bold">DIE</span>
                <span className="px-3 py-1 rounded-full bg-[#d4a520] text-white text-sm font-bold">DAS</span>
              </div>

              <Button onClick={startGame} size="lg" fullWidth>
                Start Blitz
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && currentNoun && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#e94560]">{score}</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
                {streak >= 3 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
                  >
                    <Zap className="w-4 h-4" />
                    <span className="font-bold">2x!</span>
                  </motion.div>
                )}
                {streak > 0 && (
                  <motion.div
                    key={streak}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1 bg-amber-100 text-amber-600 px-2 py-1 rounded-full"
                  >
                    <Star className="w-3 h-3" />
                    <span className="font-bold text-sm">{streak}</span>
                  </motion.div>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {currentIndex + 1}/{nouns.length}
              </div>
            </div>

            {/* Timer Bar */}
            <div className="mb-6">
              <motion.div
                animate={timePenalty ? { opacity: [1, 0.3, 1, 0.3, 1] } : { opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ProgressBar
                  progress={(timeLeft / 45) * 100}
                  color={timeLeft <= 10 ? 'warning' : 'primary'}
                  size="sm"
                />
              </motion.div>
            </div>

            {/* Noun Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`noun-${currentIndex}`}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <Card className="mb-6">
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      What article does this noun take?
                    </p>
                    <motion.h2
                      initial={{ scale: 0.7 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                    >
                      ___ {currentNoun.noun}
                    </motion.h2>
                    <p className="text-sm text-gray-400">({currentNoun.english})</p>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Article Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {(['der', 'die', 'das'] as const).map((article) => {
                const colors = ARTICLE_COLORS[article];
                const isFeedbackTarget = feedback?.article === article;
                const isCorrectAnswer = feedback && currentNoun.article === article;
                const showGreen = feedback?.correct && isFeedbackTarget;
                const showRed = feedback && !feedback.correct && isFeedbackTarget;
                const showCorrectHint = feedback && !feedback.correct && isCorrectAnswer;

                return (
                  <motion.button
                    key={article}
                    onClick={() => handleArticleChoice(article)}
                    disabled={!!feedback}
                    whileTap={feedback ? {} : { scale: 0.9 }}
                    animate={
                      showRed
                        ? { x: [-6, 6, -6, 6, 0] }
                        : showGreen
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                    className={`
                      relative p-5 rounded-2xl text-center font-bold text-xl text-white uppercase tracking-wider
                      transition-all duration-150 select-none
                      shadow-lg active:shadow-sm active:translate-y-0.5
                      ${
                        showGreen
                          ? 'bg-emerald-500 border-4 border-emerald-300 shadow-emerald-400/50'
                          : showRed
                          ? 'bg-red-500 border-4 border-red-300 shadow-red-400/50'
                          : showCorrectHint
                          ? 'bg-emerald-500 border-4 border-emerald-300 opacity-70'
                          : `${colors.bg} ${colors.hover} border-4 border-transparent`
                      }
                    `}
                    style={
                      !feedback
                        ? { boxShadow: `0 4px 0 0 ${article === 'der' ? '#2563eb' : article === 'die' ? '#be185d' : '#a17c10'}` }
                        : {}
                    }
                  >
                    {article}
                  </motion.button>
                );
              })}
            </div>

            {/* Article color labels below buttons */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="text-center text-xs text-blue-400 font-medium">Masculine</div>
              <div className="text-center text-xs text-pink-400 font-medium">Feminine</div>
              <div className="text-center text-xs text-[#d4a520] font-medium">Neuter</div>
            </div>

            {/* Combo visual */}
            <AnimatePresence>
              {showCombo && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 mt-3"
                >
                  <span className="text-lg font-black text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-4 py-1 rounded-full">
                    {streak >= 5 ? '3x' : '2x'} COMBO!
                  </span>
                  <motion.span
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.3, repeat: 2 }}
                    className="text-xl"
                  >
                    🔥
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Correct answer teaching card (on wrong answer) */}
            <AnimatePresence>
              {showCorrectCard && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-4 rounded-xl border-2 p-4 text-center"
                  style={{
                    borderColor: showCorrectCard.article === 'DER' ? '#3b82f6' : showCorrectCard.article === 'DIE' ? '#ec4899' : '#d4a520',
                    backgroundColor: showCorrectCard.article === 'DER' ? 'rgba(59,130,246,0.1)' : showCorrectCard.article === 'DIE' ? 'rgba(236,72,153,0.1)' : 'rgba(212,165,32,0.1)',
                  }}
                >
                  <span
                    className="text-2xl font-black"
                    style={{
                      color: showCorrectCard.article === 'DER' ? '#3b82f6' : showCorrectCard.article === 'DIE' ? '#ec4899' : '#d4a520',
                    }}
                  >
                    {showCorrectCard.article}
                  </span>{' '}
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {showCorrectCard.noun}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tip after 3+ wrong answers */}
            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-4 py-3 text-center"
                >
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">💡 Tip</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">{tipText}</p>
                </motion.div>
              )}
            </AnimatePresence>
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
                {score >= 15 ? 'Incredible!' : score >= 10 ? 'Great Job!' : score >= 5 ? 'Good Effort!' : 'Keep Practicing!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {score >= 15
                  ? 'You really know your articles!'
                  : score >= 10
                  ? 'Solid article knowledge!'
                  : 'Articles take time - keep at it!'}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#e94560]">{score}</div>
                  <div className="text-xs text-gray-500">Points</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-500 flex items-center justify-center gap-1">
                    <Zap className="w-5 h-5" />{maxStreak}
                  </div>
                  <div className="text-xs text-gray-500">Best Streak</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-500">
                    +{earnedXP}
                  </div>
                  <div className="text-xs text-gray-500">XP Earned</div>
                </div>
              </div>

              {/* Article breakdown */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-sm font-semibold">
                  der = Masculine
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-500 text-sm font-semibold">
                  die = Feminine
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#d4a520]/10 text-[#d4a520] text-sm font-semibold">
                  das = Neuter
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={() => { generateNouns(); startGame(); }} fullWidth>
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
