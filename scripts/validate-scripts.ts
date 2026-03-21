/**
 * QA validator for generated video scripts.
 *
 * Reads all generated scripts and the hand-written ones, then checks:
 *  - Word count (target: 350-500)
 *  - Section structure ([INTRO], [CLOSING], [SECTION ...])
 *  - keyVocabulary coverage (every vocab word must appear in the script)
 *
 * Usage:  npx tsx scripts/validate-scripts.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Video {
  id: string;
  title: string;
  duration: string;
  description: string;
  scriptOutline: string[];
  keyVocabulary: string[];
  learningObjectives: string[];
  placeholderThumbnail: string;
}

interface Lesson {
  id: string;
  title: string;
  titleGerman: string;
  description: string;
  duration: string;
  xpReward: number;
  videos: Video[];
  exercises: unknown[];
  vocabulary: unknown[];
}

interface Module {
  id: number;
  title: string;
  titleGerman: string;
  description: string;
  icon: string;
  color: string;
  totalHours: number;
  lessons: Lesson[];
  unlockRequirement?: string;
}

interface Issue {
  videoId: string;
  videoTitle: string;
  type: 'word-count' | 'missing-intro' | 'missing-closing' | 'no-sections' | 'missing-vocab';
  severity: 'error' | 'warning';
  message: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MODULES_DIR = path.join(PROJECT_ROOT, 'src', 'lib', 'content', 'modules');
const EXISTING_SCRIPTS_FILE = path.join(PROJECT_ROOT, 'src', 'lib', 'content', 'video-scripts.ts');
const GENERATED_DIR = path.join(PROJECT_ROOT, 'src', 'lib', 'content', 'video-scripts');

const MIN_WORDS = 350;
const MAX_WORDS = 500;

// ---------------------------------------------------------------------------
// Loaders
// ---------------------------------------------------------------------------

async function loadModule(moduleNum: number): Promise<Module> {
  const padded = String(moduleNum).padStart(2, '0');
  const filePath = path.join(MODULES_DIR, `module-${padded}.ts`);
  // On Windows, dynamic import() requires file:// URLs for absolute paths
  const fileUrl = pathToFileURL(filePath).href;
  const mod = await import(fileUrl);
  const exportName = `MODULE_${moduleNum}`;
  return mod[exportName] as Module;
}

function loadExistingScripts(): Record<string, string> {
  if (!fs.existsSync(EXISTING_SCRIPTS_FILE)) return {};
  const content = fs.readFileSync(EXISTING_SCRIPTS_FILE, 'utf-8');
  const scripts: Record<string, string> = {};
  const regex = /'(v[\d]+-[\d]+-[\d]+)':\s*`([\s\S]*?)`/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    scripts[match[1]] = match[2].trim();
  }
  return scripts;
}

function loadGeneratedScripts(): Record<string, string> {
  const scripts: Record<string, string> = {};
  if (!fs.existsSync(GENERATED_DIR)) return scripts;

  const files = fs.readdirSync(GENERATED_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
  for (const file of files) {
    const content = fs.readFileSync(path.join(GENERATED_DIR, file), 'utf-8');
    const regex = /'(v[\d]+-[\d]+-[\d]+)':\s*`([\s\S]*?)`/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      scripts[match[1]] = match[2].trim();
    }
  }
  return scripts;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateScript(
  videoId: string,
  videoTitle: string,
  script: string,
  keyVocabulary: string[]
): Issue[] {
  const issues: Issue[] = [];
  const scriptLower = script.toLowerCase();

  // 1. Word count
  const words = script.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  if (wordCount < MIN_WORDS) {
    issues.push({
      videoId,
      videoTitle,
      type: 'word-count',
      severity: wordCount < MIN_WORDS * 0.8 ? 'error' : 'warning',
      message: `Too short: ${wordCount} words (target: ${MIN_WORDS}-${MAX_WORDS})`,
    });
  } else if (wordCount > MAX_WORDS) {
    issues.push({
      videoId,
      videoTitle,
      type: 'word-count',
      severity: wordCount > MAX_WORDS * 1.3 ? 'error' : 'warning',
      message: `Too long: ${wordCount} words (target: ${MIN_WORDS}-${MAX_WORDS})`,
    });
  }

  // 2. Section structure — must have [INTRO ...]
  if (!/\[INTRO\s*[—\-]/.test(script)) {
    issues.push({
      videoId,
      videoTitle,
      type: 'missing-intro',
      severity: 'error',
      message: 'Missing [INTRO — ...] section',
    });
  }

  // 3. Must have [CLOSING ...]
  if (!/\[CLOSING\s*[—\-]/.test(script)) {
    issues.push({
      videoId,
      videoTitle,
      type: 'missing-closing',
      severity: 'error',
      message: 'Missing [CLOSING — ...] section',
    });
  }

  // 4. Should have at least one [SECTION ...]
  const sectionMatches = script.match(/\[SECTION\s+\d+/g);
  if (!sectionMatches || sectionMatches.length === 0) {
    issues.push({
      videoId,
      videoTitle,
      type: 'no-sections',
      severity: 'warning',
      message: 'No numbered [SECTION N — ...] found',
    });
  }

  // 5. keyVocabulary coverage
  const missingVocab: string[] = [];
  for (const vocab of keyVocabulary) {
    // Check case-insensitive, and also check without punctuation marks like ?
    const vocabClean = vocab.replace(/[?!.,]/g, '').toLowerCase();
    if (!scriptLower.includes(vocabClean)) {
      // Also try individual words for multi-word phrases
      const vocabWords = vocabClean.split(/\s+/).filter((w) => w.length > 2);
      const allWordsPresent = vocabWords.every((w) => scriptLower.includes(w));
      if (!allWordsPresent) {
        missingVocab.push(vocab);
      }
    }
  }

  if (missingVocab.length > 0) {
    issues.push({
      videoId,
      videoTitle,
      type: 'missing-vocab',
      severity: missingVocab.length > keyVocabulary.length * 0.3 ? 'error' : 'warning',
      message: `Missing vocabulary (${missingVocab.length}/${keyVocabulary.length}): ${missingVocab.join(', ')}`,
    });
  }

  return issues;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log('=== Video Script QA Validator ===\n');

  // 1. Load all scripts
  const handWritten = loadExistingScripts();
  const generated = loadGeneratedScripts();
  const allScripts = { ...handWritten, ...generated };
  console.log(`Hand-written scripts: ${Object.keys(handWritten).length}`);
  console.log(`Generated scripts:    ${Object.keys(generated).length}`);
  console.log(`Total scripts:        ${Object.keys(allScripts).length}\n`);

  // 2. Load all modules to get video metadata
  const videoMap: Record<string, { title: string; keyVocabulary: string[] }> = {};
  let totalVideos = 0;

  for (let i = 1; i <= 18; i++) {
    try {
      const mod = await loadModule(i);
      for (const lesson of mod.lessons) {
        for (const video of lesson.videos) {
          totalVideos++;
          videoMap[video.id] = {
            title: video.title,
            keyVocabulary: video.keyVocabulary,
          };
        }
      }
    } catch (err) {
      console.error(`ERROR loading module ${i}:`, err);
    }
  }

  console.log(`Total videos in course: ${totalVideos}`);
  console.log(`Videos with scripts:    ${Object.keys(allScripts).length}`);
  console.log(`Videos WITHOUT scripts: ${totalVideos - Object.keys(allScripts).length}\n`);

  // 3. Validate each script
  const allIssues: Issue[] = [];
  let validCount = 0;

  for (const [videoId, script] of Object.entries(allScripts)) {
    const meta = videoMap[videoId];
    if (!meta) {
      console.warn(`WARNING: Script ${videoId} has no matching video in modules (orphaned script?)`);
      continue;
    }

    const issues = validateScript(videoId, meta.title, script, meta.keyVocabulary);
    if (issues.length === 0) {
      validCount++;
    } else {
      allIssues.push(...issues);
    }
  }

  // 4. Report
  console.log('--- VALIDATION RESULTS ---\n');

  const errors = allIssues.filter((i) => i.severity === 'error');
  const warnings = allIssues.filter((i) => i.severity === 'warning');

  console.log(`Valid scripts:  ${validCount}/${Object.keys(allScripts).length}`);
  console.log(`Errors:         ${errors.length}`);
  console.log(`Warnings:       ${warnings.length}\n`);

  if (errors.length > 0) {
    console.log('=== ERRORS ===');
    for (const issue of errors) {
      console.log(`  [ERROR] ${issue.videoId} (${issue.videoTitle})`);
      console.log(`          ${issue.message}`);
    }
    console.log();
  }

  if (warnings.length > 0) {
    console.log('=== WARNINGS ===');
    for (const issue of warnings) {
      console.log(`  [WARN]  ${issue.videoId} (${issue.videoTitle})`);
      console.log(`          ${issue.message}`);
    }
    console.log();
  }

  // 5. Per-type summary
  const typeCounts: Record<string, number> = {};
  for (const issue of allIssues) {
    typeCounts[issue.type] = (typeCounts[issue.type] || 0) + 1;
  }

  if (Object.keys(typeCounts).length > 0) {
    console.log('=== ISSUE BREAKDOWN ===');
    for (const [type, count] of Object.entries(typeCounts)) {
      console.log(`  ${type}: ${count}`);
    }
    console.log();
  }

  // 6. Coverage report
  console.log('=== COVERAGE BY MODULE ===');
  for (let i = 1; i <= 18; i++) {
    try {
      const mod = await loadModule(i);
      let moduleTotal = 0;
      let moduleWithScript = 0;
      for (const lesson of mod.lessons) {
        for (const video of lesson.videos) {
          moduleTotal++;
          if (allScripts[video.id]) moduleWithScript++;
        }
      }
      const pct = moduleTotal > 0 ? Math.round((moduleWithScript / moduleTotal) * 100) : 0;
      const bar = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5));
      console.log(
        `  Module ${String(i).padStart(2, ' ')}: ${bar} ${String(pct).padStart(3, ' ')}% (${moduleWithScript}/${moduleTotal})`
      );
    } catch {
      console.log(`  Module ${String(i).padStart(2, ' ')}: ERROR loading`);
    }
  }

  console.log();

  // Exit code
  if (errors.length > 0) {
    console.log('Validation FAILED with errors. Please fix the issues above.');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log('Validation passed with warnings. Consider reviewing the items above.');
  } else {
    console.log('All scripts passed validation!');
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
