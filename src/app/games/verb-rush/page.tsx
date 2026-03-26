'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock, Zap } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { useGameStore } from '@/lib/store';

// ── Verb data ──────────────────────────────────────────────────────────
interface VerbEntry {
  infinitive: string;
  conjugations: Record<string, string>;
}

const VERBS: VerbEntry[] = [
  { infinitive: "sein", conjugations: { ich: "bin", du: "bist", "er/sie/es": "ist", wir: "sind", ihr: "seid", "sie/Sie": "sind" } },
  { infinitive: "haben", conjugations: { ich: "habe", du: "hast", "er/sie/es": "hat", wir: "haben", ihr: "habt", "sie/Sie": "haben" } },
  { infinitive: "machen", conjugations: { ich: "mache", du: "machst", "er/sie/es": "macht", wir: "machen", ihr: "macht", "sie/Sie": "machen" } },
  { infinitive: "gehen", conjugations: { ich: "gehe", du: "gehst", "er/sie/es": "geht", wir: "gehen", ihr: "geht", "sie/Sie": "gehen" } },
  { infinitive: "kommen", conjugations: { ich: "komme", du: "kommst", "er/sie/es": "kommt", wir: "kommen", ihr: "kommt", "sie/Sie": "kommen" } },
  { infinitive: "sprechen", conjugations: { ich: "spreche", du: "sprichst", "er/sie/es": "spricht", wir: "sprechen", ihr: "sprecht", "sie/Sie": "sprechen" } },
  { infinitive: "essen", conjugations: { ich: "esse", du: "isst", "er/sie/es": "isst", wir: "essen", ihr: "esst", "sie/Sie": "essen" } },
  { infinitive: "fahren", conjugations: { ich: "fahre", du: "fährst", "er/sie/es": "fährt", wir: "fahren", ihr: "fahrt", "sie/Sie": "fahren" } },
  { infinitive: "lesen", conjugations: { ich: "lese", du: "liest", "er/sie/es": "liest", wir: "lesen", ihr: "lest", "sie/Sie": "lesen" } },
  { infinitive: "schlafen", conjugations: { ich: "schlafe", du: "schläfst", "er/sie/es": "schläft", wir: "schlafen", ihr: "schlaft", "sie/Sie": "schlafen" } },
  { infinitive: "wissen", conjugations: { ich: "weiß", du: "weißt", "er/sie/es": "weiß", wir: "wissen", ihr: "wisst", "sie/Sie": "wissen" } },
  { infinitive: "können", conjugations: { ich: "kann", du: "kannst", "er/sie/es": "kann", wir: "können", ihr: "könnt", "sie/Sie": "können" } },
  { infinitive: "müssen", conjugations: { ich: "muss", du: "musst", "er/sie/es": "muss", wir: "müssen", ihr: "müsst", "sie/Sie": "müssen" } },
  { infinitive: "wollen", conjugations: { ich: "will", du: "willst", "er/sie/es": "will", wir: "wollen", ihr: "wollt", "sie/Sie": "wollen" } },
  { infinitive: "arbeiten", conjugations: { ich: "arbeite", du: "arbeitest", "er/sie/es": "arbeitet", wir: "arbeiten", ihr: "arbeitet", "sie/Sie": "arbeiten" } },
];

const PRONOUNS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

// ── Question type ──────────────────────────────────────────────────────
interface Question {
  verb: VerbEntry;
  pronoun: string;
  correctAnswer: string;
  options: string[];
}

// ── Helpers ────────────────────────────────────────────────────────────
function shuffleArray<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateDistractors(
  correctVerb: VerbEntry,
  correctPronoun: string,
  correctAnswer: string,
): string[] {
  const pool = new Set<string>();

  // Add conjugations from OTHER pronouns of the same verb
  for (const p of PRONOUNS) {
    if (p !== correctPronoun) {
      const form = correctVerb.conjugations[p];
      if (form && form !== correctAnswer) pool.add(form);
    }
  }

  // Add conjugations from OTHER verbs for the same pronoun
  for (const v of VERBS) {
    if (v.infinitive !== correctVerb.infinitive) {
      const form = v.conjugations[correctPronoun];
      if (form && form !== correctAnswer) pool.add(form);
    }
  }

  return shuffleArray([...pool]).slice(0, 3);
}

