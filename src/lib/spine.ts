// The 8-module A1 course spine (docs/A1_COURSE_ARCHITECTURE.md).
//
// Spine + Library: these 8 modules are the only learner-visible path. The old
// 18 content modules stay untouched as the practice library; spine modules
// reference their lessons as required blocks (S3-S8) while S1-S2 run on the
// premium mission routes. Every module ends in a closed checkpoint; PASS or
// WEAK unlocks the next module, FAIL prescribes recovery first.

import { ALL_MODULES } from '@/lib/content/modules';
import type { LessonProgress, MockGateResult, SpineCheckpointResult } from '@/lib/store';
import { module1MissionCards, type Module1MissionId } from '@/lib/missions/module1';
import { module2MissionCards, type Module2MissionId } from '@/lib/missions/module2';
import {
  MODULE1_CHECKPOINT_RESULT_STORAGE_KEY,
  module1CheckpointRecoveryCards,
  scoreModule1Checkpoint,
} from '@/lib/missions/module1Checkpoint';
import { SPINE_CHECKPOINTS, findRecoveryCards } from '@/lib/spine-checkpoints';
import { SPINE_SOURCE_MODULE_IDS } from '@/lib/spine-map';
import { getMockGatesForModule } from '@/lib/mocks';

export type SpineModuleDef = {
  id: number;
  title: string;
  promise: string;
  milestone: string;
  icon: string;
  color: string;
  /** old content modules whose lessons are required blocks in this spine module */
  sourceModuleIds: number[];
  checkpointHref: string;
};

export const SPINE_MODULES: SpineModuleDef[] = [
  { id: 1, title: 'First German moment', promise: 'Greet, thank, and survive your first classroom exchange.', milestone: 'First real conversation', icon: '👋', color: '#e94560', sourceModuleIds: SPINE_SOURCE_MODULE_IDS[1], checkpointHref: '/missions/module-1/checkpoint' },
  { id: 2, title: 'Identity, numbers, time', promise: 'Introduce yourself like a Goethe candidate. Catch numbers and times.', milestone: 'Sprechen Teil 1 foundation', icon: '🪪', color: '#d4a520', sourceModuleIds: SPINE_SOURCE_MODULE_IDS[2], checkpointHref: '/course/2/checkpoint' },
  { id: 3, title: 'People, home, daily life', promise: 'Talk about your family, your home, and your real day.', milestone: 'Daily-life speaking + reading', icon: '🏠', color: '#27ae60', sourceModuleIds: SPINE_SOURCE_MODULE_IDS[3], checkpointHref: '/course/3/checkpoint' },
  { id: 4, title: 'Food, shopping, money', promise: 'Order, buy, and understand prices without panic.', milestone: 'Mini-mock gate', icon: '🍛', color: '#f97316', sourceModuleIds: SPINE_SOURCE_MODULE_IDS[4], checkpointHref: '/course/4/checkpoint' },
  { id: 5, title: 'Travel, services, health', promise: 'Directions, tickets, appointments, and the doctor.', milestone: 'Schreiben Teil 1 forms', icon: '🚆', color: '#3b82f6', sourceModuleIds: SPINE_SOURCE_MODULE_IDS[5], checkpointHref: '/course/5/checkpoint' },
  { id: 6, title: 'Work, free time, messages', promise: 'Talk about your work and hobbies. Write the 30-word message.', milestone: 'Schreiben Teil 2 + half-mock gate', icon: '💼', color: '#a855f7', sourceModuleIds: SPINE_SOURCE_MODULE_IDS[6], checkpointHref: '/course/6/checkpoint' },
  { id: 7, title: 'Official Germany', promise: 'Forms, notices, and office German without fear.', milestone: 'Exam-level reading + full mock', icon: '📋', color: '#14b8a6', sourceModuleIds: SPINE_SOURCE_MODULE_IDS[7], checkpointHref: '/course/7/checkpoint' },
  { id: 8, title: 'Goethe A1 Bootcamp', promise: 'Timed mocks, the speaking simulation, and your 7-day plan.', milestone: 'Exam-ready', icon: '🎓', color: '#f1d27a', sourceModuleIds: SPINE_SOURCE_MODULE_IDS[8], checkpointHref: '/course/8/checkpoint' },
];

export type SpineBlock = {
  id: string;
  kind: 'mission' | 'lesson' | 'mock' | 'checkpoint';
  title: string;
  href: string;
  duration?: string;
  done: boolean;
  /** optional blocks don't gate the checkpoint (e.g. extra mock practice) */
  optional?: boolean;
};

