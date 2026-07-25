import type { Module1CheckpointStored } from '@/lib/spine';
import type { MockGateResult, SpineCheckpointResult } from '@/lib/store';
import type { SimulatorRun } from '@/lib/simulator-runs';
import { OFFICIAL_A1_CALIBRATION_VERSION } from '@/lib/official-a1-calibration';

const FULL_MOCK_GATE_IDS = new Set(['full-7', 'final-8a', 'final-8b']);

export type A1ReadyRequirementId =
  | 'module-gates'
  | 'weakness-tags'
  | 'official-calibration'
  | 'timed-mocks'
  | 'receptive-strength'
  | 'writing-evidence'
  | 'speaking-evidence'
  | 'closed-book';

export type A1ReadyRequirement = {
  id: A1ReadyRequirementId;
  label: string;
  met: boolean;
  current: string;
  target: string;
  detail: string;
};

export type A1ReadinessInput = {
  module1Checkpoint: Module1CheckpointStored | null;
  spineCheckpoints: Record<number, SpineCheckpointResult>;
  mockResults: Record<string, MockGateResult>;
  simulatorRuns: SimulatorRun[];
};

export type A1ReadinessResult = {
  ready: boolean;
  label: 'A1 Ready' | 'Evidence still needed';
  requirements: A1ReadyRequirement[];
  nextRequirement: A1ReadyRequirement | null;
  cleanCheckpointCount: number;
  unresolvedTags: string[];
  qualifyingMockCount: number;
  speakingDayCount: number;
  errorFreeFormCount: number;
  validMessageCount: number;
};

function distinctCalendarDays(timestamps: number[]) {
  return new Set(timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  })).size;
}

function cleanCheckpointCount(input: A1ReadinessInput) {
  let count = 0;
  if (input.module1Checkpoint?.state === 'PASS' && (input.module1Checkpoint.failedTags ?? []).length === 0) {
    count += 1;
  }
  for (let moduleId = 2; moduleId <= 8; moduleId += 1) {
    const result = input.spineCheckpoints[moduleId];
    if (result?.state === 'PASS' && (result.failedTags ?? []).length === 0) count += 1;
  }
  return count;
}

function unresolvedTags(input: A1ReadinessInput) {
  return Array.from(new Set([
    ...(input.module1Checkpoint?.failedTags ?? []),
    ...Object.values(input.spineCheckpoints).flatMap((result) => result.failedTags ?? []),
  ])).sort();
}

function isCalibratedTimedMock(result: MockGateResult) {
  return (
    FULL_MOCK_GATE_IDS.has(result.gateId) &&
    result.timed === true &&
    result.closedBook === true &&
    result.officialCalibration?.version === OFFICIAL_A1_CALIBRATION_VERSION &&
    result.officialCalibration.status === 'aligned'
  );
}

function meetsReadyMockThreshold(result: MockGateResult) {
  const requiredSections = ['hoeren', 'lesen', 'schreiben', 'sprechen'];
  return (
    result.percent >= 75 &&
    requiredSections.every((section) => (result.sectionPercents?.[section] ?? 0) >= 60)
  );
}

