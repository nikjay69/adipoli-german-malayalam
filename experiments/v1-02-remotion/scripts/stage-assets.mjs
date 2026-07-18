import {createHash} from 'node:crypto';
import {copyFile, mkdir, readFile, stat, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {dirname, extname, isAbsolute, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(projectRoot, '../..');
const manifestPath = resolve(projectRoot, '../module-01-video-hybrid/lesson-01.scene.json');
const manifestRoot = dirname(manifestPath);
const appPublicRoot = resolve(projectRoot, '../../public');
const stagedPublicRoot = resolve(projectRoot, 'public');
const handoffPath = resolve(manifestRoot, 'v1-02.insert-handoff.json');
const fontLockPath = resolve(projectRoot, 'font-assets.json');

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const sha256 = async (path) =>
  createHash('sha256').update(await readFile(path)).digest('hex');

const assertInside = (root, candidate, label) => {
  const pathFromRoot = relative(root, candidate);
  if (pathFromRoot.startsWith('..') || isAbsolute(pathFromRoot)) {
    throw new Error(`${label} escapes its allowed root: ${candidate}`);
  }
};

const requireFile = (path, label) => {
  if (!existsSync(path)) {
    throw new Error(`${label} is missing: ${path}`);
  }
};

const normalizedHash = (value) =>
  typeof value === 'string' && /^[a-f0-9]{64}$/i.test(value)
    ? value.toLowerCase()
    : null;

const slash = (value) => value.replaceAll('\\', '/');
const requireExact = (actual, expected, label) => {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}.`);
  }
};
const requireDeepEqual = (actual, expected, label) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${label} does not match the scene contract.`);
  }
};

const copyAndVerify = async ({source, destination, expectedHash, label}) => {
  requireFile(source, label);
  const sourceHash = await sha256(source);
  if (expectedHash && sourceHash !== expectedHash) {
    throw new Error(
      `${label} SHA-256 mismatch. Expected ${expectedHash}, received ${sourceHash}.`,
    );
  }

  await mkdir(dirname(destination), {recursive: true});
  await copyFile(source, destination);
  const stagedHash = await sha256(destination);
  if (stagedHash !== sourceHash) {
    throw new Error(`${label} changed while being staged.`);
  }

  return {sourceHash, stagedHash};
};

const manifest = await readJson(manifestPath);
const fontLock = await readJson(fontLockPath);
if (!Array.isArray(manifest.assets) || !Array.isArray(manifest.inserts)) {
  throw new Error('The scene contract must declare assets[] and inserts[].');
}
if (!Array.isArray(fontLock.fonts) || fontLock.fonts.length !== 3) {
  throw new Error('font-assets.json must freeze the three 2A type roles.');
}
if (manifest.inserts.length !== 2) {
  throw new Error(`Expected exactly two HyperFrames inserts; found ${manifest.inserts.length}.`);
}

requireFile(handoffPath, 'Approved HyperFrames insert handoff');
const handoff = await readJson(handoffPath);
requireExact(handoff.schemaVersion, 1, 'Insert handoff schemaVersion');
requireExact(handoff.approval?.status, 'approved', 'Insert handoff approval status');
requireExact(
  handoff.approval?.surface,
  'final-composition-preview',
  'Insert handoff approval surface',
);
if (typeof handoff.approval?.reference !== 'string' || !handoff.approval.reference.trim()) {
  throw new Error('Insert handoff must retain a non-empty approval reference.');
}
if (!Number.isFinite(Date.parse(handoff.approval?.approvedAt))) {
  throw new Error('Insert handoff must retain a valid approval timestamp.');
}
requireExact(
  handoff.sceneContract?.path,
  slash(relative(repoRoot, manifestPath)),
  'Insert handoff scene-contract path',
);
requireExact(
  handoff.sceneContract?.sha256,
  await sha256(manifestPath),
  'Insert handoff scene-contract SHA-256',
);
requireExact(handoff.rendererTheme, manifest.rendererTheme, 'Insert handoff renderer theme');
requireExact(handoff.inserts?.length, manifest.inserts.length, 'Insert handoff artifact count');
requireExact(
  new Set(handoff.inserts.map((entry) => entry.id)).size,
  manifest.inserts.length,
  'Insert handoff unique artifact count',
);

