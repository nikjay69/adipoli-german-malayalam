import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

const foundation = read('src/styles/foundation.css');
const globals = read('src/app/globals.css');
const navigation = read('src/components/layout/Navigation.tsx');
const course = read('src/app/course/page.tsx');
const courseStyles = read('src/app/course/Course.module.css');
const practice = read('src/app/practice/page.tsx');
const testsHub = read('src/app/tests/page.tsx');
const chat = read('src/app/practice/chat/page.tsx');
const speak = read('src/app/practice/speak/page.tsx');
const pronunciation = read('src/app/practice/pronunciation/page.tsx');
const conversation = read('src/app/practice/conversation/page.tsx');
const shadowing = read('src/app/practice/shadowing/page.tsx');
const onboarding = read('src/app/onboarding/page.tsx');
const profile = read('src/app/profile/page.tsx');
const vocabulary = read('src/app/vocabulary/page.tsx');
const plan = read('src/app/plan/page.tsx');
const testRunner = read('src/app/tests/[testId]/page.tsx');
const missionUi = read('src/app/missions/module-2/_components/MissionUI.tsx');
const gameRenderer = read('src/components/game-engine/GameRenderer.tsx');
const button = read('src/components/ui/Button.tsx');
const practiceLayout = read('src/app/practice/layout.tsx');
const scriptsLayout = read('src/app/scripts/layout.tsx');
const scriptDetail = read('src/app/scripts/[moduleId]/page.tsx');

assert.match(
  foundation,
  /\.ag-touch-target\s*\{[\s\S]*?min-width:\s*44px;[\s\S]*?min-height:\s*44px;[\s\S]*?touch-action:\s*manipulation;/,
  'compact controls must retain a 44px touch target',
);
assert.match(
  globals,
  /@media \(max-width:\s*767px\)[\s\S]*?:where\(input, textarea, select\)[\s\S]*?font-size:\s*max\(16px, 1em\);/,
  'mobile learner fields must not trigger iOS focus zoom',
);
assert.match(navigation, /max-w-xl/, 'desktop navigation must stay visually bounded');
assert.match(navigation, /aria-current=\{isActive \? 'page' : undefined\}/, 'active navigation must be announced');
assert.match(course, /ag-foundation-shell ag-daylight/, 'Course must use the bounded daylight learner shell');
assert.match(course, /className=\{styles\.moduleGrid\}/, 'Course must keep the eight flags inside one bounded grid');
assert.match(courseStyles, /\.moduleCard\s*\{[\s\S]*?min-width:\s*0;/, 'course flags must shrink inside the phone layout');
assert.match(courseStyles, /overflow-x:\s*clip;/, 'Course must not create horizontal phone scroll');
assert.match(onboarding, /overflow-x-clip/, 'onboarding decoration must not create horizontal viewport scroll');
assert.match(button, /min-h-11/, 'shared buttons must retain a 44px minimum height');
assert.match(gameRenderer, /ag-touch-target[\s\S]*?aria-label="Leave lesson"/, 'lesson exit must expose a 44px touch target');
assert.doesNotMatch(plan, /<Link href="\/profile">\s*<Button/, 'plan back action must not nest a button inside a link');
assert.match(profile, /useSpineProgress/, 'profile progress must use the canonical eight-module spine');
assert.doesNotMatch(profile, /ALL_MODULES/, 'profile must not expose the legacy 18-module library as the course path');
assert.match(profile, /href=\{`\/course\/\$\{module\.id\}`\}/, 'profile module links must return to the canonical course path');

for (const [path, source] of [
  ['onboarding', onboarding],
  ['practice routes', practiceLayout],
  ['profile', profile],
  ['vocabulary', vocabulary],
  ['plan', plan],
  ['tests', testsHub],
  ['test runner', testRunner],
  ['mission shell', missionUi],
  ['lesson player', gameRenderer],
  ['scripts routes', scriptsLayout],
] as const) {
  assert.match(source, /<main id="main-content"/, `${path} must expose the global skip-link target as its main landmark`);
}
assert.match(scriptDetail, /print-vocab-scroll/, 'script vocabulary tables must scroll inside their own mobile region');

for (const [path, source] of [
  ['learn', read('src/app/learn/page.tsx')],
  ['on-the-go', read('src/app/on-the-go/page.tsx')],
  ['scripts', read('src/app/scripts/page.tsx')],
  ['privacy', read('src/app/privacy/page.tsx')],
  ['simulator', read('src/app/practice/simulator/page.tsx')],
  ['review', read('src/app/practice/review/page.tsx')],
  ['write', read('src/app/practice/write/page.tsx')],
  ['intro practice', read('src/app/practice/intro/page.tsx')],
  ['test runner', read('src/app/tests/[testId]/page.tsx')],
] as const) {
  assert.match(source, /ag-touch-target/, `${path} must expose its compact control as a full touch target`);
}

assert.match(practice, /aria-label="Back to home"/, 'practice icon-only back control needs an accessible name');
assert.match(testsHub, /aria-label="Back to home"/, 'tests icon-only back control needs an accessible name');
assert.match(chat, /aria-label="Back to practice"/, 'chat back control needs an accessible name');
assert.match(chat, /aria-label="Send message"/, 'chat send control needs an accessible name');
assert.match(speak, /aria-label="Leave speaking practice"/, 'speaking exit control needs an accessible name');
assert.match(speak, /aria-label="Back to practice"/, 'speaking back control needs an accessible name');
assert.match(pronunciation, /aria-label=\{isListening \? 'Stop listening' : 'Start listening'\}/, 'microphone state needs an accessible name');
assert.match(conversation, /aria-label=\{state === 'scenario_select' \? 'Back to practice' : 'Back to scenarios'\}/, 'conversation back control needs context');
assert.match(shadowing, /aria-label="Leave shadowing practice"/, 'shadowing exit control needs an accessible name');

console.log('full-app polish: bounded layouts, 44px targets, accessible icon controls, and mobile fields verified');
