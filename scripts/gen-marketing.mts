/**
 * Marketing asset batch (owner-directed, 2026-06-14). Instagram-reel B-roll +
 * social graphics for "Adipoli German — Kerala to Germany". No text baked in
 * (owner overlays copy). Cap-aware (€46 marketing batch, €250 global).
 *
 *   npx tsx scripts/gen-marketing.mts --dry-run
 *   npx tsx scripts/gen-marketing.mts [--tier fast|standard]
 */
import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { generateVideo, generateImages } from './lib/vertex-client.mts';
import { recordSpend, PRICES_USD, summary, batchEur } from './lib/gemini-budget.mts';

const OUT = path.resolve('scripts/output/marketing');
const VID = path.join(OUT, 'veo');
const IMG = path.join(OUT, 'graphics');
fs.mkdirSync(VID, { recursive: true });
fs.mkdirSync(IMG, { recursive: true });

const CINE = 'Cinematic vertical marketing footage, warm golden Kerala light, photoreal, shallow depth of field, gentle slow camera movement. No text, no logos, no captions.';

// Brand-narrative reel clips: aspiration → study → exam → journey → arrival.
const CLIPS: Record<string, string> = {
  'study-desk-flag': `${CINE} A young Malayali woman studies German at a wooden desk by a sunlit window, a small German flag and a textbook on the desk, hopeful focused expression, soft push-in.`,
  'chai-and-books': `${CINE} Close-up of a glass of Kerala chai steaming beside an open German grammar book and headphones on a wooden table, morning light, cozy study mood.`,
  'phone-learning': `${CINE} A young Malayali man smiles while practising German on his phone on a Kerala veranda, palm trees softly blurred behind, golden hour, gentle motion.`,
  'writing-german': `${CINE} Extreme close-up of a hand writing German words in a notebook with a fountain pen, warm desk lamp glow, shallow focus, slow pan.`,
  'group-study': `${CINE} Three young Malayali friends study German together at a Kochi cafe table, laughing and pointing at a book, lively warm afternoon light.`,
  'exam-focus': `${CINE} A calm exam hall, a young Malayali student fills an answer sheet with quiet confidence, soft window light, slow dolly past empty desks.`,
  'certificate-joy': `${CINE} A young Malayali woman joyfully holds up a certificate at home, family blurred and clapping behind her, warm celebratory evening light, confetti-free.`,
  'packing-dream': `${CINE} A suitcase being packed on a bed in a Kerala home, a German phrasebook placed on top, soft curtains and warm light, dreamy slow motion.`,
  'airport-departure': `${CINE} A young Malayali traveler walks through a sunlit airport terminal with a backpack, hopeful and excited, lens flare, slow tracking shot.`,
  'german-city-dream': `${CINE} A dreamy soft-focus European city street at golden hour with trams and old buildings, imagined-future feeling, gentle drifting camera.`,
  'video-call-cousin': `${CINE} A young Malayali woman happily video-calls on a laptop at home, a cozy German kitchen visible on the screen, warm evening light.`,
  'sunrise-motivation': `${CINE} Sunrise over Kerala coconut palms seen from a study window, a notebook and coffee on the sill in soft focus, peaceful motivating dawn light.`,
  'speaking-confident': `${CINE} A young Malayali man speaks confidently and gestures while practising German aloud at home, warm light, natural relaxed energy, slow push-in.`,
  'kochi-to-world': `${CINE} A young Malayali woman stands on a Kochi rooftop at golden hour looking toward the horizon with quiet hope, hair in the breeze, slow cinematic pull-back.`,
};

