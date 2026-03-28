'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordBankProps {
  /** Sentence with _____ blank */
  sentence: string;
  /** Word options to choose from */
  options: string[];
  correctAnswer: string;
  onResult: (correct: boolean) => void;
}

/**
 * Sentence with a blank — tap from word bank options below.
 * No typing, just tap. Fast and game-like.
 */
export function WordBank({ sentence, options, correctAnswer, onResult }: WordBankProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  // Highlight the blank in the sentence
  const parts = sentence.split(/(_+)/);

  const handleTap = (word: string) => {
    if (result) return;
    setSelected(word);
    const isCorrect = word.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    setResult(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => onResult(isCorrect), isCorrect ? 600 : 1200);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Sentence with blank */}
      <div className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl px-4 py-4 mb-5 w-full max-w-sm">
        <p className="text-base font-medium text-center leading-relaxed">
          {parts.map((part, i) => {
            if (/^_+$/.test(part)) {
              return (
                <motion.span
                  key={i}
                  className={`inline-block min-w-[80px] mx-1 px-3 py-1 rounded-lg text-center font-bold border-2 border-dashed ${
                    selected
                      ? result === 'correct' ? 'bg-[#27ae60]/15 border-[#27ae60]/40 text-[#27ae60] border-solid'
                      : result === 'wrong' ? 'bg-[#c0392b]/15 border-[#c0392b]/40 text-[#c0392b] border-solid'
                      : 'bg-[#d4a520]/15 border-[#d4a520]/30 text-[#d4a520] border-solid'
                      : 'bg-[var(--foreground)]/5 border-[var(--foreground)]/20'
                  }`}
                  animate={selected ? { scale: [1.1, 1] } : { scale: [1, 1.03, 1] }}
                  transition={selected ? {} : { repeat: Infinity, duration: 2 }}
                >
                  {selected || '?'}
                </motion.span>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </p>
      </div>

      {/* Wrong answer correction */}
      {result === 'wrong' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#27ae60] mb-3">
          Answer: <span className="font-bold">{correctAnswer}</span>
        </motion.p>
      )}

      {/* Word bank — tappable chips */}
      <div className="flex flex-wrap gap-2 justify-center max-w-sm">
        {options.map((word, i) => (
          <motion.button
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleTap(word)}
            disabled={!!result}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
              selected === word
                ? result === 'correct' ? 'bg-[#27ae60]/20 border-[#27ae60] text-[#27ae60]'
                : result === 'wrong' ? 'bg-[#c0392b]/20 border-[#c0392b] text-[#c0392b]'
                : 'bg-[#d4a520]/20 border-[#d4a520]'
                : 'bg-[var(--card-bg)] border-[var(--card-border)] hover:border-[#d4a520]/50'
            } ${result && word === correctAnswer && selected !== word ? 'border-[#27ae60] bg-[#27ae60]/10' : ''}`}
          >
            {word}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
