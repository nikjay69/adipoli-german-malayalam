import {createHash} from 'node:crypto';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(here, 'lesson-01.scene.json');
const errors = [];

const fail = (message) => errors.push(message);
const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;

let manifest;
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch (error) {
  console.error(`FAIL cannot read ${manifestPath}: ${error.message}`);
  process.exit(1);
}

if (manifest.fps !== 30) fail(`fps must be 30, got ${manifest.fps}`);
if (manifest.durationSeconds !== 81) {
  fail(`durationSeconds must be 81, got ${manifest.durationSeconds}`);
}
if (manifest.durationFrames !== 2430) {
  fail(`durationFrames must be 2430, got ${manifest.durationFrames}`);
}
if (manifest.durationSeconds * manifest.fps !== manifest.durationFrames) {
  fail('durationSeconds * fps must equal durationFrames');
}

const scenes = Array.isArray(manifest.scenes) ? manifest.scenes : [];
if (scenes.length !== 9) fail(`expected 9 scenes, got ${scenes.length}`);

const sceneIds = new Set();
let expectedStartFrame = 0;
let expectedStartSeconds = 0;

for (const [index, scene] of scenes.entries()) {
  const label = `scene[${index}]`;
  if (typeof scene.id !== 'string' || scene.id.length === 0) {
    fail(`${label} needs a non-empty id`);
  } else if (sceneIds.has(scene.id)) {
    fail(`${label} duplicates id ${scene.id}`);
  } else {
    sceneIds.add(scene.id);
  }

  if (scene.startFrame !== expectedStartFrame) {
    fail(`${label} startFrame ${scene.startFrame} must be ${expectedStartFrame}`);
  }
  if (scene.startSeconds !== expectedStartSeconds) {
    fail(`${label} startSeconds ${scene.startSeconds} must be ${expectedStartSeconds}`);
  }
  if (!isPositiveInteger(scene.durationFrames)) {
    fail(`${label} durationFrames must be a positive integer`);
  }
  if (typeof scene.durationSeconds !== 'number' || scene.durationSeconds <= 0) {
    fail(`${label} durationSeconds must be positive`);
  }
  if (scene.startSeconds * manifest.fps !== scene.startFrame) {
    fail(`${label} seconds/frame start values disagree`);
  }
  if (scene.durationSeconds * manifest.fps !== scene.durationFrames) {
    fail(`${label} seconds/frame duration values disagree`);
  }

  expectedStartFrame += Number.isFinite(scene.durationFrames) ? scene.durationFrames : 0;
  expectedStartSeconds += Number.isFinite(scene.durationSeconds) ? scene.durationSeconds : 0;
}

if (expectedStartFrame !== manifest.durationFrames) {
  fail(`scenes end at frame ${expectedStartFrame}, expected ${manifest.durationFrames}`);
}
if (expectedStartSeconds !== manifest.durationSeconds) {
  fail(`scenes end at ${expectedStartSeconds}s, expected ${manifest.durationSeconds}s`);
}

const assets = Array.isArray(manifest.assets) ? manifest.assets : [];
const assetIds = new Set();
const publicRoot = path.resolve(here, '../../public');
let transcriptCount = 0;

for (const [index, asset] of assets.entries()) {
  const label = `asset[${index}]`;
  if (typeof asset.id !== 'string' || asset.id.length === 0) {
    fail(`${label} needs a non-empty id`);
  } else if (assetIds.has(asset.id)) {
    fail(`${label} duplicates id ${asset.id}`);
  } else {
    assetIds.add(asset.id);
  }

  const publicPath = asset.publicPath;
  const canonical =
    typeof publicPath === 'string' &&
    publicPath.startsWith('/') &&
    !publicPath.includes('\\') &&
    !publicPath.split('/').includes('..') &&
    !publicPath.split('/').includes('.');
  if (!canonical) {
    fail(`${label} publicPath must be a canonical /public URL path`);
    continue;
  }

  const diskPath = path.resolve(publicRoot, publicPath.slice(1));
  const withinPublic = diskPath === publicRoot || diskPath.startsWith(`${publicRoot}${path.sep}`);
  if (!withinPublic) {
    fail(`${label} resolves outside publicRoot`);
    continue;
  }

  let bytes;
  try {
    const info = await stat(diskPath);
    if (!info.isFile()) fail(`${label} is not a file: ${publicPath}`);
    bytes = await readFile(diskPath);
  } catch (error) {
    fail(`${label} is missing: ${publicPath} (${error.code ?? error.message})`);
    continue;
  }

  if (!/^[a-f0-9]{64}$/.test(asset.sha256 ?? '')) {
    fail(`${label} sha256 must be 64 lowercase hex characters`);
  } else {
    const actual = createHash('sha256').update(bytes).digest('hex');
    if (actual !== asset.sha256) {
      fail(`${label} sha256 mismatch for ${publicPath}: expected ${asset.sha256}, got ${actual}`);
    }
  }

  if (asset.kind === 'audio') {
    const transcript = asset.transcript;
    if (
      !transcript ||
      typeof transcript.language !== 'string' ||
      transcript.language.length === 0 ||
      typeof transcript.text !== 'string' ||
      transcript.text.trim().length === 0
    ) {
      fail(`${label} audio requires transcript.language and transcript.text`);
    } else {
      transcriptCount += 1;
    }
  }
}

for (const [index, scene] of scenes.entries()) {
  if (!Array.isArray(scene.assetIds)) {
    fail(`scene[${index}] assetIds must be an array`);
    continue;
  }
  for (const assetId of scene.assetIds) {
    if (!assetIds.has(assetId)) fail(`scene[${index}] references unknown asset ${assetId}`);
  }
}

if (errors.length > 0) {
  console.error(`FAIL ${errors.length} validation error${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const audioCount = assets.filter((asset) => asset.kind === 'audio').length;
console.log(`PASS ${path.basename(manifestPath)}`);
console.log(`- timeline: ${scenes.length} unique contiguous scenes, ${manifest.durationSeconds}s / ${manifest.durationFrames} frames @ ${manifest.fps}fps`);
console.log(`- assets: ${assets.length} canonical public files exist and match SHA-256`);
console.log(`- transcripts: ${transcriptCount}/${audioCount} audio assets declared`);
