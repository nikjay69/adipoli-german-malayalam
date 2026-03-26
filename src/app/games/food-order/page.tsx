'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowLeft, Clock, Zap, Trophy, RefreshCw } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { Confetti, XPGain } from '@/components/game';
import { GameButton } from '@/components/game';
import { useGameStore } from '@/lib/store';

// ── Food menu items ─────────────────────────────────────────────────────
interface FoodItem {
  id: string;
  german: string;
  english: string;
  emoji: string;
  sentence: string;
}

const MENU_ITEMS: FoodItem[] = [
  { id: 'kaffee', german: 'Kaffee', english: 'coffee', emoji: '☕', sentence: 'Ich möchte einen Kaffee, bitte!' },
  { id: 'brot', german: 'Brot', english: 'bread', emoji: '🍞', sentence: 'Ich möchte Brot, bitte!' },
  { id: 'reis', german: 'Reis', english: 'rice', emoji: '🍚', sentence: 'Ich möchte Reis, bitte!' },
  { id: 'salat', german: 'Salat', english: 'salad', emoji: '🥗', sentence: 'Ich möchte einen Salat, bitte!' },
  { id: 'kuchen', german: 'Kuchen', english: 'cake', emoji: '🍰', sentence: 'Ich möchte Kuchen, bitte!' },
  { id: 'wasser', german: 'Wasser', english: 'water', emoji: '🥤', sentence: 'Ich möchte Wasser, bitte!' },
  { id: 'bier', german: 'Bier', english: 'beer', emoji: '🍺', sentence: 'Ich möchte ein Bier, bitte!' },
  { id: 'nudeln', german: 'Nudeln', english: 'noodles', emoji: '🍝', sentence: 'Ich möchte Nudeln, bitte!' },
];

// ── Kuttan reactions ────────────────────────────────────────────────────
const CORRECT_REACTIONS = [
  "Adipoli! Waiter impressed aanu!",
  "Perfect order machaa! Like a true Berliner!",
  "Seri seri! German restaurant pro!",
  "Wunderbar! Kuttan is eating well tonight!",
  "Super choice da! Guten Appetit!",
  "Richtig! The waiter is smiling!",
];

const WRONG_REACTIONS = [
  "Aiyyo! That's not what we wanted da...",
  "Wrong item machaa! Check the English prompt!",
  "Paravaala! Even Germans mix up orders sometimes!",
  "Hmm, the waiter looks confused...",
  "Not quite da... read the prompt carefully!",
];

const COMBO_REACTIONS = [
  "STAMMGAST! Regular customer status unlocked!",
  "Combo machaa! The chef is cooking extra for you!",
  "ON FIRE! Best customer in the restaurant!",
  "Hat trick! Free dessert for Kuttan!",
];

const COMPLETION_MSGS: Record<string, { msg: string; mood: KuttanMood }> = {
  perfect: { msg: "Adipoli machaa! Perfect order! The waiter wants to give you a VIP card! 8/8!", mood: 'celebrating' },
  great: { msg: "Wunderbar! Almost perfect ordering! The restaurant loves you!", mood: 'excited' },
  good: { msg: "Not bad machaa! You can survive a German restaurant for sure!", mood: 'happy' },
  tryAgain: { msg: "Paravaala da! Let's practice ordering again. Even Kuttan gets confused sometimes!", mood: 'thinking' },
};

// ── Typing effect hook ──────────────────────────────────────────────────
function useTypingEffect(text: string, speed: number = 40) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isComplete };
}