// ── Component ──────────────────────────────────────────────────────────
export default function VerbRushGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConjugationTable, setShowConjugationTable] = useState(false);
  const [wrongVerb, setWrongVerb] = useState<VerbEntry | null>(null);
  const [showCombo, setShowCombo] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  // ── Question generation ──────────────────────────────────────────────
  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = [];

    for (let i = 0; i < 15; i++) {
      const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
      const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
      const correctAnswer = verb.conjugations[pronoun];
      const distractors = generateDistractors(verb, pronoun, correctAnswer);

      newQuestions.push({
        verb,
        pronoun,
        correctAnswer,
        options: shuffleArray([correctAnswer, ...distractors]),
      });
    }

    setQuestions(newQuestions);
  }, []);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  // ── Timer ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, timeLeft, showResult]);

  // ── Actions ──────────────────────────────────────────────────────────
  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(60);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    const comboBonus = maxStreak >= 3 ? maxStreak * 4 : 0;
    const earnedXP = score * 6 + comboBonus;
    addXP(earnedXP);
  };

  // Irregular verbs that change stem
  const IRREGULAR_VERBS = new Set([
    'sein', 'haben', 'sprechen', 'essen', 'fahren', 'lesen',
    'schlafen', 'wissen', 'können', 'müssen', 'wollen',
  ]);

  const isIrregularVerb = (infinitive: string) => IRREGULAR_VERBS.has(infinitive);

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const correct = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        // Show combo at 3+
        if (newStreak >= 3) {
          setShowCombo(true);
          setTimeout(() => setShowCombo(false), 800);
        }
        return newStreak;
      });
    } else {
      setStreak(0);
      setWrongCount(prev => prev + 1);
      // Show conjugation table for wrong answers
      setWrongVerb(questions[currentQuestion].verb);
      setShowConjugationTable(true);
    }

    const delay = correct ? 600 : 2500;
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setIsCorrect(false);
        setShowConjugationTable(false);
        setWrongVerb(null);
      } else {
        endGame();
      }
    }, delay);
  };

  // ── Derived values ───────────────────────────────────────────────────
  const currentQ = questions[currentQuestion];
  const fireMode = streak >= 3;
  const comboBonus = maxStreak >= 3 ? maxStreak * 4 : 0;
  const totalXP = score * 6 + comboBonus;

  // ── Render ───────────────────────────────────────────────────────────
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
              animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3, repeat: timeLeft <= 10 ? Infinity : 0 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold ${
                timeLeft <= 10 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span>{timeLeft}s</span>
            </motion.div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Ready Screen ───────────────────────────────────────── */}
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="text-center">
              <div className="text-6xl mb-4">🏃‍♂️</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Verb Rush
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Conjugate German verbs at top speed! Pick the right form before the clock runs out. 3+ streak = FIRE mode!
              </p>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 60 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" /> 15 questions
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Up to 120 XP
                </span>
              </div>
              <Button onClick={startGame} size="lg" fullWidth>
                Start Rush
              </Button>
            </Card>
          </motion.div>
        )}

        {/* ── Playing Screen ─────────────────────────────────────── */}
        {gameState === 'playing' && currentQ && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
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

                {/* Fire mode indicator */}
                {fireMode && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-2xl"
                  >
                    🔥
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
                progress={(timeLeft / 60) * 100}
                color={timeLeft <= 10 ? 'warning' : 'primary'}
                size="sm"
              />
            </div>

            {/* Question Card */}
            <motion.div
              animate={
                fireMode
                  ? {
                      boxShadow: [
                        '0 0 10px rgba(255, 217, 61, 0.3)',
                        '0 0 25px rgba(255, 217, 61, 0.6)',
                        '0 0 10px rgba(255, 217, 61, 0.3)',
                      ],
                    }
                  : {}
              }
              transition={fireMode ? { duration: 1.2, repeat: Infinity } : {}}
              className={`rounded-2xl mb-4 ${
                fireMode
                  ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-2 border-amber-400'
                  : ''
              }`}
            >
              <Card className={`${fireMode ? 'bg-transparent shadow-none' : ''}`}>
                <div className="text-center py-4">
                  {fireMode && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-bold tracking-widest text-amber-500 mb-2"
                    >
                      🔥 FIRE MODE 🔥
                    </motion.p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Conjugate the verb:
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    <span className="text-[#e94560]">{currentQ.pronoun}</span>{' '}
                    <span className="text-gray-400">+</span>{' '}
                    <span>{currentQ.verb.infinitive}</span>
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">= ?</p>
                </div>
              </Card>
            </motion.div>

            {/* Irregular verb tag */}
            {isIrregularVerb(currentQ.verb.infinitive) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-3 flex justify-center"
              >
                <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 dark:border-amber-700">
                  <span>&#9888;&#65039;</span> Irregular!
                </span>
              </motion.div>
            )}

            {/* Combo indicator */}
            <AnimatePresence>
              {showCombo && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 mb-3"
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

            {/* Options — 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === currentQ.correctAnswer;
                const showCorrectHighlight = showResult && isCorrectOption;
                const showWrongHighlight = showResult && isSelected && !isCorrectOption;

                return (
                  <motion.button
                    key={`${currentQuestion}-${index}`}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    whileTap={{ scale: showResult ? 1 : 0.95 }}
                    animate={
                      showCorrectHighlight
                        ? { scale: [1, 1.05, 1], transition: { duration: 0.3 } }
                        : showWrongHighlight
                        ? { x: [0, -6, 6, -6, 6, 0], transition: { duration: 0.4 } }
                        : {}
                    }
                    className={`p-4 rounded-xl border-2 text-center text-lg font-medium transition-all ${
                      showCorrectHighlight
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : showWrongHighlight
                        ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-[#e94560] text-gray-900 dark:text-white'
                    }`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>

            {/* Conjugation table (shown briefly on wrong answer) */}
            <AnimatePresence>
              {showConjugationTable && wrongVerb && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="mt-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4"
                >
                  <p className="text-xs font-bold text-red-500 dark:text-red-400 mb-2 text-center">
                    Full conjugation: <span className="text-red-700 dark:text-red-300">{wrongVerb.infinitive}</span>
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {Object.entries(wrongVerb.conjugations).map(([pronoun, form]) => (
                      <div key={pronoun} className="flex justify-between">
                        <span className="text-red-400 dark:text-red-500 font-medium">{pronoun}</span>
                        <span className={`font-bold ${
                          form === currentQ.correctAnswer
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>{form}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Complete Screen ────────────────────────────────────── */}
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
                {score >= 13
                  ? 'Unbelievable!'
                  : score >= 10
                  ? 'Amazing!'
                  : score >= 7
                  ? 'Great Job!'
                  : score >= 4
                  ? 'Good Effort!'
                  : 'Nice Try!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You conjugated {score} out of {questions.length} verbs correctly!
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
                    +{totalXP}
                  </div>
                  <div className="text-xs text-gray-500">XP Earned</div>
                </div>
              </div>

              {maxStreak >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700"
                >
                  <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                    🔥 FIRE streak bonus: +{maxStreak * 4} XP
                  </p>
                </motion.div>
              )}

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
