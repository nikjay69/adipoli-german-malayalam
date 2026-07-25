import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { GOETHE_TESTS } from '../src/lib/content/goethe-tests';
import {
  evaluateA1Readiness,
  type A1ReadinessInput,
} from '../src/lib/a1-readiness';
import {
  auditInternalMockBank,
  OFFICIAL_A1_ADULT_FORMAT,
  OFFICIAL_A1_ADULT_SOURCES,
  OFFICIAL_A1_CALIBRATION_VERSION,
} from '../src/lib/official-a1-calibration';
import type { MockGateResult, SpineCheckpointResult } from '../src/lib/store';
import type { SimulatorRun } from '../src/lib/simulator-runs';

const checkpoint = (moduleId: number): SpineCheckpointResult => ({
  moduleId,
  percent: 82,
  state: 'PASS',
  failedTags: [],
  sectionPercents: { hoeren: 80, lesen: 80, schreiben: 80, sprechen: 80 },
  savedAt: Date.UTC(2026, 6, moduleId),
});

const alignedMock = (
  gateId: 'full-7' | 'final-8a' | 'final-8b',
  testId: string,
  savedAt: number,
): MockGateResult => ({
  gateId,
  testId,
  percent: 80,
  band: 'ready',
  sectionPercents: { hoeren: 76, lesen: 76, schreiben: 72, sprechen: 72 },
  savedAt,
  startedAt: savedAt - (75 * 60 * 1000),
  completedAt: savedAt,
  timed: true,
  closedBook: true,
  expiredSections: [],
  officialCalibration: {
    version: OFFICIAL_A1_CALIBRATION_VERSION,
    status: 'aligned',
  },
  writingEvidence: {
    formErrorFree: true,
    messageRubricScore: 4,
    allContentPoints: true,
    reviewMethod: 'self-rubric',
    closedBook: true,
  },
});

const speakingRun = (date: number, testId: string): SimulatorRun => ({
  testId,
  date,
  verdicts: ['clean', 'clean', 'shaky'],
  passed: true,
  teilScores: { '1': 4, '2': 4, '3': 3 },
  introSeconds: 48,
  closedBook: true,
});

const readyInput = (): A1ReadinessInput => ({
  module1Checkpoint: {
    passedItemIds: [],
    percent: 82,
    state: 'PASS',
    failedTags: [],
    savedAt: '2026-07-01T10:00:00.000Z',
  },
  spineCheckpoints: Object.fromEntries(
    Array.from({ length: 7 }, (_, index) => {
      const moduleId = index + 2;
      return [moduleId, checkpoint(moduleId)];
    }),
  ),
  mockResults: {
    'full-7': alignedMock('full-7', 'goethe-a1-test-5', Date.UTC(2026, 6, 20)),
    'final-8a': alignedMock('final-8a', 'goethe-a1-test-6', Date.UTC(2026, 6, 21)),
    'final-8b': alignedMock('final-8b', 'goethe-a1-test-8', Date.UTC(2026, 6, 22)),
  },
  simulatorRuns: [
    speakingRun(Date.UTC(2026, 6, 20), 'goethe-a1-test-5'),
    speakingRun(Date.UTC(2026, 6, 22), 'goethe-a1-test-8'),
  ],
});

const empty = evaluateA1Readiness({
  module1Checkpoint: null,
  spineCheckpoints: {},
  mockResults: {},
  simulatorRuns: [],
});
assert.equal(empty.ready, false, 'no activity must never produce A1 Ready');
assert.equal(empty.cleanCheckpointCount, 0);
assert.equal(empty.qualifyingMockCount, 0);

const complete = evaluateA1Readiness(readyInput());
assert.equal(complete.ready, true, 'the full production-evidence contract should award A1 Ready');
assert.equal(complete.requirements.every((requirement) => requirement.met), true);

const uncalibrated = readyInput();
for (const result of Object.values(uncalibrated.mockResults)) {
  result.officialCalibration = {
    version: OFFICIAL_A1_CALIBRATION_VERSION,
    status: 'practice-only',
  };
}
const uncalibratedResult = evaluateA1Readiness(uncalibrated);
assert.equal(uncalibratedResult.ready, false, 'practice-only mocks must never certify readiness');
assert.equal(uncalibratedResult.qualifyingMockCount, 0);
assert.equal(
  uncalibratedResult.requirements.find((requirement) => requirement.id === 'official-calibration')?.met,
  false,
);

