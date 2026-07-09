/**
 * Veo ambient scene loops (credit-burn batch 7, owner-approved experiment).
 * Strictly no characters, no speech, no text. Ship only if review passes and
 * each compresses ≤1.5 MB (phone-first data budget); fallback = painterly stills.
 *
 *   npx tsx scripts/gen-assets-veo.mts --test          # one clip, fast tier
 *   npx tsx scripts/gen-assets-veo.mts [--model veo-3.1-fast-generate-preview]
 *
 * Output: scripts/output/veo-loops/<id>.mp4 (+ review.html)
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateVideo } from './lib/vertex-client.mts';
import { recordSpend, PRICES_USD, summary } from './lib/gemini-budget.mts';

const OUT = path.resolve('scripts/output/veo-loops');
const DURATION = 6;

const STYLE =
  'Living painterly illustration style, warm golden Kerala light, soft brushstroke textures, gentle slow ambient motion only, calm and atmospheric, seamless loopable feel. No people, no characters, no animals, no text, no logos. Static camera.';

const LOOPS: Record<string, string> = {
  'chayakkada-steam': `${STYLE} A Kerala roadside tea stall at dawn: steam drifts slowly from tea glasses, a brass kettle gleams, leaves sway slightly.`,
  'thrissur-rain': `${STYLE} Monsoon rain falling softly past a Kerala home veranda with terracotta tiles, drops dripping from the roof edge, warm lamp glow from inside.`,
  'kochi-street': `${STYLE} A quiet Kochi street at dawn, palm fronds swaying gently, soft mist, distant Chinese fishing nets silhouetted, warm light growing.`,
  'dream-platform': `${STYLE} A dreamlike German railway platform at dusk: soft fog drifting, warm lamps glowing and flickering faintly, memory-like softness at the edges.`,
  'study-desk-night': `${STYLE} A study desk at night in a Kerala home: warm desk lamp glow breathing softly, ceiling-fan shadow turning slowly, moths near the window light.`,
  'bakery-courtyard': `${STYLE} A sunlit courtyard bakery: dappled light shifting through leaves, faint steam from a coffee machine, dust motes floating.`,
  'library-motes': `${STYLE} A quiet library reading room: dust motes drifting in tall shafts of afternoon light, a page corner lifting slightly in a breeze.`,
  'exam-hall-calm': `${STYLE} A calm empty exam hall in morning light: curtain breathing gently at an open window, wall-clock second hand moving, stillness.`,
  'celebration-lights': `${STYLE} A Kerala home courtyard at night: strings of warm fairy lights twinkling softly, marigold garlands swaying, festive calm.`,
  'kerala-park': `${STYLE} A Kerala city park at golden hour: rain trees swaying slowly, long shadows shifting, birds far in the distance as tiny specks.`,
  // Course-moment loops: per-situation ambient backdrops (M4-M8) + Kerala
  // atmosphere. Used behind hero moments and banked as owner video B-roll.
  'market-stall': `${STYLE} A Kerala vegetable market stall: produce crates in soft focus, a hanging scale swaying gently, dappled light, steam from a nearby cart.`,
  'restaurant-table': `${STYLE} A cozy restaurant table set for two: a candle flame flickering softly, steam rising from a dish, warm evening glow.`,
  'kerala-train-platform': `${STYLE} A Kerala railway platform at dawn: empty tracks shimmering, a signal lamp glowing, palms swaying, soft mist lifting.`,
  'office-desk-day': `${STYLE} A bright office desk by a window: a desk plant leaves trembling in AC breeze, sunlight shifting across papers, calm productivity.`,
  'amt-waiting': `${STYLE} A German municipal office waiting area: a number-display glowing softly (no readable text), a potted plant, still and orderly, daylight.`,
  'onam-courtyard': `${STYLE} A Kerala courtyard during Onam: a pookalam flower carpet, brass lamp flames flickering, soft festive light, gentle stillness.`,
  'monsoon-study-window': `${STYLE} View of heavy monsoon rain through a study window at night: rivulets running down glass, a warm lamp reflection, cozy focus.`,
  'sunrise-grove': `${STYLE} A Kerala coconut grove at sunrise: fronds swaying slowly, golden mist between trunks, soft light rays, birds as distant specks.`,
};

const args = process.argv.slice(2);
const model = args.includes('--model') ? args[args.indexOf('--model') + 1] : 'veo-3.1-fast-generate-001';
const priceKey = model.includes('fast') ? 'veo-3.1-fast-generate-preview-per-sec' : 'veo-3.1-generate-preview-per-sec';
const pricePerSec = PRICES_USD[priceKey as keyof typeof PRICES_USD];

fs.mkdirSync(OUT, { recursive: true });
const jobs = args.includes('--test') ? Object.entries(LOOPS).slice(0, 1) : Object.entries(LOOPS);
console.log(`veo loops: ${jobs.length} × ${DURATION}s @ $${pricePerSec}/s (${model}) — est $${(jobs.length * DURATION * pricePerSec).toFixed(2)}`);
if (args.includes('--dry-run')) process.exit(0);

for (const [id, prompt] of jobs) {
  const outPath = path.join(OUT, `${id}.mp4`);
  if (fs.existsSync(outPath)) { console.log(`skip ${id} (exists)`); continue; }
  recordSpend({ batch: 'veo', model, units: DURATION, unitType: 'seconds', estCostUsd: DURATION * pricePerSec, note: id });
  try {
    const vids = await generateVideo(model, prompt, { durationSeconds: DURATION, aspectRatio: '9:16' });
    if (vids.length) {
      fs.writeFileSync(outPath, Buffer.from(vids[0], 'base64'));
      console.log(`OK ${id} (${(fs.statSync(outPath).size / 1e6).toFixed(1)} MB raw)`);
    } else console.log(`EMPTY ${id}`);
  } catch (err) {
    console.log(`FAIL ${id}: ${String(err).slice(0, 160)}`);
  }
}

const rows = Object.keys(LOOPS)
  .map((id) => `<div style="margin:10px"><b>${id}</b><br/><video src="${id}.mp4" width="200" autoplay loop muted></video></div>`)
  .join('');
fs.writeFileSync(path.join(OUT, 'review.html'), `<html><body style="background:#111;color:#eee;font-family:sans-serif"><div style="display:flex;flex-wrap:wrap">${rows}</div></body></html>`);
console.log(summary());
