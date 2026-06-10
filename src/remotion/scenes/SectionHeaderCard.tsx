import { interpolate, useCurrentFrame } from 'remotion';

type Props = { label: string; timestamp: string; visual?: string; accent: string };

export const SectionHeaderCard: React.FC<Props> = ({ label, timestamp, visual, accent }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: fadeIn }}>
      <div style={{ fontSize: 36, color: accent, letterSpacing: 4, marginBottom: 16 }}>[{timestamp}]</div>
      <div style={{ fontSize: 88, fontWeight: 700, color: '#f5f0e8', textAlign: 'center', maxWidth: 1400 }}>{label}</div>
      {visual ? (
        <div style={{ marginTop: 32, fontSize: 24, fontStyle: 'italic', color: 'rgba(245,240,232,0.65)', maxWidth: 1200, textAlign: 'center' }}>
          [VISUAL] {visual}
        </div>
      ) : null}
    </div>
  );
};
