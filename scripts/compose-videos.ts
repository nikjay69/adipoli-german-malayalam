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
  type?: 'intro' | 'vocab' | 'table' | 'dialogue' | 'tip' | 'summary';
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
    const headerStr = parts[i].trim();
    const content = (parts[i + 1] || '').trim();

    if (!content) continue;

    // Parse headerStr: "SECTION 1 — VOCAB — 0:30-3:00"
    const timeMatch = headerStr.match(/(\d+:\d+[-–]\d+:\d+)/);
    const timestamp = timeMatch ? timeMatch[1] : undefined;
    
    // Clean header of timestamp to find type: "SECTION 1 — VOCAB"
    const cleanHeader = headerStr.replace(/\s*[-–—]\s*\d+:\d+[-–]\d+:\d+\s*$/, '').trim();
    
    let type: any = 'intro';
    if (cleanHeader.includes('VOCAB')) type = 'vocab';
    else if (cleanHeader.includes('TABLE') || cleanHeader.includes('CONJUGATION')) type = 'table';
    else if (cleanHeader.includes('DIALOGUE') || cleanHeader.includes('CONVERSATION')) type = 'dialogue';
    else if (cleanHeader.includes('TIP') || cleanHeader.includes('EXAM')) type = 'tip';
    else if (cleanHeader.match(/INTRO/i)) type = 'intro';

    sections.push({
      tag: cleanHeader,
      timestamp,
      content,
      type
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

  const type = section.type || 'intro';
  const tagStr = section.tag.toUpperCase();

  // Extract key points from content
  const contentLines = section.content
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('(') && l.length > 5);

  let templateHtml = '';

  if (tagStr.includes('VOCAB') || tagStr.includes('WORDS') || type === 'vocab') {
    // VOCABULARY TEMPLATE
    const vocabItems = contentLines.slice(0, 5).map(line => {
      const parts = line.split(/[—:-]/).map(s => s.trim());
      return { 
        german: parts[0] || '', 
        english: parts[1] || '' 
      };
    });

    templateHtml = `
      <div class="vocab-grid">
        ${vocabItems.map(item => `
          <div class="vocab-item">
            <div class="vocab-de">${escapeHtml(item.german)}</div>
            <div class="vocab-en">${escapeHtml(item.english)}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (tagStr.includes('TABLE') || tagStr.includes('CONJUGATION') || type === 'table') {
    // TABLE TEMPLATE
    const rows = contentLines.slice(0, 6).map(line => line.split(/[|—:-]/).map(s => s.trim()));
    templateHtml = `
      <table class="grammar-table">
        ${rows.map(cols => `
          <tr>${cols.map(c => `<td>${escapeHtml(c)}</td>`).join('')}</tr>
        `).join('')}
      </table>
    `;
  } else if (tagStr.includes('DIALOGUE') || tagStr.includes('CONVERSATION') || type === 'dialogue') {
    // DIALOGUE TEMPLATE
    templateHtml = `
      <div class="dialogue-container">
        ${contentLines.slice(0, 4).map((line, i) => `
          <div class="bubble ${i % 2 === 0 ? 'left' : 'right'}">
            ${escapeHtml(line)}
          </div>
        `).join('')}
      </div>
    `;
  } else if (tagStr.includes('TIP') || tagStr.includes('EXAM') || type === 'tip') {
    // EXAM TIP TEMPLATE
    templateHtml = `
      <div class="tip-card">
        <div class="tip-icon">🎯</div>
        <div class="tip-content">
          ${contentLines.slice(0, 3).map(line => `
            <div class="tip-line">${escapeHtml(line)}</div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    // GENERIC CARD TEMPLATE
    templateHtml = `
      <div class="content">
        ${contentLines.slice(0, 4)
          .map((line) => {
            const isGerman = /[äöüßÄÖÜ]/.test(line) || /\b(ich|du|er|sie|mein|ist|bin|haben|sein)\b/i.test(line);
            return `<div class="content-line ${isGerman ? 'german' : ''}">${escapeHtml(line)}</div>`;
          })
          .join('\n      ')}
      </div>
    `;
  }

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
    border-radius: 32px;
    padding: 60px 80px;
    backdrop-filter: blur(30px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
  .section-tag {
    display: inline-block;
    background: rgba(255,107,157,0.2);
    border: 1px solid rgba(255,107,157,0.4);
    border-radius: 30px;
    padding: 8px 24px;
    font-size: 20px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #ff6b9d;
    margin-bottom: 24px;
  }
  .video-title {
    font-size: 28px;
    font-weight: 600;
    color: rgba(255,255,255,0.4);
    margin-bottom: 32px;
  }
  /* Template Styles */
  .content-line {
    font-size: 36px;
    font-weight: 400;
    line-height: 1.6;
    color: rgba(255,255,255,0.9);
    margin-bottom: 20px;
    padding-left: 24px;
    border-left: 4px solid #ff6b9d;
  }
  .content-line.german { color: #ffd93d; border-left-color: #ffd93d; font-weight: 700; }
  
  .vocab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
  .vocab-item { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); }
  .vocab-de { font-size: 32px; font-weight: 800; color: #ffd93d; margin-bottom: 8px; }
  .vocab-en { font-size: 20px; color: rgba(255,255,255,0.6); }

  .grammar-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  .grammar-table td { padding: 20px; border: 1px solid rgba(255,255,255,0.1); font-size: 28px; background: rgba(255,255,255,0.03); }
  .grammar-table tr:first-child td { font-weight: 800; color: #ff6b9d; background: rgba(255,107,157,0.1); }

  .dialogue-container { display: flex; flex-direction: column; gap: 24px; margin-top: 20px; }
  .bubble { max-width: 80%; padding: 24px 32px; border-radius: 20px; font-size: 28px; line-height: 1.4; }
  .bubble.left { align-self: flex-start; background: rgba(255,107,157,0.2); border-bottom-left-radius: 4px; border: 1px solid rgba(255,107,157,0.3); }
  .bubble.right { align-self: flex-end; background: rgba(0,217,165,0.2); border-bottom-right-radius: 4px; border: 1px solid rgba(0,217,165,0.3); text-align: right; }

  .tip-card { background: linear-gradient(135deg, rgba(255,107,157,0.1) 0%, rgba(255,217,61,0.1) 100%); border: 2px solid #ffd93d; border-radius: 24px; padding: 40px; display: flex; align-items: center; gap: 40px; }
  .tip-icon { font-size: 100px; filter: drop-shadow(0 0 20px #ffd93d); }
  .tip-line { font-size: 38px; font-weight: 700; color: #ffd93d; line-height: 1.4; margin-bottom: 20px; }

  .brand {
    position: absolute;
    bottom: 40px;
    right: 60px;
    font-size: 18px;
    font-weight: 800;
    color: rgba(255,255,255,0.3);
    letter-spacing: 1px;
  }
</style>
</head>
<body>
  <div class="bg-glow glow-1"></div>
  <div class="bg-glow glow-2"></div>
  <div class="card">
    <div class="section-tag">${escapeHtml(section.tag)}</div>
    <div class="video-title">${escapeHtml(videoTitle)}</div>
    ${templateHtml}
  </div>
  <div class="brand">ADIPOLI GERMAN COURSE</div>
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

      // Try to load precise timing metadata
      const timingPath = path.join(NARRATION_DIR, `${id}_timing.json`);
      let durations: number[] = [];

      if (fs.existsSync(timingPath)) {
        try {
          const timingData = JSON.parse(fs.readFileSync(timingPath, 'utf-8'));
          // Map timing sections to script sections by tag
          durations = sections.map(sec => {
            const match = timingData.sections.find((s: any) => s.tag === sec.tag);
            return match ? match.duration : totalDuration / sections.length;
          });
          console.log(`    Using precise timing from JSON`);
        } catch (e) {
          console.warn(`    Could not parse timing JSON, falling back to equal split`);
        }
      }

      if (durations.length === 0) {
        // Fallback: Calculate duration per section (evenly split)
        const perSection = totalDuration / sections.length;
        durations = sections.map(() => perSection);
      }

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
