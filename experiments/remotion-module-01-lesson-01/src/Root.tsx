import React from 'react';
import {Composition} from 'remotion';
import {
  FairModule01Lesson01,
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  WIDTH,
} from './FairModule01Lesson01';

export const Root: React.FC = () => (
  <Composition
    id="Module01Lesson01"
    component={FairModule01Lesson01}
    durationInFrames={DURATION_IN_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
