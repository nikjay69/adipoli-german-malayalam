'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';
import { KuttanImage, type KuttanMoodImage } from '@/components/character/KuttanImage';
import { GameButton } from '@/components/game';
import { ComboMeter } from '@/components/game/ComboMeter';
import { Confetti } from '@/components/game';
import { SwipeCards, WordScramble, WordBank, FallingWords, BubblePop } from '@/components/exercise-games';
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

// Scene images for intro backgrounds
const SCENE_IMAGES: Record<string, string> = {
  cafe: '/images/kaffee_kuchen.png',
  bahnhof: '/images/german_train_station.png',
  street: '/images/berlin_people.png',
  classroom: '/images/university_library.png',
  kitchen: '/images/breakfast_merge.png',
  office: '/images/office_building.png',
};

export function AdventurePlayer({
  moments, module, lesson, allVocab, shownVocab, onComplete, onExit,
}: AdventurePlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [vocabEncounter, setVocabEncounter] = useState<Encounter | null>(null);

  const moment = moments[currentIdx];
  const progress = ((currentIdx + 1) / moments.length) * 100;
  const sceneType = lesson.storyScene?.setting.sceneType || getSceneForModule(module.id);
  const sceneImage = SCENE_IMAGES[sceneType] || SCENE_IMAGES.classroom;

  const advance = useCallback(() => {
    if (currentIdx >= moments.length - 1) { onComplete(score, total, maxCombo); return; }
    setCurrentIdx(prev => prev + 1);
    setVocabEncounter(null);
  }, [currentIdx, moments.length, score, total, maxCombo, onComplete]);

  const handleGameResult = useCallback((correct: boolean) => {
    setTotal(prev => prev + 1);
    if (correct) {
      const newCombo = combo + 1;
      setCombo(newCombo); setMaxCombo(prev => Math.max(prev, newCombo));
      setScore(prev => prev + 1); feedbackCombo(newCombo);
      setShowConfetti(true); setTimeout(() => setShowConfetti(false), 800);
    } else {
      if (combo > 2) feedbackComboBreak(); else feedbackWrong();
      setCombo(0);
    }
    setTimeout(advance, correct ? 1000 : 1500);
  }, [combo, advance]);

  // Auto-speak vocab
  useEffect(() => {
    if (moment?.type === 'vocab-encounter' && moment.vocab) {
      setTimeout(() => { try { speakGerman(moment.vocab!.german, 0.85); } catch {} }, 400);
    }
  }, [currentIdx, moment]);

  // Generate encounter for quick-game
  useEffect(() => {
    if (moment?.type === 'quick-game' && shownVocab.length > 0) {
      const pool = shownVocab.slice(0, Math.max(currentIdx, 2));
      if (pool.length > 0) setVocabEncounter(generateEncounter(pool[Math.floor(Math.random() * pool.length)], allVocab));
    }
  }, [currentIdx, moment, shownVocab, allVocab]);

  if (!moment) return null;

  const kMood: KuttanMoodImage = moment.kuttanMood || 'happy';

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom relative">
      <SceneBackground scene={sceneType} opacity={0.12} />
      <Confetti isActive={showConfetti} duration={800} />

      {/* Header — minimal */}
      <div className="px-4 pt-3 pb-1 relative z-10">
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onExit}
            className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
            <X className="w-4 h-4 text-white/60" />
          </motion.button>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[#d4a520] to-[#27ae60] rounded-full"
              animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
          {combo > 1 && <span className="text-xs font-black text-[#d4a520]">{combo}x🔥</span>}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={currentIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col">

            {/* ═══ INTRO ═══ */}
            {moment.type === 'kuttan-intro' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Scene image as background card */}
                <div className="relative w-full max-w-sm h-36 rounded-2xl overflow-hidden mb-4">
                  <img src={sceneImage} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h2 className="text-white font-bold text-base">{lesson.title}</h2>
                    <p className="text-white/50 text-[10px]">{lesson.titleGerman}</p>
                  </div>
                </div>
                {/* Kuttan PNG */}
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                  <KuttanImage mood="waving" size="lg" animate={false} />
                </motion.div>
                <p className="text-sm text-white/60 text-center mt-2 max-w-[250px]">
                  {(moment.kuttanSays || '').slice(0, 60)}...
                </p>
              </div>
            )}

            {/* ═══ VOCAB ENCOUNTER ═══ */}
            {moment.type === 'vocab-encounter' && moment.vocab && (
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Kuttan reacting to the word */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 0.5, delay: 0.3 }}>
                    <KuttanImage mood="excited" size="sm" animate={false} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-3 py-1.5">
                    <p className="text-xs text-white/60">Check this out! 👀</p>
                  </motion.div>
                </div>

                {/* Word card — animated reveal */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                  className="relative w-full max-w-[300px]">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-[#d4a520]/15 rounded-3xl blur-2xl" />
                  <div className="relative bg-gradient-to-br from-[#1a3a1a] to-[#0d2a0d] border-2 border-[#d4a520]/50 rounded-3xl overflow-hidden">
                    {/* Top section — big word */}
                    <div className="bg-[#d4a520]/10 px-6 pt-5 pb-4 text-center">
                      <motion.div className="flex items-center justify-center gap-3"
                        animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                        <h2 className="text-4xl font-black text-[#d4a520] tracking-tight">{moment.vocab.german}</h2>
                        <motion.button whileTap={{ scale: 0.85 }}
                          onClick={() => { try { speakGerman(moment.vocab!.german); } catch {} }}
                          className="w-10 h-10 rounded-full bg-[#d4a520]/20 border border-[#d4a520]/30 flex items-center justify-center">
                          <Volume2 className="w-5 h-5 text-[#d4a520]" />
                        </motion.button>
                      </motion.div>
                      <p className="text-white/25 text-xs mt-1 font-mono">/{moment.vocab.pronunciation}/</p>
                    </div>
                    {/* Bottom section — meaning */}
                    <div className="px-6 py-4 text-center">
                      <p className="text-lg font-bold text-white">{moment.vocab.english}</p>
                      <p className="text-[#d4a520] text-sm mt-0.5">{moment.vocab.malayalam}</p>
                      {moment.vocab.example && (
                        <p className="text-[10px] text-white/30 mt-2 italic">&ldquo;{moment.vocab.example}&rdquo;</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ═══ QUICK GAME ═══ */}
            {moment.type === 'quick-game' && vocabEncounter && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <KuttanImage mood="excited" size="xs" animate={false} />
                  <span className="text-xs font-bold text-[#d4a520]">Quick test! ⚡</span>
                </div>
                <div className="w-full max-w-sm">
                  {vocabEncounter.options.length > 0 ? (
                    <SwipeCards question={vocabEncounter.prompt}
                      options={vocabEncounter.options}
                      correctAnswer={vocabEncounter.options[vocabEncounter.correctIndex]}
                      onResult={handleGameResult} />
                  ) : (
                    <WordScramble hint={vocabEncounter.prompt}
                      answer={vocabEncounter.correctText || vocabEncounter.targetVocab.german}
                      onResult={handleGameResult} />
                  )}
                </div>
              </div>
            )}

            {/* ═══ KUTTAN CONFUSED ═══ */}
            {moment.type === 'kuttan-confused' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <KuttanImage mood="confused" size="md" animate={false} />
                <div className="bg-[#c0392b]/10 border border-[#c0392b]/20 rounded-xl px-4 py-2 mt-3 max-w-[280px]">
                  <p className="text-sm text-white/70 text-center">{(moment.kuttanSays || '').slice(0, 80)}</p>
                </div>
                {moment.sceneText && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    className="bg-[#27ae60]/10 border border-[#27ae60]/20 rounded-xl px-4 py-2 mt-2 max-w-[280px]">
                    <p className="text-xs font-semibold text-[#27ae60] text-center">{moment.sceneText}</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* ═══ DECISION ═══ */}
            {moment.type === 'decision' && moment.decision && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <KuttanImage mood="thinking" size="sm" animate={false} />
                <p className="text-sm font-medium text-center mt-2 mb-3 max-w-[280px] leading-snug">
                  {moment.decision.moment.slice(0, 100)}
                </p>
                <div className="w-full max-w-sm space-y-2">
                  {moment.decision.options.map((opt, i) => (
                    <motion.button key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleGameResult(opt.isCorrect)}
                      className="w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm font-medium">
                      {opt.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ EXERCISE GAME ═══ */}
            {moment.type === 'exercise-game' && moment.exercise && (
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3 justify-center">
                  <KuttanImage mood={kMood} size="xs" animate={false} />
                  {moment.kuttanSays && <span className="text-[10px] text-white/40">{(moment.kuttanSays).slice(0, 40)}</span>}
                </div>
                <p className="text-sm font-bold text-center mb-3 max-w-sm mx-auto">{moment.exercise.question.slice(0, 120)}</p>
                <div className="w-full max-w-sm mx-auto">
                  {renderGame(moment.exercise, handleGameResult)}
                </div>
              </div>
            )}

            {/* ═══ KUTTAN REACT / CELEBRATION ═══ */}
            {(moment.type === 'kuttan-react' || moment.type === 'celebration') && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
                  <KuttanImage mood="celebrating" size="lg" animate={false} />
                </motion.div>
                <p className="text-sm font-bold text-[#d4a520] text-center mt-3">
                  {(moment.kuttanSays || '').slice(0, 50)}
                </p>
              </div>
            )}

            {/* ═══ FINALE ═══ */}
            {moment.type === 'finale' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <KuttanImage mood="celebrating" size="xl" animate={false} />
                </motion.div>
                <p className="text-xl font-black text-white mt-4">Adventure Complete! 🎉</p>
                <p className="text-sm text-white/40 mt-1">{score}/{total} correct • {maxCombo}x max combo</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom button — always visible */}
      {!['quick-game', 'exercise-game', 'decision'].includes(moment.type) && (
        <div className="px-4 pb-4 pt-2 relative z-10">
          <GameButton onClick={moment.type === 'finale' ? () => onComplete(score, total, maxCombo) : advance}
            fullWidth variant="primary">
            {moment.type === 'kuttan-intro' ? "Let's go!" :
             moment.type === 'finale' ? "Complete" :
             moment.type === 'celebration' ? "Keep going!" :
             moment.type === 'kuttan-confused' ? "I know this!" : "Next"}
          </GameButton>
        </div>
      )}
    </div>
  );
}

function renderGame(ex: Exercise, onResult: (c: boolean) => void) {
  const correct = typeof ex.correctAnswer === 'string' ? ex.correctAnswer : ex.correctAnswer[0];
  if (ex.type === 'fill-blank' && ex.options?.length)
    return <WordBank sentence={ex.question} options={ex.options} correctAnswer={correct} onResult={onResult} />;
  if (ex.type === 'matching' && Array.isArray(ex.correctAnswer))
    return <BubblePop leftItems={ex.options || []} rightItems={ex.correctAnswer as string[]} onResult={onResult} />;
  if (ex.type === 'dictation') {
    const d = (ex.options || []).filter(o => o !== correct).slice(0, 3);
    return <FallingWords correctWord={correct} distractors={d.length >= 2 ? d : ['Hallo', 'Danke', 'Bitte']} hint="Catch it!" onResult={onResult} />;
  }
  if (ex.type === 'type-answer' || ex.type === 'free-text' || ex.type === 'ordering')
    return <WordScramble hint="" answer={correct.trim()} onResult={onResult} />;
  if (ex.options?.length)
    return <SwipeCards question="" options={ex.options} correctAnswer={correct} onResult={onResult} />;
  return <WordScramble hint="" answer={correct.trim()} onResult={onResult} />;
}
