'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speakGerman } from '@/lib/audio/useGermanTTS';
import { feedbackCorrect, feedbackWrong, feedbackCombo } from '@/lib/feedback';
import { ListenBlast } from '@/components/exercise-games/ListenBlast';
import { WordBuilder } from '@/components/exercise-games/WordBuilder';
import { WordNinja } from '@/components/exercise-games/WordNinja';
import type { VocabItem } from '@/lib/content/types';

interface VocabDiscoveryGameProps {
  vocabList: VocabItem[];
  sceneHint?: string;
  onComplete: (score: number, total: number) => void;
}

type Phase = 'absorb' | 'challenge';
type GameType = 'listen-blast' | 'word-builder' | 'word-ninja';

const GAME_CYCLE: GameType[] = ['listen-blast', 'word-builder', 'word-ninja'];

export function VocabDiscoveryGame({ vocabList, sceneHint, onComplete }: VocabDiscoveryGameProps) {
  const [phase, setPhase] = useState<Phase>('absorb');
  const [tappedWords, setTappedWords] = useState<Set<string>>(new Set());
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  const words = vocabList.slice(0, 6);
  const totalChallenges = Math.min(words.length, 4); // Test max 4 words

  // Auto-advance from absorb when all tapped or after 6 seconds
  useEffect(() => {
    if (phase === 'absorb') {
      const timer = setTimeout(() => setPhase('challenge'), 6000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'absorb' && tappedWords.size >= words.length) {
      setTimeout(() => setPhase('challenge'), 600);
    }
  }, [phase, tappedWords.size, words.length]);

  const handleWordTap = useCallback((vocab: VocabItem) => {
    try { speakGerman(vocab.german, 0.85); } catch {}
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

            {sceneHint && <p className="text-xs text-white/30 text-center mb-2">{sceneHint}</p>}

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
                    className={`px-3 py-3 rounded-xl border text-center transition-all ${
                      isTapped
                        ? 'bg-[#d4a520]/15 border-[#d4a520]/40'
                        : 'bg-white/5 border-white/10 animate-pulse'
                    }`}>
                    <p className={`text-lg font-black ${isTapped ? 'text-[#d4a520]' : 'text-white/80'}`}>
                      {vocab.german}
                    </p>
                    {isTapped && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-[10px] text-white/40 mt-0.5">{vocab.english}</motion.p>
                    )}
                    {!isTapped && <p className="text-[10px] text-white/20 mt-0.5">tap</p>}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-1 mt-2">
              {words.map((v) => (
                <div key={v.id} className={`w-1.5 h-1.5 rounded-full ${tappedWords.has(v.id) ? 'bg-[#d4a520]' : 'bg-white/15'}`} />
              ))}
            </div>
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

            {gameType === 'word-ninja' && (
              <WordNinja
                prompt={`Find: ${challengeWord.english}`}
                targets={[challengeWord.german]}
                distractors={distractors.length >= 3 ? distractors : [...distractors, 'Hallo', 'Danke', 'Bitte'].slice(0, 4)}
                onResult={handleChallengeResult}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
