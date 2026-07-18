import {interpolate} from 'remotion';

export const colors = {
  daylight: '#F5F0E8',
  daylightLayer: '#EFE9DC',
  daylightShade: '#E9E4D8',
  answerSheet: '#F7EAD0',
  forest: '#0C1811',
  forestLayer: '#102018',
  forestRaised: '#12241A',
  forestWarm: '#16281C',
  gold: '#D4A520',
  lightGold: '#F1D27A',
  chai: '#8A5A2A',
  lightInk: '#3F4D44',
  lightMuted: '#66756A',
  darkInk: '#C8D0C9',
  darkMuted: '#8FA093',
  success: '#1F7A44',
  successDark: '#4FC07A',
  recovery: '#B95B33',
  recoveryDark: '#E08A5E',
  white: '#FFFDF8',
} as const;

export const fonts = {
  display: '"Source Serif 4", "Iowan Old Style", Georgia, serif',
  german: '"Source Serif 4", "Iowan Old Style", Georgia, serif',
  ui: 'Geist, Inter, "Segoe UI", sans-serif',
  mono: '"Geist Mono", "SFMono-Regular", Consolas, monospace',
} as const;

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

export const sceneOpacity = (frame: number, durationInFrames: number) =>
  interpolate(
    frame,
    [0, 8, Math.max(9, durationInFrames - 7), durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

export const easeOut = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], clamp);
