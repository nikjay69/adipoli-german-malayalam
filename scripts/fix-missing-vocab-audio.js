/**
 * Fix missing vocab audio by either copying from duplicate entries or generating new ones
 * Run: node scripts/fix-missing-vocab-audio.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');
const vocabDir = path.join(__dirname, '..', 'public', 'audio', 'vocab');

// Extract vocab from TypeScript files using regex
function extractVocab(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const vocabItems = [];
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

const VOICE = 'de-DE-ConradNeural';

// Collect all vocab
const allVocab = [];
const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.ts')).sort();
for (const file of files) {
  const vocab = extractVocab(path.join(modulesDir, file));
  allVocab.push(...vocab);
}

// Build a map: german word (lowercase) -> first ID that has an audio file
const wordToExistingFile = new Map();
for (const v of allVocab) {
  const key = v.german.toLowerCase().trim();
  if (!wordToExistingFile.has(key)) {
    const filePath = path.join(vocabDir, `${v.id}.mp3`);
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
      wordToExistingFile.set(key, filePath);
    }
  }
}

// Find missing and fix them
let copied = 0;
let generated = 0;
let failed = 0;

for (const v of allVocab) {
  const outFile = path.join(vocabDir, `${v.id}.mp3`);

  // Skip if file exists and has content
  if (fs.existsSync(outFile) && fs.statSync(outFile).size > 0) {
    continue;
  }

  const key = v.german.toLowerCase().trim();

  // Try to copy from existing duplicate
  if (wordToExistingFile.has(key)) {
    const sourceFile = wordToExistingFile.get(key);
    try {
      fs.copyFileSync(sourceFile, outFile);
      copied++;
      console.log(`  [COPY] ${v.id}: "${v.german}" ← ${path.basename(sourceFile)}`);
    } catch (e) {
      console.error(`  [ERROR] Failed to copy for ${v.id}: ${e.message}`);
      failed++;
    }
  } else {
    // Generate new audio
    const text = v.german.replace(/"/g, '\\"').replace(/'/g, "\\'");
    try {
      execSync(
        `edge-tts --voice ${VOICE} --text "${text}" --write-media "${outFile}"`,
        { stdio: 'pipe', timeout: 15000 }
      );
      generated++;
      console.log(`  [GEN]  ${v.id}: "${v.german}"`);
      // Update the map so future duplicates can copy from this
      wordToExistingFile.set(key, outFile);
    } catch (e) {
      failed++;
      console.error(`  [ERROR] ${v.id} "${v.german}": ${e.message?.slice(0, 80)}`);
    }
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Copied from existing: ${copied}`);
console.log(`Generated new: ${generated}`);
console.log(`Failed: ${failed}`);
console.log(`Total fixed: ${copied + generated}`);
