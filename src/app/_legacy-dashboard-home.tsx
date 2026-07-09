'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Circle, ArrowRight, Trophy, CalendarDays, Lightbulb } from 'lucide-react';
import { GameButton } from '@/components/game';
import { Kuttan } from '@/components/character/Kuttan';
import { KeralaClassroomScene } from '@/components/course/KeralaClassroomScene';
import { DailyChallenge, AchievementPopup } from '@/components/engagement';
import { getRandomMessage } from '@/lib/content/dialogue';
import { useGameStore } from '@/lib/store';
import { checkNewAchievements, type AchievementDef } from '@/lib/engagement/achievements-v2';
import { ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';
import { getNextCoreLesson } from '@/lib/curriculum';
import { getDailySchedule, type DailySchedule, type DailyTask } from '@/lib/study-plan';
import { calculateExamReadiness } from '@/lib/exam-readiness';
import { module1MissionCards, readCompletedModule1Missions, type Module1MissionId } from '@/lib/missions/module1';
import { module2MissionCards, type Module2MissionId } from '@/lib/missions/module2';
import { readCompletedModule2Missions } from '@/app/missions/module-2/_components/MissionUI';

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
  const { userProgress, updateStreak, completeTask, unlockAchievement, addXP } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [kuttanMessage, setKuttanMessage] = useState('');
  const [newAchievement, setNewAchievement] = useState<AchievementDef | null>(null);
  const [completedModule1MissionIds, setCompletedModule1MissionIds] = useState<Module1MissionId[]>([]);
  const [completedModule2MissionIds, setCompletedModule2MissionIds] = useState<Module2MissionId[]>([]);
  const [showOldLessonQueue, setShowOldLessonQueue] = useState(false);

  useEffect(() => {
    setMounted(true);
    updateStreak();
    setCompletedModule1MissionIds(readCompletedModule1Missions());
    setCompletedModule2MissionIds(readCompletedModule2Missions());
  }, [updateStreak]);

  useEffect(() => {
    if (!mounted) return;
    const refreshModule1Missions = () => setCompletedModule1MissionIds(readCompletedModule1Missions());
    const refreshModule2Missions = () => setCompletedModule2MissionIds(readCompletedModule2Missions());
    refreshModule1Missions();
    refreshModule2Missions();
    window.addEventListener('module1-mission-completed', refreshModule1Missions);
    window.addEventListener('module2-mission-completed', refreshModule2Missions);
    window.addEventListener('storage', refreshModule1Missions);
    window.addEventListener('storage', refreshModule2Missions);
    return () => {
      window.removeEventListener('module1-mission-completed', refreshModule1Missions);
      window.removeEventListener('module2-mission-completed', refreshModule2Missions);
      window.removeEventListener('storage', refreshModule1Missions);
      window.removeEventListener('storage', refreshModule2Missions);
    };
  }, [mounted]);

  // Check for new achievements on load
  useEffect(() => {
    if (!mounted) return;
    const earned = checkNewAchievements({
      xp: userProgress.xp,
      level: userProgress.level,
      streak: userProgress.streak,
      completedLessons: userProgress.completedLessons,
      learnedVocabulary: userProgress.learnedVocabulary,
      gamesPlayed: userProgress.gamesPlayed,
      bossesDefeated: userProgress.bossesDefeated || [],
      achievements: userProgress.achievements,
    });
    if (earned.length > 0) {
      // Mark ALL earned achievements as unlocked so they don't repeat
      earned.forEach(a => {
        unlockAchievement(a.id);
        addXP(a.xpReward);
      });
      // Show only the first one as popup
      setNewAchievement(earned[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

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
  const coursePercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const completedModule1MissionSet = new Set(completedModule1MissionIds);
  const firstModule1Mission = module1MissionCards[0];
  const nextModule1Mission = module1MissionCards.find((mission) => mission.active && !completedModule1MissionSet.has(mission.id)) ?? firstModule1Mission;
  const completedModule1MissionCount = module1MissionCards.filter((mission) => completedModule1MissionSet.has(mission.id)).length;
  const module1Complete = module1MissionCards.every((mission) => completedModule1MissionSet.has(mission.id));
  const completedModule2MissionSet = new Set(completedModule2MissionIds);
  const completedModule2MissionCount = module2MissionCards.filter((mission) => completedModule2MissionSet.has(mission.id)).length;
  const nextModule2Mission = module2MissionCards.find((mission) => mission.active && !completedModule2MissionSet.has(mission.id)) ?? module2MissionCards[module2MissionCards.length - 1];
  const module2SequenceComplete = completedModule2MissionCount === module2MissionCards.length;
  const module2CompleteHomeTitle = 'You can introduce yourself.';
  const module2CompleteHomeProof = 'Ich heiße ... Ich komme aus Kerala.';
  const module2CompleteHomeHref = '/learn/3';
  const module2CompleteHomeCta = 'Start Module 3';
  const nextModule2MissionHref = `${nextModule2Mission.href}?start=listen`;
  const module2HomeHref = !module1Complete
    ? `${nextModule1Mission.href}?start=listen`
    : module2SequenceComplete
      ? module2CompleteHomeHref
      : nextModule2MissionHref;
  const module2HomeCta = !module1Complete
    ? 'Start listening'
    : module2SequenceComplete
      ? module2CompleteHomeCta
      : 'Start listening';
  const shouldShowModule2ResumeStrip = completedCount > 0 || completedModule1MissionCount > 0 || completedModule2MissionCount > 0;
  const shouldSuppressHomeExtras = shouldShowModule2ResumeStrip;
  const module2ResumeEyebrow = !module1Complete
    ? 'Module 1'
    : module2SequenceComplete
      ? 'Ability unlocked'
      : 'Module 2';
  const module2ResumeTitle = !module1Complete
    ? nextModule1Mission.title
    : module2SequenceComplete
      ? module2CompleteHomeTitle
      : nextModule2Mission.title;
  const module2ResumeDescription = !module1Complete
    ? nextModule1Mission.output
    : module2SequenceComplete
      ? module2CompleteHomeProof
      : nextModule2Mission.output;
  const module2ResumeCta = !module1Complete
    ? 'Start listening'
    : module2SequenceComplete
      ? module2CompleteHomeCta
      : 'Start listening';
  const module2ResumeProgressLabel = !module1Complete
    ? `${completedModule1MissionCount}/${module1MissionCards.length}`
    : `${completedModule2MissionCount}/5`;

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
    if (completedCount === 0) {
      router.push('/learn');
      return;
    }
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

  if (completedCount === 0 && !schedule && !shouldShowModule2ResumeStrip) {
    return (
      <div className="min-h-screen px-4 py-5 pb-16 safe-top safe-bottom">
        <motion.section
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-center"
        >
          <div className="rounded-[2rem] border border-[#d4a520]/25 bg-gradient-to-br from-[#111f11] via-[#152815] to-[#0d160d] p-5 text-white shadow-2xl shadow-black/30 sm:p-6">
            <div className="mb-4">
              <KeralaClassroomScene variant="ai-study" className="h-44 border-white/10" />
            </div>
            <div className="mb-5 space-y-3">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f0c84d]">Adipoli German · A1</p>
              <h1 className="text-3xl font-black leading-none tracking-tight">German for Malayalis.</h1>
              <p className="text-base font-semibold leading-snug text-white/82">
                Goethe A1 with Kerala context and real German audio.
              </p>
            </div>

            <div className="mb-5 rounded-[1.4rem] border border-white/10 bg-white/8 p-4 text-sm font-bold text-white/88">
              <p className="text-white/60">Frau Weber</p>
              <p className="mt-1 text-xl font-black text-white">Guten Morgen.</p>
              <p className="mt-4 text-white/60">You</p>
              <p className="mt-1 text-lg font-black text-[#f0c84d]">Guten Morgen, Frau Weber.</p>
            </div>

            <Link
              href={module2HomeHref}
              className="mt-5 flex w-full select-none items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-[#d4a520] to-[#b8891a] px-8 py-5 text-center text-lg font-black tracking-wide text-[#1b2d1b] shadow-[0_5px_0_#8a6412,0_7px_16px_rgba(0,0,0,0.3)] transition-all duration-100 hover:from-[#f0c84d] hover:to-[#d4a520] active:translate-y-[3px] active:shadow-[0_2px_0_#8a6412,0_3px_8px_rgba(0,0,0,0.3)]"
            >
              {module2HomeCta}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.section>
      </div>
    );
  }

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
    <div className="min-h-screen px-4 py-3 pb-32 safe-top safe-bottom">
      {/* Progress header stays hidden while the focused M1/M2 mission path is active. */}
      {!shouldSuppressHomeExtras && (
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
              <span className="text-sm font-bold text-[#d4a520]">
                {schedule ? schedule.percentComplete : coursePercent}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#d4a520] to-[#27ae60]"
                initial={{ width: 0 }}
                animate={{ width: `${schedule ? schedule.percentComplete : coursePercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>

            {/* Compact stats row */}
            <div className="flex items-center gap-3 mt-1.5 text-xs font-semibold text-[#d4a520]">
              <span>{completedCount}/{totalLessons} lessons</span>
              <span>{userProgress.learnedVocabulary.length} words</span>
              {userProgress.streak > 0 && (
                <span className={`text-[#e8a817] ${userProgress.streak >= 3 ? 'animate-pulse' : ''}`}>
                  🔥 {userProgress.streak} day streak
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Kuttan — centered, clear, friendly; hidden during M1/M2 focus to keep the home path lean */}
      {kuttanMessage && !shouldSuppressHomeExtras && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring' }}
          className="flex justify-center mb-2"
        >
          <div className="flex items-center justify-center gap-3 game-card px-4 py-2.5 max-w-sm w-full mx-auto">
            <div className="flex-shrink-0">
              <Kuttan mood={completedCount === 0 ? 'waving' : 'happy'} size="sm" />
            </div>
            <p className="text-sm text-[var(--foreground)]/80 leading-snug flex-1 line-clamp-2">{kuttanMessage}</p>
          </div>
        </motion.div>
      )}

      {/* Mission resume — keeps the start page mission-led even after legacy lesson progress exists */}
      {shouldShowModule2ResumeStrip && (
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mx-auto mb-3 w-full max-w-sm"
        >
          <Link
            href={module2HomeHref}
            className="block rounded-[1.6rem] border border-[#d4a520]/25 bg-gradient-to-br from-[#111f11] via-[#152815] to-[#0d160d] p-4 text-white shadow-xl shadow-black/20 transition hover:border-[#d4a520]/45"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4a520]">{module2ResumeEyebrow}</p>
                <h2 className="mt-1 text-lg font-black leading-tight">{module2ResumeTitle}</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-black text-[#9ce8b6]">
                {module2ResumeProgressLabel}
              </span>
            </div>
            <p className="mt-3 inline-flex rounded-2xl border border-[#d4a520]/25 bg-[#d4a520]/10 px-3 py-2 text-sm font-black leading-snug text-[#f1d27a]">
              {module2ResumeDescription}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-[#d4a520] px-4 py-2 text-sm font-black text-[#111f11]">
              {module2ResumeCta} <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </motion.div>
      )}

      {/* ── Daily Schedule Section ── */}
      {!shouldSuppressHomeExtras && schedule && studyPlan ? (
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
          <div className="bg-[var(--card-bg)]/50 rounded-2xl p-3 border border-[var(--card-border)]/50">
            {(() => {
              const doneCount = schedule.tasks.filter(t => t.completed).length;
              const allDone = schedule.tasks.length > 0 && doneCount === schedule.tasks.length;
              return allDone ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-2 text-center bg-gradient-to-r from-[#27ae60]/20 via-[#ffd93d]/20 to-[#27ae60]/20 border border-[#27ae60]/30 rounded-lg py-1.5 px-2"
                >
                  <span className="text-xs font-bold text-[#27ae60]">🎉 Day complete! Adipoli!</span>
                </motion.div>
              ) : null;
            })()}
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

            {schedule.tasks.length > 0 && schedule.tasks.filter(t => t.completed).length < schedule.tasks.length && (
              <div className="text-center pt-1">
                <span className="text-xs text-[var(--foreground)]/35">
                  {schedule.tasks.filter(t => t.completed).length}/{schedule.tasks.length} tasks done
                </span>
              </div>
            )}
          </div>
        </motion.div>
      ) : !shouldSuppressHomeExtras && !studyPlan && completedCount > 0 ? (
        /* No study plan — do not block the first win with setup */
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="w-full max-w-sm mx-auto mt-2"
        >
          <motion.button
            onClick={() => router.push('/onboarding')}
            whileTap={{ scale: 0.98 }}
            className="w-full game-card p-3 text-left hover:border-[#d4a520]/40 transition-colors group mb-2 relative overflow-hidden bg-[var(--card-bg)]/60 border-[var(--card-border)]"
          >
            <div className="flex items-center gap-3 relative">
              <CalendarDays className="w-8 h-8 text-[#d4a520] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-sm text-[var(--foreground)]">Set your daily goal later</h3>
                <p className="text-xs text-[var(--foreground)]/55 leading-snug">
                  First taste the course. Then pick 5, 10, or 15 minutes/day.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#d4a520] group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </motion.div>
      ) : null}

      {/* Optional legacy lesson queue — hidden by default so it does not compete with the Module 2 mission path */}
      {nextLesson && !schedule && shouldShowModule2ResumeStrip && !shouldSuppressHomeExtras && !showOldLessonQueue && (
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="w-full max-w-sm mx-auto mt-2"
        >
          <button
            type="button"
            onClick={() => setShowOldLessonQueue(true)}
            className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/45 px-4 py-3 text-left transition hover:border-[#d4a520]/35"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--foreground)]/35">Old lesson queue</p>
                <p className="mt-1 text-sm font-bold text-[var(--foreground)]/75">Optional: open the previous lesson card.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#d4a520]" />
            </div>
          </button>
        </motion.div>
      )}

      {/* Next Lesson (only without schedule, and demoted behind disclosure when Module 2 resume is active) */}
      {nextLesson && !schedule && !shouldSuppressHomeExtras && (!shouldShowModule2ResumeStrip || showOldLessonQueue) && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="game-card p-4 mb-3 text-left bg-gradient-to-br from-[#d4a520]/18 via-[var(--card-bg)] to-[#27ae60]/10 border-[#d4a520]/35 shadow-xl shadow-black/20">
            <p className="text-[#d4a520] text-xs font-black uppercase tracking-wider mb-1">
              {completedCount === 0 ? 'Guided A1 start' : 'Up next'}
            </p>
            <h2 className="text-xl font-black leading-tight">
              {completedCount === 0 ? 'Start with Module 2: introduce yourself' : nextLesson.lesson.title}
            </h2>
            <p className="text-[var(--foreground)]/70 text-sm mt-1 leading-snug">
              {completedCount === 0
                ? 'Five short Goethe A1 speaking missions: listen, answer aloud, then repair one real mistake.'
                : nextLesson.lesson.titleGerman}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="bg-[#d4a520]/15 text-[#d4a520] text-xs font-bold px-2.5 py-1 rounded-full border border-[#d4a520]/25">
                {completedCount === 0 ? '5 speaking missions' : nextLesson.lesson.duration}
              </span>
              <span className="bg-white/5 text-[var(--foreground)]/70 text-xs font-bold px-2.5 py-1 rounded-full border border-white/10">
                {completedCount === 0 ? 'native audio · speak + type' : 'Listen · choose · speak'}
              </span>
              {completedCount === 0 && (
                <span className="bg-[#27ae60]/12 text-[#9ce8b6] text-xs font-bold px-2.5 py-1 rounded-full border border-[#27ae60]/20">
                  one clear next step
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <GameButton
            onClick={handleContinue}
            size="xl"
            fullWidth
            pulse
            icon={<ArrowRight className="w-5 h-5" />}
          >
            {completedCount === 0 ? 'Start listening' : 'Continue'}
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
      {!shouldSuppressHomeExtras && completedCount > 3 && (() => {
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
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex-shrink-0"
                >
                  <Trophy className="w-3.5 h-3.5" style={{ color: r.color }} />
                </motion.div>
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

      {/* Achievement popup */}
      <AchievementPopup
        achievement={newAchievement}
        isVisible={!!newAchievement && !shouldSuppressHomeExtras}
        onDismiss={() => setNewAchievement(null)}
      />

      {/* Daily Challenge — only after the learner has cleared the M1/M2 focused path */}
      {completedCount > 0 && !shouldSuppressHomeExtras && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm mx-auto mt-3"
        >
          <DailyChallenge onTap={() => router.push('/games')} />
        </motion.div>
      )}

      {/* Tip of the Day — avoid extra reading during the M1/M2 focused path */}
      {completedCount > 0 && !shouldSuppressHomeExtras && (
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
      )}
    </div>
  );
}
