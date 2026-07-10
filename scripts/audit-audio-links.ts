/**
 * Asset link audit (roadmap fix #7): every audioUrl/imageUrl referenced by
 * content must resolve to a real file in public/. Wired into `npm run qa` —
 * exits 1 on any missing file so broken dictations can never ship silently.
 *
 *   npx tsx scripts/audit-audio-links.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

const missing: string[] = [];
const pendingHits: string[] = [];
let audioRefs = 0;
let imageRefs = 0;

// Files queued for the Sprint 6 TTS batch (DECISIONS #13) are pending, not missing.
const ttsQueue: Set<string> = (() => {
  try {
    const q = JSON.parse(fs.readFileSync(path.resolve('scripts/tts-queue.json'), 'utf8'));
    return new Set((q.pending ?? []).map((e: { file: string }) => e.file));
  } catch {
    return new Set<string>();
  }
})();

function check(ref: string | undefined, kind: 'audio' | 'image', where: string) {
  if (!ref) return;
  if (kind === 'audio') audioRefs++;
  else imageRefs++;
  if (fs.existsSync(path.join('public', ref))) return;
  if (ttsQueue.has(ref)) pendingHits.push(`${where}: ${ref}`);
  else missing.push(`${where}: ${ref}`);
}

async function main() {
  for (let i = 1; i <= 18; i++) {
    const p = String(i).padStart(2, '0');
    const m = await import(pathToFileURL(path.resolve(`src/lib/content/modules/module-${p}.ts`)).href);
    const mod = m[`MODULE_${i}`];
    for (const lesson of mod.lessons) {
      for (const ex of lesson.exercises ?? []) {
        check(ex.audioUrl, 'audio', ex.id);
        check(ex.imageUrl, 'image', ex.id);
      }
      for (const v of lesson.vocabulary ?? []) {
        check(v.audioUrl, 'audio', v.id);
        check(v.exampleAudioUrl, 'audio', v.id);
      }
    }
  }

  // spine checkpoint tasks (administered runner: dictation + model audio)
  const sc = await import(pathToFileURL(path.resolve('src/lib/spine-checkpoints.ts')).href);
  for (const cp of Object.values(sc.SPINE_CHECKPOINTS) as { sections: { items: { id: string; task?: { audioUrl?: string; modelAudioUrl?: string } }[] }[] }[]) {
    for (const section of cp.sections) {
      for (const item of section.items) {
        check(item.task?.audioUrl, 'audio', item.id);
        check(item.task?.modelAudioUrl, 'audio', item.id);
      }
    }
  }

  console.log(
    `asset links: ${audioRefs} audio + ${imageRefs} image refs checked, ${missing.length} missing` +
      (pendingHits.length ? `, ${pendingHits.length} pending TTS batch (scripts/tts-queue.json)` : '')
  );
  for (const p of pendingHits.slice(0, 25)) console.log('  PENDING ' + p);
  if (missing.length) {
    for (const m of missing.slice(0, 25)) console.log('  MISSING ' + m);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
