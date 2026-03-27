/**
 * Gemini-powered video script generator for German-Malayalam learning app.
 *
 * Reads all 18 module files to extract video metadata, uses existing scripts
 * as few-shot examples, and calls Gemini 2.0 Flash to generate scripts for
 * videos that don't have one yet.
 *
 * Usage:  npx tsx scripts/generate-scripts.ts
 *
 * Requires GEMINI_API_KEY in .env.local at the project root.
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

// ---------------------------------------------------------------------------
// Types (mirrors src/lib/content/types.ts but kept standalone)
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
  script?: string;
  videoUrl?: string;
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

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MODULES_DIR = path.join(PROJECT_ROOT, 'src', 'lib', 'content', 'modules');
const EXISTING_SCRIPTS_FILE = path.join(PROJECT_ROOT, 'src', 'lib', 'content', 'video-scripts.ts');
const LEGACY_SCRIPTS_DIR = path.join(PROJECT_ROOT, 'docs', 'scripts');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src', 'lib', 'content', 'video-scripts');

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const BATCH_DELAY_MS = 1_000; // 1 second between API calls
const MAX_RETRIES = 1;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadApiKey(): string {
  const envPath = path.join(PROJECT_ROOT, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('ERROR: .env.local not found at', envPath);
    console.error('Create it with: GEMINI_API_KEY=your-key-here');
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf-8');
  const match = content.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
  if (!match) {
    console.error('ERROR: GEMINI_API_KEY not found in .env.local');
    process.exit(1);
  }
  return match[1].trim().replace(/^["']|["']$/g, '');
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Dynamically import a module-XX.ts file and extract its Module object.
 * We use a dynamic import with ts-node / tsx which handles TS natively.
 */
async function loadModule(moduleNum: number): Promise<Module> {
  const padded = String(moduleNum).padStart(2, '0');
  const filePath = path.join(MODULES_DIR, `module-${padded}.ts`);
  // On Windows, dynamic import() requires file:// URLs for absolute paths
  const fileUrl = pathToFileURL(filePath).href;
  const mod = await import(fileUrl);
  // Each file exports MODULE_1, MODULE_2, etc.
  const exportName = `MODULE_${moduleNum}`;
  if (!mod[exportName]) {
    throw new Error(`Export "${exportName}" not found in ${filePath}`);
  }
  return mod[exportName] as Module;
}

/**
 * Parse the existing VIDEO_SCRIPTS from video-scripts.ts.
 * We extract the key-value pairs using regex since it's a simple Record<string, string>.
 */
function loadExistingScripts(): Record<string, string> {
  if (!fs.existsSync(EXISTING_SCRIPTS_FILE)) {
    console.warn('WARNING: Existing scripts file not found, proceeding without few-shot examples.');
    return {};
  }

  const content = fs.readFileSync(EXISTING_SCRIPTS_FILE, 'utf-8');
  const scripts: Record<string, string> = {};

  // Match patterns like: 'v1-1-1': `...`,
  const regex = /'(v[\d]+-[\d]+-[\d]+)':\s*`([\s\S]*?)`/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    scripts[match[1]] = match[2].trim();
  }

  return scripts;
}

/**
 * Load any already-generated scripts from the output directory.
 */
function loadGeneratedScripts(): Record<string, string> {
  const scripts: Record<string, string> = {};

  // Check new output dir
  if (fs.existsSync(OUTPUT_DIR)) {
    const files = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith('.ts'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(OUTPUT_DIR, file), 'utf-8');
      // Match patterns like: 'v3-1-1': `...`,
      const regex = /'(v[\d]+-[\d]+-[\d]+)':\s*`([\s\S]*?)`/g;
      let match: RegExpExecArray | null;
      while ((match = regex.exec(content)) !== null) {
        scripts[match[1]] = match[2].trim();
      }
    }
  }

  // Check legacy docs dir
  if (fs.existsSync(LEGACY_SCRIPTS_DIR)) {
    const files = fs.readdirSync(LEGACY_SCRIPTS_DIR).filter((f) => f.includes('FULL_SCRIPT.md'));
    for (const file of files) {
      const idMatch = file.match(/^v(\d+-\d+-\d+)_/);
      if (idMatch) {
        scripts[idMatch[1]] = fs.readFileSync(path.join(LEGACY_SCRIPTS_DIR, file), 'utf-8');
      }
    }
  }

  return scripts;
}

