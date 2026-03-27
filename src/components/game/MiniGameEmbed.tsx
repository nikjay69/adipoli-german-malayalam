'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { feedbackCorrect, feedbackWrong, feedbackCelebration } from '@/lib/feedback';
import { speakGerman } from '@/lib/audio/useGermanTTS';

// ── Types ──────────────────────────────────────────────────

interface MiniGameItem {
  german: string;
  english: string;
  category?: string;
}

interface MiniGameEmbedProps {
  /** Game type */
  type: 'speed-tap' | 'quick-sort' | 'listen-pick';
  /** Items to use in the game */
  items: MiniGameItem[];
  /** Categories for quick-sort (exactly 2) */
  categories?: [string, string];
  /** Called when game is complete */
  onComplete: (score: number, total: number) => void;
  /** Time limit in seconds (default 30) */
  timeLimit?: number;
}

// ── Speed Tap ──────────────────────────────────────────────
// Show a German word, tap the correct English meaning from 3 options. Fast!

function SpeedTap({ items, onComplete, timeLimit = 30 }: { items: MiniGameItem[]; onComplete: (s: number, t: number) => void; timeLimit: number }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [done, setDone] = useState(false);

  // Shuffle and pick a subset
  const gameItems = useRef(
    [...items].sort(() => Math.random() - 0.5).slice(0, Math.min(items.length, 10))
  );
  const total = gameItems.current.length;

  // Timer
  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setDone(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [done]);

  // Generate wrong options
  const getOptions = useCallback((correctItem: MiniGameItem) => {
    const wrongs = items
      .filter(i => i.english !== correctItem.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(i => i.english);
    const options = [...wrongs, correctItem.english].sort(() => Math.random() - 0.5);
    return options;
  }, [items]);

  useEffect(() => {
    if (done) {
      feedbackCelebration();
      onComplete(score, total);
    }
  }, [done, score, total, onComplete]);

  if (done || round >= total) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
        <p className="text-2xl mb-2">{score >= total * 0.7 ? '🌟' : '💪'}</p>
        <p className="text-sm font-bold">{score}/{total} correct!</p>
      </motion.div>
    );
  }

  const current = gameItems.current[round];
  const options = getOptions(current);

  const handleTap = (option: string) => {
    if (feedback) return;
    const correct = option === current.english;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) { setScore(s => s + 1); feedbackCorrect(); }
    else { feedbackWrong(); }
    setTimeout(() => {
      setFeedback(null);
      if (round + 1 >= total) setDone(true);
      else setRound(r => r + 1);
    }, 600);
  };

  return (
    <div>
      {/* Timer bar */}
      <div className="h-1.5 bg-[var(--foreground)]/8 rounded-full mb-3 overflow-hidden">
        <motion.div
          className="h-full bg-[#d4a520] rounded-full"
          animate={{ width: `${(timeLeft / timeLimit) * 100}%` }}
        />
      </div>
      <p className="text-center text-2xl font-bold mb-4">{current.german}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <motion.button
            key={`${round}-${i}`}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTap(opt)}
            className={`w-full py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
              feedback && opt === current.english ? 'border-[#27ae60] bg-[#27ae60]/15' :
              feedback === 'wrong' && opt !== current.english ? 'border-[var(--card-border)] opacity-50' :
              'border-[var(--card-border)] bg-[var(--card-bg)]'
            }`}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── Quick Sort ─────────────────────────────────────────────
// Drag/tap items into 2 categories

