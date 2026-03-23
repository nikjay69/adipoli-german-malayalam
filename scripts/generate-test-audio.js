/**
 * Generate MP3 audio for ALL Hören questions across all 8 Goethe A1 tests
 *
 * Uses edge-tts with de-DE-ConradNeural voice.
 * Reads src/lib/content/goethe-tests.ts as text and extracts audio_text values
 * from Hören questions (id patterns: t1-h1-1 through t8-h3-5).
 *
 * Output: public/audio/hoeren/{testId}-{questionId}.mp3
 *   e.g.  goethe-a1-test-1-t1-h1-1.mp3
 *
 * Skips files that already exist.
 *
 * Prerequisites:
 *   pip install edge-tts
 *
 * Run with:
 *   node scripts/generate-test-audio.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ── Configuration ──────────────────────────────────────────────────────────
const VOICE = 'de-DE-ConradNeural';
const PROJECT_ROOT = path.resolve(__dirname, '..');
const HOEREN_DIR = path.join(PROJECT_ROOT, 'public', 'audio', 'hoeren');
const GOETHE_TESTS_PATH = path.join(PROJECT_ROOT, 'src', 'lib', 'content', 'goethe-tests.ts');

// ── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`  Created directory: ${dir}`);
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

/**
 * Write text to a temp file and invoke edge-tts with --file to avoid
 * shell-escaping issues (German umlauts, quotes, newlines, etc.)
 */
function generateAudio(text, outputPath) {
  const tmpFile = path.join(HOEREN_DIR, '_tmp_text.txt');
  try {
    // Write the raw text to a temp file — no shell escaping needed
    fs.writeFileSync(tmpFile, text, 'utf8');
    execSync(
      `edge-tts --voice ${VOICE} --file "${tmpFile}" --write-media "${outputPath}"`,
      { stdio: 'pipe', timeout: 60000 }
    );
    return true;
  } catch (err) {
    console.error(`    [FAILED] ${(err.message || '').split('\n')[0].slice(0, 120)}`);
    // Clean up partial file
    if (fs.existsSync(outputPath)) {
      try { fs.unlinkSync(outputPath); } catch {}
    }
    return false;
  } finally {
    // Clean up temp file
    if (fs.existsSync(tmpFile)) {
      try { fs.unlinkSync(tmpFile); } catch {}
    }
  }
}

// ── Extraction ─────────────────────────────────────────────────────────────

/**
 * Robust line-by-line extraction of Hören audio_text values from goethe-tests.ts.
 *
 * Strategy:
 *   - Track the current `id:` value as we scan lines.
 *   - When we see `audio_text:`, start collecting the string content.
 *   - Handle both single-line and multi-line string values (including
 *     template literals with backticks, concatenated strings, etc.)
 *   - Only keep IDs matching the Hören pattern: t{N}-h{teil}-{num}
 */