const handoffEntries = new Map();
for (const insert of manifest.inserts) {
  const entry = handoff.inserts.find((candidate) => candidate.id === insert.id);
  if (!entry) throw new Error(`Insert handoff is missing ${insert.id}.`);
  const approvalProject = handoff.approval.projects?.find((candidate) => candidate.id === insert.id);
  if (!approvalProject) throw new Error(`Insert handoff approval is missing project ${insert.id}.`);
  requireExact(
    approvalProject.compositionId,
    insert.sourceSceneId,
    `Insert ${insert.id} approved composition`,
  );
  requireExact(entry.version, insert.version, `Insert ${insert.id} version`);
  requireExact(entry.engine, insert.engine, `Insert ${insert.id} engine`);
  requireExact(entry.engineVersion, insert.engineVersion, `Insert ${insert.id} engine version`);
  requireExact(entry.intent, insert.intent, `Insert ${insert.id} intent`);
  requireExact(entry.sourceSceneId, insert.sourceSceneId, `Insert ${insert.id} source scene`);
  const sourceRoot = resolve(manifestRoot, insert.sourcePath);
  const artifact = resolve(manifestRoot, insert.artifactPath);
  requireExact(entry.sourcePath, slash(relative(repoRoot, sourceRoot)), `Insert ${insert.id} source path`);
  requireExact(entry.artifactPath, slash(relative(repoRoot, artifact)), `Insert ${insert.id} artifact path`);
  requireExact(entry.width, manifest.resolution.width, `Insert ${insert.id} width`);
  requireExact(entry.height, manifest.resolution.height, `Insert ${insert.id} height`);
  requireExact(entry.fps, manifest.fps, `Insert ${insert.id} frame rate`);
  requireExact(entry.durationSeconds, insert.durationSeconds, `Insert ${insert.id} duration seconds`);
  requireExact(entry.durationFrames, insert.durationFrames, `Insert ${insert.id} duration frames`);
  requireExact(entry.backgroundContract, insert.backgroundContract, `Insert ${insert.id} background contract`);
  requireExact(entry.alphaContract, insert.alphaContract, `Insert ${insert.id} alpha contract`);
  requireDeepEqual(entry.safeArea, insert.safeArea, `Insert ${insert.id} safe area`);
  requireExact(entry.audioContract, 'silent-no-audio-stream', `Insert ${insert.id} audio contract`);
  requireExact(entry.qc?.videoStreams, 1, `Insert ${insert.id} QC video stream count`);
  requireExact(entry.qc?.audioStreams, 0, `Insert ${insert.id} QC audio stream count`);
  requireExact(entry.qc?.codec, 'h264', `Insert ${insert.id} QC codec`);
  requireExact(entry.qc?.pixelFormat, 'yuv420p', `Insert ${insert.id} QC pixel format`);
  requireExact(entry.qc?.fullDecode, 'pass', `Insert ${insert.id} QC full decode`);
  const expectedHash = normalizedHash(entry.sha256);
  if (!expectedHash) throw new Error(`Insert ${insert.id} handoff has no valid artifact SHA-256.`);
  for (const [key, fileName] of [
    ['html', 'index.html'],
    ['motion', 'index.motion.json'],
    ['package', 'package.json'],
  ]) {
    const sourceHash = normalizedHash(entry.sourceSha256?.[key]);
    if (!sourceHash) throw new Error(`Insert ${insert.id} handoff has no valid ${key} source SHA-256.`);
    requireExact(sourceHash, await sha256(resolve(sourceRoot, fileName)), `Insert ${insert.id} ${key} source hash`);
  }
  requireFile(artifact, `HyperFrames insert ${insert.id}`);
  const artifactInfo = await stat(artifact);
  requireExact(entry.sizeBytes, artifactInfo.size, `Insert ${insert.id} artifact size`);
  requireExact(expectedHash, await sha256(artifact), `Insert ${insert.id} artifact hash`);
  handoffEntries.set(insert.id, entry);
}