export function evaluateA1Readiness(input: A1ReadinessInput): A1ReadinessResult {
  const cleanGates = cleanCheckpointCount(input);
  const weakTags = unresolvedTags(input);
  const allFullMockRecords = Object.values(input.mockResults).filter((result) => FULL_MOCK_GATE_IDS.has(result.gateId));
  const calibratedMocks = allFullMockRecords.filter(isCalibratedTimedMock);
  const qualifyingMocks = calibratedMocks.filter(meetsReadyMockThreshold);
  const distinctQualifyingTestIds = new Set(qualifyingMocks.map((result) => result.testId));
  const qualifyingMockCount = distinctQualifyingTestIds.size;
  const calibrationAligned = allFullMockRecords.some((result) =>
    result.officialCalibration?.version === OFFICIAL_A1_CALIBRATION_VERSION &&
    result.officialCalibration.status === 'aligned');

  const receptiveStrength = qualifyingMocks.some((result) => (result.sectionPercents.hoeren ?? 0) >= 72)
    && qualifyingMocks.some((result) => (result.sectionPercents.lesen ?? 0) >= 72);

  const writingRecords = calibratedMocks
    .map((result) => result.writingEvidence)
    .filter((record): record is NonNullable<MockGateResult['writingEvidence']> => Boolean(record));
  const errorFreeFormCount = writingRecords.filter((record) => record.formErrorFree && record.closedBook).length;
  const validMessageCount = writingRecords.filter((record) =>
    record.messageRubricScore >= 3 &&
    record.allContentPoints &&
    record.closedBook &&
    record.reviewMethod !== 'ai-only').length;

  const eligibleSpeakingRuns = input.simulatorRuns.filter((run) =>
    run.passed &&
    run.closedBook === true &&
    typeof run.introSeconds === 'number' &&
    run.introSeconds <= 60 &&
    (run.teilScores?.['1'] ?? 0) >= 3 &&
    (run.teilScores?.['2'] ?? 0) >= 3 &&
    (run.teilScores?.['3'] ?? 0) >= 3);
  const speakingDayCount = distinctCalendarDays(eligibleSpeakingRuns.map((run) => run.date));

  const allClosedBook =
    qualifyingMocks.every((result) => result.closedBook === true) &&
    writingRecords.every((result) => result.closedBook === true) &&
    eligibleSpeakingRuns.every((run) => run.closedBook === true);

  const requirements: A1ReadyRequirement[] = [
    {
      id: 'module-gates',
      label: 'Eight clean module gates',
      met: cleanGates === 8,
      current: `${cleanGates}/8`,
      target: '8/8',
      detail: 'Every checkpoint must be PASS, not WEAK, with no failed item left behind.',
    },
    {
      id: 'weakness-tags',
      label: 'No unresolved weakness tags',
      met: weakTags.length === 0 && cleanGates === 8,
      current: `${weakTags.length} open`,
      target: '0 open',
      detail: 'The latest closed evidence must clear every detected weakness.',
    },
    {
      id: 'official-calibration',
      label: 'Official-shape calibration',
      met: calibrationAligned,
      current: calibrationAligned ? 'Aligned' : 'Practice-only',
      target: 'Aligned',
      detail: 'Only mocks checked against the current three official adult practice sets may certify readiness.',
    },
    {
      id: 'timed-mocks',
      label: 'Two distinct readiness mocks',
      met: qualifyingMockCount >= 2,
      current: `${Math.min(qualifyingMockCount, 2)}/2`,
      target: '2/2 at ≥75; every section ≥60',
      detail: 'Both attempts must be timed, closed-book, calibrated, and use different mock sets.',
    },
    {
      id: 'receptive-strength',
      label: 'Hören and Lesen strength',
      met: receptiveStrength,
      current: receptiveStrength ? 'Proved' : 'Not yet proved',
      target: 'At least one ≥18/25 in each',
      detail: 'A comfortable total cannot hide weak listening or reading.',
    },
    {
      id: 'writing-evidence',
      label: 'Writing production',
      met: errorFreeFormCount >= 2 && validMessageCount >= 3,
      current: `${Math.min(errorFreeFormCount, 2)}/2 forms · ${Math.min(validMessageCount, 3)}/3 messages`,
      target: '2 clean forms · 3 valid messages',
      detail: 'Messages must cover all three points at rubric ≥3/5; AI cannot be the sole judge.',
    },
    {
      id: 'speaking-evidence',
      label: 'Speaking on two days',
      met: speakingDayCount >= 2,
      current: `${Math.min(speakingDayCount, 2)}/2 days`,
      target: '2 days; every Teil ≥3/5',
      detail: 'Each run needs all three Teile and a continuous self-introduction under 60 seconds.',
    },
    {
      id: 'closed-book',
      label: 'Closed-book proof',
      met: qualifyingMockCount >= 2 && allClosedBook,
      current: qualifyingMockCount >= 2 && allClosedBook ? 'Verified' : 'Not complete',
      target: 'Verified',
      detail: 'Watching, hints, copied text, streaks, and AI-only scores never award A1 Ready.',
    },
  ];

  const nextRequirement = requirements.find((requirement) => !requirement.met) ?? null;
  return {
    ready: nextRequirement === null,
    label: nextRequirement === null ? 'A1 Ready' : 'Evidence still needed',
    requirements,
    nextRequirement,
    cleanCheckpointCount: cleanGates,
    unresolvedTags: weakTags,
    qualifyingMockCount,
    speakingDayCount,
    errorFreeFormCount,
    validMessageCount,
  };
}