// ---------------------------------------------------------------------------
// Gemini API
// ---------------------------------------------------------------------------

function buildSystemPrompt(fewShotExamples: string): string {
  return `You are a script writer for a German-Malayalam language learning video series called "Adipoli German".

TARGET AUDIENCE: Young Malayalees (16-30) who know basic English and want to learn German for career/study. They're familiar with Kerala culture, memes, and Manglish (Malayalam+English natural mix).

TONE & STYLE:
- Manglish narration: Mix Malayalam and English naturally in the script. Example: "Ariyamo, German universities-il tuition almost zero aanu!"
- Peer-to-peer feel: Friendly senior/friend teaching them. Use "nee", "machaa", "bro" — not "ningal".
- Kerala cultural parallels: Draw connections to Kerala life, food, culture, festivals (IST, Kerala exam stress, Malabar parotta, etc.).
- Humor: Light, relatable humor.

INTEGRATED PRODUCTION SYSTEM:
This is an "Integrated" script. You MUST include these production tags:

1. SONIC BRANDING: Every energy cue MUST include a sonic signature chime in brackets:
    - 🎬 [Energy: SET-AANU.mp3] — For success, sorting rules, or nailing a pattern.
    - 🎬 [Energy: POLI-MASS.mp3] — For celebrations, module openers/closers, or big wins.
    - 🎬 [Energy: SCENE-AANU.mp3] — For highlighting traps, common mistakes, or "danger" areas.

2. VISUAL CONTINUITY: At the start of every section, include a hybrid visual bridge from the cinematic world:
    - Example: [VISUAL: Seamless zoom push from Kuttan's scene into the lesson slide]
    - Example: [VISUAL: Kuttan's notebook page fills the camera to show the grammar table]
    - Example: [VISUAL: Transition from Kuttan's phone screen into the course slide]

3. INTERACTIVE ANCHORS: Every script MUST end with a mandatory "Next Step: Interactive Practice" block after the closing.

SCRIPT FORMAT:
- Use [SECTION — TEMPLATE — timestamp] format for sections.
- Templates: CARD, VOCAB, TABLE (conjugations/grammar), DIALOGUE, TIP (Goethe A1 tips).
- Include pronunciation guides for German words: "Entschuldigung" (ent-shool-di-goong).
- Target 350-500 words.

STRUCTURE:
1. [INTRO] — Hook + context + [VISUAL BRIDGE]
2. [SECTION 1-N] — Teaching content + [VISUAL BRIDGES] + [SONIC SIGNATURES]
3. [CLOSING] — Recap + encouragement + preview
4. [🔥 NEXT STEP: INTERACTIVE PRACTICE] — Mandatory call-to-action to a specific drill.

Example of the new integrated style:

--- EXAMPLE START ---
[INTRO — CARD — 0:00-1:00]
🎬 [Energy: POLI-MASS.mp3]
[VISUAL: Zooming from Kuttan's staring face in Video 1 into this lesson title card]
"Namaskaram! Adipoli German-inte start-ing-il-aanu nee ippo! Last cinematic-il Kuttan fan-il nokki irunnu chirikkunnathu kandille? Athu ninteyum chiriyanu starting today. Innu nammal padikkum why German matters..."

... (teaching content) ...

[CLOSING — CARD — 9:00-10:00]
"Athre ullu! First module basic aanu, pakshe trust me, ithu ninte life-inte track maatum. Bis morgen! Tschüss!"

[🔥 NEXT STEP: INTERACTIVE PRACTICE]
**Action:** Close this video and open **Exercise X.Y: Title**.
**Goal:** Speak the patterns we learned into the AI voice evaluator.
**Reward:** 50 XP + streak protection!
*Poli! Ippo start cheyyu, set aakaam!* 🚀
--- EXAMPLE END ---

${fewShotExamples}

Generate ONLY the script text. No video ID, no export statements. Just raw script content.`;
}

