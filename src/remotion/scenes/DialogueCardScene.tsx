import { Audio, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type DialogueLine = { speaker: string; de: string; en: string };

type Scene = { lines: DialogueLine[]; visual?: string };

type Props = { scene: Scene; accent: string; audioSrcs?: string[] };

export const DialogueCardScene: React.FC<Props> = ({ scene, accent, audioSrcs = [] }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const linesPerStage = Math.max(1, scene.lines.length);
  const framesPerLine = durationInFrames / linesPerStage;
  const visibleCount = Math.min(scene.lines.length, Math.floor(frame / framesPerLine) + 1);

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '120px 160px', display: 'flex', flexDirection: 'column' }}>
      {audioSrcs.map((src, i) => (
        <Audio key={i} src={src} startFrom={Math.floor(i * framesPerLine)} />
      ))}
      {scene.visual ? (
        <div style={{ fontSize: 22, color: accent, letterSpacing: 3, marginBottom: 32 }}>SCENE: {scene.visual}</div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {scene.lines.slice(0, visibleCount).map((line, idx) => {
          const lineFromFrame = idx * framesPerLine;
          const lineOpacity = interpolate(frame - lineFromFrame, [0, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const slide = interpolate(frame - lineFromFrame, [0, 16], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <div key={idx} style={{ opacity: lineOpacity, transform: `translateX(${slide}px)` }}>
              <div style={{ fontSize: 22, color: accent, letterSpacing: 2, textTransform: 'uppercase' }}>{line.speaker}</div>
              <div style={{ fontSize: 56, fontWeight: 700, color: '#f5f0e8', marginTop: 6 }}>{line.de}</div>
              <div style={{ fontSize: 28, color: 'rgba(245,240,232,0.7)', fontStyle: 'italic', marginTop: 4 }}>{line.en}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
