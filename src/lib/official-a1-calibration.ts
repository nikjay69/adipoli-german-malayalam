import type { GoetheTest } from '@/lib/content/goethe-tests';

export const OFFICIAL_A1_CALIBRATION_VERSION = 'goethe-a1-adult-2026-07-25';

export type OfficialCalibrationStatus = 'aligned' | 'practice-only';

export const OFFICIAL_A1_ADULT_SOURCES = {
  checkedAt: '2026-07-25',
  trainingPage: 'https://www.goethe.de/en/m/spr/prf/ueb/pa1.html',
  resultRules: 'https://www.goethe.de/de/m/spr/prf/pes/pas1.html',
  administrationRules: 'https://www.goethe.de/resources/files/pdf347/dfb-v1.pdf',
  practiceSets: [
    'https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_modellsatz.pdf',
    'https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf',
    'https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz02.pdf',
  ],
} as const;

export const OFFICIAL_A1_ADULT_FORMAT = {
  hoeren: {
    minutes: 20,
    parts: [
      { part: 1, items: 6, answerSurface: 'three-choice', plays: 2 },
      { part: 2, items: 4, answerSurface: 'true-false', plays: 1 },
      { part: 3, items: 5, answerSurface: 'three-choice', plays: 2 },
    ],
  },
  lesen: {
    minutes: 25,
    parts: [
      { part: 1, items: 5, answerSurface: 'message-true-false' },
      { part: 2, items: 5, answerSurface: 'two-source-choice' },
      { part: 3, items: 5, answerSurface: 'notice-true-false' },
    ],
  },
  schreiben: {
    minutes: 20,
    parts: [
      { part: 1, answerSurface: 'five-field-form' },
      { part: 2, answerSurface: 'three-point-message', approximateWords: 30 },
    ],
  },
  sprechen: {
    minutes: 15,
    parts: [
      { part: 1, answerSurface: 'self-introduction' },
      { part: 2, answerSurface: 'ask-and-give-information' },
      { part: 3, answerSurface: 'request-and-response' },
    ],
  },
  scoring: {
    officialMaximum: 100,
    writtenMaximum: 75,
    speakingMaximum: 25,
    passPercent: 60,
    internalReadyMargin: 75,
    internalSectionFloor: 60,
  },
} as const;

export type MockCalibrationAudit = {
  testId: string;
  status: OfficialCalibrationStatus;
  alignedChecks: string[];
  gaps: string[];
};

function answerSurface(question: unknown): 'three-choice' | 'true-false' | 'unknown' {
  if (!question || typeof question !== 'object') return 'unknown';
  const candidate = question as { options?: unknown; correct?: unknown };
  if (Array.isArray(candidate.options) && candidate.options.length === 3) return 'three-choice';
  if (typeof candidate.correct === 'boolean') return 'true-false';
  return 'unknown';
}

export function auditInternalMock(test: GoetheTest): MockCalibrationAudit {
  const alignedChecks: string[] = [];
  const gaps: string[] = [];

  const hoerenCounts = [
    test.hoeren.teil1.length,
    test.hoeren.teil2.length,
    test.hoeren.teil3.length,
  ];
  if (hoerenCounts.join('/') === '6/4/5') alignedChecks.push('Hören item counts 6/4/5');
  else gaps.push(`Hören item counts are ${hoerenCounts.join('/')}, expected 6/4/5`);

  const hoerenSurfaces = [
    answerSurface(test.hoeren.teil1[0]),
    answerSurface(test.hoeren.teil2[0]),
    answerSurface(test.hoeren.teil3[0]),
  ];
  if (hoerenSurfaces.join('/') === 'three-choice/true-false/three-choice') {
    alignedChecks.push('Hören answer surfaces match the three official Teile');
  } else {
    gaps.push(`Hören surfaces are ${hoerenSurfaces.join('/')}, expected three-choice/true-false/three-choice`);
  }

  const lesenCounts = [
    test.lesen.teil1.length,
    test.lesen.teil2.length,
    test.lesen.teil3.length,
  ];
  if (lesenCounts.join('/') === '5/5/5') alignedChecks.push('Lesen item counts 5/5/5');
  else gaps.push(`Lesen item counts are ${lesenCounts.join('/')}, expected 5/5/5`);

  const lesenSurfaces = [
    answerSurface(test.lesen.teil1[0]),
    answerSurface(test.lesen.teil2[0]),
    answerSurface(test.lesen.teil3[0]),
  ];
  if (lesenSurfaces.join('/') === 'true-false/three-choice/true-false') {
    alignedChecks.push('Lesen response families match the three official Teile');
  } else {
    gaps.push(`Lesen surfaces are ${lesenSurfaces.join('/')}, expected true-false/two-source-choice/true-false`);
  }
  if (test.lesen.teil2.every((item) => 'sourceA' in item && 'sourceB' in item)) {
    alignedChecks.push('Lesen Teil 2 provides two source texts per need');
  } else {
    gaps.push('Lesen Teil 2 does not provide the official two-source a/b choice');
  }

  if (test.schreiben.teil1.fields.length === 5) alignedChecks.push('Schreiben Teil 1 has five form fields');
  else gaps.push(`Schreiben Teil 1 has ${test.schreiben.teil1.fields.length} fields, expected five`);
  if (test.schreiben.teil2.points.length === 3) alignedChecks.push('Schreiben Teil 2 has three content points');
  else gaps.push(`Schreiben Teil 2 has ${test.schreiben.teil2.points.length} content points, expected three`);

  if (
    test.sprechen.teil1.length > 0 &&
    test.sprechen.teil2.length > 0 &&
    test.sprechen.teil3.length > 0
  ) {
    alignedChecks.push('Sprechen exposes all three official parts');
  } else {
    gaps.push('Sprechen is missing at least one official part');
  }

  return {
    testId: test.id,
    status: gaps.length === 0 ? 'aligned' : 'practice-only',
    alignedChecks,
    gaps,
  };
}

export function auditInternalMockBank(tests: GoetheTest[]) {
  const audits = tests.map(auditInternalMock);
  return {
    version: OFFICIAL_A1_CALIBRATION_VERSION,
    status: audits.every((audit) => audit.status === 'aligned') ? 'aligned' as const : 'practice-only' as const,
    practiceSetCount: OFFICIAL_A1_ADULT_SOURCES.practiceSets.length,
    audits,
  };
}
