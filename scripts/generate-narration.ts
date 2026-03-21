/**
 * Narration Audio Generation Script
 *
 * Generates full video narration audio using edge-tts.
 *
 * How it works:
 * 1. Reads all video scripts from src/lib/content/video-scripts.ts
 * 2. For each script, generates narration audio using edge-tts
 *    - Voice: en-IN-PrabhatNeural (Indian English, natural for Manglish)
 * 3. Saves to: scripts/output/narration/{videoId}.mp3
 * 4. Shows progress
 *
 * Future enhancement: Switch to de-DE-ConradNeural for German phrases.
 *
 * Run with: npx tsx scripts/generate-narration.ts
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = path.join(__dirname, 'output', 'narration');
const VOICE = 'en-IN-PrabhatNeural';

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Dynamically import video scripts
  let videoScripts: Array<{ id: string; title: string; script?: string }>;
  try {
    const mod = await import('../src/lib/content/video-scripts');
    videoScripts = Object.entries(mod.VIDEO_SCRIPTS || {}).map(([id, script]) => ({ id, title: id, script: script as string }));
  } catch {
    console.error('Could not load video scripts from src/lib/content/video-scripts.ts');
    console.error('Make sure the file exists and exports a videoScripts array.');
    process.exit(1);
  }

  const scriptsWithContent = videoScripts.filter((v) => v.script && v.script.trim().length > 0);

  if (scriptsWithContent.length === 0) {
    console.log('No video scripts with content found. Nothing to generate.');
    return;
  }

  console.log(`Found ${scriptsWithContent.length} video script(s) with narration content.\n`);

  for (let i = 0; i < scriptsWithContent.length; i++) {
    const video = scriptsWithContent[i];
    const outputFile = path.join(OUTPUT_DIR, `${video.id}.mp3`);
    const tempTextFile = path.join(OUTPUT_DIR, `${video.id}_temp.txt`);

    console.log(`[${i + 1}/${scriptsWithContent.length}] Generating narration for: ${video.title}`);

    // Write script text to a temp file (avoids shell escaping issues)
    fs.writeFileSync(tempTextFile, video.script!, 'utf-8');

    try {
      // Use edge-tts CLI to generate audio
      execSync(
        `edge-tts --voice "${VOICE}" --file "${tempTextFile}" --write-media "${outputFile}"`,
        { stdio: 'inherit' }
      );
      console.log(`  -> Saved: ${outputFile}\n`);
    } catch (err) {
      console.error(`  -> FAILED for ${video.id}:`, err);
    } finally {
      // Clean up temp file
      if (fs.existsSync(tempTextFile)) {
        fs.unlinkSync(tempTextFile);
      }
    }
  }

  console.log('Done! Narration audio files are in:', OUTPUT_DIR);
}

main().catch(console.error);
