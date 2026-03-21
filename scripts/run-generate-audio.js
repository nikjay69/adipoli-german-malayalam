/**
 * Generate all vocab audio using edge-tts (free Microsoft Neural TTS)
 * Run: node scripts/run-generate-audio.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Dynamically load all modules by reading the TypeScript files and extracting vocab
const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');
const vocabDir = path.join(__dirname, '..', 'public', 'audio', 'vocab');
const examplesDir = path.join(__dirname, '..', 'public', 'audio', 'examples');

fs.mkdirSync(vocabDir, { recursive: true });
fs.mkdirSync(examplesDir, { recursive: true });

// Extract vocab from TypeScript files using regex
function extractVocab(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const vocabItems = [];

  // Match vocab objects: { id: "...", german: "...", ... example: "...", ... }
  const vocabRegex = /\{\s*id:\s*"(vocab[^"]+)"[^}]*german:\s*"([^"]+)"[^}]*example:\s*"([^"]+)"/g;
  let match;
  while ((match = vocabRegex.exec(content)) !== null) {
    vocabItems.push({
      id: match[1],
      german: match[2],
      example: match[3],
    });
  }
  return vocabItems;
}

// Collect all vocab from all module files
const allVocab = [];
const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.ts'));
for (const file of files) {
  const vocab = extractVocab(path.join(modulesDir, file));
  allVocab.push(...vocab);
}

console.log(`Found ${allVocab.length} vocabulary items across ${files.length} modules`);

// Deduplicate by german word (keep first occurrence's ID)
const seen = new Map();
const uniqueVocab = [];
for (const v of allVocab) {
  const key = v.german.toLowerCase();
  if (!seen.has(key)) {
    seen.set(key, v.id);
    uniqueVocab.push(v);
  }
}
console.log(`${uniqueVocab.length} unique German words after deduplication`);

const VOICE = 'de-DE-ConradNeural';
let generated = 0;
let skipped = 0;
let errors = 0;

// Generate word pronunciations
console.log('\n--- Phase 1: Word Pronunciations ---');
for (let i = 0; i < uniqueVocab.length; i++) {
  const v = uniqueVocab[i];
  const outFile = path.join(vocabDir, `${v.id}.mp3`);

  if (fs.existsSync(outFile)) {
    skipped++;
    continue;
  }

  // Sanitize text for shell
  const text = v.german.replace(/"/g, '\\"').replace(/'/g, "\\'");

  try {
    execSync(
      `edge-tts --voice ${VOICE} --text "${text}" --write-media "${outFile}"`,
      { stdio: 'pipe', timeout: 15000 }
    );
    generated++;
    if ((generated + skipped) % 25 === 0 || i === uniqueVocab.length - 1) {
      console.log(`  [${i + 1}/${uniqueVocab.length}] Generated ${generated}, skipped ${skipped}`);
    }
  } catch (e) {
    errors++;
    console.error(`  ERROR: ${v.id} "${v.german}": ${e.message?.slice(0, 80)}`);
  }
}
console.log(`Words done: ${generated} generated, ${skipped} skipped, ${errors} errors`);

// Generate example sentences
console.log('\n--- Phase 2: Example Sentences ---');
let exGenerated = 0;
let exSkipped = 0;
let exErrors = 0;

for (let i = 0; i < allVocab.length; i++) {
  const v = allVocab[i];
  const outFile = path.join(examplesDir, `${v.id}.mp3`);

  if (fs.existsSync(outFile)) {
    exSkipped++;
    continue;
  }

  const text = v.example.replace(/"/g, '\\"').replace(/'/g, "\\'");

  try {
    execSync(
      `edge-tts --voice ${VOICE} --text "${text}" --write-media "${outFile}"`,
      { stdio: 'pipe', timeout: 15000 }
    );
    exGenerated++;
    if ((exGenerated + exSkipped) % 50 === 0 || i === allVocab.length - 1) {
      console.log(`  [${i + 1}/${allVocab.length}] Generated ${exGenerated}, skipped ${exSkipped}`);
    }
  } catch (e) {
    exErrors++;
    console.error(`  ERROR: ${v.id} "${v.example?.slice(0, 40)}": ${e.message?.slice(0, 80)}`);
  }
}
console.log(`Examples done: ${exGenerated} generated, ${exSkipped} skipped, ${exErrors} errors`);

console.log('\n=== SUMMARY ===');
console.log(`Word audio: ${generated + skipped} total (${generated} new, ${skipped} existed)`);
console.log(`Example audio: ${exGenerated + exSkipped} total (${exGenerated} new, ${exSkipped} existed)`);
console.log(`Errors: ${errors + exErrors}`);

const vocabFiles = fs.readdirSync(vocabDir).filter(f => f.endsWith('.mp3'));
const exFiles = fs.readdirSync(examplesDir).filter(f => f.endsWith('.mp3'));
const vocabSize = vocabFiles.reduce((s, f) => s + fs.statSync(path.join(vocabDir, f)).size, 0);
const exSize = exFiles.reduce((s, f) => s + fs.statSync(path.join(examplesDir, f)).size, 0);
console.log(`Vocab files: ${vocabFiles.length} (${(vocabSize / 1024 / 1024).toFixed(1)} MB)`);
console.log(`Example files: ${exFiles.length} (${(exSize / 1024 / 1024).toFixed(1)} MB)`);
