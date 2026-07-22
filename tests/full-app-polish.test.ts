import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

const foundation = read('src/styles/foundation.css');
const globals = read('src/app/globals.css');
const navigation = read('src/components/layout/Navigation.tsx');
const course = read('src/app/course/page.tsx');
const practice = read('src/app/practice/page.tsx');
const testsHub = read('src/app/tests/page.tsx');
const chat = read('src/app/practice/chat/page.tsx');
const speak = read('src/app/practice/speak/page.tsx');
const pronunciation = read('src/app/practice/pronunciation/page.tsx');
const conversation = read('src/app/practice/conversation/page.tsx');
const shadowing = read('src/app/practice/shadowing/page.tsx');

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
assert.match(course, /className=\{`min-w-0 rounded-3xl/, 'course cards must shrink inside the phone grid');
assert.match(course, /mt-3 grid min-w-0/, 'course block grids must shrink inside their cards');
assert.match(course, /className=\{`min-w-0 flex items-center/, 'course block links must not force card overflow');

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
