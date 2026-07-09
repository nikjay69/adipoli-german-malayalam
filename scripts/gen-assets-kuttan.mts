/**
 * Kuttan pose pack (credit-burn batch 6, DECISIONS #9). Regenerates the app's
 * 11 mood images + 4 exam-skill poses using the CANONICAL adult Kuttan
 * (pilot/references/kuttan-canonical.jpg) — the current in-app mood set is an
 * off-canon child character. NOTHING ships without owner approval per image.
 *
 *   npx tsx scripts/gen-assets-kuttan.mts [--candidates 4] [--dry-run]
 *
 * Output: scripts/output/kuttan-pack/<mood>/cand-N.png + review.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { getToken } from './lib/vertex-client.mts';
import { recordSpend, PRICES_USD, summary } from './lib/gemini-budget.mts';

const MODEL = 'gemini-2.5-flash-image';
const PRICE = PRICES_USD[MODEL];
const OUT = path.resolve('scripts/output/kuttan-pack');
const REF = fs.readFileSync('pilot/references/kuttan-canonical.jpg').toString('base64');

const BASE =
  'Using this exact character (same face, same curly hair, same skin tone, early 20s Malayali man), create a full-body 3D Pixar-style render. White cotton shirt, blue jeans, sandals. Plain pure-white background, soft studio lighting, full body visible head to toe, no text, no props except those described.';

const POSES: Record<string, string> = {
  happy: 'standing relaxed with a warm friendly smile, hands loosely at his sides',
  thinking: 'thinking hard, one hand on his chin, eyes up to the side, slight frown of concentration',
  excited: 'excited, both fists pulled in a big YES gesture, beaming grin',
  sad: 'a gentle thoughtful expression, shoulders slightly relaxed, a soft reassuring half-smile, calm and kind',
  celebrating: 'celebrating with both arms thrown up in victory, confetti-free, joyful laugh',
  pointing: 'pointing forward at the viewer with one hand, encouraging coach-like smile',
  waving: 'one hand raised in a friendly open-palm greeting, warm welcoming smile, relaxed posture',
  confused: 'confused, scratching the back of his head, eyebrows raised, lopsided puzzled smile',
  reading: 'holding an open book in both hands and looking down at it, calm focused gentle expression',
  thumbsup: 'giving a confident thumbs-up with one hand, proud smile',
  official: 'standing straight and formal holding a document folder, polite professional smile, shirt neatly tucked',
  listening: 'wearing over-ear headphones, eyes closed, concentrating happily on what he hears',
  writing: 'writing in a small notebook with a pen, focused half-smile',
  speaking: 'speaking confidently with one hand raised mid-gesture, mouth open mid-word, energetic',
  examdesk: 'sitting at a small exam desk with a pencil, alert and ready, confident calm expression',
};

async function generatePose(prompt: string): Promise<string | null> {
  const token = await getToken();
  const res = await fetch(
    `https://aiplatform.googleapis.com/v1/projects/adipoli-german/locations/global/publishers/google/models/${MODEL}:generateContent`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ inlineData: { mimeType: 'image/jpeg', data: REF } }, { text: prompt }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
    },
  );
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json).slice(0, 200));
  const part = json.candidates?.[0]?.content?.parts?.find((p: { inlineData?: { data: string } }) => p.inlineData);
  return part?.inlineData?.data ?? null;
}

const args = process.argv.slice(2);
const candidates = args.includes('--candidates') ? Number(args[args.indexOf('--candidates') + 1]) : 4;
const moods = Object.keys(POSES);
console.log(`poses: ${moods.length} · candidates: ${candidates} · est $${(moods.length * candidates * PRICE).toFixed(2)}`);
if (args.includes('--dry-run')) process.exit(0);

for (const mood of moods) {
  const dir = path.join(OUT, mood);
  fs.mkdirSync(dir, { recursive: true });
  const existing = fs.readdirSync(dir).filter((f) => f.startsWith('cand-')).length;
  for (let i = existing; i < candidates; i++) {
    recordSpend({ batch: 'kuttan', model: MODEL, units: 1, unitType: 'image', estCostUsd: PRICE, note: mood });
    try {
      const b64 = await generatePose(`${BASE} Pose: ${POSES[mood]}.`);
      if (b64) fs.writeFileSync(path.join(dir, `cand-${i + 1}.png`), Buffer.from(b64, 'base64'));
    } catch (err) {
      console.log(`  ${mood}: ${String(err).slice(0, 120)}`);
    }
  }
  console.log(`done: ${mood}`);
}

const rows = moods
  .map((m) => {
    const imgs = Array.from({ length: candidates }, (_, i) =>
      `<div><img src="${m}/cand-${i + 1}.png" loading="lazy" style="width:140px"/><br/><label><input type="checkbox" data-id="${m}" data-cand="${i + 1}"/> pick</label></div>`).join('');
    return `<div style="margin:12px 0"><b>${m}</b><div style="display:flex;gap:8px;flex-wrap:wrap">${imgs}</div></div>`;
  })
  .join('\n');
fs.writeFileSync(
  path.join(OUT, 'review.html'),
  `<html><body style="font-family:sans-serif;background:#111;color:#eee"><h2>Kuttan pose pack — owner approval required per image</h2>${rows}
<pre id="out" style="position:fixed;bottom:0;right:0;background:#222;padding:8px"></pre>
<script>document.addEventListener('change',()=>{const p={};document.querySelectorAll('input:checked').forEach(c=>p[c.dataset.id]=Number(c.dataset.cand));document.getElementById('out').textContent=JSON.stringify(p,null,1)});</script></body></html>`,
);
console.log(`Review: ${path.join(OUT, 'review.html')}`);
console.log(summary());
