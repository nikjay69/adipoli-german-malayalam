'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';
import { Kuttan } from '@/components/character/Kuttan';
import { SpeechBubble } from '@/components/character/SpeechBubble';
import { GameButton } from '@/components/game';
import { ComboMeter } from '@/components/game/ComboMeter';
import { Confetti } from '@/components/game';
import { SwipeCards, WordScramble, WordBank, FallingWords, BubblePop } from '@/components/exercise-games';
import { Typewriter } from '@/components/ui/Typewriter';
import { SceneBackground } from '@/components/visual';
import { speakGerman } from '@/lib/audio/useGermanTTS';
import { feedbackCombo, feedbackComboBreak, feedbackWrong, feedbackCelebration } from '@/lib/feedback';
import { getSceneForModule } from '@/lib/audio/ambience';
import type { AdventureMoment } from '@/lib/adventure-engine';
import type { Exercise, VocabItem, Module, Lesson } from '@/lib/content/types';
import { getKuttanReaction } from '@/lib/adventure-engine';
import { generateEncounter, type Encounter } from '@/lib/encounters';

interface AdventurePlayerProps {
  moments: AdventureMoment[];
  module: Module;
  lesson: Lesson;
  allVocab: VocabItem[];
  shownVocab: VocabItem[];
  onComplete: (score: number, total: number, combo: number) => void;
  onExit: () => void;
}

/**
 * The Adventure Player — renders lesson content as a flowing co-learning
 * adventure with Kuttan. No step labels, no "exercise 3 of 8". Just a
 * seamless journey.
 */
