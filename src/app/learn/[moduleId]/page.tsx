'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Lock, CheckCircle, Clock, Star, Play } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { JourneyMap } from '@/components/lesson';
import { Nivin } from '@/components/character/Nivin';
import { KeralaClassroomScene } from '@/components/course/KeralaClassroomScene';
import { useGameStore } from '@/lib/store';
import { getModuleById } from '@/lib/content/modules';
import { module1MissionCards, readCompletedModule1Missions, type Module1MissionId } from '@/lib/missions/module1';
import { module2MissionCards, type Module2MissionId } from '@/lib/missions/module2';
import { readCompletedModule2Missions } from '@/app/missions/module-2/_components/MissionUI';

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  const router = useRouter();
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);
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

  const courseModule = getModuleById(parseInt(moduleId));

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!courseModule) {
    return (
      <div className="px-4 py-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Module not found</h1>
        <Link href="/learn">
          <Button className="mt-4">Back to Learn</Button>
        </Link>
      </div>
    );
  }

  const completedModuleLessons = userProgress.completedLessons.filter(l =>
    courseModule.lessons.some(ml => ml.id === l.lessonId)
  ).length;
  const moduleProgress = (completedModuleLessons / courseModule.lessons.length) * 100;
  const isModule1 = courseModule.id === 1;
  const isModule2 = courseModule.id === 2;
  const isFocusedMissionLanding = isModule1 || isModule2;
  const completedModule1MissionSet = new Set(completedModule1MissionIds);
  const firstModule1Mission = module1MissionCards[0];
  const nextModule1Mission = module1MissionCards.find((mission) => mission.active && !completedModule1MissionSet.has(mission.id)) ?? firstModule1Mission;
  const completedModule1MissionCount = module1MissionCards.filter((mission) => completedModule1MissionSet.has(mission.id)).length;
  const module1Complete = module1MissionCards.every((mission) => completedModule1MissionSet.has(mission.id));
  const completedMissionSet = new Set(completedMissionIds);
  const completedMissionCount = isModule2
    ? module2MissionCards.filter((mission) => completedMissionSet.has(mission.id)).length
    : 0;
  const nextModule2Mission = module2MissionCards.find((mission) => mission.active && !completedMissionSet.has(mission.id)) ?? module2MissionCards[module2MissionCards.length - 1];
  const module2SequenceComplete = completedMissionCount === module2MissionCards.length;
  const nextModule2MissionHref = module2SequenceComplete
    ? '/learn/3'
    : `${nextModule2Mission.href}?start=listen`;
  const module1SceneLine = module1Complete
    ? 'Wie heißen Sie?'
    : nextModule1Mission.id === 'greetFrauWeber'
      ? 'Guten Morgen.'
      : nextModule1Mission.id === 'pleaseThanks'
        ? 'Bitte.'
        : 'Auf Wiedersehen.';

  const heroTitle = isModule1
    ? module1SceneLine
    : isModule2
    ? module2SequenceComplete
      ? 'Now handle numbers.'
      : nextModule2Mission.title
    : courseModule.title;
  const heroDescription = isModule1
    ? module1Complete
      ? 'Examiner speaks. You answer.'
      : 'Frau Fischer speaks. You answer.'
    : isModule2
    ? module2SequenceComplete
      ? 'Price or phone number. Listen first.'
      : 'Listen to the examiner first.'
    : courseModule.description;
  const heroChips = isModule1 || isModule2
    ? []
    : [`${courseModule.totalHours} hours`, `${courseModule.lessons.length} lessons`, `${courseModule.lessons.reduce((acc, l) => acc + l.vocabulary.length, 0)} words`];
  const module1CompletionHref = module2MissionCards[0]?.href ? `${module2MissionCards[0].href}?start=listen` : '/learn/2';
  const module1NextOutput = module1Complete ? 'Ich heiße ...' : nextModule1Mission.output;
  const module2NextOutput = module2SequenceComplete
    ? '0–20, prices, phone numbers'
    : nextModule2Mission.output;

  // Find next incomplete lesson. M1/M2 mission CTAs must not depend on stale old lesson progress.
  const nextLesson = courseModule.lessons.find(
    lesson => !userProgress.completedLessons.some(l => l.lessonId === lesson.id)
  );
  const showPrimaryCta = isModule1 ? true : isModule2 ? true : Boolean(nextLesson);
  const module1PrimaryHref = module1Complete ? module1CompletionHref : `${nextModule1Mission.href}?start=listen`;
  const primaryHref = isModule1 ? module1PrimaryHref : isModule2 ? nextModule2MissionHref : `/play/${courseModule.id}/${nextLesson?.id ?? courseModule.lessons[0]?.id}`;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Cinematic hero — full-bleed gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${courseModule.color}55 0%, ${courseModule.color}18 40%, rgba(11,22,11,0.95) 85%)`,
        }}
      >
        {/* Ambient glows */}
        <div
          className="pointer-events-none absolute -top-32 right-[10%] h-80 w-80 rounded-full blur-3xl"
          style={{ background: `${courseModule.color}66` }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full blur-3xl opacity-60"
          style={{ background: `${courseModule.color}44` }}
        />

        {/* Back link overlay */}
        <button
          onClick={() => router.back()}
          className={isFocusedMissionLanding
            ? 'sr-only'
            : 'absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm hover:bg-black/50'}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>

        <div className={`relative px-5 md:px-10 ${isModule1 || isModule2 ? 'py-8 md:py-9' : 'py-10 md:py-12 lg:py-14'}`}>
          <div className={`mx-auto max-w-4xl ${isModule1 || isModule2 ? 'md:grid md:grid-cols-[minmax(0,1fr)_minmax(13rem,0.55fr)] md:items-center md:gap-6' : 'md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10'}`}>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={isFocusedMissionLanding
                  ? 'sr-only'
                  : 'mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm'}
              >
                {isModule1 ? `Module 1 · ${module1Complete ? 'mission review' : nextModule1Mission.missionNumber}` : isModule2 ? `Module 2 · ${module2SequenceComplete ? 'complete' : nextModule2Mission.missionNumber}` : `Module ${courseModule.id}`}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className={`${isModule2 ? 'mb-2 text-3xl md:text-4xl' : 'mb-2 text-4xl md:text-5xl lg:text-6xl'} font-black leading-[1.1] text-white`}
              >
                {heroTitle}
              </motion.h1>

              {!isModule1 && !isModule2 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-3 flex items-center gap-2"
                >
                  <Nivin mood="happy" size="sm" entrance={false} />
                  <span className="rounded-full border border-[#d4a520]/30 bg-[#d4a520]/10 px-3 py-1 text-xs font-medium text-[#d4a520]">
                    Guided A1 module
                  </span>
                </motion.div>
              )}
              {courseModule.titleGerman && !isModule1 && !isModule2 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className={`${isModule2 ? 'mb-3 text-sm' : 'mb-4 text-lg'} italic text-white/60`}
                >
                  {courseModule.titleGerman}
                </motion.p>
              )}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className={`${isModule2 ? 'mb-4 max-w-2xl text-sm md:text-sm' : 'mb-6 max-w-xl text-sm md:text-base'} leading-relaxed text-white/70`}
              >
                {heroDescription}
              </motion.p>

              {/* Stats chips. Hidden for M1/M2 first path: Boss wants one action, not dashboard proof labels. */}
              {heroChips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="mb-6 flex flex-wrap items-center gap-2 text-xs"
                >
                  {heroChips.map((chip) => (
                    <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                      {chip}
                    </span>
                  ))}
                </motion.div>
              )}

              {isModule1 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="mb-5 inline-flex max-w-full rounded-2xl border border-[#d4a520]/22 bg-black/18 px-4 py-3 text-base font-black text-white backdrop-blur-sm"
                >
                  <span className="truncate">{module1NextOutput}</span>
                  <span className="sr-only">
                    {module1Complete
                      ? 'Module 1 complete. Next: Tell the examiner your name.'
                      : `Next classroom line. ${completedModule1MissionCount}/${module1MissionCards.length} missions complete.`}
                  </span>
                </motion.div>
              ) : isModule2 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="mb-5 inline-flex max-w-full rounded-2xl border border-[#d4a520]/22 bg-black/18 px-4 py-3 text-base font-black text-white backdrop-blur-sm"
                >
                  <span className="truncate">{module2NextOutput}</span>
                  <span className="sr-only">{completedMissionCount}/5 missions complete. Ability unlocked by listening, answering aloud, tiny writing, and one repair.</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="mb-6"
                >
                  <div className="mb-1.5 flex items-center justify-between text-xs text-white/70">
                    <span>Progress</span>
                    <span className="font-semibold text-white">
                      {completedModuleLessons}/{courseModule.lessons.length} · {Math.round(moduleProgress)}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${moduleProgress}%` }}
                      transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${courseModule.color}, #f5f0e8)` }}
                    />
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              {showPrimaryCta && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="w-full md:w-auto"
                >
                  <Link
                    href={primaryHref}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base shadow-2xl transition active:scale-[0.98] md:w-auto md:min-w-[280px] ${isFocusedMissionLanding ? 'font-black text-[#102018] hover:scale-[1.01]' : 'font-semibold text-white hover:scale-[1.02]'}`}
                    style={{
                      background: isFocusedMissionLanding ? '#f1d27a' : courseModule.color,
                      boxShadow: `0 12px 32px -8px ${isFocusedMissionLanding ? '#f1d27a' : courseModule.color}`,
                    }}
                  >
                    <Play className="h-5 w-5 fill-current" />
                    {isModule2
                      ? module2SequenceComplete
                        ? 'Start Module 3 numbers'
                        : 'Start listening'
                      : isModule1
                        ? module1Complete
                          ? 'Start Module 2 speaking'
                          : 'Start listening'
                      : completedModuleLessons === 0
                        ? 'Start module'
                        : 'Continue learning'}
                  </Link>
                </motion.div>
              )}

              {moduleProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-300"
                >
                  <CheckCircle className="h-4 w-4" /> Module complete
                </motion.div>
              )}
            </div>

            {isModule1 || isModule2 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
                className="mt-5 block md:mt-0"
                aria-hidden="true"
              >
                <KeralaClassroomScene
                  variant={isModule1 ? 'ai-study' : 'abstract'}
                  className="h-32 shadow-[0_18px_48px_-32px_rgba(0,0,0,0.95)] md:h-48 lg:h-56 md:shadow-[0_28px_70px_-44px_rgba(0,0,0,0.95)]"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.3, type: 'spring', bounce: 0.4 }}
                className="mx-auto mt-8 hidden md:block"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-48 w-48 items-center justify-center rounded-[40%] text-[140px] shadow-2xl lg:h-60 lg:w-60 lg:text-[180px]"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${courseModule.color}cc, ${courseModule.color}44)`,
                    boxShadow: `0 20px 60px -10px ${courseModule.color}66`,
                  }}
                >
                  {courseModule.icon}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="px-4 py-6 md:px-10 md:py-8">

      {isModule1 ? (
        <div
          className="sr-only"
          aria-label={module1Complete ? 'Module 1 complete; Module 2 speaking is ready' : 'Module 1 mission progress'}
        >
          {module1Complete
            ? 'Module 1 complete. Next: examiner asks Wie heißen Sie?'
            : `${completedModule1MissionCount}/3 complete. Next spoken line: ${module1SceneLine}. Say: ${module1NextOutput}.`}
        </div>
      ) : isModule2 ? (
        <div
          className="sr-only"
          aria-label={module2SequenceComplete ? 'Module 2 complete; Module 3 numbers is ready' : 'Module 2 mission progress'}
        >
          {module2SequenceComplete
            ? 'Module 2 complete. Next: handle numbers, prices, and phone numbers.'
            : `${completedMissionCount}/5 complete. Next: ${nextModule2Mission.title}. Output: ${module2NextOutput}.`}
        </div>
      ) : (
        <>
          {/* Journey Map — visual progress path */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 md:mb-8"
          >
            <JourneyMap
              module={courseModule}
              completedLessonIds={userProgress.completedLessons.map(l => l.lessonId)}
              currentLessonId={nextLesson?.id}
              onLessonTap={(lessonId) => router.push(`/play/${courseModule.id}/${lessonId}`)}
            />
          </motion.div>

          {/* Lessons List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">Lessons</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {courseModule.lessons.map((lesson, lessonIndex) => {
                const isCompleted = userProgress.completedLessons.some(
                  l => l.lessonId === lesson.id
                );
                const completedLesson = userProgress.completedLessons.find(
                  l => l.lessonId === lesson.id
                );

                const isPreviousLessonComplete = lessonIndex === 0 ||
                  userProgress.completedLessons.some(
                    l => l.lessonId === courseModule.lessons[lessonIndex - 1].id
                  );

                const isLessonLocked = !isPreviousLessonComplete;

                return (
                  <Link
                    key={lesson.id}
                    href={isLessonLocked ? '#' : `/play/${courseModule.id}/${lesson.id}`}
                  >
                    <Card
                      hover={!isLessonLocked}
                      className={`${
                        isLessonLocked
                          ? 'opacity-50 cursor-not-allowed'
                          : isCompleted
                          ? 'border-2 border-[#27ae60]/40 bg-[#27ae60]/5'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isLessonLocked
                            ? 'bg-[var(--foreground)]/10'
                            : isCompleted
                            ? 'bg-[#27ae60]'
                            : 'bg-[#e94560]'
                        }`}>
                          {isLessonLocked ? (
                            <Lock className="w-5 h-5 text-[var(--foreground)]/40" />
                          ) : isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white text-lg font-bold">{lessonIndex + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold ${
                            isLessonLocked ? 'text-[var(--foreground)]/40' : 'text-[var(--foreground)]'
                          }`}>
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-[var(--foreground)]/50 line-clamp-1">
                            {lesson.description}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-[var(--foreground)]/50 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {lesson.duration}
                            </span>
                            <span className="text-xs text-[var(--foreground)]/50">
                              {lesson.videos.length} video{lesson.videos.length !== 1 ? 's' : ''}
                            </span>
                            <span className="text-xs text-[var(--foreground)]/50">
                              {lesson.vocabulary.length} words
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {isCompleted && completedLesson && (
                            <div className="flex items-center gap-0.5 text-amber-500">
                              <Star className="w-4 h-4 fill-amber-500" />
                              <span className="text-sm font-medium">{completedLesson.score}%</span>
                            </div>
                          )}
                          {!isLessonLocked && !isCompleted && (
                            <Badge variant="success" size="sm">+{lesson.xpReward} XP</Badge>
                          )}
                          <ChevronRight className={`w-5 h-5 ${
                            isLessonLocked ? 'text-[var(--foreground)]/30' : 'text-[var(--foreground)]/40'
                          }`} />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
      </div>
    </div>
  );
}
