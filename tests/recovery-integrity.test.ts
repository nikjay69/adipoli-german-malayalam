import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  RECOVERY_PRESCRIPTIONS,
  recoveryPrescriptionsForTags,
  type RecoveryPrescription,
} from '../src/lib/recovery-prescriptions';
import {
  SPINE_CHECKPOINTS,
  findRecoveryCards,
  type CheckpointItem,
  type SpineCheckpoint,
} from '../src/lib/spine-checkpoints';
import {
  module1AdministeredCheckpoint,
  module1CheckpointRecoveryCards,
} from '../src/lib/missions/module1Checkpoint';
import { module1PracticeSets } from '../src/lib/missions/module1Practice';

const checkpoints = [module1AdministeredCheckpoint, ...Object.values(SPINE_CHECKPOINTS)];
const checkpointItems = checkpoints.flatMap((checkpoint) =>
  checkpoint.sections.flatMap((section) => section.items));
const miniCheckItems = module1PracticeSets.flatMap((practiceSet) => practiceSet.miniCheck.items);

const unique = <T>(values: T[]): T[] => [...new Set(values)];
const normalize = (value: string): string =>
  value.toLocaleLowerCase('de-DE').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

const emittedTags = unique([
  ...checkpointItems.flatMap((item) => item.weaknessTags),
  ...miniCheckItems.flatMap((item) => item.weaknessTags),
]).sort();
const registryTags = Object.keys(RECOVERY_PRESCRIPTIONS).sort();

assert.equal(checkpoints.length, 8, 'all eight module checkpoints must be covered');
assert.equal(checkpointItems.length, 64, 'the current checkpoint inventory changed; review recovery coverage');
assert.equal(miniCheckItems.length, 21, 'the current Module 1 mini-check inventory changed; review recovery coverage');
assert.equal(emittedTags.length, 60, 'the current emitted-tag inventory changed; add or remove a reviewed prescription');
assert.deepEqual(registryTags, emittedTags, 'registry must contain every emitted tag and no stale non-emitted tags');

function diagnosisAudio(item: CheckpointItem): string | undefined {
  if (item.task.kind === 'choice' || item.task.kind === 'type') return item.task.audioUrl;
  if (item.task.kind === 'production') return item.task.modelAudioUrl;
  return undefined;
}

const diagnosisTextByTag = new Map<string, Set<string>>();
const diagnosisAudioByTag = new Map<string, Set<string>>();
for (const item of checkpointItems) {
  for (const tag of item.weaknessTags) {
    const texts = diagnosisTextByTag.get(tag) ?? new Set<string>();
    texts.add(normalize(item.prompt));
    texts.add(normalize(item.task.question));
    diagnosisTextByTag.set(tag, texts);
    const audioUrl = diagnosisAudio(item);
    if (audioUrl) {
      const audio = diagnosisAudioByTag.get(tag) ?? new Set<string>();
      audio.add(audioUrl);
      diagnosisAudioByTag.set(tag, audio);
    }
  }
}
for (const item of miniCheckItems) {
  for (const tag of item.weaknessTags) {
    const texts = diagnosisTextByTag.get(tag) ?? new Set<string>();
    texts.add(normalize(item.prompt));
    diagnosisTextByTag.set(tag, texts);
  }
}

function routeExists(href: string): boolean {
  const route = href.split('?')[0];
  if (fs.existsSync(path.join(process.cwd(), 'src', 'app', ...route.split('/').filter(Boolean), 'page.tsx'))) {
    return true;
  }
  const dynamicRoutes = [
    { pattern: /^\/learn\/[^/]+$/, file: 'src/app/learn/[moduleId]/page.tsx' },
    { pattern: /^\/learn\/roleplay\/[^/]+$/, file: 'src/app/learn/roleplay/[scenarioId]/page.tsx' },
    { pattern: /^\/tests\/[^/]+$/, file: 'src/app/tests/[testId]/page.tsx' },
  ];
  return dynamicRoutes.some(({ pattern, file }) =>
    pattern.test(route) && fs.existsSync(path.join(process.cwd(), file)));
}

const allRetestIds = new Set<string>();
const allRetestPrompts = new Set<string>();
const allRetestSources = new Set<string>();
const bannedGenericCopy = /\b(?:revise more|review more|redo the checkpoint|try again later)\b/i;

