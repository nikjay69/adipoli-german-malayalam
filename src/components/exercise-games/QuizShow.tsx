'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface QuizShowProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onResult: (correct: boolean) => void;
}

/**
 * Timed quiz show — pick the answer before time runs out!
 * Has lifelines: 50:50 removes two wrong answers.
 */
export function QuizShow({ question, options, correctAnswer, onResult }: QuizShowProps) {
  const [timeLeft, setTimeLeft] = useState(100);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | 'timeout' | null>(null);
  const [hiddenOptions, setHiddenOptions] = useState<Set<string>>(new Set());
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);

  // Timer
  useEffect(() => {
    if (result) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          setResult('timeout');
          return 0;
        }
        return prev - 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [result]);

  useEffect(() => {
    if (result === 'timeout') setTimeout(() => onResult(false), 1000);
  }, [result, onResult]);

  const handleSelect = (option: string) => {
    if (result) return;
    setSelected(option);
    const isCorrect = option === correctAnswer;
    setResult(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => onResult(isCorrect), isCorrect ? 500 : 1000);
  };

  const handleFiftyFifty = () => {
    if (usedFiftyFifty || result) return;
    setUsedFiftyFifty(true);
    const wrongOptions = options.filter(o => o !== correctAnswer);
    const toHide = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(new Set(toHide));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Timer bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden">
        <motion.div className="h-full rounded-full"
          style={{ backgroundColor: timeLeft > 50 ? '#27ae60' : timeLeft > 25 ? '#d4a520' : '#c0392b' }}
          animate={{ width: `${timeLeft}%` }} transition={{ duration: 0.1 }} />
      </div>

      {/* Options — 2x2 grid */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-[300px]">
        {options.map((opt, i) => {
          if (hiddenOptions.has(opt)) return (
            <div key={i} className="h-12 rounded-xl bg-white/3 border border-white/5" />
          );
          const isSelected = selected === opt;
          const isCorrect = opt === correctAnswer;
          return (
            <motion.button key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(opt)}
              disabled={!!result}
              className={`h-12 rounded-xl text-xs font-semibold px-2 border transition-all ${
                result && isCorrect ? 'bg-[#27ae60]/30 border-[#27ae60] text-[#27ae60]' :
                isSelected && result === 'wrong' ? 'bg-[#c0392b]/30 border-[#c0392b] text-[#c0392b]' :
                'bg-white/10 border-white/10 text-white hover:border-[#d4a520]/50'
              }`}>
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* 50:50 lifeline */}
      {!usedFiftyFifty && !result && (
        <motion.button whileTap={{ scale: 0.9 }} onClick={handleFiftyFifty}
          className="mt-3 px-4 py-1.5 rounded-full bg-[#9333ea]/20 border border-[#9333ea]/30 text-[#9333ea] text-xs font-bold">
          50:50
        </motion.button>
      )}

      {result === 'timeout' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#c0392b] mt-2">
          Time's up! Answer: <span className="text-[#27ae60] font-bold">{correctAnswer}</span>
        </motion.p>
      )}
    </div>
  );
}
