'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface SwipeCardsProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onResult: (correct: boolean) => void;
}

/**
 * Tinder-style swipe cards. Shows a statement, swipe right if true, left if false.
 * For MCQ: shows question + one option at a time, swipe right = this is correct, left = wrong.
 */
export function SwipeCards({ question, options, correctAnswer, onResult }: SwipeCardsProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const rightOpacity = useTransform(x, [0, 100], [0, 1]);
  const leftOpacity = useTransform(x, [-100, 0], [1, 0]);

  const currentOption = options[currentIdx];
  const isCorrect = currentOption === correctAnswer;

  const handleSwipe = (direction: 'left' | 'right') => {
    const userSaysCorrect = direction === 'right';
    const wasRight = userSaysCorrect === isCorrect;

    setResult(wasRight ? 'correct' : 'wrong');
    setTimeout(() => {
      if (wasRight) {
        onResult(true);
      } else if (currentIdx < options.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setResult(null);
      } else {
        onResult(false);
      }
    }, 800);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x > 80 || info.velocity.x > 500) handleSwipe('right');
    else if (info.offset.x < -80 || info.velocity.x < -500) handleSwipe('left');
  };

  return (
    <div className="flex flex-col items-center" ref={containerRef}>
      {/* Question */}
      <p className="text-sm font-semibold text-center mb-4 text-[var(--foreground)]/70">{question}</p>

      {/* Swipe indicators */}
      <div className="relative w-full max-w-[280px] flex justify-between mb-2 px-2">
        <motion.div style={{ opacity: leftOpacity }} className="flex items-center gap-1 text-[#c0392b]">
          <X className="w-4 h-4" /> <span className="text-xs font-bold">Nope</span>
        </motion.div>
        <motion.div style={{ opacity: rightOpacity }} className="flex items-center gap-1 text-[#27ae60]">
          <span className="text-xs font-bold">Correct!</span> <Check className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Card */}
      <div className="relative w-[260px] h-[160px]">
        <AnimatePresence mode="wait">
          {result === null && (
            <motion.div
              key={currentIdx}
              style={{ x, rotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="w-full h-full bg-gradient-to-br from-[#2a4a2a] to-[#1b3d1b] border-2 border-[#d4a520]/30 rounded-2xl flex flex-col items-center justify-center p-5 shadow-xl">
                <p className="text-2xl font-bold text-center text-[#d4a520] mb-2">{currentOption}</p>
                <p className="text-[10px] text-[var(--foreground)]/30 uppercase tracking-wider">
                  Swipe → if correct, ← if wrong
                </p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
                result === 'correct' ? 'bg-[#27ae60]/20 text-[#27ae60]' : 'bg-[#c0392b]/20 text-[#c0392b]'
              }`}>
                {result === 'correct' ? '✓' : '✗'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tap buttons for non-swipe users */}
      {result === null && (
        <div className="flex gap-4 mt-4">
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            className="w-12 h-12 rounded-full bg-[#c0392b]/15 border-2 border-[#c0392b]/30 flex items-center justify-center">
            <X className="w-5 h-5 text-[#c0392b]" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            className="w-12 h-12 rounded-full bg-[#27ae60]/15 border-2 border-[#27ae60]/30 flex items-center justify-center">
            <Check className="w-5 h-5 text-[#27ae60]" />
          </motion.button>
        </div>
      )}

      {/* Progress dots */}
      <div className="flex gap-1 mt-3">
        {options.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIdx ? 'bg-[#d4a520]' : 'bg-[var(--foreground)]/15'}`} />
        ))}
      </div>
    </div>
  );
}
