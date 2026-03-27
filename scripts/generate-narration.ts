/**
 * Narration Audio Generation Script
 *
 * Generates full video narration audio using edge-tts.
 *
 * How it works:
 * 1. Reads all video scripts from src/lib/content/video-scripts.ts
 * 2. For each script, generates narration audio using edge-tts
 *    - English/Manglish: en-IN-PrabhatNeural (Indian English, natural for Manglish)
 *    - German phrases: de-DE-ConradNeural (native German pronunciation)
 * 3. Saves to: scripts/output/narration/{videoId}.mp3
 * 4. Shows progress
 *
 * Run with: npx tsx scripts/generate-narration.ts
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const NARRATION_DIR = path.join(__dirname, 'output', 'narration');
const VOICE_EN = 'en-IN-PrabhatNeural';
const VOICE_DE = 'de-DE-ConradNeural';

/** Helper to get duration of an audio file using ffprobe */
function getAudioDuration(audioPath: string): number {
  try {
    const result = execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 "${audioPath}"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    return parseFloat(result.trim()) || 0;
  } catch {
    return 0;
  }
}

/**
 * Split script into segments — German phrases (in quotes after pronunciation guides)
 * vs. everything else (Manglish/English narration).
 *
 * German detection heuristic:
 * - Text in double quotes that contains common German words/patterns
 * - Text after pronunciation guide parentheses like (ent-shool-di-goong)
 * - Lines that are purely German (common A1 patterns)
 */
function splitSegments(script: string): Array<{ text: string; voice: string }> {
  // Match quoted German phrases — those containing German indicators
  const germanPatterns = [
    /\b(ich|du|er|sie|es|wir|ihr|mein|dein|sein|ihr|ist|bin|bist|sind|hat|haben)\b/i,
    /\b(Guten|Morgen|Tag|Abend|Nacht|Danke|Bitte|Entschuldigung|Willkommen)\b/,
    /\b(Herr|Frau|Straße|Prüfung|Sprache|Deutschland|Deutsch)\b/,
    /\bä|ö|ü|ß/,
  ];

  const lines = script.split('\n');
  const segments: Array<{ text: string; voice: string }> = [];
  let currentText = '';
  let currentVoice = VOICE_EN;

  for (const line of lines) {
    // Skip section markers and timestamps
    if (line.match(/^\[.*\]$/) || line.trim() === '') continue;

    // Extract quoted German phrases
    const quoteRegex = /"([^"]+)"/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = quoteRegex.exec(line)) !== null) {
      const quoted = match[1];
      const isGerman = germanPatterns.some((p) => p.test(quoted));

      // Add text before the quote
      const before = line.slice(lastIndex, match.index);
      if (before.trim()) {
        if (currentVoice === VOICE_EN) {
          currentText += ' ' + before.trim();
        } else {
          if (currentText.trim()) segments.push({ text: currentText.trim(), voice: currentVoice });
          currentText = before.trim();
          currentVoice = VOICE_EN;
        }
      }

      // Add the quoted text with appropriate voice
      if (isGerman) {
        if (currentText.trim()) segments.push({ text: currentText.trim(), voice: currentVoice });
        segments.push({ text: quoted, voice: VOICE_DE });
        currentText = '';
        currentVoice = VOICE_EN;
      } else {
        currentText += ' ' + quoted;
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text from the line
    const remaining = line.slice(lastIndex);
    if (remaining.trim()) {
      // Check if the entire remaining line is German
      const isLineGerman = germanPatterns.some((p) => p.test(remaining));
      if (isLineGerman && !remaining.match(/machaa|bro|adipoli|aiyyo|paravaala/i)) {
        if (currentText.trim()) segments.push({ text: currentText.trim(), voice: currentVoice });
        segments.push({ text: remaining.trim(), voice: VOICE_DE });
        currentText = '';
        currentVoice = VOICE_EN;
      } else {
        currentText += ' ' + remaining.trim();
      }
    }
  }

  if (currentText.trim()) {
    segments.push({ text: currentText.trim(), voice: currentVoice });
  }

  // Merge consecutive segments with the same voice
  const merged: Array<{ text: string; voice: string }> = [];
  for (const seg of segments) {
    if (merged.length > 0 && merged[merged.length - 1].voice === seg.voice) {
      merged[merged.length - 1].text += ' ' + seg.text;
    } else {
      merged.push({ ...seg });
    }
  }

  return merged;
}

/**
 * Generate audio for a single text segment using edge-tts.
 */
function generateSegmentAudio(text: string, voice: string, outputPath: string): void {
  const tempTextFile = outputPath.replace(/\.mp3$/, '_temp.txt');
  fs.writeFileSync(tempTextFile, text, 'utf-8');

  try {
    execSync(
      `edge-tts --voice "${voice}" --file "${tempTextFile}" --write-media "${outputPath}"`,
      { stdio: 'pipe' }
    );
  } finally {
    if (fs.existsSync(tempTextFile)) fs.unlinkSync(tempTextFile);
  }
}

/**
 * Concatenate multiple MP3 files using ffmpeg.
 * Falls back to simple copy if ffmpeg is not available.
 */
function concatAudioFiles(files: string[], outputPath: string): void {
  if (files.length === 1) {
    fs.copyFileSync(files[0], outputPath);
    return;
  }

  // Create ffmpeg concat file
  const listPath = outputPath.replace(/\.mp3$/, '_list.txt');
  const listContent = files.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join('\n');
  fs.writeFileSync(listPath, listContent, 'utf-8');

  try {
    execSync(
      `ffmpeg -y -f concat -safe 0 -i "${listPath}" -acodec copy "${outputPath}"`,
      { stdio: 'pipe' }
    );
  } catch {
    // Fallback: just use the first segment if ffmpeg isn't available
    console.warn('    ffmpeg not found — using single-voice fallback');
    fs.copyFileSync(files[0], outputPath);
  } finally {
    if (fs.existsSync(listPath)) fs.unlinkSync(listPath);
    // Clean up segment files
    for (const f of files) {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    }
  }
}

