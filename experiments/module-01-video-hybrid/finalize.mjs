import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {mkdir, readFile, rename, stat, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const contractRoot = path.dirname(fileURLToPath(import.meta.url));
const experimentsRoot = path.resolve(contractRoot, '..');
const repoRoot = path.resolve(experimentsRoot, '..');
const manifestPath = path.resolve(contractRoot, 'lesson-01.scene.json');
const handoffPath = path.resolve(contractRoot, 'v1-02.insert-handoff.json');
const reportPath = path.resolve(contractRoot, 'render-report.json');
const evidenceRoot = path.resolve(contractRoot, 'evidence');
const remotionRoot = path.resolve(experimentsRoot, 'v1-02-remotion');
const remotionPackagePath = path.resolve(remotionRoot, 'package.json');
const fontLockPath = path.resolve(remotionRoot, 'font-assets.json');
const stagedReceiptPath = path.resolve(remotionRoot, 'public/staged-assets.json');
const masterPath = path.resolve(remotionRoot, 'output/v1-m1-l1-proof.mp4');
const proxyPath = path.resolve(evidenceRoot, 'v1-m1-l1-proof-review.mp4');
const contactSheetPath = path.resolve(evidenceRoot, 'v1-m1-l1-proof-contact-sheet.jpg');

const npmCliPath = [
  process.env.npm_execpath,
  path.resolve(path.dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js'),
  path.resolve(path.dirname(process.execPath), '../lib/node_modules/npm/bin/npm-cli.js'),
].find((candidate) => candidate && existsSync(candidate));
const npxCliPath = [
  path.resolve(path.dirname(process.execPath), 'node_modules/npm/bin/npx-cli.js'),
  path.resolve(path.dirname(process.execPath), '../lib/node_modules/npm/bin/npx-cli.js'),
].find((candidate) => existsSync(candidate));

const cliArgs = process.argv.slice(2);
const mode = cliArgs.find((argument) => !argument.startsWith('-')) ?? 'preflight';
const fullChecks = cliArgs.includes('--full');
const approved = cliArgs.includes('--approved');
const optionValue = (name) => {
  const prefix = `${name}=`;
  return cliArgs.find((argument) => argument.startsWith(prefix))?.slice(prefix.length).trim();
};
const approvalReference = optionValue('--approval-reference');
const reviewResult = optionValue('--result')?.toUpperCase();
const reviewReference = optionValue('--review-reference');
const reviewNotes = optionValue('--notes');
const commandLog = [];

const fail = (message) => {
  throw new Error(message);
};

const slash = (value) => value.replaceAll('\\', '/');
const isInside = (root, candidate) => {
  const relativePath = path.relative(root, candidate);
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
};
const relativeToRepo = (value) => slash(path.relative(repoRoot, value));
const displayArgument = (value) => {
  if (typeof value !== 'string' || !path.isAbsolute(value)) return value;
  return isInside(repoRoot, value) ? relativeToRepo(value) : slash(value);
};

const run = (
  command,
  args,
  {cwd = repoRoot, capture = false, returnResult = false} = {},
) => {
  const startedAt = new Date();
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: capture ? 'pipe' : 'inherit',
    windowsHide: true,
  });
  const endedAt = new Date();
  commandLog.push({
    command: displayArgument(command),
    args: args.map(displayArgument),
    cwd: isInside(repoRoot, cwd) ? relativeToRepo(cwd) || '.' : slash(cwd),
    startedAt: startedAt.toISOString(),
    endedAt: endedAt.toISOString(),
    exitCode: result.status,
  });
  if (result.error) fail(`${command} could not start: ${result.error.message}`);
  if (result.status !== 0) {
    const detail = [result.stdout, result.stderr].filter(Boolean).join('\n').trim();
    fail(
      `${command} ${args.join(' ')} failed with exit code ${result.status}${
        detail ? `\n${detail}` : ''
      }`,
    );
  }
  if (returnResult) {
    return {stdout: result.stdout ?? '', stderr: result.stderr ?? ''};
  }
  return (result.stdout ?? '').trim();
};

const runNpm = (args, options) => {
  if (!npmCliPath) fail('npm-cli.js could not be located beside the active Node installation.');
  return run(process.execPath, [npmCliPath, ...args], options);
};

const runNpx = (args, options) => {
  if (!npxCliPath) fail('npx-cli.js could not be located beside the active Node installation.');
  return run(process.execPath, [npxCliPath, ...args], options);
};

