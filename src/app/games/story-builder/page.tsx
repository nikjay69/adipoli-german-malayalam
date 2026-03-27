'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, RefreshCw, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { Confetti, Stars } from '@/components/game';
import { useGameStore } from '@/lib/store';

// --- Manglish reaction pools ---
const CORRECT_REACTIONS = [
  "Adipoli! Perfect story order!",
  "Seri machaa! The story makes total sense!",
  "Wunderbar! Kuttan's friends in Kerala are impressed!",
  "Sheriyaayi! Comic panel unlocked!",
  "Super storyteller da!",
  "Richtig! The past tense is strong with this one!",
];
const WRONG_REACTIONS = [
  "Aiyyo! That doesn't flow right!",
  "Paravaala machaa! Think about what happened FIRST!",
  "Hmm, the chronological order is off!",
  "Not quite da... read them again carefully!",
  "Saaramilla! Rearrange and try once more!",
];
const SCENE_COMPLETE_REACTIONS = [
  "Beautiful story panel! Kuttan's friends are loving this!",
  "Adipoli! One more chapter in Kuttan's adventure!",
  "Comic panel complete! Your storytelling is fire!",
  "Wunderbar machaa! The video call audience is clapping!",
];
const GAME_COMPLETE_REACTIONS: Record<string, { msg: string; mood: KuttanMood }> = {
  perfect: {
    msg: "Adipoli machaa! All 4 stories perfect! Kuttan's video call was a mega hit! His friends in Kerala want more stories!",
    mood: 'celebrating',
  },
  great: {
    msg: "Super da! Most stories are in order! Kuttan's friends enjoyed the call!",
    mood: 'happy',
  },
  good: {
    msg: "Not bad machaa! Past tense storytelling takes practice. Kuttan's friends will call again!",
    mood: 'thinking',
  },
  tryAgain: {
    msg: "Paravaala da! Past tense is tricky. Practice makes the story flow!",
    mood: 'sad',
  },
};

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Scene data ---
interface Scene {
  title: string;
  emoji: string;
  backdrop: string; // gradient color
  sentences: string[];
}

