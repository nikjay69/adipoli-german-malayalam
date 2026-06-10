'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lock, CheckCircle, Play, ChevronDown } from 'lucide-react';
import { Kuttan } from '@/components/character/Kuttan';
import { KeralaClassroomScene } from '@/components/course/KeralaClassroomScene';
import { useGameStore } from '@/lib/store';
import type { LessonProgress } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';
import type { Module } from '@/lib/content/modules';
import { isModuleUnlocked, OPTIONAL_MODULE_IDS } from '@/lib/curriculum';
import { module1MissionCards, readCompletedModule1Missions, type Module1MissionId } from '@/lib/missions/module1';
import { module2MissionCards, type Module2MissionId } from '@/lib/missions/module2';
import { readCompletedModule2Missions } from '@/app/missions/module-2/_components/MissionUI';

function isLessonDone(completed: LessonProgress[], id: string) {
  return completed.some((l) => l.lessonId === id);
}

function findCurrent(completed: LessonProgress[]) {
  for (const courseModule of ALL_MODULES) {
    if (!isModuleUnlocked(courseModule.id, completed)) continue;
    for (let i = 0; i < courseModule.lessons.length; i++) {
      if (!isLessonDone(completed, courseModule.lessons[i].id)) {
        return { module: courseModule, lesson: courseModule.lessons[i], lessonIndex: i };
      }
    }
  }
  return null;
}

function getUpcomingLessons(completed: LessonProgress[], max = 5) {
  const out: Array<{ module: Module; lesson: Module['lessons'][number] }> = [];
  for (const courseModule of ALL_MODULES) {
    if (!isModuleUnlocked(courseModule.id, completed)) break;
    for (const lesson of courseModule.lessons) {
      if (!isLessonDone(completed, lesson.id)) {
        out.push({ module: courseModule, lesson });
        if (out.length >= max) return out;
      }
    }
  }
  return out;
}