const readJson = async (filePath) => JSON.parse(await readFile(filePath, 'utf8'));
const sha256 = async (filePath) =>
  createHash('sha256').update(await readFile(filePath)).digest('hex');

const writeJsonAtomic = async (filePath, value) => {
  await mkdir(path.dirname(filePath), {recursive: true});
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, filePath);
};

const parseRate = (value) => {
  const [numerator, denominator = '1'] = String(value ?? '').split('/').map(Number);
  return numerator / denominator;
};

const requireExact = (actual, expected, label) => {
  if (actual !== expected) fail(`${label}: expected ${expected}, received ${actual}`);
};

const assertDuration = (actual, expected, fps, label) => {
  const toleranceSeconds = 1 / fps;
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > toleranceSeconds + 0.001) {
    fail(
      `${label}: expected ${expected}s ± ${toleranceSeconds.toFixed(4)}s, received ${actual}`,
    );
  }
  return toleranceSeconds;
};

const measureAudioSignal = (filePath, label, window = {}) => {
  const windowArgs = [];
  if (Number.isFinite(window.startSeconds)) windowArgs.push('-ss', String(window.startSeconds));
  if (Number.isFinite(window.durationSeconds)) windowArgs.push('-t', String(window.durationSeconds));
  const result = run(
    'ffmpeg',
    [
      '-hide_banner',
      '-nostats',
      '-i',
      filePath,
      ...windowArgs,
      '-map',
      '0:a:0',
      '-af',
      'volumedetect',
      '-f',
      'null',
      '-',
    ],
    {capture: true, returnResult: true},
  );
  const meanMatch = result.stderr.match(/mean_volume:\s*(-?(?:\d+(?:\.\d+)?|inf))\s*dB/i);
  const maxMatch = result.stderr.match(/max_volume:\s*(-?(?:\d+(?:\.\d+)?|inf))\s*dB/i);
  const meanDb = Number(meanMatch?.[1]);
  const maxDb = Number(maxMatch?.[1]);
  if (!Number.isFinite(meanDb) || !Number.isFinite(maxDb)) {
    fail(`${label} audio level could not be measured.`);
  }
  if (maxDb <= -50) fail(`${label} audio is effectively silent (max ${maxDb} dB).`);
  return {
    status: 'non-silent',
    meanDb,
    maxDb,
    ...(Number.isFinite(window.startSeconds) ? {startSeconds: window.startSeconds} : {}),
    ...(Number.isFinite(window.durationSeconds) ? {durationSeconds: window.durationSeconds} : {}),
  };
};

const probeDuration = (filePath) =>
  Number(
    run(
      'ffprobe',
      ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', filePath],
      {capture: true},
    ),
  );

const verifyAudioPlacements = (manifest, filePath) => {
  const assets = new Map(manifest.assets.map((asset) => [asset.id, asset]));
  return manifest.audioPlacements.map((placement, index) => {
    const asset = assets.get(placement.assetId);
    if (!asset) fail(`Audio placement ${index} references unknown asset ${placement.assetId}.`);
    const source = path.resolve(repoRoot, 'public', asset.publicPath.replace(/^[/\\]+/, ''));
    const sourceDuration = probeDuration(source);
    if (!Number.isFinite(sourceDuration) || sourceDuration <= 0) {
      fail(`Audio source ${placement.assetId} has no measurable duration.`);
    }
    const windowDuration = Math.min(Math.max(sourceDuration, 0.25), 2.5);
    return {
      index,
      assetId: placement.assetId,
      expectedStartSeconds: placement.startSeconds,
      expectedStartFrame: placement.startFrame,
      sourceDurationSeconds: sourceDuration,
      signal: measureAudioSignal(filePath, `Audio placement ${index} (${placement.assetId})`, {
        startSeconds: placement.startSeconds,
        durationSeconds: windowDuration,
      }),
    };
  });
};