function buildUserPrompt(video: Video, moduleTitle: string, lessonTitle: string): string {
  return `Generate a video script for this lesson:

MODULE: ${moduleTitle}
LESSON: ${lessonTitle}
VIDEO TITLE: ${video.title}
VIDEO DURATION: ${video.duration}
DESCRIPTION: ${video.description}

SCRIPT OUTLINE (follow this structure):
${video.scriptOutline.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}

KEY VOCABULARY (ALL of these MUST appear in the script):
${video.keyVocabulary.map((v) => `  - ${v}`).join('\n')}

LEARNING OBJECTIVES (ensure the script teaches all of these):
${video.learningObjectives.map((o) => `  - ${o}`).join('\n')}

Remember: 350-500 words, Manglish tone, [SECTION — TEMPLATE — timestamp] format, include pronunciation for German words. Choose the best template for each section's pedagogical goal.
`;
}

async function callGemini(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }],
      },
    ],
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini returned empty response: ' + JSON.stringify(data));
  }

  return text.trim();
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

function escapeBackticks(s: string): string {
  return s.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function writeModuleScripts(moduleNum: number, scripts: Record<string, string>): void {
  if (Object.keys(scripts).length === 0) return;

  const padded = String(moduleNum).padStart(2, '0');
  const fileName = `module-${padded}-scripts.ts`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  const entries = Object.entries(scripts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, script]) => `  '${id}': \`\n${escapeBackticks(script)}\n\``)
    .join(',\n\n');

  const content = `/**
 * Auto-generated video scripts for Module ${moduleNum}.
 * Generated by scripts/generate-scripts.ts using Gemini 2.5 Flash.
 *
 * DO NOT EDIT MANUALLY — re-run the generator to update.
 */

export const MODULE_${moduleNum}_SCRIPTS: Record<string, string> = {
${entries},
};
`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  Written: ${fileName} (${Object.keys(scripts).length} scripts)`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

interface VideoWithContext {
  video: Video;
  moduleNum: number;
  moduleTitle: string;
  lessonTitle: string;
}

async function main(): Promise<void> {
  console.log('=== German-Malayalam Video Script Generator ===\n');

  // 1. Load API key
  const apiKey = loadApiKey();
  console.log('API key loaded from .env.local');

  // 2. Load existing scripts (hand-written + already generated)
  const existingScripts = loadExistingScripts();
  const generatedScripts = loadGeneratedScripts();
  const allExistingScripts = { ...existingScripts, ...generatedScripts };
  console.log(`Existing hand-written scripts: ${Object.keys(existingScripts).length}`);
  console.log(`Already generated scripts: ${Object.keys(generatedScripts).length}`);

  // 3. Pick 2 existing scripts as few-shot examples
  const exampleIds = Object.keys(existingScripts).slice(0, 2);
  const fewShotExamples = exampleIds
    .map(
      (id) =>
        `--- EXAMPLE (${id}) ---\n${existingScripts[id]}\n--- END EXAMPLE ---`
    )
    .join('\n\n');
  console.log(`Using ${exampleIds.length} few-shot examples: ${exampleIds.join(', ')}\n`);

  // 4. Load all 18 modules and collect videos that need scripts
  const videosToProcess: VideoWithContext[] = [];

  for (let i = 1; i <= 18; i++) {
    try {
      const mod = await loadModule(i);
      for (const lesson of mod.lessons) {
        for (const video of lesson.videos) {
          if (!allExistingScripts[video.id]) {
            videosToProcess.push({
              video,
              moduleNum: mod.id,
              moduleTitle: `${mod.title} (${mod.titleGerman})`,
              lessonTitle: `${lesson.title} (${lesson.titleGerman})`,
            });
          }
        }
      }
    } catch (err) {
      console.error(`ERROR loading module ${i}:`, err);
    }
  }

  console.log(`Total videos needing scripts: ${videosToProcess.length}\n`);

  if (videosToProcess.length === 0) {
    console.log('All videos already have scripts. Nothing to do!');
    return;
  }

  // 5. Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 6. Build system prompt once (shared across all calls)
  const systemPrompt = buildSystemPrompt(fewShotExamples);

  // 7. Process videos, grouped by module for output
  const moduleScripts: Record<number, Record<string, string>> = {};
  let processed = 0;
  let failed = 0;

  for (const item of videosToProcess) {
    processed++;
    const { video, moduleNum, moduleTitle, lessonTitle } = item;

    console.log(
      `Generating script for ${video.id}: ${video.title}... (${processed}/${videosToProcess.length})`
    );

    const userPrompt = buildUserPrompt(video, moduleTitle, lessonTitle);

    let script: string | null = null;
    let attempts = 0;

    while (attempts <= MAX_RETRIES) {
      try {
        script = await callGemini(apiKey, systemPrompt, userPrompt);
        break;
      } catch (err) {
        attempts++;
        if (attempts > MAX_RETRIES) {
          console.error(`  FAILED after ${attempts} attempts: ${(err as Error).message}`);
          failed++;
        } else {
          console.warn(`  Retry ${attempts}/${MAX_RETRIES}: ${(err as Error).message}`);
          await sleep(2_000); // Extra wait before retry
        }
      }
    }

    if (script) {
      if (!moduleScripts[moduleNum]) {
        moduleScripts[moduleNum] = {};
      }
      moduleScripts[moduleNum][video.id] = script;

      // Word count check
      const wordCount = script.split(/\s+/).length;
      const status = wordCount < 350 ? ' (SHORT!)' : wordCount > 500 ? ' (LONG!)' : '';
      console.log(`  Done (${wordCount} words)${status}`);
    }

    // Rate limit: wait between calls
    if (processed < videosToProcess.length) {
      await sleep(BATCH_DELAY_MS);
    }
  }

  // 8. Write output files grouped by module
  console.log('\n--- Writing output files ---');
  for (const [moduleNumStr, scripts] of Object.entries(moduleScripts)) {
    const moduleNum = Number(moduleNumStr);

    // Merge with any previously generated scripts for this module
    const existingForModule: Record<string, string> = {};
    const padded = String(moduleNum).padStart(2, '0');
    const existingFilePath = path.join(OUTPUT_DIR, `module-${padded}-scripts.ts`);
    if (fs.existsSync(existingFilePath)) {
      const content = fs.readFileSync(existingFilePath, 'utf-8');
      const regex = /'(v[\d]+-[\d]+-[\d]+)':\s*`([\s\S]*?)`/g;
      let match: RegExpExecArray | null;
      while ((match = regex.exec(content)) !== null) {
        existingForModule[match[1]] = match[2].trim();
      }
    }

    const merged = { ...existingForModule, ...scripts };
    writeModuleScripts(moduleNum, merged);
  }

  // 9. Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Scripts generated: ${processed - failed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);

  if (failed > 0) {
    console.log('\nRe-run the script to retry failed generations (existing scripts will be skipped).');
  }

  // 10. Generate barrel export
  writeBarrelExport(Object.keys(moduleScripts).map(Number));

  console.log('\nDone!');
}

function writeBarrelExport(moduleNums: number[]): void {
  // Get ALL module script files that exist
  const allModuleNums: number[] = [];
  if (fs.existsSync(OUTPUT_DIR)) {
    const files = fs.readdirSync(OUTPUT_DIR).filter((f) => f.match(/^module-\d+-scripts\.ts$/));
    for (const file of files) {
      const match = file.match(/module-(\d+)-scripts\.ts/);
      if (match) allModuleNums.push(Number(match[1]));
    }
  }

  if (allModuleNums.length === 0) return;

  allModuleNums.sort((a, b) => a - b);

  const imports = allModuleNums
    .map((n) => {
      const padded = String(n).padStart(2, '0');
      return `import { MODULE_${n}_SCRIPTS } from './module-${padded}-scripts';`;
    })
    .join('\n');

  const spreads = allModuleNums.map((n) => `  ...MODULE_${n}_SCRIPTS`).join(',\n');

  const content = `/**
 * Barrel export for all generated video scripts.
 * Auto-generated — do not edit manually.
 */

${imports}

/** All generated scripts, merged into a single record keyed by video ID. */
export const GENERATED_SCRIPTS: Record<string, string> = {
${spreads},
};

/** Get a generated script by video ID */
export function getGeneratedScript(videoId: string): string | undefined {
  return GENERATED_SCRIPTS[videoId]?.trim();
}

/** Get all video IDs that have generated scripts */
export function getGeneratedScriptIds(): string[] {
  return Object.keys(GENERATED_SCRIPTS);
}
`;

  const indexPath = path.join(OUTPUT_DIR, 'index.ts');
  fs.writeFileSync(indexPath, content, 'utf-8');
  console.log(`  Written: index.ts (barrel export for ${allModuleNums.length} modules)`);
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
