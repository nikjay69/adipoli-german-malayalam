'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterGuide } from '@/components/character';
import type { DecisionPoint as DecisionPointType } from '@/lib/content/types';
import { feedbackCorrect, feedbackWrong } from '@/lib/feedback';

interface DecisionPointProps {
  decision: DecisionPointType;
  onComplete: (wasCorrect: boolean) => void;
}

export function DecisionPoint({ decision, onComplete }: DecisionPointProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const option = decision.options[index];
    if (option.isCorrect) feedbackCorrect();
    else feedbackWrong();
    setShowResult(true);
    setTimeout(() => onComplete(option.isCorrect), 2500);
  };

  const selectedOption = selected !== null ? decision.options[selected] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="flex-1 flex flex-col items-center justify-center"
    >
      {/* Scene moment */}
      <div className="w-full max-w-sm mb-3">
        <div className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl p-3.5">
          <p className="text-base text-[var(--foreground)]/80 leading-snug">
            {decision.moment}
          </p>
        </div>

        {!showResult && (
          <p className="text-center text-sm font-bold text-[#d4a520] mt-2 mb-1">
            What do you say?
          </p>
        )}
      </div>

      {/* Options / Result */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div key="options" className="w-full max-w-sm space-y-2">
            {decision.options.map((option, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`w-full text-left px-3.5 py-3 rounded-xl border-2 transition-all ${
                  selected === i
                    ? option.isCorrect ? 'border-[#27ae60] bg-[#27ae60]/15' : 'border-[#c0392b] bg-[#c0392b]/15'
                    : 'border-[var(--card-border)] bg-[var(--card-bg)]'
                }`}
              >
                <p className="text-sm font-medium">{option.text}</p>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
            <div className={`rounded-xl p-3 mb-2 border ${
              selectedOption?.isCorrect ? 'border-[#27ae60]/30 bg-[#27ae60]/10' : 'border-[#c0392b]/30 bg-[#c0392b]/10'
            }`}>
              <p className="text-sm text-[var(--foreground)]/70 leading-snug">{selectedOption?.response}</p>
            </div>
            <CharacterGuide
              messages={selectedOption?.kuttanReaction || ''}
              mood={selectedOption?.isCorrect ? 'celebrating' : 'thinking'}
              size="sm"
            />
            {selectedOption && !selectedOption.isCorrect && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-xs text-[#27ae60] text-center mt-1">
                Better: {decision.options.find(o => o.isCorrect)?.text}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
