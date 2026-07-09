// Budget ledger for the one-time Gemini/Vertex credit burn (DECISIONS #9).
// Every generation call is recorded BEFORE it runs; batches abort when their
// cap or the global cap would be exceeded. Owner-facing tracking:
//   cat scripts/output/gemini-spend-ledger.json
//   npx tsx scripts/lib/gemini-budget.mts            # summary
//
// Prices verified 2026-06-12 from ai.google.dev/gemini-api/docs/pricing (USD).

import * as fs from 'fs';
import * as path from 'path';

const LEDGER_PATH = path.resolve('scripts/output/gemini-spend-ledger.json');

// Spend goal: owner 2026-06-13 raised it to ~€67 more actual (keep ~€20 buffer
// of the ~€254 credits). Ground-truth calibration: at ledger €174.37 the
// billing console showed €100 remaining, i.e. ~€154 actual spent — the ledger
// OVERCOUNTS actual by ~12% (logged-but-failed calls). So actual ≈ ledger×0.88.
// Hard cap €248 ledger ≈ €218 actual worst-case ≈ €245 actual → keeps the
// credits from being exhausted even if the calibration is optimistic.
export const LEDGER_TO_ACTUAL = 0.88;
// 2026-06-14: owner asked for ~€45 more (marketing). Worst case (actual=ledger)
// €250 ledger = €4 under the €254 credits → still no real-money charge.
export const GLOBAL_CAP_EUR = 250;
export const SPEND_FLOOR_EUR = 150;
export const USD_TO_EUR = 0.93; // approximation; reconcile against billing console

export const PRICES_USD = {
  // per image
  'imagen-4.0-fast-generate-001': 0.02,
  'imagen-4.0-generate-001': 0.04,
  'imagen-4.0-ultra-generate-001': 0.06,
  'gemini-2.5-flash-image': 0.039,
  // per 1M characters (Cloud Text-to-Speech)
  'cloud-tts-chirp3-hd-per-1m-chars': 30.0,
  'cloud-tts-neural2-per-1m-chars': 16.0,
  // per second of video
  'veo-3.1-generate-preview-per-sec': 0.4,
  'veo-3.1-fast-generate-preview-per-sec': 0.12,
} as const;

export const BATCH_CAPS_EUR: Record<string, number> = {
  'billing-test': 2,
  'audio-core': 25,
  'video-lines': 10,
  'style-lock': 2,
  scenes: 60,
  vocab: 158, // full set + text-artifact reprompt passes (high-risk + question words)
  kuttan: 12,
  veo: 60,
  marketing: 46, // owner-directed marketing batch (promo video + social graphics)
  fill: 60,
};

type LedgerEntry = {
  batch: string;
  model: string;
  units: number;
  unitType: 'image' | 'chars' | 'seconds' | 'tokens' | 'flat';
  estCostUsd: number;
  note?: string;
  timestamp: string;
};

type Ledger = { entries: LedgerEntry[] };

export function loadLedger(): Ledger {
  if (!fs.existsSync(LEDGER_PATH)) return { entries: [] };
  return JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
}

function saveLedger(ledger: Ledger) {
  fs.mkdirSync(path.dirname(LEDGER_PATH), { recursive: true });
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2), 'utf8');
}

export function totalEur(ledger = loadLedger()): number {
  return ledger.entries.reduce((s, e) => s + e.estCostUsd, 0) * USD_TO_EUR;
}

export function batchEur(batch: string, ledger = loadLedger()): number {
  return ledger.entries.filter((e) => e.batch === batch).reduce((s, e) => s + e.estCostUsd, 0) * USD_TO_EUR;
}

/** Throws if recording this projected cost would breach the batch or global cap. */
export function assertBudget(batch: string, projectedCostUsd: number) {
  const ledger = loadLedger();
  const cap = BATCH_CAPS_EUR[batch];
  if (cap === undefined) throw new Error(`Unknown batch '${batch}' — add it to BATCH_CAPS_EUR first.`);
  const batchAfter = batchEur(batch, ledger) + projectedCostUsd * USD_TO_EUR;
  const globalAfter = totalEur(ledger) + projectedCostUsd * USD_TO_EUR;
  if (batchAfter > cap) throw new Error(`BUDGET STOP: batch '${batch}' would reach €${batchAfter.toFixed(2)} > cap €${cap}`);
  if (globalAfter > GLOBAL_CAP_EUR) throw new Error(`BUDGET STOP: global spend would reach €${globalAfter.toFixed(2)} > cap €${GLOBAL_CAP_EUR}`);
}

/** Record spend; call immediately BEFORE the API call so crashes never under-count. */
export function recordSpend(entry: Omit<LedgerEntry, 'timestamp'>) {
  assertBudget(entry.batch, entry.estCostUsd);
  const ledger = loadLedger();
  ledger.entries.push({ ...entry, timestamp: new Date().toISOString() });
  saveLedger(ledger);
}

export function summary(): string {
  const ledger = loadLedger();
  const batches = [...new Set(ledger.entries.map((e) => e.batch))];
  const lines = batches.map((b) => {
    const n = ledger.entries.filter((e) => e.batch === b).length;
    return `  ${b.padEnd(14)} ${String(n).padStart(5)} calls  €${batchEur(b, ledger).toFixed(2).padStart(8)} / cap €${BATCH_CAPS_EUR[b] ?? '?'}`;
  });
  const total = totalEur(ledger);
  return [
    `Gemini credit-burn ledger — ${ledger.entries.length} calls`,
    ...lines,
    `  ${'TOTAL'.padEnd(14)} ${''.padStart(5)}        €${total.toFixed(2).padStart(8)} / floor €${SPEND_FLOOR_EUR} / cap €${GLOBAL_CAP_EUR}`,
    `  est. ACTUAL (×${LEDGER_TO_ACTUAL}): €${(total * LEDGER_TO_ACTUAL).toFixed(2)}  ·  est. credits left of €254: €${(254 - total * LEDGER_TO_ACTUAL).toFixed(2)}`,
  ].join('\n');
}

// CLI: print summary
if (process.argv[1] && process.argv[1].includes('gemini-budget')) {
  console.log(summary());
}
