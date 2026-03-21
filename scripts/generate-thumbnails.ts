/**
 * Generate video thumbnails for all course modules using Puppeteer
 * Renders an HTML template to 1280x720 JPEG images matching the app's glassmorphism style
 *
 * Prerequisites:
 *   npm install puppeteer (or npx will download chromium automatically)
 *
 * Run with:
 *   npx tsx scripts/generate-thumbnails.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { ALL_MODULES } from '../src/lib/content/modules';

// ── Configuration ──────────────────────────────────────────────────────────
const PROJECT_ROOT = path.resolve(__dirname, '..');
const THUMBNAILS_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'thumbnails');
const WIDTH = 1280;
const HEIGHT = 720;

// ── Types ──────────────────────────────────────────────────────────────────

interface VideoInfo {
  videoId: string;
  videoTitle: string;
  moduleId: number;
  moduleTitle: string;
  moduleTitleGerman: string;
  moduleIcon: string;
  moduleColor: string;
  filename: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function extractFilename(placeholderPath: string): string {
  // e.g. "/images/thumbnails/why-german.jpg" -> "why-german.jpg"
  return path.basename(placeholderPath);
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function generateHTML(video: VideoInfo): string {
  const color = video.moduleColor;
  const colorLight = hexToRgba(color, 0.3);
  const colorMedium = hexToRgba(color, 0.5);

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: hidden;
    background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #1a1a2e 100%);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 20% 30%, ${colorLight} 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, ${hexToRgba(color, 0.15)} 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%);
    z-index: 0;
  }

  .glass-overlay {
    position: absolute;
    top: 30px;
    left: 30px;
    right: 30px;
    bottom: 30px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 50px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .top-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .module-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: ${colorMedium};
    border: 1px solid ${hexToRgba(color, 0.6)};
    border-radius: 50px;
    padding: 8px 20px 8px 14px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.95);
  }

  .module-icon {
    font-size: 24px;
    line-height: 1;
  }

  .center-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 40px;
  }

  .video-title {
    font-size: 52px;
    font-weight: 900;
    line-height: 1.15;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    max-width: 1000px;
  }

  .german-subtitle {
    font-size: 24px;
    font-weight: 600;
    color: ${color};
    opacity: 0.9;
    letter-spacing: 0.5px;
  }

  .accent-line {
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${color}, #ff6b9d);
    border-radius: 2px;
    margin: 24px auto;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(90deg, #ff6b9d, #ffd93d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.5px;
  }

  .play-hint {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 15px;
    font-weight: 500;
  }

  .play-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-triangle {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 0 6px 12px;
    border-color: transparent transparent transparent rgba(255,255,255,0.5);
    margin-left: 2px;
  }

  /* Decorative corner accents */
  .corner {
    position: absolute;
    width: 60px;
    height: 60px;
    z-index: 3;
  }
  .corner-tl {
    top: 30px;
    left: 30px;
    border-top: 3px solid ${hexToRgba(color, 0.4)};
    border-left: 3px solid ${hexToRgba(color, 0.4)};
    border-radius: 24px 0 0 0;
  }
  .corner-br {
    bottom: 30px;
    right: 30px;
    border-bottom: 3px solid ${hexToRgba(color, 0.4)};
    border-right: 3px solid ${hexToRgba(color, 0.4)};
    border-radius: 0 0 24px 0;
  }
</style>
</head>
<body>
  <div class="bg-pattern"></div>
  <div class="glass-overlay"></div>
  <div class="corner corner-tl"></div>
  <div class="corner corner-br"></div>

  <div class="content">
    <div class="top-row">
      <div class="module-badge">
        <span class="module-icon">${video.moduleIcon}</span>
        Module ${video.moduleId}
      </div>
    </div>

    <div class="center-content">
      <div class="video-title">${escapeHtml(video.videoTitle)}</div>
      <div class="accent-line"></div>
      <div class="german-subtitle">${escapeHtml(video.moduleTitleGerman)}</div>
    </div>

    <div class="footer">
      <div class="brand">Adipoli German Course</div>
      <div class="play-hint">
        <div class="play-circle">
          <div class="play-triangle"></div>
        </div>
        Watch Lesson
      </div>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Extract video data from modules ────────────────────────────────────────

function extractAllVideos(): VideoInfo[] {
  const videos: VideoInfo[] = [];

  for (const mod of ALL_MODULES) {
    for (const lesson of mod.lessons) {
      for (const video of lesson.videos) {
        if (!video.placeholderThumbnail) continue;

        videos.push({
          videoId: video.id,
          videoTitle: video.title,
          moduleId: mod.id,
          moduleTitle: mod.title,
          moduleTitleGerman: mod.titleGerman,
          moduleIcon: mod.icon,
          moduleColor: mod.color,
          filename: extractFilename(video.placeholderThumbnail),
        });
      }
    }
  }

  return videos;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== German-Malayalam Thumbnail Generator ===\n');

  // Dynamically import puppeteer
  let puppeteer: typeof import('puppeteer');
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.error('[ERROR] Puppeteer is not installed.');
    console.error('Install it with:\n  npm install puppeteer\n');
    process.exit(1);
  }

  // Create output directory
  ensureDir(THUMBNAILS_DIR);

  // Extract video info
  const videos = extractAllVideos();
  console.log(`Found ${videos.length} videos across ${ALL_MODULES.length} modules\n`);

  if (videos.length === 0) {
    console.log('No videos with placeholderThumbnail found. Nothing to generate.');
    return;
  }

  // Launch browser
  console.log('Launching headless browser...\n');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const outputPath = path.join(THUMBNAILS_DIR, video.filename);
    const progress = `(${i + 1}/${videos.length})`;

    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`  [SKIP] ${progress} ${video.filename} — already exists`);
      skipped++;
      continue;
    }

    console.log(`  Generating ${video.filename} ${progress} — "${video.videoTitle}"`);

    try {
      const html = generateHTML(video);
      await page.setContent(html, { waitUntil: 'networkidle0', timeout: 15_000 });

      // Small delay for font loading
      await new Promise(r => setTimeout(r, 500));

      const isJpeg = video.filename.endsWith('.jpg') || video.filename.endsWith('.jpeg');

      if (isJpeg) {
        await page.screenshot({
          path: outputPath,
          type: 'jpeg',
          quality: 90,
          fullPage: false,
        });
      } else {
        await page.screenshot({
          path: outputPath,
          type: 'png',
          fullPage: false,
        });
      }

      generated++;
    } catch (err: any) {
      console.error(`    [FAILED] ${err.message?.split('\n')[0]}`);
      failed++;
    }
  }

  await browser.close();

  // ── Summary ─────────────────────────────────────────────────────────────

  console.log('\n=== Summary ===');
  console.log(`  Output dir:  ${THUMBNAILS_DIR}`);
  console.log(`  Total videos: ${videos.length}`);
  console.log(`  Generated:    ${generated}`);
  console.log(`  Skipped:      ${skipped}`);
  console.log(`  Failed:       ${failed}`);
  console.log('\nDone!');
}

main().catch(err => {
  console.error('\n[FATAL ERROR]', err);
  process.exit(1);
});
