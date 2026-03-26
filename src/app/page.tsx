'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Circle, ArrowRight, Trophy, CalendarDays, Lightbulb, Zap } from 'lucide-react';
import { GameButton } from '@/components/game';
import { Kuttan } from '@/components/character/Kuttan';
import { getRandomMessage } from '@/lib/content/dialogue';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';
import { getNextCoreLesson } from '@/lib/curriculum';
import { getDailySchedule, type DailySchedule, type DailyTask } from '@/lib/study-plan';
import { calculateExamReadiness } from '@/lib/exam-readiness';

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
  const coursePercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

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
      {/* ── Progress Header ── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-2"
      >
        <div className="game-card p-3">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="text-sm font-black text-[var(--foreground)]">
              {schedule && studyPlan ? (
                <>
                  Day {schedule.dayNumber}
                  <span className="text-[var(--foreground)]/40 font-normal text-xs ml-1">
                    of {schedule.totalDays}
                  </span>
                </>
              ) : (
                <>
                  {completedCount === 0 ? 'Welcome' : `${completedCount} lessons done`}
                </>
              )}
            </h2>
            <span className="text-sm font-bold text-[#e94560]">
              {schedule ? schedule.percentComplete : coursePercent}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#e94560] to-[#e94560]/60"
              initial={{ width: 0 }}
              animate={{ width: `${schedule ? schedule.percentComplete : coursePercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>

          {/* Compact stats row */}
          <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--foreground)]/40">
            <span>{completedCount}/{totalLessons} lessons</span>
            <span>{userProgress.learnedVocabulary.length} words</span>
            {userProgress.streak > 0 && (
              <span>{userProgress.streak} day streak</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Kuttan — centered, clear, friendly */}
      {kuttanMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring' }}
          className="flex justify-center mb-2"
        >
          <div className="flex items-center gap-3 game-card px-4 py-2.5 max-w-sm w-full">
            <div className="flex-shrink-0">
              <Kuttan mood={completedCount === 0 ? 'waving' : 'happy'} size="sm" />
            </div>
            <p className="text-sm text-[var(--foreground)]/80 leading-snug flex-1">{kuttanMessage}</p>
          </div>
        </motion.div>
      )}

      {/* ── Daily Schedule Section ── */}
      {schedule && studyPlan ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-sm mx-auto"
        >
          {schedule.isCheckpoint && (
            <div className="flex items-center gap-2 bg-[#ffd93d]/10 border border-[#ffd93d]/20 rounded-lg px-2 py-1.5 mb-2">
              <Trophy className="w-3.5 h-3.5 text-[#ffd93d]" />
              <span className="text-xs font-semibold text-[#ffd93d]">Checkpoint Day — pass to continue!</span>
            </div>
          )}

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
                    <span className="text-xs text-[var(--foreground)]/40 flex-shrink-0">{task.estimatedMinutes}m</span>
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
            className="w-full game-card p-3 text-center hover:border-[#e94560]/30 transition-colors group mb-2"
          >
            <CalendarDays className="w-6 h-6 text-[#e94560] mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-sm mb-0.5">Set Your Study Pace</h3>
            <p className="text-xs text-[var(--foreground)]/40">
              Choose your daily hours and get a personalized schedule
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

      {/* Exam Readiness — shown when user has progress */}
      {completedCount > 3 && (() => {
        const r = calculateExamReadiness({
          completedLessons: userProgress.completedLessons,
          totalLessons: totalLessons,
          learnedVocabulary: userProgress.learnedVocabulary.length,
          totalVocabulary: getAllVocabulary().length,
          streak: userProgress.streak,
          gamesPlayed: userProgress.gamesPlayed,
          quizzesTaken: userProgress.quizzesTaken,
        });
        return (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-sm mx-auto mt-2"
          >
            <div className="game-card p-2.5">
              <div className="flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 flex-shrink-0" style={{ color: r.color }} />
                <span className="text-xs font-bold" style={{ color: r.color }}>A1 Ready: {r.score}%</span>
                <div className="flex-1 h-1.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: r.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${r.score}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })()}

      {/* Tip of the Day */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
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
    </div>
  );
}
