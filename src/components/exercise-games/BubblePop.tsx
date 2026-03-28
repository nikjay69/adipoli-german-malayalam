'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BubblePopProps {
  /** Left items (e.g., German words) */
  leftItems: string[];
  /** Right items (e.g., English translations) — must match leftItems by index */
  rightItems: string[];
  onResult: (correct: boolean) => void;
}

interface Bubble {
  text: string;
  side: 'left' | 'right';
  pairIndex: number;
  x: number;
  y: number;
}

/**
 * Floating bubbles — tap two matching ones to pop them!
 * German on one side, English on the other. Find the pairs.
 */
export function BubblePop({ leftItems, rightItems, onResult }: BubblePopProps) {
  const bubbles = useMemo(() => {
    const all: Bubble[] = [];
    const count = Math.min(leftItems.length, rightItems.length, 4); // Max 4 pairs
    for (let i = 0; i < count; i++) {
      all.push({ text: leftItems[i], side: 'left', pairIndex: i, x: 15 + Math.random() * 30, y: 10 + (i * 22) });
      all.push({ text: rightItems[i], side: 'right', pairIndex: i, x: 55 + Math.random() * 30, y: 10 + (i * 22) });
    }
    return all;
  }, [leftItems, rightItems]);

  const [popped, setPopped] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<Bubble | null>(null);
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const totalPairs = Math.min(leftItems.length, rightItems.length, 4);
  const poppedCount = popped.size;

  const handleTapBubble = (bubble: Bubble) => {
    if (done || popped.has(bubble.pairIndex * 10 + (bubble.side === 'left' ? 0 : 1))) return;

    if (!selected) {
      setSelected(bubble);
      return;
    }

    // Second tap
    if (selected.text === bubble.text && selected.side === bubble.side) {
      setSelected(null); // Deselect same bubble
      return;
    }

    if (selected.pairIndex === bubble.pairIndex && selected.side !== bubble.side) {
      // Match! Pop both
      const newPopped = new Set(popped);
      newPopped.add(bubble.pairIndex * 10);
      newPopped.add(bubble.pairIndex * 10 + 1);
      setPopped(newPopped);
      setSelected(null);

      if (newPopped.size >= totalPairs * 2) {
        setDone(true);
        setTimeout(() => onResult(true), 600);
      }
    } else {
      // Wrong pair
      setWrongPair(`${selected.text}-${bubble.text}`);
      setSelected(null);
      setTimeout(() => setWrongPair(null), 500);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-[var(--foreground)]/60 mb-2">Tap matching pairs to pop them!</p>

      {/* Progress */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: totalPairs }).map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${popped.has(i * 10) ? 'bg-[#27ae60]' : 'bg-[var(--foreground)]/15'}`} />
        ))}
      </div>

      {/* Bubble field */}
      <div className="relative w-full max-w-[320px] h-[240px]">
        <AnimatePresence>
          {bubbles.map((bubble, i) => {
            const isPopped = popped.has(bubble.pairIndex * 10 + (bubble.side === 'left' ? 0 : 1));
            if (isPopped) return null;

            const isSelected = selected?.text === bubble.text && selected?.side === bubble.side;
            const isLeft = bubble.side === 'left';

            return (
              <motion.button
                key={`${bubble.side}-${bubble.pairIndex}`}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  x: [0, isLeft ? -3 : 3, 0],
                  y: [0, -3, 0],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  scale: { duration: 0.3, delay: i * 0.05 },
                  x: { repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' },
                  y: { repeat: Infinity, duration: 2 + i * 0.3, ease: 'easeInOut' },
                }}
                whileTap={{ scale: 0.85 }}
                onClick={() => handleTapBubble(bubble)}
                className={`absolute px-3 py-2 rounded-2xl text-xs font-bold shadow-lg border-2 transition-colors ${
                  isSelected
                    ? 'bg-[#d4a520]/25 border-[#d4a520] text-[#d4a520] scale-110'
                    : isLeft
                    ? 'bg-[#27ae60]/10 border-[#27ae60]/30 text-[#27ae60]'
                    : 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]'
                }`}
                style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
              >
                {bubble.text}
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Wrong flash */}
        {wrongPair && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            className="absolute inset-0 bg-[#c0392b]/10 rounded-2xl pointer-events-none"
          />
        )}

        {/* Done */}
        {done && (
          <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center text-4xl">
            🎉
          </motion.div>
        )}
      </div>
    </div>
  );
}
