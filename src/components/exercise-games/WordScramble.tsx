'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordScrambleProps {
  hint: string;
  answer: string;
  onResult: (correct: boolean) => void;
}

/**
 * Letter tiles game — tap letters to spell the word.
 * Includes special German characters (ä, ö, ü, ß) as extra tiles.
 */
export function WordScramble({ hint, answer, onResult }: WordScrambleProps) {
  // Add German special chars if answer contains them
  const specialChars = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'];
  const hasSpecial = specialChars.some(c => answer.includes(c));

  const letters = useMemo(() => {
    const arr = answer.split('').map((char, i) => ({ char, id: `${char}-${i}` }));
    // Add 2-3 distractor letters to make it harder
    const distractors = 'enrstl'.split('').filter(c => !answer.toLowerCase().includes(c)).slice(0, 2);
    distractors.forEach((c, i) => arr.push({ char: c, id: `d-${c}-${i}` }));
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

  const handleTapLetter = (letter: { char: string; id: string }) => {
    if (result) return;
    const newPlaced = [...placed, letter];
    setPlaced(newPlaced);

    if (newPlaced.length === answer.length) {
      const word = newPlaced.map(p => p.char).join('');
      const isCorrect = word.toLowerCase() === answer.toLowerCase();
      setResult(isCorrect ? 'correct' : 'wrong');
      setTimeout(() => onResult(isCorrect), isCorrect ? 600 : 1200);
    }
  };

  const handleRemoveLast = () => {
    if (result || placed.length === 0) return;
    setPlaced(prev => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center">
      {hint && <p className="text-xs text-white/50 text-center mb-2">{hint}</p>}

      {/* Built word — slots */}
      <div className="flex items-center gap-0.5 mb-3 flex-wrap justify-center">
        {answer.split('').map((_, i) => (
          <motion.div key={i}
            className={`w-8 h-10 rounded-lg flex items-center justify-center text-base font-bold border-2 ${
              placed[i]
                ? result === 'correct' ? 'bg-[#27ae60]/20 border-[#27ae60]/40 text-[#27ae60]'
                : result === 'wrong' ? 'bg-[#c0392b]/20 border-[#c0392b]/40 text-[#c0392b]'
                : 'bg-[#d4a520]/15 border-[#d4a520]/30 text-[#d4a520]'
                : 'bg-white/5 border-white/15 border-dashed'
            }`}
            animate={placed[i] ? { scale: [1.15, 1] } : {}}
          >
            {placed[i]?.char || ''}
          </motion.div>
        ))}
        {placed.length > 0 && !result && (
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleRemoveLast}
            className="w-8 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sm ml-1">
            ←
          </motion.button>
        )}
      </div>

      {result === 'wrong' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#27ae60] mb-2">
          <span className="font-bold">{answer}</span>
        </motion.p>
      )}

      {/* Letter tiles */}
      <div className="flex flex-wrap gap-1.5 justify-center max-w-[300px]">
        <AnimatePresence>
          {remaining.map((letter, i) => (
            <motion.button key={letter.id}
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              transition={{ delay: i * 0.02 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleTapLetter(letter)}
              disabled={!!result}
              className={`w-9 h-10 rounded-xl flex items-center justify-center text-base font-bold shadow-sm border ${
                specialChars.includes(letter.char)
                  ? 'bg-[#d4a520]/20 border-[#d4a520]/30 text-[#d4a520]'
                  : 'bg-white/10 border-white/10 text-white'
              }`}>
              {letter.char}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
