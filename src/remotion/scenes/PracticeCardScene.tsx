import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { KuttanFrame } from '../KuttanFrame';

type Scene = { promptEn: string; tryDe: string; answerDe: string; answerEn: string };

type Props = { scene: Scene; accent: string };

export const PracticeCardScene: React.FC<Props> = ({ scene, accent }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const revealAtFrame = Math.floor(durationInFrames * 0.55);
  const revealOpacity = interpolate(frame - revealAtFrame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const promptOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  // Countdown 3..2..1 between prompt and reveal
  const countdownStart = Math.floor(durationInFrames * 0.18);
  const countdownEnd = revealAtFrame;
  const countdownDur = countdownEnd - countdownStart;
  const inCountdown = frame >= countdownStart && frame < countdownEnd;
  const countdownNum = inCountdown ? Math.max(1, 3 - Math.floor(((frame - countdownStart) / countdownDur) * 3)) : null;

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '120px 160px' }}>
      <div style={{ position: 'absolute', right: 80, bottom: 60 }}>
        <KuttanFrame mood="thinking" size={280} />
      </div>
      <div style={{ opacity: promptOpacity }}>
        <div style={{ fontSize: 24, color: accent, letterSpacing: 3, textTransform: 'uppercase' }}>Practice</div>
        <div style={{ fontSize: 48, color: '#f5f0e8', marginTop: 12, maxWidth: 1400 }}>{scene.promptEn}</div>
        <div style={{ fontSize: 56, fontWeight: 700, color: accent, marginTop: 32 }}>{scene.tryDe}</div>
      </div>
      {countdownNum !== null ? (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 240, fontWeight: 900, color: `${accent}66` }}>
          {countdownNum}
        </div>
      ) : null}
      {frame >= revealAtFrame ? (
        <div style={{ marginTop: 64, opacity: revealOpacity }}>
          <div style={{ fontSize: 22, color: accent, letterSpacing: 2 }}>ANSWER</div>
          <div style={{ fontSize: 64, fontWeight: 800, color: '#f5f0e8', marginTop: 8 }}>{scene.answerDe}</div>
          <div style={{ fontSize: 32, color: 'rgba(245,240,232,0.7)', fontStyle: 'italic', marginTop: 6 }}>{scene.answerEn}</div>
        </div>
      ) : null}
    </div>
  );
};
