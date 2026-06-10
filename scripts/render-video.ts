/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Render a single Remotion composition to MP4.
 *
 * Usage:
 *   npx tsx scripts/render-video.ts <composition-id> <output-path> [props-json]
 *
 * Example:
 *   npx tsx scripts/render-video.ts LessonIntro public/videos/generated/v1-1-1.mp4 ./scripts/props/v1-1-1.json
 */

import path from 'node:path';
import fs from 'node:fs';
import { bundle } from '@remotion/bundler';
import { selectComposition, renderMedia } from '@remotion/renderer';

async function main() {
  const [, , compositionId, outputPath, propsJsonPath] = process.argv;
  if (!compositionId || !outputPath) {
    console.error('Usage: render-video.ts <composition-id> <output-path> [props.json]');
    process.exit(1);
  }

  const inputProps = propsJsonPath
    ? JSON.parse(fs.readFileSync(path.resolve(propsJsonPath), 'utf-8'))
    : {};

  console.log('Bundling Remotion project…');
  const bundled = await bundle({
    entryPoint: path.resolve('src/remotion/index.ts'),
    onProgress: (p) => process.stdout.write(`\r  bundle ${Math.round(p)}%`),
    webpackOverride: (config) => config,
  });
  process.stdout.write('\n');

  console.log('Resolving composition…');
  const composition = await selectComposition({
    serveUrl: bundled,
    id: compositionId,
    inputProps,
  });

  const abs = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  console.log(`Rendering ${compositionId} → ${abs}`);
  console.log(`  ${composition.width}x${composition.height} @ ${composition.fps}fps · ${composition.durationInFrames} frames`);

  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: 'h264',
    outputLocation: abs,
    inputProps,
    onProgress: ({ progress }) => process.stdout.write(`\r  render ${Math.round(progress * 100)}%`),
  });
  process.stdout.write('\n');

  console.log(`Done: ${abs}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
