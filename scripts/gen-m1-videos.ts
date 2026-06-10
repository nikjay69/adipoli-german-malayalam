/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Batch-generate all M1 lesson-intro placeholder videos.
 *
 * For each video definition in m1-video-defs.json:
 *   1. Generate per-line TTS with msedge-tts (with retries + delay).
 *   2. Write a Remotion props JSON for the LessonIntroVideo composition.
 *   3. Render to public/videos/generated/{videoId}.mp4 via the existing render-video.ts.
 *
 * Skips any video whose MP4 already exists (idempotent).
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

type Beat = { text: string; german?: string; malayalam?: string; mood: string };
type VocabCard = { german: string; english: string; malayalam: string; pronunciation: string };
type VideoDef = {
  videoId: string;
  title: string;
  subtitle: string;
  beats: Beat[];
  vocabCards: VocabCard[];
};

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

async function genTTSClip(text: string, voice: string, outPath: string, maxAttempts = 4): Promise<void> {
  const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const dir = path.dirname(outPath);
      const basename = path.basename(outPath, '.mp3');
      const tmpDir = path.join(dir, `.tmp-${basename}`);
      fs.mkdirSync(tmpDir, { recursive: true });
      await tts.toFile(tmpDir, text);
      fs.copyFileSync(path.join(tmpDir, 'audio.mp3'), outPath);
      fs.rmSync(tmpDir, { recursive: true, force: true });
      tts.close();
      return;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const backoffMs = 1500 * Math.pow(2, attempt - 1) + Math.random() * 500;
      console.log(`    ⚠ TTS attempt ${attempt} failed (${msg.slice(0, 50)}) — retry in ${Math.round(backoffMs)}ms`);
      await sleep(backoffMs);
    }
  }
  throw new Error(`TTS failed after ${maxAttempts} attempts`);
}

async function processVideo(def: VideoDef): Promise<void> {
  const mp4Path = path.resolve(`public/videos/generated/${def.videoId}.mp4`);
  if (fs.existsSync(mp4Path)) {
    console.log(`  ⏭  ${def.videoId}.mp4 already exists — skipping`);
    return;
  }

  console.log(`\n=== ${def.videoId} — ${def.title} ===`);

  // 1. Generate TTS audio per beat
  const ttsDir = path.resolve(`public/audio/tts/${def.videoId}`);
  fs.mkdirSync(ttsDir, { recursive: true });

  const audioSources: string[] = [];
  for (let i = 0; i < def.beats.length; i++) {
    const beat = def.beats[i];
    const audioPath = path.join(ttsDir, `${def.videoId}-line-${i}.mp3`);
    const relPath = `audio/tts/${def.videoId}/${def.videoId}-line-${i}.mp3`;
    console.log(`  [tts ${i + 1}/${def.beats.length}] "${beat.text.slice(0, 50)}..."`);
    if (!fs.existsSync(audioPath)) {
      await genTTSClip(beat.text, 'en-IN-NeerjaNeural', audioPath);
      await sleep(300); // rate-limit buffer
    }
    audioSources.push(relPath);
  }

  // 2. Write props JSON
  const props = {
    lessonId: def.videoId,
    title: def.title,
    subtitle: def.subtitle,
    accentColor: '#d4a520',
    scriptLines: def.beats.map((beat, i) => ({
      text: beat.text,
      ...(beat.german ? { german: beat.german } : {}),
      ...(beat.malayalam ? { malayalam: beat.malayalam } : {}),
      mood: beat.mood,
      audioSrc: audioSources[i],
    })),
    vocabCards: def.vocabCards,
    outroText: 'Los geht\u2019s!',
  };
  const propsPath = path.resolve(`scripts/props/${def.videoId}.json`);
  fs.writeFileSync(propsPath, JSON.stringify(props, null, 2));
  console.log(`  ✓ props: ${propsPath}`);

  // 3. Render MP4
  console.log(`  → rendering ${def.videoId}.mp4 ...`);
  const res = spawnSync('npx', [
    'tsx',
    'scripts/render-video.ts',
    'LessonIntro',
    mp4Path,
    propsPath,
  ], { stdio: 'pipe' });
  if (res.status !== 0) {
    console.error(`  ❌ render failed:`, res.stderr?.toString()?.slice(0, 500));
    throw new Error(`render ${def.videoId} failed`);
  }
  const sizeMB = (fs.statSync(mp4Path).size / 1024 / 1024).toFixed(1);
  console.log(`  ✓ ${def.videoId}.mp4 (${sizeMB} MB)`);
}

async function main() {
  const defsPath = process.argv[2] ?? 'scripts/m1-video-defs.json';
  const defs: VideoDef[] = JSON.parse(fs.readFileSync(defsPath, 'utf-8'));
  console.log(`Processing ${defs.length} videos from ${defsPath}...\n`);

  let ok = 0;
  let failed: string[] = [];
  for (const def of defs) {
    try {
      await processVideo(def);
      ok++;
    } catch (err) {
      console.error(`  ❌ ${def.videoId}:`, err instanceof Error ? err.message : err);
      failed.push(def.videoId);
    }
  }

  console.log(`\n=== DONE: ${ok} succeeded, ${failed.length} failed ===`);
  if (failed.length) console.log('  Failed:', failed.join(', '));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
