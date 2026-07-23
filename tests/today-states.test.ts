import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import type { ActiveRecovery, NextBlock, SpineModuleView } from '../src/lib/spine';
import {
  buildTodayState,
  getDaysAway,
  HEAVY_REVIEW_FLOOR,
  RETURNING_AFTER_DAYS,
} from '../src/lib/today-state';

const root = process.cwd();
const now = new Date(2026, 6, 23, 12);

const activeModule: SpineModuleView = {
  id: 2,
  title: 'Identity, numbers, time',
  promise: 'Introduce yourself like a Goethe candidate. Catch numbers and times.',
  milestone: 'Sprechen Teil 1 foundation',
  icon: '2',
  color: '#b2467f',
  sourceModuleIds: [1],
  checkpointHref: '/course/2/checkpoint',
  blocks: [],
  requiredBlocksDone: 2,
  requiredBlocksTotal: 7,
  checkpointResult: null,
  status: 'active',
};

const activeNext: NextBlock = {
  module: activeModule,
  block: {
    id: 'm2-numbers',
    kind: 'mission',
    title: "Numbers you'll actually hear",
    href: '/missions/module-2/numbers',
    duration: '6 min',
    done: false,
  },
};

const checkpointNext: NextBlock = {
  module: activeModule,
  block: {
    id: 'checkpoint-2',
    kind: 'checkpoint',
    title: 'Module 2 checkpoint',
    href: '/course/2/checkpoint',
    duration: '20 min',
    done: false,
  },
};

const recovery: ActiveRecovery = {
  moduleId: 1,
  state: 'FAIL',
  title: 'Greeting + adult register',
  mustDo: ['Say the greeting aloud', 'Repair du vs. Sie'],
  timeBoxMinutes: 6,
  libraryHref: '/practice/speak',
  libraryLabel: 'Start speaking repair',
  retestHref: '/missions/module-1/checkpoint',
};

const common = {
  next: activeNext,
  recovery: null,
  dueCards: 0,
  hasLearningEvidence: true,
  lastActiveDate: now.toDateString(),
  now,
};

const states = [
  buildTodayState({ ...common, hasLearningEvidence: false }),
  buildTodayState(common),
  buildTodayState({ ...common, dueCards: HEAVY_REVIEW_FLOOR }),
  buildTodayState({ ...common, recovery }),
  buildTodayState({ ...common, next: checkpointNext }),
  buildTodayState({
    ...common,
    dueCards: 6,
    lastActiveDate: new Date(2026, 6, 23 - RETURNING_AFTER_DAYS).toDateString(),
  }),
  buildTodayState({ ...common, next: null }),
];

assert.deepEqual(
  states.map((state) => state.kind),
  ['fresh', 'active', 'review-due', 'recovery', 'checkpoint', 'returning', 'complete'],
  'the Today contract must derive all seven approved states',
);

assert.equal(states[0].primaryHref, activeNext.block.href, 'fresh learners must enter the real next block');
assert.equal(states[2].primaryHref, '/practice/review', 'heavy review must own the door');
assert.equal(states[3].primaryHref, recovery.libraryHref, 'prescribed recovery must own the door');
assert.equal(states[4].primaryHref, checkpointNext.block.href, 'checkpoint-ready learners must enter the checkpoint');
assert.equal(states[5].secondaryHref, activeNext.block.href, 'returning learners may skip the refresher without losing their place');
assert.equal(states[6].primaryHref, '/tests', 'completed learners must maintain readiness');

assert.equal(
  buildTodayState({
    ...common,
    recovery,
    dueCards: HEAVY_REVIEW_FLOOR + 4,
    lastActiveDate: new Date(2026, 6, 1).toDateString(),
  }).kind,
  'recovery',
  'mandatory recovery must outrank review and return-state suggestions',
);

assert.equal(getDaysAway('', now), 0, 'a fresh learner has no days-away penalty');
assert.equal(getDaysAway('not-a-date', now), 0, 'invalid legacy dates must fail safely');
assert.equal(
  getDaysAway(new Date(2026, 6, 20).toDateString(), now),
  3,
  'return detection must compare local calendar days',
);

const todayPage = fs.readFileSync(path.join(root, 'src/app/learn/page.tsx'), 'utf8');
const todayStyles = fs.readFileSync(path.join(root, 'src/app/learn/Today.module.css'), 'utf8');

assert.ok(todayPage.includes('ag-foundation-shell ag-daylight'), 'Today must use the approved daylight learner shell');
assert.ok(todayPage.includes('data-today-state={todayState.kind}'), 'the derived state must be inspectable in browser evidence');
assert.ok(todayPage.includes("process.env.NODE_ENV === 'development'"), 'state preview overrides must remain development-only');
assert.ok(todayPage.includes('From checkpoint evidence, not clicks.'), 'skill bars must describe evidence honestly');
assert.ok(todayPage.includes('Your first greeting is saved.'), 'post-onboarding Today must acknowledge the first win without falsely sealing the full mission');
assert.ok(!todayPage.includes('Practice library (all lessons)'), 'Today must not expand into a legacy library dashboard');
assert.ok(todayStyles.includes('min-height: 48px'), 'the dominant action must preserve a generous touch target');
assert.match(
  todayStyles,
  /padding-bottom:\s*calc\(120px \+ env\(safe-area-inset-bottom,\s*0px\)\);/,
  'Today must fit a common phone viewport while preserving fixed-nav and device-safe-area clearance',
);
assert.match(
  todayStyles,
  /@media \(max-width:\s*559px\) and \(max-height:\s*780px\)[\s\S]*?padding-top:\s*16px;[\s\S]*?padding-bottom:\s*calc\(112px \+ env\(safe-area-inset-bottom,\s*0px\)\);[\s\S]*?min-height:\s*236px;/,
  'Today must retain its full hierarchy in the shorter viewport left by iPhone browser chrome',
);
assert.ok(todayStyles.includes('@media (prefers-reduced-motion: reduce)'), 'Today must respect reduced motion');

console.log('today states: seven calm doors, priority law, safe return, and daylight shell verified');
