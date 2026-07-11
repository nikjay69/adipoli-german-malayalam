import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  module1AdministeredCheckpoint,
  module1CheckpointItems,
  scoreModule1Checkpoint,
} from '../src/lib/missions/module1Checkpoint';

const items = module1CheckpointItems;
const ids = items.map((item) => item.id);

assert.equal(items.length, 10, 'Module 1 should stay a concise 10-task diagnostic');
assert.equal(new Set(ids).size, ids.length, 'checkpoint task ids must be unique');
assert.equal(items.every((item) => !!item.task), true, 'every item must administer a real task');
assert.equal(items.filter((item) => item.task.kind === 'production').length, 2, 'two real speaking productions are required');
assert.equal(items.filter((item) => (item.task.kind === 'choice' || item.task.kind === 'type') && !!item.task.audioUrl).length, 3, 'three genuine audio tasks are required');
assert.deepEqual(module1AdministeredCheckpoint.sectionFloorForPass, { hoeren: 50, sprechen: 50 });

const perfect = scoreModule1Checkpoint(ids);
assert.equal(perfect.state, 'PASS');
assert.equal(perfect.percent, 100);

const requiredSpeakingMiss = scoreModule1Checkpoint(ids.filter((id) => id !== 'm1-s-full-greeting'));
assert.equal(requiredSpeakingMiss.percent, 80);
assert.equal(requiredSpeakingMiss.state, 'FAIL', 'missing required spoken reply must fail despite a high total');
assert.equal(requiredSpeakingMiss.failedTags.includes('sprechen:greeting_reply'), true);

const noListening = scoreModule1Checkpoint(ids.filter((id) => !id.startsWith('m1-h-')));
assert.equal(noListening.percent, 70);
assert.equal(noListening.state, 'FAIL', 'Hören below the 50% floor must fail');
assert.equal(noListening.failedTags.includes('hoeren:greetings'), true);

const weakPassIds = [
  'm1-h-greeting-set',
  'm1-h-formal-opener',
  'm1-s-full-greeting',
  'm1-s-polite-exit',
  'm1-w-first-sentence',
];
assert.equal(scoreModule1Checkpoint(weakPassIds).state, 'WEAK', '60–69% with skill floors met is a weak pass');

const pageSource = fs.readFileSync(path.join(process.cwd(), 'src/app/missions/module-1/checkpoint/page.tsx'), 'utf8');
assert.equal(pageSource.includes('Mark all passed'), false, 'self-mark shortcut must never return');
assert.equal(pageSource.includes('Expected:'), false, 'answers must not render on the checkpoint page');
assert.equal(pageSource.includes('AdministeredCheckpoint'), true, 'Module 1 must use the shared administered runner');

const runnerSource = fs.readFileSync(path.join(process.cwd(), 'src/components/checkpoint/AdministeredCheckpoint.tsx'), 'utf8');
assert.equal(runnerSource.includes('Play the audio before answering.'), true, 'audio choices must remain gated');
assert.equal(runnerSource.includes('Response locked.'), true, 'objective answers should lock without teaching mid-checkpoint');
assert.equal(runnerSource.includes("onResult={(transcript, _, matched) => finishItem(matched, transcript)}"), true, 'speech-target tasks must be scored from the recognized response');
assert.equal(runnerSource.includes('Mic unavailable? I completed it aloud.'), false, 'Module 1 speaking must never accept an unverifiable self-attestation');
assert.equal(runnerSource.includes('Continue without microphone — counts as not passed'), true, 'an unavailable microphone must not silently award speaking points');

console.log('module 1 checkpoint: administered, concise, gated, scored, recovery-tagged');
