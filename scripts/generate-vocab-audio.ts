/**
 * Generate German pronunciation audio for all vocabulary items
 * Uses edge-tts (Microsoft Neural TTS, free) for high-quality German speech
 *
 * Prerequisites:
 *   pip install edge-tts
 *   ffmpeg installed and on PATH
 *
 * Run with:
 *   npx tsx scripts/generate-vocab-audio.ts
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { ALL_MODULES } from '../src/lib/content/modules';
import type { VocabItem } from '../src/lib/content/modules';

// ── Configuration ──────────────────────────────────────────────────────────
const VOICE = 'de-DE-ConradNeural';
const PROJECT_ROOT = path.resolve(__dirname, '..');
const AUDIO_VOCAB_DIR = path.join(PROJECT_ROOT, 'public', 'audio', 'vocab');
const AUDIO_EXAMPLES_DIR = path.join(PROJECT_ROOT, 'public', 'audio', 'examples');
const TEMP_DIR = path.join(PROJECT_ROOT, 'public', 'audio', '.tmp');

// ── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function checkDependency(command: string, name: string, installInstructions: string): boolean {
  try {
    execSync(`${command} --version`, { stdio: 'pipe' });
    return true;
  } catch {
    console.error(`\n[ERROR] ${name} is not installed or not on PATH.`);
    console.error(`Install it with:\n  ${installInstructions}\n`);
    return false;
  }
}

function escapeShellArg(text: string): string {
  // Escape for shell: wrap in single quotes, escape embedded single quotes
  return `'${text.replace(/'/g, "'\\''")}'`;
}

function generateAudio(text: string, outputPath: string): boolean {
  try {
    const cmd = `edge-tts --voice ${VOICE} --text ${escapeShellArg(text)} --write-media "${outputPath}"`;
    execSync(cmd, { stdio: 'pipe', timeout: 30_000 });
    return true;
  } catch (err: any) {
    console.error(`    [FAILED] Could not generate audio: ${err.message?.split('\n')[0]}`);
    return false;
  }
}

function normalizeVolume(inputPath: string): boolean {
  const tempPath = inputPath.replace('.mp3', '.tmp.mp3');
  try {
    const cmd = `ffmpeg -i "${inputPath}" -af "loudnorm=I=-16" -y "${tempPath}"`;
    execSync(cmd, { stdio: 'pipe', timeout: 30_000 });
    fs.renameSync(tempPath, inputPath);
    return true;
  } catch (err: any) {
    // Clean up temp file if it exists
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    console.error(`    [WARN] Volume normalization failed: ${err.message?.split('\n')[0]}`);
    return false;
  }
}

// ── Extract vocabulary ─────────────────────────────────────────────────────

function extractAllVocab(): VocabItem[] {
  const vocab: VocabItem[] = [];
  for (const mod of ALL_MODULES) {
    for (const lesson of mod.lessons) {
      vocab.push(...lesson.vocabulary);
    }
  }
  return vocab;
}

function deduplicateByGerman(items: VocabItem[]): VocabItem[] {
  const seen = new Set<string>();
  const unique: VocabItem[] = [];
  for (const item of items) {
    const key = item.german.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  }
  return unique;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== German-Malayalam Vocab Audio Generator ===\n');

  // Check dependencies
  const hasEdgeTts = checkDependency('edge-tts', 'edge-tts', 'pip install edge-tts');
  if (!hasEdgeTts) {
    process.exit(1);
  }

  const hasFfmpeg = checkDependency('ffmpeg', 'ffmpeg', 'https://ffmpeg.org/download.html\n  On Windows: winget install ffmpeg\n  On Mac: brew install ffmpeg\n  On Ubuntu: sudo apt install ffmpeg');
  // ffmpeg is optional — we skip normalization if not available

  // Create output directories
  ensureDir(AUDIO_VOCAB_DIR);
  ensureDir(AUDIO_EXAMPLES_DIR);
  ensureDir(TEMP_DIR);

  // Extract and deduplicate vocabulary
  const allVocab = extractAllVocab();
  const uniqueVocab = deduplicateByGerman(allVocab);

  console.log(`Found ${allVocab.length} total vocabulary items across ${ALL_MODULES.length} modules`);
  console.log(`After deduplication: ${uniqueVocab.length} unique German words\n`);

  // ── Phase 1: Generate word audio ──────────────────────────────────────

  console.log('--- Phase 1: Generating word pronunciation audio ---\n');

  let vocabSuccess = 0;
  let vocabSkipped = 0;
  let vocabFailed = 0;

  for (let i = 0; i < uniqueVocab.length; i++) {
    const item = uniqueVocab[i];
    const outputPath = path.join(AUDIO_VOCAB_DIR, `${item.id}.mp3`);
    const progress = `(${i + 1}/${uniqueVocab.length})`;

    // Skip if already generated
    if (fs.existsSync(outputPath)) {
      console.log(`  [SKIP] ${progress} '${item.german}' — already exists`);
      vocabSkipped++;
      continue;
    }

    console.log(`  Generating audio for '${item.german}' ${progress}...`);
    const success = generateAudio(item.german, outputPath);

    if (success) {
      vocabSuccess++;
    } else {
      vocabFailed++;
    }
  }

  console.log(`\nWord audio: ${vocabSuccess} generated, ${vocabSkipped} skipped, ${vocabFailed} failed\n`);

  // ── Phase 2: Generate example sentence audio ─────────────────────────

  console.log('--- Phase 2: Generating example sentence audio ---\n');

  let exampleSuccess = 0;
  let exampleSkipped = 0;
  let exampleFailed = 0;

  for (let i = 0; i < uniqueVocab.length; i++) {
    const item = uniqueVocab[i];
    const outputPath = path.join(AUDIO_EXAMPLES_DIR, `${item.id}.mp3`);
    const progress = `(${i + 1}/${uniqueVocab.length})`;

    // Skip if already generated
    if (fs.existsSync(outputPath)) {
      console.log(`  [SKIP] ${progress} '${item.example}' — already exists`);
      exampleSkipped++;
      continue;
    }

    console.log(`  Generating audio for '${item.example}' ${progress}...`);
    const success = generateAudio(item.example, outputPath);

    if (success) {
      exampleSuccess++;
    } else {
      exampleFailed++;
    }
  }

  console.log(`\nExample audio: ${exampleSuccess} generated, ${exampleSkipped} skipped, ${exampleFailed} failed\n`);

  // ── Phase 3: Normalize volume with ffmpeg ─────────────────────────────

  if (!hasFfmpeg) {
    console.log('--- Phase 3: Skipping volume normalization (ffmpeg not installed) ---\n');
  } else {
    console.log('--- Phase 3: Normalizing audio volume ---\n');

    const allAudioFiles: string[] = [];

    // Collect all generated mp3 files from both directories
    for (const dir of [AUDIO_VOCAB_DIR, AUDIO_EXAMPLES_DIR]) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp3'));
      for (const file of files) {
        allAudioFiles.push(path.join(dir, file));
      }
    }

    console.log(`  Normalizing ${allAudioFiles.length} audio files...\n`);

    let normSuccess = 0;
    let normFailed = 0;

    for (let i = 0; i < allAudioFiles.length; i++) {
      const filePath = allAudioFiles[i];
      const fileName = path.basename(filePath);
      const dirName = path.basename(path.dirname(filePath));
      const progress = `(${i + 1}/${allAudioFiles.length})`;

      process.stdout.write(`  Normalizing ${dirName}/${fileName} ${progress}...`);
      const success = normalizeVolume(filePath);

      if (success) {
        normSuccess++;
        console.log(' OK');
      } else {
        normFailed++;
        console.log(' FAILED');
      }
    }

    console.log(`\nNormalization: ${normSuccess} succeeded, ${normFailed} failed\n`);
  }

  // ── Clean up ──────────────────────────────────────────────────────────

  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  // ── Summary ───────────────────────────────────────────────────────────

  console.log('=== Summary ===');
  console.log(`  Vocab audio dir:   ${AUDIO_VOCAB_DIR}`);
  console.log(`  Example audio dir: ${AUDIO_EXAMPLES_DIR}`);
  console.log(`  Total unique words: ${uniqueVocab.length}`);
  console.log(`  Words generated:    ${vocabSuccess} (${vocabSkipped} skipped, ${vocabFailed} failed)`);
  console.log(`  Examples generated: ${exampleSuccess} (${exampleSkipped} skipped, ${exampleFailed} failed)`);
  console.log('\nDone!');
}

main().catch(err => {
  console.error('\n[FATAL ERROR]', err);
  process.exit(1);
});
