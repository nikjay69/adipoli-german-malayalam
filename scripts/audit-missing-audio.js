/**
 * Audit script: Find all missing vocab and example audio files
 * Run: node scripts/audit-missing-audio.js
 */
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');
const vocabDir = path.join(__dirname, '..', 'public', 'audio', 'vocab');
const examplesDir = path.join(__dirname, '..', 'public', 'audio', 'examples');

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

// Collect all vocab
const allVocab = [];
const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.ts')).sort();
for (const file of files) {
  const vocab = extractVocab(path.join(modulesDir, file));
  allVocab.push(...vocab);
}

console.log(`Total vocabulary items across all modules: ${allVocab.length}\n`);

// Check for missing vocab audio
const missingVocab = [];
const missingExamples = [];
const zeroSizeVocab = [];
const zeroSizeExamples = [];

for (const v of allVocab) {
  const vocabFile = path.join(vocabDir, `${v.id}.mp3`);
  const exampleFile = path.join(examplesDir, `${v.id}.mp3`);

  if (!fs.existsSync(vocabFile)) {
    missingVocab.push(v);
  } else {
    const stat = fs.statSync(vocabFile);
    if (stat.size === 0) {
      zeroSizeVocab.push(v);
    }
  }

  if (!fs.existsSync(exampleFile)) {
    missingExamples.push(v);
  } else {
    const stat = fs.statSync(exampleFile);
    if (stat.size === 0) {
      zeroSizeExamples.push(v);
    }
  }
}

console.log('=== MISSING VOCAB AUDIO ===');
if (missingVocab.length === 0) {
  console.log('  ✅ All vocab audio files present!');
} else {
  console.log(`  ❌ ${missingVocab.length} missing:`);
  for (const v of missingVocab) {
    console.log(`    ${v.id}: "${v.german}"`);
  }
}

console.log('\n=== MISSING EXAMPLE AUDIO ===');
if (missingExamples.length === 0) {
  console.log('  ✅ All example audio files present!');
} else {
  console.log(`  ❌ ${missingExamples.length} missing:`);
  for (const v of missingExamples) {
    console.log(`    ${v.id}: "${v.example}"`);
  }
}

console.log('\n=== ZERO-SIZE FILES ===');
if (zeroSizeVocab.length > 0) {
  console.log(`  ⚠️ ${zeroSizeVocab.length} zero-size vocab files:`);
  for (const v of zeroSizeVocab) {
    console.log(`    ${v.id}: "${v.german}"`);
  }
}
if (zeroSizeExamples.length > 0) {
  console.log(`  ⚠️ ${zeroSizeExamples.length} zero-size example files:`);
  for (const v of zeroSizeExamples) {
    console.log(`    ${v.id}: "${v.example}"`);
  }
}
if (zeroSizeVocab.length === 0 && zeroSizeExamples.length === 0) {
  console.log('  ✅ No zero-size files!');
}

// Summary by module
console.log('\n=== PER-MODULE BREAKDOWN ===');
for (const file of files) {
  const moduleNum = file.match(/module-(\d+)/)?.[1];
  const vocab = extractVocab(path.join(modulesDir, file));
  let mVocab = 0, mExample = 0;
  for (const v of vocab) {
    if (!fs.existsSync(path.join(vocabDir, `${v.id}.mp3`))) mVocab++;
    if (!fs.existsSync(path.join(examplesDir, `${v.id}.mp3`))) mExample++;
  }
  const status = (mVocab === 0 && mExample === 0) ? '✅' : '❌';
  console.log(`  Module ${moduleNum}: ${vocab.length} items | ${status} missing: ${mVocab} vocab, ${mExample} examples`);
}

console.log(`\n=== TOTAL ===`);
console.log(`Missing vocab: ${missingVocab.length}`);
console.log(`Missing examples: ${missingExamples.length}`);
console.log(`Zero-size vocab: ${zeroSizeVocab.length}`);
console.log(`Zero-size examples: ${zeroSizeExamples.length}`);
console.log(`TOTAL TO GENERATE: ${missingVocab.length + missingExamples.length + zeroSizeVocab.length + zeroSizeExamples.length}`);
