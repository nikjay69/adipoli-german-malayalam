'use client';

// Today screen — the command center (docs/LEARNER_JOURNEY.md).
// One active card: the next required block on the 8-module spine.
// Below it: recovery (only when a checkpoint was weak), the 5-min SRS review,
// progress + skill bars, and the practice library behind a disclosure.

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Lock, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';
import { KeralaClassroomScene } from '@/components/course/KeralaClassroomScene';
import { useGameStore } from '@/lib/store';
import { ALL_MODULES } from '@/lib/content/modules';
import { isModuleUnlocked, OPTIONAL_MODULE_IDS } from '@/lib/curriculum';
import { getDueCount } from '@/lib/srs';
import { readCompletedModule1Missions, type Module1MissionId } from '@/lib/missions/module1';
import { type Module2MissionId } from '@/lib/missions/module2';
import { readCompletedModule2Missions } from '@/app/missions/module-2/_components/MissionUI';
import {
  getSpineModules,
  getNextBlock,
  getSkillReadiness,
  getActiveRecovery,
  readModule1CheckpointResult,
  type Module1CheckpointStored,
  type SpineInputs,
} from '@/lib/spine';

const SKILL_LABELS: Array<{ key: 'hoeren' | 'sprechen' | 'lesen' | 'schreiben'; label: string }> = [
  { key: 'hoeren', label: 'Hören' },
  { key: 'sprechen', label: 'Sprechen' },
  { key: 'lesen', label: 'Lesen' },
  { key: 'schreiben', label: 'Schreiben' },
];

function isLessonDone(completed: { lessonId: string }[], id: string) {
  return completed.some((l) => l.lessonId === id);
}

