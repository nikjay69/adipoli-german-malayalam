'use client';

import { use, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Heart, Loader2 } from 'lucide-react';
import { playVocabAudio, playExampleAudio } from '@/lib/audio';
import { GameButton, ChoiceButton, Confetti, XPGain, Celebration } from '@/components/game';
import { CharacterGuide } from '@/components/character';
import { VideoPlayer } from '@/components/media/VideoPlayer';
import { getRandomMessage } from '@/lib/content/dialogue';
import { getVideoScript } from '@/lib/content/video-scripts';
import { useGameStore } from '@/lib/store';
import { getLessonById, getModuleById, ALL_MODULES } from '@/lib/content/modules';

type Step =
  | { type: 'intro' }
  | { type: 'video'; index: number }
  | { type: 'vocab'; index: number }
  | { type: 'exercise'; index: number }
  | { type: 'complete' };

export default function PlayLesson({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const { moduleId, lessonId } = use(params);
  const router = useRouter();
  const { addXP, completeLesson, learnVocabulary, saveCheckpoint, clearCheckpoint, userProgress } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [step, setStep] = useState<Step>({ type: 'intro' });
  const [hearts, setHearts] = useState(3);
  const [showVocabMeaning, setShowVocabMeaning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'default' | 'correct' | 'incorrect'>('default');
  const [correctCount, setCorrectCount] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [kuttanMsg, setKuttanMsg] = useState('');
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const module = getModuleById(parseInt(moduleId));
  const lesson = getLessonById(lessonId);

  // Check if lesson is unlocked (computed before hooks to avoid conditional hook calls)
  const isLessonUnlocked = (() => {
    if (!module || !lesson) return true; // will be caught by the not-found check below
    const moduleIndex = ALL_MODULES.findIndex(m => m.id === module.id);
    // First module, first lesson always unlocked
    if (moduleIndex === 0) {
      const lessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
      if (lessonIndex === 0) return true;
      // Check previous lesson completed
      return userProgress.completedLessons.some(cl => cl.lessonId === module.lessons[lessonIndex - 1].id);
    }
    // Check previous module complete
    const prevModule = ALL_MODULES[moduleIndex - 1];
    const prevModuleComplete = prevModule.lessons.every(l =>
      userProgress.completedLessons.some(cl => cl.lessonId === l.id)
    );
    if (!prevModuleComplete) return false;
    // Check previous lesson in current module
    const lessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
    if (lessonIndex === 0) return true;
    return userProgress.completedLessons.some(cl => cl.lessonId === module.lessons[lessonIndex - 1].id);
  })();

  // If locked, redirect (wrapped in effect to avoid calling router during render)
  useEffect(() => {
    if (mounted && !isLessonUnlocked) {
      setIsBlocked(true);
      router.replace('/learn');
    }
  }, [mounted, isLessonUnlocked, router]);

  // Resume from checkpoint on mount
  useEffect(() => {
    const checkpoint = userProgress.activeLessonCheckpoint;
    if (checkpoint && checkpoint.lessonId === lessonId) {
      setStep({ type: checkpoint.stepType, index: checkpoint.stepIndex });
      setCorrectCount(checkpoint.correctCount);
      setHearts(checkpoint.hearts);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  // Save checkpoint on step changes
  useEffect(() => {
    if (step.type !== 'intro' && step.type !== 'complete' && module && lesson) {
      saveCheckpoint({
        lessonId: lesson.id,
        moduleId: module.id,
        stepType: step.type,
        stepIndex: (step as { type: string; index: number }).index ?? 0,
        correctCount,
        hearts,
        xpEarned: 0,
        vocabLearned: [],
        startedAt: Date.now(),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (mounted && step.type === 'intro') {
      setKuttanMsg(getRandomMessage('lesson_start'));
    }
  }, [mounted, step.type]);

  if (!mounted || isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[#d4a520] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Helper: highlight German phrases in exercise questions
  // Detects quoted text and common German word patterns
  const highlightGerman = (text: string) => {
    // First try: match quoted phrases (most reliable indicator of German in English questions)
    const quotePattern = /(".*?"|„.*?"|«.*?»)/g;
    const quoteParts = text.split(quotePattern);
    if (quoteParts.length > 1) {
      return (
        <>
          {quoteParts.map((part, i) => {
            if ((part.startsWith('"') && part.endsWith('"')) ||
                (part.startsWith('„') && part.endsWith('"')) ||
                (part.startsWith('«') && part.endsWith('»'))) {
              return (
                <span key={i} className="bg-[#d4a520]/10 text-[#d4a520] font-semibold px-1 rounded">
                  {part}
                </span>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </>
      );
    }
    // Fallback: highlight common German words (case-sensitive to avoid false positives)
    const germanWords = /\b(Ich|Du|Er|Sie|Wir|Ihr|Wie|Was|Wo|Wer|Hallo|Guten|Danke|Bitte|Ja|Nein|Mein|Dein|Haben|Sein|Ist|Sind|Heißt|Heißen|Sprechen|Kommen|Gehe|Morgen|Abend|Tag|Nacht|Tschüss|Entschuldigung|Herr|Frau|Deutsch|Deutschland|Auf Wiedersehen)\b/g;
    const wordParts = text.split(germanWords);
    if (wordParts.length <= 1) return <>{text}</>;
    // Use matchAll to know which parts are German words
    const matches = [...text.matchAll(germanWords)];
    const result: ReactNode[] = [];
    let lastIdx = 0;
    for (const match of matches) {
      const idx = match.index!;
      if (idx > lastIdx) result.push(<span key={`t-${lastIdx}`}>{text.slice(lastIdx, idx)}</span>);
      result.push(
        <span key={`g-${idx}`} className="bg-[#d4a520]/10 text-[#d4a520] px-1 rounded">
          {match[0]}
        </span>
      );
      lastIdx = idx + match[0].length;
    }
    if (lastIdx < text.length) result.push(<span key={`t-${lastIdx}`}>{text.slice(lastIdx)}</span>);
    return <>{result}</>;
  };

  if (!module || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Lesson not found</h1>
          <GameButton onClick={() => router.push('/')}>Go Home</GameButton>
        </div>
      </div>
    );
  }

  const totalSteps = 1 + lesson.videos.length + lesson.vocabulary.length + lesson.exercises.length + 1;
  const currentStepNumber =
    step.type === 'intro' ? 1 :
    step.type === 'video' ? 2 + step.index :
    step.type === 'vocab' ? 2 + lesson.videos.length + step.index :
    step.type === 'exercise' ? 2 + lesson.videos.length + lesson.vocabulary.length + step.index :
    totalSteps;
  const progress = (currentStepNumber / totalSteps) * 100;

  const goNext = () => {
    if (step.type === 'intro') {
      if (lesson.videos.length > 0) setStep({ type: 'video', index: 0 });
      else if (lesson.vocabulary.length > 0) { setStep({ type: 'vocab', index: 0 }); setShowVocabMeaning(false); }
      else setStep({ type: 'exercise', index: 0 });
    } else if (step.type === 'video') {
      if (step.index < lesson.videos.length - 1) setStep({ type: 'video', index: step.index + 1 });
      else if (lesson.vocabulary.length > 0) { setStep({ type: 'vocab', index: 0 }); setShowVocabMeaning(false); }
      else setStep({ type: 'exercise', index: 0 });
    } else if (step.type === 'vocab') {
      learnVocabulary(lesson.vocabulary[step.index].id);
      const xp = 5;
      addXP(xp);
      setXpAmount(xp);
      setShowXP(true);
      setTimeout(() => {
        setShowXP(false);
        if (step.index < lesson.vocabulary.length - 1) { setStep({ type: 'vocab', index: step.index + 1 }); setShowVocabMeaning(false); }
        else if (lesson.exercises.length > 0) { setStep({ type: 'exercise', index: 0 }); setSelectedAnswer(null); setAnswerState('default'); }
        else finishLesson();
      }, 800);
    } else if (step.type === 'exercise') {
      if (step.index < lesson.exercises.length - 1) { setStep({ type: 'exercise', index: step.index + 1 }); setSelectedAnswer(null); setAnswerState('default'); }
      else finishLesson();
    }
  };

  const finishLesson = () => {
    const score = lesson.exercises.length > 0 ? Math.round((correctCount / lesson.exercises.length) * 100) : 100;
    completeLesson(lesson.id, score);
    clearCheckpoint();
    addXP(lesson.xpReward);
    setStep({ type: 'complete' });
    setShowCelebration(true);
  };

  const handleAnswerSelect = (answer: string) => {
    if (answerState !== 'default') return;
    setSelectedAnswer(answer);
    const exercise = lesson.exercises[(step as { type: 'exercise'; index: number }).index];
    const isCorrect = answer === exercise.correctAnswer;

    if (isCorrect) {
      setAnswerState('correct');
      setCorrectCount(prev => prev + 1);
      setKuttanMsg(getRandomMessage('correct'));
      const xp = exercise.xpReward;
      addXP(xp);
      setXpAmount(xp);
      setShowXP(true);
      setTimeout(() => { setShowXP(false); goNext(); }, 1400);
    } else {
      setAnswerState('incorrect');
      setKuttanMsg(getRandomMessage('wrong'));
      setHearts(prev => {
        const newHearts = Math.max(0, prev - 1);
        if (newHearts === 0) {
          setTimeout(() => router.push('/'), 500);
        }
        return newHearts;
      });
      setTimeout(() => {
        setAnswerState('default');
        setSelectedAnswer(null);
      }, 1400);
    }
  };

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom">
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 mx-4 max-w-sm w-full text-center"
          >
            <p className="text-2xl mb-2">🤔</p>
            <h3 className="font-bold text-lg mb-1">Leave lesson?</h3>
            <p className="text-sm text-[var(--foreground)]/50 mb-4">
              Your progress is saved. You can resume later.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[var(--foreground)]/10 font-medium text-sm"
              >
                Stay
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 py-2.5 rounded-xl bg-[#c0392b] text-white font-medium text-sm"
              >
                Leave
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Confetti isActive={answerState === 'correct'} duration={1500} />
      <XPGain amount={xpAmount} isVisible={showXP} />
      <Celebration
        isVisible={showCelebration}
        title="Lesson Complete!"
        subtitle={lesson.title}
        xpEarned={lesson.xpReward}
        onContinue={() => { setShowCelebration(false); router.push('/'); }}
      />

      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowExitConfirm(true)}
            className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[var(--foreground)]/60" />
          </motion.button>

          {/* Progress Bar */}
          <div className="flex-1 mx-3 h-2.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#d4a520] to-[#27ae60] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-0.5">
            {[1, 2, 3].map((h) => (
              <motion.div
                key={h}
                animate={h > hearts ? { scale: [1, 0.8], opacity: 0.3 } : {}}
              >
                <Heart className={`w-5 h-5 ${h <= hearts ? 'text-[#c0392b] fill-[#c0392b]' : 'text-[var(--foreground)]/15'}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {step.type === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <CharacterGuide
                messages={kuttanMsg}
                mood="excited"
                size="md"
              />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <div className="text-4xl mb-3">{module.icon}</div>
                <h1 className="text-2xl font-bold mb-1">{lesson.title}</h1>
                <p className="text-[var(--foreground)]/40 text-base mb-3">{lesson.titleGerman}</p>
                <p className="max-w-md text-sm leading-relaxed text-[var(--foreground)]/60 px-2">
                  {lesson.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                  <span className="rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/10 px-3 py-1 text-[#93c5fd]">
                    🎬 {lesson.videos.length} video{lesson.videos.length === 1 ? '' : 's'}
                  </span>
                  <span className="rounded-full border border-[#d4a520]/20 bg-[#d4a520]/10 px-3 py-1 text-[#d4a520]">
                    📚 {lesson.vocabulary.length} words
                  </span>
                  <span className="rounded-full border border-[#27ae60]/20 bg-[#27ae60]/10 px-3 py-1 text-[#86efac]">
                    📝 {lesson.exercises.length} exercise{lesson.exercises.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="mt-4 rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4 text-left max-w-md mx-auto">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]/40 mb-2">How this lesson works</p>
                  <ul className="space-y-1.5 text-sm text-[var(--foreground)]/60">
                    <li>• Watch the short teaching videos first</li>
                    <li>• Flip through vocabulary with audio</li>
                    <li>• Finish the exercises to lock it in</li>
                    <li>• Mistakes are okay — hearts are there to help you focus</li>
                  </ul>
                </div>
                <span className="inline-block bg-[#27ae60]/15 text-[#27ae60] text-sm font-bold px-4 py-1.5 rounded-full border border-[#27ae60]/20 mt-4">
                  +{lesson.xpReward} XP
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* VIDEO */}
          {step.type === 'video' && (
            <motion.div
              key={`video-${step.index}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', damping: 25 }}
              className="flex-1 flex flex-col justify-center py-4"
            >
              <VideoPlayer
                title={lesson.videos[step.index].title}
                description={lesson.videos[step.index].description}
                duration={lesson.videos[step.index].duration}
                videoUrl={lesson.videos[step.index].videoUrl}
                learningObjectives={lesson.videos[step.index].learningObjectives?.slice(0, 3)}
                script={getVideoScript(lesson.videos[step.index].id)}
              />
            </motion.div>
          )}

          {/* VOCABULARY */}
          {step.type === 'vocab' && (
            <motion.div
              key={`vocab-${step.index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <p className="text-[var(--foreground)]/40 text-sm mb-4">
                Word {step.index + 1} of {lesson.vocabulary.length}
              </p>

              {/* Flashcard */}
              <motion.div
                onClick={() => setShowVocabMeaning(!showVocabMeaning)}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-sm aspect-[4/3] cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  animate={{ rotateY: showVocabMeaning ? 180 : 0 }}
                  transition={{ duration: 0.5, type: 'spring', damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full"
                >
                  {/* Front — German */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#2a4a2a] to-[#1b3d1b] border-2 border-[#d4a520]/30 rounded-2xl flex flex-col items-center justify-center p-6"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-2xl mb-3">🇩🇪</span>
                    <h2 className="text-3xl font-bold mb-2">
                      {lesson.vocabulary[step.index].german}
                    </h2>
                    <p className="text-[var(--foreground)]/50 text-sm">/{lesson.vocabulary[step.index].pronunciation}/</p>
                    <p className="text-[var(--foreground)]/25 text-xs mt-4">Tap to flip</p>
                  </div>

                  {/* Back — Meaning */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#1e4a2e] to-[#143d20] border-2 border-[#27ae60]/30 rounded-2xl flex flex-col items-center justify-center p-6"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h2 className="text-2xl font-bold mb-2">
                      {lesson.vocabulary[step.index].english}
                    </h2>
                    <p className="text-[#d4a520] text-lg mb-3">
                      {lesson.vocabulary[step.index].malayalam}
                    </p>
                    {lesson.vocabulary[step.index].example && (
                      <div className="text-[var(--foreground)]/40 text-center text-sm">
                        <p className="italic">"{lesson.vocabulary[step.index].example}"</p>
                        {lesson.vocabulary[step.index].exampleTranslation && (
                          <p className="mt-1">{lesson.vocabulary[step.index].exampleTranslation}</p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* Audio playback */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => playVocabAudio(lesson.vocabulary[step.index].id)}
                className="mt-5 w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center hover:bg-[var(--foreground)]/5 transition-colors"
              >
                <Volume2 className="w-5 h-5 text-[#d4a520]" />
              </motion.button>
            </motion.div>
          )}

          {/* EXERCISE */}
          {step.type === 'exercise' && (
            <motion.div
              key={`exercise-${step.index}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', damping: 25 }}
              className="flex-1 flex flex-col"
            >
              {/* Kuttan feedback */}
              <div className="flex justify-center mb-3">
                <CharacterGuide
                  messages={kuttanMsg || getRandomMessage('encourage')}
                  mood={answerState === 'correct' ? 'celebrating' : answerState === 'incorrect' ? 'sad' : 'thinking'}
                  size="sm"
                  showAppu={answerState === 'correct'}
                  appuMood="celebrating"
                />
              </div>

              {/* Question */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-xl font-bold text-center mb-6 leading-snug">
                  {highlightGerman(lesson.exercises[step.index].question)}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {lesson.exercises[step.index].options?.map((option, i) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === lesson.exercises[step.index].correctAnswer;
                    let state: 'default' | 'selected' | 'correct' | 'incorrect' = 'default';
                    if (answerState === 'correct' && isCorrect) state = 'correct';
                    else if (answerState === 'incorrect' && isSelected) state = 'incorrect';
                    else if (answerState === 'incorrect' && isCorrect) state = 'correct';
                    else if (isSelected) state = 'selected';

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <ChoiceButton
                          onClick={() => handleAnswerSelect(option)}
                          state={state}
                          disabled={answerState !== 'default'}
                        >
                          {option}
                        </ChoiceButton>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Explanation — shown after answering */}
                {answerState !== 'default' && lesson.exercises[step.index].explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 px-4 py-3"
                  >
                    <p className="text-xs text-[var(--foreground)]/60 leading-relaxed">
                      <span className="font-semibold text-[#d4a520]">Explanation:</span>{' '}
                      {lesson.exercises[step.index].explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Button */}
      {step.type !== 'complete' && step.type !== 'exercise' && (
        <div className="px-4 py-5">
          <GameButton
            onClick={goNext}
            size="lg"
            fullWidth
            variant={step.type === 'vocab' && showVocabMeaning ? 'success' : 'primary'}
            disabled={step.type === 'vocab' && !showVocabMeaning}
          >
            {step.type === 'intro' ? "Let's Start" :
             step.type === 'video' ? 'Continue' :
             step.type === 'vocab' ? (showVocabMeaning ? 'Got It' : 'Tap the card first') :
             'Continue'}
          </GameButton>
        </div>
      )}
    </div>
  );
}
