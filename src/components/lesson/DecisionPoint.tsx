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

/**
 * Interactive "What do you say?" moment within a story lesson.
 * User picks from options, sees consequences + Kuttan's reaction.
 */
export function DecisionPoint({ decision, onComplete }: DecisionPointProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);

    const option = decision.options[index];
    if (option.isCorrect) {
      feedbackCorrect();
    } else {
      feedbackWrong();
    }

    setShowResult(true);

    // Auto-advance after showing result
    setTimeout(() => {
      onComplete(option.isCorrect);
    }, 3000);
  };

  const selectedOption = selected !== null ? decision.options[selected] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center"
    >
      {/* Scene moment */}
      <div className="w-full max-w-sm mb-5">
        <div className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-2xl p-5 mb-4">
          <p className="text-base text-[var(--foreground)]/80 italic leading-relaxed">
            {decision.moment}
          </p>
        </div>

        {!showResult && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-base font-bold text-[#d4a520] mb-3"
          >
            What do you say?
          </motion.p>
        )}
      </div>

      {/* Options */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="options"
            className="w-full max-w-sm space-y-2.5"
          >
            {decision.options.map((option, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`
                  w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all
                  ${selected === i
                    ? option.isCorrect
                      ? 'border-[#27ae60] bg-[#27ae60]/15'
                      : 'border-[#c0392b] bg-[#c0392b]/15'
                    : 'border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[#d4a520]/50'
                  }
                `}
              >
                <p className="text-base font-medium">{option.text}</p>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm"
          >
            {/* What happened */}
            <div className={`rounded-2xl p-4 mb-3 border-2 ${
              selectedOption?.isCorrect
                ? 'border-[#27ae60]/30 bg-[#27ae60]/10'
                : 'border-[#c0392b]/30 bg-[#c0392b]/10'
            }`}>
              <p className="text-sm text-[var(--foreground)]/70 leading-relaxed">
                {selectedOption?.response}
              </p>
            </div>

            {/* Kuttan reacts */}
            <CharacterGuide
              messages={selectedOption?.kuttanReaction || ''}
              mood={selectedOption?.isCorrect ? 'celebrating' : 'thinking'}
              size="sm"
            />

            {/* Show correct answer if wrong */}
            {selectedOption && !selectedOption.isCorrect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 text-center"
              >
                <p className="text-xs text-[var(--foreground)]/40 mb-1">Better answer:</p>
                <p className="text-sm font-semibold text-[#27ae60]">
                  {decision.options.find(o => o.isCorrect)?.text}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
