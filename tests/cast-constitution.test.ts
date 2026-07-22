import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type AssetEntry = {
  role: string;
  sha256: string;
  width: number;
  height: number;
  mode: 'RGB' | 'RGBA';
};

type MeeraManifest = {
  version: string;
  chunk: string;
  identityAuthority: string;
  productionPoseSource: string;
  productionMethod: string;
  generationPolicy: string;
  surfacesReviewed: { cream: string; forest: string };
  alphaMetrics: {
    cornerAlpha: number[];
    lightNeutralEdgeCandidates: number;
    reviewEdgePixels: number;
    lightNeutralEdgeRatio: number;
  };
  files: Record<string, AssetEntry>;
};

const root = process.cwd();
const assetRoot = 'docs/reference/assets/meera';
const read = (path: string) => readFileSync(resolve(root, path));
const text = (path: string) => read(path).toString('utf8');
const sha256 = (contents: Buffer) => createHash('sha256').update(contents).digest('hex').toUpperCase();

function pngInfo(contents: Buffer) {
  assert.equal(contents.subarray(1, 4).toString('ascii'), 'PNG', 'asset must have a PNG signature');
  return {
    width: contents.readUInt32BE(16),
    height: contents.readUInt32BE(20),
    colourType: contents[25],
  };
}

const manifest = JSON.parse(text(`${assetRoot}/manifest.json`)) as MeeraManifest;
assert.equal(manifest.version, 'meera-v1');
assert.equal(manifest.chunk, '3p-05');
assert.equal(manifest.identityAuthority, 'meera-canonical-base-v1.png');
assert.equal(manifest.productionPoseSource, 'meera-consistency-pose-v1.png');
assert.match(manifest.productionMethod, /local rembg ISNet matte/i);
assert.match(manifest.generationPolicy, /never recreate Meera from text alone/i);
assert.deepEqual(manifest.surfacesReviewed, { cream: '#F5F0E8', forest: '#102018' });
assert.deepEqual(manifest.alphaMetrics.cornerAlpha, [0, 0, 0, 0]);
assert.ok(manifest.alphaMetrics.reviewEdgePixels > 10_000, 'edge review sample is unexpectedly small');
assert.ok(manifest.alphaMetrics.lightNeutralEdgeRatio < 0.01, 'cream-like outer-edge candidate ratio must stay below 1%');

assert.deepEqual(Object.keys(manifest.files).sort(), [
  'meera-canonical-base-v1.png',
  'meera-consistency-pose-v1.png',
  'meera-edge-review-v1.png',
  'meera-model-sheet-v1.png',
  'meera-production-cutout-v1.png',
]);

for (const [name, entry] of Object.entries(manifest.files)) {
  const path = `${assetRoot}/${name}`;
  assert.ok(existsSync(resolve(root, path)), `${path} must exist`);
  const contents = read(path);
  assert.equal(sha256(contents), entry.sha256, `${name} checksum drifted`);
  const info = pngInfo(contents);
  assert.deepEqual(
    { width: info.width, height: info.height },
    { width: entry.width, height: entry.height },
    `${name} dimensions drifted`,
  );
  assert.equal(info.colourType, entry.mode === 'RGBA' ? 6 : 2, `${name} PNG colour mode drifted`);
}

assert.equal(
  manifest.files['meera-canonical-base-v1.png'].sha256,
  'FBBC2E2F9EB3397BCA9F027516F863B50B2C682353D6E1DBD2009012D5D9E576',
  'owner-approved canonical identity must remain byte-exact',
);
assert.equal(
  manifest.files['meera-consistency-pose-v1.png'].sha256,
  'C52932E7B78710681E39295D14017907E6C59A1FDE9D87D329647D5C64143A76',
  'owner-approved consistency pose must remain byte-exact',
);
assert.equal(manifest.files['meera-production-cutout-v1.png'].mode, 'RGBA');
assert.equal(manifest.files['meera-production-cutout-v1.png'].width, 548);
assert.equal(manifest.files['meera-production-cutout-v1.png'].height, 1611);
assert.equal(manifest.files['meera-model-sheet-v1.png'].width, 1400);
assert.equal(manifest.files['meera-edge-review-v1.png'].width, 1400);

const storyBible = text('docs/reference/A1_STORY_BIBLE.md');
const decisions = text('docs/DECISIONS.md');
const roadmap = text('docs/ROADMAP.md');

for (const phrase of [
  '### Equal-peer scene law',
  'never give one peer more than two consecutive owned lessons',
  'Relabel as Nivin compatibility visual',
  'Relabel as Frau Fischer compatibility visual',
  'Existing `Appu.tsx` is the accepted v1 visual implementation',
  'never baked into pre-rendered audio or video',
]) {
  assert.ok(storyBible.includes(phrase), `story bible must retain cast guardrail: ${phrase}`);
}

assert.match(decisions, /## 27 · 2026-07-22 · Fixed-cast constitution/);
assert.match(decisions, /merge of this decision is the owner approval gate/i);
assert.match(roadmap, /3p-05 · Cast constitution \+ Meera asset[\s\S]*owner review pending/);
assert.doesNotMatch(storyBible, /Meera.+(?:romance device|assistant).+allowed/i);

console.log('cast constitution: equal-peer law, legacy disposition, Meera lineage, hashes, alpha, and review surfaces verified');
