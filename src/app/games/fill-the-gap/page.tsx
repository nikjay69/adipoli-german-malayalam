'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { useGameStore } from '@/lib/store';

interface GapSentence {
  sentence: string;
  gap: string;
  options: string[];
  english: string;
  grammarRule?: string;
}

const SENTENCES: GapSentence[] = [
  { sentence: "Ich ______ Deutsch.", gap: "lerne", options: ["lerne", "lernt", "lernen", "lernst"], english: "I am learning German.", grammarRule: "Conjugation: ich + -e ending" },
  { sentence: "Er ______ aus Kerala.", gap: "kommt", options: ["kommt", "kommen", "kommst", "komme"], english: "He comes from Kerala.", grammarRule: "Conjugation: er/sie/es + -t ending" },
  { sentence: "Wir ______ ins Kino.", gap: "gehen", options: ["gehen", "geht", "gehst", "gehe"], english: "We are going to the cinema.", grammarRule: "Conjugation: wir + -en ending" },
  { sentence: "______ du Kaffee?", gap: "Möchtest", options: ["Möchtest", "Möchte", "Möchten", "Möchtet"], english: "Would you like coffee?", grammarRule: "Konjunktiv II: du + -st ending" },
  { sentence: "Ich habe einen ______ Bruder.", gap: "großen", options: ["großen", "große", "großer", "großes"], english: "I have a tall brother.", grammarRule: "Akkusativ: einen + -en adjective ending" },
  { sentence: "Das Buch liegt auf ______ Tisch.", gap: "dem", options: ["dem", "den", "der", "das"], english: "The book is on the table.", grammarRule: "Dativ: auf + dem (location, no movement)" },
  { sentence: "Sie ______ sehr gut Deutsch.", gap: "spricht", options: ["spricht", "spreche", "sprichst", "sprechen"], english: "She speaks German very well.", grammarRule: "Irregular: sprechen -> spricht (e->i change)" },
  { sentence: "Ich bin ______ Berlin gefahren.", gap: "nach", options: ["nach", "zu", "in", "auf"], english: "I drove to Berlin.", grammarRule: "Preposition: nach + city/country (no article)" },
  { sentence: "Gestern ______ ich Pizza gegessen.", gap: "habe", options: ["habe", "bin", "hat", "ist"], english: "Yesterday I ate pizza.", grammarRule: "Perfekt: essen uses 'haben' as helper" },
  { sentence: "______ ist der Bahnhof?", gap: "Wo", options: ["Wo", "Was", "Wer", "Wie"], english: "Where is the train station?", grammarRule: "W-Frage: Wo = Where (location)" },
  { sentence: "Ich ______ um 7 Uhr auf.", gap: "stehe", options: ["stehe", "stehen", "stehst", "steht"], english: "I get up at 7 o'clock.", grammarRule: "Trennbare Verben: aufstehen -> stehe...auf" },
  { sentence: "Das ist ______ Schwester.", gap: "meine", options: ["meine", "mein", "meinen", "meiner"], english: "That is my sister.", grammarRule: "Possessiv: meine (feminine, Nominativ)" },
  { sentence: "Können Sie mir bitte ______?", gap: "helfen", options: ["helfen", "hilft", "helfe", "hilfst"], english: "Can you please help me?", grammarRule: "Modalverb: können + Infinitiv at end" },
  { sentence: "Ich trinke ______ Tee.", gap: "gern", options: ["gern", "gerne", "gut", "viel"], english: "I like to drink tea.", grammarRule: "Adverb: gern = gladly (expresses liking)" },
  { sentence: "Er ______ jeden Tag Fußball.", gap: "spielt", options: ["spielt", "spielen", "spielst", "spiele"], english: "He plays football every day.", grammarRule: "Conjugation: er + -t ending (regular)" },
  { sentence: "Wir müssen ______ 8 Uhr da sein.", gap: "um", options: ["um", "am", "im", "an"], english: "We must be there at 8 o'clock.", grammarRule: "Time: um + Uhrzeit (for clock times)" },
  { sentence: "Sie hat ______ Hund und eine Katze.", gap: "einen", options: ["einen", "ein", "eine", "einer"], english: "She has a dog and a cat.", grammarRule: "Akkusativ: einen (masculine, direct object)" },
  { sentence: "Ich ______ gestern ins Kino gegangen.", gap: "bin", options: ["bin", "habe", "ist", "war"], english: "I went to the cinema yesterday.", grammarRule: "Perfekt: gehen uses 'sein' (movement verb)" },
  { sentence: "Der Kaffee ist ______ heiß.", gap: "sehr", options: ["sehr", "viel", "gut", "ganz"], english: "The coffee is very hot.", grammarRule: "Adverb: sehr = very (intensifier)" },
  { sentence: "Wie ______ kostet das?", gap: "viel", options: ["viel", "groß", "lang", "oft"], english: "How much does that cost?", grammarRule: "Wie viel = How much (quantity question)" },
];

