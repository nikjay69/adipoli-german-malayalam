'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock, CheckCircle, Zap } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { CharacterGuide } from '@/components/character';
import { Kuttan } from '@/components/character/Kuttan';
import type { KuttanMood } from '@/components/character';
import { Confetti } from '@/components/game';
import { useGameStore } from '@/lib/store';

// Haptic + vibration helper — gated for SSR safety
function vibrateShort() {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate?.(20);
  }
}

// ── Kuttan Manglish reactions ──────────────────────────────────────────
const CORRECT_REACTIONS = [
  "Perfect sentence machaa!",
  "The university will love this!",
  "German grammar pro!",
  "Adipoli! Nailed it!",
  "Seri seri! Perfect!",
  "Wunderbar machaa!",
  "Sheriyaayi! You got it!",
  "Super ayi! Keep going!",
  "Richtig! Nee pro aanu!",
];

const WRONG_REACTIONS = [
  "Hmm, the word order isn't right. German puts the verb in position 2!",
  "Aiyyo! Almost there! Try rearranging!",
  "Paravaala machaa! Try again!",
  "Not quite da... think about the verb position!",
  "Hmm close! Shuffle those words around!",
];

const COMPLETION_MSGS: Record<string, { msg: string; mood: KuttanMood }> = {
  perfect: { msg: "Adipoli machaa! The university will accept you for sure! All 10 perfect!", mood: 'celebrating' },
  great: { msg: "Wunderbar! Kuttan is proud of you! Almost perfect!", mood: 'excited' },
  good: { msg: "Not bad machaa! A little more practice and you'll be writing essays!", mood: 'happy' },
  tryAgain: { msg: "Paravaala da! Even Kuttan struggled at first. Let's try again!", mood: 'thinking' },
};

interface Sentence {
  words: string[];
  correct: string;
}

const SENTENCES: Sentence[] = [
  { words: ["Ich", "bin", "aus", "Kerala"], correct: "Ich bin aus Kerala" },
  { words: ["Wie", "heißt", "du", "?"], correct: "Wie heißt du?" },
  { words: ["Ich", "lerne", "Deutsch"], correct: "Ich lerne Deutsch" },
  { words: ["Das", "ist", "mein", "Bruder"], correct: "Das ist mein Bruder" },
  { words: ["Wo", "ist", "der", "Bahnhof", "?"], correct: "Wo ist der Bahnhof?" },
  { words: ["Ich", "möchte", "einen", "Kaffee"], correct: "Ich möchte einen Kaffee" },
  { words: ["Er", "spricht", "Deutsch", "und", "Englisch"], correct: "Er spricht Deutsch und Englisch" },
  { words: ["Meine", "Mutter", "ist", "Ärztin"], correct: "Meine Mutter ist Ärztin" },
  { words: ["Wir", "gehen", "in", "die", "Schule"], correct: "Wir gehen in die Schule" },
  { words: ["Ich", "habe", "zwei", "Geschwister"], correct: "Ich habe zwei Geschwister" },
  { words: ["Um", "wie", "viel", "Uhr", "?"], correct: "Um wie viel Uhr?" },
  { words: ["Sie", "kommt", "aus", "Deutschland"], correct: "Sie kommt aus Deutschland" },
  { words: ["Ich", "esse", "gern", "Reis"], correct: "Ich esse gern Reis" },
  { words: ["Der", "Zug", "fährt", "um", "drei"], correct: "Der Zug fährt um drei" },
  { words: ["Können", "Sie", "mir", "helfen", "?"], correct: "Können Sie mir helfen?" },
  { words: ["Ich", "bin", "Student", "in", "Berlin"], correct: "Ich bin Student in Berlin" },
  { words: ["Wie", "geht", "es", "Ihnen", "?"], correct: "Wie geht es Ihnen?" },
  { words: ["Ich", "habe", "Deutsch", "gelernt"], correct: "Ich habe Deutsch gelernt" },
  { words: ["Das", "Essen", "schmeckt", "sehr", "gut"], correct: "Das Essen schmeckt sehr gut" },
  { words: ["Ich", "fahre", "mit", "dem", "Bus"], correct: "Ich fahre mit dem Bus" },
];

