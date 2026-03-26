'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Flame, Star, Zap, Award, Clock, CheckCircle2, Circle, ArrowRight, Trophy, CalendarDays, Lightbulb, BookOpen, BookOpenText } from 'lucide-react';
import { GameButton } from '@/components/game';
import { CharacterGuide } from '@/components/character';
import { getRandomMessage } from '@/lib/content/dialogue';
import { useGameStore, LEVEL_NAMES, LEVEL_THRESHOLDS } from '@/lib/store';
import { ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';
import { getNextCoreLesson } from '@/lib/curriculum';
import { JOURNEY_LOCATIONS, getCurrentLocation } from '@/lib/journey';
import { calculateExamReadiness } from '@/lib/exam-readiness';
import { getDailySchedule, type DailySchedule, type DailyTask } from '@/lib/study-plan';

const DAILY_TIPS = [
  "Speak German for 5 minutes every morning. Your brain is freshest then.",
  "When you see a sign, try to read it in German first.",
  "Label 10 objects in your room with sticky notes in German.",
  "Listen to German radio for 10 min before bed. Your brain processes it while sleeping.",
  "Don't translate in your head. Think directly in German — even if it's just 'Hallo!'",
  "Write 3 German sentences in a notebook before bed. Hand-writing improves memory 30%.",
  "Watch a German YouTube video with subtitles. Pause and repeat sentences.",
  "Change your phone language to German for one hour. You'll learn UI words fast!",
  "Teach someone ONE German word today. Teaching is the best way to learn.",
  "Mistakes are proof you're trying. A German speaker will always appreciate your effort.",
  "The Goethe A1 exam tests COMMUNICATION, not perfection. Imperfect German > silent German.",
  "Review vocabulary before sleep — studies show sleep consolidates language memory.",
  "Don't study for 3 hours once. Study 30 minutes, 6 times. Spaced repetition wins.",
  "Record yourself speaking German. Listen next week — you'll be amazed at your progress.",
];

export default function Home() {
  const router = useRouter();
  const { userProgress, updateStreak, completeTask } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [kuttanMessage, setKuttanMessage] = useState('');

  useEffect(() => {
    setMounted(true);
    updateStreak();
  }, [updateStreak]);

  useEffect(() => {
    if (mounted) {
      const isNewUser = userProgress.completedLessons.length === 0;
      setKuttanMessage(getRandomMessage(isNewUser ? 'welcome' : 'comeback'));
    }
  }, [mounted, userProgress.completedLessons.length]);

  // Redirect to intro if first visit
  useEffect(() => {
    if (mounted && !userProgress.hasSeenIntro) {
      router.replace('/intro');
    }
  }, [mounted, userProgress.hasSeenIntro, router]);

  // All hooks MUST be above any early return to avoid React error #310
  const nextLesson = useMemo(() => mounted ? getNextCoreLesson(userProgress.completedLessons) : null, [mounted, userProgress.completedLessons]);
  const completedCount = userProgress.completedLessons?.length || 0;
  const totalLessons = useMemo(() => ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0), []);
  const currentLevelXP = LEVEL_THRESHOLDS[userProgress.level - 1] || 0;
  const nextLevelXP = LEVEL_THRESHOLDS[userProgress.level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const xpProgress = nextLevelXP > currentLevelXP ? ((userProgress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100;

  const studyPlan = userProgress.studyPlan;
  const schedule: DailySchedule | null = useMemo(() => {
    if (!mounted || !studyPlan) return null;
    return getDailySchedule(studyPlan, ALL_MODULES, {
      completedLessons: userProgress.completedLessons || [],
      srsCards: userProgress.srsCards || {},
      completedTaskIds: userProgress.completedTaskIds || [],
    });
  }, [mounted, studyPlan, userProgress.completedLessons, userProgress.srsCards, userProgress.completedTaskIds]);

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

  const handleContinue = () => {
    if (nextLesson) {
      router.push(`/play/${nextLesson.module.id}/${nextLesson.lesson.id}`);
    }
  };

  const handleTaskClick = (task: DailyTask) => {
    if (!task.completed) {
      completeTask(task.id);
    }
    router.push(task.route);
  };

  const taskTypeIcon = (type: DailyTask['type']) => {
    switch (type) {
      case 'lesson': return '📖';
      case 'review': return '🔄';
      case 'practice': return '🎙️';
      case 'game': return '🎮';
      case 'checkpoint': return '🏁';
    }
  };

  return (
    <div className="min-h-screen px-4 py-3 safe-top safe-bottom">
      {/* Compact Stats Bar — all stats in one row */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between gap-1 mb-2"
      >
        {/* Streak */}
        <div className="flex items-center gap-1 bg-[var(--card-bg)] rounded-full px-2 py-1 border border-[var(--card-border)]">
          <Flame className={`w-3.5 h-3.5 ${userProgress.streak > 0 ? 'text-[#c0392b] streak-fire' : 'text-[var(--foreground)]/40'}`} />
          <span className="font-bold text-xs">{userProgress.streak}</span>
        </div>

        {/* Level ring */}
        <div className="relative">
          <svg className="w-9 h-9 progress-ring" viewBox="0 0 36 36">
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
          <span className="absolute inset-0 flex items-center justify-center font-bold text-xs">
            {userProgress.level}
          </span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1 bg-[#d4a520]/15 border border-[#d4a520]/30 rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-[#d4a520] fill-[#d4a520]" />
          <span className={`font-bold text-xs text-[#d4a520]${userProgress.xp > 0 ? ' animate-shimmer' : ''}`}>{userProgress.xp}</span>
        </div>

        {/* Lessons completed */}
        <div className="flex items-center gap-1 bg-[var(--card-bg)] rounded-full px-2 py-1 border border-[var(--card-border)]">
          <BookOpen className="w-3 h-3 text-[#27ae60]" />
          <span className="font-bold text-xs text-[#27ae60]">{completedCount}</span>
        </div>

        {/* Words learned */}
        <div className="flex items-center gap-1 bg-[var(--card-bg)] rounded-full px-2 py-1 border border-[var(--card-border)]">
          <BookOpenText className="w-3 h-3 text-[#8b5cf6]" />
          <span className="font-bold text-xs text-[#8b5cf6]">{userProgress.learnedVocabulary.length}</span>
        </div>
      </motion.div>

      {/* Kuttan — small, inline, not blocking content */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-2 px-1"
        >
          <CharacterGuide
            messages={kuttanMessage}
            mood={completedCount === 0 ? 'waving' : 'happy'}
            size="sm"
          />
        </motion.div>
      )}

      {/* ── Daily Schedule Section — PRIMARY ACTION ── */}
      {schedule && studyPlan ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-sm mx-auto"
        >
          {/* Day header */}
          <div className="game-card p-3 mb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#ff6b9d]" />
                <h2 className="text-sm font-black text-[var(--foreground)]">
                  Day {schedule.dayNumber}{' '}
                  <span className="text-[var(--foreground)]/40 font-normal text-xs">
                    of {schedule.totalDays}
                  </span>
                </h2>
              </div>
              <span className="text-xs font-bold text-[#ff6b9d]">
                {schedule.percentComplete}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#ff6b9d] to-[#ff6b9d]/60"
                initial={{ width: 0 }}
                animate={{ width: `${schedule.percentComplete}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>

            {schedule.isCheckpoint && (
              <div className="mt-2 flex items-center gap-2 bg-[#ffd93d]/10 border border-[#ffd93d]/20 rounded-lg px-2 py-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#ffd93d]" />
                <span className="text-xs font-semibold text-[#ffd93d]">Checkpoint Day — pass to continue!</span>
              </div>
            )}
          </div>

          {/* Today's tasks */}
          <div>
            <div className="flex items-center justify-between px-1 mb-1">
              <h3 className="text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                Today&apos;s Tasks
              </h3>
              <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/40">
                <Clock className="w-3 h-3" />
                <span>~{schedule.estimatedMinutes} min</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {schedule.tasks.map((task, i) => (
                <motion.button
                  key={task.id}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTaskClick(task)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all duration-200 ${
                    task.completed
                      ? 'bg-[#27ae60]/10 border-[#27ae60]/20'
                      : task.type === 'checkpoint'
                      ? 'bg-[#ffd93d]/5 border-[#ffd93d]/20'
                      : 'bg-[var(--card-bg)] border-[var(--card-border)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex-shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#27ae60]" />
                      ) : (
                        <Circle className="w-4 h-4 text-[var(--foreground)]/25" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs">{taskTypeIcon(task.type)}</span>
                        <span className={`text-sm font-semibold truncate ${
                          task.completed ? 'text-[var(--foreground)]/40 line-through' : 'text-[var(--foreground)]'
                        }`}>
                          {task.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <span className="text-xs text-[var(--foreground)]/40">{task.estimatedMinutes}m</span>
                      <span className="text-xs font-semibold text-[#27ae60]/70">+{task.xpReward}</span>
                    </div>
                    {!task.completed && (
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--foreground)]/20 flex-shrink-0" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {schedule.tasks.length > 0 && (
              <div className="text-center pt-1">
                <span className="text-xs text-[var(--foreground)]/35">
                  {schedule.tasks.filter(t => t.completed).length}/{schedule.tasks.length} tasks done
                </span>
              </div>
            )}
          </div>
        </motion.div>
      ) : !studyPlan ? (
        /* No study plan — show CTA + Next Lesson */
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-sm mx-auto"
        >
          <button
            onClick={() => router.push('/onboarding')}
            className="w-full game-card p-3 text-center hover:border-[#ff6b9d]/30 transition-colors group mb-2"
          >
            <CalendarDays className="w-6 h-6 text-[#ff6b9d] mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-sm mb-0.5">Set Up Your Study Plan</h3>
            <p className="text-xs text-[var(--foreground)]/40">
              Get a daily schedule tailored to your pace
            </p>
          </button>
        </motion.div>
      ) : null}

      {/* Next Lesson (only without schedule) */}
      {nextLesson && !schedule && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="game-card p-3 mb-2 text-center">
            <div className="text-2xl mb-1">{nextLesson.module.icon}</div>
            <p className="text-[var(--foreground)]/40 text-xs">
              {completedCount === 0 ? 'Your first lesson' : 'Up next'}
            </p>
            <h2 className="text-sm font-bold">
              {nextLesson.lesson.title}
            </h2>
            <p className="text-[var(--foreground)]/40 text-xs">
              {nextLesson.lesson.titleGerman}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="bg-[#27ae60]/15 text-[#27ae60] text-xs font-bold px-2 py-0.5 rounded-full border border-[#27ae60]/20">
                +{nextLesson.lesson.xpReward} XP
              </span>
              <span className="bg-[var(--card-bg)] text-[var(--foreground)]/60 text-xs px-2 py-0.5 rounded-full border border-[var(--card-border)]">
                {nextLesson.lesson.duration}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <GameButton
            onClick={handleContinue}
            size="xl"
            fullWidth
            pulse
            icon={<Zap className="w-5 h-5" />}
          >
            {completedCount === 0 ? "Let's Go" : 'Continue'}
          </GameButton>
        </motion.div>
      )}

      {/* Course complete state */}
      {!nextLesson && !schedule && (
        <div className="text-center w-full max-w-sm mx-auto mt-4">
          <h2 className="text-xl font-bold gradient-text mb-1">Course Complete!</h2>
          <p className="text-[var(--foreground)]/50 text-sm">Adipoli! You&apos;ve finished all lessons.</p>
        </div>
      )}

      {/* ── Below fold: Exam Readiness + Tip ── */}
      {completedCount > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-sm mx-auto mt-2"
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
              <div className="game-card p-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 shrink-0">
                    <Award className="w-3.5 h-3.5" style={{ color: r.color }} />
                    <span className="text-xs font-bold" style={{ color: r.color }}>A1</span>
                    <span className={`text-xs font-bold${r.score >= 60 ? ' animate-shimmer' : ''}`} style={{ color: r.color }}>
                      {r.score}%
                    </span>
                  </div>
                  <div className="h-2 bg-[var(--foreground)]/8 rounded-full overflow-hidden flex flex-1">
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
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Tip of the Day */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm mx-auto mt-2"
      >
        <div className="game-card p-2.5">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-[#ffd93d] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--foreground)]/60 italic leading-snug">
              &ldquo;{DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length]}&rdquo;
            </p>
          </div>
        </div>
      </motion.div>

      {/* Journey Map (collapsible) */}
      <div className="mt-2">
        <button onClick={() => setShowJourney(!showJourney)} className="text-xs text-[var(--foreground)]/40 text-center w-full py-1">
          {showJourney ? 'Hide journey ▲' : 'Show journey ▼'}
        </button>
        {showJourney && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-[var(--foreground)]/40 text-sm text-center mb-2">
              <span className="text-[#27ae60]">Home</span>
              <span className="mx-1 text-[var(--foreground)]/35">···</span>
              <span className="text-[#d4a520]">Gate</span>
              <span className="mx-1 text-[var(--foreground)]/35">···</span>
              <span className="text-[var(--foreground)]/40">Germany</span>
            </p>

            <div className="flex justify-between items-center px-1 mb-2 overflow-x-auto">
              {JOURNEY_LOCATIONS.map((loc, i) => {
                const completedModules = ALL_MODULES.filter(m =>
                  m.lessons.every(l => userProgress.completedLessons.some(cl => cl.lessonId === l.id))
                ).length;
                const currentLoc = getCurrentLocation(completedModules);
                const currentLocIndex = JOURNEY_LOCATIONS.findIndex(l => l.id === currentLoc.id);
                const isReached = i <= currentLocIndex;
                const isCurrent = i === currentLocIndex;
                return (
                  <div key={loc.id} className="flex flex-col items-center gap-0.5 flex-1 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0
                        ${isCurrent
                          ? 'bg-[#d4a520]/20 border-2 border-[#d4a520] shadow-md shadow-[#d4a520]/20 animate-marker'
                          : isReached
                          ? 'bg-[#27ae60]/20 border-2 border-[#27ae60]/50'
                          : 'bg-[var(--card-bg)] border border-[var(--card-border)]'
                        }`}
                    >
                      {loc.icon}
                    </div>
                    <span className={`text-[10px] text-center leading-tight truncate w-full
                      ${isCurrent ? 'text-[#d4a520] font-bold' : isReached ? 'text-[var(--foreground)]/50' : 'text-[var(--foreground)]/40'}`}
                    >
                      {loc.shortName}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center items-center gap-0.5 pb-1 flex-wrap max-w-sm mx-auto">
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

            <p className="text-center text-[var(--foreground)]/45 text-xs mt-1">
              {completedCount} of {totalLessons} lessons
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
