import rawSceneContract from '../../module-01-video-hybrid/lesson-01.scene.json';

export type AudioAsset = {
  id: string;
  kind: 'audio';
  publicPath: string;
  sha256: string;
  transcript: {language: string; text: string};
};

export type HyperFramesInsert = {
  id: string;
  engine: 'hyperframes';
  engineVersion: string;
  version: number;
  intent: string;
  sourceSceneId: string;
  durationSeconds: number;
  durationFrames: number;
  audioContract: 'silent';
  backgroundContract: string;
  alphaContract: 'opaque';
  safeArea: {
    mode: 'full-bleed';
    protectedInsetPx: {top: number; right: number; bottom: number; left: number};
    consumerOverlay: 'none';
  };
  sourcePath: string;
  artifactPath: string;
  sha256?: string;
};

export type LessonScene = {
  id: string;
  type:
    | 'lesson-hook'
    | 'listen-and-respond'
    | 'teaching-insert'
    | 'presenter-bridge'
    | 'timed-production'
    | 'dialogue-performance'
    | 'closed-recap';
  teachingIntent: string;
  castRole: 'owner-presenter' | 'german-teacher' | 'adult-learner';
  insertId?: string;
  startSeconds: number;
  durationSeconds: number;
  startFrame: number;
  durationFrames: number;
  assetIds: string[];
  caption: string;
};

export type SceneContract = {
  schemaVersion: number;
  id: string;
  title: string;
  fps: number;
  durationSeconds: number;
  durationFrames: number;
  resolution: {width: number; height: number};
  rendererTheme: string;
  castRoles: {
    presenter: 'owner-presenter';
    teacher: 'german-teacher';
    learner: 'adult-learner';
  };
  assets: AudioAsset[];
  inserts: HyperFramesInsert[];
  scenes: LessonScene[];
  audioPlacements: Array<{
    assetId: string;
    startSeconds: number;
    startFrame: number;
  }>;
};

export const sceneContract = rawSceneContract as SceneContract;

const fail = (message: string): never => {
  throw new Error(`Invalid M1L1 scene contract: ${message}`);
};

const validateContract = (contract: SceneContract) => {
  if (contract.schemaVersion !== 2) fail('schemaVersion must be 2.');
  if (!contract.rendererTheme.startsWith('2a-scenes-daylight')) {
    fail(`rendererTheme must select the fixed 2A Scenes & Daylight family; received ${contract.rendererTheme}.`);
  }
  if (contract.durationFrames !== contract.durationSeconds * contract.fps) {
    fail('master duration seconds and frames disagree.');
  }
  if (contract.inserts.length !== 2) {
    fail(`exactly two HyperFrames inserts are required; received ${contract.inserts.length}.`);
  }
  if (contract.inserts.some((insert) => insert.engine !== 'hyperframes')) {
    fail('both inserts must be produced by HyperFrames.');
  }
  if (
    new Set(contract.inserts.map((insert) => insert.engineVersion)).size !== 1 ||
    contract.inserts.some((insert) => !/^\d+\.\d+\.\d+$/.test(insert.engineVersion))
  ) {
    fail('both inserts must use one exact HyperFrames CLI version.');
  }
  if (contract.inserts.some((insert) => insert.audioContract !== 'silent')) {
    fail('both frozen inserts must remain silent.');
  }
  if (contract.inserts.some((insert) => insert.alphaContract !== 'opaque')) {
    fail('both frozen inserts must be opaque.');
  }
  if (
    contract.inserts.some(
      (insert) =>
        insert.safeArea.mode !== 'full-bleed' ||
        insert.safeArea.consumerOverlay !== 'none',
    )
  ) {
    fail('both inserts must declare full-bleed delivery with no Remotion overlay.');
  }

  let nextFrame = 0;
  for (const scene of contract.scenes) {
    if (scene.startFrame !== nextFrame) {
      fail(`scene ${scene.id} starts at ${scene.startFrame}, expected ${nextFrame}.`);
    }
    if (scene.durationFrames !== scene.durationSeconds * contract.fps) {
      fail(`scene ${scene.id} has inconsistent duration units.`);
    }
    nextFrame += scene.durationFrames;
  }
  if (nextFrame !== contract.durationFrames) {
    fail(`scene timeline ends at ${nextFrame}, expected ${contract.durationFrames}.`);
  }

  const insertScenes = contract.scenes.filter((scene) => scene.type === 'teaching-insert');
  if (insertScenes.length !== 2) fail('exactly two teaching-insert scenes are required.');
  for (const insert of contract.inserts) {
    const scene = insertScenes.find((candidate) => candidate.insertId === insert.id);
    if (!scene) throw new Error(`Invalid M1L1 scene contract: insert ${insert.id} has no owning scene.`);
    if (scene.id !== insert.sourceSceneId) fail(`insert ${insert.id} sourceSceneId does not match its scene.`);
    if (scene.durationFrames !== insert.durationFrames) fail(`insert ${insert.id} duration does not match its scene.`);
  }

  const assetIds = new Set(contract.assets.map((asset) => asset.id));
  for (const placement of contract.audioPlacements) {
    if (!assetIds.has(placement.assetId)) {
      fail(`audio placement references unknown asset ${placement.assetId}.`);
    }
    if (placement.startFrame !== placement.startSeconds * contract.fps) {
      fail(`audio placement for ${placement.assetId} has inconsistent time units.`);
    }
  }
};

validateContract(sceneContract);

export const assetById = new Map(
  sceneContract.assets.map((asset) => [asset.id, asset] as const),
);

export const insertById = new Map(
  sceneContract.inserts.map((insert) => [insert.id, insert] as const),
);

export const stagedAudioPath = (assetId: string) => {
  const asset = assetById.get(assetId);
  if (!asset) throw new Error(`Invalid M1L1 scene contract: unknown audio asset ${assetId}.`);
  const extension = asset.publicPath.includes('.')
    ? `.${asset.publicPath.split('.').pop()}`
    : '.mp3';
  return `audio/${asset.id}${extension}`;
};

export const stagedInsertPath = (insertId: string) => {
  if (!insertById.has(insertId)) fail(`unknown insert ${insertId}.`);
  return `inserts/${insertId}.mp4`;
};
