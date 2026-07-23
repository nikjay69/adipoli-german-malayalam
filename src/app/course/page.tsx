'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Lock, Circle, Play } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { readCompletedModule1Missions, type Module1MissionId } from '@/lib/missions/module1';
import { type Module2MissionId } from '@/lib/missions/module2';
import { readCompletedModule2Missions } from '@/app/missions/module-2/_components/MissionUI';
import {
  getSpineModules,
  getNextBlock,
  readModule1CheckpointResult,
  type Module1CheckpointStored,
  type SpineBlock,
} from '@/lib/spine';

function blockIcon(block: SpineBlock) {
  if (block.done) return <CheckCircle2 className="h-4 w-4 shrink-0 text-[#27ae60]" />;
  if (block.kind === 'checkpoint') return <Circle className="h-4 w-4 shrink-0 text-[#f1d27a]" />;
  return <Circle className="h-4 w-4 shrink-0 text-white/25" />;
}

export default function CoursePage() {
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [m1Missions, setM1Missions] = useState<Module1MissionId[]>([]);
  const [m2Missions, setM2Missions] = useState<Module2MissionId[]>([]);
  const [m1Checkpoint, setM1Checkpoint] = useState<Module1CheckpointStored | null>(null);

  useEffect(() => {
    setMounted(true);
    setM1Missions(readCompletedModule1Missions());
    setM2Missions(readCompletedModule2Missions());
    setM1Checkpoint(readModule1CheckpointResult());
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="mx-auto max-w-md animate-pulse md:max-w-2xl">
          <div className="mb-4 h-8 w-48 rounded bg-white/5" />
          <div className="h-[60vh] rounded-3xl bg-white/5" />
        </div>
      </div>
    );
  }

  const modules = getSpineModules({
    completedLessons: userProgress.completedLessons,
    spineCheckpoints: userProgress.spineCheckpoints || {},
    module1MissionIds: m1Missions,
    module2MissionIds: m2Missions,
    module1Checkpoint: m1Checkpoint,
    mockResults: userProgress.mockResults || {},
  });
  const next = getNextBlock(modules);
  const completeCount = modules.filter((m) => m.status === 'complete').length;

  return (
    <div className="min-h-screen px-4 py-6 pb-32 md:px-8">
      <div className="mx-auto max-w-md md:max-w-2xl">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#d4a520]">Your A1 path</p>
        <h1 className="mt-1 text-3xl font-black leading-tight">8 modules to Goethe A1.</h1>
        <p className="mt-2 text-sm font-semibold text-white/60">{completeCount}/8 complete. Every module ends in a closed checkpoint.</p>

        <div className="mt-5 grid min-w-0 gap-3">
          {modules.map((module) => {
            const isActive = module.status === 'active';
            const isLocked = module.status === 'locked';
            const isComplete = module.status === 'complete';

            return (
              <section
                key={module.id}
                className={`min-w-0 rounded-3xl border p-4 transition ${
                  isActive
                    ? 'border-[#d4a520]/40 bg-white/[0.06] ring-1 ring-[#d4a520]/40'
                    : isComplete
                      ? 'border-[#27ae60]/30 bg-[#27ae60]/5'
                      : 'border-white/8 bg-white/[0.03] opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl"
                    style={{ backgroundColor: `${module.color}30` }}
                  >
                    {isLocked ? <Lock className="h-4 w-4 opacity-60" /> : module.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/40">Module {module.id}</span>
                      {isComplete && module.checkpointResult && (
                        <span className="rounded-full bg-[#27ae60]/15 px-2 py-0.5 text-[10px] font-black text-[#7ee2a8]">
                          {module.checkpointResult.state} · {module.checkpointResult.percent}%
                        </span>
                      )}
                      {isActive && (
                        <span className="rounded-full bg-[#d4a520]/15 px-2 py-0.5 text-[10px] font-black text-[#f1d27a]">Now</span>
                      )}
                    </div>
                    <h2 className="truncate text-base font-black leading-tight">{module.title}</h2>
                  </div>
                  {!isActive && (
                    <div className="text-[11px] font-bold text-white/40">
                      {module.requiredBlocksDone}/{module.requiredBlocksTotal}
                    </div>
                  )}
                </div>

                {isActive && (
                  <>
                    <p className="mt-3 text-sm font-semibold leading-snug text-white/65">{module.promise}</p>
                    <p className="mt-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#d4a520]/80">
                      Milestone: {module.milestone}
                    </p>
                    <div className="mt-3 grid min-w-0 gap-1.5">
                      {module.blocks.map((block) => {
                        const isNext = next?.block.id === block.id;
                        return (
                          <Link
                            key={block.id}
                            href={block.href}
                            className={`min-w-0 flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition ${
                              isNext
                                ? 'border-[#d4a520]/55 bg-[#d4a520]/12'
                                : 'border-white/8 bg-black/15 hover:border-white/20'
                            }`}
                          >
                            {blockIcon(block)}
                            <span className={`line-clamp-2 min-w-0 flex-1 text-sm font-bold leading-snug ${block.done ? 'text-white/40 line-through' : 'text-white/85'}`}>
                              {block.title}
                            </span>
                            {block.kind === 'checkpoint' && !block.done && (
                              <span className="rounded-full bg-[#f1d27a]/12 px-2 py-0.5 text-[10px] font-black text-[#f1d27a]">Closed check</span>
                            )}
                            {block.optional && (
                              <span className="text-[10px] font-bold uppercase text-white/35">Optional</span>
                            )}
                            {isNext ? (
                              <span className="flex items-center gap-1 rounded-full bg-[#d4a520] px-2.5 py-1 text-[11px] font-black text-[#1b2d1b]">
                                <Play className="h-3 w-3 fill-current" /> Next
                              </span>
                            ) : (
                              <ChevronRight className="h-4 w-4 shrink-0 text-white/25" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </section>
            );
          })}
        </div>

        <p className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-xs font-semibold leading-relaxed text-white/45">
          A1+ bridge (weil/dass, reflexive verbs, dative depth) unlocks after your exam — it is not part of the A1 path.
        </p>
      </div>
    </div>
  );
}