const weakSection = readyInput();
weakSection.mockResults['final-8a'].sectionPercents.hoeren = 59;
weakSection.mockResults['final-8b'].sectionPercents.lesen = 59;
const weakSectionResult = evaluateA1Readiness(weakSection);
assert.equal(weakSectionResult.qualifyingMockCount, 1, 'a section below 60 must disqualify that mock');
assert.equal(weakSectionResult.ready, false);

const duplicateSet = readyInput();
duplicateSet.mockResults['final-8a'].testId = duplicateSet.mockResults['full-7'].testId;
duplicateSet.mockResults['final-8b'].percent = 70;
const duplicateSetResult = evaluateA1Readiness(duplicateSet);
assert.equal(duplicateSetResult.qualifyingMockCount, 1, 'two results from the same mock set count once');

const unresolved = readyInput();
unresolved.spineCheckpoints[4].failedTags = ['lesen:scanning'];
const unresolvedResult = evaluateA1Readiness(unresolved);
assert.equal(unresolvedResult.ready, false, 'an unresolved tag must block readiness');
assert.deepEqual(unresolvedResult.unresolvedTags, ['lesen:scanning']);

const oneSpeakingDay = readyInput();
oneSpeakingDay.simulatorRuns[1].date = oneSpeakingDay.simulatorRuns[0].date + (60 * 60 * 1000);
const oneSpeakingDayResult = evaluateA1Readiness(oneSpeakingDay);
assert.equal(oneSpeakingDayResult.speakingDayCount, 1, 'two runs on one calendar day count as one day');
assert.equal(oneSpeakingDayResult.ready, false);

const aiOnlyWriting = readyInput();
for (const result of Object.values(aiOnlyWriting.mockResults)) {
  if (result.writingEvidence) result.writingEvidence.reviewMethod = 'ai-only';
}
const aiOnlyWritingResult = evaluateA1Readiness(aiOnlyWriting);
assert.equal(aiOnlyWritingResult.validMessageCount, 0, 'AI-only writing must not be the sole readiness judge');
assert.equal(aiOnlyWritingResult.ready, false);

assert.equal(OFFICIAL_A1_ADULT_SOURCES.practiceSets.length, 3, 'all three current adult practice sets must be recorded');
assert.equal(OFFICIAL_A1_ADULT_FORMAT.hoeren.parts.map((part) => part.items).join('/'), '6/4/5');
assert.equal(OFFICIAL_A1_ADULT_FORMAT.lesen.parts.map((part) => part.items).join('/'), '5/5/5');
assert.equal(OFFICIAL_A1_ADULT_FORMAT.scoring.passPercent, 60, 'real Goethe pass mark must remain distinct from the 75 readiness margin');

const bankAudit = auditInternalMockBank(GOETHE_TESTS);
assert.equal(bankAudit.audits.length, 8, 'all eight internal mock sets must be audited');
assert.equal(bankAudit.status, 'practice-only', 'known task-shape gaps must keep the current bank practice-only');
for (const audit of bankAudit.audits) {
  assert.equal(audit.status, 'practice-only', `${audit.testId} must not self-certify`);
  assert.ok(audit.gaps.some((gap) => gap.includes('Hören surfaces')), `${audit.testId}: listening mismatch must be recorded`);
  assert.ok(audit.gaps.some((gap) => gap.includes('Lesen Teil 2')), `${audit.testId}: reading source-pair mismatch must be recorded`);
}

const coursePage = fs.readFileSync(path.join(process.cwd(), 'src/app/course/page.tsx'), 'utf8');
assert.ok(coursePage.includes('readiness.label'), 'Course must render the canonical readiness result');
assert.ok(coursePage.includes('Official calibration:'), 'Course must disclose calibration state');
assert.ok(coursePage.includes('cannot certify A1 Ready yet'), 'Course must not overclaim from the current mock bank');
assert.equal(coursePage.includes('readyMocks'), false, 'Course must not infer readiness from a band count');

const mockPage = fs.readFileSync(path.join(process.cwd(), 'src/app/tests/[testId]/page.tsx'), 'utf8');
assert.ok(mockPage.includes('Practice-only mock'), 'full mocks must disclose their current calibration status');
assert.ok(mockPage.includes('full four-section practice run'), 'the encouragement must describe the bank honestly');
assert.equal(mockPage.includes('real Goethe A1 format'), false, 'practice-only surfaces must never be presented as the official format');

console.log('A1 readiness: fail-closed evidence gate, 3 official adult sets, 8 internal mocks audited practice-only');
