// Flood-fill background removal: makes the outer white region transparent while
// preserving the interior white shirt. Run on all in-app Kuttan poses.
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const THRESH = 238;       // bg ~242, shirt ~215 -> clean cut between them
const FEATHER = 1;        // edge softening passes

async function removeBg(srcPath, outPath) {
  const img = sharp(srcPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const isWhite = (i) => data[i] >= THRESH && data[i + 1] >= THRESH && data[i + 2] >= THRESH;
  const visited = new Uint8Array(W * H);
  const stack = [];
  // seed from all border pixels
  for (let x = 0; x < W; x++) { stack.push(x); stack.push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { stack.push(y * W); stack.push(y * W + (W - 1)); }
  while (stack.length) {
    const p = stack.pop();
    if (visited[p]) continue;
    visited[p] = 1;
    const i = p * C;
    if (!isWhite(i)) continue;            // stop at the figure silhouette
    data[i + 3] = 0;                       // make transparent
    const x = p % W, y = (p / W) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < W - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - W);
    if (y < H - 1) stack.push(p + W);
  }
  // Bottom ground-shadow cleanup: the soft grey shadow forms islands the
  // flood-fill can't reach. In the bottom 12% (only dark feet/sandals there)
  // zero out any light pixel.
  for (let y = Math.floor(H * 0.88); y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * C;
      if (data[i] >= 200 && data[i + 1] >= 200 && data[i + 2] >= 200) data[i + 3] = 0;
    }
  }
  await sharp(data, { raw: { width: W, height: H, channels: C } })
    .png().toFile(outPath);
}

const moods = ['happy','thinking','excited','sad','celebrating','pointing','waving','confused','reading','thumbsup','official'];
const dir = 'public/images/characters';
const only = process.argv[2];
for (const m of (only ? [only] : moods)) {
  const src = path.join(dir, `kuttan-${m}.png`);
  if (!fs.existsSync(src)) continue;
  await removeBg(src, path.join(dir, `kuttan-${m}.png`));
  console.log('transparent:', m);
}