// Static social graphics (Imagen Ultra): hero scenes for posts; no text.
const GRAPHICS: { id: string; prompt: string; ratio: string }[] = [
  { id: 'hero-kerala-germany-9x16', prompt: `Warm painterly poster illustration, a Malayali student silhouette at a desk in the foreground looking toward a soft dreamy German cityscape in the distance, golden-to-blue gradient sky, aspirational, no text, room at the top and bottom for captions.`, ratio: '9:16' },
  { id: 'hero-desk-1x1', prompt: `Warm cinematic photo-style image, a tidy study desk with a German textbook, a small German flag, chai and headphones, golden Kerala window light, clean composition, no text.`, ratio: '1:1' },
  { id: 'hero-celebration-9x16', prompt: `Warm joyful illustration of a young Malayali woman celebrating holding a certificate, soft fairy lights and marigold colours, festive aspirational mood, no text, space for captions.`, ratio: '9:16' },
  { id: 'hero-journey-1x1', prompt: `Aspirational illustration, a suitcase with a German phrasebook and a boarding pass on a bed in a warm Kerala home, soft morning light, no text.`, ratio: '1:1' },
  { id: 'hero-chai-books-9x16', prompt: `Cozy warm photo-style image, Kerala chai glass steaming beside an open German book and headphones, deep greens and golds, vertical, no text, space for captions.`, ratio: '9:16' },
  { id: 'hero-classroom-1x1', prompt: `Warm painterly Goethe-style language classroom in Kochi, sunlight through windows, inviting and hopeful, no people, no text.`, ratio: '1:1' },
];

const args = process.argv.slice(2);
const dry = args.includes('--dry-run');
const tier = args.includes('--tier') ? args[args.indexOf('--tier') + 1] : 'standard';
const veoModel = tier === 'fast' ? 'veo-3.1-fast-generate-001' : 'veo-3.1-generate-001';
const veoPrice = tier === 'fast' ? PRICES_USD['veo-3.1-fast-generate-preview-per-sec'] : PRICES_USD['veo-3.1-generate-preview-per-sec'];
const DUR = 8;

const clipCost = DUR * veoPrice;
const imgCost = GRAPHICS.length * PRICES_USD['imagen-4.0-ultra-generate-001'];
console.log(`marketing: ${Object.keys(CLIPS).length} veo clips @ ${DUR}s (${tier}, $${clipCost.toFixed(2)}/clip) + ${GRAPHICS.length} graphics`);
console.log(`est: $${(Object.keys(CLIPS).length * clipCost + imgCost).toFixed(2)} (€${((Object.keys(CLIPS).length * clipCost + imgCost) * 0.93).toFixed(2)})`);
if (dry) process.exit(0);

// Graphics first (cheap, reliable)
for (const g of GRAPHICS) {
  const out = path.join(IMG, `${g.id}.jpg`);
  if (fs.existsSync(out)) continue;
  recordSpend({ batch: 'marketing', model: 'imagen-4.0-ultra-generate-001', units: 1, unitType: 'image', estCostUsd: PRICES_USD['imagen-4.0-ultra-generate-001'], note: `graphic ${g.id}` });
  try {
    const imgs = await generateImages('imagen-4.0-ultra-generate-001', g.prompt, { sampleCount: 1, aspectRatio: g.ratio });
    if (imgs[0]) { const tmp = out + '.png'; fs.writeFileSync(tmp, Buffer.from(imgs[0], 'base64')); execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp, '-q:v', '3', out]); fs.unlinkSync(tmp); console.log('graphic', g.id); }
  } catch (e) { console.log('graphic fail', g.id, String(e).slice(0, 80)); }
}

// Veo clips — cap-aware, with one retry each
for (const [id, prompt] of Object.entries(CLIPS)) {
  const out = path.join(VID, `${id}.mp4`);
  if (fs.existsSync(out)) { console.log('skip', id); continue; }
  if (batchEur('marketing') + clipCost * 0.93 > 45) { console.log('approaching marketing cap — stopping clips'); break; }
  let ok = false;
  for (let attempt = 1; attempt <= 2 && !ok; attempt++) {
    recordSpend({ batch: 'marketing', model: veoModel, units: DUR, unitType: 'seconds', estCostUsd: clipCost, note: `${id} a${attempt}` });
    try {
      const vids = await generateVideo(veoModel, prompt, { durationSeconds: DUR, aspectRatio: '9:16' });
      if (vids.length) { fs.writeFileSync(out, Buffer.from(vids[0], 'base64')); console.log('clip', id, (fs.statSync(out).size / 1e6).toFixed(1) + 'MB'); ok = true; }
      else console.log('clip empty', id, 'attempt', attempt);
    } catch (e) { console.log('clip fail', id, 'attempt', attempt, String(e).slice(0, 120)); }
  }
}

console.log('\n' + summary());
