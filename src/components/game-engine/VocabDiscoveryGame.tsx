'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speakGerman } from '@/lib/audio/useGermanTTS';
import type { VocabItem } from '@/lib/content/types';

interface VocabDiscoveryGameProps {
  vocab: VocabItem;
  onComplete: () => void;
  onCorrect: () => void;
  onWrong: () => void;
}

type Phase = 'reveal' | 'test';

/**
 * Two-phase vocab discovery:
 * 1. REVEAL (2 seconds) — word appears big, TTS speaks it, meaning shown briefly
 * 2. TEST — immediate quick game to prove you learned it
 *
 * No "Got it!" button. No reading. Learn by doing.
 */
export function VocabDiscoveryGame({ vocab, onComplete, onCorrect, onWrong }: VocabDiscoveryGameProps) {
  const [phase, setPhase] = useState<Phase>('reveal');
  const [testAnswer, setTestAnswer] = useState<'correct' | 'wrong' | null>(null);

  // Pick a random test type for variety
  const testType = useMemo(() => {
    const types = ['match-meaning', 'match-word', 'listen-pick'] as const;
    return types[Math.floor(Math.random() * types.length)];
  }, []);

  // Generate fake options for the test
  const fakeOptions = useMemo(() => {
    const fakes = ['Hallo', 'Danke', 'Bitte', 'Tschüss', 'Ja', 'Nein', 'Gut', 'Schlecht',
      'Wasser', 'Brot', 'Milch', 'Kaffee', 'Haus', 'Auto', 'Schule', 'Arbeit',
      'Hello', 'Thanks', 'Please', 'Goodbye', 'Water', 'Bread', 'House', 'Work',
      'Good', 'Bad', 'Big', 'Small', 'Yes', 'No', 'One', 'Two'];
    const relevant = testType === 'match-meaning'
      ? fakes.filter(f => f !== vocab.english && !/[äöüß]/.test(f)).slice(0, 20)
      : fakes.filter(f => f !== vocab.german && f !== vocab.english).slice(0, 20);
    // Pick 3 random fakes
    const shuffled = relevant.sort(() => Math.random() - 0.5).slice(0, 3);
    const correct = testType === 'match-meaning' ? vocab.english : vocab.german;
    const all = [...shuffled, correct].sort(() => Math.random() - 0.5);
    return { options: all, correct };
  }, [vocab, testType]);

  // Auto-speak and auto-advance from reveal to test
  useEffect(() => {
    if (phase === 'reveal') {
      try { speakGerman(vocab.german, 0.8); } catch {}
      const timer = setTimeout(() => setPhase('test'), 2200);
      return () => clearTimeout(timer);
    }
  }, [phase, vocab.german]);

  const handleTestAnswer = (answer: string) => {
    if (testAnswer) return;
    const isCorrect = answer === fakeOptions.correct;
    setTestAnswer(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) onCorrect(); else onWrong();
    // Don't call onComplete — the handleCorrect/handleWrong in parent will advance
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        {/* ── PHASE 1: REVEAL — see the word, hear it ── */}
        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: 'spring', damping: 12 }}
            className="flex flex-col items-center"
          >
            {/* Big word with glow */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#d4a520]/20 blur-2xl rounded-full" />
              <div className="relative bg-black/50 backdrop-blur-xl border border-[#d4a520]/40 rounded-3xl px-8 py-6 text-center">
                <h2 className="text-4xl font-black text-[#d4a520] mb-1">{vocab.german}</h2>
                <p className="text-white/80 text-lg font-semibold">{vocab.english}</p>
                <p className="text-[#d4a520]/50 text-sm">{vocab.malayalam}</p>
              </div>
            </motion.div>

            {/* Pulsing "listen" indicator */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="mt-3 flex items-center gap-1 text-white/30 text-xs"
            >
              <Volume2 className="w-3 h-3" /> Listening...
            </motion.div>
          </motion.div>
        )}

        {/* ── PHASE 2: TEST — prove you learned it ── */}
        {phase === 'test' && (
          <motion.div
            key="test"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[300px]"
          >
            {/* Question */}
            <p className="text-sm text-white/70 text-center mb-3 font-medium">
              {testType === 'match-meaning'
                ? `What does "${vocab.german}" mean?`
                : testType === 'match-word'
                ? `How do you say "${vocab.english}"?`
                : `You just heard a word. Which one?`
              }
            </p>

            {/* Options — 2x2 grid for speed */}
            <div className="grid grid-cols-2 gap-2">
              {fakeOptions.options.map((opt, i) => {
                const isCorrectOpt = opt === fakeOptions.correct;
                return (
                  <motion.button
                    key={opt}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleTestAnswer(opt)}
                    disabled={!!testAnswer}
                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                      testAnswer && isCorrectOpt
                        ? 'bg-[#27ae60]/30 border-[#27ae60] text-[#27ae60]'
                        : testAnswer && opt === fakeOptions.options.find(o => o !== fakeOptions.correct && testAnswer === 'wrong')
                        ? 'bg-[#c0392b]/30 border-[#c0392b] text-[#c0392b]'
                        : 'bg-white/8 border-white/15 text-white hover:border-[#d4a520]/50'
                    }`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {/* Listen again button for listen-pick type */}
            {testType === 'listen-pick' && !testAnswer && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => { try { speakGerman(vocab.german, 0.8); } catch {} }}
                className="mt-3 mx-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#d4a520]/15 border border-[#d4a520]/20 text-xs text-[#d4a520]"
              >
                <Volume2 className="w-3 h-3" /> Listen again
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
