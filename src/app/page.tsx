'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Zap } from 'lucide-react';
import { Mascot, getRandomMessage, GameButton, Stars, Confetti } from '@/components/game';
import { useGameStore, LEVEL_NAMES, LEVEL_THRESHOLDS } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';

export default function Home() {
  const router = useRouter();
  const { userProgress, updateStreak } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [mascotMessage, setMascotMessage] = useState('');

  useEffect(() => {
    setMounted(true);
    updateStreak();
  }, [updateStreak]);

  useEffect(() => {
    if (mounted) {
      const isNewUser = userProgress.completedLessons.length === 0;
      if (isNewUser) {
        setMascotMessage(getRandomMessage('welcome'));
      } else {
        setMascotMessage(getRandomMessage('comeback'));
      }
    }
  }, [mounted, userProgress.completedLessons.length]);

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

  // Find next lesson
  const getNextLesson = () => {
    for (const module of ALL_MODULES) {
      for (const lesson of module.lessons) {
        const isCompleted = userProgress.completedLessons.some(l => l.lessonId === lesson.id);
        if (!isCompleted) {
          return { module, lesson };
        }
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();
  const completedCount = userProgress.completedLessons.length;
  const totalLessons = ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const currentLevelXP = LEVEL_THRESHOLDS[userProgress.level - 1] || 0;
  const nextLevelXP = LEVEL_THRESHOLDS[userProgress.level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpProgress = ((userProgress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const handleContinue = () => {
    if (nextLesson) {
      router.push(`/play/${nextLesson.module.id}/${nextLesson.lesson.id}`);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom">
      {/* Top Stats Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-6"
      >
        {/* Streak */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <Flame className={`w-5 h-5 ${userProgress.streak > 0 ? 'text-orange-400 streak-fire' : 'text-white/50'}`} />
          <span className="font-bold text-white">{userProgress.streak}</span>
        </div>

        {/* Level */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <svg className="w-12 h-12 progress-ring" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#ff6b9d"
                strokeWidth="3"
                strokeDasharray={`${xpProgress}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
              {userProgress.level}
            </span>
          </div>
        </div>

        {/* XP */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full px-4 py-2">
          <Star className="w-5 h-5 text-white fill-white" />
          <span className="font-bold text-white">{userProgress.xp}</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        {/* Mascot with Message */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mb-8"
        >
          <Mascot
            message={mascotMessage}
            mood={completedCount === 0 ? 'excited' : 'happy'}
            size="lg"
            showMessage={showWelcome}
            onMessageDismiss={() => setShowWelcome(false)}
          />
        </motion.div>

        {/* Current Progress Display */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            {completedCount === 0 ? (
              <><span className="gradient-text">Start Your Journey!</span> 🚀</>
            ) : (
              <>
                <span className="gradient-text">Level {userProgress.level}</span>
                <span className="text-white/60 text-lg block">{LEVEL_NAMES[userProgress.level - 1]}</span>
              </>
            )}
          </h1>

          {completedCount > 0 && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00d9a5]">{completedCount}</div>
                <div className="text-xs text-white/60">Lessons</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#ffd93d]">{userProgress.learnedVocabulary.length}</div>
                <div className="text-xs text-white/60">Words</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#ff6b9d]">{userProgress.streak}</div>
                <div className="text-xs text-white/60">🔥 Day Streak</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Next Lesson Preview */}
        {nextLesson && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 mb-8 w-full max-w-sm text-center"
          >
            <div className="text-4xl mb-3">{nextLesson.module.icon}</div>
            <p className="text-white/60 text-sm mb-1">
              {completedCount === 0 ? 'Start with 👇' : 'Next up 🎯'}
            </p>
            <h2 className="text-xl font-bold text-white mb-1">
              {nextLesson.lesson.title}
            </h2>
            <p className="text-white/60 text-sm">
              {nextLesson.lesson.titleGerman}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="bg-[#00d9a5]/20 text-[#00d9a5] text-xs font-bold px-3 py-1 rounded-full">
                +{nextLesson.lesson.xpReward} XP
              </span>
              <span className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
                {nextLesson.lesson.duration}
              </span>
            </div>
          </motion.div>
        )}

        {/* Main CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm"
        >
          {nextLesson ? (
            <GameButton
              onClick={handleContinue}
              size="xl"
              fullWidth
              pulse
              icon={<Zap className="w-6 h-6" />}
            >
              {completedCount === 0 ? "Let's Go! 🚀" : 'Continue →'}
            </GameButton>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold text-white mb-2">Course Complete! Adipoli! 🎉</h2>
              <p className="text-white/60">You've finished all lessons! Nee hero aanu! 🦸</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Journey Path Preview (Bottom) */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-white/60 text-sm">Your Journey 🗺️</span>
          <div className="flex-1 h-px bg-white/20 max-w-[100px]" />
        </div>

        {/* Mini Progress Nodes */}
        <div className="flex justify-center items-center gap-3 overflow-x-auto pb-4">
          {ALL_MODULES.flatMap(module =>
            module.lessons.map((lesson, idx) => {
              const isCompleted = userProgress.completedLessons.some(l => l.lessonId === lesson.id);
              const isNext = nextLesson?.lesson.id === lesson.id;
              const completedLesson = userProgress.completedLessons.find(l => l.lessonId === lesson.id);
              const stars = completedLesson ? Math.ceil(completedLesson.score / 34) : 0;

              return (
                <motion.div
                  key={lesson.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isCompleted || isNext) {
                      router.push(`/play/${module.id}/${lesson.id}`);
                    }
                  }}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                    transition-all cursor-pointer flex-shrink-0
                    ${isCompleted
                      ? 'bg-gradient-to-br from-[#00d9a5] to-[#00b388] text-white shadow-lg shadow-[#00d9a5]/30'
                      : isNext
                      ? 'bg-gradient-to-br from-[#ff6b9d] to-[#c44569] text-white animate-pulse-glow'
                      : 'bg-white/10 text-white/30'
                    }
                  `}
                >
                  {isCompleted ? (
                    <span className="text-sm">✓</span>
                  ) : (
                    idx + 1
                  )}
                </motion.div>
              );
            })
          )}
        </div>

        {/* Progress Text */}
        <p className="text-center text-white/40 text-sm mt-2">
          {completedCount} of {totalLessons} lessons completed ✅
        </p>
      </motion.div>
    </div>
  );
}
