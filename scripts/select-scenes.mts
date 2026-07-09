/**
 * Copy chosen scene candidates -> public/images/scenes/<id>.jpg.
 * Default pick = cand-1; override per-scene via scripts/output/scene-picks.json
 * (the review.html grid emits this JSON). Run after gen-assets-scenes.
 *
 *   npx tsx scripts/select-scenes.mts
 */
import * as fs from 'fs';
import * as path from 'path';

const CAND_DIR = path.resolve('scripts/output/scenes-candidates');
const OUT_DIR = path.resolve('public/images/scenes');
const PICKS_PATH = path.resolve('scripts/output/scene-picks.json');

const picks: Record<string, number> = fs.existsSync(PICKS_PATH)
  ? JSON.parse(fs.readFileSync(PICKS_PATH, 'utf8'))
  : {};

fs.mkdirSync(OUT_DIR, { recursive: true });
let copied = 0;
let missing = 0;

for (const id of fs.readdirSync(CAND_DIR)) {
  const dir = path.join(CAND_DIR, id);
  if (!fs.statSync(dir).isDirectory()) continue;
  const pick = picks[id] ?? 1;
  const src = path.join(dir, `cand-${pick}.jpg`);
  const fallback = path.join(dir, 'cand-1.jpg');
  const chosen = fs.existsSync(src) ? src : fs.existsSync(fallback) ? fallback : null;
  if (!chosen) { missing++; continue; }
  fs.copyFileSync(chosen, path.join(OUT_DIR, `${id}.jpg`));
  copied++;
}

console.log(`copied ${copied} scene finals to public/images/scenes/ (${missing} folders had no candidate)`);
