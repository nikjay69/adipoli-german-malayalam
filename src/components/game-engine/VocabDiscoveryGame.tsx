'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speakGerman } from '@/lib/audio/useGermanTTS';
import { playVocabAudio } from '@/lib/audio';
import { feedbackWrong, feedbackCombo } from '@/lib/feedback';
import { ListenBlast } from '@/components/exercise-games/ListenBlast';
import { WordBuilder } from '@/components/exercise-games/WordBuilder';
import type { VocabItem } from '@/lib/content/types';

interface VocabDiscoveryGameProps {
  vocabList: VocabItem[];
  sceneHint?: string;
  onComplete: (score: number, total: number) => void;
}

type Phase = 'absorb' | 'challenge';
type GameType = 'listen-blast' | 'word-builder';

const GAME_CYCLE: GameType[] = ['listen-blast', 'word-builder'];

export function VocabDiscoveryGame({ vocabList, sceneHint, onComplete }: VocabDiscoveryGameProps) {
  const [phase, setPhase] = useState<Phase>('absorb');
  const [tappedWords, setTappedWords] = useState<Set<string>>(new Set());
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  // Last tapped word — its pre-generated illustration is revealed above the grid.
  const [focused, setFocused] = useState<VocabItem | null>(null);
  const [focusImgFailed, setFocusImgFailed] = useState(false);

  const words = vocabList.slice(0, 6);
  const totalChallenges = Math.min(words.length, 4); // Test max 4 words

  // Move to the challenge only after the learner heard the set.
  // No timer auto-skip: surprise transitions were making the first lesson feel broken/rushed.

  // Stay in absorb until the learner explicitly continues; this prevents
  // surprise jumps while audio/meaning is still being processed.

  const handleWordTap = useCallback((vocab: VocabItem) => {
    // Pre-rendered native audio first; browser TTS only if the file is missing.
    playVocabAudio(vocab.id).catch(() => { try { speakGerman(vocab.german, 0.85); } catch {} });
    setFocusImgFailed(false);
    setFocused(vocab);
    setTappedWords(prev => new Set(prev).add(vocab.id));
  }, []);

  const handleChallengeResult = useCallback((correct: boolean) => {
    if (correct) {
      const c = combo + 1;
      setCombo(c);
      setScore(s => s + 1);
      feedbackCombo(c);
    } else {
      setCombo(0);
      feedbackWrong();
    }

    setTimeout(() => {
      if (challengeIdx + 1 >= totalChallenges) {
        onComplete(score + (correct ? 1 : 0), totalChallenges);
      } else {
        setChallengeIdx(i => i + 1);
      }
    }, correct ? 600 : 1000);
  }, [combo, challengeIdx, totalChallenges, score, onComplete]);

  // Current challenge word and game type
  const challengeWord = words[challengeIdx];
  const gameType = GAME_CYCLE[challengeIdx % GAME_CYCLE.length];

  // Distractors from other words in the list
  const distractors = useMemo(() => {
    return words.filter(w => w.id !== challengeWord?.id).map(w => w.german).slice(0, 3);
  }, [words, challengeWord]);

  return (
    <div className="flex flex-col items-center w-full">
      <AnimatePresence mode="wait">
        {/* ═══ ABSORB — tap words to hear them ═══ */}
        {phase === 'absorb' && (
          <motion.div key="absorb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-[320px]">

            {sceneHint && <p className="text-xs text-white/70 text-center mb-2">{sceneHint}</p>}

            {/* Reveal card — illustration + meaning for the last tapped word (visual-first) */}
            <AnimatePresence mode="wait">
              {focused ? (
                <motion.div key={focused.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mb-3 overflow-hidden rounded-2xl border border-[#d4a520]/30 bg-black/45 shadow-xl backdrop-blur-md">
                  {!focusImgFailed && (
                    <div className="relative h-28 w-full">
                      <img
                        src={`/images/vocab/${focused.id}.jpg`}
                        alt=""
                        onError={() => setFocusImgFailed(true)}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                  )}
                  <div className="px-4 py-2 text-center">
                    <p className="text-lg font-black text-[#d4a520]">{focused.german}</p>
                    <p className="text-xs text-white/75">{focused.english} · {focused.malayalam}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="mb-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-center shadow-xl backdrop-blur-md">
                  <p className="text-sm font-black text-white">Tap a word — see it, hear it.</p>
                  <p className="text-xs text-white/65 mt-0.5">
                    {tappedWords.size}/{words.length} heard
                  </p>
                </div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-2">
              {words.map((vocab, i) => {
                const isTapped = tappedWords.has(vocab.id);
                return (
                  <motion.button key={vocab.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleWordTap(vocab)}
                    className={`px-3 py-3 rounded-xl border text-center transition-all shadow-lg backdrop-blur-md ${
                      isTapped
                        ? 'bg-[#d4a520]/20 border-[#d4a520]/60 shadow-[#d4a520]/10'
                        : 'bg-black/35 border-white/15 hover:border-[#d4a520]/45'
                    }`}>
                    <div className="flex items-center justify-center gap-1.5">
                      <Volume2 className={`w-3.5 h-3.5 ${isTapped ? 'text-[#d4a520]' : 'text-white/55'}`} />
                      <p className={`text-lg font-black ${isTapped ? 'text-[#d4a520]' : 'text-white'}`}>
                        {vocab.german}
                      </p>
                    </div>
                    {isTapped && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-[11px] text-white/70 mt-1">{vocab.english} ✓</motion.p>
                    )}
                    {!isTapped && <p className="text-[10px] text-white/45 mt-1">tap to hear</p>}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-1 mt-2">
              {words.map((v) => (
                <div key={v.id} className={`w-1.5 h-1.5 rounded-full ${tappedWords.has(v.id) ? 'bg-[#d4a520]' : 'bg-white/15'}`} />
              ))}
            </div>

            {tappedWords.size >= words.length && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPhase('challenge')}
                className="mt-3 w-full rounded-2xl bg-[#d4a520] px-4 py-3 text-sm font-black text-[#1b2d1b] shadow-lg shadow-black/25"
              >
                Start the quick check →
              </motion.button>
            )}
          </motion.div>
        )}

        {/* ═══ CHALLENGE — real games, not MCQ ═══ */}
        {phase === 'challenge' && challengeWord && (
          <motion.div key={`challenge-${challengeIdx}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full">

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mb-3">
              {Array.from({ length: totalChallenges }).map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${
                  i < challengeIdx ? 'bg-[#27ae60]' : i === challengeIdx ? 'bg-[#d4a520]' : 'bg-white/15'
                }`} />
              ))}
              {combo > 1 && <span className="text-[10px] font-black text-[#d4a520] ml-1">{combo}x🔥</span>}
            </div>

            {/* Render the REAL game component */}
            {gameType === 'listen-blast' && (
              <ListenBlast
                correctWord={challengeWord.german}
                distractors={distractors.length >= 3 ? distractors : [...distractors, 'Hallo', 'Danke', 'Bitte'].slice(0, 3)}
                onResult={handleChallengeResult}
              />
            )}

            {gameType === 'word-builder' && (
              <WordBuilder
                answer={challengeWord.german}
                hint={challengeWord.english}
                onResult={handleChallengeResult}
              />
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
