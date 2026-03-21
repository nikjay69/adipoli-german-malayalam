'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Flame, Star, Zap, Award } from 'lucide-react';
import { GameButton } from '@/components/game';
import { CharacterGuide } from '@/components/character';
import { getRandomMessage } from '@/lib/content/dialogue';
import { useGameStore, LEVEL_NAMES, LEVEL_THRESHOLDS } from '@/lib/store';
import { ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';
import { JOURNEY_LOCATIONS, getCurrentLocation } from '@/lib/journey';
import { calculateExamReadiness } from '@/lib/exam-readiness';

export default function Home() {
  const router = useRouter();
  const { userProgress, updateStreak } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [kuttanMessage, setKuttanMessage] = useState('');

  useEffect(() => {
    setMounted(true);
    updateStreak();
  }, [updateStreak]);

  // Redirect to intro if first visit
  useEffect(() => {
    if (mounted && !userProgress.hasSeenIntro) {
      router.replace('/intro');
    }
  }, [mounted, userProgress.hasSeenIntro, router]);

  useEffect(() => {
    if (mounted) {
      const isNewUser = userProgress.completedLessons.length === 0;
      setKuttanMessage(getRandomMessage(isNewUser ? 'welcome' : 'comeback'));
    }
  }, [mounted, userProgress.completedLessons.length]);

  if (!mounted) {
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

  const getNextLesson = () => {
    for (const module of ALL_MODULES) {
      for (const lesson of module.lessons) {
        if (!userProgress.completedLessons.some(l => l.lessonId === lesson.id)) {
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
        className="flex items-center justify-between mb-8"
      >
        {/* Streak */}
        <div className="flex items-center gap-2 bg-[var(--card-bg)] rounded-full px-4 py-2 border border-[var(--card-border)]">
          <Flame className={`w-5 h-5 ${userProgress.streak > 0 ? 'text-[#c0392b] streak-fire' : 'text-[var(--foreground)]/40'}`} />
          <span className="font-bold">{userProgress.streak}</span>
        </div>

        {/* Level */}
        <div className="relative">
          <svg className="w-12 h-12 progress-ring" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(245,240,232,0.1)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#d4a520"
              strokeWidth="3"
              strokeDasharray={`${xpProgress}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-bold text-sm">
            {userProgress.level}
          </span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-2 bg-[#d4a520]/15 border border-[#d4a520]/30 rounded-full px-4 py-2">
          <Star className="w-4 h-4 text-[#d4a520] fill-[#d4a520]" />
          <span className="font-bold text-[#d4a520]">{userProgress.xp}</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[65vh]">
        {/* Kuttan */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mb-6"
        >
          <CharacterGuide
            messages={kuttanMessage}
            mood={completedCount === 0 ? 'waving' : 'happy'}
            size="md"
            showAppu={completedCount === 0}
            appuMood="happy"
          />
        </motion.div>

        {/* Progress Display */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold mb-1">
            {completedCount === 0 ? (
              <span className="gradient-text">Start Your Journey</span>
            ) : (
              <>
                <span className="gradient-text">Level {userProgress.level}</span>
                <span className="text-[var(--foreground)]/50 text-base block mt-1">{LEVEL_NAMES[userProgress.level - 1]}</span>
              </>
            )}
          </h1>

          {completedCount > 0 && (
            <div className="flex items-center justify-center gap-5 mt-4">
              <div className="text-center">
                <div className="text-xl font-bold text-[#27ae60]">{completedCount}</div>
                <div className="text-xs text-[var(--foreground)]/50">Lessons</div>
              </div>
              <div className="w-px h-7 bg-[var(--foreground)]/10" />
              <div className="text-center">
                <div className="text-xl font-bold text-[#d4a520]">{userProgress.learnedVocabulary.length}</div>
                <div className="text-xs text-[var(--foreground)]/50">Words</div>
              </div>
              <div className="w-px h-7 bg-[var(--foreground)]/10" />
              <div className="text-center">
                <div className="text-xl font-bold text-[#c0392b]">{userProgress.streak}</div>
                <div className="text-xs text-[var(--foreground)]/50">Day Streak</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Exam Readiness Bar */}
        {completedCount > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="w-full max-w-sm mb-4"
          >
            {(() => {
              const tl = ALL_MODULES.reduce((s, m) => s + m.lessons.length, 0);
              const tv = getAllVocabulary().length;
              const r = calculateExamReadiness({
                completedLessons: userProgress.completedLessons,
                totalLessons: tl,
                learnedVocabulary: userProgress.learnedVocabulary.length,
                totalVocabulary: tv,
                streak: userProgress.streak,
                gamesPlayed: userProgress.gamesPlayed,
                quizzesTaken: userProgress.quizzesTaken,
              });
              return (
                <div className="game-card p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4" style={{ color: r.color }} />
                      <span className="text-xs font-bold" style={{ color: r.color }}>
                        A1 Exam Readiness
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: r.color }}>
                      {r.score}%
                    </span>
                  </div>
                  {/* Stacked bar: course (solid) + supplementary (lighter) */}
                  <div className="h-2.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden flex">
                    <motion.div
                      className="h-full rounded-l-full"
                      style={{ backgroundColor: r.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${r.courseScore}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    {r.supplementaryScore > 0 && (
                      <motion.div
                        className="h-full"
                        style={{ backgroundColor: r.color, opacity: 0.4 }}
                        initial={{ width: 0 }}
                        animate={{ width: `${r.supplementaryScore}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] text-[var(--foreground)]/30">{r.label}</span>
                    <span className="text-[9px] text-[var(--foreground)]/30">
                      <span style={{ color: r.color }}>■</span> Course {r.courseScore}/80
                      {' · '}
                      <span style={{ color: r.color, opacity: 0.5 }}>■</span> Extras {r.supplementaryScore}/20
                    </span>
                  </div>
                  {/* Smart next action */}
                  <p className="text-[10px] text-[var(--foreground)]/40 mt-1.5 leading-tight">
                    💡 {r.nextAction}
                  </p>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* Next Lesson */}
        {nextLesson && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="game-card p-5 mb-6 w-full max-w-sm text-center"
          >
            <div className="text-3xl mb-2">{nextLesson.module.icon}</div>
            <p className="text-[var(--foreground)]/40 text-sm mb-1">
              {completedCount === 0 ? 'Your first lesson' : 'Up next'}
            </p>
            <h2 className="text-lg font-bold mb-1">
              {nextLesson.lesson.title}
            </h2>
            <p className="text-[var(--foreground)]/40 text-sm">
              {nextLesson.lesson.titleGerman}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="bg-[#27ae60]/15 text-[#27ae60] text-xs font-bold px-3 py-1 rounded-full border border-[#27ae60]/20">
                +{nextLesson.lesson.xpReward} XP
              </span>
              <span className="bg-[var(--card-bg)] text-[var(--foreground)]/60 text-xs px-3 py-1 rounded-full border border-[var(--card-border)]">
                {nextLesson.lesson.duration}
              </span>
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
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
              icon={<Zap className="w-5 h-5" />}
            >
              {completedCount === 0 ? "Let's Go" : 'Continue'}
            </GameButton>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold gradient-text mb-2">Course Complete!</h2>
              <p className="text-[var(--foreground)]/50">Adipoli! You've finished all lessons.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Journey Map */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <p className="text-[var(--foreground)]/40 text-sm text-center mb-4">Kerala → Germany</p>

        {/* Location nodes */}
        <div className="flex justify-between items-center px-1 mb-3 overflow-x-auto">
          {JOURNEY_LOCATIONS.map((loc, i) => {
            // Calculate completed modules count
            const completedModules = ALL_MODULES.filter(m =>
              m.lessons.every(l => userProgress.completedLessons.some(cl => cl.lessonId === l.id))
            ).length;
            const currentLoc = getCurrentLocation(completedModules);
            const currentLocIndex = JOURNEY_LOCATIONS.findIndex(l => l.id === currentLoc.id);
            const isReached = i <= currentLocIndex;
            const isCurrent = i === currentLocIndex;
            return (
              <div key={loc.id} className="flex flex-col items-center gap-1 flex-1 min-w-0">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0
                    ${isCurrent
                      ? 'bg-[#d4a520]/20 border-2 border-[#d4a520] shadow-md shadow-[#d4a520]/20'
                      : isReached
                      ? 'bg-[#27ae60]/20 border-2 border-[#27ae60]/50'
                      : 'bg-[var(--card-bg)] border border-[var(--card-border)]'
                    }`}
                >
                  {loc.icon}
                </motion.div>
                <span className={`text-[7px] text-center leading-tight truncate w-full
                  ${isCurrent ? 'text-[#d4a520] font-bold' : isReached ? 'text-[var(--foreground)]/50' : 'text-[var(--foreground)]/25'}`}
                >
                  {loc.name.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Module progress bar (replaces individual lesson dots for better scaling) */}
        <div className="flex justify-center items-center gap-0.5 pb-2 flex-wrap max-w-sm mx-auto">
          {ALL_MODULES.map(module => {
            const moduleLessons = module.lessons.length;
            const completedInModule = module.lessons.filter(
              l => userProgress.completedLessons.some(cl => cl.lessonId === l.id)
            ).length;
            const isModuleComplete = completedInModule === moduleLessons;
            const isModuleActive = completedInModule > 0 && !isModuleComplete;
            const hasNext = module.lessons.some(l => l.id === nextLesson?.lesson.id);
            return (
              <motion.div
                key={module.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (isModuleComplete || isModuleActive || hasNext)
                    router.push(`/learn/${module.id}`);
                }}
                className={`h-2 rounded-full cursor-pointer transition-all
                  ${isModuleComplete
                    ? 'bg-[#27ae60] w-4'
                    : hasNext
                    ? 'bg-[#d4a520] animate-pulse-glow w-5'
                    : isModuleActive
                    ? 'bg-[#d4a520]/60 w-3'
                    : 'bg-[var(--foreground)]/10 w-2'
                  }`}
                title={`Module ${module.id}: ${module.title}`}
              />
            );
          })}
        </div>

        <p className="text-center text-[var(--foreground)]/30 text-xs mt-1">
          {completedCount} of {totalLessons} lessons
        </p>
      </motion.div>
    </div>
  );
}
