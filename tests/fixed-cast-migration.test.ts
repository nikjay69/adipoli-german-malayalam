import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

import { ALL_MODULES } from '../src/lib/content/modules';
import {
  CAST_COMPATIBILITY_IDS,
  CAST_COMPATIBILITY_ROUTES,
  FIXED_CAST,
} from '../src/lib/cast';

const root = process.cwd();
const text = (path: string) => readFileSync(resolve(root, path), 'utf8');
const sha256 = (path: string) => createHash('sha256').update(readFileSync(resolve(root, path))).digest('hex').toUpperCase();

assert.deepEqual(
  Object.fromEntries(Object.entries(FIXED_CAST).map(([id, member]) => [id, [member.displayName, member.role]])),
  {
    nivin: ['Nivin', 'learner-peer'],
    meera: ['Meera', 'learner-peer'],
    frauFischer: ['Frau Fischer', 'teacher'],
    appu: ['Appu', 'silent-mascot'],
  },
);
assert.deepEqual(CAST_COMPATIBILITY_IDS, { kuttan: 'nivin', frauWeber: 'frauFischer' });
assert.equal(CAST_COMPATIBILITY_ROUTES.missionId.greetFrauWeber.canonicalLabel, 'greetFrauFischer');
assert.equal(CAST_COMPATIBILITY_ROUTES.route['/missions/module-1/greet-frau-weber'].cast, 'frauFischer');

let storyLessonCount = 0;
for (const courseModule of ALL_MODULES) {
  const owners: string[] = [];
  courseModule.lessons.forEach((lesson, lessonIndex) => {
    if (!lesson.storyScene) return;
    storyLessonCount += 1;
    const expectedOwner = lessonIndex % 2 === 0 ? 'nivin' : 'meera';
    assert.equal(lesson.storyScene.learnerOwner, expectedOwner, `${lesson.id} must follow strict module-local alternation`);
    owners.push(lesson.storyScene.learnerOwner);
    assert.ok(lesson.storyScene.peerIntro.length > 0, `${lesson.id} must have an owned peer intro`);
    for (const decision of lesson.storyScene.decisionPoints) {
      for (const option of decision.options) assert.equal(typeof option.peerReaction, 'string');
    }
    const serialized = JSON.stringify(lesson);
    assert.doesNotMatch(serialized, /Kuttan|Frau Weber|kuttanIntro|kuttanReaction|K-U-T-T-A-N|KUTTAN/);
  });
  for (let index = 1; index < owners.length; index += 1) {
    assert.notEqual(owners[index], owners[index - 1], `module ${courseModule.id} must not repeat a peer owner`);
  }
}
assert.equal(storyLessonCount, 91);

const allModuleText = ALL_MODULES.map((module) => JSON.stringify(module)).join('\n');
for (const inheritedProfile of [
  'Nivin is unmarried',
  'born 15 March 1998',
  'Meera Nair',
  'Nivin Kumar',
  'Reply as Nivin, a student',
  'Meera from Kochi, Kerala',
  'Ausbildung dream',
]) {
  assert.ok(!allModuleText.includes(inheritedProfile), `legacy résumé detail escaped migration: ${inheritedProfile}`);
}

const meeraSource = 'docs/reference/assets/meera/meera-production-cutout-v1.png';
const meeraRuntime = 'public/images/characters/meera-presenting.png';
assert.ok(existsSync(resolve(root, meeraRuntime)), 'approved Meera cutout must ship at runtime');
assert.equal(sha256(meeraRuntime), sha256(meeraSource), 'runtime Meera must remain byte-exact to the approved cutout');

function filesUnder(path: string): string[] {
  const absolute = resolve(root, path);
  return readdirSync(absolute).flatMap((entry) => {
    const child = join(absolute, entry);
    return statSync(child).isDirectory() ? filesUnder(relative(root, child)) : [relative(root, child).replaceAll('\\', '/')];
  });
}

const compatibilityFiles = new Set([
  'src/components/character/Kuttan.tsx',
  'src/components/character/KuttanImage.tsx',
  'src/components/character/KuttanSpeech.tsx',
  'src/components/character/FrauWeber.tsx',
  'src/components/character/index.ts',
]);
const shippingSourceFiles = filesUnder('src').filter((path) =>
  /\.(ts|tsx)$/.test(path) &&
  !path.startsWith('src/remotion/') &&
  !path.startsWith('src/app/games/') &&
  !compatibilityFiles.has(path)
);
for (const path of shippingSourceFiles) {
  assert.doesNotMatch(text(path), /Kuttan|Frau Weber|K-U-T-T-A-N|KUTTAN/, `${path} exposes a legacy cast name`);
}

const currentProductionFiles = [
  ...filesUnder('course-production/a1-mvp/module-01').filter((path) => path.endsWith('.md')),
  'scripts/m1-video-defs.json',
  'scripts/props/module1-v13-native-de-tts-2026-05-23.json',
  'scripts/props/mission-native-de-tts-2026-05-23.json',
  'scripts/props/mission-native-de-dialogue-tts-2026-05-23.json',
  'scripts/props/pimsleur-ep-01.json',
  'scripts/props/pimsleur-ep-02.json',
  'scripts/props/pimsleur-ep-03.json',
];
for (const path of currentProductionFiles) {
  assert.doesNotMatch(text(path), /Kuttan|Frau Weber|K-U-T-T-A-N|KUTTAN/, `${path} still freezes a legacy cast name`);
}

for (let lesson = 1; lesson <= 7; lesson += 1) {
  const path = `course-production/a1-mvp/module-01/lesson-${String(lesson).padStart(2, '0')}-video-script.md`;
  const owner = lesson % 2 === 1 ? 'Nivin' : 'Meera';
  const other = owner === 'Nivin' ? 'Meera' : 'Nivin';
  assert.match(text(path), new RegExp(owner), `${path} must include its assigned peer`);
  assert.doesNotMatch(text(path), new RegExp(other), `${path} must have one peer owner`);
}
assert.doesNotMatch(text('course-production/a1-mvp/module-01/lesson-02-video-script.md'), /Meera's reason is|Meera's tick|Ausbildung dream/);
assert.match(text('scripts/props/pimsleur-ep-03.json'), /separate sample candidate/);

for (const removedAudio of [
  'public/audio/missions/module-2/self-intro/ich-heisse-kuttan.mp3',
  'public/audio/missions/module-2/dialogue/spell-kuttan-model.mp3',
  'public/audio/missions/module-2/dialogue/spell-clarify-k-wie-kaiser.mp3',
]) {
  assert.ok(!existsSync(resolve(root, removedAudio)), `${removedAudio} must not ship`);
}
for (const newAudio of [
  'public/audio/missions/module-2/self-intro/ich-heisse-meera.mp3',
  'public/audio/missions/module-2/dialogue/spell-meera-model.mp3',
  'public/audio/pimsleur/episode-01.mp3',
  'public/audio/pimsleur/episode-02.mp3',
  'public/audio/pimsleur/episode-03.mp3',
]) {
  assert.ok(existsSync(resolve(root, newAudio)), `${newAudio} must exist`);
}

assert.doesNotMatch(text('src/lib/engagement/surprise-engine.ts'), /appu_trick|Appu says|kuttan_joke/);

console.log('fixed cast migration: owners, runtime visuals, active copy, scripts, and spoken-name assets verified');
