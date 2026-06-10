import { Composition } from 'remotion';
import { LessonIntroVideo, DEFAULT_LESSON_INTRO_PROPS } from './LessonIntroVideo';
import {
  LessonGuideVideo,
  DEFAULT_LESSON_GUIDE_PROPS,
  totalDurationFrames,
  FPS as GUIDE_FPS,
} from './LessonGuideVideo';

// Fixed timing: each script beat takes ~5 seconds on screen.
// durationInFrames = sum(script beats) * fps + intro/outro padding.
const FPS = 30;

function computeDurationFrames(scriptLineCount: number): number {
  const INTRO_SEC = 3;
  const PER_LINE_SEC = 5;
  const OUTRO_SEC = 3;
  return (INTRO_SEC + scriptLineCount * PER_LINE_SEC + OUTRO_SEC) * FPS;
}

export const Root = () => {
  const defaultFrames = computeDurationFrames(DEFAULT_LESSON_INTRO_PROPS.scriptLines.length);
  return (
    <>
      <Composition
        id="LessonIntro"
        component={LessonIntroVideo}
        durationInFrames={defaultFrames}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={DEFAULT_LESSON_INTRO_PROPS}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: computeDurationFrames(props.scriptLines.length),
          };
        }}
      />
      <Composition
        id="LessonGuide"
        component={LessonGuideVideo}
        durationInFrames={totalDurationFrames(DEFAULT_LESSON_GUIDE_PROPS.scenes)}
        fps={GUIDE_FPS}
        width={1920}
        height={1080}
        defaultProps={DEFAULT_LESSON_GUIDE_PROPS}
        calculateMetadata={({ props }) => {
          return { durationInFrames: totalDurationFrames(props.scenes) };
        }}
      />
    </>
  );
};
