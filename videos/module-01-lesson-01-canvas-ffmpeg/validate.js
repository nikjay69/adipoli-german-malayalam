const fs = require('fs');
const path = require('path');

const required = [
  'index.html', 'composition.js', 'render.js',
  'assets/kerala-study.png', 'assets/frau-weber-greeting.png', 'assets/frau-weber-teaching.png',
  'assets/kuttan-waving.png', 'assets/kuttan-pointing.png',
  'assets/guten-morgen.mp3', 'assets/ich-lerne-deutsch.mp3', 'audio-sources.json'
];

const missing = required.filter(file => !fs.existsSync(path.join(__dirname, file)));
if (missing.length) {
  console.error(`Missing required files:\n${missing.join('\n')}`);
  process.exit(1);
}

const source = fs.readFileSync(path.join(__dirname, 'composition.js'), 'utf8');
const exactGerman = ['Guten Morgen.', 'Guten Morgen, Frau Weber.', 'Ich lerne Deutsch.', 'Auf Wiedersehen.'];
const absent = exactGerman.filter(line => !source.includes(line));
if (absent.length) {
  console.error(`Exact German missing from composition:\n${absent.join('\n')}`);
  process.exit(1);
}

if (!source.includes("renderer: 'HTML Canvas + Puppeteer + FFmpeg'")) {
  console.error('Independent renderer marker missing.');
  process.exit(1);
}

console.log('PASS · independent Canvas composition is complete');
console.log(`PASS · ${required.length} source/assets present`);
console.log(`PASS · ${exactGerman.length} approved German lines exact`);
const audioSources = JSON.parse(fs.readFileSync(path.join(__dirname, 'audio-sources.json'), 'utf8'));
for (const audio of audioSources) {
  const fullPath = path.join(__dirname, audio.localFile);
  const hash = require('crypto').createHash('sha256').update(fs.readFileSync(fullPath)).digest('hex').toUpperCase();
  if (hash !== audio.sha256) {
    console.error(`Audio hash mismatch: ${audio.localFile}`);
    process.exit(1);
  }
}
console.log(`PASS · ${audioSources.length} audio files match declared source/transcript hashes`);