export function AdventurePlayer({
  moments,
  module,
  lesson,
  allVocab,
  shownVocab,
  onComplete,
  onExit,
}: AdventurePlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [kuttanReaction, setKuttanReaction] = useState<{ text: string; mood: string } | null>(null);
  const [vocabEncounter, setVocabEncounter] = useState<Encounter | null>(null);

  const moment = moments[currentIdx];
  const progress = ((currentIdx + 1) / moments.length) * 100;
  const sceneType = lesson.storyScene?.setting.sceneType || getSceneForModule(module.id);

  const advance = useCallback(() => {
    if (currentIdx >= moments.length - 1) {
      onComplete(score, total, maxCombo);
      return;
    }
    setCurrentIdx(prev => prev + 1);
    setKuttanReaction(null);
    setVocabEncounter(null);
  }, [currentIdx, moments.length, score, total, maxCombo, onComplete]);

  const handleGameResult = useCallback((correct: boolean) => {
    setTotal(prev => prev + 1);
    const reaction = getKuttanReaction(correct);
    setKuttanReaction(reaction);

    if (correct) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      setScore(prev => prev + 1);
      feedbackCombo(newCombo);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    } else {
      if (combo > 2) feedbackComboBreak(); else feedbackWrong();
      setCombo(0);
    }
    setTimeout(advance, correct ? 1200 : 2000);
  }, [combo, advance]);

  // Auto-speak German vocab when encounter appears
  useEffect(() => {
    if (moment?.type === 'vocab-encounter' && moment.vocab) {
      const timer = setTimeout(() => {
        try { speakGerman(moment.vocab!.german, 0.85); } catch {}
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentIdx, moment]);

  // Generate vocab encounter for quick-game moments
  useEffect(() => {
    if (moment?.type === 'quick-game' && shownVocab.length > 0) {
      const recentVocab = shownVocab.slice(0, Math.min(currentIdx, shownVocab.length));
      if (recentVocab.length > 0) {
        const target = recentVocab[Math.floor(Math.random() * recentVocab.length)];
        setVocabEncounter(generateEncounter(target, allVocab));
      }
    }
  }, [currentIdx, moment, shownVocab, allVocab]);

  if (!moment) return null;

  const kuttanMood = kuttanReaction
    ? (kuttanReaction.mood as import('@/components/character/Kuttan').KuttanMood)
    : (moment.kuttanMood === 'thumbsup' || moment.kuttanMood === 'confused' || moment.kuttanMood === 'reading'
      ? 'happy' : moment.kuttanMood as import('@/components/character/Kuttan').KuttanMood);

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom">
      <SceneBackground scene={sceneType} opacity={0.15} />
      <Confetti isActive={showConfetti} duration={800} />

      {/* Minimal header — no step numbers, just progress + exit */}
      <div className="px-4 pt-3 pb-1 relative z-10">
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onExit}
            className="w-9 h-9 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center">
            <X className="w-4 h-4 text-[var(--foreground)]/50" />
          </motion.button>
          <div className="flex-1 h-2 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[#d4a520] to-[#27ae60] rounded-full"
              animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
          {combo > 1 && (
            <span className="text-xs font-bold text-[#d4a520]">{combo}x</span>
          )}
        </div>
        {(combo > 0 || maxCombo > 0) && (
          <div className="mt-1"><ComboMeter combo={combo} maxCombo={maxCombo} /></div>
        )}
      </div>

      {/* Main adventure area */}
      <div className="flex-1 px-4 flex flex-col overflow-y-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* ═══ KUTTAN INTRO ═══ */}
            {moment.type === 'kuttan-intro' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Kuttan mood="waving" size="md" />
                <div className="mt-3 max-w-sm">
                  <p className="text-sm text-[var(--foreground)]/70 italic leading-relaxed">
                    <Typewriter text={moment.kuttanSays || ''} speed={40} delay={300} />
                  </p>
                </div>
                {moment.sceneText && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                    className="mt-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl px-4 py-2.5 max-w-sm">
                    <p className="text-xs text-[var(--foreground)]/50">{moment.sceneText}</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* ═══ VOCAB ENCOUNTER ═══ */}
            {moment.type === 'vocab-encounter' && moment.vocab && (
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Kuttan discovers the word */}
                <div className="flex items-start gap-2 mb-4 max-w-sm w-full">
                  <Kuttan mood="pointing" size="sm" entrance={false} />
                  <div className="bg-[var(--foreground)]/5 rounded-2xl rounded-tl-sm px-3 py-2 flex-1">
                    <p className="text-xs text-[var(--foreground)]/60">
                      {moment.kuttanSays}
                    </p>
                  </div>
                </div>

                {/* The word card */}
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                  className="w-full max-w-[280px] bg-gradient-to-br from-[#2a4a2a] to-[#1b3d1b] border-2 border-[#d4a520]/30 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-[#d4a520]">{moment.vocab.german}</h2>
                    <motion.button whileTap={{ scale: 0.9 }}
                      onClick={() => { try { speakGerman(moment.vocab!.german); } catch {} }}
                      className="w-7 h-7 rounded-full bg-[#d4a520]/15 flex items-center justify-center">
                      <Volume2 className="w-3 h-3 text-[#d4a520]" />
                    </motion.button>
                  </div>
                  <p className="text-[var(--foreground)]/40 text-xs mb-2">/{moment.vocab.pronunciation}/</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium">{moment.vocab.english}</span>
                    <span className="text-[#d4a520] text-xs">{moment.vocab.malayalam}</span>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ═══ QUICK GAME ═══ */}
            {moment.type === 'quick-game' && vocabEncounter && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex items-start gap-2 mb-4 max-w-sm w-full">
                  <Kuttan mood="excited" size="sm" entrance={false} />
                  <div className="bg-[#d4a520]/10 rounded-2xl rounded-tl-sm px-3 py-2 flex-1">
                    <p className="text-xs font-semibold text-[#d4a520]">{moment.kuttanSays}</p>
                  </div>
                </div>
                <div className="w-full max-w-sm">
                  <p className="text-sm font-bold text-center mb-3">{vocabEncounter.prompt}</p>
                  {vocabEncounter.options.length > 0 ? (
                    <SwipeCards
                      question={vocabEncounter.prompt}
                      options={vocabEncounter.options}
                      correctAnswer={vocabEncounter.options[vocabEncounter.correctIndex]}
                      onResult={handleGameResult}
                    />
                  ) : (
                    <WordScramble
                      hint={vocabEncounter.prompt}
                      answer={vocabEncounter.correctText || vocabEncounter.targetVocab.german}
                      onResult={handleGameResult}
                    />
                  )}
                </div>
              </div>
            )}

            {/* ═══ KUTTAN CONFUSED ═══ */}
            {moment.type === 'kuttan-confused' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <Kuttan mood="thinking" size="md" />
                <div className="mt-3 bg-[#c0392b]/10 border border-[#c0392b]/20 rounded-xl px-4 py-3 max-w-sm">
                  <p className="text-sm text-[var(--foreground)]/70">{moment.kuttanSays}</p>
                </div>
                {moment.sceneText && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    className="mt-3 bg-[#27ae60]/10 border border-[#27ae60]/20 rounded-xl px-4 py-3 max-w-sm">
                    <p className="text-xs font-semibold text-[#27ae60]">{moment.sceneText}</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* ═══ DECISION ═══ */}
            {moment.type === 'decision' && moment.decision && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex items-start gap-2 mb-3 max-w-sm w-full">
                  <Kuttan mood="thinking" size="sm" entrance={false} />
                  <div className="bg-[var(--foreground)]/5 rounded-2xl rounded-tl-sm px-3 py-2 flex-1">
                    <p className="text-xs text-[var(--foreground)]/60">{moment.kuttanSays}</p>
                  </div>
                </div>
                <div className="w-full max-w-sm">
                  <p className="text-base font-medium text-center mb-3 leading-snug">{moment.decision.moment}</p>
                  <div className="space-y-2">
                    {moment.decision.options.map((opt, i) => (
                      <motion.button key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleGameResult(opt.isCorrect)}
                        className="w-full text-left px-3.5 py-3 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card-bg)] text-sm font-medium">
                        {opt.text}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ EXERCISE GAME ═══ */}
            {moment.type === 'exercise-game' && moment.exercise && (
              <div className="flex-1 flex flex-col justify-center">
                {moment.kuttanSays && (
                  <div className="flex items-start gap-2 mb-3 max-w-sm mx-auto w-full">
                    <Kuttan mood={kuttanMood} size="sm" entrance={false} />
                    <div className="bg-[var(--foreground)]/5 rounded-2xl rounded-tl-sm px-3 py-2 flex-1">
                      <p className="text-xs text-[var(--foreground)]/60">{kuttanReaction?.text || moment.kuttanSays}</p>
                    </div>
                  </div>
                )}
                <div className="w-full max-w-sm mx-auto">
                  <p className="text-sm font-bold text-center mb-3">{moment.exercise.question}</p>
                  {renderExerciseGame(moment.exercise, handleGameResult)}
                </div>
              </div>
            )}

            {/* ═══ KUTTAN REACT ═══ */}
            {moment.type === 'kuttan-react' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <Kuttan mood="celebrating" size="md" />
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="mt-3 text-sm font-semibold text-[#d4a520] text-center">
                  {moment.kuttanSays}
                </motion.p>
              </div>
            )}

            {/* ═══ CELEBRATION ═══ */}
            {moment.type === 'celebration' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <Kuttan mood="celebrating" size="lg" />
                <motion.p initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                  className="mt-3 text-lg font-bold text-[#d4a520] text-center">
                  {moment.kuttanSays}
                </motion.p>
              </div>
            )}

            {/* ═══ FINALE ═══ */}
            {moment.type === 'finale' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Kuttan mood="celebrating" size="lg" />
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="mt-4">
                  <p className="text-xl font-bold mb-2">Adventure Complete! 🎉</p>
                  <p className="text-sm text-[var(--foreground)]/60 mb-1">{score}/{total} correct • Max combo: {maxCombo}x</p>
                  <p className="text-xs text-[#d4a520] italic mt-2">{moment.kuttanSays}</p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom action — tap to continue for non-game moments */}
      {!['quick-game', 'exercise-game', 'decision'].includes(moment.type) && moment.type !== 'finale' && (
        <div className="px-4 py-4 relative z-10">
          <GameButton onClick={advance} fullWidth variant="primary" size="lg">
            {moment.type === 'kuttan-intro' ? "Let's explore!" :
             moment.type === 'celebration' ? "Keep going!" :
             moment.type === 'kuttan-confused' ? "I'll help you!" :
             "Continue"}
          </GameButton>
        </div>
      )}

      {/* Finale button */}
      {moment.type === 'finale' && (
        <div className="px-4 py-4 relative z-10">
          <GameButton onClick={() => onComplete(score, total, maxCombo)} fullWidth variant="primary" size="lg">
            Complete Adventure
          </GameButton>
        </div>
      )}
    </div>
  );
}

/** Render the right game component for an exercise */
function renderExerciseGame(exercise: Exercise, onResult: (correct: boolean) => void) {
  const correctStr = typeof exercise.correctAnswer === 'string' ? exercise.correctAnswer : exercise.correctAnswer[0];

  if (exercise.type === 'fill-blank' && exercise.options?.length) {
    return <WordBank sentence={exercise.question} options={exercise.options} correctAnswer={correctStr} onResult={onResult} />;
  }
  if (exercise.type === 'matching' && Array.isArray(exercise.correctAnswer)) {
    return <BubblePop leftItems={exercise.options || []} rightItems={exercise.correctAnswer as string[]} onResult={onResult} />;
  }
  if (exercise.type === 'dictation') {
    const distractors = (exercise.options || []).filter(o => o !== correctStr).slice(0, 3);
    return <FallingWords correctWord={correctStr} distractors={distractors.length >= 2 ? distractors : ['Hallo', 'Danke', 'Bitte']} hint="Catch the right word!" onResult={onResult} />;
  }
  if (exercise.type === 'type-answer' || exercise.type === 'free-text' || exercise.type === 'ordering') {
    return <WordScramble hint="" answer={correctStr.trim()} onResult={onResult} />;
  }
  if (exercise.options?.length) {
    return <SwipeCards question="" options={exercise.options} correctAnswer={correctStr} onResult={onResult} />;
  }
  return <WordScramble hint="" answer={correctStr.trim()} onResult={onResult} />;
}