function QuickSort({ items, categories, onComplete, timeLimit = 45 }: { items: MiniGameItem[]; categories: [string, string]; onComplete: (s: number, t: number) => void; timeLimit: number }) {
  const [remaining, setRemaining] = useState(() =>
    [...items].filter(i => i.category).sort(() => Math.random() - 0.5).slice(0, 8)
  );
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; item: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const total = remaining.length + score + (items.length - remaining.length - score);

  useEffect(() => {
    if (remaining.length === 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setRemaining([]); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining.length]);

  useEffect(() => {
    if (remaining.length === 0 && total > 0) {
      feedbackCelebration();
      onComplete(score, total > 0 ? total : 1);
    }
  }, [remaining.length, score, total, onComplete]);

  if (remaining.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
        <p className="text-2xl mb-2">{score >= total * 0.7 ? '🌟' : '💪'}</p>
        <p className="text-sm font-bold">{score} sorted correctly!</p>
      </motion.div>
    );
  }

  const current = remaining[0];

  const handleSort = (category: string) => {
    if (feedback) return;
    const correct = current.category === category;
    setFeedback({ correct, item: current.german });
    if (correct) { setScore(s => s + 1); feedbackCorrect(); }
    else { feedbackWrong(); }
    setTimeout(() => {
      setFeedback(null);
      setRemaining(prev => prev.slice(1));
    }, 500);
  };

  return (
    <div>
      <div className="h-1.5 bg-[var(--foreground)]/8 rounded-full mb-3 overflow-hidden">
        <motion.div className="h-full bg-[#d4a520] rounded-full" animate={{ width: `${(timeLeft / timeLimit) * 100}%` }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.german}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-center mb-4"
        >
          <p className="text-2xl font-bold">{current.german}</p>
          <p className="text-xs text-[var(--foreground)]/40">{current.english}</p>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-3">
        {categories.map(cat => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSort(cat)}
            className={`py-4 rounded-xl border-2 text-sm font-bold transition-colors ${
              feedback?.correct && current.category === cat ? 'border-[#27ae60] bg-[#27ae60]/15' :
              feedback && !feedback.correct && current.category === cat ? 'border-[#27ae60] bg-[#27ae60]/10' :
              'border-[var(--card-border)] bg-[var(--card-bg)]'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── Listen Pick ────────────────────────────────────────────
// Hear a German word, pick the correct one from 4 options

function ListenPick({ items, onComplete, timeLimit = 30 }: { items: MiniGameItem[]; onComplete: (s: number, t: number) => void; timeLimit: number }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [done, setDone] = useState(false);

  const gameItems = useRef(
    [...items].sort(() => Math.random() - 0.5).slice(0, Math.min(items.length, 8))
  );
  const total = gameItems.current.length;

  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setDone(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [done]);

  // Speak the word when round changes
  useEffect(() => {
    if (!done && gameItems.current[round]) {
      speakGerman(gameItems.current[round].german);
    }
  }, [round, done]);

  useEffect(() => {
    if (done) {
      feedbackCelebration();
      onComplete(score, total);
    }
  }, [done, score, total, onComplete]);

  if (done || round >= total) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
        <p className="text-2xl mb-2">{score >= total * 0.7 ? '👂' : '💪'}</p>
        <p className="text-sm font-bold">{score}/{total} heard correctly!</p>
      </motion.div>
    );
  }

  const current = gameItems.current[round];
  const options = [
    current.german,
    ...items.filter(i => i.german !== current.german).sort(() => Math.random() - 0.5).slice(0, 3).map(i => i.german)
  ].sort(() => Math.random() - 0.5);

  const handlePick = (option: string) => {
    if (feedback) return;
    const correct = option === current.german;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) { setScore(s => s + 1); feedbackCorrect(); }
    else { feedbackWrong(); }
    setTimeout(() => {
      setFeedback(null);
      if (round + 1 >= total) setDone(true);
      else setRound(r => r + 1);
    }, 600);
  };

  return (
    <div>
      <div className="h-1.5 bg-[var(--foreground)]/8 rounded-full mb-3 overflow-hidden">
        <motion.div className="h-full bg-[#d4a520] rounded-full" animate={{ width: `${(timeLeft / timeLimit) * 100}%` }} />
      </div>
      <div className="text-center mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => speakGerman(current.german)}
          className="w-16 h-16 rounded-full bg-gradient-to-b from-[#d4a520] to-[#b8891a] text-white flex items-center justify-center mx-auto text-2xl"
        >
          🔊
        </motion.button>
        <p className="text-xs text-[var(--foreground)]/40 mt-2">Tap to listen again</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, i) => (
          <motion.button
            key={`${round}-${i}`}
            whileTap={{ scale: 0.97 }}
            onClick={() => handlePick(opt)}
            className={`py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
              feedback && opt === current.german ? 'border-[#27ae60] bg-[#27ae60]/15' :
              'border-[var(--card-border)] bg-[var(--card-bg)]'
            }`}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────

/**
 * Lightweight mini-game component that can be embedded within lessons.
 * 30-60 second games that break up the lesson flow and reinforce vocab.
 */
export function MiniGameEmbed({ type, items, categories, onComplete, timeLimit = 30 }: MiniGameEmbedProps) {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#d4a520]/10 to-[#27ae60]/10 border-2 border-[#d4a520]/30 rounded-2xl p-5 text-center"
      >
        <p className="text-2xl mb-2">
          {type === 'speed-tap' ? '⚡' : type === 'quick-sort' ? '📦' : '👂'}
        </p>
        <p className="font-bold text-sm mb-1">
          {type === 'speed-tap' ? 'Speed Tap!' : type === 'quick-sort' ? 'Quick Sort!' : 'Listen & Pick!'}
        </p>
        <p className="text-xs text-[var(--foreground)]/50 mb-3">
          {type === 'speed-tap' ? 'Tap the correct meaning — fast!' :
           type === 'quick-sort' ? 'Sort items into the right category!' :
           'Listen and pick the right word!'}
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setStarted(true)}
          className="px-6 py-2 rounded-xl bg-gradient-to-b from-[#d4a520] to-[#b8891a] text-white font-bold text-sm"
        >
          Play!
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4"
    >
      {type === 'speed-tap' && <SpeedTap items={items} onComplete={onComplete} timeLimit={timeLimit} />}
      {type === 'quick-sort' && categories && <QuickSort items={items} categories={categories} onComplete={onComplete} timeLimit={timeLimit} />}
      {type === 'listen-pick' && <ListenPick items={items} onComplete={onComplete} timeLimit={timeLimit} />}
    </motion.div>
  );
}