export type Module1CheckpointStored = {
  passedItemIds?: string[];
  percent: number;
  state: 'PASS' | 'WEAK' | 'FAIL';
  failedTags: string[];
  savedAt?: string;
};

export type SpineInputs = {
  completedLessons: LessonProgress[];
  spineCheckpoints: Record<number, SpineCheckpointResult>;
  module1MissionIds: Module1MissionId[];
  module2MissionIds: Module2MissionId[];
  module1Checkpoint: Module1CheckpointStored | null;
  mockResults: Record<string, MockGateResult>;
};

export type SpineModuleView = SpineModuleDef & {
  blocks: SpineBlock[];
  requiredBlocksDone: number;
  requiredBlocksTotal: number;
  checkpointResult: { state: 'PASS' | 'WEAK' | 'FAIL'; percent: number; failedTags: string[]; savedAt: number } | null;
  status: 'locked' | 'active' | 'complete';
};

export function readModule1CheckpointResult(): Module1CheckpointStored | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(MODULE1_CHECKPOINT_RESULT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.percent !== 'number' || typeof parsed.state !== 'string') return null;
    return parsed as Module1CheckpointStored;
  } catch {
    return null;
  }
}

function lessonDone(completed: LessonProgress[], lessonId: string) {
  return completed.some((l) => l.lessonId === lessonId);
}

function buildBlocks(def: SpineModuleDef, inputs: SpineInputs): SpineBlock[] {
  const blocks: SpineBlock[] = [];

  if (def.id === 1) {
    for (const mission of module1MissionCards) {
      blocks.push({
        id: `m1-${mission.id}`,
        kind: 'mission',
        title: mission.title,
        href: `${mission.href}?start=listen`,
        done: inputs.module1MissionIds.includes(mission.id),
      });
    }
  }

  if (def.id === 2) {
    for (const mission of module2MissionCards) {
      blocks.push({
        id: `m2-${mission.id}`,
        kind: 'mission',
        title: mission.title,
        href: `${mission.href}?start=listen`,
        done: inputs.module2MissionIds.includes(mission.id),
      });
    }
  }

  for (const sourceId of def.sourceModuleIds) {
    const source = ALL_MODULES.find((m) => m.id === sourceId);
    if (!source) continue;
    for (const lesson of source.lessons) {
      blocks.push({
        id: `lesson-${lesson.id}`,
        kind: 'lesson',
        title: lesson.title,
        // Immersive AdventurePlayer is the spine lesson player (DECISIONS #9);
        // the /learn textbook player redirects here.
        href: `/play/${source.id}/${lesson.id}`,
        duration: lesson.duration,
        done: lessonDone(inputs.completedLessons, lesson.id),
      });
    }
  }

  // Mock cadence: mini after M4, half after M6, full after M7, two finals in M8.
  // A gate counts as done once a result is saved and the band is above not-ready.
  for (const gate of getMockGatesForModule(def.id)) {
    const result = inputs.mockResults[gate.id];
    blocks.push({
      id: `mock-${gate.id}`,
      kind: 'mock',
      title: gate.title,
      href: `/tests/${gate.testId}?gate=${gate.id}`,
      duration: gate.durationLabel,
      done: !!result && result.band !== 'not-ready',
    });
  }

  const checkpointResult = getCheckpointResult(def.id, inputs);
  blocks.push({
    id: `checkpoint-${def.id}`,
    kind: 'checkpoint',
    title: def.id === 8 ? 'Final readiness check' : `Module ${def.id} checkpoint`,
    href: def.checkpointHref,
    done: checkpointResult !== null && checkpointResult.state !== 'FAIL',
  });

  return blocks;
}

function getCheckpointResult(moduleId: number, inputs: SpineInputs) {
  if (moduleId === 1) {
    const stored = inputs.module1Checkpoint;
    if (!stored) return null;
    return {
      state: stored.state,
      percent: stored.percent,
      failedTags: stored.failedTags ?? [],
      savedAt: stored.savedAt ? Date.parse(stored.savedAt) || 0 : 0,
    };
  }
  const result = inputs.spineCheckpoints[moduleId];
  if (!result) return null;
  return { state: result.state, percent: result.percent, failedTags: result.failedTags, savedAt: result.savedAt };
}

export function getSpineModules(inputs: SpineInputs): SpineModuleView[] {
  const views: SpineModuleView[] = [];
  let previousComplete = true;

  for (const def of SPINE_MODULES) {
    const blocks = buildBlocks(def, inputs);
    const required = blocks.filter((b) => !b.optional && b.kind !== 'checkpoint');
    const checkpointResult = getCheckpointResult(def.id, inputs);
    const complete = checkpointResult !== null && checkpointResult.state !== 'FAIL';
    const status: SpineModuleView['status'] = complete ? 'complete' : previousComplete ? 'active' : 'locked';

    views.push({
      ...def,
      blocks,
      requiredBlocksDone: required.filter((b) => b.done).length,
      requiredBlocksTotal: required.length,
      checkpointResult,
      status,
    });

    previousComplete = complete;
  }

  return views;
}