export default function LearnPage() {
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [showCourseTools, setShowCourseTools] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [completedModule1MissionIds, setCompletedModule1MissionIds] = useState<Module1MissionId[]>([]);
  const [completedMissionIds, setCompletedMissionIds] = useState<Module2MissionId[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
      setCompletedModule1MissionIds(readCompletedModule1Missions());
      setCompletedMissionIds(readCompletedModule2Missions());
    }, 0);

    const refreshCompletedModule1Missions = () => setCompletedModule1MissionIds(readCompletedModule1Missions());
    const refreshCompletedMissions = () => setCompletedMissionIds(readCompletedModule2Missions());
    window.addEventListener('module1-mission-completed', refreshCompletedModule1Missions);
    window.addEventListener('module2-mission-completed', refreshCompletedMissions);
    window.addEventListener('storage', refreshCompletedModule1Missions);
    window.addEventListener('storage', refreshCompletedMissions);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('module1-mission-completed', refreshCompletedModule1Missions);
      window.removeEventListener('module2-mission-completed', refreshCompletedMissions);
      window.removeEventListener('storage', refreshCompletedModule1Missions);
      window.removeEventListener('storage', refreshCompletedMissions);
    };
  }, []);

  const current = useMemo(
    () => (mounted ? findCurrent(userProgress.completedLessons) : null),
    [mounted, userProgress.completedLessons]
  );

  const upcoming = useMemo(
    () => (mounted ? getUpcomingLessons(userProgress.completedLessons, 6) : []),
    [mounted, userProgress.completedLessons]
  );

  const totalLessons = useMemo(() => ALL_MODULES.reduce((s, m) => s + m.lessons.length, 0), []);
  const doneLessons = userProgress.completedLessons.length;
  const coursePct = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0;

  if (!mounted) {
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="mx-auto max-w-md animate-pulse">
          <div className="mb-4 h-8 w-48 rounded bg-white/5" />
          <div className="h-[60vh] rounded-3xl bg-white/5" />
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen px-4 py-10">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-4 text-6xl">🎉</div>
          <h1 className="mb-2 text-2xl font-bold">Course complete</h1>
          <p className="mb-6 text-sm opacity-60">
            You&rsquo;ve finished every lesson. Time to sit for the Goethe A1 mock.
          </p>
          <Link href="/tests" className="inline-flex items-center gap-2 rounded-full bg-[#e94560] px-5 py-3 text-sm font-semibold text-white">
            Open mock tests <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const { module, lesson, lessonIndex } = current;
  const lessonsInModule = module.lessons.length;
  const doneInModule = module.lessons.filter((l) => isLessonDone(userProgress.completedLessons, l.id)).length;
  const modulePct = Math.round((doneInModule / lessonsInModule) * 100);
  const lessonNumber = lessonIndex + 1;
  const moduleColor = module.color || '#e94560';
  const completedModule1MissionSet = new Set(completedModule1MissionIds);
  const firstModule1Mission = module1MissionCards[0];
  const nextModule1Mission = module1MissionCards.find((mission) => mission.active && !completedModule1MissionSet.has(mission.id)) ?? firstModule1Mission;
  const module1Complete = module1MissionCards.every((mission) => completedModule1MissionSet.has(mission.id));
  const completedMissionSet = new Set(completedMissionIds);
  const completedMissionCount = module2MissionCards.filter((mission) => completedMissionSet.has(mission.id)).length;
  const nextModule2Mission = module2MissionCards.find((mission) => mission.active && !completedMissionSet.has(mission.id)) ?? module2MissionCards[module2MissionCards.length - 1];
  const module2SequenceComplete = completedMissionCount === module2MissionCards.length;
  const nextModule2MissionHref = `${nextModule2Mission.href}?start=listen`;
  const learnHeroKicker = !module1Complete
    ? `Module 1 · ${nextModule1Mission.missionNumber}`
    : module2SequenceComplete
      ? 'Module 2 review'
      : `Speaking mission · ${nextModule2Mission.missionNumber.replace('Mission ', '')}`;
  const learnHeroTitle = !module1Complete
    ? nextModule1Mission.title
    : module2SequenceComplete
      ? 'Review your 20-second self-intro.'
      : nextModule2Mission.title;
  const learnHeroContext = !module1Complete
    ? 'One classroom line. Listen first.'
    : module2SequenceComplete
      ? 'Complete. Replay before Module 3.'
      : 'One exam-room answer. Listen first.';
  const learnHeroPreview = !module1Complete
    ? nextModule1Mission.output
    : module2SequenceComplete
      ? 'Ich heiße ... Ich komme aus Kerala. Ich spreche ...'
      : nextModule2Mission.output;
  const learnHeroHref = !module1Complete ? `${nextModule1Mission.href}?start=listen` : nextModule2MissionHref;
  const learnHeroCta = !module1Complete
    ? 'Start listening'
    : module2SequenceComplete
      ? 'Review final mission'
      : 'Start listening';

  return (
    <div className="min-h-screen px-4 py-3 md:px-8 md:py-8">
      <div className="mx-auto max-w-md md:max-w-6xl">
        {/* Focused first-session compass */}
        <div className="mb-3 overflow-hidden rounded-[1.75rem] border border-[#d4a520]/30 bg-gradient-to-br from-[#d4a520]/18 via-white/[0.04] to-[#e94560]/12 shadow-xl shadow-black/20">
          <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_16rem] md:items-center md:p-5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#d4a520]">{learnHeroKicker}</p>
              <h1 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                {learnHeroTitle}
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-white/72 md:text-base">
                {learnHeroContext}
              </p>
              <p className="mt-3 inline-flex rounded-2xl border border-[#d4a520]/25 bg-[#d4a520]/10 px-3 py-2 text-sm font-black text-[#f1d27a]">
                {learnHeroPreview}
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <Link
                  href={learnHeroHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#e94560] px-5 py-4 text-base font-black text-white shadow-lg shadow-[#e94560]/25 transition hover:bg-[#ff5a72]"
                >
                  {learnHeroCta} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="block md:block" aria-hidden="true">
              <KeralaClassroomScene className="h-32 border-white/10 shadow-[0_18px_46px_-30px_rgba(0,0,0,0.9)] md:h-44 md:shadow-[0_24px_60px_-34px_rgba(0,0,0,0.9)]" />
            </div>
          </div>
        </div>

        <div className="mb-1 flex justify-end">
          <button
            type="button"
            onClick={() => setShowCourseTools((v) => !v)}
            className="sr-only inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111f11]/85 px-3 py-2 text-left text-xs font-bold text-white/60 shadow-lg shadow-black/20 transition focus:not-sr-only focus:text-white/85"
          >
            <span>{showCourseTools ? 'Hide old lesson map' : 'Old lesson map'}</span>
            <span className="sr-only">Optional classic lesson queue; not the first-session path.</span>
            <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform ${showCourseTools ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showCourseTools && (
        <>
        <div className="mt-4 md:grid md:grid-cols-[1.4fr_1fr] md:gap-6">
        <div>
        {/* Hero: current lesson */}
        <Link href={`/play/${module.id}/${lesson.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              opacity: { duration: 0.4 },
              y: { duration: 0.4 },
            }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-3xl border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${moduleColor}28 0%, ${moduleColor}0a 60%, rgba(0,0,0,0.25) 100%)`,
            }}
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full blur-3xl"
              style={{ background: `${moduleColor}44` }}
            />
            <div
              className="pointer-events-none absolute -left-8 -bottom-8 h-40 w-40 rounded-full blur-3xl opacity-60"
              style={{ background: `${moduleColor}33` }}
            />

            <div className="relative p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">
                  <span>Continue</span>
                  <span className="opacity-40">·</span>
                  <span>Module {module.id}</span>
                </div>
                <div className="flex-shrink-0 opacity-90" style={{ transform: 'scale(0.7)', transformOrigin: 'right' }}>
                  <Kuttan
                    mood={doneInModule > 0 ? 'happy' : 'excited'}
                    size="sm"
                    entrance={false}
                  />
                </div>
              </div>

              <div className="mb-1 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-2xl shadow-lg"
                  style={{ backgroundColor: moduleColor + '35', boxShadow: `0 4px 12px -2px ${moduleColor}44` }}
                >
                  {module.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium uppercase tracking-wider opacity-60">
                    {module.title}
                  </div>
                </div>
              </div>

              <h1 className="mb-1 text-2xl font-bold leading-tight">
                Lesson {lessonNumber}
              </h1>
              <div className="mb-5 text-lg opacity-85">
                {lesson.title}
              </div>

              {/* Module progress */}
              <div className="mb-5">
                <div className="mb-1 flex items-center justify-between text-[11px] opacity-60">
                  <span>{doneInModule}/{lessonsInModule} in this module</span>
                  <span>{modulePct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${modulePct}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: moduleColor }}
                  />
                </div>
              </div>

              {/* CTA */}
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-white shadow-lg md:py-4 md:text-base"
                style={{ background: moduleColor, boxShadow: `0 8px 24px -6px ${moduleColor}66` }}
              >
                <span className="flex items-center gap-2">
                  <Play className="h-4 w-4 fill-current" />
                  {lessonIndex === 0 && doneLessons === 0 ? 'Start your first lesson' : 'Resume lesson'}
                </span>
                <span className="text-xs opacity-80">{lesson.duration}</span>
              </motion.div>
            </div>
          </motion.div>
        </Link>
        </div>

        <div className="md:space-y-4">
        {/* Up Next */}
        {upcoming.length > 1 && (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] opacity-50">Up next</h2>
              <span className="text-[11px] opacity-40">{upcoming.length - 1} lessons</span>
            </div>
            {/* Mobile: vertical stack of 2 */}
            <div className="flex flex-col gap-2 md:hidden">
              {upcoming.slice(1, 3).map((u) => (
                <Link
                  key={u.lesson.id}
                  href={`/play/${u.module.id}/${u.lesson.id}`}
                  className="group block"
                >
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-white/20 active:bg-white/10">
                    <div className="flex flex-shrink-0 items-center gap-1.5">
                      <span className="text-base">{u.module.icon}</span>
                      <span className="text-[10px] uppercase tracking-wider opacity-40">
                        M{u.module.id}
                      </span>
                    </div>
                    <div className="line-clamp-2 flex-1 text-sm font-medium leading-snug">
                      {u.lesson.title}
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2 text-[11px] opacity-50">
                      <span>{u.lesson.duration}</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* md+: vertical list (fits sidebar layout) */}
            <div className="hidden md:flex md:flex-col md:gap-2">
              {upcoming.slice(1).map((u) => (
                <Link
                  key={u.lesson.id}
                  href={`/play/${u.module.id}/${u.lesson.id}`}
                  className="group block"
                >
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-white/20">
                    <div className="flex flex-shrink-0 items-center gap-1.5">
                      <span className="text-base">{u.module.icon}</span>
                      <span className="text-[10px] uppercase tracking-wider opacity-40">
                        M{u.module.id}
                      </span>
                    </div>
                    <div className="line-clamp-2 flex-1 text-sm font-medium leading-snug">
                      {u.lesson.title}
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2 text-[11px] opacity-50">
                      <span>{u.lesson.duration}</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Course progress mini-ring */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5">
          <div>
            <div className="text-xs opacity-50">Course progress</div>
            <div className="text-sm font-semibold">{coursePct}% · A1</div>
          </div>
          <div className="relative h-10 w-10">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <motion.circle
                cx="18" cy="18" r="14" fill="none"
                stroke={moduleColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 14}
                initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 14 * (1 - coursePct / 100) }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
              {coursePct}%
            </div>
          </div>
        </div>

        {/* Roadmap toggle */}
        <button
          onClick={() => setShowRoadmap((v) => !v)}
          className="mt-4 flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <span className="font-medium">View all 18 modules</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showRoadmap ? 'rotate-180' : ''}`} />
        </button>

        </div>
        </div>

        <AnimatePresence>
          {showRoadmap && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mb-2 grid grid-cols-3 gap-2 pb-4 md:grid-cols-6 md:gap-3">
                {ALL_MODULES.map((m) => {
                  const unlocked = isModuleUnlocked(m.id, userProgress.completedLessons);
                  const done = m.lessons.filter((l) => isLessonDone(userProgress.completedLessons, l.id)).length;
                  const pct = Math.round((done / m.lessons.length) * 100);
                  const isCurrent = m.id === module.id;
                  const isOptional = OPTIONAL_MODULE_IDS.has(m.id);

                  const isComplete = pct === 100;

                  return (
                    <Link
                      key={m.id}
                      href={unlocked ? `/learn/${m.id}` : '#'}
                      className={`relative block ${!unlocked ? 'pointer-events-none' : ''}`}
                    >
                      <div
                        className={`relative rounded-xl border p-2.5 text-left transition-all ${
                          isComplete
                            ? 'border-[#27ae60]/60 bg-[#27ae60]/5 shadow-[0_0_16px_rgba(39,174,96,0.15)]'
                            : isCurrent
                            ? 'border-[#d4a520]/40 bg-white/10 ring-2 ring-[#d4a520]/60'
                            : unlocked
                            ? 'border-white/10 bg-white/5 hover:bg-white/10'
                            : 'border-white/5 bg-white/2 opacity-40'
                        }`}
                      >
                        {isComplete && (
                          <span className="absolute -right-1 -top-1 z-10 rounded-full bg-[#d4a520] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-black shadow-md">
                            ✓ Done
                          </span>
                        )}
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-lg">
                            {unlocked ? (
                              m.icon
                            ) : (
                              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5">
                                <Lock className="h-3 w-3 opacity-60" />
                              </span>
                            )}
                          </span>
                          {isComplete && <CheckCircle className="h-3.5 w-3.5 text-[#27ae60]" />}
                          {isCurrent && !isComplete && <span className="h-1.5 w-1.5 rounded-full bg-[#d4a520] animate-pulse" />}
                        </div>
                        <div className="text-[10px] font-semibold opacity-70">M{m.id}</div>
                        <div className="line-clamp-2 text-[11px] leading-tight opacity-70">{m.title}</div>
                        {isOptional && (
                          <div className="mt-1 text-[9px] uppercase tracking-wider opacity-40">Opt</div>
                        )}
                        {!unlocked && (
                          <div className="mt-1 text-[9px] uppercase tracking-wider opacity-40">Locked</div>
                        )}
                        <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${pct}%`, background: isComplete ? '#27ae60' : (m.color || '#e94560') }}
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </>
        )}
      </div>
    </div>
  );
}