function extractAllHoerenAudio() {
  const content = fs.readFileSync(GOETHE_TESTS_PATH, 'utf8');
  const lines = content.split('\n');
  const items = [];
  const seenIds = new Set();

  let currentId = null;
  let collecting = false;
  let collected = [];
  let quoteChar = null; // The opening quote character we are tracking

  function saveCollected() {
    if (!currentId || collected.length === 0) return;
    if (!/^t\d+-h\d+-\d+$/.test(currentId)) return;
    if (seenIds.has(currentId)) return;

    let text = collected.join(' ')
      // Remove string concatenation artifacts
      .replace(/['"]\s*\+\s*['"]/g, ' ')
      // Remove leading/trailing quotes
      .replace(/^['"`]|['"`]\s*,?\s*$/g, '')
      // Unescape common escape sequences
      .replace(/\\n/g, '\n')
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      // Collapse whitespace (but preserve single newlines for dialogue)
      .replace(/[ \t]+/g, ' ')
      .replace(/\n /g, '\n')
      .trim();

    if (text) {
      const testNum = currentId.match(/^t(\d+)/)?.[1];
      const testId = `goethe-a1-test-${testNum}`;
      items.push({ id: currentId, testId, text });
      seenIds.add(currentId);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect id field (only update if not currently collecting audio_text)
    const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch && !collecting) {
      currentId = idMatch[1];
    }

    // Detect audio_text field start
    const audioStart = line.match(/audio_text:\s*(.*)/);
    if (audioStart) {
      // If we were already collecting from a previous field, save it
      if (collecting) {
        saveCollected();
        collected = [];
      }

      collecting = true;
      collected = [];
      const rest = audioStart[1].trim();

      if (!rest) {
        // audio_text on its own line, value starts on next line
        continue;
      }

      // Determine the quote character
      const firstChar = rest[0];
      if (firstChar === "'" || firstChar === '"' || firstChar === '`') {
        quoteChar = firstChar;

        // Check if single-line: starts and ends with same quote (not escaped)
        // e.g.  audio_text: 'Guten Tag, ich heiße Maria.',
        const singleLineMatch = rest.match(
          new RegExp(`^${quoteChar === '`' ? '`' : quoteChar}(.+?)${quoteChar === '`' ? '`' : quoteChar}\\s*,?\\s*$`)
        );

        if (singleLineMatch) {
          collected.push(singleLineMatch[1]);
          collecting = false;
          saveCollected();
          collected = [];
          continue;
        }

        // Multi-line: collect the rest of this line (after opening quote)
        collected.push(rest.slice(1)); // Remove opening quote
      } else {
        // No quote — might be on this line in a different format
        collected.push(rest);
      }
      continue;
    }

    // Continue collecting multi-line audio_text
    if (collecting) {
      const trimmed = line.trimStart();

      // Check if this line ends the string value
      // Look for closing quote followed by comma or end
      let endPattern;
      if (quoteChar) {
        endPattern = new RegExp(`^(.*?)${quoteChar === '`' ? '`' : quoteChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*,?\\s*$`);
      }

      // Simple heuristic: if the trimmed line ends with ', or ", or `, we're done
      const endsWithQuote = trimmed.match(/^(.*?)(['"`])\s*,?\s*$/);
      if (endsWithQuote && quoteChar && endsWithQuote[2] === quoteChar) {
        collected.push(endsWithQuote[1]);
        collecting = false;
        saveCollected();
        collected = [];
        continue;
      }

      // Check for string concatenation continuation: ends with ' + or " +
      const concatMatch = trimmed.match(/^(.*?)['"`]\s*\+\s*$/);
      if (concatMatch) {
        collected.push(concatMatch[1]);
        continue;
      }

      // Check for concatenation start: starts with ' or "
      const concatStart = trimmed.match(/^['"`](.*)$/);
      if (concatStart) {
        collected.push(concatStart[1]);
        continue;
      }

      // If we hit a new field (e.g. statement:, question:, correct:), stop collecting
      if (trimmed.match(/^(statement|question|correct|explanation|options)\s*:/)) {
        collecting = false;
        saveCollected();
        collected = [];
        // Re-process this line in case it has an id
        if (idMatch) currentId = idMatch[1];
        continue;
      }

      // Otherwise, accumulate
      collected.push(trimmed);
    }
  }

  // Don't forget the last item
  if (collecting) {
    saveCollected();
  }

  return items;
}

/**
 * Fallback: regex-based extraction that matches the most common patterns.
 */
function extractFallback() {
  const content = fs.readFileSync(GOETHE_TESTS_PATH, 'utf8');
  const items = [];
  const seenIds = new Set();

  // Split into blocks by id field
  const idRegex = /id:\s*['"]([^'"]+)['"]/g;
  let match;
  const idPositions = [];

  while ((match = idRegex.exec(content)) !== null) {
    idPositions.push({ id: match[1], pos: match.index });
  }

  for (let i = 0; i < idPositions.length; i++) {
    const { id, pos } = idPositions[i];
    if (!/^t\d+-h\d+-\d+$/.test(id)) continue;
    if (seenIds.has(id)) continue;

    const endPos = i + 1 < idPositions.length ? idPositions[i + 1].pos : pos + 3000;
    const block = content.substring(pos, endPos);

    // Try to extract audio_text value
    // Pattern 1: single-line  audio_text: 'text',
    let audioMatch = block.match(/audio_text:\s*'([^']+)'/);
    if (!audioMatch) {
      audioMatch = block.match(/audio_text:\s*"([^"]+)"/);
    }
    if (!audioMatch) {
      // Multi-line with newlines
      audioMatch = block.match(/audio_text:\s*\n?\s*['"]([^]*?)['"],?\s*\n\s*(?:statement|question)/);
    }

    if (audioMatch) {
      let text = audioMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/['"]\s*\+\s*['"]/g, ' ')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n /g, '\n')
        .trim();

      if (text) {
        const testNum = id.match(/^t(\d+)/)?.[1];
        items.push({ id, testId: `goethe-a1-test-${testNum}`, text });
        seenIds.add(id);
      }
    }
  }

  return items;
}

// ── Main ───────────────────────────────────────────────────────────────────

function main() {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  Goethe A1 Hören Audio Generator            ║');
  console.log('║  8 Tests × 15 questions = 120 audio files   ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  // Check dependency
  if (!checkEdgeTts()) {
    process.exit(1);
  }

  // Create output directory
  ensureDir(HOEREN_DIR);

  // Extract audio texts
  console.log('Extracting audio_text values from goethe-tests.ts...\n');

  let items = extractAllHoerenAudio();
  console.log(`  Line-by-line extraction found: ${items.length} items`);

  if (items.length < 100) {
    console.log('  Trying fallback regex extraction...');
    const fallbackItems = extractFallback();
    console.log(`  Fallback extraction found: ${fallbackItems.length} items`);

    // Merge (prefer line-by-line, add any missing from fallback)
    const seenIds = new Set(items.map(i => i.id));
    for (const item of fallbackItems) {
      if (!seenIds.has(item.id)) {
        items.push(item);
        seenIds.add(item.id);
      }
    }
    console.log(`  Combined total: ${items.length} items`);
  }

  // Sort by test number and question for orderly progress display
  items.sort((a, b) => {
    const aTest = parseInt(a.id.match(/^t(\d+)/)?.[1] || '0');
    const bTest = parseInt(b.id.match(/^t(\d+)/)?.[1] || '0');
    if (aTest !== bTest) return aTest - bTest;
    return a.id.localeCompare(b.id);
  });

  // Show per-test breakdown
  const byTest = {};
  for (const item of items) {
    byTest[item.testId] = (byTest[item.testId] || 0) + 1;
  }
  console.log('\n  Per-test breakdown:');
  for (const [tid, count] of Object.entries(byTest)) {
    console.log(`    ${tid}: ${count} questions`);
  }

  // Validate: we expect 15 per test × 8 tests = 120
  const expected = 120;
  if (items.length < expected) {
    console.log(`\n  ⚠ Expected ${expected} items but found ${items.length}. Some may fail to extract.`);
    console.log('  Continuing with what we have...\n');
  } else {
    console.log(`\n  ✓ Found all ${expected} expected Hören questions!\n`);
  }

  // Generate audio
  console.log('─────────────────────────────────────────────');
  console.log('Generating MP3 audio files...\n');

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  let currentTest = '';

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const fileName = `${item.testId}-${item.id}.mp3`;
    const outPath = path.join(HOEREN_DIR, fileName);

    // Print test header when we enter a new test
    if (item.testId !== currentTest) {
      currentTest = item.testId;
      console.log(`\n  📋 ${currentTest}`);
    }

    // Skip if file already exists
    if (fs.existsSync(outPath)) {
      const size = fs.statSync(outPath).size;
      if (size > 100) { // At least 100 bytes = likely valid
        skipped++;
        process.stdout.write(`    [${i + 1}/${items.length}] ${item.id} — exists (${(size / 1024).toFixed(0)}KB)\n`);
        continue;
      }
      // If file is too small, regenerate
      fs.unlinkSync(outPath);
    }

    const preview = item.text.replace(/\n/g, ' ').slice(0, 55);
    process.stdout.write(`    [${i + 1}/${items.length}] ${item.id}: "${preview}..." `);

    const success = generateAudio(item.text, outPath);

    if (success) {
      const size = fs.statSync(outPath).size;
      generated++;
      console.log(`✓ (${(size / 1024).toFixed(0)}KB)`);
    } else {
      failed++;
      console.log('✗ FAILED');
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────

  console.log('\n─────────────────────────────────────────────');
  console.log('SUMMARY\n');

  const allFiles = fs.existsSync(HOEREN_DIR)
    ? fs.readdirSync(HOEREN_DIR).filter(f => f.endsWith('.mp3'))
    : [];
  const totalSize = allFiles.reduce((s, f) => s + fs.statSync(path.join(HOEREN_DIR, f)).size, 0);

  console.log(`  Output directory: ${HOEREN_DIR}`);
  console.log(`  Items extracted:  ${items.length}`);
  console.log(`  Generated:        ${generated} new files`);
  console.log(`  Skipped:          ${skipped} (already existed)`);
  console.log(`  Failed:           ${failed}`);
  console.log(`  Total MP3 files:  ${allFiles.length}`);
  console.log(`  Total size:       ${(totalSize / 1024 / 1024).toFixed(1)} MB`);

  if (failed > 0) {
    console.log(`\n  ⚠ ${failed} files failed to generate. Re-run the script to retry.`);
  }

  if (allFiles.length >= expected) {
    console.log(`\n  ✓ All ${expected} audio files are present!`);
  } else {
    console.log(`\n  ${allFiles.length}/${expected} audio files present.`);
  }

  console.log('\nDone!');
}

main();