async function main() {
  console.log('=== German-Malayalam Narration Generator ===\n');

  // Parse CLI args
  const args = process.argv.slice(2);
  const videoFilter = args.indexOf('--video') >= 0 ? args[args.indexOf('--video') + 1] : null;

  // Ensure output directory exists
  fs.mkdirSync(NARRATION_DIR, { recursive: true });

  // Dynamically import video scripts
  let videoScripts: Array<{ id: string; title: string; script?: string }>;
  try {
    const mod = await import('../src/lib/content/video-scripts');
    videoScripts = Object.entries(mod.VIDEO_SCRIPTS || {}).map(([id, script]) => ({
      id,
      title: id,
      script: script as string,
    }));
  } catch {
    console.error('Could not load video scripts from src/lib/content/video-scripts.ts');
    console.error('Make sure the file exists and exports VIDEO_SCRIPTS.');
    process.exit(1);
  }

  // Also try to load generated scripts
  try {
    const genMod = await import('../src/lib/content/video-scripts/index');
    if (genMod.GENERATED_SCRIPTS) {
      const genEntries = Object.entries(genMod.GENERATED_SCRIPTS).map(([id, script]) => ({
        id,
        title: id,
        script: script as string,
      }));
      // Add generated scripts that aren't already in hand-written scripts
      const existingIds = new Set(videoScripts.map((v) => v.id));
      for (const entry of genEntries) {
        if (!existingIds.has(entry.id)) {
          videoScripts.push(entry);
        }
      }
    }
  } catch {
    // Generated scripts directory may not exist yet — that's fine
  }

  let scriptsWithContent = videoScripts.filter((v) => v.script && v.script.trim().length > 0);

  if (videoFilter) {
    scriptsWithContent = scriptsWithContent.filter((v) => v.id === videoFilter);
  }

  if (scriptsWithContent.length === 0) {
    console.log('No video scripts with content found. Nothing to generate.');
    return;
  }

  console.log(`Found ${scriptsWithContent.length} video script(s) with narration content.`);
  console.log(`Voices: ${VOICE_EN} (English/Manglish) + ${VOICE_DE} (German phrases)\n`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < scriptsWithContent.length; i++) {
    const video = scriptsWithContent[i];
    const outputFile = path.join(NARRATION_DIR, `${video.id}.mp3`);
    const timingFile = path.join(NARRATION_DIR, `${video.id}_timing.json`);

    // Skip if both audio and timing exist
    if (fs.existsSync(outputFile) && fs.existsSync(timingFile)) {
      console.log(`  [SKIP] (${i + 1}/${scriptsWithContent.length}) ${video.id} — already exists`);
      skipped++;
      continue;
    }

    console.log(`  [${i + 1}/${scriptsWithContent.length}] Generating: ${video.id}`);

    try {
      const script = video.script!;
      // Split script into sections manually to preserve tags
      const sectionRegex = /\[(.*?)\]/g;
      const parts = script.split(/\[([^\]]+)\]/);
      
      const sectionsData: Array<{ tag: string; duration: number }> = [];
      const allSegmentFiles: string[] = [];
      let totalVideoDuration = 0;

      // parts alternates: text-before (usually empty or intro), header, text-after, header, text-after...
      for (let j = 1; j < parts.length; j += 2) {
        const header = parts[j].trim();
        const content = (parts[j + 1] || '').trim();
        if (!content) continue;

        const segments = splitSegments(content);
        let sectionDuration = 0;
        
        for (let k = 0; k < segments.length; k++) {
          const segFile = path.join(NARRATION_DIR, `${video.id}_s${j}_g${k}.mp3`);
          generateSegmentAudio(segments[k].text, segments[k].voice, segFile);
          
          const dur = getAudioDuration(segFile);
          sectionDuration += dur;
          allSegmentFiles.push(segFile);
        }

        sectionsData.push({
          tag: header,
          duration: sectionDuration,
        });
        totalVideoDuration += sectionDuration;
      }

      // Handle cases where no [SECTION] tags were found
      if (sectionsData.length === 0 && script.trim()) {
        const segments = splitSegments(script);
        let sectionDuration = 0;
        for (let k = 0; k < segments.length; k++) {
          const segFile = path.join(NARRATION_DIR, `${video.id}_g${k}.mp3`);
          generateSegmentAudio(segments[k].text, segments[k].voice, segFile);
          const dur = getAudioDuration(segFile);
          sectionDuration += dur;
          allSegmentFiles.push(segFile);
        }
        sectionsData.push({ tag: 'FULL', duration: sectionDuration });
        totalVideoDuration = sectionDuration;
      }

      // Concat all segments into one video narration
      concatAudioFiles(allSegmentFiles, outputFile);

      // Save timing metadata
      fs.writeFileSync(timingFile, JSON.stringify({
        videoId: video.id,
        totalDuration: totalVideoDuration,
        sections: sectionsData
      }, null, 2));

      console.log(`    -> Done (${sectionsData.length} sections, ${totalVideoDuration.toFixed(1)}s total)`);
      generated++;
    } catch (err) {
      console.error(`    -> FAILED: ${(err as Error).message}`);
      failed++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`  Generated: ${generated}`);
  console.log(`  Skipped:   ${skipped}`);
  console.log(`  Failed:    ${failed}`);
  console.log(`  Output:    ${NARRATION_DIR}`);
}

main().catch(console.error);