export default function SentenceBuilderGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledWords, setScrambledWords] = useState<{ word: string; id: number }[]>([]);
  const [placedWords, setPlacedWords] = useState<{ word: string; id: number }[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [kuttanMsg, setKuttanMsg] = useState("Kuttan is writing a letter to his German university. Help him build proper sentences!");
  const [combo, setCombo] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const pickSentences = useCallback(() => {
    const picked = shuffleArray(SENTENCES).slice(0, 10);
    setSentences(picked);
  }, []);

  const loadSentence = useCallback((index: number, sentenceList: Sentence[]) => {
    const sentence = sentenceList[index];
    if (!sentence) return;
    const wordsWithIds = sentence.words.map((word, i) => ({ word, id: i }));
    setScrambledWords(shuffleArray(wordsWithIds));
    setPlacedWords([]);
    setFeedback(null);
  }, []);

  useEffect(() => {
    pickSentences();
  }, [pickSentences]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    const picked = shuffleArray(SENTENCES).slice(0, 10);
    setSentences(picked);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(90);
    setFeedback(null);
    setKuttanMood('excited');
    setKuttanMsg("Let's build some sentences! Tap the words in order!");
    setGameState('playing');
    loadSentence(0, picked);
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    const earnedXP = score * 8;
    addXP(earnedXP);
    const pct = score / 10;
    if (pct >= 0.8) {
      setKuttanMood('excited');
      setKuttanMsg('Adipoli! You crushed it! German sentences flowing like poetry machaa!');
      setShowConfetti(true);
    } else if (pct >= 0.5) {
      setKuttanMood('happy');
      setKuttanMsg('Poli, machaa! Closer next round? Verb position is tricky — we got this!');
    } else {
      setKuttanMood('thinking');
      setKuttanMsg("That's okay — tricky words. One more? Kuttan believes in you!");
    }
  };

  const handleWordTap = (tappedWord: { word: string; id: number }) => {
    if (feedback) return;
    setScrambledWords(prev => prev.filter(w => w.id !== tappedWord.id));
    setPlacedWords(prev => [...prev, tappedWord]);
  };

  const handlePlacedWordTap = (tappedWord: { word: string; id: number }) => {
    if (feedback) return;
    setPlacedWords(prev => prev.filter(w => w.id !== tappedWord.id));
    setScrambledWords(prev => [...prev, tappedWord]);
  };

  const handleCheck = () => {
    if (feedback || placedWords.length === 0) return;

    const builtSentence = placedWords.map(w => w.word).join(' ');
    const currentSentence = sentences[currentIndex];

    if (builtSentence === currentSentence.correct) {
      setFeedback('correct');
      setScore(prev => prev + 1);
      setCombo(prev => prev + 1);
      vibrateShort();
      setKuttanMood('celebrating');
      setKuttanMsg(CORRECT_REACTIONS[Math.floor(Math.random() * CORRECT_REACTIONS.length)]);

      setTimeout(() => {
        setKuttanMood('happy');
        if (currentIndex < sentences.length - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          loadSentence(nextIndex, sentences);
          setKuttanMsg("Next sentence! Let's go!");
        } else {
          endGame();
        }
      }, 800);
    } else {
      setFeedback('wrong');
      setCombo(0);
      setKuttanMood('thinking');
      setKuttanMsg(WRONG_REACTIONS[Math.floor(Math.random() * WRONG_REACTIONS.length)]);
      setTimeout(() => {
        setFeedback(null);
        setKuttanMood('pointing');
        setKuttanMsg("Try again machaa! Rearrange the words!");
      }, 600);
    }
  };

  const currentSentence = sentences[currentIndex];
  const progress = sentences.length > 0 ? ((currentIndex) / sentences.length) * 100 : 0;
  const allWordsPlaced = currentSentence && placedWords.length === currentSentence.words.length;
  const earnedXP = score * 8;

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <Confetti isActive={showConfetti} />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        {gameState === 'playing' && (
          <motion.div
            animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3, repeat: timeLeft <= 10 ? Infinity : 0 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold ${
              timeLeft <= 10 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>{timeLeft}s</span>
          </motion.div>
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
            <div className="game-card p-6 text-center">
              <div className="mb-4 flex justify-center">
                <Kuttan mood="excited" size="lg" />
              </div>
              <h1 className="text-3xl font-bold mb-2 gradient-text">
                Sentence Builder
              </h1>
              <p className="text-[var(--foreground)]/80 mb-2 text-base font-semibold">
                Machaa! Kuttan&apos;s writing to his German uni — drag the words in order and let&apos;s sound adipoli!
              </p>
              <p className="text-[var(--foreground)]/50 mb-6 text-sm">
                Verb in position 2, subject first — we&apos;ll crack this together!
              </p>
              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/60">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 90s
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#d4a520]" /> 10 sentences
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#d4a520]" /> Up to 80 XP
                </span>
              </div>
              <button
                onClick={startGame}
                className="w-full py-4 rounded-xl text-lg font-bold text-white transition-transform active:scale-95"
                style={{ background: 'linear-gradient(135deg, #d4a520, #e94560)', minHeight: '52px' }}
              >
                Poraa machaa — let&apos;s build!
              </button>
            </div>
          </motion.div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && currentSentence && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Kuttan Guide */}
            <div className="mb-4">
              <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" />
            </div>

            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="text-center"
                  animate={{ scale: score > 0 ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                  key={score}
                >
                  <div className="text-xl font-bold text-[#e94560]">{score}</div>
                  <div className="text-xs text-[var(--foreground)]/50">Score</div>
                </motion.div>
                {combo >= 2 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-xs"
                    style={{
                      background: 'linear-gradient(135deg, #d4a520, #e94560)',
                      color: '#fff',
                    }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{combo}x combo</span>
                  </motion.div>
                )}
              </div>
              <div className="text-sm text-[var(--foreground)]/60">
                Sentence {currentIndex + 1}/{sentences.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <ProgressBar
                progress={progress}
                color="primary"
                size="sm"
              />
            </div>

            {/* Built Sentence Area */}
            <Card className="mb-4">
              <div className="min-h-[80px] flex flex-wrap items-center justify-center gap-2 py-2">
                {placedWords.length === 0 ? (
                  <p className="text-gray-400 dark:text-gray-500 text-sm italic">
                    Tap words below to build the sentence...
                  </p>
                ) : (
                  <AnimatePresence>
                    {placedWords.map((item) => (
                      <motion.button
                        key={`placed-${item.id}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          backgroundColor:
                            feedback === 'correct'
                              ? '#10b981'
                              : undefined,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        onClick={() => handlePlacedWordTap(item)}
                        className={`px-4 py-2 rounded-xl font-medium text-base transition-colors ${
                          feedback === 'correct'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#e94560] text-white hover:bg-[#d63d56]'
                        }`}
                      >
                        {item.word}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Shake wrapper for wrong answers */}
              {feedback === 'wrong' && (
                <motion.div
                  className="h-0.5 bg-red-500 rounded-full mx-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </Card>

            {/* Feedback Messages */}
            <AnimatePresence>
              {feedback === 'correct' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center mb-3"
                >
                  <span className="text-emerald-500 font-bold text-lg">Adipoli! Correct!</span>
                </motion.div>
              )}
              {feedback === 'wrong' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0, x: [-8, 8, -8, 8, 0] }}
                  exit={{ opacity: 0 }}
                  className="text-center mb-3"
                >
                  <span className="text-red-500 font-bold text-lg">Aiyyo! Try again!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrambled Word Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <AnimatePresence>
                {scrambledWords.map((item, index) => (
                  <motion.button
                    key={`scrambled-${item.id}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.05,
                    }}
                    onClick={() => handleWordTap(item)}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-3 min-h-[44px] min-w-[44px] rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#e94560] dark:hover:border-[#e94560] text-gray-900 dark:text-white font-medium text-base shadow-sm hover:shadow-md transition-all active:scale-95"
                  >
                    {item.word}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* Check Button */}
            <Button
              onClick={handleCheck}
              disabled={!allWordsPlaced || feedback !== null}
              fullWidth
              variant={allWordsPlaced ? 'success' : 'ghost'}
              size="lg"
            >
              <CheckCircle className="w-5 h-5" />
              Check Answer
            </Button>
          </motion.div>
        )}

        {/* Complete Screen */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="game-card p-6 text-center">
              <div className="mb-4 flex justify-center">
                <Kuttan mood={kuttanMood} size="lg" />
              </div>

              <h1 className="text-3xl font-bold mb-2 gradient-text">
                {score >= 8 ? 'Adipoli!' : score >= 5 ? 'Poli, machaa!' : 'Paravaala!'}
              </h1>
              <p className="text-[var(--foreground)]/80 mb-6 text-sm font-medium">
                {kuttanMsg}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold text-[#27ae60]">{score}</div>
                  <div className="text-xs text-[var(--foreground)]/50">Correct</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-2xl font-bold text-[#c0392b]">{10 - score}</div>
                  <div className="text-xs text-[var(--foreground)]/50">Missed</div>
                </div>
                <motion.div
                  className="glass-card p-3"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.1, 1] }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="text-2xl font-bold text-[#d4a520]">
                    +{earnedXP}
                  </div>
                  <div className="text-xs text-[var(--foreground)]/50">XP</div>
                </motion.div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={startGame}
                  className="w-full py-3 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 transition-transform active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #d4a520, #e94560)', minHeight: '48px' }}
                >
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </button>
                <button
                  onClick={() => router.push('/games')}
                  className="w-full py-3 rounded-xl text-base font-medium text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors active:scale-95"
                  style={{ background: 'rgba(245,240,232,0.05)', minHeight: '48px' }}
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
