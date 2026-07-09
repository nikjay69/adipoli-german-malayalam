// Mock exam cadence (docs/A1_COURSE_ARCHITECTURE.md, gates table):
// mini-mock after spine module 4, half-mock after 6, full mock after 7,
// two timed finals in module 8. Each gate runs a scoped slice of one
// Übungstest from goethe-tests.ts via /tests/[testId]?gate=<id>.

export type MockSection = 'hoeren' | 'lesen' | 'schreiben' | 'sprechen';

export type MockGateDef = {
  id: string;
  kind: 'mini' | 'half' | 'full';
  /** spine module whose block list carries this gate (before its checkpoint) */
  afterModule: number;
  /** which Übungstest from goethe-tests.ts the gate runs */
  testId: string;
  title: string;
  sections: MockSection[];
  durationLabel: string;
};

export const MOCK_GATES: MockGateDef[] = [
  {
    id: 'mini-4',
    kind: 'mini',
    afterModule: 4,
    testId: 'goethe-a1-test-4',
    title: 'Mini-mock: Hören + Lesen',
    sections: ['hoeren', 'lesen'],
    durationLabel: '~45m',
  },
  {
    id: 'half-6',
    kind: 'half',
    afterModule: 6,
    testId: 'goethe-a1-test-7',
    title: 'Half-mock: Lesen + Schreiben + Sprechen',
    sections: ['lesen', 'schreiben', 'sprechen'],
    durationLabel: '~60m',
  },
  {
    id: 'full-7',
    kind: 'full',
    afterModule: 7,
    testId: 'goethe-a1-test-5',
    title: 'Full mock: all four sections, timed',
    sections: ['hoeren', 'lesen', 'schreiben', 'sprechen'],
    durationLabel: '~80m',
  },
  {
    id: 'final-8a',
    kind: 'full',
    afterModule: 8,
    testId: 'goethe-a1-test-6',
    title: 'Final timed mock 1',
    sections: ['hoeren', 'lesen', 'schreiben', 'sprechen'],
    durationLabel: '~80m',
  },
  {
    id: 'final-8b',
    kind: 'full',
    afterModule: 8,
    testId: 'goethe-a1-test-8',
    title: 'Final timed mock 2',
    sections: ['hoeren', 'lesen', 'schreiben', 'sprechen'],
    durationLabel: '~80m',
  },
];

export function getMockGate(gateId: string | null | undefined): MockGateDef | undefined {
  if (!gateId) return undefined;
  return MOCK_GATES.find((g) => g.id === gateId);
}

export function getMockGatesForModule(moduleId: number): MockGateDef[] {
  return MOCK_GATES.filter((g) => g.afterModule === moduleId);
}

// Result bands per docs/PRODUCT_VISION.md / A1_COURSE_ARCHITECTURE.md:
// ready 70+ & no section <60 · exam-pass likely 60-69 & no section <45 ·
// risky: one section <45 or 50-59 overall · not ready <50.
export type MockBand = 'ready' | 'pass-likely' | 'risky' | 'not-ready';

export function computeMockBand(percent: number, sectionPercents: Record<string, number>): MockBand {
  const values = Object.values(sectionPercents);
  const min = values.length ? Math.min(...values) : 0;
  if (percent < 50) return 'not-ready';
  if (percent >= 70 && min >= 60) return 'ready';
  if (percent >= 60 && min >= 45) return 'pass-likely';
  return 'risky';
}

export const MOCK_BAND_LABELS: Record<MockBand, { label: string; detail: string; color: string }> = {
  ready: { label: 'Ready', detail: 'Comfortably above the real pass mark, no weak section.', color: '#27ae60' },
  'pass-likely': { label: 'Exam pass likely', detail: 'Above the pass mark. Tighten the weakest section.', color: '#d4a520' },
  risky: { label: 'Risky', detail: 'Too close to the line — one recovery pass, then retake.', color: '#f97316' },
  'not-ready': { label: 'Not ready yet', detail: 'Below pass level. Do the prescribed recovery before retaking.', color: '#e94560' },
};
