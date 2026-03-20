'use client';

import { use, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Heart } from 'lucide-react';
import { Mascot, getRandomMessage, GameButton, ChoiceButton, Confetti, XPGain, Celebration, Stars } from '@/components/game';
import { useGameStore } from '@/lib/store';
import { getLessonById, getModuleById } from '@/lib/content/modules';

type Step =
  | { type: 'intro' }
  | { type: 'video'; index: number }
  | { type: 'vocab'; index: number }
  | { type: 'exercise'; index: number }
  | { type: 'complete' };

export default function PlayLesson({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const { moduleId, lessonId } = use(params);
  const router = useRouter();
  const { userProgress, addXP, completeLesson, learnVocabulary } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>({ type: 'intro' });
  const [hearts, setHearts] = useState(3);
  const [showVocabMeaning, setShowVocabMeaning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'default' | 'correct' | 'incorrect'>('default');
  const [correctCount, setCorrectCount] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mascotMessage, setMascotMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const module = getModuleById(parseInt(moduleId));
  const lesson = getLessonById(lessonId);

  useEffect(() => {
    if (mounted && step.type === 'intro') {
      setMascotMessage(getRandomMessage('lesson_start'));
    }
  }, [mounted, step.type]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-[#ff6b9d] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!module || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
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
      if (lesson.videos.length > 0) {
        setStep({ type: 'video', index: 0 });
      } else if (lesson.vocabulary.length > 0) {
        setStep({ type: 'vocab', index: 0 });
      } else {
        setStep({ type: 'exercise', index: 0 });
      }
    } else if (step.type === 'video') {
      if (step.index < lesson.videos.length - 1) {
        setStep({ type: 'video', index: step.index + 1 });
      } else if (lesson.vocabulary.length > 0) {
        setStep({ type: 'vocab', index: 0 });
        setShowVocabMeaning(false);
      } else {
        setStep({ type: 'exercise', index: 0 });
      }
    } else if (step.type === 'vocab') {
      learnVocabulary(lesson.vocabulary[step.index].id);
      const xp = 5;
      addXP(xp);
      setXpAmount(xp);
      setShowXP(true);

      setTimeout(() => {
        setShowXP(false);
        if (step.index < lesson.vocabulary.length - 1) {
          setStep({ type: 'vocab', index: step.index + 1 });
          setShowVocabMeaning(false);
        } else if (lesson.exercises.length > 0) {
          setStep({ type: 'exercise', index: 0 });
          setSelectedAnswer(null);
          setAnswerState('default');
        } else {
          finishLesson();
        }
      }, 800);
    } else if (step.type === 'exercise') {
      if (step.index < lesson.exercises.length - 1) {
        setStep({ type: 'exercise', index: step.index + 1 });
        setSelectedAnswer(null);
        setAnswerState('default');
      } else {
        finishLesson();
      }
    }
  };

  const finishLesson = () => {
    const score = Math.round((correctCount / lesson.exercises.length) * 100);
    completeLesson(lesson.id, score);
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
      setMascotMessage(getRandomMessage('correct'));
      const xp = exercise.xpReward;
      addXP(xp);
      setXpAmount(xp);
      setShowXP(true);

      setTimeout(() => {
        setShowXP(false);
        goNext();
      }, 1500);
    } else {
      setAnswerState('incorrect');
      setHearts(prev => Math.max(0, prev - 1));
      setMascotMessage(getRandomMessage('wrong'));

      setTimeout(() => {
        setAnswerState('default');
        setSelectedAnswer(null);
        if (hearts <= 1) {
          router.push('/');
        }
      }, 1500);
    }
  };

  const handleExit = () => {
    router.push('/');
  };

  const handleCelebrationContinue = () => {
    setShowCelebration(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col safe-top safe-bottom">
      {/* Confetti */}
      <Confetti isActive={answerState === 'correct'} duration={1500} />

      {/* XP Popup */}
      <XPGain amount={xpAmount} isVisible={showXP} />

      {/* Celebration Screen */}
      <Celebration
        isVisible={showCelebration}
        title="Lesson Complete! Adipoli! 🎉"
        subtitle={lesson.title}
        xpEarned={lesson.xpReward}
        onContinue={handleCelebrationContinue}
      />

      {/* Header */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          {/* Exit Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleExit}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white/70" />
          </motion.button>

          {/* Progress Bar */}
          <div className="flex-1 mx-4 h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ff6b9d] to-[#a855f7] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((h) => (
              <motion.div
                key={h}
                animate={h <= hearts ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`w-6 h-6 ${h <= hearts ? 'text-red-500 fill-red-500' : 'text-white/20'}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 flex flex-col">
        <AnimatePresence mode="wait">
          {/* INTRO STEP */}
          {step.type === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <Mascot message={mascotMessage} mood="excited" size="lg" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <div className="text-5xl mb-4">{module.icon}</div>
                <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
                <p className="text-white/60 text-lg mb-2">{lesson.titleGerman}</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="bg-[#00d9a5]/20 text-[#00d9a5] text-sm font-bold px-4 py-2 rounded-full">
                    +{lesson.xpReward} XP
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* VIDEO STEP */}
          {step.type === 'video' && (
            <motion.div
              key={`video-${step.index}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Video Placeholder */}
                <div className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-6 flex flex-col items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2" />
                  </motion.div>
                  <p className="text-white/60 text-sm mt-4">Video: {lesson.videos[step.index].title}</p>
                  <p className="text-white/40 text-xs mt-1">{lesson.videos[step.index].duration}</p>
                </div>

                {/* Video Info */}
                <div className="glass-card p-4 w-full">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {lesson.videos[step.index].title}
                  </h2>
                  <p className="text-white/70 text-sm mb-3">
                    {lesson.videos[step.index].description}
                  </p>
                  <div className="text-xs text-white/50">
                    <p className="font-semibold mb-1">You'll learn:</p>
                    <ul className="space-y-1">
                      {lesson.videos[step.index].learningObjectives.slice(0, 2).map((obj, i) => (
                        <li key={i}>• {obj}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* VOCABULARY STEP */}
          {step.type === 'vocab' && (
            <motion.div
              key={`vocab-${step.index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <p className="text-white/60 text-sm mb-4">
                Word {step.index + 1} of {lesson.vocabulary.length} 📖
              </p>

              {/* Flashcard */}
              <motion.div
                onClick={() => setShowVocabMeaning(!showVocabMeaning)}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-sm aspect-[4/3] cursor-pointer perspective-1000"
              >
                <motion.div
                  animate={{ rotateY: showVocabMeaning ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full"
                >
                  {/* Front - German */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#ff6b9d] to-[#c44569] rounded-3xl flex flex-col items-center justify-center p-6 backface-hidden shadow-2xl"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🇩🇪
                    </motion.div>
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {lesson.vocabulary[step.index].german}
                    </h2>
                    <p className="text-white/70">/{lesson.vocabulary[step.index].pronunciation}/</p>
                    <p className="text-white/50 text-sm mt-4">Tap to flip! 🔄</p>
                  </div>

                  {/* Back - Meaning */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#00d9a5] to-[#00b388] rounded-3xl flex flex-col items-center justify-center p-6 backface-hidden shadow-2xl"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {lesson.vocabulary[step.index].english}
                    </h2>
                    <p className="text-white/80 text-xl mb-4">
                      {lesson.vocabulary[step.index].malayalam}
                    </p>
                    <div className="text-white/60 text-center text-sm">
                      <p className="italic">"{lesson.vocabulary[step.index].example}"</p>
                      <p className="mt-1">{lesson.vocabulary[step.index].exampleTranslation}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Audio Button Placeholder */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center"
              >
                <Volume2 className="w-6 h-6 text-white/70" />
              </motion.button>
            </motion.div>
          )}

          {/* EXERCISE STEP */}
          {step.type === 'exercise' && (
            <motion.div
              key={`exercise-${step.index}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col"
            >
              {/* Mascot */}
              <div className="flex justify-center mb-4">
                <Mascot
                  message={mascotMessage}
                  mood={answerState === 'correct' ? 'celebrating' : answerState === 'incorrect' ? 'sad' : 'thinking'}
                  size="sm"
                  showMessage={answerState !== 'default'}
                />
              </div>

              {/* Question */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-white text-center mb-8">
                  {lesson.exercises[step.index].question}
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
                      <ChoiceButton
                        key={i}
                        onClick={() => handleAnswerSelect(option)}
                        state={state}
                        disabled={answerState !== 'default'}
                      >
                        {option}
                      </ChoiceButton>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* COMPLETE STEP - handled by Celebration overlay */}
        </AnimatePresence>
      </div>

      {/* Bottom Button */}
      {step.type !== 'complete' && step.type !== 'exercise' && (
        <div className="px-4 py-6">
          <GameButton
            onClick={goNext}
            size="xl"
            fullWidth
            variant={step.type === 'vocab' && showVocabMeaning ? 'success' : 'primary'}
          >
            {step.type === 'intro' ? "Let's Start! 🚀" :
             step.type === 'video' ? 'Continue →' :
             step.type === 'vocab' ? (showVocabMeaning ? 'Got It! ✅' : 'Tap the card first 👆') :
             'Continue →'}
          </GameButton>
        </div>
      )}
    </div>
  );
}