// ── Helpers ─────────────────────────────────────────────────────────────
function shuffleArray<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Component ───────────────────────────────────────────────────────────
export default function FoodOrderGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, learnVocabulary } = useGameStore();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [rounds, setRounds] = useState<FoodItem[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [trayItems, setTrayItems] = useState<FoodItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCombo, setShowCombo] = useState(false);
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [kuttanMsg, setKuttanMsg] = useState("Kuttan is at a German restaurant! Help him order food machaa!");
  const [showXP, setShowXP] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [floatingItem, setFloatingItem] = useState<{ emoji: string; startX: number; startY: number } | null>(null);
  const [waiterPrompt, setWaiterPrompt] = useState('');
  const [showStammgast, setShowStammgast] = useState(false);
  const [hasShownStammgast, setHasShownStammgast] = useState(false);

  const trayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // ── Generate rounds ─────────────────────────────────────────────────
  const generateRounds = useCallback(() => {
    setRounds(shuffleArray([...MENU_ITEMS]));
  }, []);

  useEffect(() => {
    generateRounds();
  }, [generateRounds]);

  // ── Waiter speech ───────────────────────────────────────────────────
  const currentFood = rounds[currentRound];
  const prompt = currentFood ? `Order ${currentFood.english}` : '';
  const waiterQuestion = "Was möchten Sie?";
  const { displayedText: typedQuestion, isComplete: questionTyped } = useTypingEffect(
    gameState === 'playing' ? waiterQuestion : '',
    50
  );

  // ── Timer ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, timeLeft, showResult]);

  // ── Start game ──────────────────────────────────────────────────────
  const startGame = () => {
    generateRounds();
    setGameState('playing');
    setCurrentRound(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(90);
    setTrayItems([]);
    setSelectedItem(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowReceipt(false);
    setHasShownStammgast(false);
    setKuttanMood('excited');
    setKuttanMsg("Let's order some food! Tap the right item machaa!");
  };

  // ── End game ────────────────────────────────────────────────────────
  const endGame = useCallback(() => {
    setGameState('complete');
    incrementGamesPlayed();

    // Learn vocabulary for correctly ordered items
    trayItems.forEach(item => {
      learnVocabulary(`food-${item.id}`);
    });

    const comboBonus = maxStreak >= 3 ? maxStreak * 5 : 0;
    const earnedXP = score * 5 + comboBonus;
    addXP(earnedXP);

    const comp = score === 8 ? COMPLETION_MSGS.perfect
      : score >= 6 ? COMPLETION_MSGS.great
      : score >= 4 ? COMPLETION_MSGS.good
      : COMPLETION_MSGS.tryAgain;

    setKuttanMood(comp.mood);
    setKuttanMsg(comp.msg);
    setShowConfetti(score >= 6);
    setShowReceipt(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, maxStreak, trayItems]);

  // ── Handle food tap ─────────────────────────────────────────────────
  const handleFoodTap = (item: FoodItem, event: React.MouseEvent<HTMLDivElement>) => {
    if (showResult || !currentFood) return;

    setSelectedItem(item.id);
    setShowResult(true);

    const correct = item.id === currentFood.id;
    setIsCorrect(correct);

    if (correct) {
      // Get the position of the clicked element for the flying animation
      const rect = event.currentTarget.getBoundingClientRect();
      setFloatingItem({
        emoji: item.emoji,
        startX: rect.left + rect.width / 2,
        startY: rect.top + rect.height / 2,
      });

      setScore(prev => prev + 1);
      setTrayItems(prev => [...prev, item]);

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      if (newStreak >= 3 && !hasShownStammgast) {
        setShowStammgast(true);
        setHasShownStammgast(true);
        setTimeout(() => setShowStammgast(false), 2000);
        setKuttanMood('celebrating');
        setKuttanMsg(COMBO_REACTIONS[Math.floor(Math.random() * COMBO_REACTIONS.length)]);
      } else if (newStreak >= 3) {
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 800);
        setKuttanMood('celebrating');
        setKuttanMsg(COMBO_REACTIONS[Math.floor(Math.random() * COMBO_REACTIONS.length)]);
      } else {
        setKuttanMood('happy');
        setKuttanMsg(CORRECT_REACTIONS[Math.floor(Math.random() * CORRECT_REACTIONS.length)]);
      }
    } else {
      setStreak(0);
      setKuttanMood('thinking');
      setKuttanMsg(WRONG_REACTIONS[Math.floor(Math.random() * WRONG_REACTIONS.length)]);
    }

    const delay = correct ? 1200 : 1800;
    setTimeout(() => {
      setFloatingItem(null);
      if (currentRound < rounds.length - 1) {
        setCurrentRound(prev => prev + 1);
        setSelectedItem(null);
        setShowResult(false);
        setIsCorrect(false);
      } else {
        endGame();
      }
    }, delay);
  };

  // ── Derived ─────────────────────────────────────────────────────────
  const comboBonus = maxStreak >= 3 ? maxStreak * 5 : 0;
  const totalXP = score * 5 + comboBonus;
  const timerDanger = timeLeft <= 15;

  // ── Receipt items ───────────────────────────────────────────────────
  const receiptTotal = "15,50";

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto relative overflow-hidden">
      {/* Confetti */}
      <Confetti isActive={showConfetti} />

      {/* XP Popup */}
      <XPGain amount={totalXP} isVisible={showXP} onComplete={() => setShowXP(false)} />

      {/* Floating food animation */}
      <AnimatePresence>
        {floatingItem && (
          <motion.div
            className="fixed z-50 text-4xl pointer-events-none"
            initial={{
              left: floatingItem.startX - 20,
              top: floatingItem.startY - 20,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              left: typeof window !== 'undefined' ? window.innerWidth / 2 - 20 : 200,
              top: typeof window !== 'undefined' ? window.innerHeight - 140 : 600,
              scale: 0.6,
              opacity: [1, 1, 0.8],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {floatingItem.emoji}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stammgast badge */}
      <AnimatePresence>
        {showStammgast && (
          <motion.div
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 20, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-[#ffd93d] to-[#ff6b9d] text-white font-black text-xl px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <div className="text-2xl">Stammgast!</div>
                <div className="text-sm font-medium opacity-90">Regular Customer</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        {gameState === 'playing' && (
          <motion.div
            animate={timerDanger ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: timerDanger ? Infinity : 0 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm ${
              timerDanger
                ? 'bg-[#c0392b]/20 text-[#c0392b] border border-[#c0392b]/30'
                : 'bg-[#ffd93d]/15 text-[#ffd93d] border border-[#ffd93d]/20'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Ready Screen ────────────────────────────────────────── */}
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            {/* Character */}
            <div className="mb-6">
              <CharacterGuide
                messages="Kuttan is at a German restaurant! Help him order food machaa! The waiter is waiting!"
                mood="excited"
                size="md"
                showAppu
                appuMood="happy"
              />
            </div>

            {/* Title card */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="game-card p-6 w-full text-center mb-6"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🍽️
              </motion.div>
              <h1 className="text-2xl font-bold mb-2">
                <span className="gradient-text">Food Order</span>
              </h1>
              <p className="text-[var(--foreground)]/50 text-sm mb-4 leading-relaxed">
                The waiter asks &quot;Was möchten Sie?&quot; — tap the right food item from the menu to place your order!
              </p>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-[var(--foreground)]/40">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 90 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" /> 8 rounds
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> Up to 65 XP
                </span>
              </div>

              {/* Menu preview */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {MENU_ITEMS.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    className="bg-[var(--foreground)]/5 rounded-xl p-2 text-center"
                  >
                    <div className="text-2xl">{item.emoji}</div>
                    <div className="text-[10px] text-[var(--foreground)]/40 mt-1">{item.german}</div>
                  </motion.div>
                ))}
              </div>

              <GameButton onClick={startGame} size="lg" fullWidth pulse>
                Start Ordering
              </GameButton>
            </motion.div>
          </motion.div>
        )}

        {/* ── Playing Screen ──────────────────────────────────────── */}
        {gameState === 'playing' && currentFood && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Stats bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#ff6b9d]">{score}/{rounds.length}</div>
                  <div className="text-[10px] text-[var(--foreground)]/40">Ordered</div>
                </div>
                {streak >= 2 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-[#ffd93d]/15 text-[#ffd93d] px-2 py-1 rounded-full text-sm font-bold"
                  >
                    <Zap className="w-3 h-3" />
                    <span>{streak}x</span>
                  </motion.div>
                )}
                {streak >= 3 && (
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-xl"
                  >
                    🔥
                  </motion.span>
                )}
              </div>
              <div className="text-xs text-[var(--foreground)]/40">
                Round {currentRound + 1}/{rounds.length}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-[var(--foreground)]/10 rounded-full mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentRound) / rounds.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>

            {/* Kuttan guide (compact) */}
            <motion.div
              key={kuttanMsg}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-3"
            >
              <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" layout="horizontal" />
            </motion.div>

            {/* Waiter speech bubble */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="game-card p-4 mb-3 border border-[#ffd93d]/20"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl"
                >
                  🧑‍🍳
                </motion.div>
                <div className="flex-1">
                  <div className="text-xs text-[#ffd93d] font-bold mb-1">Waiter</div>
                  <div className="text-sm font-medium min-h-[20px]">
                    {typedQuestion}
                    {!questionTyped && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-[#ffd93d]"
                      >
                        |
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order prompt */}
            <motion.div
              key={currentRound}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-4"
            >
              <motion.p
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-lg font-bold"
              >
                <span className="text-[var(--foreground)]/60">📋 </span>
                <span className="gradient-text">{prompt}</span>
              </motion.p>
              {showResult && isCorrect && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#00d9a5] mt-1 font-medium"
                >
                  &ldquo;{currentFood.sentence}&rdquo;
                </motion.p>
              )}
            </motion.div>

            {/* Menu grid */}
            <div ref={menuRef} className="grid grid-cols-4 gap-2 mb-4">
              {MENU_ITEMS.map((item) => {
                const isSelected = selectedItem === item.id;
                const isCorrectItem = showResult && item.id === currentFood.id;
                const isWrongItem = showResult && isSelected && item.id !== currentFood.id;
                const isOrdered = trayItems.some(t => t.id === item.id) && !isSelected;

                return (
                  <motion.div
                    key={item.id}
                    onClick={(e) => !showResult && !isOrdered && handleFoodTap(item, e)}
                    whileHover={!showResult && !isOrdered ? { scale: 1.08, y: -4 } : {}}
                    whileTap={!showResult && !isOrdered ? { scale: 0.92 } : {}}
                    animate={
                      isCorrectItem
                        ? { scale: [1, 1.15, 1], transition: { duration: 0.4 } }
                        : isWrongItem
                        ? { x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.4 } }
                        : {}
                    }
                    className={`relative rounded-xl p-3 text-center cursor-pointer transition-all border-2 ${
                      isCorrectItem
                        ? 'bg-[#00d9a5]/20 border-[#00d9a5] shadow-[0_0_15px_rgba(0,217,165,0.3)]'
                        : isWrongItem
                        ? 'bg-[#c0392b]/20 border-[#c0392b] shadow-[0_0_15px_rgba(192,57,43,0.3)]'
                        : isOrdered
                        ? 'bg-[var(--foreground)]/5 border-transparent opacity-30'
                        : 'game-card border-transparent hover:border-[#ffd93d]/30'
                    }`}
                  >
                    <motion.div
                      className="text-3xl mb-1"
                      animate={isOrdered ? {} : { y: [0, -2, 0] }}
                      transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                    >
                      {item.emoji}
                    </motion.div>
                    <div className="text-[11px] font-bold">{item.german}</div>
                    {isOrdered && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#00d9a5] rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Tray */}
            <div ref={trayRef}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="game-card p-3 border border-[var(--foreground)]/10"
              >
                <div className="text-xs text-[var(--foreground)]/40 mb-2 font-medium">🍽️ Your Tray</div>
                <div className="flex items-center gap-1 min-h-[36px] flex-wrap">
                  {trayItems.length === 0 ? (
                    <span className="text-xs text-[var(--foreground)]/20">Items will appear here...</span>
                  ) : (
                    trayItems.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                        className="bg-[var(--foreground)]/5 rounded-lg px-2 py-1 text-center"
                      >
                        <span className="text-xl">{item.emoji}</span>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>

            {/* Combo popup */}
            <AnimatePresence>
              {showCombo && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 mt-2"
                >
                  <span className="text-sm font-black text-[#ffd93d] bg-[#ffd93d]/15 px-4 py-1 rounded-full">
                    {streak}x COMBO!
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
          </motion.div>
        )}

        {/* ── Complete Screen ─────────────────────────────────────── */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* Character celebration */}
            <div className="mb-4">
              <CharacterGuide
                messages={kuttanMsg}
                mood={kuttanMood}
                size="md"
                showAppu={score >= 6}
                appuMood="happy"
              />
            </div>

            {/* Trophy */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="mb-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#ffd93d] to-[#ff6b9d] rounded-full flex items-center justify-center shadow-lg shadow-[#ffd93d]/30">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-1"
            >
              {score === 8 ? 'Perfect Order!' : score >= 6 ? 'Great Appetite!' : score >= 4 ? 'Good Try!' : 'Nice Start!'}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-sm text-[var(--foreground)]/50 mb-5"
            >
              You ordered {score} of {rounds.length} items correctly!
            </motion.p>

            {/* Stats grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3 w-full mb-5"
            >
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#ff6b9d]">{score}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">Correct</div>
              </div>
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#ffd93d] flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4" />{maxStreak}
                </div>
                <div className="text-[10px] text-[var(--foreground)]/40">Best Streak</div>
              </div>
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#00d9a5]">+{totalXP}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">XP Earned</div>
              </div>
            </motion.div>

            {/* Receipt animation */}
            <AnimatePresence>
              {showReceipt && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                  className="w-full overflow-hidden mb-5"
                >
                  <div className="game-card p-4 border border-[#ffd93d]/20">
                    <div className="text-center mb-3">
                      <div className="text-xs font-bold text-[#ffd93d] tracking-wider">RECHNUNG / BILL</div>
                      <div className="text-[10px] text-[var(--foreground)]/30 mt-1">Kuttan&apos;s Gasthaus</div>
                    </div>
                    <div className="border-t border-dashed border-[var(--foreground)]/10 pt-2 space-y-1">
                      {trayItems.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="flex items-center justify-between text-xs"
                        >
                          <span>{item.emoji} {item.german}</span>
                          <span className="text-[var(--foreground)]/40">{(1.5 + Math.random() * 3).toFixed(2)} &euro;</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="border-t border-dashed border-[var(--foreground)]/10 mt-2 pt-2 flex items-center justify-between"
                    >
                      <span className="text-sm font-bold">Gesamt</span>
                      <span className="text-sm font-bold text-[#ffd93d]">{receiptTotal} &euro;</span>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-center text-[10px] text-[var(--foreground)]/30 mt-2"
                    >
                      &ldquo;Die Rechnung, bitte!&rdquo; - Das macht {receiptTotal} Euro!
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Streak bonus */}
            {maxStreak >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full mb-4 px-4 py-3 bg-[#ffd93d]/10 rounded-xl border border-[#ffd93d]/20"
              >
                <p className="text-sm text-[#ffd93d] font-medium text-center">
                  🔥 Stammgast streak bonus: +{comboBonus} XP
                </p>
              </motion.div>
            )}

            {/* Actions */}
            <div className="w-full space-y-3">
              <GameButton onClick={() => { generateRounds(); startGame(); }} fullWidth icon={<RefreshCw className="w-5 h-5" />}>
                Play Again
              </GameButton>
              <GameButton variant="ghost" onClick={() => router.push('/games')} fullWidth>
                Back to Games
              </GameButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
