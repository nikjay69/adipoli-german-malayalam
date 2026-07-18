import React from 'react';
import {Composition} from 'remotion';
import {sceneContract} from './contract';
import {LessonMaster} from './LessonMaster';

export const Root: React.FC = () => (
  <Composition
    id="V1M1L1Proof"
    component={LessonMaster}
    durationInFrames={sceneContract.durationFrames}
    fps={sceneContract.fps}
    width={sceneContract.resolution.width}
    height={sceneContract.resolution.height}
    defaultProps={{}}
  />
);