export type NextBlock = {
  module: SpineModuleView;
  block: SpineBlock;
};

/** The single next required action across the whole spine. */
export function getNextBlock(modules: SpineModuleView[]): NextBlock | null {
  for (const moduleView of modules) {
    if (moduleView.status === 'complete' || moduleView.status === 'locked') continue;
    const nextRequired = moduleView.blocks.find((b) => !b.optional && b.kind !== 'checkpoint' && !b.done);
    if (nextRequired) return { module: moduleView, block: nextRequired };
    const checkpoint = moduleView.blocks.find((b) => b.kind === 'checkpoint');
    if (checkpoint) return { module: moduleView, block: checkpoint };
  }
  return null;
}

export type SkillReadiness = { hoeren: number; sprechen: number; lesen: number; schreiben: number };

/** Per-skill readiness from saved checkpoint section scores (0 when no evidence yet). */
export function getSkillReadiness(inputs: SpineInputs): SkillReadiness {
  const samples: Record<keyof SkillReadiness, number[]> = { hoeren: [], sprechen: [], lesen: [], schreiben: [] };

  if (inputs.module1Checkpoint?.passedItemIds) {
    const m1 = scoreModule1Checkpoint(inputs.module1Checkpoint.passedItemIds);
    for (const skill of ['hoeren', 'sprechen', 'lesen', 'schreiben'] as const) {
      const section = m1.sectionScores[skill];
      if (section && section.total > 0) samples[skill].push(Math.round((section.earned / section.total) * 100));
    }
  }

  for (const result of Object.values(inputs.spineCheckpoints)) {
    for (const skill of ['hoeren', 'sprechen', 'lesen', 'schreiben'] as const) {
      const percent = result.sectionPercents?.[skill];
      if (typeof percent === 'number') samples[skill].push(percent);
    }
  }

  const average = (values: number[]) => (values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0);
  return {
    hoeren: average(samples.hoeren),
    sprechen: average(samples.sprechen),
    lesen: average(samples.lesen),
    schreiben: average(samples.schreiben),
  };
}

export type ActiveRecovery = {
  moduleId: number;
  state: 'WEAK' | 'FAIL';
  title: string;
  mustDo: string[];
  timeBoxMinutes: number;
  libraryHref?: string;
  libraryLabel?: string;
  retestHref: string;
};

/** The most recent weak/failed checkpoint's first matching recovery prescription. */
export function getActiveRecovery(inputs: SpineInputs): ActiveRecovery | null {
  type Candidate = { moduleId: number; state: 'WEAK' | 'FAIL'; failedTags: string[]; savedAt: number };
  const candidates: Candidate[] = [];

  const m1 = getCheckpointResult(1, inputs);
  if (m1 && (m1.state === 'WEAK' || m1.state === 'FAIL')) {
    candidates.push({ moduleId: 1, state: m1.state, failedTags: m1.failedTags, savedAt: m1.savedAt });
  }
  for (const result of Object.values(inputs.spineCheckpoints)) {
    if (result.state === 'WEAK' || result.state === 'FAIL') {
      candidates.push({ moduleId: result.moduleId, state: result.state, failedTags: result.failedTags, savedAt: result.savedAt });
    }
  }
  if (candidates.length === 0) return null;

  const latest = candidates.sort((a, b) => b.savedAt - a.savedAt)[0];

  if (latest.moduleId === 1) {
    const card = module1CheckpointRecoveryCards.find((c) => latest.failedTags.includes(c.weaknessTag));
    if (!card) return null;
    return {
      moduleId: 1,
      state: latest.state,
      title: card.title,
      mustDo: card.mustDo,
      timeBoxMinutes: card.timeBoxMinutes,
      retestHref: '/missions/module-1/checkpoint',
    };
  }

  const checkpoint = SPINE_CHECKPOINTS[latest.moduleId];
  if (!checkpoint) return null;
  const card = findRecoveryCards(checkpoint, latest.failedTags, 1)[0];
  if (!card) return null;
  return {
    moduleId: latest.moduleId,
    state: latest.state,
    title: card.title,
    mustDo: card.mustDo,
    timeBoxMinutes: card.timeBoxMinutes,
    libraryHref: card.libraryHref,
    libraryLabel: card.libraryLabel,
    retestHref: `/course/${latest.moduleId}/checkpoint`,
  };
}