export default function TodayPage() {
  const { userProgress, updateStreak } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [m1Missions, setM1Missions] = useState<Module1MissionId[]>([]);
  const [m2Missions, setM2Missions] = useState<Module2MissionId[]>([]);
  const [m1Checkpoint, setM1Checkpoint] = useState<Module1CheckpointStored | null>(null);

  useEffect(() => {
    const refresh = () => {
      setM1Missions(readCompletedModule1Missions());
      setM2Missions(readCompletedModule2Missions());
      setM1Checkpoint(readModule1CheckpointResult());
    };
    const timer = window.setTimeout(() => {
      setMounted(true);
      refresh();
      updateStreak(); // daily-visit streak used to be counted on the legacy dashboard home
    }, 0);
    window.addEventListener('module1-mission-completed', refresh);
    window.addEventListener('module2-mission-completed', refresh);
    window.addEventListener('module1-checkpoint-scored', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('module1-mission-completed', refresh);
      window.removeEventListener('module2-mission-completed', refresh);
      window.removeEventListener('module1-checkpoint-scored', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [updateStreak]);

  const inputs: SpineInputs = useMemo(() => ({
    completedLessons: userProgress.completedLessons,
    spineCheckpoints: userProgress.spineCheckpoints || {},
    module1MissionIds: m1Missions,
    module2MissionIds: m2Missions,
    module1Checkpoint: m1Checkpoint,
    mockResults: userProgress.mockResults || {},
  }), [userProgress.completedLessons, userProgress.spineCheckpoints, userProgress.mockResults, m1Missions, m2Missions, m1Checkpoint]);

  const spineModules = useMemo(() => (mounted ? getSpineModules(inputs) : []), [mounted, inputs]);
  const next = useMemo(() => getNextBlock(spineModules), [spineModules]);
  const skills = useMemo(() => getSkillReadiness(inputs), [inputs]);
  const recovery = useMemo(() => (mounted ? getActiveRecovery(inputs) : null), [mounted, inputs]);
  const dueCards = mounted ? getDueCount(userProgress.srsCards || {}) : 0;

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

  const completeCount = spineModules.filter((m) => m.status === 'complete').length;
  const activeModule = next?.module ?? spineModules[spineModules.length - 1];
  const hasSkillEvidence = SKILL_LABELS.some(({ key }) => skills[key] > 0);

  const heroCta = next
    ? next.block.kind === 'checkpoint'
      ? 'Take the closed checkpoint'
      : next.block.kind === 'mission'
        ? 'Start listening'
        : 'Start the lesson'
    : 'Open the mock tests';

  return (
    <div className="min-h-screen px-4 py-4 pb-32 md:px-8 md:py-8">
      <div className="mx-auto max-w-md md:max-w-2xl">
        {/* Hero: the one next action */}
        <div className="overflow-hidden rounded-[1.75rem] border border-[#d4a520]/30 bg-gradient-to-br from-[#d4a520]/18 via-white/[0.04] to-[#e94560]/12 shadow-xl shadow-black/20">
          <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_14rem] md:items-center md:p-5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#d4a520]">
                {next ? `Module ${next.module.id} · ${next.module.title}` : 'Spine complete'}
              </p>
              <h1 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                {next ? next.block.title : 'You finished the A1 path.'}
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-snug text-white/72">
                {next ? next.module.promise : 'Keep your edge: timed mocks until exam day.'}
              </p>
              <div className="mt-4">
                <Link
                  href={next ? next.block.href : '/tests'}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#e94560] px-5 py-4 text-base font-black text-white shadow-lg shadow-[#e94560]/25 transition hover:bg-[#ff5a72]"
                >
                  {heroCta} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block" aria-hidden="true">
              <KeralaClassroomScene className="h-36 border-white/10 shadow-[0_18px_46px_-30px_rgba(0,0,0,0.9)]" />
            </div>
          </div>
        </div>

        {/* Recovery — only after a weak/failed checkpoint */}
        {recovery && (
          <div className="mt-3 rounded-3xl border border-[#f1d27a]/25 bg-[#f1d27a]/8 p-4" data-testid="today-recovery-card">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#f1d27a]">
                Fix first · Module {recovery.moduleId} {recovery.state === 'FAIL' ? 'gate' : 'weak spot'}
              </p>
              <span className="text-[11px] font-bold text-white/45">{recovery.timeBoxMinutes}m</span>
            </div>
            <h2 className="mt-1 text-lg font-black leading-tight">{recovery.title}</h2>
            <ol className="mt-2 space-y-1 text-sm font-semibold text-white/70">
              {recovery.mustDo.slice(0, 3).map((task) => <li key={task}>- {task}</li>)}
            </ol>
            <div className="mt-3 flex flex-wrap gap-2">
              {recovery.libraryHref && (
                <Link
                  href={recovery.libraryHref}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#f1d27a] px-4 py-2 text-sm font-black text-[#162416] transition hover:bg-[#ffe394]"
                >
                  {recovery.libraryLabel ?? 'Start recovery'} <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
              <Link
                href={recovery.retestHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white/75 transition hover:bg-white/10"
              >
                Retest <RotateCcw className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* SRS — the daily 5 minutes */}
        {dueCards > 0 && (
          <Link href="/practice/review" className="group mt-3 block" data-testid="today-srs-card">
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#27ae60]/20 text-lg">
                <Sparkles className="h-5 w-5 text-[#7ee2a8]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black">5-min review</div>
                <div className="text-xs font-semibold text-white/50">{dueCards} {dueCards === 1 ? 'word is' : 'words are'} due today</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        )}

        {/* Progress + skill bars */}
        <div className="mt-3 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white/50">Course progress</div>
              <div className="text-sm font-black">
                Module {activeModule?.id ?? 8} of 8 · {completeCount} complete
              </div>
            </div>
            <Link
              href="/course"
              className="inline-flex items-center gap-1 rounded-full border border-white/12 px-3 py-1.5 text-xs font-black text-white/70 transition hover:bg-white/10"
            >
              View path <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {spineModules.map((m) => (
              <div
                key={m.id}
                className={`h-1.5 flex-1 rounded-full ${
                  m.status === 'complete' ? 'bg-[#27ae60]' : m.status === 'active' ? 'bg-[#d4a520]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5" data-testid="today-skill-bars">
            {SKILL_LABELS.map(({ key, label }) => (
              <div key={key}>
                <div className="mb-1 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-white/60">{label}</span>
                  <span className="text-white/40">{skills[key]}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#d4a520] to-[#27ae60]"
                    style={{ width: `${skills[key]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {!hasSkillEvidence && (
            <p className="mt-2 text-[11px] font-semibold text-white/35">Skill bars fill after your first checkpoint.</p>
          )}
        </div>

        {/* Practice library — secondary, behind a disclosure */}
        <button
          onClick={() => setShowLibrary((v) => !v)}
          className="mt-4 flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-sm text-white/50 transition hover:text-white/80"
        >
          <span className="font-semibold">Practice library (all lessons)</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showLibrary ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showLibrary && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="mb-2 px-2 text-[11px] font-semibold text-white/35">
                Extra practice. Your required path lives on the course page — use these for recovery and review.
              </p>
              <div className="mb-2 grid grid-cols-3 gap-2 pb-4 md:grid-cols-6 md:gap-3">
                {ALL_MODULES.map((m) => {
                  const unlocked = isModuleUnlocked(m.id, userProgress.completedLessons, {
                    spineCheckpoints: userProgress.spineCheckpoints || {},
                    module1Passed: (m1Checkpoint?.state ?? 'FAIL') !== 'FAIL',
                  });
                  const done = m.lessons.filter((l) => isLessonDone(userProgress.completedLessons, l.id)).length;
                  const pct = Math.round((done / m.lessons.length) * 100);
                  const isComplete = pct === 100;
                  const isOptional = OPTIONAL_MODULE_IDS.has(m.id);

                  return (
                    <Link
                      key={m.id}
                      href={unlocked ? `/learn/${m.id}` : '#'}
                      className={`relative block ${!unlocked ? 'pointer-events-none' : ''}`}
                    >
                      <div
                        className={`relative rounded-xl border p-2.5 text-left transition-all ${
                          isComplete
                            ? 'border-[#27ae60]/60 bg-[#27ae60]/5'
                            : unlocked
                              ? 'border-white/10 bg-white/5 hover:bg-white/10'
                              : 'border-white/5 bg-white/2 opacity-40'
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-lg">
                            {unlocked ? m.icon : (
                              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5">
                                <Lock className="h-3 w-3 opacity-60" />
                              </span>
                            )}
                          </span>
                          {isComplete && <CheckCircle className="h-3.5 w-3.5 text-[#27ae60]" />}
                        </div>
                        <div className="text-[10px] font-semibold opacity-70">M{m.id}</div>
                        <div className="line-clamp-2 text-[11px] leading-tight opacity-70">{m.title}</div>
                        {isOptional && <div className="mt-1 text-[9px] uppercase tracking-wider opacity-40">A1+ · after exam</div>}
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
      </div>
    </div>
  );
}
