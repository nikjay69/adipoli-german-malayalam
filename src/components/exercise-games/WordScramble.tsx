'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordScrambleProps {
  /** The hint/question shown above */
  hint: string;
  /** The correct answer to spell */
  answer: string;
  onResult: (correct: boolean) => void;
}

/**
 * Scrambled letter tiles — tap to spell the word.
 * No keyboard needed. Feels like a puzzle game.
 */
export function WordScramble({ hint, answer, onResult }: WordScrambleProps) {
  const letters = useMemo(() => {
    const arr = answer.split('').map((char, i) => ({ char, id: `${char}-${i}` }));
    // Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [answer]);

  const [placed, setPlaced] = useState<{ char: string; id: string }[]>([]);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const remaining = letters.filter(l => !placed.some(p => p.id === l.id));
  const currentWord = placed.map(p => p.char).join('');

  const handleTapLetter = (letter: { char: string; id: string }) => {
    if (result) return;
    const newPlaced = [...placed, letter];
    setPlaced(newPlaced);

    // Check when all letters placed
    if (newPlaced.length === letters.length) {
      const word = newPlaced.map(p => p.char).join('');
      const isCorrect = word === answer;
      setResult(isCorrect ? 'correct' : 'wrong');
      setTimeout(() => onResult(isCorrect), isCorrect ? 800 : 1500);
    }
  };

  const handleRemoveLast = () => {
    if (result || placed.length === 0) return;
    setPlaced(prev => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-[var(--foreground)]/60 text-center mb-3">{hint}</p>

      {/* Built word area */}
      <div className="flex items-center gap-1 mb-4 min-h-[48px] px-3">
        {answer.split('').map((_, i) => (
          <motion.div
            key={i}
            className={`w-9 h-11 rounded-lg flex items-center justify-center text-lg font-bold border-2 ${
              placed[i]
                ? result === 'correct' ? 'bg-[#27ae60]/20 border-[#27ae60]/40 text-[#27ae60]'
                : result === 'wrong' ? 'bg-[#c0392b]/20 border-[#c0392b]/40 text-[#c0392b]'
                : 'bg-[#d4a520]/15 border-[#d4a520]/30 text-[#d4a520]'
                : 'bg-[var(--foreground)]/5 border-[var(--foreground)]/15 border-dashed'
            }`}
            animate={placed[i] ? { scale: [1.2, 1] } : {}}
          >
            {placed[i]?.char || ''}
          </motion.div>
        ))}

        {/* Backspace */}
        {placed.length > 0 && !result && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleRemoveLast}
            className="w-9 h-11 rounded-lg bg-[var(--foreground)]/10 flex items-center justify-center text-sm ml-1"
          >
            ←
          </motion.button>
        )}
      </div>

      {/* Wrong answer correction */}
      {result === 'wrong' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#27ae60] mb-3">
          Answer: <span className="font-bold">{answer}</span>
        </motion.p>
      )}

      {/* Available letters */}
      <div className="flex flex-wrap gap-2 justify-center max-w-[300px]">
        <AnimatePresence>
          {remaining.map((letter, i) => (
            <motion.button
              key={letter.id}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: i * 0.03 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleTapLetter(letter)}
              disabled={!!result}
              className="w-10 h-11 rounded-xl bg-gradient-to-b from-[var(--card-bg)] to-[var(--foreground)]/5 border border-[var(--card-border)] flex items-center justify-center text-lg font-bold shadow-sm active:shadow-none"
            >
              {letter.char}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