const TOTAL_QUESTIONS = 12;

export default function FillTheGapGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<GapSentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateQuestions = useCallback(() => {
    const picked = shuffleArray(SENTENCES).slice(0, TOTAL_QUESTIONS);
    setQuestions(picked);
    return picked;
  }, []);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  // Shuffle options whenever the current question changes
  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      setShuffledOptions(shuffleArray(questions[currentIndex].options));
    }
  }, [currentIndex, questions]);

  const startGame = () => {
    const picked = generateQuestions();
    setCurrentIndex(0);
    setScore(0);
    setResults([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setStreak(0);
    setShowCombo(false);
    setGameState('playing');
  };

  const endGame = (finalScore: number) => {
    setGameState('complete');
    incrementGamesPlayed();
    const earnedXP = finalScore * 6;
    addXP(earnedXP);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === questions[currentIndex].gap;
    const newScore = isCorrect ? score + 1 : score;
    const newResults = [...results, isCorrect];

    if (isCorrect) {
      setScore(newScore);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak >= 3) {
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 1200);
      }
    } else {
      setStreak(0);
    }
    setResults(newResults);

    const delay = isCorrect ? 1500 : 2500;

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endGame(newScore);
      }
    }, delay);
  };

  const currentQ = questions[currentIndex];

  // Split sentence into parts around the gap
  const getSentenceParts = (sentence: string) => {
    const parts = sentence.split('______');
    return { before: parts[0] || '', after: parts[1] || '' };
  };

  // Split a part into individual words for staggered animation
  const getWords = (text: string): string[] => {
    return text.split(/(\s+)/).filter(w => w.length > 0);
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
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentIndex + 1}/{questions.length}
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
              <div className="text-6xl mb-4">📝</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Fill the Gap
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Complete the German sentence by picking the missing word. Grammar, vocab, prepositions — everything is fair game!
              </p>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> No timer
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Up to 72 XP
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
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {questions.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i < results.length
                      ? results[i]
                        ? 'bg-emerald-500'
                        : 'bg-red-400'
                      : i === currentIndex
                      ? 'bg-[#e94560] ring-2 ring-[#e94560]/30'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <ProgressBar
                progress={(currentIndex / questions.length) * 100}
                color="primary"
                size="sm"
              />
            </div>

            {/* Score & Streak Display */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-[#e94560]">{score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
              {streak >= 3 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-orange-500">{streak}x</div>
                  <div className="text-xs text-orange-400">Streak</div>
                </motion.div>
              )}
            </div>

            {/* Sentence Card */}
            <Card className="mb-6">
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Fill in the blank:
                </p>

                {/* Sentence with staggered word animation */}
                <div className="text-2xl font-bold text-gray-900 dark:text-white flex flex-wrap items-center justify-center gap-1 leading-relaxed">
                  {(() => {
                    const { before, after } = getSentenceParts(currentQ.sentence);
                    const beforeWords = getWords(before);
                    const afterWords = getWords(after);
                    let wordIndex = 0;

                    return (
                      <>
                        {beforeWords.map((word, i) => {
                          const idx = wordIndex++;
                          return (
                            <motion.span
                              key={`before-${i}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.08, duration: 0.3 }}
                            >
                              {word}
                            </motion.span>
                          );
                        })}

                        {/* The Gap */}
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={
                            showResult
                              ? {
                                  opacity: 1,
                                  y: 0,
                                }
                              : {
                                  opacity: 1,
                                  y: 0,
                                  textShadow: [
                                    '0 0 8px rgba(255, 217, 61, 0)',
                                    '0 0 16px rgba(255, 217, 61, 0.6)',
                                    '0 0 8px rgba(255, 217, 61, 0)',
                                  ],
                                }
                          }
                          transition={
                            showResult
                              ? { duration: 0.3 }
                              : {
                                  delay: wordIndex * 0.08,
                                  duration: 0.3,
                                  textShadow: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  },
                                }
                          }
                          className={`inline-block px-3 py-1 mx-1 rounded-lg border-2 border-dashed min-w-[100px] transition-colors duration-300 ${
                            showResult && selectedAnswer === currentQ.gap
                              ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                              : showResult && selectedAnswer !== currentQ.gap
                              ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                              : 'border-[#ffd93d] text-[#ffd93d]'
                          }`}
                        >
                          {showResult ? currentQ.gap : '______'}
                        </motion.span>

                        {afterWords.map((word, i) => {
                          const idx = wordIndex++;
                          return (
                            <motion.span
                              key={`after-${i}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.08, duration: 0.3 }}
                            >
                              {word}
                            </motion.span>
                          );
                        })}
                      </>
                    );
                  })()}
                </div>

                {/* Wrong answer flash */}
                <AnimatePresence>
                  {showResult && selectedAnswer !== currentQ.gap && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-sm mt-3 font-medium"
                    >
                      Your answer: <span className="line-through">{selectedAnswer}</span>
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* English Translation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-gray-500 dark:text-gray-400 text-base mt-4 italic"
                    >
                      {currentQ.english}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Grammar rule (shown on wrong answer) */}
                <AnimatePresence>
                  {showResult && selectedAnswer !== currentQ.gap && currentQ.grammarRule && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-4 py-2"
                    >
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-0.5">Grammar Rule</p>
                      <p className="text-sm text-amber-700 dark:text-amber-300">{currentQ.grammarRule}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>

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

            {/* Options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="grid grid-cols-2 gap-3"
            >
              {shuffledOptions.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQ.gap;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={`${currentIndex}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.08 }}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    whileTap={{ scale: showResult ? 1 : 0.95 }}
                    className={`p-4 rounded-xl border-2 text-center font-medium text-lg transition-all ${
                      showCorrect
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : showWrong
                        ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        : showResult
                        ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 opacity-50'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-[#e94560] text-gray-900 dark:text-white'
                    }`}
                  >
                    {showWrong && (
                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: [-4, 4, -4, 4, 0] }}
                        transition={{ duration: 0.4 }}
                        className="inline-block"
                      >
                        {option}
                      </motion.span>
                    )}
                    {!showWrong && option}
                  </motion.button>
                );
              })}
            </motion.div>
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
                {score === TOTAL_QUESTIONS
                  ? 'Perfect!'
                  : score >= 10
                  ? 'Brilliant!'
                  : score >= 7
                  ? 'Great Job!'
                  : score >= 4
                  ? 'Good Effort!'
                  : 'Keep Practicing!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You got {score} out of {TOTAL_QUESTIONS} correct!
              </p>

              {/* Result Dots */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {results.map((correct, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05, type: 'spring' }}
                    className={`w-4 h-4 rounded-full ${
                      correct ? 'bg-emerald-500' : 'bg-red-400'
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-500">{score}</div>
                  <div className="text-xs text-gray-500">Correct</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-500">{TOTAL_QUESTIONS - score}</div>
                  <div className="text-xs text-gray-500">Mistakes</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-500">
                    +{score * 6}
                  </div>
                  <div className="text-xs text-gray-500">XP Earned</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={startGame} fullWidth>
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