const SCENES: Scene[] = [
  {
    title: 'At the Airport',
    emoji: '✈️',
    backdrop: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.1))',
    sentences: [
      'Ich bin um 6 Uhr aufgestanden.',
      'Dann bin ich zum Flughafen gefahren.',
      'Das Flugzeug ist um 10 Uhr geflogen.',
    ],
  },
  {
    title: 'First Day in Berlin',
    emoji: '🏛️',
    backdrop: 'linear-gradient(135deg, rgba(212,165,32,0.15), rgba(245,158,11,0.1))',
    sentences: [
      'Ich habe ein Hotel gefunden.',
      'Dann bin ich in die Stadt gegangen.',
      'Ich habe das Brandenburger Tor gesehen.',
    ],
  },
  {
    title: 'At the University',
    emoji: '🎓',
    backdrop: 'linear-gradient(135deg, rgba(0,217,165,0.15), rgba(52,211,153,0.1))',
    sentences: [
      'Ich habe mich an der Uni angemeldet.',
      'Der Professor hat mich begrüßt.',
      'Wir haben Deutsch gelernt.',
    ],
  },
  {
    title: 'Weekend Trip',
    emoji: '🚂',
    backdrop: 'linear-gradient(135deg, rgba(255,107,157,0.15), rgba(236,72,153,0.1))',
    sentences: [
      'Am Samstag bin ich nach München gefahren.',
      'Ich habe Weißwurst gegessen.',
      'Abends habe ich Freunde getroffen.',
    ],
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

export default function StoryBuilderGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'scene-complete' | 'complete'>('ready');
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [shuffledSentences, setShuffledSentences] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]); // indices into shuffledSentences
  const [sceneScores, setSceneScores] = useState<boolean[]>([]); // true if scene was correct on first try
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<'correct' | 'wrong' | null>(null);
  const [completedPanels, setCompletedPanels] = useState<{ scene: Scene; sentences: string[] }[]>([]);
  const [reactionText, setReactionText] = useState('');
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [showConfetti, setShowConfetti] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showComicStrip, setShowComicStrip] = useState(false);

  const currentScene = SCENES[currentSceneIndex];

  const setupScene = useCallback((sceneIdx: number) => {
    const scene = SCENES[sceneIdx];
    setShuffledSentences(shuffleArray(scene.sentences));
    setSelectedOrder([]);
    setCheckResult(null);
    setIsChecking(false);
    setAttempts(0);
    setKuttanMood('thinking');
    setReactionText('');
  }, []);

  useEffect(() => {
    setupScene(0);
  }, [setupScene]);

  const startGame = () => {
    setGameState('playing');
    setCurrentSceneIndex(0);
    setSceneScores([]);
    setCompletedPanels([]);
    setShowConfetti(false);
    setShowComicStrip(false);
    setupScene(0);
  };

  const handleSentenceTap = (sentenceIndex: number) => {
    if (isChecking) return;

    // If already selected, deselect it
    const existingPos = selectedOrder.indexOf(sentenceIndex);
    if (existingPos !== -1) {
      setSelectedOrder((prev) => prev.filter((idx) => idx !== sentenceIndex));
      return;
    }

    // Add to order
    if (selectedOrder.length < 3) {
      setSelectedOrder((prev) => [...prev, sentenceIndex]);
    }
  };

  const checkOrder = () => {
    if (selectedOrder.length !== 3 || isChecking) return;
    setIsChecking(true);

    // Build the user's ordering
    const userOrder = selectedOrder.map((idx) => shuffledSentences[idx]);
    const correctOrder = currentScene.sentences;

    const isCorrect = userOrder.every((s, i) => s === correctOrder[i]);

    setCheckResult(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setKuttanMood('celebrating');
      setReactionText(pickRandom(CORRECT_REACTIONS));

      // Record score (correct on first attempt)
      setSceneScores((prev) => [...prev, attempts === 0]);

      // Build panel
      setCompletedPanels((prev) => [
        ...prev,
        { scene: currentScene, sentences: correctOrder },
      ]);

      // Transition to scene complete
      setTimeout(() => {
        setGameState('scene-complete');
        setReactionText(pickRandom(SCENE_COMPLETE_REACTIONS));
      }, 1500);
    } else {
      setKuttanMood('sad');
      setReactionText(pickRandom(WRONG_REACTIONS));
      setAttempts((prev) => prev + 1);

      // Reset after shake animation
      setTimeout(() => {
        setSelectedOrder([]);
        setCheckResult(null);
        setIsChecking(false);
        setKuttanMood('thinking');
      }, 1500);
    }
  };

  const nextScene = () => {
    if (currentSceneIndex < SCENES.length - 1) {
      const next = currentSceneIndex + 1;
      setCurrentSceneIndex(next);
      setGameState('playing');
      setupScene(next);
    } else {
      // All scenes done
      endGame();
    }
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();

    const perfectScenes = sceneScores.filter(Boolean).length;
    const earnedXP = sceneScores.length * 15 + perfectScenes * 10;
    addXP(earnedXP);

    if (perfectScenes === 4) {
      setKuttanMood(GAME_COMPLETE_REACTIONS.perfect.mood);
      setReactionText(GAME_COMPLETE_REACTIONS.perfect.msg);
      setShowConfetti(true);
    } else if (perfectScenes >= 3) {
      setKuttanMood(GAME_COMPLETE_REACTIONS.great.mood);
      setReactionText(GAME_COMPLETE_REACTIONS.great.msg);
    } else if (perfectScenes >= 1) {
      setKuttanMood(GAME_COMPLETE_REACTIONS.good.mood);
      setReactionText(GAME_COMPLETE_REACTIONS.good.msg);
    } else {
      setKuttanMood(GAME_COMPLETE_REACTIONS.tryAgain.mood);
      setReactionText(GAME_COMPLETE_REACTIONS.tryAgain.msg);
    }
  };

  const totalScenes = SCENES.length;
  const perfectScenes = sceneScores.filter(Boolean).length;
  const earnedXP = sceneScores.length * 15 + perfectScenes * 10;
  const scorePct = (sceneScores.length / totalScenes) * 100;

  const getStars = () => {
    if (perfectScenes === 4) return 3;
    if (perfectScenes >= 2) return 2;
    if (sceneScores.length >= 2) return 1;
    return 0;
  };

  const getOrderNumber = (sentenceIndex: number): number | null => {
    const pos = selectedOrder.indexOf(sentenceIndex);
    return pos !== -1 ? pos + 1 : null;
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto relative min-h-screen">
      <Confetti isActive={showConfetti} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        {gameState === 'playing' && (
          <div className="flex items-center gap-2">
            {SCENES.map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    i < currentSceneIndex
                      ? 'var(--success)'
                      : i === currentSceneIndex
                      ? 'var(--primary)'
                      : 'rgba(245,240,232,0.2)',
                }}
                animate={i === currentSceneIndex ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
          </div>
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
              messages="Kuttan is video-calling his friends in Kerala! He wants to tell stories about his life in Germany — in PAST TENSE! Help him arrange the sentences in the right order!"
              mood="excited"
              size="lg"
              showAppu
              appuMood="happy"
              className="mb-6"
            />

            <div className="glass-card p-6 w-full text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-6xl mb-4"
              >
                📖
              </motion.div>

              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2 gradient-text">
                Story Builder
              </h1>
              <p className="text-[var(--foreground)]/70 mb-4 text-sm">
                4 scenes from Kuttan&apos;s Germany adventure! Arrange 3 past-tense sentences in
                chronological order to build each story panel!
              </p>

              {/* Scene preview */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {SCENES.map((scene, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="glass-card p-2 text-center"
                    style={{ background: scene.backdrop }}
                  >
                    <span className="text-2xl">{scene.emoji}</span>
                    <p className="text-[10px] text-[var(--foreground)]/50 mt-1 leading-tight">
                      {scene.title}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" /> 4 scenes
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-[#d4a520]" /> Up to 100 XP
                </span>
              </div>

              <button onClick={startGame} className="game-button text-lg w-full py-4">
                Start Video Call
              </button>
            </div>
          </motion.div>
        )}

        {/* ==================== PLAYING SCREEN ==================== */}
        {gameState === 'playing' && currentScene && (
          <motion.div
            key={`scene-${currentSceneIndex}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            {/* Kuttan reaction */}
            <AnimatePresence>
              {reactionText && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl"
                  style={{
                    background:
                      checkResult === 'correct'
                        ? 'rgba(0,217,165,0.12)'
                        : checkResult === 'wrong'
                        ? 'rgba(192,57,43,0.12)'
                        : 'rgba(212,165,32,0.1)',
                    border:
                      checkResult === 'correct'
                        ? '1px solid rgba(0,217,165,0.3)'
                        : checkResult === 'wrong'
                        ? '1px solid rgba(192,57,43,0.3)'
                        : '1px solid rgba(212,165,32,0.2)',
                  }}
                >
                  <span className="text-lg">
                    {checkResult === 'correct' ? '✅' : checkResult === 'wrong' ? '😬' : '💡'}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{
                      color:
                        checkResult === 'correct'
                          ? 'var(--success)'
                          : checkResult === 'wrong'
                          ? 'var(--danger)'
                          : '#d4a520',
                    }}
                  >
                    {reactionText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scene Header with parallax backdrop */}
            <motion.div
              className="glass-card p-5 mb-4 relative overflow-hidden"
              style={{ background: currentScene.backdrop }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Parallax emoji backdrop */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-10"
                animate={{ y: [-5, 5, -5], x: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-[120px]">{currentScene.emoji}</span>
              </motion.div>

              <div className="relative z-10 text-center">
                <motion.span
                  className="text-4xl inline-block mb-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {currentScene.emoji}
                </motion.span>
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  Scene {currentSceneIndex + 1}: {currentScene.title}
                </h2>
                <p className="text-xs text-[var(--foreground)]/50 mt-1">
                  Tap sentences in chronological order (1, 2, 3)
                </p>
              </div>
            </motion.div>

            {/* Sentence Cards */}
            <div className="space-y-3 mb-6">
              {shuffledSentences.map((sentence, index) => {
                const orderNum = getOrderNumber(index);
                const isSelected = orderNum !== null;
                const isWrongShake = checkResult === 'wrong' && isSelected;

                return (
                  <motion.button
                    key={`${currentSceneIndex}-${index}`}
                    onClick={() => handleSentenceTap(index)}
                    disabled={isChecking && checkResult === 'correct'}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: isWrongShake ? [-8, 8, -8, 8, 0] : 0,
                    }}
                    transition={
                      isWrongShake
                        ? { duration: 0.4 }
                        : { delay: index * 0.12, type: 'spring', stiffness: 200 }
                    }
                    whileTap={isChecking ? {} : { scale: 0.98 }}
                    className="w-full p-4 rounded-xl text-left font-medium text-sm transition-all relative"
                    style={{
                      background: isSelected
                        ? checkResult === 'correct'
                          ? 'rgba(0,217,165,0.15)'
                          : checkResult === 'wrong'
                          ? 'rgba(192,57,43,0.15)'
                          : 'rgba(212,165,32,0.1)'
                        : 'var(--card-bg)',
                      border: isSelected
                        ? checkResult === 'correct'
                          ? '2px solid rgba(0,217,165,0.5)'
                          : checkResult === 'wrong'
                          ? '2px solid rgba(192,57,43,0.5)'
                          : '2px solid rgba(212,165,32,0.5)'
                        : '2px solid var(--card-border)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Order number badge */}
                      <AnimatePresence mode="wait">
                        {orderNum !== null ? (
                          <motion.div
                            key={`num-${orderNum}`}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
                            style={{
                              background:
                                checkResult === 'correct'
                                  ? 'var(--success)'
                                  : checkResult === 'wrong'
                                  ? 'var(--danger)'
                                  : '#d4a520',
                              color: '#1a1a2e',
                            }}
                          >
                            {orderNum}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="empty"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center"
                            style={{ borderColor: 'rgba(245,240,232,0.2)' }}
                          >
                            <span className="text-xs text-[var(--foreground)]/30">?</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <span className="flex-1">{sentence}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Check button */}
            <motion.button
              onClick={checkOrder}
              disabled={selectedOrder.length !== 3 || (isChecking && checkResult === 'correct')}
              whileTap={selectedOrder.length === 3 ? { scale: 0.98 } : {}}
              className="game-button text-base w-full py-3 flex items-center justify-center gap-2"
              style={{
                opacity: selectedOrder.length !== 3 ? 0.5 : 1,
              }}
              animate={
                selectedOrder.length === 3 && !isChecking
                  ? { scale: [1, 1.02, 1] }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <CheckCircle2 className="w-5 h-5" />
              Check Order
            </motion.button>

            {attempts > 0 && !isChecking && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-xs text-[var(--foreground)]/40 mt-2"
              >
                Attempt {attempts + 1} — Think about what happened first!
              </motion.p>
            )}
          </motion.div>
        )}

        {/* ==================== SCENE COMPLETE ==================== */}
        {gameState === 'scene-complete' && (
          <motion.div
            key={`scene-complete-${currentSceneIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex flex-col items-center"
          >
            {/* Comic Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-5 w-full mb-4 relative overflow-hidden"
              style={{
                background: currentScene.backdrop,
                border: '2px solid rgba(212,165,32,0.3)',
              }}
            >
              {/* Panel header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{currentScene.emoji}</span>
                <h3 className="text-base font-bold text-[var(--foreground)]">
                  {currentScene.title}
                </h3>
                {sceneScores[sceneScores.length - 1] && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: 'var(--success)', color: '#1a1a2e' }}
                  >
                    Perfect!
                  </motion.span>
                )}
              </div>

              {/* Sentences flying in one by one */}
              {currentScene.sentences.map((sentence, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.3, type: 'spring', stiffness: 200 }}
                  className="flex items-start gap-2 mb-2"
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(212,165,32,0.3)', color: '#d4a520' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-[var(--foreground)]/80">{sentence}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Kuttan */}
            <CharacterGuide
              messages={reactionText}
              mood={kuttanMood}
              size="sm"
              className="mb-4"
            />

            {/* Progress dots */}
            <div className="flex items-center gap-3 mb-4">
              {SCENES.map((scene, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-xl">{scene.emoji}</span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background:
                        i <= currentSceneIndex ? 'var(--success)' : 'rgba(245,240,232,0.2)',
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <button
              onClick={nextScene}
              className="game-button text-base w-full py-3 flex items-center justify-center gap-2"
            >
              {currentSceneIndex < SCENES.length - 1 ? (
                <>
                  Next Scene
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                    →
                  </motion.span>
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                  See Results
                </>
              )}
            </button>
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
            {/* Comic Strip Toggle */}
            {!showComicStrip ? (
              <>
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  className="text-center mb-4"
                >
                  <motion.span
                    className="text-6xl inline-block"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📖
                  </motion.span>
                </motion.div>

                <CharacterGuide
                  messages={reactionText}
                  mood={kuttanMood}
                  size="md"
                  showAppu={perfectScenes === 4}
                  appuMood={perfectScenes === 4 ? 'celebrating' : 'idle'}
                  className="mb-4"
                />

                <div className="glass-card p-6 w-full text-center">
                  <h1
                    className="text-2xl font-bold mb-2"
                    style={{
                      color:
                        perfectScenes === 4
                          ? 'var(--success)'
                          : perfectScenes >= 2
                          ? 'var(--primary)'
                          : 'var(--foreground)',
                    }}
                  >
                    {perfectScenes === 4
                      ? 'Perfect Storyteller!'
                      : perfectScenes >= 3
                      ? 'Great Stories!'
                      : perfectScenes >= 1
                      ? 'Good Effort!'
                      : 'Keep Practicing!'}
                  </h1>

                  <div className="flex justify-center mb-4">
                    <Stars rating={getStars()} size="lg" animated />
                  </div>

                  <p className="text-[var(--foreground)]/70 mb-4">
                    {sceneScores.length} scenes completed, {perfectScenes} perfect on first try!
                  </p>

                  {/* Scene Results */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {SCENES.map((scene, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="glass-card p-2 text-center"
                        style={{ background: scene.backdrop }}
                      >
                        <span className="text-xl">{scene.emoji}</span>
                        <div className="mt-1">
                          {i < sceneScores.length ? (
                            sceneScores[i] ? (
                              <CheckCircle2
                                className="w-4 h-4 mx-auto"
                                style={{ color: 'var(--success)' }}
                              />
                            ) : (
                              <XCircle
                                className="w-4 h-4 mx-auto"
                                style={{ color: '#e67e22' }}
                              />
                            )
                          ) : (
                            <div
                              className="w-4 h-4 mx-auto rounded-full"
                              style={{ background: 'rgba(245,240,232,0.1)' }}
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="glass-card p-3">
                      <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                        {sceneScores.length}
                      </div>
                      <div className="text-xs text-[var(--foreground)]/50">Scenes Done</div>
                    </div>
                    <div className="glass-card p-3">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: 'var(--success)' }}
                      >
                        {perfectScenes}
                      </div>
                      <div className="text-xs text-[var(--foreground)]/50">Perfect</div>
                    </div>
                    <div className="glass-card p-3">
                      <div className="text-2xl font-bold" style={{ color: '#d4a520' }}>
                        +{earnedXP}
                      </div>
                      <div className="text-xs text-[var(--foreground)]/50">XP Earned</div>
                    </div>
                  </div>

                  {/* Show comic strip button */}
                  <button
                    onClick={() => setShowComicStrip(true)}
                    className="w-full py-3 rounded-xl text-base font-medium mb-3 flex items-center justify-center gap-2"
                    style={{
                      background: 'rgba(212,165,32,0.1)',
                      border: '1px solid rgba(212,165,32,0.3)',
                      color: '#d4a520',
                    }}
                  >
                    <BookOpen className="w-5 h-5" />
                    View Comic Strip
                  </button>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setShowConfetti(false);
                        startGame();
                      }}
                      className="game-button text-base w-full py-3 flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Play Again
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
              </>
            ) : (
              /* ==================== COMIC STRIP VIEW ==================== */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <h2 className="text-xl font-bold text-[var(--foreground)] text-center mb-4 gradient-text">
                  Kuttan&apos;s Germany Adventure
                </h2>

                {/* Horizontal scrolling comic strip */}
                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                  <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                    {completedPanels.map((panel, panelIdx) => (
                      <motion.div
                        key={panelIdx}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: panelIdx * 0.2 }}
                        className="glass-card p-4 flex-shrink-0"
                        style={{
                          width: '280px',
                          background: panel.scene.backdrop,
                          border: '2px solid rgba(212,165,32,0.2)',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{panel.scene.emoji}</span>
                          <h3 className="text-sm font-bold text-[var(--foreground)]">
                            {panel.scene.title}
                          </h3>
                        </div>
                        {panel.sentences.map((sentence, si) => (
                          <motion.div
                            key={si}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: panelIdx * 0.2 + si * 0.15 }}
                            className="flex items-start gap-2 mb-2"
                          >
                            <span
                              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                              style={{ background: 'rgba(212,165,32,0.3)', color: '#d4a520' }}
                            >
                              {si + 1}
                            </span>
                            <p className="text-xs text-[var(--foreground)]/70 leading-relaxed">
                              {sentence}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <p className="text-center text-xs text-[var(--foreground)]/30 mt-2 mb-4">
                  ← Scroll to see all panels →
                </p>

                {/* Kuttan narrates */}
                <CharacterGuide
                  messages="And that's Kuttan's Germany story! His Kerala friends are super impressed with his Perfekt tense skills!"
                  mood="celebrating"
                  size="sm"
                  showAppu
                  appuMood="celebrating"
                  className="mb-4"
                />

                <button
                  onClick={() => setShowComicStrip(false)}
                  className="game-button text-base w-full py-3"
                >
                  Back to Results
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
