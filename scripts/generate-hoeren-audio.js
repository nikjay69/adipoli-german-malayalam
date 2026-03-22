/**
 * Generate audio for all Hören (listening) exercises using edge-tts
 *
 * Sources:
 *   1. Goethe tests (src/lib/content/goethe-tests.ts) — hoeren teil1/teil2/teil3 audio_text fields
 *   2. Module 17 & 18 exercises — German text embedded in exercise questions (Hören practice)
 *
 * Output: public/audio/hoeren/{id}.mp3
 * Voice: de-DE-ConradNeural (Microsoft Neural TTS)
 *
 * Prerequisites:
 *   pip install edge-tts
 *
 * Run with:
 *   node scripts/generate-hoeren-audio.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ── Configuration ──────────────────────────────────────────────────────────
const VOICE = 'de-DE-ConradNeural';
const PROJECT_ROOT = path.resolve(__dirname, '..');
const HOEREN_DIR = path.join(PROJECT_ROOT, 'public', 'audio', 'hoeren');
const GOETHE_TESTS_PATH = path.join(PROJECT_ROOT, 'src', 'lib', 'content', 'goethe-tests.ts');
const MODULES_DIR = path.join(PROJECT_ROOT, 'src', 'lib', 'content', 'modules');

// ── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function checkEdgeTts() {
  try {
    execSync('edge-tts --version', { stdio: 'pipe' });
    return true;
  } catch {
    console.error('\n[ERROR] edge-tts is not installed or not on PATH.');
    console.error('Install it with:\n  pip install edge-tts\n');
    return false;
  }
}

function escapeShellText(text) {
  // Escape for shell: double-quote wrapping with inner escapes
  return text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

function generateAudio(text, outputPath) {
  const escaped = escapeShellText(text);
  try {
    execSync(
      `edge-tts --voice ${VOICE} --text "${escaped}" --write-media "${outputPath}"`,
      { stdio: 'pipe', timeout: 30000 }
    );
    return true;
  } catch (err) {
    console.error(`    [FAILED] ${err.message?.split('\n')[0]?.slice(0, 100)}`);
    return false;
  }
}

// ── Phase 1: Extract audio_text from Goethe tests ─────────────────────────

function extractGoetheAudio() {
  const content = fs.readFileSync(GOETHE_TESTS_PATH, 'utf8');
  const items = [];

  // Match Hören questions with id and audio_text fields
  // Pattern: { id: 'xxx', audio_text: 'yyy', ... } or { id: "xxx", audio_text: "yyy", ... }
  // We need to handle multi-line audio_text with concatenation
  const blocks = content.split(/\{\s*\n?\s*id:\s*/g);

  for (const block of blocks) {
    // Extract id
    const idMatch = block.match(/^['"]([^'"]+)['"]/);
    if (!idMatch) continue;
    const id = idMatch[1];

    // Only process Hören question IDs (they start with t{N}-h{teil}-{num})
    if (!/^t\d+-h\d+-\d+$/.test(id)) continue;

    // Extract audio_text — handle single-line and multi-line (concatenated with \n)
    const audioMatch = block.match(/audio_text:\s*(?:\n\s*)?['"]([^]*?)(?:['"],?\s*\n)/);
    if (!audioMatch) {
      // Try multi-line concatenation pattern: 'line1\nline2'
      const audioMatch2 = block.match(/audio_text:\s*\n?\s*['"`]([^]*?)['"`],?\s*\n/);
      if (audioMatch2) {
        const text = audioMatch2[1].replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
        if (text) {
          // Derive testId from the question id: t1-h1-1 → goethe-a1-test-1
          const testNum = id.match(/^t(\d+)/)?.[1];
          const testId = `goethe-a1-test-${testNum}`;
          items.push({ id, testId, text });
        }
      }
      continue;
    }

    let text = audioMatch[1]
      .replace(/\\n/g, ' ')     // Replace escaped newlines with space
      .replace(/\n/g, ' ')      // Replace actual newlines
      .replace(/\s+/g, ' ')     // Collapse whitespace
      .trim();

    if (text) {
      const testNum = id.match(/^t(\d+)/)?.[1];
      const testId = `goethe-a1-test-${testNum}`;
      items.push({ id, testId, text });
    }
  }

  return items;
}

// More robust extraction using line-by-line approach
function extractGoetheAudioRobust() {
  const content = fs.readFileSync(GOETHE_TESTS_PATH, 'utf8');
  const lines = content.split('\n');
  const items = [];
  let currentId = null;
  let collectingAudioText = false;
  let audioTextLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect id field
    const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      // Save previous item if we were collecting
      if (currentId && audioTextLines.length > 0) {
        const text = audioTextLines.join(' ')
          .replace(/['"]\s*\+?\s*['"]/g, ' ')  // Handle string concatenation
          .replace(/\\n/g, ' ')
          .replace(/^['"]|['"],?\s*$/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        if (text && /^t\d+-h\d+-\d+$/.test(currentId)) {
          const testNum = currentId.match(/^t(\d+)/)?.[1];
          items.push({ id: currentId, testId: `goethe-a1-test-${testNum}`, text });
        }
        audioTextLines = [];
      }
      currentId = idMatch[1];
      collectingAudioText = false;
      audioTextLines = [];
    }

    // Detect audio_text field start
    if (line.match(/audio_text:\s*/)) {
      collectingAudioText = true;
      audioTextLines = [];
      // Check if it's a single-line value
      const singleLine = line.match(/audio_text:\s*['"](.+)['"],?\s*$/);
      if (singleLine) {
        audioTextLines.push(singleLine[1]);
        collectingAudioText = false;
        // Save immediately
        if (currentId && /^t\d+-h\d+-\d+$/.test(currentId)) {
          const text = audioTextLines.join(' ').replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
          if (text) {
            const testNum = currentId.match(/^t(\d+)/)?.[1];
            items.push({ id: currentId, testId: `goethe-a1-test-${testNum}`, text });
          }
        }
        audioTextLines = [];
        currentId = null; // Reset so we don't double-count
        continue;
      }
      // Multi-line: extract from this line
      const startMatch = line.match(/audio_text:\s*\n?\s*['"](.*)$/);
      if (startMatch) {
        audioTextLines.push(startMatch[1]);
      }
      continue;
    }

    // Continue collecting multi-line audio_text
    if (collectingAudioText) {
      // Check if this line ends the string
      const endMatch = line.match(/^(.*?)['"],?\s*$/);
      if (endMatch && !line.match(/audio_text:/)) {
        audioTextLines.push(endMatch[1]);
        collectingAudioText = false;
        // Save
        if (currentId && /^t\d+-h\d+-\d+$/.test(currentId)) {
          const text = audioTextLines.join(' ')
            .replace(/['"]\s*\+?\s*['"]/g, ' ')
            .replace(/\\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          if (text) {
            const testNum = currentId.match(/^t(\d+)/)?.[1];
            items.push({ id: currentId, testId: `goethe-a1-test-${testNum}`, text });
          }
        }
        audioTextLines = [];
        currentId = null;
      } else {
        audioTextLines.push(line.trim());
      }
    }
  }

  return items;
}

// ── Phase 2: Extract German audio text from module-17 & module-18 exercises ─

function extractModuleHoerenExercises() {
  const items = [];
  const moduleFiles = ['module-17.ts', 'module-18.ts'];

  for (const file of moduleFiles) {
    const filePath = path.join(MODULES_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.log(`  [SKIP] ${file} not found`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Find exercises that contain Hören-type German text
    // Pattern: exercises with "You hear:" or "HÖREN" in the question, containing German quoted text
    const exerciseBlocks = content.split(/\{\s*\n\s*id:\s*"/g);

    for (const block of exerciseBlocks) {
      const idMatch = block.match(/^([^"]+)"/);
      if (!idMatch) continue;
      const id = idMatch[1];

      // Only process exercise IDs
      if (!id.startsWith('ex')) continue;

      // Check if this is a Hören exercise (contains "You hear", "HÖREN", or listening-related content)
      const questionMatch = block.match(/question:\s*"([^]*?)(?:"\s*,\s*\n)/);
      if (!questionMatch) continue;
      const question = questionMatch[1];

      if (!question.match(/You hear|HÖREN|Hören.*Teil|📢.*hear|🎧.*HÖREN/i)) continue;

      // Extract the German text from the question
      // Patterns:
      //   'German text here' (single-quoted within the question string)
      //   The German text is usually between \n' and '\n or between quotes
      const germanTexts = [];

      // Match text within escaped single quotes: \'text\'
      const quotedMatches = question.match(/\\['']([^\\]*?)\\['']/g);
      if (quotedMatches) {
        for (const m of quotedMatches) {
          const cleaned = m.replace(/\\['']/g, '').trim();
          // Only include if it looks German (has German chars or common German words)
          if (cleaned.length > 10 && /[A-ZÄÖÜäöüß]/.test(cleaned)) {
            germanTexts.push(cleaned);
          }
        }
      }

      // Also try matching text after "You hear:" or similar markers
      const hearMatch = question.match(/You hear[^:]*:\s*\\n\\?['"]?(.+?)\\n\\n?📝|You hear[^:]*:\s*\\n(.+?)\\n\\n/);
      if (hearMatch) {
        const text = (hearMatch[1] || hearMatch[2] || '').replace(/\\n/g, ' ').replace(/\\'/g, "'").trim();
        if (text.length > 10) germanTexts.push(text);
      }

      if (germanTexts.length > 0) {
        // Join all German text fragments for this exercise
        const fullText = germanTexts.join(' ').replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
        if (fullText) {
          items.push({
            id,
            testId: file.replace('.ts', ''),
            text: fullText,
          });
        }
      }
    }
  }

  return items;
}

// Simpler, more reliable extraction for module exercises
function extractModuleHoerenSimple() {
  const items = [];
  const moduleFiles = ['module-17.ts', 'module-18.ts'];

  for (const file of moduleFiles) {
    const filePath = path.join(MODULES_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.log(`  [SKIP] ${file} not found`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Find exercise IDs and their questions
    const idRegex = /id:\s*"(ex\d+-\d+-\d+)"/g;
    let idMatch;

    while ((idMatch = idRegex.exec(content)) !== null) {
      const exId = idMatch[1];
      const startPos = idMatch.index;

      // Get the block from this id to the next exercise or end
      const nextIdPos = content.indexOf('\n        {', startPos + 1);
      const blockEnd = nextIdPos > 0 ? nextIdPos : startPos + 3000;
      const block = content.substring(startPos, blockEnd);

      // Check if this is a Hören exercise
      if (!block.match(/You hear|HÖREN|Hören.*Teil|📢.*hear|🎧.*HÖREN/i)) continue;

      // Extract German text between \' markers within the question
      const germanParts = [];
      const quoteRegex = /\\'([^\\]{10,}?)\\'/g;
      let qMatch;
      while ((qMatch = quoteRegex.exec(block)) !== null) {
        const text = qMatch[1].trim();
        // Filter: must look like German text (not options or English)
        if (text.match(/[äöüÄÖÜß]|(?:ich |Sie |Uhr|Euro|bitte|Herr|Frau|Liebe|Hallo|Guten|Achtung)/)) {
          germanParts.push(text);
        }
      }

      if (germanParts.length > 0) {
        const fullText = germanParts.join(' ')
          .replace(/\\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        items.push({
          id: exId,
          testId: file.replace('.ts', ''),
          text: fullText,
        });
      }
    }
  }

  return items;
}

// ── Main ───────────────────────────────────────────────────────────────────

function main() {
  console.log('=== Hören Audio Generator ===\n');

  // Check dependency
  if (!checkEdgeTts()) {
    process.exit(1);
  }

  // Create output directory
  ensureDir(HOEREN_DIR);

  // ── Phase 1: Goethe test audio ──────────────────────────────────────

  console.log('--- Phase 1: Goethe Test Hören Audio ---\n');

  // Try robust extraction first, fall back to simple
  let goetheItems = extractGoetheAudioRobust();
  if (goetheItems.length === 0) {
    console.log('  Robust extraction found 0 items, trying alternate method...');
    goetheItems = extractGoetheAudio();
  }

  // Deduplicate by id
  const seenIds = new Set();
  goetheItems = goetheItems.filter(item => {
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });

  console.log(`  Found ${goetheItems.length} Hören questions across Goethe tests\n`);

  let gGenerated = 0;
  let gSkipped = 0;
  let gFailed = 0;

  for (let i = 0; i < goetheItems.length; i++) {
    const item = goetheItems[i];
    // File naming: {testId}-{questionId}.mp3
    const fileName = `${item.testId}-${item.id}.mp3`;
    const outPath = path.join(HOEREN_DIR, fileName);
    const progress = `(${i + 1}/${goetheItems.length})`;

    if (fs.existsSync(outPath)) {
      gSkipped++;
      if (gSkipped % 25 === 0) {
        console.log(`  [SKIP] ${progress} ${item.id} — already exists`);
      }
      continue;
    }

    process.stdout.write(`  ${progress} ${item.id}: "${item.text.slice(0, 60)}..." `);
    const success = generateAudio(item.text, outPath);

    if (success) {
      gGenerated++;
      console.log('OK');
    } else {
      gFailed++;
      console.log('FAILED');
    }
  }

  console.log(`\n  Goethe audio: ${gGenerated} generated, ${gSkipped} skipped, ${gFailed} failed\n`);

  // ── Phase 2: Module 17 & 18 Hören exercises ─────────────────────────

  console.log('--- Phase 2: Module 17 & 18 Hören Exercises ---\n');

  let moduleItems = extractModuleHoerenSimple();

  // Deduplicate
  moduleItems = moduleItems.filter(item => {
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });

  console.log(`  Found ${moduleItems.length} Hören exercises in module-17/18\n`);

  let mGenerated = 0;
  let mSkipped = 0;
  let mFailed = 0;

  for (let i = 0; i < moduleItems.length; i++) {
    const item = moduleItems[i];
    const fileName = `${item.testId}-${item.id}.mp3`;
    const outPath = path.join(HOEREN_DIR, fileName);
    const progress = `(${i + 1}/${moduleItems.length})`;

    if (fs.existsSync(outPath)) {
      mSkipped++;
      continue;
    }

    process.stdout.write(`  ${progress} ${item.id}: "${item.text.slice(0, 60)}..." `);
    const success = generateAudio(item.text, outPath);

    if (success) {
      mGenerated++;
      console.log('OK');
    } else {
      mFailed++;
      console.log('FAILED');
    }
  }

  console.log(`\n  Module audio: ${mGenerated} generated, ${mSkipped} skipped, ${mFailed} failed\n`);

  // ── Summary ──────────────────────────────────────────────────────────

  const allFiles = fs.readdirSync(HOEREN_DIR).filter(f => f.endsWith('.mp3'));
  const totalSize = allFiles.reduce((s, f) => s + fs.statSync(path.join(HOEREN_DIR, f)).size, 0);

  console.log('=== Summary ===');
  console.log(`  Output dir:    ${HOEREN_DIR}`);
  console.log(`  Goethe tests:  ${gGenerated + gSkipped} total (${gGenerated} new, ${gSkipped} existed, ${gFailed} failed)`);
  console.log(`  Module 17/18:  ${mGenerated + mSkipped} total (${mGenerated} new, ${mSkipped} existed, ${mFailed} failed)`);
  console.log(`  Total files:   ${allFiles.length} (${(totalSize / 1024 / 1024).toFixed(1)} MB)`);
  console.log(`  Errors:        ${gFailed + mFailed}`);
  console.log('\nDone!');
}

main();