const qcVideo = async ({filePath, expected, label}) => {
  if (!existsSync(filePath)) fail(`${label} is missing: ${filePath}`);
  const info = await stat(filePath);
  if (!info.isFile() || info.size === 0) fail(`${label} is empty or not a file: ${filePath}`);
  if (expected.maxBytes && info.size > expected.maxBytes) {
    fail(`${label} is ${info.size} bytes; maximum allowed is ${expected.maxBytes}.`);
  }

  const probe = JSON.parse(
    run(
      'ffprobe',
      [
        '-v',
        'error',
        '-show_entries',
        'format=duration,size,bit_rate:stream=index,codec_name,codec_type,width,height,r_frame_rate,avg_frame_rate,pix_fmt,sample_rate,channels',
        '-of',
        'json',
        filePath,
      ],
      {capture: true},
    ),
  );
  const streams = probe.streams ?? [];
  const videoStreams = streams.filter((stream) => stream.codec_type === 'video');
  const audioStreams = streams.filter((stream) => stream.codec_type === 'audio');
  requireExact(videoStreams.length, 1, `${label} video stream count`);
  const video = videoStreams[0];
  requireExact(video.codec_name, 'h264', `${label} video codec`);
  requireExact(video.width, expected.width, `${label} width`);
  requireExact(video.height, expected.height, `${label} height`);
  requireExact(video.pix_fmt, 'yuv420p', `${label} pixel format`);
  const measuredFps = parseRate(video.avg_frame_rate || video.r_frame_rate);
  if (!Number.isFinite(measuredFps) || Math.abs(measuredFps - expected.fps) > 0.001) {
    fail(`${label} frame rate: expected ${expected.fps}, received ${measuredFps}`);
  }
  const durationToleranceSeconds = assertDuration(
    Number(probe.format?.duration),
    expected.durationSeconds,
    expected.fps,
    `${label} duration`,
  );

  if (expected.audio === 'none') requireExact(audioStreams.length, 0, `${label} audio stream count`);
  if (expected.audio === 'required') {
    requireExact(audioStreams.length, 1, `${label} audio stream count`);
    requireExact(audioStreams[0].codec_name, 'aac', `${label} audio codec`);
  }

  const countedFrames = Number(
    run(
      'ffprobe',
      [
        '-v',
        'error',
        '-count_frames',
        '-select_streams',
        'v:0',
        '-show_entries',
        'stream=nb_read_frames',
        '-of',
        'default=noprint_wrappers=1:nokey=1',
        filePath,
      ],
      {capture: true},
    ),
  );
  requireExact(countedFrames, expected.frames, `${label} decoded frame count`);
  run(
    'ffmpeg',
    ['-v', 'error', '-xerror', '-i', filePath, '-map', '0', '-f', 'null', '-'],
    {capture: true},
  );
  const audioSignal =
    expected.audio === 'required' ? measureAudioSignal(filePath, label) : null;

  return {
    path: relativeToRepo(filePath),
    sha256: await sha256(filePath),
    sizeBytes: info.size,
    width: video.width,
    height: video.height,
    fps: measuredFps,
    durationSeconds: Number(probe.format.duration),
    durationFrames: countedFrames,
    qc: {
      nonEmpty: 'pass',
      videoStreams: videoStreams.length,
      audioStreams: audioStreams.length,
      codec: video.codec_name,
      pixelFormat: video.pix_fmt,
      durationToleranceSeconds,
      fullDecode: 'pass',
      audio: audioStreams.map((stream) => ({
        codec: stream.codec_name,
        sampleRate: Number(stream.sample_rate),
        channels: stream.channels,
      })),
      audioSignal,
    },
  };
};

const qcContactSheet = async (filePath) => {
  if (!existsSync(filePath)) fail(`Contact sheet is missing: ${filePath}`);
  const info = await stat(filePath);
  if (!info.isFile() || info.size === 0) fail('Contact sheet is empty or not a file.');
  const probe = JSON.parse(
    run(
      'ffprobe',
      [
        '-v',
        'error',
        '-show_entries',
        'stream=codec_name,codec_type,width,height',
        '-of',
        'json',
        filePath,
      ],
      {capture: true},
    ),
  );
  const streams = (probe.streams ?? []).filter((stream) => stream.codec_type === 'video');
  requireExact(streams.length, 1, 'Contact-sheet image stream count');
  requireExact(streams[0].codec_name, 'mjpeg', 'Contact-sheet codec');
  requireExact(streams[0].width, 2620, 'Contact-sheet width');
  requireExact(streams[0].height, 756, 'Contact-sheet height');
  run('ffmpeg', ['-v', 'error', '-xerror', '-i', filePath, '-map', '0', '-f', 'null', '-'], {
    capture: true,
  });
  return {
    path: relativeToRepo(filePath),
    sha256: await sha256(filePath),
    sizeBytes: info.size,
    width: streams[0].width,
    height: streams[0].height,
    fullDecode: 'pass',
  };
};

