import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {sceneContract, stagedAudioPath} from './contract';
import {SceneView} from './components/Scenes';
import {colors, fonts} from './theme';
import './fonts';

export const LessonMaster: React.FC = () => (
  <AbsoluteFill
    style={{
      background: colors.forest,
      fontFamily: fonts.ui,
      WebkitFontSmoothing: 'antialiased',
    }}
  >
    {sceneContract.scenes.map((scene, sceneIndex) => (
      <Sequence
        key={scene.id}
        name={`${String(sceneIndex + 1).padStart(2, '0')} · ${scene.id}`}
        from={scene.startFrame}
        durationInFrames={scene.durationFrames}
        premountFor={sceneContract.fps}
      >
        <SceneView scene={scene} sceneIndex={sceneIndex} />
      </Sequence>
    ))}

    {sceneContract.audioPlacements.map((placement, placementIndex) => (
      <Sequence
        key={`${placement.assetId}-${placement.startFrame}-${placementIndex}`}
        name={`Native German · ${placement.assetId}`}
        from={placement.startFrame}
        durationInFrames={sceneContract.durationFrames - placement.startFrame}
        premountFor={15}
      >
        <Audio src={staticFile(stagedAudioPath(placement.assetId))} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
