/**
 * Video Composition Script
 *
 * Composes final lesson MP4 videos from:
 * 1. Generated narration audio (from edge-tts)
 * 2. Slide images (from Puppeteer — per-section visual templates)
 * 3. ffmpeg for combining with Ken Burns pan/zoom effect
 *
 * Run with: npx tsx scripts/compose-videos.ts
 * Options:
 *   --video v1-1-1     Generate a specific video only
 *   --module 3         Generate all videos for a module
 *   --dry-run          Show what would be generated without doing it
 *
 * Prerequisites:
 * - ffmpeg installed system-wide
 * - Narration audio generated (scripts/generate-narration.ts)
 * - Video scripts available in src/lib/content/video-scripts.ts or video-scripts/
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// ── Configuration ──────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '..');
const NARRATION_DIR = path.join(__dirname, 'output', 'narration');
const SLIDES_DIR = path.join(__dirname, 'output', 'slides');
const OUTPUT_DIR = path.join(__dirname, 'output', 'videos');
const TEMP_DIR = path.join(__dirname, 'output', 'temp');

const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;
const FPS = 30;

// ── Types ──────────────────────────────────────────────────────────────────

interface ScriptSection {
  tag: string;        // e.g. "INTRO", "SECTION 1 — Greetings"
  timestamp?: string; // e.g. "0:00-0:30"
  content: string;    // narration text for this section
}

// ── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function checkFfmpeg(): boolean {
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function getAudioDuration(audioPath: string): number {
  try {
    const result = execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 "${audioPath}"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    return parseFloat(result.trim()) || 0;
  } catch {
    return 0;
  }
}

/**
 * Parse a video script into [SECTION] blocks.
 * Handles formats like:
 *   [INTRO — 0:00-0:30]
 *   [SECTION 1 — Greetings — 0:30-3:00]
 *   [CLOSING — 7:00-8:00]
 */
function parseScriptSections(script: string): ScriptSection[] {
  const sections: ScriptSection[] = [];
  const sectionRegex = /\[(.*?)\]/g;

  // Split by section headers
  const parts = script.split(/\[([^\]]+)\]/);

  // parts alternates: text-before, header, text-after, header, text-after...
  for (let i = 1; i < parts.length; i += 2) {
    const header = parts[i].trim();
    const content = (parts[i + 1] || '').trim();

    if (!content) continue;

    // Parse header: "SECTION 1 — Topic — 0:00-3:00"
    const timePart = header.match(/(\d+:\d+[-–]\d+:\d+)/);
    const tag = header.replace(/\s*[-–—]\s*\d+:\d+[-–]\d+:\d+\s*$/, '').trim();

    sections.push({
      tag,
      timestamp: timePart ? timePart[1] : undefined,
      content,
    });
  }

  // If no sections found, treat entire script as one section
  if (sections.length === 0 && script.trim()) {
    sections.push({ tag: 'FULL', content: script.trim() });
  }

  return sections;
}

/**
 * Generate a slide image for a section using Puppeteer.
 * Creates a branded template matching the app's glassmorphism style.
 */