const readManifest = async () => {
  const manifest = await readJson(manifestPath);
  if (!Array.isArray(manifest.inserts) || manifest.inserts.length !== 2) {
    fail('The scene contract must declare exactly two inserts.');
  }
  return manifest;
};

const insertState = (manifest) =>
  manifest.inserts.map((insert) => ({
    ...insert,
    projectRoot: path.resolve(contractRoot, insert.sourcePath),
    artifactPathAbsolute: path.resolve(contractRoot, insert.artifactPath),
  }));

const parseJsonEnvelope = (text, label) => {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end < start) fail(`${label} did not return JSON.`);
  return JSON.parse(text.slice(start, end + 1));
};

const verifyCurrentHyperFramesPin = (insert) => {
  const result = parseJsonEnvelope(
    runNpx(
      [
        '--yes',
        'hyperframes@latest',
        'upgrade',
        '--project',
        '.',
        '--check',
        '--json',
      ],
      {cwd: insert.projectRoot, capture: true},
    ),
    `HyperFrames upgrade probe for ${insert.id}`,
  );
  if (result.changed) {
    fail(
      `HyperFrames ${insert.engineVersion} is behind ${result.to}. Upgrade both projects, rerun their checks, and obtain preview approval again before rendering.`,
    );
  }
  requireExact(result.to, insert.engineVersion, `HyperFrames pin for ${insert.id}`);
};

const runPreflight = async ({runHyperFramesChecks, allowPartialArtifacts = false}) => {
  const [major, minor] = process.versions.node.split('.').map(Number);
  if (major < 22 || (major === 22 && minor < 12)) {
    fail(`Node 22.12+ is required; received ${process.versions.node}`);
  }
  const ffmpegVersion = run('ffmpeg', ['-version'], {capture: true}).split(/\r?\n/)[0];
  const ffprobeVersion = run('ffprobe', ['-version'], {capture: true}).split(/\r?\n/)[0];
  run(process.execPath, ['validate.mjs'], {cwd: contractRoot});
  runNpm(['run', 'typecheck'], {cwd: remotionRoot});

  const manifest = await readManifest();
  const inserts = insertState(manifest);
  if (runHyperFramesChecks) {
    for (const insert of inserts) verifyCurrentHyperFramesPin(insert);
    for (const insert of inserts) runNpm(['run', 'check'], {cwd: insert.projectRoot});
  }

  const presentArtifacts = inserts.filter((insert) => existsSync(insert.artifactPathAbsolute));
  const hasHandoff = existsSync(handoffPath);
  if (hasHandoff && presentArtifacts.length !== inserts.length) {
    fail('The checksum handoff exists without both frozen insert artifacts.');
  }
  if (!allowPartialArtifacts && !hasHandoff && presentArtifacts.length > 0) {
    fail('Unhanded HyperFrames render artifacts exist; use only the approved finalizer to resume and freeze them.');
  }

  const remotionPackage = await readJson(remotionPackagePath);
  return {
    manifest,
    inserts,
    toolchain: {
      node: process.versions.node,
      hyperframes: [...new Set(inserts.map((insert) => insert.engineVersion))][0],
      remotion: remotionPackage.dependencies?.remotion,
      ffmpeg: ffmpegVersion,
      ffprobe: ffprobeVersion,
    },
  };
};

const buildInsertReport = async (manifest, insert) => {
  const media = await qcVideo({
    filePath: insert.artifactPathAbsolute,
    label: `HyperFrames insert ${insert.id}`,
    expected: {
      width: manifest.resolution.width,
      height: manifest.resolution.height,
      fps: manifest.fps,
      durationSeconds: insert.durationSeconds,
      frames: insert.durationFrames,
      audio: 'none',
    },
  });
  return {
    id: insert.id,
    version: insert.version,
    engine: insert.engine,
    engineVersion: insert.engineVersion,
    intent: insert.intent,
    sourceSceneId: insert.sourceSceneId,
    sourcePath: relativeToRepo(insert.projectRoot),
    artifactPath: media.path,
    sourceSha256: {
      html: await sha256(path.resolve(insert.projectRoot, 'index.html')),
      motion: await sha256(path.resolve(insert.projectRoot, 'index.motion.json')),
      package: await sha256(path.resolve(insert.projectRoot, 'package.json')),
    },
    sha256: media.sha256,
    sizeBytes: media.sizeBytes,
    width: media.width,
    height: media.height,
    fps: media.fps,
    durationSeconds: media.durationSeconds,
    durationFrames: media.durationFrames,
    backgroundContract: insert.backgroundContract,
    alphaContract: insert.alphaContract,
    safeArea: insert.safeArea,
    audioContract: 'silent-no-audio-stream',
    qc: media.qc,
  };
};