const staged = {
  schemaVersion: 1,
  sceneContract: relative(projectRoot, manifestPath).replaceAll('\\', '/'),
  sceneContractSha256: await sha256(manifestPath),
  rendererTheme: manifest.rendererTheme,
  insertHandoff: {
    path: slash(relative(projectRoot, handoffPath)),
    sha256: await sha256(handoffPath),
    approvalReference: handoff.approval.reference,
  },
  assets: [],
  fonts: [],
  inserts: [],
};

for (const font of fontLock.fonts) {
  const source = resolve(projectRoot, font.sourcePath);
  assertInside(resolve(projectRoot, '..'), source, `Font ${font.family}`);
  const expectedHash = normalizedHash(font.sha256);
  if (!expectedHash) {
    throw new Error(`Font ${font.family} has no valid frozen SHA-256.`);
  }
  const stagedPath = `fonts/${font.fileName}`;
  const destination = resolve(stagedPublicRoot, stagedPath);
  assertInside(stagedPublicRoot, destination, `Staged font ${font.family}`);
  const hashes = await copyAndVerify({
    source,
    destination,
    expectedHash,
    label: `Font ${font.family}`,
  });
  staged.fonts.push({family: font.family, stagedPath, sha256: hashes.stagedHash});
}

for (const asset of manifest.assets) {
  if (asset.kind !== 'audio') continue;
  const publicPath = String(asset.publicPath ?? '').replace(/^[/\\]+/, '');
  const source = resolve(appPublicRoot, publicPath);
  assertInside(appPublicRoot, source, `Audio ${asset.id}`);
  const expectedHash = normalizedHash(asset.sha256);
  if (!expectedHash) {
    throw new Error(`Audio ${asset.id} has no valid SHA-256 in the scene contract.`);
  }
  const extension = extname(source) || '.mp3';
  const stagedPath = `audio/${asset.id}${extension}`;
  const destination = resolve(stagedPublicRoot, stagedPath);
  assertInside(stagedPublicRoot, destination, `Staged audio ${asset.id}`);
  const hashes = await copyAndVerify({
    source,
    destination,
    expectedHash,
    label: `Audio ${asset.id}`,
  });
  staged.assets.push({id: asset.id, stagedPath, sha256: hashes.stagedHash});
}

for (const insert of manifest.inserts) {
  if (insert.engine !== 'hyperframes') {
    throw new Error(`Insert ${insert.id} must use the HyperFrames engine.`);
  }
  if (insert.audioContract !== 'silent') {
    throw new Error(`Insert ${insert.id} must remain silent inside the Remotion master.`);
  }
  const source = resolve(manifestRoot, insert.artifactPath);
  assertInside(resolve(manifestRoot, '..'), source, `Insert ${insert.id}`);
  const handoffEntry = handoffEntries.get(insert.id);
  const expectedHash = handoffEntry.sha256;
  const stagedPath = `inserts/${insert.id}.mp4`;
  const destination = resolve(stagedPublicRoot, stagedPath);
  assertInside(stagedPublicRoot, destination, `Staged insert ${insert.id}`);
  const hashes = await copyAndVerify({
    source,
    destination,
    expectedHash,
    label: `HyperFrames insert ${insert.id}`,
  });
  staged.inserts.push({
    id: insert.id,
    version: insert.version,
    engineVersion: insert.engineVersion,
    sourceSceneId: insert.sourceSceneId,
    durationFrames: insert.durationFrames,
    stagedPath,
    sha256: hashes.stagedHash,
  });
}

await writeFile(
  resolve(stagedPublicRoot, 'staged-assets.json'),
  `${JSON.stringify(staged, null, 2)}\n`,
  'utf8',
);

console.log(
  `Staged ${staged.fonts.length} frozen fonts, ${staged.assets.length} verified audio assets, and ${staged.inserts.length} frozen HyperFrames inserts.`,
);
