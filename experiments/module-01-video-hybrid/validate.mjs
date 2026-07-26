import {createHash} from 'node:crypto';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(here, 'lesson-01.scene.json');
const designContractPath = path.join(here, 'design-contract.json');
const repoRoot = path.resolve(here, '../..');
const publicRoot = path.resolve(repoRoot, 'public');
const brandManifestPath = path.resolve(publicRoot, 'brand/manifest.json');
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
  frameText,
  packageJson,
  brandAssetHash,
  design,
}) => {
  const problems = [];
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
  const checkCommand = packageJson.scripts?.check;
  if (typeof checkCommand !== 'string') problems.push('package.json needs a check script');
  else {
    for (const required of ['--snapshots', '--samples=15', '--at-transitions', '--frame-check=']) {
      if (!checkCommand.includes(required)) problems.push(`check script must include ${required}`);
    }
  }
  return problems;
};

let manifest;
let designContract;
let brandManifest;
let designContractSha256;
let brandManifestSha256;
try {
  const [manifestBytes, designBytes, brandManifestBytes] = await Promise.all([
    readFile(manifestPath),
    readFile(designContractPath),
    readFile(brandManifestPath),
  ]);
  manifest = JSON.parse(manifestBytes.toString('utf8'));
  designContract = JSON.parse(designBytes.toString('utf8'));
  brandManifest = JSON.parse(brandManifestBytes.toString('utf8'));
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
const verifiedInsertFixtures = [];
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
    for (const problem of insertDesignProblems({
      insert,
      html,
      frameText,
      packageJson,
      brandAssetHash,
      design: designContract,
    })) fail(`${label} ${problem}`);
    verifiedInsertFixtures.push({
      insert,
      html,
      frameText,
      packageJson,
      brandAssetHash,
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
  expectedStartFrame += Number.isFinite(scene.durationFrames) ? scene.durationFrames : 0;
  expectedStartSeconds += Number.isFinite(scene.durationSeconds) ? scene.durationSeconds : 0;
}
if (expectedStartFrame !== manifest.durationFrames) fail(`scenes end at frame ${expectedStartFrame}, expected ${manifest.durationFrames}`);
if (expectedStartSeconds !== manifest.durationSeconds) fail(`scenes end at ${expectedStartSeconds}s, expected ${manifest.durationSeconds}s`);

const assets = Array.isArray(manifest.assets) ? manifest.assets : [];
const assetIds = new Set();
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

let selfTestCount = 0;
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
console.log(`- insert sources: ${verifiedInsertSources}/${inserts.length} match duration, canvas, local-runtime, CLI-pin, and artifact contracts`);
console.log(`- design authority: ${designContract.id} owner-approved; Claude package, brand manifest, marks, and Archivo promo title match SHA-256`);
if (selfTestCount > 0) console.log(`- failure injection: ${selfTestCount}/${selfTestCount} contract-drift and stale-asset cases rejected`);
console.log(`- assets: ${assets.length} canonical files exist and match SHA-256; transcripts ${transcriptCount}/${assets.filter((asset) => asset.kind === 'audio').length}`);
console.log(`- cast: renderer-independent roles only (${[...castRoles].join(', ')})`);