const validateExistingHandoff = async (handoff, manifest, insertReports) => {
  requireExact(handoff.schemaVersion, 1, 'insert handoff schemaVersion');
  requireExact(handoff.approval?.status, 'approved', 'insert handoff approval status');
  requireExact(
    handoff.approval?.surface,
    'final-composition-preview',
    'insert handoff approval surface',
  );
  requireExact(
    handoff.sceneContract?.sha256,
    await sha256(manifestPath),
    'insert handoff scene contract hash',
  );
  requireExact(handoff.inserts?.length, insertReports.length, 'insert handoff artifact count');
  for (const report of insertReports) {
    const frozen = handoff.inserts.find((insert) => insert.id === report.id);
    if (!frozen) fail(`insert handoff is missing ${report.id}`);
    requireExact(
      JSON.stringify(frozen),
      JSON.stringify(report),
      `complete insert handoff contract for ${report.id}`,
    );
  }
};

const validateStagedReceipt = async (manifest, insertReports) => {
  const receipt = await readJson(stagedReceiptPath);
  const fontLock = await readJson(fontLockPath);
  requireExact(receipt.sceneContractSha256, await sha256(manifestPath), 'staged scene contract hash');
  requireExact(receipt.rendererTheme, manifest.rendererTheme, 'staged renderer theme');
  requireExact(receipt.insertHandoff?.sha256, await sha256(handoffPath), 'staged insert handoff hash');
  requireExact(receipt.fonts?.length, 3, 'staged font count');
  requireExact(receipt.assets?.length, 3, 'staged native-audio count');
  requireExact(receipt.inserts?.length, 2, 'staged insert count');

  for (const font of fontLock.fonts) {
    const staged = receipt.fonts.find((candidate) => candidate.family === font.family);
    if (!staged) fail(`staged receipt is missing font ${font.family}`);
    requireExact(staged.sha256, font.sha256, `staged font hash for ${font.family}`);
  }
  for (const asset of manifest.assets.filter((candidate) => candidate.kind === 'audio')) {
    const staged = receipt.assets.find((candidate) => candidate.id === asset.id);
    if (!staged) fail(`staged receipt is missing audio ${asset.id}`);
    requireExact(staged.sha256, asset.sha256, `staged audio hash for ${asset.id}`);
  }
  for (const insert of insertReports) {
    const staged = receipt.inserts.find((candidate) => candidate.id === insert.id);
    if (!staged) fail(`staged receipt is missing insert ${insert.id}`);
    requireExact(staged.sha256, insert.sha256, `staged insert hash for ${insert.id}`);
    requireExact(
      staged.durationFrames,
      insert.durationFrames,
      `staged insert duration for ${insert.id}`,
    );
  }

  return {
    path: relativeToRepo(stagedReceiptPath),
    sha256: await sha256(stagedReceiptPath),
    sceneContractSha256: receipt.sceneContractSha256,
    counts: {fonts: receipt.fonts.length, nativeAudio: receipt.assets.length, inserts: receipt.inserts.length},
    verification: 'pass',
  };
};

