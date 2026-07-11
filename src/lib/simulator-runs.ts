// Speaking-simulator run history — persisted locally so module 8's readiness
// checkpoint can derive "simulator done twice" from real runs, not self-report.

export type SimulatorVerdict = 'clean' | 'shaky' | 'missed';

export type SimulatorRun = {
  testId: string;
  date: number;
  verdicts: SimulatorVerdict[];
  passed: boolean;
};

const RUNS_KEY = 'adipoli-simulator-runs';

export function readSimulatorRuns(): SimulatorRun[] {
  try {
    return JSON.parse(localStorage.getItem(RUNS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function writeSimulatorRun(run: SimulatorRun) {
  try {
    localStorage.setItem(RUNS_KEY, JSON.stringify([...readSimulatorRuns(), run]));
  } catch {
    /* storage unavailable — the run still completes on screen */
  }
}

/** Distinct calendar days with a completed simulator run on record. */
export function simulatorRunDays(): number {
  return new Set(readSimulatorRuns().map((r) => new Date(r.date).toDateString())).size;
}
