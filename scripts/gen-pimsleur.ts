/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Pimsleur-style lesson generator.
 *
 * Reads a lesson JSON with structured voice lines + pauses, generates
 * multi-voice TTS clips (msedge-tts, free), and stitches them into
 * a single MP3 via ffmpeg.
 *
 * Usage:  npx tsx scripts/gen-pimsleur.ts <lesson.json> <output.mp3>
 *
 * lesson.json shape:
 *   {
 *     "title": "Episode 1",
 *     "lines": [
 *       { "voice": "narrator",         "text": "Welcome.",      "pauseAfterMs": 400 },
 *       { "voice": "german",           "text": "Hallo.",        "pauseAfterMs": 2500 },
 *       { "voice": "narrator",         "text": "Repeat.",       "pauseAfterMs": 200 },
 *       { "voice": "german",           "text": "Hallo.",        "pauseAfterMs": 3500 }
 *     ]
 *   }
 *
 * Voice tokens map to MS Edge voices:
 *   narrator       → en-IN-NeerjaNeural (warm Malayali female)
 *   narrator-male  → en-IN-PrabhatNeural
 *   german         → de-DE-KatjaNeural (female native)
 *   german-male    → de-DE-ConradNeural
 *   malayalam      → ml-IN-SobhanaNeural
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const VOICE_MAP: Record<string, string> = {
  'narrator': 'en-IN-NeerjaNeural',
  'narrator-male': 'en-IN-PrabhatNeural',
  'german': 'de-DE-KatjaNeural',
  'german-male': 'de-DE-ConradNeural',
  'malayalam': 'ml-IN-SobhanaNeural',
};

interface Line {
  voice: keyof typeof VOICE_MAP | string;
  text: string;
  pauseAfterMs?: number;
}

interface Lesson {
  title: string;
  lines: Line[];
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateTTSClip(text: string, voiceName: string, tmpDir: string, id: string, maxAttempts = 4): Promise<string> {
  const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
  let lastErr: Error | null = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const perLineDir = path.join(tmpDir, `clip-${id}`);
      fs.mkdirSync(perLineDir, { recursive: true });
      await tts.toFile(perLineDir, text);
      const generated = path.join(perLineDir, 'audio.mp3');
      const finalPath = path.join(tmpDir, `${id}.mp3`);
      fs.copyFileSync(generated, finalPath);
      fs.rmSync(perLineDir, { recursive: true, force: true });
      tts.close();
      return finalPath;
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error(String(err));
      const backoffMs = 1000 * Math.pow(2, attempt - 1) + Math.random() * 500;
      console.log(`    ⚠ attempt ${attempt} failed (${lastErr.message.slice(0, 60)}) — retrying in ${Math.round(backoffMs)}ms`);
      await sleep(backoffMs);
    }
  }
  throw lastErr ?? new Error('TTS failed');
}

function generateSilence(durationMs: number, tmpDir: string, id: string): string {
  const outPath = path.join(tmpDir, `silence-${id}.mp3`);
  const seconds = Math.max(0.1, durationMs / 1000);
  // Generate silent MP3 at 24kHz mono to match msedge-tts output.
  const res = spawnSync('ffmpeg', [
    '-y',
    '-f', 'lavfi',
    '-i', `anullsrc=r=24000:cl=mono`,
    '-t', String(seconds),
    '-b:a', '48k',
    '-acodec', 'libmp3lame',
    outPath,
  ], { stdio: 'pipe' });
  if (res.status !== 0) {
    throw new Error('ffmpeg silence gen failed: ' + res.stderr?.toString());
  }
  return outPath;
}

function concatMp3s(files: string[], outPath: string, tmpDir: string) {
  const listPath = path.join(tmpDir, 'concat-list.txt');
  fs.writeFileSync(listPath, files.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join('\n'));
  const res = spawnSync('ffmpeg', [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', listPath,
    '-acodec', 'libmp3lame',
    '-ar', '24000',
    '-ac', '1',
    '-b:a', '64k',
    outPath,
  ], { stdio: 'pipe' });
  if (res.status !== 0) {
    throw new Error('ffmpeg concat failed: ' + res.stderr?.toString());
  }
}

async function main() {
  const [, , lessonPath, outputPath] = process.argv;
  if (!lessonPath || !outputPath) {
    console.error('Usage: gen-pimsleur.ts <lesson.json> <output.mp3>');
    process.exit(1);
  }

  const lesson: Lesson = JSON.parse(fs.readFileSync(path.resolve(lessonPath), 'utf-8'));
  console.log(`Lesson: ${lesson.title} — ${lesson.lines.length} lines`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pimsleur-'));
  const clips: string[] = [];

  try {
    for (let i = 0; i < lesson.lines.length; i++) {
      const line = lesson.lines[i];
      const voiceName = VOICE_MAP[line.voice] ?? line.voice;
      const id = String(i).padStart(3, '0');
      process.stdout.write(`  [${i + 1}/${lesson.lines.length}] ${line.voice}: "${line.text.slice(0, 40)}${line.text.length > 40 ? '…' : ''}"\n`);
      const clip = await generateTTSClip(line.text, voiceName, tmpDir, `line-${id}`);
      clips.push(clip);
      const pause = line.pauseAfterMs ?? 400;
      if (pause > 0) {
        const silence = generateSilence(pause, tmpDir, `pause-${id}`);
        clips.push(silence);
      }
      // Small inter-call delay to avoid MS Edge rate-limiting
      await sleep(150);
    }

    const absOut = path.resolve(outputPath);
    fs.mkdirSync(path.dirname(absOut), { recursive: true });
    console.log(`Stitching ${clips.length} clips → ${absOut}`);
    concatMp3s(clips, absOut, tmpDir);

    const sizeKB = Math.round(fs.statSync(absOut).size / 1024);
    console.log(`Done: ${absOut} (${sizeKB} KB)`);
  } finally {
    // Leave tmpDir for inspection if needed; clean on success
    // fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
