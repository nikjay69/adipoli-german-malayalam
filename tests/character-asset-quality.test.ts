import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import sharp from 'sharp';

type CharacterAssetManifest = {
  version: string;
  method: string;
  reviewSurfaces: { cream: string; forest: string };
  coverage: {
    nivinMoods: number;
    frauFischerMoods: number;
    meeraMoods: number;
    runtimeAssetSlots: number;
    highFrequencyIntentSet: string[];
    highFrequencyIntentsCovered: number;
  };
  knownGaps: string[];
  files: Record<string, {
    source: string;
    sha256: string;
    width: number;
    height: number;
    mode: string;
  }>;
};

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path));
const text = (path: string) => read(path).toString('utf8');
const sha256 = (contents: Buffer) => createHash('sha256').update(contents).digest('hex').toUpperCase();
const assetRoot = 'public/images/characters';

const manifest = JSON.parse(text(`${assetRoot}/character-asset-pack-v2.json`)) as CharacterAssetManifest;
assert.equal(manifest.version, 'character-pack-v2');
assert.match(manifest.method, /no face, pose, wardrobe, or identity regeneration/i);
assert.deepEqual(manifest.reviewSurfaces, { cream: '#F5F0E8', forest: '#102018' });
assert.deepEqual(
  {
    nivin: manifest.coverage.nivinMoods,
    frauFischer: manifest.coverage.frauFischerMoods,
    meera: manifest.coverage.meeraMoods,
    total: manifest.coverage.runtimeAssetSlots,
  },
  { nivin: 11, frauFischer: 4, meera: 2, total: 17 },
);
assert.ok(
  manifest.coverage.highFrequencyIntentsCovered / manifest.coverage.highFrequencyIntentSet.length >= 0.8,
  'the production pack must cover at least 80% of high-frequency character intents',
);
assert.ok(manifest.knownGaps.length > 0, 'the asset manifest must state remaining weaknesses honestly');

const componentText = [
  text('src/components/character/NivinImage.tsx'),
  text('src/components/character/FrauFischer.tsx'),
  text('src/components/character/Meera.tsx'),
].join('\n');
const runtimePaths = [...componentText.matchAll(/\/images\/characters\/([a-z-]+-v2\.png)/g)].map((match) => match[1]);
assert.equal(runtimePaths.length, 17, 'all 17 production slots must be mapped by the cast components');
assert.deepEqual(new Set(runtimePaths), new Set(Object.keys(manifest.files)), 'component mappings and manifest must agree');
assert.doesNotMatch(componentText, /kuttan-|frau-weber-|meera-presenting\.png/, 'shipping components must not fall back to legacy-edged assets');

async function verifyAssets() {
for (const [name, entry] of Object.entries(manifest.files)) {
  const relativePath = `${assetRoot}/${name}`;
  const absolutePath = resolve(root, relativePath);
  assert.ok(existsSync(absolutePath), `${relativePath} must exist`);
  assert.ok(existsSync(resolve(root, entry.source)), `${name} source lineage must exist`);

  const contents = read(relativePath);
  assert.equal(sha256(contents), entry.sha256, `${name} checksum drifted`);
  const { data, info } = await sharp(contents).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.deepEqual({ width: info.width, height: info.height }, { width: entry.width, height: entry.height }, `${name} dimensions drifted`);
  assert.equal(info.channels, 4, `${name} must decode to RGBA`);

  const alphaAt = (x: number, y: number) => data[(y * info.width + x) * info.channels + 3];
  assert.deepEqual(
    [alphaAt(0, 0), alphaAt(info.width - 1, 0), alphaAt(0, info.height - 1), alphaAt(info.width - 1, info.height - 1)],
    [0, 0, 0, 0],
    `${name} corners must be transparent`,
  );

  let visible = 0;
  let partial = 0;
  let nearTransparentHaze = 0;
  for (let index = 3; index < data.length; index += info.channels) {
    const alpha = data[index];
    if (alpha > 0) visible += 1;
    if (alpha > 0 && alpha < 255) partial += 1;
    if (alpha > 0 && alpha < 8) nearTransparentHaze += 1;
  }
  assert.ok(visible > 100_000, `${name} subject coverage is unexpectedly small`);
  assert.ok(partial > 1_000, `${name} needs a real antialiased edge`);
  assert.equal(nearTransparentHaze, 0, `${name} must not carry a barely visible halo ring`);
}

console.log('character assets: 17 canonical cutouts, clean alpha edges, source lineage, and 80%+ intent coverage verified');
}

verifyAssets().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
