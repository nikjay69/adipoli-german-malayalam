const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawnSync } = require('child_process');
const puppeteer = require(path.resolve(__dirname, '../../node_modules/puppeteer'));

const FPS = 24;
const DURATION = 48;
const FRAME_COUNT = FPS * DURATION;
const projectDir = __dirname;
const frameDir = path.join(projectDir, '.frames');
const outputDir = path.join(projectDir, 'output');
const silentVideo = path.join(outputDir, 'video-only.mp4');
const outputVideo = path.join(outputDir, 'module-01-lesson-01-canvas-ffmpeg.mp4');
const reportPath = path.join(outputDir, 'render-report.json');

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: projectDir, encoding: 'utf8', stdio: options.capture ? 'pipe' : 'inherit' });
  if (result.status !== 0) throw new Error(`${command} failed (${result.status})\n${result.stderr || ''}`);
  return result.stdout || '';
}

function serveStatic(root) {
  const types = { '.html': 'text/html', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg' };
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const file = path.resolve(root, relative);
    if (!file.startsWith(path.resolve(root)) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); res.end('not found'); return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function main() {
  const started = new Date();
  const clockStart = process.hrtime.bigint();
  fs.mkdirSync(outputDir, { recursive: true });
  fs.rmSync(frameDir, { recursive: true, force: true });
  fs.mkdirSync(frameDir, { recursive: true });

  const server = await serveStatic(projectDir);
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: true, args: ['--disable-gpu-vsync', '--hide-scrollbars', '--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.__ready === true || window.__readyError, { timeout: 30000 });
    const error = await page.evaluate(() => window.__readyError || null);
    if (error) throw new Error(error);
    const meta = await page.evaluate(() => window.__composition);
    if (meta.width !== 1920 || meta.height !== 1080 || meta.duration !== DURATION) throw new Error(`Composition metadata mismatch: ${JSON.stringify(meta)}`);

    for (let frame = 0; frame < FRAME_COUNT; frame++) {
      const time = frame / FPS;
      await page.evaluate(value => window.renderAt(value), time);
      await page.screenshot({
        path: path.join(frameDir, `frame-${String(frame + 1).padStart(5, '0')}.jpg`),
        type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });
      if (frame % FPS === 0) process.stdout.write(`\rCaptured ${String(frame / FPS).padStart(2, '0')}s / ${DURATION}s`);
    }
    process.stdout.write(`\rCaptured ${DURATION}s / ${DURATION}s\n`);
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }

  run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'warning', '-framerate', String(FPS), '-i', path.join(frameDir, 'frame-%05d.jpg'), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-movflags', '+faststart', silentVideo]);

  const filter = [
    '[1:a]volume=0.012,afade=t=in:st=0:d=2,afade=t=out:st=46:d=2[amb]',
    '[2:a]adelay=1200:all=1,volume=1.0[a2]',
    '[3:a]adelay=24400:all=1,volume=1.0[a3]',
    '[amb][a2][a3]amix=inputs=3:normalize=0,alimiter=limit=0.95[a]'
  ].join(';');
  run('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'warning', '-i', silentVideo,
    '-f', 'lavfi', '-i', `sine=frequency=110:sample_rate=48000:duration=${DURATION}`,
    '-i', 'assets/guten-morgen.mp3', '-i', 'assets/ich-lerne-deutsch.mp3',
    '-filter_complex', filter, '-map', '0:v:0', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
    '-t', String(DURATION), '-movflags', '+faststart', outputVideo
  ]);

  run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'warning', '-i', outputVideo, '-vf', 'fps=1/8,scale=640:-1,tile=3x2:padding=10:margin=10', '-frames:v', '1', '-update', '1', '-q:v', '2', path.join(outputDir, 'contact-sheet.jpg')]);

  const ffprobeRaw = run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size,bit_rate:stream=index,codec_name,codec_type,width,height,r_frame_rate,pix_fmt,sample_rate,channels', '-of', 'json', outputVideo], { capture: true });
  const ended = new Date();
  const renderSeconds = Number(process.hrtime.bigint() - clockStart) / 1e9;
  const report = {
    project: 'Module 01 Lesson 01 · Canvas/Puppeteer/FFmpeg comparison',
    source: ['index.html', 'composition.js', 'render.js'],
    output: path.relative(projectDir, outputVideo).replace(/\\/g, '/'),
    startedAt: started.toISOString(), endedAt: ended.toISOString(), wallClockSeconds: Number(renderSeconds.toFixed(3)),
    requested: { width: 1920, height: 1080, fps: FPS, durationSeconds: DURATION, frames: FRAME_COUNT },
    ffprobe: JSON.parse(ffprobeRaw)
  };
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
  if (!process.env.KEEP_FRAMES) fs.rmSync(frameDir, { recursive: true, force: true });
  fs.rmSync(silentVideo, { force: true });
  process.stdout.write(`Rendered ${outputVideo}\nWall clock: ${report.wallClockSeconds}s\n`);
}

main().catch(error => { console.error(error.stack || error); process.exit(1); });
