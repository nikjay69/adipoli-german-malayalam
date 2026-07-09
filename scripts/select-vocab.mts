/**
 * Copy chosen vocab candidates -> public/images/vocab/<vocabId>.jpg.
 * Default pick = cand-1; override via scripts/output/vocab-picks.json.
 * Resumable/idempotent — safe to run repeatedly as the batch fills in.
 *
 *   npx tsx scripts/select-vocab.mts
 */
import * as fs from 'fs';
import * as path from 'path';

const CAND_DIR = path.resolve('scripts/output/vocab-candidates');
const OUT_DIR = path.resolve('public/images/vocab');
const PICKS_PATH = path.resolve('scripts/output/vocab-picks.json');

const picks: Record<string, number> = fs.existsSync(PICKS_PATH)
  ? JSON.parse(fs.readFileSync(PICKS_PATH, 'utf8'))
  : {};

fs.mkdirSync(OUT_DIR, { recursive: true });
let copied = 0;
let empty = 0;

for (const id of fs.readdirSync(CAND_DIR)) {
  const dir = path.join(CAND_DIR, id);
  if (!fs.statSync(dir).isDirectory()) continue;
  const cands = fs.readdirSync(dir).filter((f) => /^cand-\d+\.jpg$/.test(f)).sort();
  if (cands.length === 0) { empty++; continue; }
  // Honor an explicit pick if that candidate exists; else take the first available.
  const pick = picks[id];
  const picked = pick && cands.includes(`cand-${pick}.jpg`) ? `cand-${pick}.jpg` : cands[0];
  fs.copyFileSync(path.join(dir, picked), path.join(OUT_DIR, `${id}.jpg`));
  copied++;
}

console.log(`copied ${copied} vocab finals to public/images/vocab/ (${empty} folders had no candidate)`);