const renderApproved = async () => {
  if (!approved || !approvalReference) {
    fail(
      'Explicit render approval and a durable reference are required. After owner approval use: node finalize.mjs render --approved --approval-reference=<reference>',
    );
  }
  if (existsSync(reportPath)) {
    fail(`A render report already exists at ${relativeToRepo(reportPath)}; refusing a second finalization.`);
  }

  const {manifest, inserts, toolchain} = await runPreflight({
    runHyperFramesChecks: true,
  });
  const hasFrozenHandoff = existsSync(handoffPath);
  for (const target of [masterPath, proxyPath, contactSheetPath]) {
    if (existsSync(target)) {
      fail(
        `Refusing to reuse unreceipted output ${relativeToRepo(target)}. Archive it deliberately before the approved finalizer runs.`,
      );
    }
  }
  const approvalReceipt = {
    status: 'approved',
    surface: 'final-composition-preview',
    reference: approvalReference,
    approvedAt: new Date().toISOString(),
    projects: inserts.map((insert) => ({id: insert.id, compositionId: insert.sourceSceneId})),
  };

  const insertReports = [];
  for (const insert of inserts) {
    if (!hasFrozenHandoff) runNpm(['run', 'render'], {cwd: insert.projectRoot});
    insertReports.push(await buildInsertReport(manifest, insert));
  }

  let handoff;
  if (existsSync(handoffPath)) {
    handoff = await readJson(handoffPath);
    await validateExistingHandoff(handoff, manifest, insertReports);
  } else {
    handoff = {
      schemaVersion: 1,
      frozenAt: new Date().toISOString(),
      approval: approvalReceipt,
      sceneContract: {
        path: relativeToRepo(manifestPath),
        sha256: await sha256(manifestPath),
      },
      rendererTheme: manifest.rendererTheme,
      inserts: insertReports,
    };
    await writeJsonAtomic(handoffPath, handoff);
  }

  runNpm(['run', 'stage'], {cwd: remotionRoot});
  const stagedReceipt = await validateStagedReceipt(manifest, insertReports);
  runNpm(['run', 'compositions'], {cwd: remotionRoot});
  runNpm(['run', 'render'], {cwd: remotionRoot});

  const master = await qcVideo({
    filePath: masterPath,
    label: 'Remotion master',
    expected: {
      width: manifest.resolution.width,
      height: manifest.resolution.height,
      fps: manifest.fps,
      durationSeconds: manifest.durationSeconds,
      frames: manifest.durationFrames,
      audio: 'required',
    },
  });

  await mkdir(evidenceRoot, {recursive: true});
  run('ffmpeg', [
      '-v',
      'error',
      '-n',
      '-i',
      masterPath,
      '-vf',
      'scale=1280:-2',
      '-c:v',
      'libx264',
      '-preset',
      'medium',
      '-b:v',
      '800k',
      '-maxrate',
      '900k',
      '-bufsize',
      '1800k',
      '-c:a',
      'aac',
      '-b:a',
      '128k',
      '-movflags',
      '+faststart',
      proxyPath,
    ]);
  const proxy = await qcVideo({
    filePath: proxyPath,
    label: 'Review proxy',
    expected: {
      width: 1280,
      height: 720,
      fps: manifest.fps,
      durationSeconds: manifest.durationSeconds,
      frames: manifest.durationFrames,
      audio: 'required',
      maxBytes: 10 * 1024 * 1024,
    },
  });

  const contactFrames = manifest.scenes.map(
    (scene) => scene.startFrame + Math.floor(scene.durationFrames / 2),
  );
  const selectExpression = contactFrames.map((frame) => `eq(n\\,${frame})`).join('+');
  run('ffmpeg', [
      '-v',
      'error',
      '-n',
      '-i',
      masterPath,
      '-vf',
      `select=${selectExpression},scale=640:-2,tile=4x2:padding=12:margin=12:color=0x0C1811`,
      '-frames:v',
      '1',
      '-update',
      '1',
      '-q:v',
      '2',
      contactSheetPath,
    ]);
  const contactSheet = await qcContactSheet(contactSheetPath);

  runNpm(['run', 'qa'], {cwd: repoRoot});

  const renderedPlacementCoverage = verifyAudioPlacements(manifest, masterPath);

  const transcriptCount = manifest.assets.filter(
    (asset) =>
      asset.kind === 'audio' &&
      typeof asset.transcript?.language === 'string' &&
      asset.transcript?.text?.trim(),
  ).length;
  const report = {
    schemaVersion: 1,
    completedAt: new Date().toISOString(),
    status: 'technical-pass-visual-review-pending',
    approval: handoff.approval,
    sceneContract: {
      path: relativeToRepo(manifestPath),
      sha256: await sha256(manifestPath),
      durationSeconds: manifest.durationSeconds,
      durationFrames: manifest.durationFrames,
      fps: manifest.fps,
      resolution: manifest.resolution,
      rendererTheme: manifest.rendererTheme,
    },
    toolchain,
    gates: {
      sceneContract: 'pass',
      hyperframesChecks: '2/2 pass',
      remotionTypecheck: 'pass',
      remotionCompositions: 'pass',
      ffprobeAndFullDecode: 'pass',
      rootQa: 'pass',
      visualReview: 'pending',
    },
    audioAndTranscriptCoverage: {
      nativeAudioAssets: manifest.assets.filter((asset) => asset.kind === 'audio').length,
      transcripts: transcriptCount,
      placements: manifest.audioPlacements.length,
      renderedPlacements: renderedPlacementCoverage,
      masterSignal: master.qc.audioSignal,
    },
    hyperframesInserts: insertReports,
    remotionMaster: master,
    reviewProxy: proxy,
    contactSheet: {
      ...contactSheet,
      sampleFrames: contactFrames,
      sceneIds: manifest.scenes.map((scene) => scene.id),
    },
    receipts: {
      insertHandoff: {
        path: relativeToRepo(handoffPath),
        sha256: await sha256(handoffPath),
      },
      stagedAssets: stagedReceipt,
    },
    commands: commandLog,
    knownWeaknesses: [
      'Owner, teacher, and learner apertures are designed placeholders; no real owner or approved fixed-cast footage is included.',
      'This 81-second mechanics proof is not one of the 56 launch masters and must never increment launch-complete inventory.',
      'The local full-resolution master has no delivery URL and has not been integrated or mobile-played in the learner app.',
    ],
  };
  await writeJsonAtomic(reportPath, report);

  console.log('\nTECHNICAL PASS v1-02 finalization');
  console.log(`- master: ${relativeToRepo(masterPath)}`);
  console.log(`- proxy: ${relativeToRepo(proxyPath)} (${proxy.sizeBytes} bytes)`);
  console.log(`- contact sheet: ${relativeToRepo(contactSheetPath)}`);
  console.log(`- render report: ${relativeToRepo(reportPath)}`);
  console.log('- remaining gate: inspect the MP4-derived contact sheet, then record visual PASS/WEAK/FAIL.');
};

