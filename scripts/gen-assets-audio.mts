/**
 * German audio generation via Cloud Text-to-Speech (credit-burn batches 1+2).
 *
 *   npx tsx scripts/gen-assets-audio.mts [--dry-run] [--only dictation,speaking,...]
 *
 * Jobs (all German text comes verbatim from authored, QA'd content — the only
 * exceptions are the hand-authored checkpoint listening lines below):
 *   dictation  — exercises whose audioUrl file is missing            → that path
 *   speaking   — speaking exercises' model sentences                 → /audio/exercises/<id>-model.mp3
 *   simulator  — goethe-tests Sprechen sample answers/questions      → /audio/sprechen/
 *   checkpoint — spine checkpoint listening items (authored lines)   → /audio/checkpoints/
 *   examples   — vocab example sentences with missing audio          → /audio/examples/
 *   videolines — m1/m2 video def german beats (Phase 3 pre-render)   → /audio/video-models/
 *
 * Voices: Chirp3-HD Kore (female) for dictation/examples/checkpoints,
 * Chirp3-HD Charon (male) for speaking models/simulator — consistent pairing.
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';
import { synthesizeTts } from './lib/vertex-client.mts';
import { recordSpend, PRICES_USD, summary } from './lib/gemini-budget.mts';

const FEMALE = 'de-DE-Chirp3-HD-Kore';
const MALE = 'de-DE-Chirp3-HD-Charon';
const PRICE_PER_CHAR = PRICES_USD['cloud-tts-chirp3-hd-per-1m-chars'] / 1_000_000;

type Job = { kind: string; outPath: string; text: string; voice: string };

// Hand-authored German for checkpoint listen-items whose prompts don't embed a
// full sentence (verified A1 German; matches each item's expected answer).
const CHECKPOINT_LINES: Record<string, string> = {
  'cp2-h-number': 'dreiundzwanzig … siebzehn … vierzig',
  'cp2-h-phone': 'Die Nummer ist null vier sieben eins, drei acht, neun zwei, sechs.',
  'cp2-h-time': 'Der Termin ist um halb drei.',
  'cp4-h-price': 'Das kostet drei Euro fünfzig.',
  'cp4-h-prices': 'zwei Euro neunundneunzig … zwölf Euro fünfzig … sieben Euro zwanzig … ein Euro fünfundvierzig … neun Euro achtzig',
  'cp5-h-zug': 'Der Zug nach Berlin fährt um vierzehn Uhr zwanzig von Gleis drei.',
  'cp5-h-form': 'Der Name ist Anna Schmidt. Der Termin ist um zehn Uhr dreißig.',
};

function exists(rel: string) {
  return fs.existsSync(path.join('public', rel));
}

async function collectJobs(): Promise<Job[]> {
  const jobs: Job[] = [];

  // module content: dictation gaps, speaking models, example gaps
  for (let i = 1; i <= 18; i++) {
    const p = String(i).padStart(2, '0');
    const m = await import(pathToFileURL(path.resolve(`src/lib/content/modules/module-${p}.ts`)).href);
    const mod = m[`MODULE_${i}`];
    for (const l of mod.lessons) {
      for (const ex of l.exercises ?? []) {
        const answer = Array.isArray(ex.correctAnswer) ? ex.correctAnswer[0] : ex.correctAnswer;
        if (ex.audioUrl && !exists(ex.audioUrl) && typeof answer === 'string') {
          jobs.push({ kind: 'dictation', outPath: ex.audioUrl, text: answer, voice: FEMALE });
        }
        if (ex.type === 'speaking' && !ex.audioUrl && typeof answer === 'string') {
          jobs.push({ kind: 'speaking', outPath: `/audio/exercises/${ex.id}-model.mp3`, text: answer, voice: MALE });
        }
      }
      for (const v of l.vocabulary ?? []) {
        if (v.example && !exists(`/audio/examples/${v.id}.mp3`)) {
          jobs.push({ kind: 'examples', outPath: `/audio/examples/${v.id}.mp3`, text: v.example, voice: FEMALE });
        }
      }
    }
  }

  // mock-exam speaking simulator model lines
  const g = await import(pathToFileURL(path.resolve('src/lib/content/goethe-tests.ts')).href);
  for (const t of g.GOETHE_TESTS) {
    t.sprechen.teil1.forEach((item: { sample_answer: string }, i: number) =>
      jobs.push({ kind: 'simulator', outPath: `/audio/sprechen/${t.id}-t1-${i}.mp3`, text: item.sample_answer, voice: MALE }));
    t.sprechen.teil2.forEach((item: { sample_question: string; sample_answer: string }, i: number) => {
      jobs.push({ kind: 'simulator', outPath: `/audio/sprechen/${t.id}-t2-${i}-q.mp3`, text: item.sample_question, voice: FEMALE });
      jobs.push({ kind: 'simulator', outPath: `/audio/sprechen/${t.id}-t2-${i}-a.mp3`, text: item.sample_answer, voice: MALE });
    });
    t.sprechen.teil3.forEach((item: { sample_request: string }, i: number) =>
      jobs.push({ kind: 'simulator', outPath: `/audio/sprechen/${t.id}-t3-${i}.mp3`, text: item.sample_request, voice: MALE }));
  }

  // spine checkpoint listening items
  const sc = await import(pathToFileURL(path.resolve('src/lib/spine-checkpoints.ts')).href);
  for (const cp of Object.values(sc.SPINE_CHECKPOINTS) as { sections: { items: { id: string; mode: string; prompt: string }[] }[] }[]) {
    for (const section of cp.sections) {
      for (const item of section.items) {
        if (item.mode !== 'listen') continue;
        const authored = CHECKPOINT_LINES[item.id];
        const embedded = item.prompt.match(/Hear: (.+?)(?:\.|$)/)?.[1];
        const text = authored ?? (embedded ? `${embedded}.` : undefined);
        if (text) jobs.push({ kind: 'checkpoint', outPath: `/audio/checkpoints/${item.id}.mp3`, text, voice: FEMALE });
      }
    }
  }

  // Phase 3 video model lines (M1+M2 defs only — others have no written scripts)
  for (const defFile of ['scripts/m1-video-defs.json', 'scripts/m2-video-defs.json']) {
    const defs = JSON.parse(fs.readFileSync(defFile, 'utf8'));
    for (const video of defs) {
      (video.beats ?? []).forEach((beat: { german?: string }, bi: number) => {
        if (beat.german) jobs.push({ kind: 'videolines', outPath: `/audio/video-models/${video.videoId}-b${bi}.mp3`, text: beat.german, voice: MALE });
      });
    }
  }

  return jobs.filter((j) => !exists(j.outPath)); // resumable
}

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : undefined;
let jobs = await collectJobs();
if (only) jobs = jobs.filter((j) => only.includes(j.kind));

const chars = jobs.reduce((s, j) => s + j.text.length, 0);
const cost = chars * PRICE_PER_CHAR;
const byKind = [...new Set(jobs.map((j) => j.kind))].map((k) => `${k}: ${jobs.filter((j) => j.kind === k).length}`).join(' · ');
console.log(`audio jobs: ${jobs.length} (${byKind}) · ${chars} chars · est $${cost.toFixed(2)} (€${(cost * 0.93).toFixed(2)})`);

if (args.includes('--dry-run')) {
  for (const j of jobs.slice(0, 5)) console.log(`  [${j.kind}] ${j.outPath} ← "${j.text.slice(0, 60)}"`);
  process.exit(0);
}

let done = 0;
for (const job of jobs) {
  const batch = job.kind === 'videolines' ? 'video-lines' : 'audio-core';
  recordSpend({ batch, model: 'cloud-tts-chirp3-hd', units: job.text.length, unitType: 'chars', estCostUsd: job.text.length * PRICE_PER_CHAR, note: job.outPath });
  try {
    const mp3 = await synthesizeTts(job.text, { voiceName: job.voice });
    const out = path.join('public', job.outPath);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, mp3);
  } catch (err) {
    console.log(`  FAIL ${job.outPath}: ${String(err).slice(0, 140)}`);
  }
  done++;
  if (done % 50 === 0) console.log(`progress: ${done}/${jobs.length}`);
}
console.log(summary());
