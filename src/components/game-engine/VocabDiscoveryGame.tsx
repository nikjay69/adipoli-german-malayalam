'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speakGerman } from '@/lib/audio/useGermanTTS';
import { feedbackCorrect, feedbackWrong, feedbackCombo } from '@/lib/feedback';
import type { VocabItem } from '@/lib/content/types';

interface VocabDiscoveryGameProps {
  /** ALL vocab to learn in this scene (3-6 words) */
  vocabList: VocabItem[];
  /** Scene context line (short) */
  sceneHint?: string;
  onComplete: (score: number, total: number) => void;
}

type Phase = 'absorb' | 'challenge';

/**
 * Scene-based vocab discovery.
 * Phase 1 (ABSORB): All words appear together in a visual layout — tap any to hear.
 *   Auto-advances after a few seconds. Words are SEEN in context, not one-by-one.
 * Phase 2 (CHALLENGE): Rapid-fire games testing ALL words mixed together.
 *   Multiple game types rotate: match meaning, identify word, listen & pick.
 */
export function VocabDiscoveryGame({ vocabList, sceneHint, onComplete }: VocabDiscoveryGameProps) {
  const [phase, setPhase] = useState<Phase>('absorb');
  const [tappedWords, setTappedWords] = useState<Set<string>>(new Set());
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);

  const words = vocabList.slice(0, 6);

  // Build challenges — one per word, shuffled
  const challenges = useMemo(() => {
    const types = ['meaning', 'word', 'listen'] as const;
    return words.map((vocab, i) => {
      const type = types[i % types.length];
      // Generate 3 wrong options from other words
      const otherWords = words.filter(w => w.id !== vocab.id);
      const wrongOptions = type === 'meaning'
        ? otherWords.map(w => w.english).slice(0, 3)
        : otherWords.map(w => w.german).slice(0, 3);
      // Fill with generic options if not enough
      const genericEn = ['Hello', 'Thanks', 'Goodbye', 'Water', 'Bread', 'Good'];
      const genericDe = ['Hallo', 'Danke', 'Tschüss', 'Wasser', 'Brot', 'Gut'];
      while (wrongOptions.length < 3) {
        const pool = type === 'meaning' ? genericEn : genericDe;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        if (!wrongOptions.includes(pick) && pick !== vocab.english && pick !== vocab.german) {
          wrongOptions.push(pick);
        }
      }
      const correct = type === 'meaning' ? vocab.english : vocab.german;
      const options = [...wrongOptions.slice(0, 3), correct].sort(() => Math.random() - 0.5);
      return { vocab, type, options, correct };
    }).sort(() => Math.random() - 0.5);
  }, [words]);

  const currentChallenge = challenges[challengeIdx];

  // Auto-advance from absorb to challenge after 4 seconds or when all words tapped
  useEffect(() => {
    if (phase === 'absorb') {
      const timer = setTimeout(() => setPhase('challenge'), 5000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'absorb' && tappedWords.size >= words.length) {
      setTimeout(() => setPhase('challenge'), 800);
    }
  }, [phase, tappedWords.size, words.length]);

  // Speak word on first challenge
  useEffect(() => {
    if (phase === 'challenge' && currentChallenge?.type === 'listen') {
      setTimeout(() => { try { speakGerman(currentChallenge.vocab.german, 0.8); } catch {} }, 300);
    }
  }, [phase, challengeIdx, currentChallenge]);

  const handleWordTap = useCallback((vocab: VocabItem) => {
    try { speakGerman(vocab.german, 0.85); } catch {}
    setTappedWords(prev => new Set(prev).add(vocab.id));
  }, []);

  const handleAnswer = useCallback((option: string) => {
    if (answered || !currentChallenge) return;
    setAnswered(option);
    const isCorrect = option === currentChallenge.correct;

    if (isCorrect) {
      const c = combo + 1;
      setCombo(c);
      setScore(s => s + 1);
      feedbackCombo(c);
    } else {
      setCombo(0);
      feedbackWrong();
    }

    setTimeout(() => {
      setAnswered(null);
      if (challengeIdx + 1 >= challenges.length) {
        onComplete(score + (isCorrect ? 1 : 0), challenges.length);
      } else {
        setChallengeIdx(i => i + 1);
      }
    }, isCorrect ? 600 : 1000);
  }, [answered, currentChallenge, combo, challengeIdx, challenges.length, score, onComplete]);

  return (
    <div className="flex flex-col items-center w-full">
      <AnimatePresence mode="wait">
        {/* ═══ ABSORB — all words at once ═══ */}
        {phase === 'absorb' && (
          <motion.div key="absorb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-[320px]">

            {sceneHint && (
              <p className="text-xs text-white/40 text-center mb-3">{sceneHint}</p>
            )}

            {/* Word cloud — all words visible, tap to hear */}
            <div className="grid grid-cols-2 gap-2">
              {words.map((vocab, i) => {
                const isTapped = tappedWords.has(vocab.id);
                return (
                  <motion.button key={vocab.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleWordTap(vocab)}
                    className={`relative px-3 py-3 rounded-xl border text-center transition-all ${
                      isTapped
                        ? 'bg-[#d4a520]/15 border-[#d4a520]/40'
                        : 'bg-white/5 border-white/10 animate-pulse'
                    }`}
                  >
                    <p className={`text-lg font-black ${isTapped ? 'text-[#d4a520]' : 'text-white/80'}`}>
                      {vocab.german}
                    </p>
                    {isTapped && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-xs text-white/50 mt-0.5">
                        {vocab.english}
                      </motion.p>
                    )}
                    {!isTapped && (
                      <p className="text-[10px] text-white/30 mt-0.5">tap to hear</p>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <p className="text-[10px] text-white/20 text-center mt-3">
              Tap each word to hear it • {tappedWords.size}/{words.length}
            </p>
          </motion.div>
        )}

        {/* ═══ CHALLENGE — rapid-fire testing all words ═══ */}
        {phase === 'challenge' && currentChallenge && (
          <motion.div key={`challenge-${challengeIdx}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="w-full max-w-[300px]">

            {/* Progress dots */}
            <div className="flex justify-center gap-1 mb-3">
              {challenges.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${
                  i < challengeIdx ? 'bg-[#27ae60]' : i === challengeIdx ? 'bg-[#d4a520]' : 'bg-white/15'
                }`} />
              ))}
            </div>

            {/* Question */}
            <p className="text-sm text-white/70 text-center mb-3 font-medium">
              {currentChallenge.type === 'meaning'
                ? <span>What does <span className="text-[#d4a520] font-black">{currentChallenge.vocab.german}</span> mean?</span>
                : currentChallenge.type === 'word'
                ? <span>How do you say <span className="text-white font-black">{currentChallenge.vocab.english}</span>?</span>
                : <span>🔊 Which word did you hear?</span>
              }
            </p>

            {/* Listen button for audio challenges */}
            {currentChallenge.type === 'listen' && (
              <motion.button whileTap={{ scale: 0.9 }}
                onClick={() => { try { speakGerman(currentChallenge.vocab.german, 0.8); } catch {} }}
                className="mx-auto mb-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4a520]/15 border border-[#d4a520]/20 text-xs text-[#d4a520]">
                <Volume2 className="w-3 h-3" /> Listen again
              </motion.button>
            )}

            {/* 2x2 answer grid */}
            <div className="grid grid-cols-2 gap-2">
              {currentChallenge.options.map((opt, i) => {
                const isCorrectOpt = opt === currentChallenge.correct;
                return (
                  <motion.button key={`${challengeIdx}-${i}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAnswer(opt)}
                    disabled={!!answered}
                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                      answered && isCorrectOpt ? 'bg-[#27ae60]/30 border-[#27ae60] text-[#27ae60]' :
                      answered === opt && !isCorrectOpt ? 'bg-[#c0392b]/30 border-[#c0392b] text-[#c0392b]' :
                      'bg-white/8 border-white/15 text-white'
                    }`}>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {/* Combo */}
            {combo > 1 && (
              <motion.p initial={{ scale: 1.5 }} animate={{ scale: 1 }}
                className="text-center text-xs font-black text-[#d4a520] mt-2">{combo}x 🔥</motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
