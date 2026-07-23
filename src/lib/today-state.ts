import type { ActiveRecovery, NextBlock } from '@/lib/spine';

export type TodayStateKind =
  | 'fresh'
  | 'active'
  | 'review-due'
  | 'recovery'
  | 'checkpoint'
  | 'returning'
  | 'complete';

export type TodayState = {
  kind: TodayStateKind;
  kicker: string;
  heading: string;
  doorLabel: string;
  doorTitle: string;
  doorDescription: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export type TodayStateInputs = {
  next: NextBlock | null;
  recovery: ActiveRecovery | null;
  dueCards: number;
  hasLearningEvidence: boolean;
  lastActiveDate: string;
  now?: Date;
};

export const HEAVY_REVIEW_FLOOR = 8;
export const RETURNING_AFTER_DAYS = 3;

function startOfLocalDay(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
}

export function getDaysAway(lastActiveDate: string, now = new Date()) {
  if (!lastActiveDate) return 0;
  const previous = new Date(lastActiveDate);
  if (Number.isNaN(previous.getTime())) return 0;
  return Math.max(0, Math.round((startOfLocalDay(now) - startOfLocalDay(previous)) / 86_400_000));
}

function blockLabel(next: NextBlock) {
  const duration = next.block.duration ? ` · ${next.block.duration}` : '';
  return `Next · ${next.block.kind}${duration}`;
}

function blockCta(next: NextBlock) {
  if (next.block.kind === 'mission') return 'Enter the scene';
  if (next.block.kind === 'checkpoint') return "I'm ready — enter";
  if (next.block.kind === 'mock') return 'Start the mock';
  return 'Start the lesson';
}

export function buildTodayState({
  next,
  recovery,
  dueCards,
  hasLearningEvidence,
  lastActiveDate,
  now = new Date(),
}: TodayStateInputs): TodayState {
  if (!next) {
    return {
      kind: 'complete',
      kicker: 'All 8 flags sealed',
      heading: 'The path is complete. Stay sharp.',
      doorLabel: 'Readiness maintenance',
      doorTitle: 'Keep your exam evidence fresh.',
      doorDescription: 'Use timed mocks and speaking practice until exam day.',
      primaryHref: '/tests',
      primaryLabel: "Start today's practice",
      secondaryHref: '/course',
      secondaryLabel: 'Revisit the course',
    };
  }

  if (recovery) {
    const primaryHref = recovery.libraryHref ?? recovery.retestHref;
    return {
      kind: 'recovery',
      kicker: `Recovery day · Module ${recovery.moduleId}`,
      heading: 'Fix the exact weak spot, then retest.',
      doorLabel: `Recovery · ${recovery.timeBoxMinutes} min`,
      doorTitle: recovery.title,
      doorDescription: `${recovery.mustDo.length} focused ${recovery.mustDo.length === 1 ? 'task' : 'tasks'}. Your course progress stays safe.`,
      primaryHref,
      primaryLabel: recovery.libraryHref ? (recovery.libraryLabel ?? 'Start recovery') : 'Start the retest',
      secondaryHref: recovery.libraryHref ? recovery.retestHref : '/course',
      secondaryLabel: recovery.libraryHref ? 'Retest when ready' : 'View the course',
    };
  }

  const daysAway = hasLearningEvidence ? getDaysAway(lastActiveDate, now) : 0;
  if (daysAway >= RETURNING_AFTER_DAYS) {
    const hasReview = dueCards > 0;
    return {
      kind: 'returning',
      kicker: `Welcome back · ${daysAway} days away`,
      heading: 'Good to see you. Warm up, then resume.',
      doorLabel: hasReview ? `5-min refresher · ${dueCards} cards due` : 'Your next scene is still here',
      doorTitle: hasReview ? 'Bring the last German back to the surface.' : next.block.title,
      doorDescription: hasReview
        ? 'Oldest cards first. No guilt and no lost progress.'
        : 'Nothing was reset. Continue exactly where you stopped.',
      primaryHref: hasReview ? '/practice/review' : next.block.href,
      primaryLabel: hasReview ? 'Warm up for 5 minutes' : blockCta(next),
      secondaryHref: hasReview ? next.block.href : '/course',
      secondaryLabel: hasReview ? `Skip — resume ${next.block.title}` : 'View the course',
    };
  }

  if (next.block.kind === 'checkpoint') {
    return {
      kind: 'checkpoint',
      kicker: `Module ${next.module.id} · All required blocks done`,
      heading: `Time to prove Module ${next.module.id}.`,
      doorLabel: `Closed checkpoint${next.block.duration ? ` · ${next.block.duration}` : ''}`,
      doorTitle: next.block.title,
      doorDescription: 'Closed book. Finish this proof to open the next flag.',
      primaryHref: next.block.href,
      primaryLabel: "I'm ready — enter",
      secondaryHref: dueCards > 0 ? '/practice/review' : '/course',
      secondaryLabel: dueCards > 0 ? `Warm up with ${Math.min(dueCards, 5)} review cards` : 'Review the module first',
    };
  }

  if (dueCards >= HEAVY_REVIEW_FLOOR) {
    return {
      kind: 'review-due',
      kicker: `Memory first · Module ${next.module.id} of 8`,
      heading: 'Five minutes of memory first.',
      doorLabel: `Review · ${dueCards} cards due · 5 min`,
      doorTitle: 'Can the last German still arrive instantly?',
      doorDescription: 'Weakest cards first. Then your next scene stays ready.',
      primaryHref: '/practice/review',
      primaryLabel: 'Start review',
      secondaryHref: next.block.href,
      secondaryLabel: `Then: ${next.block.title}`,
    };
  }

  if (!hasLearningEvidence) {
    return {
      kind: 'fresh',
      kicker: `Day 1 · Module ${next.module.id}`,
      heading: 'Your first day. One door.',
      doorLabel: blockLabel(next),
      doorTitle: next.block.title,
      doorDescription: next.module.promise,
      primaryHref: next.block.href,
      primaryLabel: blockCta(next),
      secondaryHref: '/course',
      secondaryLabel: 'See the eight-module path',
    };
  }

  return {
    kind: 'active',
    kicker: `Module ${next.module.id} of 8`,
    heading: 'Continue where you left off.',
    doorLabel: blockLabel(next),
    doorTitle: next.block.title,
    doorDescription: next.module.promise,
    primaryHref: next.block.href,
    primaryLabel: blockCta(next),
    secondaryHref: '/course',
    secondaryLabel: 'View the course',
  };
}
