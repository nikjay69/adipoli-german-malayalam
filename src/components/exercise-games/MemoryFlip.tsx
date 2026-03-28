'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { feedbackCorrect, feedbackWrong } from '@/lib/feedback';

interface MemoryFlipProps {
  /** Pairs: [german, english][] */
  pairs: [string, string][];
  onResult: (correct: boolean) => void;
}

interface Card {
  id: string;
  text: string;
  pairId: number;
  side: 'german' | 'english';
}

/**
 * Memory flip card game — tap cards to find matching pairs.
 * German word ↔ English meaning.
 */
export function MemoryFlip({ pairs, onResult }: MemoryFlipProps) {
  const cards = useMemo(() => {
    const all: Card[] = [];
    const usePairs = pairs.slice(0, 4); // Max 4 pairs = 8 cards
    usePairs.forEach(([german, english], i) => {
      all.push({ id: `g-${i}`, text: german, pairId: i, side: 'german' });
      all.push({ id: `e-${i}`, text: english, pairId: i, side: 'english' });
    });
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }, [pairs]);

  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<Card | null>(null);
  const [lockBoard, setLockBoard] = useState(false);

  const handleFlip = (card: Card) => {
    if (lockBoard || flipped.has(card.id) || matched.has(card.pairId)) return;

    const newFlipped = new Set(flipped);
    newFlipped.add(card.id);
    setFlipped(newFlipped);

    if (!selected) {
      setSelected(card);
      return;
    }

    // Second card flipped
    setLockBoard(true);
    if (selected.pairId === card.pairId && selected.side !== card.side) {
      // Match!
      feedbackCorrect();
      const newMatched = new Set(matched);
      newMatched.add(card.pairId);
      setMatched(newMatched);
      setSelected(null);
      setLockBoard(false);

      if (newMatched.size >= Math.min(pairs.length, 4)) {
        setTimeout(() => onResult(true), 500);
      }
    } else {
      // No match
      feedbackWrong();
      setTimeout(() => {
        const reset = new Set(flipped);
        reset.delete(selected!.id);
        reset.delete(card.id);
        setFlipped(reset);
        setSelected(null);
        setLockBoard(false);
      }, 800);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs text-white/40 mb-2">Flip to find matching pairs!</p>
      <div className="grid grid-cols-4 gap-1.5 max-w-[300px]">
        {cards.map(card => {
          const isFlipped = flipped.has(card.id) || matched.has(card.pairId);
          const isMatched = matched.has(card.pairId);
          return (
            <motion.button key={card.id}
              whileTap={!isFlipped ? { scale: 0.9 } : undefined}
              onClick={() => handleFlip(card)}
              className={`h-14 rounded-xl text-[11px] font-bold flex items-center justify-center px-1 border transition-all ${
                isMatched ? 'bg-[#27ae60]/20 border-[#27ae60]/30 text-[#27ae60]' :
                isFlipped ? (card.side === 'german' ? 'bg-[#d4a520]/20 border-[#d4a520]/30 text-[#d4a520]' : 'bg-white/10 border-white/20 text-white') :
                'bg-white/5 border-white/10 text-transparent'
              }`}
              animate={isFlipped ? { rotateY: 0 } : { rotateY: 180 }}
              transition={{ duration: 0.3 }}
            >
              {isFlipped ? card.text : '?'}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
