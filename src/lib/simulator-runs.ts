// Speaking-simulator run history — persisted locally so module 8's readiness
// checkpoint can derive "simulator done twice" from real runs, not self-report.

export type SimulatorVerdict = 'clean' | 'shaky' | 'missed';

export type SimulatorRun = {
  testId: string;
  date: number;
  verdicts: SimulatorVerdict[];
  passed: boolean;
  /** Optional until the simulator captures the continuous readiness proof. */
  teilScores?: Record<'1' | '2' | '3', number>;
  introSeconds?: number;
  closedBook?: boolean;
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
    window.dispatchEvent(new CustomEvent('simulator-run-saved', { detail: run }));
  } catch {
    /* storage unavailable — the run still completes on screen */
  }
}

/** Distinct calendar days with a completed simulator run on record. */
export function simulatorRunDays(): number {
  return new Set(
    readSimulatorRuns()
      .filter((run) => run.passed)
      .map((run) => new Date(run.date).toDateString()),
  ).size;
}
