'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speakGerman } from '@/lib/audio/useGermanTTS';

interface FallingWordsProps {
  /** The correct word to catch */
  correctWord: string;
  /** Distractor words */
  distractors: string[];
  /** Question/hint shown at top */
  hint: string;
  onResult: (correct: boolean) => void;
}

/**
 * Words fall from the top — tap the correct one before it hits the bottom!
 * Auto-speaks the target word via TTS for dictation exercises.
 */
export function FallingWords({ correctWord, distractors, hint, onResult }: FallingWordsProps) {
  const [tapped, setTapped] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | 'missed' | null>(null);
  const [timeLeft, setTimeLeft] = useState(100); // percentage
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allWords = useRef(
    [correctWord, ...distractors.slice(0, 3)].sort(() => Math.random() - 0.5)
  );

  // Speak the word on mount (for dictation)
  useEffect(() => {
    const timer = setTimeout(() => {
      try { speakGerman(correctWord, 0.85); } catch {}
    }, 300);
    return () => clearTimeout(timer);
  }, [correctWord]);

  // Countdown timer
  useEffect(() => {
    if (result) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          setResult('missed');
          return 0;
        }
        return prev - 2;
      });
    }, 100);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [result]);

  useEffect(() => {
    if (result === 'missed') {
      setTimeout(() => onResult(false), 1000);
    }
  }, [result, onResult]);

  const handleTap = (word: string) => {
    if (result) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setTapped(word);
    const isCorrect = word === correctWord;
    setResult(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => onResult(isCorrect), isCorrect ? 600 : 1200);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hint + listen button */}
      <div className="flex items-center gap-2 mb-3">
        <p className="text-sm text-[var(--foreground)]/60">{hint}</p>
        <motion.button whileTap={{ scale: 0.9 }}
          onClick={() => { try { speakGerman(correctWord, 0.85); } catch {} }}
          className="w-8 h-8 rounded-full bg-[#d4a520]/15 flex items-center justify-center text-sm">
          🔊
        </motion.button>
      </div>

      {/* Timer bar */}
      <div className="w-full max-w-[280px] h-1.5 bg-[var(--foreground)]/8 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: timeLeft > 40 ? '#27ae60' : timeLeft > 20 ? '#d4a520' : '#c0392b' }}
          animate={{ width: `${timeLeft}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Falling word buttons */}
      <div className="relative w-full max-w-[300px] h-[200px]">
        {allWords.current.map((word, i) => {
          const startX = 10 + (i * 60) % 200;
          const delay = i * 0.3;

          return (
            <AnimatePresence key={word}>
              {!tapped && (
                <motion.button
                  initial={{ y: -20, x: startX, opacity: 0 }}
                  animate={{ y: 160, opacity: 1 }}
                  transition={{ duration: 4 - i * 0.3, delay, ease: 'linear' }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleTap(word)}
                  className="absolute px-4 py-2 rounded-xl bg-gradient-to-b from-[var(--card-bg)] to-[var(--foreground)]/5 border-2 border-[var(--card-border)] text-sm font-bold shadow-lg hover:border-[#d4a520]/50"
                >
                  {word}
                </motion.button>
              )}
            </AnimatePresence>
          );
        })}

        {/* Result overlay */}
        {result && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className={`text-4xl mb-2 ${result === 'correct' ? '' : ''}`}>
              {result === 'correct' ? '🎯' : result === 'wrong' ? '❌' : '⏰'}
            </span>
            {result !== 'correct' && (
              <p className="text-xs text-[#27ae60]">Answer: <span className="font-bold">{correctWord}</span></p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
