'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { feedbackCorrect, feedbackWrong } from '@/lib/feedback';

interface SpeedRoundProps {
  /** Question + options + correct answer */
  questions: { question: string; options: string[]; correct: string }[];
  onResult: (correct: boolean) => void;
}

/**
 * Speed round — rapid-fire questions, 5 seconds each.
 * Miss one and it's over. How far can you go?
 */
export function SpeedRound({ questions, onResult }: SpeedRoundProps) {
  const [round, setRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[round];

  // 5 second timer per question
  useEffect(() => {
    if (done || selected) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          feedbackWrong();
          setDone(true);
          return 0;
        }
        return prev - 4; // ~5 seconds total (100/4 = 25 ticks * 200ms)
      });
    }, 200);
    return () => clearInterval(interval);
  }, [done, selected, round]);

  useEffect(() => {
    if (done) setTimeout(() => onResult(score > questions.length / 2), 800);
  }, [done, score, questions.length, onResult]);

  const handleSelect = useCallback((opt: string) => {
    if (done || selected) return;
    setSelected(opt);
    const isCorrect = opt === q.correct;

    if (isCorrect) {
      feedbackCorrect();
      setScore(s => s + 1);
      setTimeout(() => {
        if (round + 1 >= questions.length) {
          setDone(true);
        } else {
          setRound(r => r + 1);
          setSelected(null);
          setTimeLeft(100);
        }
      }, 400);
    } else {
      feedbackWrong();
      setDone(true);
    }
  }, [done, selected, q, round, questions.length]);

  if (done) {
    return (
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
        <p className="text-3xl mb-2">{score >= questions.length / 2 ? '⚡' : '💥'}</p>
        <p className="text-sm text-white font-bold">{score}/{questions.length}</p>
      </motion.div>
    );
  }

  if (!q) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Round counter + timer */}
      <div className="flex items-center gap-3 w-full max-w-[280px] mb-3">
        <span className="text-xs font-bold text-white/40">{round + 1}/{questions.length}</span>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full"
            style={{ backgroundColor: timeLeft > 50 ? '#27ae60' : timeLeft > 25 ? '#d4a520' : '#c0392b' }}
            animate={{ width: `${timeLeft}%` }} />
        </div>
        <span className="text-xs font-bold text-[#d4a520]">{score}⭐</span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={round}
          initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
          className="w-full max-w-[280px]">
          <p className="text-sm text-white font-medium text-center mb-3">{q.question}</p>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, i) => (
              <motion.button key={i} whileTap={{ scale: 0.9 }}
                onClick={() => handleSelect(opt)}
                className={`py-3 rounded-xl text-xs font-bold border ${
                  selected === opt && opt === q.correct ? 'bg-[#27ae60]/30 border-[#27ae60] text-[#27ae60]' :
                  selected === opt ? 'bg-[#c0392b]/30 border-[#c0392b] text-[#c0392b]' :
                  'bg-white/10 border-white/10 text-white'
                }`}>
                {opt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