for (const tag of emittedTags) {
  const prescription = RECOVERY_PRESCRIPTIONS[tag] as RecoveryPrescription | undefined;
  assert.ok(prescription, `${tag}: missing prescription`);
  assert.equal(prescription.weaknessTag, tag, `${tag}: registry key and payload must agree`);

  for (const [label, stage] of [['level 1', prescription], ['level 2', prescription.level2]] as const) {
    assert.ok(stage.method.trim().length >= 4, `${tag}: ${label} needs a named method`);
    assert.ok(stage.mustDo.length >= 2, `${tag}: ${label} needs at least two exact actions`);
    assert.ok(stage.mustDo.every((step) => step.trim().length >= 12), `${tag}: ${label} actions must be concrete`);
    assert.ok(stage.output.trim().length >= 12, `${tag}: ${label} needs observable output`);
    assert.ok(stage.timeBoxMinutes >= 4 && stage.timeBoxMinutes <= 20, `${tag}: ${label} time box must be bounded`);
    assert.ok(routeExists(stage.libraryHref), `${tag}: ${label} route does not exist: ${stage.libraryHref}`);
    assert.ok(!bannedGenericCopy.test([stage.method, stage.output, ...stage.mustDo].join(' ')), `${tag}: ${label} contains generic recovery copy`);
  }

  assert.notEqual(prescription.method, prescription.level2.method, `${tag}: level 2 must change the method`);
  assert.notEqual(prescription.libraryHref, prescription.level2.libraryHref, `${tag}: level 2 must use a different route`);
  assert.notDeepEqual(prescription.mustDo, prescription.level2.mustDo, `${tag}: level 2 tasks must differ`);
  assert.ok(prescription.retests.length >= 2, `${tag}: at least two fresh retests are required`);

  const tagDiagnosisText = diagnosisTextByTag.get(tag) ?? new Set<string>();
  const tagDiagnosisAudio = diagnosisAudioByTag.get(tag) ?? new Set<string>();
  const tagRetestAudio = new Set<string>();
  for (const retest of prescription.retests) {
    assert.ok(!allRetestIds.has(retest.id), `${tag}: duplicate retest id ${retest.id}`);
    allRetestIds.add(retest.id);
    const normalizedPrompt = normalize(retest.prompt);
    assert.ok(!allRetestPrompts.has(normalizedPrompt), `${tag}: duplicate retest prompt`);
    allRetestPrompts.add(normalizedPrompt);
    assert.ok(!tagDiagnosisText.has(normalizedPrompt), `${tag}: retest repeats the diagnosis prompt`);
    assert.ok(retest.expected.trim().length >= 2, `${tag}: retest needs expected evidence`);
    assert.ok(!allRetestSources.has(retest.sourceRef), `${tag}: retest source must be unique`);
    allRetestSources.add(retest.sourceRef);

    if (retest.mode === 'listen') {
      assert.ok(retest.audioUrl, `${tag}: listening retest needs native audio`);
      assert.ok(!tagDiagnosisAudio.has(retest.audioUrl), `${tag}: listening retest reuses diagnosis audio`);
      assert.ok(!tagRetestAudio.has(retest.audioUrl), `${tag}: both retests must use different audio`);
      tagRetestAudio.add(retest.audioUrl);
      assert.ok(
        fs.existsSync(path.join(process.cwd(), 'public', ...(retest.audioUrl ?? '').split('/').filter(Boolean))),
        `${tag}: retest audio is missing: ${retest.audioUrl}`,
      );
    }
  }
}

assert.equal(allRetestIds.size, 120, '60 emitted tags need two distinct retests each');

for (const checkpoint of checkpoints) {
  const tags = unique(checkpoint.sections.flatMap((section) =>
    section.items.flatMap((item) => item.weaknessTags)));
  for (const tag of tags) {
    const resolved = findRecoveryCards(checkpoint, [tag], 1);
    assert.equal(resolved.length, 1, `module ${checkpoint.moduleId}: ${tag} must resolve at runtime`);
    assert.equal(resolved[0].weaknessTag, tag, `module ${checkpoint.moduleId}: resolver returned the wrong tag`);
  }
}

const module1CheckpointTags = unique(
  module1AdministeredCheckpoint.sections.flatMap((section) =>
    section.items.flatMap((item) => item.weaknessTags)),
).sort();
assert.deepEqual(
  module1CheckpointRecoveryCards.map((card) => card.weaknessTag).sort(),
  module1CheckpointTags,
  'Module 1 checkpoint export must expose the complete canonical set',
);

for (const practiceSet of module1PracticeSets) {
  const tags = unique(practiceSet.miniCheck.items.flatMap((item) => item.weaknessTags)).sort();
  assert.deepEqual(
    practiceSet.recoveryCards.map((card) => card.weaknessTag).sort(),
    tags,
    `${practiceSet.id}: mini-check recovery cards must exactly match emitted tags`,
  );
}

assert.throws(
  () => recoveryPrescriptionsForTags(['not:a-real-tag']),
  /No recovery prescription/,
  'unknown tags must fail closed instead of falling back to generic review',
);

const checkpointRunner = fs.readFileSync(
  path.join(process.cwd(), 'src/components/checkpoint/AdministeredCheckpoint.tsx'),
  'utf8',
);
for (const requiredCopy of ['First repair', 'Fresh retests', 'If it misses again · switch the method']) {
  assert.ok(checkpointRunner.includes(requiredCopy), `checkpoint result must show ${requiredCopy}`);
}

console.log(
  `recovery integrity: ${emittedTags.length} emitted tags, ${allRetestIds.size} fresh retests, ` +
  'level-1 + different level-2 routes, zero orphans',
);
