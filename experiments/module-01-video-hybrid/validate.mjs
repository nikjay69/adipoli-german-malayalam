import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(here, 'lesson-01.scene.json');
const designContractPath = path.join(here, 'design-contract.json');
const repoRoot = path.resolve(here, '../..');
const publicRoot = path.resolve(repoRoot, 'public');
const brandManifestPath = path.resolve(publicRoot, 'brand/manifest.json');
const fontLockPath = path.resolve(here, '../v1-02-remotion/font-assets.json');
const finalizerPath = path.resolve(here, 'finalize.mjs');
const errors = [];
const fail = (message) => errors.push(message);
const normalizedHash = (value) =>
  typeof value === 'string' && /^[a-f0-9]{64}$/i.test(value)
    ? value.toLowerCase()
    : null;
const hashBytes = (bytes) => createHash('sha256').update(bytes).digest('hex');
const hashFile = async (filePath) => hashBytes(await readFile(filePath));
const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;
const isInside = (root, candidate) => {
  const relativePath = path.relative(root, candidate);
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
};
const attributeValue = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`));
  return match?.[1];
};
const expectedInsertContracts = new Map([
  ['phrase-build', {
    sourceSceneId: 'm1l1-phrase-build',
    durationSeconds: 11,
    durationFrames: 330,
    backgroundContract: 'opaque-2a-daylight-to-forest',
    brandAsset: 'daylightMark',
    brandSelector: '.pb-brand',
  }],
  ['mistake-repair', {
    sourceSceneId: 'm1l1-mistake-repair',
    durationSeconds: 12,
    durationFrames: 360,
    backgroundContract: 'opaque-2a-forest-to-answer-sheet',
    brandAsset: 'darkSurfaceMark',
    brandSelector: '.mr-brand',
  }],
]);
const expectedProtectedInset = {top: 68, right: 104, bottom: 72, left: 104};
const expectedFrameCheck = 'severity=error;seek=.25,.5,.75;tol=2';
const scriptAtTimes = (command) => {
  if (typeof command !== 'string') return null;
  const match = command.match(
    /(?:^|\s)--at=(\d+(?:\.\d+)?(?:,\d+(?:\.\d+)?)*)\b/,
  );
  return match ? match[1].split(',').map(Number) : null;
};
const frameCheckValue = (command) => {
  if (typeof command !== 'string') return null;
  const match = command.match(/--frame-check=(?:"([^"]+)"|'([^']+)'|(\S+))/);
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
};
const insertSceneProblems = ({insert, scenes}) => {
  const problems = [];
  const matches = scenes.filter((scene) => scene.insertId === insert.id);
  if (matches.length !== 1) {
    problems.push(`must be referenced by exactly one scene, received ${matches.length}`);
    return problems;
  }
  const scene = matches[0];
  if (scene.type !== 'teaching-insert') problems.push('must be used only by a teaching-insert scene');
  if (scene.id !== insert.sourceSceneId) problems.push('sourceSceneId must equal its consuming scene id');
  if (scene.durationSeconds !== insert.durationSeconds) problems.push('scene and insert seconds must match');
  if (scene.durationFrames !== insert.durationFrames) problems.push('scene and insert frames must match');
  return problems;
};
const audioPlacementProblems = ({placement, scenes, assets}) => {
  const problems = [];
  const asset = assets.get(placement.assetId);
  if (!asset) {
    problems.push(`references unknown asset ${placement.assetId}`);
    return problems;
  }
  if (asset.kind !== 'audio') problems.push(`asset ${placement.assetId} is not audio`);
  const scene = scenes.find(
    (candidate) =>
      placement.startFrame >= candidate.startFrame &&
      placement.startFrame < candidate.startFrame + candidate.durationFrames,
  );
  if (!scene) {
    problems.push('does not land inside a scene');
    return problems;
  }
  if (!scene.assetIds?.includes(placement.assetId)) {
    problems.push(`asset ${placement.assetId} is not declared by scene ${scene.id}`);
  }
  return problems;
};
const designBindingProblems = ({
  scene,
  design,
  designSha256,
  brandManifest,
  brandManifestSha256,
}) => {
  const problems = [];
  if (design.schemaVersion !== 1) problems.push('design contract schemaVersion must be 1');
  if (design.status !== 'owner-approved') problems.push('design contract status must be owner-approved');
  if (design.approvedDecision !== 26) problems.push('design contract must retain DECISIONS #26');
  if (scene.designSystem?.id !== design.id) problems.push('scene designSystem.id must equal design contract id');
  if (scene.rendererTheme !== design.id) problems.push('rendererTheme must equal the frozen design contract id');
  if (scene.designSystem?.status !== 'owner-approved') problems.push('scene designSystem must be owner-approved');
  if (scene.designSystem?.contractPath !== './design-contract.json') problems.push('scene design contract path must be local and fixed');
  if (scene.designSystem?.contractSha256 !== designSha256) problems.push('scene design contract SHA-256 is stale');
  if (normalizedHash(design.brandManifest?.sha256) !== brandManifestSha256) problems.push('design contract brand-manifest SHA-256 is stale');
  if (normalizedHash(brandManifest.source?.sha256) !== normalizedHash(design.sourcePackage?.sha256)) problems.push('approved Claude package SHA-256 disagrees with the canonical brand manifest');
  if (brandManifest.selectedMark !== '4a Triangle AG') problems.push('canonical brand manifest no longer selects Triangle AG');
  return problems;
};
const insertDesignProblems = ({
  insert,
  html,
  motion,
  frameText,
  packageJson,
  brandAssetHash,
  fontAssetHashes,
  fontLock,
  design,
}) => {
  const problems = [];
  const expectedInsert = expectedInsertContracts.get(insert.id);
  const approvedBrand = design.approvedAssets?.[insert.brandAsset];
  if (!approvedBrand) {
    problems.push(`unknown design-contract brand asset ${insert.brandAsset}`);
    return problems;
  }
  const brandFileName = path.basename(approvedBrand.publicPath);
  const expectedBrandSrc = `./assets/brand/${brandFileName}`;
  if (!html.includes(`src="${expectedBrandSrc}"`)) problems.push(`must render approved brand asset ${expectedBrandSrc}`);
  if (brandAssetHash !== normalizedHash(approvedBrand.sha256)) problems.push(`brand asset ${brandFileName} SHA-256 is stale`);
  if (/>\s*Adipoli German[\s\S]{0,8}A1\s*</i.test(html)) problems.push('typed Adipoli German plus A1 faux lockup is forbidden; use the approved mark');
  for (const fragment of design.motion?.forbiddenEaseFragments ?? []) {
    if (html.toLowerCase().includes(String(fragment).toLowerCase())) {
      problems.push(`forbidden overshoot ease fragment ${fragment}`);
    }
  }
  for (const font of design.forbiddenFonts ?? []) {
    if (html.toLowerCase().includes(String(font).toLowerCase())) {
      problems.push(`forbidden legacy font ${font}`);
    }
  }
  if (!/version:\s*["']1\.0["']/.test(frameText)) problems.push('frame.md must freeze element-system version 1.0');
  if (!/overshoot:\s*["']forbidden["']/.test(frameText)) problems.push('frame.md must explicitly forbid overshoot');
  const assertions = Array.isArray(motion?.assertions) ? motion.assertions : [];
  if (expectedInsert) {
    const appearsBy = assertions.find(
      (assertion) =>
        assertion.kind === 'appearsBy' &&
        assertion.selector === expectedInsert.brandSelector,
    );
    if (!appearsBy || !Number.isFinite(appearsBy.bySec) || appearsBy.bySec > 1.2) {
      problems.push(`motion sidecar must reveal ${expectedInsert.brandSelector} by 1.2s`);
    }
    if (!assertions.some(
      (assertion) =>
        assertion.kind === 'staysInFrame' &&
        assertion.selector === expectedInsert.brandSelector,
    )) {
      problems.push(`motion sidecar must keep ${expectedInsert.brandSelector} in frame`);
    }
  }
  if (fontLock?.schemaVersion !== 1 || !Array.isArray(fontLock.fonts)) {
    problems.push('font lock must use schemaVersion 1 with a fonts array');
  } else {
    for (const font of fontLock.fonts) {
      if (path.basename(String(font.fileName ?? '')) !== font.fileName) {
        problems.push(`font lock filename must be local: ${font.fileName}`);
        continue;
      }
      const expectedHash = normalizedHash(font.sha256);
      const actualHash = fontAssetHashes?.get(font.fileName) ?? null;
      if (!expectedHash || actualHash !== expectedHash) {
        problems.push(`font asset ${font.fileName} SHA-256 is stale`);
      }
      if (!html.includes(`./assets/fonts/${font.fileName}`)) {
        problems.push(`must load frozen font asset ${font.fileName}`);
      }
      if (!html.includes(`font-family: "${font.family}"`)) {
        problems.push(`must declare frozen font family ${font.family}`);
      }
    }
  }
  const checkCommand = packageJson.scripts?.check;
  if (typeof checkCommand !== 'string') problems.push('package.json needs a check script');
  else {
    for (const required of ['--snapshots', '--samples=15', '--at-transitions', '--frame-check=']) {
      if (!checkCommand.includes(required)) problems.push(`check script must include ${required}`);
    }
    if (!/(?:^|\s)--strict(?:\s|$)/.test(checkCommand)) {
      problems.push('check script must include supported warning gate --strict');
    }
    if (!checkCommand.includes(`hyperframes@${insert.engineVersion}`)) {
      problems.push(`check script must pin HyperFrames ${insert.engineVersion}`);
    }
    if (frameCheckValue(checkCommand) !== expectedFrameCheck) {
      problems.push(`check script frame-check must equal ${expectedFrameCheck}`);
    }
    const checkTimes = scriptAtTimes(checkCommand);
    if (!checkTimes) {
      problems.push('check script must declare deterministic --at evidence times');
    } else {
      if (checkTimes.length < 6) problems.push('check script must sample at least 6 evidence times');
      if (checkTimes.some((time) => !Number.isFinite(time) || time <= 0 || time >= insert.durationSeconds)) {
        problems.push('check script evidence times must stay inside the composition');
      }
      if (checkTimes.some((time, index) => index > 0 && time <= checkTimes[index - 1])) {
        problems.push('check script evidence times must be strictly increasing');
      }
      if (checkTimes[0] > 1.2 || checkTimes.at(-1) < insert.durationSeconds - 1) {
        problems.push('check script evidence times must cover the opening and closing beats');
      }
    }
    const snapshotCommand = packageJson.scripts?.snapshot;
    if (typeof snapshotCommand !== 'string') {
      problems.push('package.json needs a snapshot script');
    } else {
      if (!snapshotCommand.includes(`hyperframes@${insert.engineVersion}`)) {
        problems.push(`snapshot script must pin HyperFrames ${insert.engineVersion}`);
      }
      if (JSON.stringify(scriptAtTimes(snapshotCommand)) !== JSON.stringify(checkTimes)) {
        problems.push('snapshot script evidence times must exactly match the checked evidence times');
      }
    }
  }
  return problems;
};

let manifest;
let designContract;
let brandManifest;
let fontLock;
let designContractSha256;
let brandManifestSha256;
try {
  const [manifestBytes, designBytes, brandManifestBytes, fontLockBytes] = await Promise.all([
    readFile(manifestPath),
    readFile(designContractPath),
    readFile(brandManifestPath),
    readFile(fontLockPath),
  ]);
  manifest = JSON.parse(manifestBytes.toString('utf8'));
  designContract = JSON.parse(designBytes.toString('utf8'));
  brandManifest = JSON.parse(brandManifestBytes.toString('utf8'));
  fontLock = JSON.parse(fontLockBytes.toString('utf8'));
  designContractSha256 = hashBytes(designBytes);
  brandManifestSha256 = hashBytes(brandManifestBytes);
} catch (error) {
  console.error(`FAIL cannot read video contract authority: ${error.message}`);
  process.exit(1);
}

if (manifest.schemaVersion !== 2) fail(`schemaVersion must be 2, got ${manifest.schemaVersion}`);
for (const problem of designBindingProblems({
  scene: manifest,
  design: designContract,
  designSha256: designContractSha256,
  brandManifest,
  brandManifestSha256,
})) fail(problem);
if (fontLock.schemaVersion !== 1) fail('font lock schemaVersion must be 1');
const lockedFonts = Array.isArray(fontLock.fonts) ? fontLock.fonts : [];
if (lockedFonts.length !== 3) fail(`font lock must contain exactly 3 fonts, got ${lockedFonts.length}`);
const lockedFontFamilies = new Set();
for (const [index, font] of lockedFonts.entries()) {
  const label = `fontLock.fonts[${index}]`;
  if (!['Source Serif 4', 'Geist', 'Geist Mono'].includes(font.family)) {
    fail(`${label} uses unexpected family ${font.family}`);
  } else if (lockedFontFamilies.has(font.family)) {
    fail(`${label} duplicates family ${font.family}`);
  } else {
    lockedFontFamilies.add(font.family);
  }
  if (path.basename(String(font.fileName ?? '')) !== font.fileName) {
    fail(`${label} fileName must be a local basename`);
  }
  if (!normalizedHash(font.sha256)) fail(`${label} sha256 must be 64 hex characters`);
}
for (const [assetId, asset] of Object.entries(designContract.approvedAssets ?? {})) {
  let assetPath;
  if (asset.publicPath) {
    const canonical =
      asset.publicPath.startsWith('/') &&
      !asset.publicPath.includes('\\') &&
      !asset.publicPath.split('/').includes('..');
    if (!canonical) {
      fail(`approved design asset ${assetId} has a non-canonical publicPath`);
      continue;
    }
    assetPath = path.resolve(publicRoot, asset.publicPath.slice(1));
    if (!isInside(publicRoot, assetPath)) {
      fail(`approved design asset ${assetId} escapes publicRoot`);
      continue;
    }
  } else if (asset.repoPath) {
    assetPath = path.resolve(repoRoot, asset.repoPath);
    if (!isInside(repoRoot, assetPath)) {
      fail(`approved design asset ${assetId} escapes repoRoot`);
      continue;
    }
  } else {
    fail(`approved design asset ${assetId} needs publicPath or repoPath`);
    continue;
  }
  try {
    const actualHash = await hashFile(assetPath);
    if (actualHash !== normalizedHash(asset.sha256)) {
      fail(`approved design asset ${assetId} SHA-256 mismatch`);
    }
  } catch (error) {
    fail(`approved design asset ${assetId} is missing (${error.code ?? error.message})`);
  }
}
if (manifest.fps !== 30) fail(`fps must be 30, got ${manifest.fps}`);
if (manifest.durationSeconds !== 81) fail(`durationSeconds must be 81, got ${manifest.durationSeconds}`);
if (manifest.durationFrames !== 2430) fail(`durationFrames must be 2430, got ${manifest.durationFrames}`);
if (manifest.durationSeconds * manifest.fps !== manifest.durationFrames) fail('durationSeconds * fps must equal durationFrames');
if (manifest.resolution?.width !== 1920 || manifest.resolution?.height !== 1080) {
  fail(`resolution must be 1920x1080, got ${manifest.resolution?.width}x${manifest.resolution?.height}`);
}

const castRoles = new Set(Object.values(manifest.castRoles ?? {}));
for (const required of ['owner-presenter', 'german-teacher', 'adult-learner']) {
  if (!castRoles.has(required)) fail(`castRoles is missing semantic role ${required}`);
}

const inserts = Array.isArray(manifest.inserts) ? manifest.inserts : [];
if (inserts.length !== 2) fail(`expected exactly 2 HyperFrames inserts, got ${inserts.length}`);
const insertIds = new Set();
const insertEngineVersions = new Set();
const experimentsRoot = path.resolve(here, '..');
let verifiedInsertSources = 0;
const verifiedInsertFixtures = [];
for (const [index, insert] of inserts.entries()) {
  const label = `insert[${index}]`;
  const expectedInsert = expectedInsertContracts.get(insert.id);
  if (!expectedInsert) fail(`${label} uses unexpected insert id ${insert.id}`);
  if (insert.engine !== 'hyperframes') fail(`${label} engine must be hyperframes`);
  if (!/^\d+\.\d+\.\d+$/.test(insert.engineVersion ?? '')) fail(`${label} engineVersion must be an exact semver pin`);
  else insertEngineVersions.add(insert.engineVersion);
  if (!isPositiveInteger(insert.version)) fail(`${label} version must be a positive integer`);
  if (typeof insert.id !== 'string' || insert.id.length === 0) fail(`${label} needs an id`);
  else if (insertIds.has(insert.id)) fail(`${label} duplicates id ${insert.id}`);
  else insertIds.add(insert.id);
  if (!isPositiveInteger(insert.durationFrames)) fail(`${label} durationFrames must be a positive integer`);
  if (insert.durationSeconds * manifest.fps !== insert.durationFrames) fail(`${label} duration values disagree`);
  if (expectedInsert && (
    insert.durationSeconds !== expectedInsert.durationSeconds ||
    insert.durationFrames !== expectedInsert.durationFrames
  )) fail(`${label} duration must remain ${expectedInsert.durationSeconds}s / ${expectedInsert.durationFrames} frames`);
  if (expectedInsert && insert.sourceSceneId !== expectedInsert.sourceSceneId) {
    fail(`${label} sourceSceneId must remain ${expectedInsert.sourceSceneId}`);
  }
  if (insert.audioContract !== 'silent') fail(`${label} must be silent; Remotion owns final audio`);
  if (expectedInsert && insert.backgroundContract !== expectedInsert.backgroundContract) fail(`${label} backgroundContract does not match its 2A scene grammar`);
  if (expectedInsert && insert.brandAsset !== expectedInsert.brandAsset) {
    fail(`${label} must use design asset ${expectedInsert.brandAsset}`);
  }
  if (insert.alphaContract !== 'opaque') fail(`${label} alphaContract must be opaque`);
  if (insert.safeArea?.mode !== 'full-bleed' || insert.safeArea?.consumerOverlay !== 'none') fail(`${label} must declare full-bleed safe area with no consumer overlay`);
  const protectedInset = insert.safeArea?.protectedInsetPx;
  if (!protectedInset || !['top', 'right', 'bottom', 'left'].every((side) => Number.isInteger(protectedInset[side]) && protectedInset[side] >= 0)) fail(`${label} must declare non-negative integer protected insets`);
  else if (!['top', 'right', 'bottom', 'left'].every(
    (side) => protectedInset[side] === expectedProtectedInset[side],
  )) fail(`${label} protected insets must stay ${JSON.stringify(expectedProtectedInset)}`);
  if (!String(insert.sourcePath ?? '').startsWith('../v1-02-hyperframes/')) fail(`${label} sourcePath must stay in the isolated HyperFrames proof`);
  if (expectedInsert && insert.sourcePath !== `../v1-02-hyperframes/${insert.id}`) {
    fail(`${label} sourcePath must resolve to its named project`);
  }
  if (expectedInsert && insert.artifactPath !== `../v1-02-hyperframes/${insert.id}/renders/${insert.id}-v${insert.version}.mp4`) {
    fail(`${label} artifactPath must resolve to its versioned named render`);
  }

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
    const [html, motionText, packageText, frameText] = await Promise.all([
      readFile(path.join(sourceDir, 'index.html'), 'utf8'),
      readFile(path.join(sourceDir, 'index.motion.json'), 'utf8'),
      readFile(path.join(sourceDir, 'package.json'), 'utf8'),
      readFile(path.join(sourceDir, 'frame.md'), 'utf8'),
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
    const approvedBrand = designContract.approvedAssets?.[insert.brandAsset];
    const brandFileName = approvedBrand?.publicPath
      ? path.basename(approvedBrand.publicPath)
      : '';
    const brandAssetPath = path.resolve(sourceDir, 'assets/brand', brandFileName);
    let brandAssetHash = null;
    try {
      brandAssetHash = await hashFile(brandAssetPath);
    } catch (error) {
      fail(`${label} approved brand asset is missing (${error.code ?? error.message})`);
    }
    const fontAssetHashes = new Map();
    for (const font of lockedFonts) {
      if (path.basename(String(font.fileName ?? '')) !== font.fileName) continue;
      const fontAssetPath = path.resolve(sourceDir, 'assets/fonts', font.fileName);
      try {
        fontAssetHashes.set(font.fileName, await hashFile(fontAssetPath));
      } catch (error) {
        fail(`${label} frozen font asset ${font.fileName} is missing (${error.code ?? error.message})`);
      }
    }
    for (const problem of insertDesignProblems({
      insert,
      html,
      motion,
      frameText,
      packageJson,
      brandAssetHash,
      fontAssetHashes,
      fontLock,
      design: designContract,
    })) fail(`${label} ${problem}`);
    verifiedInsertFixtures.push({
      insert,
      html,
      motion,
      frameText,
      packageJson,
      brandAssetHash,
      fontAssetHashes,
      fontLock,
    });

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
      `assets/brand/${brandFileName}`,
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
  if (scene.type !== 'teaching-insert' && scene.insertId !== undefined) fail(`${label} may not declare insertId outside a teaching-insert scene`);
  expectedStartFrame += Number.isFinite(scene.durationFrames) ? scene.durationFrames : 0;
  expectedStartSeconds += Number.isFinite(scene.durationSeconds) ? scene.durationSeconds : 0;
}
if (expectedStartFrame !== manifest.durationFrames) fail(`scenes end at frame ${expectedStartFrame}, expected ${manifest.durationFrames}`);
if (expectedStartSeconds !== manifest.durationSeconds) fail(`scenes end at ${expectedStartSeconds}s, expected ${manifest.durationSeconds}s`);
for (const insert of inserts) {
  for (const problem of insertSceneProblems({insert, scenes})) {
    fail(`insert ${insert.id} ${problem}`);
  }
}

const assets = Array.isArray(manifest.assets) ? manifest.assets : [];
const assetIds = new Set();
const assetById = new Map();
let transcriptCount = 0;
for (const [index, asset] of assets.entries()) {
  const label = `asset[${index}]`;
  if (typeof asset.id !== 'string' || asset.id.length === 0) fail(`${label} needs a non-empty id`);
  else if (assetIds.has(asset.id)) fail(`${label} duplicates id ${asset.id}`);
  else {
    assetIds.add(asset.id);
    assetById.set(asset.id, asset);
  }
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
const placementKeys = new Set();
const placedAudioIds = new Set();
for (const [index, placement] of placements.entries()) {
  if (!assetIds.has(placement.assetId)) fail(`audioPlacements[${index}] references unknown asset ${placement.assetId}`);
  if (placement.startSeconds * manifest.fps !== placement.startFrame) fail(`audioPlacements[${index}] seconds/frame values disagree`);
  if (placement.startFrame < 0 || placement.startFrame >= manifest.durationFrames) fail(`audioPlacements[${index}] falls outside the timeline`);
  const placementKey = `${placement.assetId}@${placement.startFrame}`;
  if (placementKeys.has(placementKey)) fail(`audioPlacements[${index}] duplicates ${placementKey}`);
  placementKeys.add(placementKey);
  placedAudioIds.add(placement.assetId);
  for (const problem of audioPlacementProblems({
    placement,
    scenes,
    assets: assetById,
  })) fail(`audioPlacements[${index}] ${problem}`);
}
for (const asset of assets.filter((candidate) => candidate.kind === 'audio')) {
  if (!placedAudioIds.has(asset.id)) fail(`audio asset ${asset.id} has no timeline placement`);
}

let selfTestCount = 0;
let approvalGateSelfTestCount = 0;
if (process.argv.includes('--self-test')) {
  const expectFailure = (label, problems) => {
    selfTestCount += 1;
    if (!Array.isArray(problems) || problems.length === 0) {
      fail(`gate self-test did not reject ${label}`);
    }
  };
  const bindingInput = {
    scene: manifest,
    design: designContract,
    designSha256: designContractSha256,
    brandManifest,
    brandManifestSha256,
  };
  expectFailure(
    'renderer-theme drift',
    designBindingProblems({
      ...bindingInput,
      scene: {...manifest, rendererTheme: 'neutral-proof'},
    }),
  );
  expectFailure(
    'stale design-contract hash',
    designBindingProblems({
      ...bindingInput,
      scene: {
        ...manifest,
        designSystem: {...manifest.designSystem, contractSha256: '0'.repeat(64)},
      },
    }),
  );
  expectFailure(
    'lost owner approval',
    designBindingProblems({
      ...bindingInput,
      design: {...designContract, status: 'candidate'},
    }),
  );

  const fixture = verifiedInsertFixtures[0];
  if (!fixture) {
    fail('gate self-test needs one verified HyperFrames insert fixture');
  } else {
    const sourceInput = {...fixture, design: designContract};
    const firstLockedFont = fontLock.fonts?.[0]?.fileName;
    expectFailure(
      'cartoon overshoot easing',
      insertDesignProblems({...sourceInput, html: `${fixture.html}\nback.out(1.4)`}),
    );
    expectFailure(
      'missing approved brand source',
      insertDesignProblems({
        ...sourceInput,
        html: fixture.html.replace(
          `./assets/brand/${path.basename(designContract.approvedAssets[fixture.insert.brandAsset].publicPath)}`,
          './assets/brand/missing.svg',
        ),
      }),
    );
    expectFailure(
      'stale brand bytes',
      insertDesignProblems({...sourceInput, brandAssetHash: '0'.repeat(64)}),
    );
    expectFailure(
      'legacy font regression',
      insertDesignProblems({...sourceInput, html: `${fixture.html}\nfont-family: Oswald;`}),
    );
    expectFailure(
      'weakened HyperFrames check',
      insertDesignProblems({
        ...sourceInput,
        packageJson: {
          ...fixture.packageJson,
          scripts: {
            ...fixture.packageJson.scripts,
            check: fixture.packageJson.scripts.check.replace('--at-transitions', ''),
          },
        },
      }),
    );
    expectFailure(
      'non-strict HyperFrames check',
      insertDesignProblems({
        ...sourceInput,
        packageJson: {
          ...fixture.packageJson,
          scripts: {
            ...fixture.packageJson.scripts,
            check: fixture.packageJson.scripts.check.replace('--strict', ''),
          },
        },
      }),
    );
    expectFailure(
      'warning-only frame containment',
      insertDesignProblems({
        ...sourceInput,
        packageJson: {
          ...fixture.packageJson,
          scripts: {
            ...fixture.packageJson.scripts,
            check: fixture.packageJson.scripts.check.replace(
              'severity=error',
              'severity=warning',
            ),
          },
        },
      }),
    );
    expectFailure(
      'unpinned HyperFrames check',
      insertDesignProblems({
        ...sourceInput,
        packageJson: {
          ...fixture.packageJson,
          scripts: {
            ...fixture.packageJson.scripts,
            check: fixture.packageJson.scripts.check.replace(
              `hyperframes@${fixture.insert.engineVersion}`,
              'hyperframes@latest',
            ),
          },
        },
      }),
    );
    expectFailure(
      'divergent snapshot evidence',
      insertDesignProblems({
        ...sourceInput,
        packageJson: {
          ...fixture.packageJson,
          scripts: {
            ...fixture.packageJson.scripts,
            snapshot: fixture.packageJson.scripts.snapshot.replace(/--at=[^\s]+/, '--at=1.2,2.5'),
          },
        },
      }),
    );
    if (firstLockedFont) {
      const staleFontHashes = new Map(fixture.fontAssetHashes);
      staleFontHashes.set(firstLockedFont, '0'.repeat(64));
      expectFailure(
        'stale frozen font bytes',
        insertDesignProblems({...sourceInput, fontAssetHashes: staleFontHashes}),
      );
    } else {
      fail('gate self-test needs one frozen font fixture');
    }
  }
  const firstInsert = inserts[0];
  if (firstInsert) {
    expectFailure(
      'insert-to-scene duration drift',
      insertSceneProblems({
        insert: firstInsert,
        scenes: scenes.map((scene) =>
          scene.insertId === firstInsert.id
            ? {...scene, durationFrames: scene.durationFrames - 1}
            : scene
        ),
      }),
    );
  } else {
    fail('gate self-test needs one insert fixture');
  }
  const firstPlacement = placements[0];
  if (firstPlacement) {
    const wrongScene = scenes.find(
      (scene) => !scene.assetIds?.includes(firstPlacement.assetId),
    );
    expectFailure(
      'audio placement outside its declared scene',
      audioPlacementProblems({
        placement: {
          ...firstPlacement,
          startFrame: wrongScene?.startFrame ?? manifest.durationFrames,
        },
        scenes,
        assets: assetById,
      }),
    );
  } else {
    fail('gate self-test needs one audio placement fixture');
  }

  const approvalArtifacts = [
    ...inserts.map((insert) => path.resolve(here, insert.artifactPath)),
    path.resolve(here, 'v1-02.insert-handoff.json'),
    path.resolve(here, 'render-report.json'),
    path.resolve(here, 'evidence/v1-m1-l1-proof-review.mp4'),
    path.resolve(here, 'evidence/v1-m1-l1-proof-contact-sheet.jpg'),
    path.resolve(here, '../v1-02-remotion/output/v1-m1-l1-proof.mp4'),
  ];
  const artifactState = async (filePath) => {
    try {
      const info = await stat(filePath);
      return `${info.isFile()}:${info.size}:${info.mtimeMs}`;
    } catch (error) {
      if (error.code === 'ENOENT') return 'absent';
      throw error;
    }
  };
  const statesBefore = await Promise.all(approvalArtifacts.map(artifactState));
  const expectCommandRejection = (args, expectedMessage) => {
    approvalGateSelfTestCount += 1;
    const result = spawnSync(process.execPath, [finalizerPath, ...args], {
      cwd: repoRoot,
      encoding: 'utf8',
      windowsHide: true,
    });
    const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
    if (result.status === 0) {
      fail(`approval gate self-test unexpectedly accepted finalize.mjs ${args.join(' ')}`);
    } else if (!output.includes(expectedMessage)) {
      fail(`approval gate self-test returned the wrong rejection for finalize.mjs ${args.join(' ')}`);
    }
  };
  expectCommandRejection(
    ['render'],
    'Explicit render approval and a durable reference are required.',
  );
  expectCommandRejection(
    ['render', '--approved'],
    'Explicit render approval and a durable reference are required.',
  );
  expectCommandRejection(
    ['render', '--approval-reference=self-test'],
    'Explicit render approval and a durable reference are required.',
  );
  expectCommandRejection(
    ['review'],
    'Visual review requires --result=PASS|WEAK|FAIL',
  );
  const statesAfter = await Promise.all(approvalArtifacts.map(artifactState));
  if (JSON.stringify(statesAfter) !== JSON.stringify(statesBefore)) {
    fail('approval gate self-test changed render or review artifacts');
  }
}

if (errors.length > 0) {
  console.error(`FAIL ${errors.length} validation error${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`PASS ${path.basename(manifestPath)}`);
console.log(`- timeline: ${scenes.length} contiguous semantic scenes, ${manifest.durationSeconds}s / ${manifest.durationFrames} frames @ ${manifest.fps}fps`);
console.log(`- inserts: exactly ${inserts.length} bounded silent HyperFrames teaching intents on ${[...insertEngineVersions][0]}`);
console.log(`- insert sources: ${verifiedInsertSources}/${inserts.length} match duration, canvas, local-runtime, font/brand hashes, CLI/evidence pins, and artifact contracts`);
console.log(`- design authority: ${designContract.id} owner-approved; Claude package, brand manifest, marks, and Archivo promo title match SHA-256`);
if (selfTestCount > 0) console.log(`- failure injection: ${selfTestCount}/${selfTestCount} contract-drift and stale-asset cases rejected`);
if (approvalGateSelfTestCount > 0) console.log(`- approval gate: ${approvalGateSelfTestCount}/${approvalGateSelfTestCount} render/review bypass cases rejected without artifact changes`);
console.log(`- assets: ${assets.length} canonical files exist and match SHA-256; transcripts ${transcriptCount}/${assets.filter((asset) => asset.kind === 'audio').length}`);
console.log(`- cast: renderer-independent roles only (${[...castRoles].join(', ')})`);
