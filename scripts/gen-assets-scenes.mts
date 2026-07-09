/**
 * Scene backdrop generation (credit-burn batch 3+4, DECISIONS #9).
 *
 * Style-lock round:  npx tsx scripts/gen-assets-scenes.mts --style-lock
 * Full batch:        npx tsx scripts/gen-assets-scenes.mts [--candidates 6] [--dry-run] [--only 3-1,5-2]
 *
 * Prompts derive from each lesson's AUTHORED storyScene (no AI-invented
 * content). Candidates land in scripts/output/scenes-candidates/<id>/ as
 * compressed JPGs + a review grid HTML; chosen finals are copied to
 * public/images/scenes/ during integration.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { pathToFileURL } from 'url';
import { generateImages } from './lib/vertex-client.mts';
import { recordSpend, PRICES_USD, summary } from './lib/gemini-budget.mts';
import { STYLE_PREFIX } from './lib/style.mts';

const MODEL = 'imagen-4.0-ultra-generate-001';
const PRICE = PRICES_USD[MODEL];
const OUT = path.resolve('scripts/output/scenes-candidates');
const STYLE_OUT = path.resolve('scripts/output/scene-style');

const CONSTRAINTS =
  'Environment only: no people, no characters, no animals, no text, no lettering, no signage, no watermarks. Vertical composition with calm space in the lower third for UI overlay.';

type SceneJob = { id: string; prompt: string };

function visualPrompt(name: string, description: string, timeOfDay: string): string {
  // Strip second-person narrative fragments that invite characters into frame.
  const cleaned = description
    .replace(/\b(You|Your|you|your)\b[^.!?]*[.!?]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const base = cleaned.length > 40 ? cleaned : description;
  return `${STYLE_PREFIX} Scene: ${name}, ${timeOfDay} light. ${base} ${CONSTRAINTS}`;
}

// Shared hub/mission scenes beyond per-lesson backdrops.
const HUB_SCENES: SceneJob[] = [
  { id: 'hub-goethe-kochi-classroom', prompt: `${STYLE_PREFIX} Scene: a bright language-school classroom in Kochi, Kerala, morning light — wooden desks, green chalkboard with nothing written on it, ceiling fan, window view of palm trees and monsoon clouds. ${CONSTRAINTS}` },
  { id: 'hub-chayakkada', prompt: `${STYLE_PREFIX} Scene: a Kerala roadside chayakkada tea stall at dawn, steam rising from tea glasses, brass kettle, banana bunch hanging, wooden bench. ${CONSTRAINTS}` },
  { id: 'hub-thrissur-home', prompt: `${STYLE_PREFIX} Scene: veranda of a Kerala tharavadu home in Thrissur, evening — terracotta roof tiles, brass lamp, rain trees, warm interior glow. ${CONSTRAINTS}` },
  { id: 'hub-study-desk', prompt: `${STYLE_PREFIX} Scene: a study desk in a Kerala home at night — warm desk lamp, German textbook open, small German flag, window with moonlit coconut palms. ${CONSTRAINTS}` },
  { id: 'hub-kochi-street', prompt: `${STYLE_PREFIX} Scene: a lively Kochi street in the morning — auto-rickshaws parked, colourful shopfronts with shutters, sea breeze palms, distant Chinese fishing nets. ${CONSTRAINTS}` },
  { id: 'hub-bakery-courtyard', prompt: `${STYLE_PREFIX} Scene: a sunlit courtyard bakery counter, glass case of pastries and bread, steam from an espresso machine, dappled morning shade. ${CONSTRAINTS}` },
  { id: 'hub-library', prompt: `${STYLE_PREFIX} Scene: a quiet study library reading room, tall shelves, green-shaded reading lamps, afternoon light through high windows. ${CONSTRAINTS}` },
  { id: 'hub-dream-platform', prompt: `${STYLE_PREFIX} Scene: a dreamlike German railway platform at dusk seen as through a memory — soft fog, warm lamps, an ICE train blurred in the distance, slightly desaturated dreamy edges. ${CONSTRAINTS}` },
  { id: 'hub-video-call-wg', prompt: `${STYLE_PREFIX} Scene: a cozy German shared-flat kitchen seen slightly soft as if through a video call — fairy lights, herb pots on the windowsill, snowy evening outside the window. ${CONSTRAINTS}` },
  { id: 'hub-supermarket', prompt: `${STYLE_PREFIX} Scene: a clean bright supermarket aisle with fresh produce crates and bakery shelves, imagined-Germany feel, soft morning light. ${CONSTRAINTS}` },
  { id: 'hub-exam-hall', prompt: `${STYLE_PREFIX} Scene: a calm exam hall with neat rows of wooden desks, morning light, a wall clock, sharpened pencils on the nearest desk. ${CONSTRAINTS}` },
  { id: 'hub-amt-office', prompt: `${STYLE_PREFIX} Scene: a tidy German municipal office waiting area, numbered ticket dispenser, potted plant, neat noticeboard with blank papers. ${CONSTRAINTS}` },
  { id: 'hub-praxis', prompt: `${STYLE_PREFIX} Scene: a friendly doctor's practice waiting room — light wood, green plants, soft chairs, reception counter, calm and clean. ${CONSTRAINTS}` },
  { id: 'hub-kerala-park', prompt: `${STYLE_PREFIX} Scene: a Kerala city park in late afternoon — walking path, rain trees, a cricket game far in the distance as tiny silhouettes, golden light. ${CONSTRAINTS}` },
  { id: 'hub-celebration', prompt: `${STYLE_PREFIX} Scene: a festive Kerala home courtyard at night strung with warm fairy lights and marigold garlands, sparklers glow, celebration mood. ${CONSTRAINTS}` },
];

async function collectLessonJobs(): Promise<SceneJob[]> {
  const jobs: SceneJob[] = [];
  for (let i = 1; i <= 18; i++) {
    const p = String(i).padStart(2, '0');
    const m = await import(pathToFileURL(path.resolve(`src/lib/content/modules/module-${p}.ts`)).href);
    const mod = m[`MODULE_${i}`];
    for (const l of mod.lessons) {
      const s = l.storyScene;
      if (!s) continue;
      jobs.push({ id: l.id, prompt: visualPrompt(s.setting.name, s.setting.description, s.setting.timeOfDay) });
    }
  }
  return jobs;
}

function compressTo(outPath: string, png: Buffer) {
  const tmp = outPath + '.tmp.png';
  fs.writeFileSync(tmp, png);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp, '-q:v', '4', outPath]);
  fs.unlinkSync(tmp);
}

function writeReviewHtml(dir: string, ids: string[], candsPerScene: number, file = 'review.html') {
  const rows = ids
    .map((id) => {
      const imgs = Array.from({ length: candsPerScene }, (_, i) =>
        `<div><img src="${id}/cand-${i + 1}.jpg" loading="lazy" style="width:160px"/><br/><label><input type="checkbox" data-id="${id}" data-cand="${i + 1}"/> pick</label></div>`,
      ).join('');
      return `<div style="margin:14px 0"><b>${id}</b><div style="display:flex;gap:8px;flex-wrap:wrap">${imgs}</div></div>`;
    })
    .join('\n');
  fs.writeFileSync(
    path.join(dir, file),
    `<html><body style="font-family:sans-serif;background:#111;color:#eee">
<h2>Scene candidates — tick one per scene, then copy the JSON below</h2>${rows}
<pre id="out" style="position:fixed;bottom:0;right:0;background:#222;padding:8px;max-width:400px"></pre>
<script>document.addEventListener('change',()=>{const picks={};document.querySelectorAll('input:checked').forEach(c=>picks[c.dataset.id]=Number(c.dataset.cand));document.getElementById('out').textContent=JSON.stringify(picks,null,1)});</script>
</body></html>`,
    'utf8',
  );
}

async function styleLock() {
  fs.mkdirSync(STYLE_OUT, { recursive: true });
  const subject =
    'Scene: a Kerala roadside chayakkada tea stall at dawn, steam rising from tea glasses, brass kettle, wooden bench.';
  const styles: Record<string, string> = {
    'a-watercolor': 'Soft watercolor illustration, loose washes, warm golden Kerala light, paper texture.',
    'b-painterly': STYLE_PREFIX,
    'c-flat-modern': 'Flat modern vector illustration, layered depth, warm gold and deep green palette, subtle grain.',
    'd-cinematic-anime': 'Cinematic anime background art, detailed and lush, golden hour glow, Makoto-Shinkai-like skies.',
  };
  for (const [name, style] of Object.entries(styles)) {
    recordSpend({ batch: 'style-lock', model: MODEL, units: 2, unitType: 'image', estCostUsd: PRICE * 2, note: name });
    const imgs = await generateImages(MODEL, `${style} ${subject} ${CONSTRAINTS}`, { sampleCount: 2, aspectRatio: '9:16' });
    imgs.forEach((b64, i) => compressTo(path.join(STYLE_OUT, `${name}-${i + 1}.jpg`), Buffer.from(b64, 'base64')));
    console.log(`style ${name}: ${imgs.length} images`);
  }
  const rows = Object.keys(styles)
    .flatMap((n) => [1, 2].map((i) => `<div><b>${n}-${i}</b><br/><img src="${n}-${i}.jpg" style="width:230px"/></div>`))
    .join('');
  fs.writeFileSync(path.join(STYLE_OUT, 'review.html'), `<html><body style="background:#111;color:#eee;font-family:sans-serif"><div style="display:flex;gap:10px;flex-wrap:wrap">${rows}</div></body></html>`);
  console.log(`\nReview: ${path.join(STYLE_OUT, 'review.html')}`);
  console.log(summary());
}

async function fullBatch(candidates: number, dryRun: boolean, only?: string[]) {
  let jobs = [...(await collectLessonJobs()), ...HUB_SCENES];
  if (only?.length) jobs = jobs.filter((j) => only.includes(j.id));
  const totalImages = jobs.length * candidates;
  const totalCost = totalImages * PRICE;
  console.log(`scenes: ${jobs.length} · candidates: ${candidates} · images: ${totalImages} · est $${totalCost.toFixed(2)} (€${(totalCost * 0.93).toFixed(2)})`);
  if (dryRun) {
    for (const j of jobs.slice(0, 3)) console.log(`\n[${j.id}] ${j.prompt.slice(0, 220)}…`);
    return;
  }

  let done = 0;
  for (const job of jobs) {
    const dir = path.join(OUT, job.id);
    fs.mkdirSync(dir, { recursive: true });
    const existing = fs.readdirSync(dir).filter((f) => f.startsWith('cand-')).length;
    if (existing >= candidates) { done++; continue; } // resumable

    let made = existing;
    while (made < candidates) {
      const n = Math.min(4, candidates - made);
      recordSpend({ batch: 'scenes', model: MODEL, units: n, unitType: 'image', estCostUsd: PRICE * n, note: job.id });
      try {
        const imgs = await generateImages(MODEL, job.prompt, { sampleCount: n, aspectRatio: '9:16' });
        imgs.forEach((b64, i) => compressTo(path.join(dir, `cand-${made + i + 1}.jpg`), Buffer.from(b64, 'base64')));
        made += imgs.length;
        if (imgs.length === 0) { console.log(`  ${job.id}: 0 images returned (filtered?) — moving on`); break; }
      } catch (err) {
        console.log(`  ${job.id}: ${String(err).slice(0, 160)} — skipping scene`);
        break;
      }
    }
    done++;
    if (done % 10 === 0) console.log(`progress: ${done}/${jobs.length} scenes`);
  }
  writeReviewHtml(OUT, jobs.map((j) => j.id), candidates);
  console.log(`\nReview grid: ${path.join(OUT, 'review.html')}`);
  console.log(summary());
}

const args = process.argv.slice(2);
const candArg = args.includes('--candidates') ? Number(args[args.indexOf('--candidates') + 1]) : 6;
const onlyArg = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : undefined;
if (args.includes('--style-lock')) await styleLock();
else await fullBatch(candArg, args.includes('--dry-run'), onlyArg);
