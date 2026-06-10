/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Generate TTS MP3s for a list of narration lines using msedge-tts.
 *
 * Usage:  npx tsx scripts/gen-tts.ts <input.json> <outputDir>
 */

import fs from 'node:fs';
import path from 'node:path';

type Line = { id: string; text: string; voice?: string };

async function main() {
  const [, , inputPath, outputDir] = process.argv;
  if (!inputPath || !outputDir) {
    console.error('Usage: gen-tts.ts <input.json> <outputDir>');
    process.exit(1);
  }

  // Load msedge-tts via CJS to avoid ESM-wrapper quirks with setMetadata.
  const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');

  const lines: Line[] = JSON.parse(fs.readFileSync(path.resolve(inputPath), 'utf-8'));
  const outDir = path.resolve(outputDir);
  fs.mkdirSync(outDir, { recursive: true });

  for (const line of lines) {
    const voice = line.voice ?? 'en-IN-NeerjaNeural';
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    // toFile writes audio.mp3 into the given dir. Use a temp subdir per line, then rename.
    const tmpDir = path.join(outDir, `.tmp-${line.id}`);
    fs.mkdirSync(tmpDir, { recursive: true });
    console.log(`  [${voice}] ${line.id} — "${line.text.slice(0, 60)}${line.text.length > 60 ? '…' : ''}"`);

    await tts.toFile(tmpDir, line.text);

    const generated = path.join(tmpDir, 'audio.mp3');
    const finalPath = path.join(outDir, `${line.id}.mp3`);
    fs.copyFileSync(generated, finalPath);
    fs.rmSync(tmpDir, { recursive: true, force: true });
    tts.close();
  }

  console.log(`\nGenerated ${lines.length} audio files in ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