async function generateSlideImage(
  section: ScriptSection,
  videoTitle: string,
  slideIndex: number,
  outputPath: string,
): Promise<void> {
  let puppeteer: typeof import('puppeteer');
  try {
    puppeteer = await import('puppeteer');
  } catch {
    throw new Error('Puppeteer not installed. Run: npm install puppeteer');
  }

  // Extract key points from content (first 3 non-empty lines)
  const contentLines = section.content
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('(') && l.length > 10)
    .slice(0, 4);

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${VIDEO_WIDTH}px;
    height: ${VIDEO_HEIGHT}px;
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #1a1a2e 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .bg-glow {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.15;
  }
  .glow-1 { top: -200px; left: -100px; background: #ff6b9d; }
  .glow-2 { bottom: -200px; right: -100px; background: #00d9a5; }
  .card {
    position: relative;
    z-index: 1;
    width: 85%;
    max-width: 1400px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 60px 80px;
    backdrop-filter: blur(20px);
  }
  .section-tag {
    display: inline-block;
    background: rgba(255,107,157,0.3);
    border: 1px solid rgba(255,107,157,0.5);
    border-radius: 30px;
    padding: 8px 24px;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #ff6b9d;
    margin-bottom: 24px;
  }
  .video-title {
    font-size: 28px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    margin-bottom: 16px;
  }
  .content {
    margin-top: 32px;
  }
  .content-line {
    font-size: 32px;
    font-weight: 400;
    line-height: 1.6;
    color: rgba(255,255,255,0.9);
    margin-bottom: 16px;
    padding-left: 20px;
    border-left: 3px solid rgba(255,107,157,0.4);
  }
  .content-line.german {
    color: #ffd93d;
    font-weight: 600;
    font-style: italic;
    border-left-color: #ffd93d;
  }
  .brand {
    position: absolute;
    bottom: 40px;
    right: 60px;
    font-size: 16px;
    font-weight: 700;
    background: linear-gradient(90deg, #ff6b9d, #ffd93d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
</head>
<body>
  <div class="bg-glow glow-1"></div>
  <div class="bg-glow glow-2"></div>
  <div class="card">
    <div class="section-tag">${escapeHtml(section.tag)}</div>
    <div class="video-title">${escapeHtml(videoTitle)}</div>
    <div class="content">
      ${contentLines
        .map((line) => {
          const isGerman = /[äöüßÄÖÜ]/.test(line) || /\b(ich|du|er|sie|mein|ist|bin|haben|sein)\b/i.test(line);
          return `<div class="content-line ${isGerman ? 'german' : ''}">${escapeHtml(line)}</div>`;
        })
        .join('\n      ')}
    </div>
  </div>
  <div class="brand">Adipoli German Course</div>
</body>
</html>`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: VIDEO_WIDTH, height: VIDEO_HEIGHT });
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise((r) => setTimeout(r, 500)); // Font loading
    await page.screenshot({ path: outputPath, type: 'jpeg', quality: 95 });
  } finally {
    await browser.close();
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Compose a final video from slides + audio using ffmpeg.
 * Uses a Ken Burns (slow zoom) effect on each slide.
 */
function composeVideo(
  slideFiles: string[],
  durations: number[],
  audioPath: string,
  outputPath: string
): void {
  // Build ffmpeg filter for Ken Burns effect on each slide
  const inputs: string[] = [];
  const filters: string[] = [];
  const concatInputs: string[] = [];

  for (let i = 0; i < slideFiles.length; i++) {
    const dur = durations[i];
    inputs.push(`-loop 1 -t ${dur} -i "${slideFiles[i]}"`);

    // Ken Burns: slow zoom from 100% to 108% over the slide duration
    const zoomSpeed = 0.08 / (dur * FPS);
    filters.push(
      `[${i}:v]scale=${VIDEO_WIDTH * 2}:${VIDEO_HEIGHT * 2},` +
      `zoompan=z='min(zoom+${zoomSpeed.toFixed(8)},1.08)':` +
      `x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':` +
      `d=${Math.ceil(dur * FPS)}:s=${VIDEO_WIDTH}x${VIDEO_HEIGHT}:fps=${FPS},` +
      `setsar=1[v${i}]`
    );
    concatInputs.push(`[v${i}]`);
  }

  const filterComplex = [
    ...filters,
    `${concatInputs.join('')}concat=n=${slideFiles.length}:v=1:a=0[outv]`,
  ].join('; ');

  const cmd = [
    'ffmpeg -y',
    inputs.join(' '),
    `-i "${audioPath}"`,
    `-filter_complex "${filterComplex}"`,
    '-map "[outv]" -map ' + slideFiles.length + ':a',
    `-c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p`,
    `-c:a aac -b:a 192k`,
    `-shortest`,
    `"${outputPath}"`,
  ].join(' ');

  execSync(cmd, { stdio: 'inherit', timeout: 300000 }); // 5 min timeout
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== German-Malayalam Video Composer ===\n');

  // Parse CLI args
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const videoFilter = args.indexOf('--video') >= 0 ? args[args.indexOf('--video') + 1] : null;
  const moduleFilter = args.indexOf('--module') >= 0 ? Number(args[args.indexOf('--module') + 1]) : null;

  // Check ffmpeg
  if (!dryRun && !checkFfmpeg()) {
    console.error('ERROR: ffmpeg is not installed or not in PATH.');
    console.error('Install it: https://ffmpeg.org/download.html');
    process.exit(1);
  }

  // Load all available scripts
  const allScripts: Record<string, string> = {};

  try {
    const mod = await import('../src/lib/content/video-scripts');
    if (mod.VIDEO_SCRIPTS) {
      Object.assign(allScripts, mod.VIDEO_SCRIPTS);
    }
  } catch { /* ok */ }

  try {
    const genMod = await import('../src/lib/content/video-scripts/index');
    if (genMod.GENERATED_SCRIPTS) {
      Object.assign(allScripts, genMod.GENERATED_SCRIPTS);
    }
  } catch { /* ok */ }

  if (Object.keys(allScripts).length === 0) {
    console.error('No video scripts found. Run generate-scripts.ts first.');
    process.exit(1);
  }

  // Filter scripts
  let scriptEntries = Object.entries(allScripts);

  if (videoFilter) {
    scriptEntries = scriptEntries.filter(([id]) => id === videoFilter);
  } else if (moduleFilter) {
    const prefix = `v${moduleFilter}-`;
    scriptEntries = scriptEntries.filter(([id]) => id.startsWith(prefix));
  }

  // Check narration audio exists
  const withAudio = scriptEntries.filter(([id]) =>
    fs.existsSync(path.join(NARRATION_DIR, `${id}.mp3`))
  );

  console.log(`Scripts available: ${scriptEntries.length}`);
  console.log(`With narration audio: ${withAudio.length}`);

  if (withAudio.length === 0) {
    console.log('\nNo narration audio found. Run generate-narration.ts first.');
    console.log(`Expected location: ${NARRATION_DIR}/{videoId}.mp3`);
    return;
  }

  if (dryRun) {
    console.log('\n--- DRY RUN ---');
    for (const [id] of withAudio) {
      const audioPath = path.join(NARRATION_DIR, `${id}.mp3`);
      const duration = getAudioDuration(audioPath);
      const sections = parseScriptSections(allScripts[id]);
      console.log(`  ${id}: ${sections.length} sections, ${duration.toFixed(1)}s audio`);
    }
    console.log('\nRe-run without --dry-run to generate videos.');
    return;
  }

  // Ensure output directories
  ensureDir(SLIDES_DIR);
  ensureDir(OUTPUT_DIR);
  ensureDir(TEMP_DIR);

  let composed = 0;
  let skipped = 0;
  let failed = 0;

  for (const [id, script] of withAudio) {
    const outputPath = path.join(OUTPUT_DIR, `${id}.mp4`);

    if (fs.existsSync(outputPath)) {
      console.log(`  [SKIP] ${id} — already exists`);
      skipped++;
      continue;
    }

    console.log(`\n  Composing: ${id}`);

    try {
      const audioPath = path.join(NARRATION_DIR, `${id}.mp3`);
      const totalDuration = getAudioDuration(audioPath);

      if (totalDuration <= 0) {
        console.error(`    Audio duration is 0 — skipping`);
        failed++;
        continue;
      }

      // Parse sections
      const sections = parseScriptSections(script);
      console.log(`    Sections: ${sections.length}, Duration: ${totalDuration.toFixed(1)}s`);

      // Calculate duration per section (evenly split)
      const perSection = totalDuration / sections.length;
      const durations = sections.map(() => perSection);

      // Generate slide images
      const slideFiles: string[] = [];
      for (let i = 0; i < sections.length; i++) {
        const slidePath = path.join(SLIDES_DIR, `${id}_slide_${i}.jpg`);
        if (!fs.existsSync(slidePath)) {
          console.log(`    Generating slide ${i + 1}/${sections.length}: ${sections[i].tag}`);
          await generateSlideImage(sections[i], id, i, slidePath);
        }
        slideFiles.push(slidePath);
      }

      // Compose final video
      console.log(`    Composing MP4...`);
      composeVideo(slideFiles, durations, audioPath, outputPath);

      const sizeMB = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(1);
      console.log(`    -> Done: ${outputPath} (${sizeMB} MB)`);
      composed++;
    } catch (err) {
      console.error(`    -> FAILED: ${(err as Error).message}`);
      failed++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`  Composed: ${composed}`);
  console.log(`  Skipped:  ${skipped}`);
  console.log(`  Failed:   ${failed}`);
  console.log(`  Output:   ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('\n[FATAL ERROR]', err);
  process.exit(1);
});
