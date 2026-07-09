/**
 * Vocab illustration generation (credit-burn batch 5, DECISIONS #9).
 *
 *   npx tsx scripts/gen-assets-vocab.mts [--candidates 2] [--dry-run] [--module 3]
 *
 * One painterly mini-illustration per vocab item, prompted from the item's
 * AUTHORED example sentence (concrete scenes by design — even function words
 * have illustratable examples). Candidates land in
 * scripts/output/vocab-candidates/<vocabId>/ as compressed JPGs; chosen finals
 * are copied to public/images/vocab/ during integration.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { pathToFileURL } from 'url';
import { generateImages } from './lib/vertex-client.mts';
import { recordSpend, PRICES_USD, summary } from './lib/gemini-budget.mts';
import { STYLE_PREFIX } from './lib/style.mts';

const MODEL = 'imagen-4.0-generate-001';
const PRICE = PRICES_USD[MODEL];
const OUT = path.resolve('scripts/output/vocab-candidates');

// Strong no-text block — quoting the German word or pasting a sentence makes
// Imagen render it as a floating caption (often garbled). We depict the example
// scene instead and forbid all lettering.
const CONSTRAINTS =
  'The image is purely visual: absolutely no text, no words, no letters, no captions, no labels, no signs, no writing of any kind. Illustration only, single clear subject, soft background, square composition.';

type VocabJob = { id: string; german: string; prompt: string };

async function collectJobs(moduleFilter?: number): Promise<VocabJob[]> {
  const jobs: VocabJob[] = [];
  for (let i = 1; i <= 18; i++) {
    if (moduleFilter && i !== moduleFilter) continue;
    const p = String(i).padStart(2, '0');
    const m = await import(pathToFileURL(path.resolve(`src/lib/content/modules/module-${p}.ts`)).href);
    const mod = m[`MODULE_${i}`];
    for (const l of mod.lessons) {
      for (const v of l.vocabulary ?? []) {
        // Depict the example scene (not the word) so the model paints a picture
        // rather than rendering the German word as text.
        const scene = (v.exampleTranslation || v.english || '').trim();
        jobs.push({
          id: v.id,
          german: v.german,
          prompt: `${STYLE_PREFIX} A scene that depicts: ${scene}. ${CONSTRAINTS}`,
        });
      }
    }
  }
  return jobs;
}

function compressTo(outPath: string, png: Buffer) {
  const tmp = outPath + '.tmp.png';
  fs.writeFileSync(tmp, png);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp, '-vf', 'scale=640:-1', '-q:v', '5', outPath]);
  fs.unlinkSync(tmp);
}

const args = process.argv.slice(2);
const candidates = args.includes('--candidates') ? Number(args[args.indexOf('--candidates') + 1]) : 2;
const moduleFilter = args.includes('--module') ? Number(args[args.indexOf('--module') + 1]) : undefined;
const dryRun = args.includes('--dry-run');

const jobs = await collectJobs(moduleFilter);
const totalCost = jobs.length * candidates * PRICE;
console.log(`vocab items: ${jobs.length} · candidates: ${candidates} · images: ${jobs.length * candidates} · est $${totalCost.toFixed(2)} (€${(totalCost * 0.93).toFixed(2)})`);

if (dryRun) {
  for (const j of jobs.slice(0, 3)) console.log(`\n[${j.id}] ${j.prompt.slice(0, 200)}…`);
  process.exit(0);
}

let done = 0;
for (const job of jobs) {
  const dir = path.join(OUT, job.id);
  fs.mkdirSync(dir, { recursive: true });
  const existing = fs.readdirSync(dir).filter((f) => f.startsWith('cand-')).length;
  if (existing >= candidates) { done++; continue; }

  recordSpend({ batch: 'vocab', model: MODEL, units: candidates - existing, unitType: 'image', estCostUsd: PRICE * (candidates - existing), note: job.id });
  try {
    const imgs = await generateImages(MODEL, job.prompt, { sampleCount: candidates - existing, aspectRatio: '1:1' });
    imgs.forEach((b64, i) => compressTo(path.join(dir, `cand-${existing + i + 1}.jpg`), Buffer.from(b64, 'base64')));
  } catch (err) {
    console.log(`  ${job.id}: ${String(err).slice(0, 140)} — skipped`);
  }
  done++;
  if (done % 25 === 0) console.log(`progress: ${done}/${jobs.length} (${summary().split('\n').pop()})`);
}
console.log(summary());
