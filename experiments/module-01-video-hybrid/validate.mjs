import {createHash} from 'node:crypto';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(here, 'lesson-01.scene.json');
const errors = [];
const fail = (message) => errors.push(message);
const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;
const isInside = (root, candidate) => {
  const relativePath = path.relative(root, candidate);
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
};
const attributeValue = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`));
  return match?.[1];
};

let manifest;
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch (error) {
  console.error(`FAIL cannot read ${manifestPath}: ${error.message}`);
  process.exit(1);
}

if (manifest.schemaVersion !== 2) fail(`schemaVersion must be 2, got ${manifest.schemaVersion}`);
if (manifest.rendererTheme !== '2a-scenes-daylight-v0.1-trial') fail('rendererTheme must be 2a-scenes-daylight-v0.1-trial');
if (manifest.fps !== 30) fail(`fps must be 30, got ${manifest.fps}`);
if (manifest.durationSeconds !== 81) fail(`durationSeconds must be 81, got ${manifest.durationSeconds}`);
if (manifest.durationFrames !== 2430) fail(`durationFrames must be 2430, got ${manifest.durationFrames}`);
if (manifest.durationSeconds * manifest.fps !== manifest.durationFrames) fail('durationSeconds * fps must equal durationFrames');

const castRoles = new Set(Object.values(manifest.castRoles ?? {}));
for (const required of ['owner-presenter', 'german-teacher', 'adult-learner']) {
  if (!castRoles.has(required)) fail(`castRoles is missing semantic role ${required}`);
}

const inserts = Array.isArray(manifest.inserts) ? manifest.inserts : [];
if (inserts.length !== 2) fail(`expected exactly 2 HyperFrames inserts, got ${inserts.length}`);
const insertIds = new Set();
const insertEngineVersions = new Set();
const expectedBackgroundContracts = new Map([
  ['phrase-build', 'opaque-2a-daylight-to-forest'],
  ['mistake-repair', 'opaque-2a-forest-to-answer-sheet'],
]);
const experimentsRoot = path.resolve(here, '..');
let verifiedInsertSources = 0;
for (const [index, insert] of inserts.entries()) {
  const label = `insert[${index}]`;
  if (insert.engine !== 'hyperframes') fail(`${label} engine must be hyperframes`);
  if (!/^\d+\.\d+\.\d+$/.test(insert.engineVersion ?? '')) fail(`${label} engineVersion must be an exact semver pin`);
  else insertEngineVersions.add(insert.engineVersion);
  if (!isPositiveInteger(insert.version)) fail(`${label} version must be a positive integer`);
  if (typeof insert.id !== 'string' || insert.id.length === 0) fail(`${label} needs an id`);
  else if (insertIds.has(insert.id)) fail(`${label} duplicates id ${insert.id}`);
  else insertIds.add(insert.id);
  if (!isPositiveInteger(insert.durationFrames)) fail(`${label} durationFrames must be a positive integer`);
  if (insert.durationSeconds * manifest.fps !== insert.durationFrames) fail(`${label} duration values disagree`);
  if (insert.audioContract !== 'silent') fail(`${label} must be silent; Remotion owns final audio`);
  if (insert.backgroundContract !== expectedBackgroundContracts.get(insert.id)) fail(`${label} backgroundContract does not match its 2A scene grammar`);
  if (insert.alphaContract !== 'opaque') fail(`${label} alphaContract must be opaque`);
  if (insert.safeArea?.mode !== 'full-bleed' || insert.safeArea?.consumerOverlay !== 'none') fail(`${label} must declare full-bleed safe area with no consumer overlay`);
  const protectedInset = insert.safeArea?.protectedInsetPx;
  if (!protectedInset || !['top', 'right', 'bottom', 'left'].every((side) => Number.isInteger(protectedInset[side]) && protectedInset[side] >= 0)) fail(`${label} must declare non-negative integer protected insets`);
  if (!String(insert.sourcePath ?? '').startsWith('../v1-02-hyperframes/')) fail(`${label} sourcePath must stay in the isolated HyperFrames proof`);

  const sourceDir = path.resolve(here, String(insert.sourcePath ?? ''));
  const artifactPath = path.resolve(here, String(insert.artifactPath ?? ''));
  if (!isInside(experimentsRoot, sourceDir)) {
    fail(`${label} sourcePath escapes the experiments root`);
    continue;
  }
  if (!isInside(sourceDir, artifactPath)) {
    fail(`${label} artifactPath must stay inside its HyperFrames source directory`);
    continue;
  }

  try {
    const [html, motionText, packageText] = await Promise.all([
      readFile(path.join(sourceDir, 'index.html'), 'utf8'),
      readFile(path.join(sourceDir, 'index.motion.json'), 'utf8'),
      readFile(path.join(sourceDir, 'package.json'), 'utf8'),
    ]);
    const motion = JSON.parse(motionText);
    const packageJson = JSON.parse(packageText);
    const compositionTags = html.match(/<[^>]+data-composition-id=["'][^"']+["'][^>]*>/g) ?? [];
    const rootTag = compositionTags.find((tag) => attributeValue(tag, 'data-composition-id') === insert.sourceSceneId);
    if (!rootTag) fail(`${label} index.html must declare composition ${insert.sourceSceneId}`);
    else {
      if (Number(attributeValue(rootTag, 'data-width')) !== manifest.resolution.width) fail(`${label} source width must be ${manifest.resolution.width}`);
      if (Number(attributeValue(rootTag, 'data-height')) !== manifest.resolution.height) fail(`${label} source height must be ${manifest.resolution.height}`);
      if (Number(attributeValue(rootTag, 'data-duration')) !== insert.durationSeconds) fail(`${label} source duration must be ${insert.durationSeconds}s`);
    }
    if (motion.duration !== insert.durationSeconds) fail(`${label} motion duration must be ${insert.durationSeconds}s`);
    if (/\b(?:src|href)=["']https?:\/\//i.test(html) || /url\(["']?https?:\/\//i.test(html)) {
      fail(`${label} source must not fetch runtime assets from the network`);
    }

    const artifactRelative = path.relative(sourceDir, artifactPath).replaceAll('\\', '/');
    if (!artifactRelative.endsWith(`-v${insert.version}.mp4`)) fail(`${label} artifact filename must include version v${insert.version}`);
    const renderCommand = packageJson.scripts?.render;
    if (typeof renderCommand !== 'string') fail(`${label} package.json needs a render script`);
    else {
      if (!renderCommand.includes(`hyperframes@${insert.engineVersion}`)) fail(`${label} render must pin HyperFrames ${insert.engineVersion}`);
      if (!renderCommand.includes('--quality high')) fail(`${label} render must use high quality`);
      if (!renderCommand.includes(`--fps ${manifest.fps}`)) fail(`${label} render fps must be ${manifest.fps}`);
      if (!renderCommand.includes('--no-best-effort')) fail(`${label} render must reject capture-readiness warnings`);
      if (!renderCommand.includes('--strict-all')) fail(`${label} render must fail on lint warnings`);
      if (!renderCommand.includes(`--output ${artifactRelative}`)) fail(`${label} render output must be ${artifactRelative}`);
    }

    const frozenRuntimeAssets = [
      'assets/vendor/gsap-3.14.2.min.js',
      'assets/fonts/source-serif-4-latin-variable.woff2',
      'assets/fonts/geist-sans-variable.woff2',
      'assets/fonts/geist-mono-variable.woff2',
    ];
    for (const relativeAsset of frozenRuntimeAssets) {
      const info = await stat(path.join(sourceDir, relativeAsset));
      if (!info.isFile() || info.size === 0) fail(`${label} frozen runtime asset is invalid: ${relativeAsset}`);
    }
    verifiedInsertSources += 1;
  } catch (error) {
    fail(`${label} source contract cannot be verified (${error.message})`);
  }
}
if (insertEngineVersions.size !== 1) fail('all HyperFrames inserts must use one exact CLI version');

const scenes = Array.isArray(manifest.scenes) ? manifest.scenes : [];
if (scenes.length !== 8) fail(`expected 8 proof scenes, got ${scenes.length}`);
const sceneIds = new Set();
let expectedStartFrame = 0;
let expectedStartSeconds = 0;
for (const [index, scene] of scenes.entries()) {
  const label = `scene[${index}]`;
  if (typeof scene.id !== 'string' || scene.id.length === 0) fail(`${label} needs a non-empty id`);
  else if (sceneIds.has(scene.id)) fail(`${label} duplicates id ${scene.id}`);
  else sceneIds.add(scene.id);
  if (scene.startFrame !== expectedStartFrame) fail(`${label} startFrame ${scene.startFrame} must be ${expectedStartFrame}`);
  if (scene.startSeconds !== expectedStartSeconds) fail(`${label} startSeconds ${scene.startSeconds} must be ${expectedStartSeconds}`);
  if (!isPositiveInteger(scene.durationFrames)) fail(`${label} durationFrames must be a positive integer`);
  if (typeof scene.durationSeconds !== 'number' || scene.durationSeconds <= 0) fail(`${label} durationSeconds must be positive`);
  if (scene.startSeconds * manifest.fps !== scene.startFrame) fail(`${label} seconds/frame start values disagree`);
  if (scene.durationSeconds * manifest.fps !== scene.durationFrames) fail(`${label} seconds/frame duration values disagree`);
  if (!castRoles.has(scene.castRole)) fail(`${label} uses unknown castRole ${scene.castRole}`);
  if (typeof scene.teachingIntent !== 'string' || scene.teachingIntent.trim().length < 12) fail(`${label} needs a concrete teachingIntent`);
  if (typeof scene.caption !== 'string' || scene.caption.trim().length === 0) fail(`${label} needs a caption`);
  if (scene.type === 'teaching-insert' && !insertIds.has(scene.insertId)) fail(`${label} references unknown insert ${scene.insertId}`);
  expectedStartFrame += Number.isFinite(scene.durationFrames) ? scene.durationFrames : 0;
  expectedStartSeconds += Number.isFinite(scene.durationSeconds) ? scene.durationSeconds : 0;
}
if (expectedStartFrame !== manifest.durationFrames) fail(`scenes end at frame ${expectedStartFrame}, expected ${manifest.durationFrames}`);
if (expectedStartSeconds !== manifest.durationSeconds) fail(`scenes end at ${expectedStartSeconds}s, expected ${manifest.durationSeconds}s`);

const assets = Array.isArray(manifest.assets) ? manifest.assets : [];
const assetIds = new Set();
const publicRoot = path.resolve(here, '../../public');
let transcriptCount = 0;
for (const [index, asset] of assets.entries()) {
  const label = `asset[${index}]`;
  if (typeof asset.id !== 'string' || asset.id.length === 0) fail(`${label} needs a non-empty id`);
  else if (assetIds.has(asset.id)) fail(`${label} duplicates id ${asset.id}`);
  else assetIds.add(asset.id);
  const publicPath = asset.publicPath;
  const canonical = typeof publicPath === 'string' && publicPath.startsWith('/') && !publicPath.includes('\\') && !publicPath.split('/').includes('..') && !publicPath.split('/').includes('.');
  if (!canonical) {
    fail(`${label} publicPath must be a canonical /public URL path`);
    continue;
  }
  const diskPath = path.resolve(publicRoot, publicPath.slice(1));
  if (!(diskPath === publicRoot || diskPath.startsWith(`${publicRoot}${path.sep}`))) {
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
  if (!/^[a-f0-9]{64}$/.test(asset.sha256 ?? '')) fail(`${label} sha256 must be 64 lowercase hex characters`);
  else if (createHash('sha256').update(bytes).digest('hex') !== asset.sha256) fail(`${label} sha256 mismatch for ${publicPath}`);
  if (asset.kind === 'audio') {
    const transcript = asset.transcript;
    if (!transcript || typeof transcript.language !== 'string' || typeof transcript.text !== 'string' || transcript.text.trim().length === 0) fail(`${label} audio requires transcript.language and transcript.text`);
    else transcriptCount += 1;
  }
}

for (const [index, scene] of scenes.entries()) {
  if (!Array.isArray(scene.assetIds)) fail(`scene[${index}] assetIds must be an array`);
  else for (const assetId of scene.assetIds) if (!assetIds.has(assetId)) fail(`scene[${index}] references unknown asset ${assetId}`);
}
const placements = Array.isArray(manifest.audioPlacements) ? manifest.audioPlacements : [];
for (const [index, placement] of placements.entries()) {
  if (!assetIds.has(placement.assetId)) fail(`audioPlacements[${index}] references unknown asset ${placement.assetId}`);
  if (placement.startSeconds * manifest.fps !== placement.startFrame) fail(`audioPlacements[${index}] seconds/frame values disagree`);
  if (placement.startFrame < 0 || placement.startFrame >= manifest.durationFrames) fail(`audioPlacements[${index}] falls outside the timeline`);
}

if (errors.length > 0) {
  console.error(`FAIL ${errors.length} validation error${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`PASS ${path.basename(manifestPath)}`);
console.log(`- timeline: ${scenes.length} contiguous semantic scenes, ${manifest.durationSeconds}s / ${manifest.durationFrames} frames @ ${manifest.fps}fps`);
console.log(`- inserts: exactly ${inserts.length} bounded silent HyperFrames teaching intents on ${[...insertEngineVersions][0]}`);
console.log(`- insert sources: ${verifiedInsertSources}/${inserts.length} match duration, canvas, local-runtime, CLI-pin, and artifact contracts`);
console.log(`- assets: ${assets.length} canonical files exist and match SHA-256; transcripts ${transcriptCount}/${assets.filter((asset) => asset.kind === 'audio').length}`);
console.log(`- cast: renderer-independent roles only (${[...castRoles].join(', ')})`);
