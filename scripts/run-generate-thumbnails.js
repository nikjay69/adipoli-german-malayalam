/**
 * Generate all video thumbnails using Puppeteer (free)
 * Run: node scripts/run-generate-thumbnails.js
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');
const thumbDir = path.join(__dirname, '..', 'public', 'images', 'thumbnails');
fs.mkdirSync(thumbDir, { recursive: true });

// Extract video data from module files
function extractVideos(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const videos = [];

  // Extract module metadata
  const idMatch = content.match(/id:\s*(\d+)/);
  const iconMatch = content.match(/icon:\s*"([^"]+)"/);
  const colorMatch = content.match(/color:\s*"(#[^"]+)"/);
  const titleMatch = content.match(/title:\s*"([^"]+)"/);

  const moduleId = idMatch ? idMatch[1] : '1';
  const moduleIcon = iconMatch ? iconMatch[1] : '📚';
  const moduleColor = colorMatch ? colorMatch[1] : '#e94560';
  const moduleTitle = titleMatch ? titleMatch[1] : 'Module';

  // Extract video objects
  const videoRegex = /\{\s*id:\s*"(v[^"]+)"[^}]*?title:\s*"([^"]+)"[^}]*?placeholderThumbnail:\s*"([^"]+)"/gs;
  let match;
  while ((match = videoRegex.exec(content)) !== null) {
    videos.push({
      id: match[1],
      title: match[2],
      thumbnail: match[3],
      moduleId,
      moduleIcon,
      moduleColor,
      moduleTitle,
    });
  }
  return videos;
}

function generateHTML(video) {
  const color = video.moduleColor;
  return `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1280px;
    height: 720px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, ${color}30 0%, #0f0f2e 40%, #1a1a3e 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
  .bg-pattern {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 80%, ${color}15 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, #3b82f620 0%, transparent 50%);
  }
  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0 80px;
  }
  .module-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${color}25;
    border: 1px solid ${color}40;
    border-radius: 24px;
    padding: 6px 18px;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 32px;
    color: ${color};
  }
  .module-badge .icon { font-size: 20px; }
  .title {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    max-width: 900px;
  }
  .accent-line {
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${color}, #3b82f6);
    border-radius: 2px;
    margin: 20px auto;
  }
  .subtitle {
    font-size: 20px;
    color: rgba(255,255,255,0.45);
    font-weight: 400;
  }
  .brand {
    position: absolute;
    bottom: 24px;
    right: 32px;
    font-size: 13px;
    color: rgba(255,255,255,0.2);
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  .play-hint {
    position: absolute;
    bottom: 24px;
    left: 32px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${color}40;
    border: 2px solid ${color}60;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .play-hint::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 14px solid white;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    margin-left: 3px;
  }
</style>
</head>
<body>
  <div class="bg-pattern"></div>
  <div class="content">
    <div class="module-badge">
      <span class="icon">${video.moduleIcon}</span>
      Module ${video.moduleId}: ${video.moduleTitle}
    </div>
    <div class="title">${video.title}</div>
    <div class="accent-line"></div>
    <div class="subtitle">Adipoli German-Malayalam Course</div>
  </div>
  <div class="play-hint"></div>
  <div class="brand">ADIPOLI · A1 → A2.1</div>
</body>
</html>`;
}

async function main() {
  const allVideos = [];
  const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.ts')).sort();

  for (const file of files) {
    const videos = extractVideos(path.join(modulesDir, file));
    allVideos.push(...videos);
  }

  console.log(`Found ${allVideos.length} videos across ${files.length} modules`);

  // Check which already exist
  let skipped = 0;
  const toGenerate = allVideos.filter(v => {
    const filename = path.basename(v.thumbnail);
    const outPath = path.join(thumbDir, filename);
    if (fs.existsSync(outPath)) {
      skipped++;
      return false;
    }
    return true;
  });

  console.log(`Generating ${toGenerate.length} thumbnails (${skipped} already exist)`);

  if (toGenerate.length === 0) {
    console.log('All thumbnails already generated!');
    return;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  let generated = 0;
  let errors = 0;

  for (const video of toGenerate) {
    const filename = path.basename(video.thumbnail);
    const outPath = path.join(thumbDir, filename);
    const html = generateHTML(video);

    try {
      await page.setContent(html, { waitUntil: 'load' });

      const isJpg = filename.endsWith('.jpg') || filename.endsWith('.jpeg');
      if (isJpg) {
        await page.screenshot({ path: outPath, type: 'jpeg', quality: 90 });
      } else {
        await page.screenshot({ path: outPath, type: 'png' });
      }

      generated++;
      if (generated % 10 === 0 || generated === toGenerate.length) {
        console.log(`  [${generated}/${toGenerate.length}] ${filename}`);
      }
    } catch (e) {
      errors++;
      console.error(`  ERROR: ${filename}: ${e.message?.slice(0, 80)}`);
    }
  }

  await browser.close();

  console.log('\n=== SUMMARY ===');
  console.log(`Generated: ${generated}`);
  console.log(`Skipped (existed): ${skipped}`);
  console.log(`Errors: ${errors}`);

  const thumbFiles = fs.readdirSync(thumbDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  const totalSize = thumbFiles.reduce((s, f) => s + fs.statSync(path.join(thumbDir, f)).size, 0);
  console.log(`Total thumbnails: ${thumbFiles.length} (${(totalSize / 1024 / 1024).toFixed(1)} MB)`);
}

main().catch(console.error);