const recordVisualReview = async () => {
  if (!['PASS', 'WEAK', 'FAIL'].includes(reviewResult) || !reviewReference) {
    fail(
      'Visual review requires --result=PASS|WEAK|FAIL and --review-reference=<reference> after inspecting the generated contact sheet.',
    );
  }
  if (!existsSync(reportPath)) fail(`Render report is missing: ${relativeToRepo(reportPath)}`);
  const report = await readJson(reportPath);
  requireExact(
    report.status,
    'technical-pass-visual-review-pending',
    'Render report status before visual review',
  );
  requireExact(
    report.contactSheet?.sha256,
    await sha256(contactSheetPath),
    'Contact-sheet hash before visual review',
  );
  requireExact(
    report.reviewProxy?.sha256,
    await sha256(proxyPath),
    'Review-proxy hash before visual review',
  );
  requireExact(
    report.remotionMaster?.sha256,
    await sha256(masterPath),
    'Remotion-master hash before visual review',
  );
  report.visualReview = {
    result: reviewResult,
    reference: reviewReference,
    reviewedAt: new Date().toISOString(),
    notes: reviewNotes || null,
    contactSheetSha256: report.contactSheet.sha256,
    proxySha256: report.reviewProxy.sha256,
  };
  report.gates.visualReview = reviewResult.toLowerCase();
  report.status = reviewResult === 'PASS' ? 'pass' : reviewResult.toLowerCase();
  await writeJsonAtomic(reportPath, report);
  console.log(`Recorded visual review ${reviewResult} in ${relativeToRepo(reportPath)}.`);
};

const main = async () => {
  if (!['preflight', 'render', 'review'].includes(mode)) {
    fail(`Unknown mode ${mode}. Use preflight, render, or review.`);
  }
  if (mode === 'render') {
    await renderApproved();
    return;
  }
  if (mode === 'review') {
    await recordVisualReview();
    return;
  }

  const {inserts} = await runPreflight({runHyperFramesChecks: fullChecks});
  const rendered = inserts.filter((insert) => existsSync(insert.artifactPathAbsolute)).length;
  console.log('\nPASS v1-02 preflight');
  console.log(`- HyperFrames checks: ${fullChecks ? 'upgrade probes + checks passed' : 'not rerun (use --full)'}`);
  console.log(`- frozen inserts: ${rendered}/${inserts.length}`);
  console.log('- render action: not taken');
  if (rendered === 0) {
    console.log(
      '- next gate: owner preview approval, then `node finalize.mjs render --approved --approval-reference=<reference>`',
    );
  }
};

main().catch((error) => {
  console.error(`\nFAIL v1-02 finalization\n${error.stack ?? error.message}`);
  process.exit(1);
});
