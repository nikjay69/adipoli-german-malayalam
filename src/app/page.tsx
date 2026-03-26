'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Flame, Star, Zap, Award, Clock, CheckCircle2, Circle, ArrowRight, Trophy, CalendarDays, Lightbulb } from 'lucide-react';
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
          <span className={`font-bold text-[#d4a520]${userProgress.xp > 0 ? ' animate-shimmer' : ''}`}>{userProgress.xp}</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center">
        {/* Kuttan */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mb-4"
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
          className="text-center mb-4"
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
            <div className="flex items-center justify-center gap-5 mt-3">
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

        {/* ── Daily Schedule Section ── */}
        {schedule && studyPlan ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="w-full max-w-sm mb-5"
          >
            {/* Day header */}
            <div className="game-card p-4 mb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-[#ff6b9d]" />
                  <h2 className="text-lg font-black text-[var(--foreground)]">
                    Day {schedule.dayNumber}{' '}
                    <span className="text-[var(--foreground)]/40 font-normal text-sm">
                      of {schedule.totalDays}
                    </span>
                  </h2>
                </div>
                <span className="text-sm font-bold text-[#ff6b9d]">
                  {schedule.percentComplete}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#ff6b9d] to-[#ff6b9d]/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${schedule.percentComplete}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>

              {schedule.isCheckpoint && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-3 flex items-center gap-2 bg-[#ffd93d]/10 border border-[#ffd93d]/20 rounded-xl px-3 py-2"
                >
                  <Trophy className="w-4 h-4 text-[#ffd93d]" />
                  <span className="text-xs font-semibold text-[#ffd93d]">Checkpoint Day — pass to continue!</span>
                </motion.div>
              )}
            </div>

            {/* Today's tasks */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1 mb-1">
                <h3 className="text-xs font-semibold text-[var(--foreground)]/50 uppercase tracking-wider">
                  Today&apos;s Tasks
                </h3>
                <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/40">
                  <Clock className="w-3 h-3" />
                  <span>~{schedule.estimatedMinutes} min</span>
                </div>
              </div>

              {schedule.tasks.map((task, i) => (
                <motion.button
                  key={task.id}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTaskClick(task)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 ${
                    task.completed
                      ? 'bg-[#27ae60]/10 border-[#27ae60]/20'
                      : task.type === 'checkpoint'
                      ? 'bg-[#ffd93d]/5 border-[#ffd93d]/20 hover:border-[#ffd93d]/40'
                      : 'bg-[var(--card-bg)] border-[var(--card-border)] hover:border-[var(--foreground)]/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Status icon */}
                    <div className="flex-shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#27ae60]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[var(--foreground)]/25" />
                      )}
                    </div>

                    {/* Task info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{taskTypeIcon(task.type)}</span>
                        <span className={`text-sm font-semibold truncate ${
                          task.completed ? 'text-[var(--foreground)]/40 line-through' : 'text-[var(--foreground)]'
                        }`}>
                          {task.title}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 truncate ${
                        task.completed ? 'text-[var(--foreground)]/25' : 'text-[var(--foreground)]/45'
                      }`}>
                        {task.description}
                      </p>
                    </div>

                    {/* Right side: time + XP */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-xs text-[var(--foreground)]/40">{task.estimatedMinutes}m</div>
                      <div className="text-xs font-semibold text-[#27ae60]/70">+{task.xpReward}</div>
                    </div>

                    {/* Arrow */}
                    {!task.completed && (
                      <ArrowRight className="w-4 h-4 text-[var(--foreground)]/20 flex-shrink-0" />
                    )}
                  </div>
                </motion.button>
              ))}

              {/* Completed count */}
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
          /* No study plan — show CTA */
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="w-full max-w-sm mb-5"
          >
            <button
              onClick={() => router.push('/onboarding')}
              className="w-full game-card p-5 text-center hover:border-[#ff6b9d]/30 transition-colors group"
            >
              <CalendarDays className="w-8 h-8 text-[#ff6b9d] mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-sm mb-1">Set Up Your Study Plan</h3>
              <p className="text-xs text-[var(--foreground)]/40">
                Get a daily schedule tailored to your pace
              </p>
            </button>
          </motion.div>
        ) : null}

        {/* Next Lesson (compact when schedule exists) */}
        {nextLesson && !schedule && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="game-card p-5 mb-5 w-full max-w-sm text-center"
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

        {/* CTA Button (only without schedule) */}
        {!schedule && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
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
                <p className="text-[var(--foreground)]/50">Adipoli! You&apos;ve finished all lessons.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Exam Readiness Bar (compact) */}
        {completedCount > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-sm mt-4"
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
                  {/* Line 1: Label + score + bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Award className="w-4 h-4" style={{ color: r.color }} />
                      <span className="text-xs font-bold" style={{ color: r.color }}>
                        A1 Readiness
                      </span>
                      <span className={`text-sm font-bold${r.score >= 60 ? ' animate-shimmer' : ''}`} style={{ color: r.color }}>
                        {r.score}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden flex flex-1">
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
                  {/* Line 2: Breakdown */}
                  <p className="text-xs text-[var(--foreground)]/40 mt-1.5 text-center">
                    <span style={{ color: r.color }}>■</span> Course {r.courseScore}/80
                    {' · '}
                    <span style={{ color: r.color, opacity: 0.5 }}>■</span> Extras {r.supplementaryScore}/20
                  </p>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>

      {/* Tip of the Day */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="w-full max-w-sm mx-auto mt-4"
      >
        <div className="game-card p-3">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-[#ffd93d] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[var(--foreground)]/50 mb-1">Tip of the Day</p>
              <p className="text-xs text-[var(--foreground)]/70 italic leading-relaxed">
                &ldquo;{DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length]}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Journey Map */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <p className="text-[var(--foreground)]/40 text-sm text-center mb-4">
          <span className="text-[#27ae60]">Home 🏠</span>
          <span className="mx-1.5 text-[var(--foreground)]/35">···</span>
          <span className="text-[#d4a520]">Gate ✈️</span>
          <span className="mx-1.5 text-[var(--foreground)]/35">···</span>
          <span className="text-[var(--foreground)]/40">Germany 🇩🇪</span>
        </p>

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
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs flex-shrink-0
                    ${isCurrent
                      ? 'bg-[#d4a520]/20 border-2 border-[#d4a520] shadow-md shadow-[#d4a520]/20 animate-marker'
                      : isReached
                      ? 'bg-[#27ae60]/20 border-2 border-[#27ae60]/50'
                      : 'bg-[var(--card-bg)] border border-[var(--card-border)]'
                    }`}
                >
                  {loc.icon}
                </motion.div>
                <span className={`text-[11px] text-center leading-normal truncate w-full
                  ${isCurrent ? 'text-[#d4a520] font-bold' : isReached ? 'text-[var(--foreground)]/50' : 'text-[var(--foreground)]/40'}`}
                >
                  {loc.shortName}
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

        <p className="text-center text-[var(--foreground)]/45 text-xs mt-1">
          {completedCount} of {totalLessons} lessons
        </p>
      </motion.div>
    </div>
  );
}
