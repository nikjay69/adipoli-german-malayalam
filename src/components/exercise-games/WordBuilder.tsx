'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { feedbackCorrect, feedbackWrong } from '@/lib/feedback';

interface WordBuilderProps {
  /** The word to build */
  answer: string;
  /** Optional hint */
  hint?: string;
  onResult: (correct: boolean) => void;
}

/**
 * WordBuilder — letters arranged in a circle.
 * Tap letters in order to spell the word. First letter glows as hint.
 * Wrong sequence = shake + reset. Real puzzle feel.
 */
export function WordBuilder({ answer, hint, onResult }: WordBuilderProps) {
  const letters = useMemo(() => {
    // Add 2-3 distractor letters
    const extra = 'enrstla'.split('').filter(c => !answer.toLowerCase().includes(c)).slice(0, 2);
    const all = [...answer.split(''), ...extra];
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all.map((char, i) => ({ char, id: i, used: false }));
  }, [answer]);

  const [selected, setSelected] = useState<number[]>([]);
  const [shake, setShake] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [availableLetters, setAvailableLetters] = useState(letters);

  const currentWord = selected.map(i => availableLetters[i].char).join('');
  const isFirstLetter = answer[0];

  const handleLetterTap = (index: number) => {
    if (result || availableLetters[index].used) return;

    const newSelected = [...selected, index];
    const newWord = newSelected.map(i => availableLetters[i].char).join('');
    setSelected(newSelected);

    // Mark as used
    setAvailableLetters(prev => prev.map((l, i) => i === index ? { ...l, used: true } : l));

    // Check if complete
    if (newWord.length === answer.length) {
      if (newWord.toLowerCase() === answer.toLowerCase()) {
        setResult('correct');
        feedbackCorrect();
        setTimeout(() => onResult(true), 600);
      } else {
        setResult('wrong');
        setShake(true);
        feedbackWrong();
        // Reset after shake
        setTimeout(() => {
          setShake(false);
          setSelected([]);
          setAvailableLetters(letters.map(l => ({ ...l, used: false })));
          setResult(null);
        }, 800);
        // If second wrong attempt, give up
        setTimeout(() => { if (result === 'wrong') onResult(false); }, 2000);
      }
    }
  };

  const handleUndo = () => {
    if (result || selected.length === 0) return;
    const lastIdx = selected[selected.length - 1];
    setSelected(prev => prev.slice(0, -1));
    setAvailableLetters(prev => prev.map((l, i) => i === lastIdx ? { ...l, used: false } : l));
  };

  // Arrange letters in a circle
  const radius = 90;
  const centerX = 130;
  const centerY = 110;

  return (
    <div className="flex flex-col items-center">
      {hint && <p className="text-xs text-white/40 text-center mb-2">{hint}</p>}

      {/* Built word display */}
      <motion.div
        animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex gap-1 mb-3 min-h-[44px] items-center"
      >
        {answer.split('').map((_, i) => (
          <div key={i}
            className={`w-9 h-10 rounded-lg flex items-center justify-center text-lg font-black border-2 ${
              selected[i] !== undefined
                ? result === 'correct' ? 'bg-[#27ae60]/20 border-[#27ae60] text-[#27ae60]'
                : 'bg-[#d4a520]/15 border-[#d4a520]/40 text-[#d4a520]'
                : i === selected.length && i === 0
                ? 'bg-[#d4a520]/10 border-[#d4a520]/30 border-dashed animate-pulse'
                : 'bg-white/5 border-white/15 border-dashed'
            }`}>
            {selected[i] !== undefined ? availableLetters[selected[i]].char : ''}
          </div>
        ))}
        {selected.length > 0 && !result && (
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleUndo}
            className="w-8 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sm ml-1">←</motion.button>
        )}
      </motion.div>

      {/* Circular letter arrangement */}
      <div className="relative" style={{ width: 260, height: 220 }}>
        {availableLetters.map((letter, i) => {
          const angle = (i / availableLetters.length) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + Math.cos(angle) * radius - 20;
          const y = centerY + Math.sin(angle) * radius - 20;
          const isHint = letter.char.toLowerCase() === isFirstLetter.toLowerCase() && selected.length === 0;

          return (
            <motion.button
              key={letter.id}
              initial={{ scale: 0 }}
              animate={{ scale: letter.used ? 0.5 : 1, opacity: letter.used ? 0.3 : 1 }}
              transition={{ delay: i * 0.03 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleLetterTap(i)}
              disabled={letter.used || !!result}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-lg font-black border-2 ${
                isHint ? 'bg-[#d4a520]/20 border-[#d4a520]/50 text-[#d4a520] animate-pulse' :
                letter.used ? 'bg-white/5 border-white/5' :
                'bg-white/10 border-white/20 text-white hover:border-[#d4a520]/50'
              }`}
              style={{ left: x, top: y }}
            >
              {letter.char}
            </motion.button>
          );
        })}

        {/* Center — word length hint */}
        <div className="absolute flex items-center justify-center text-white/20 text-xs font-bold"
          style={{ left: centerX - 20, top: centerY - 10, width: 40, height: 20 }}>
          {answer.length} letters
        </div>
      </div>

      {result === 'wrong' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#27ae60] mt-1">
          <span className="font-bold">{answer}</span>
        </motion.p>
      )}
    </div>
  );
}
