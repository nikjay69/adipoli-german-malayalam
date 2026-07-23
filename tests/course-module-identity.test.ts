import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { SPINE_MODULES } from '../src/lib/spine';

const root = process.cwd();
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const expectedIdentity = [
  [1, '#e94560', 'hub-goethe-kochi-classroom.jpg'],
  [2, '#b2467f', 'hub-study-desk.jpg'],
  [3, '#7a8b2f', 'hub-thrissur-home.jpg'],
  [4, '#f97316', 'hub-chayakkada.jpg'],
  [5, '#3b82f6', 'hub-dream-platform.jpg'],
  [6, '#a855f7', 'hub-video-call-wg.jpg'],
  [7, '#14b8a6', 'hub-amt-office.jpg'],
  [8, '#102018', 'hub-exam-hall.jpg'],
] as const;

assert.equal(SPINE_MODULES.length, 8, 'the learner route must remain exactly eight modules');

for (const [index, module] of SPINE_MODULES.entries()) {
  const [id, color, sceneFile] = expectedIdentity[index];
  assert.equal(module.id, id, `module ${id} must keep its route position`);
  assert.equal(module.color.toLowerCase(), color, `module ${id} must use the approved safe accent`);
  assert.ok(module.scene.src.endsWith(sceneFile), `module ${id} must use its approved scene anchor`);
  assert.ok(module.scene.label.length > 3, `module ${id} must name its scene`);
  assert.ok(module.promise.length > 20, `module ${id} must state a real learner outcome`);
  assert.ok(module.examTransfer.length > 20, `module ${id} must explain its exam transfer`);
}

assert.equal(
  new Set(SPINE_MODULES.map((module) => module.scene.src)).size,
  8,
  'every module must remain visually distinguishable by scene',
);

const coursePage = read('src/app/course/page.tsx');
const courseStyles = read('src/app/course/Course.module.css');
const modulePage = read('src/app/course/[moduleId]/page.tsx');
const moduleStyles = read('src/app/course/[moduleId]/ModulePage.module.css');

for (const state of ['complete', 'current', 'checkpoint', 'recovery', 'read-ahead']) {
  assert.ok(coursePage.includes(`'${state}'`), `Course must render the written ${state} state`);
  assert.ok(modulePage.includes(`'${state}'`), `module pages must render the written ${state} state`);
}

assert.ok(coursePage.includes('Peek ahead freely. Gates only block doing.'), 'Course must explain guided-forward/open-backward behavior');
assert.ok(coursePage.includes('href={`/course/${module.id}`}'), 'every flag must open the shared module template');
assert.ok(coursePage.includes('data-finale={isFinale || undefined}'), 'Module 8 must keep its finale identity');
assert.ok(
  coursePage.includes('variant="reversed"') && coursePage.includes('variant="mono-black"'),
  'the current Continue action must use approved high-contrast Triangle-A variants on dark and gold surfaces',
);
assert.ok(
  courseStyles.includes('transform: rotate(90deg);') &&
    courseStyles.includes('transform: translateX(3px) rotate(90deg);'),
  'the owner-approved Continue-only Triangle-A experiment must point right while preserving its invitation motion',
);
assert.ok(
  courseStyles.includes('bottom: 8px;') && courseStyles.includes('bottom: 3px;'),
  'module numerals must remain fully visible on desktop scenes and phone thumbnails',
);
assert.ok(
  coursePage.includes('activeModule.requiredBlocksDone / activeModule.requiredBlocksTotal'),
  'the route bar must advance with completed blocks inside the current module',
);
assert.ok(!coursePage.includes('opacity-60'), 'read-ahead modules must stay fully legible');
assert.match(courseStyles, /grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);/, 'desktop Course must preserve the approved four-flag row');
assert.match(courseStyles, /\.page\s*\{[\s\S]*?z-index:\s*40;/, 'Course must sit below the fixed learner navigation');
assert.match(courseStyles, /@media \(max-width:\s*767px\)[\s\S]*?\.moduleGrid\s*\{[\s\S]*?flex-direction:\s*column;/, 'phone Course must become the approved compact route list');
assert.match(courseStyles, /padding-bottom:\s*calc\(118px \+ env\(safe-area-inset-bottom,\s*0px\)\);/, 'phone Course must clear the fixed navigation and safe area');
assert.match(courseStyles, /\.moduleCard\[data-finale\]\[data-state="read-ahead"\]/, 'the locked finale must stay distinct without looking like a second current module');
assert.equal(
  courseStyles.match(/\.moduleCard\[data-finale\]\[data-state="read-ahead"\]\s*\{/g)?.length,
  2,
  'the locked finale treatment must be explicit on both desktop and phone',
);
assert.match(
  courseStyles,
  /\.moduleCard\[data-finale\]\[data-state="read-ahead"\]\s*\{[^}]*box-shadow:\s*none;/,
  'the phone finale must stay softly distinct without a heavy enclosing border',
);
assert.match(courseStyles, /\.moduleCard\[data-finale\]\[data-state="current"\][\s\S]*?background:\s*var\(--ag-forest-deep\);/, 'the finale may become a full dark threshold when it is current');
assert.ok(courseStyles.includes('@keyframes moduleArrive'), 'Course flags must have a restrained entry cue');
assert.ok(courseStyles.includes('@keyframes questRing'), 'the current quest action must have one restrained game-like cue');
assert.ok(courseStyles.includes('@media (prefers-reduced-motion: reduce)'), 'Course motion must have a reduced-motion path');

assert.ok(modulePage.includes('data-module-state={pageState}'), 'module state must be inspectable in browser evidence');
assert.ok(modulePage.includes('Titles stay readable. The gate blocks doing, not curiosity.'), 'read-ahead must reveal titles without opening work');
assert.ok(modulePage.includes("const canOpen = block.done || isNext"), 'only completed or next-required work may launch');
assert.ok(modulePage.includes('Everything completed stays open to revisit.'), 'completed work must remain openly revisitable');
assert.ok(modulePage.includes('moduleRecovery.mustDo.slice(0, 3)'), 'recovery state must show exact prescribed work');
assert.match(moduleStyles, /\.hero\s*\{[\s\S]*?background:\s*var\(--ag-forest-mid\);/, 'the module threshold must remain a purposeful dark room');
assert.match(moduleStyles, /\.page\s*\{[\s\S]*?z-index:\s*40;/, 'module pages must sit below the fixed learner navigation');
assert.match(moduleStyles, /\.workingArea\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)\s*304px;/, 'desktop module pages must keep the path primary and evidence secondary');
assert.match(moduleStyles, /@media \(max-width:\s*767px\)[\s\S]*?\.workingArea\s*\{[\s\S]*?flex-direction:\s*column;/, 'module pages must become a clear phone sequence');
assert.ok(moduleStyles.includes('@keyframes heroSettle'), 'module thresholds must enter with calm scene motion');
assert.ok(moduleStyles.includes('@media (prefers-reduced-motion: reduce)'), 'module pages must respect reduced motion');

console.log('course module identity: eight scenes, one template, five explicit states, and guided-forward/open-backward verified');
