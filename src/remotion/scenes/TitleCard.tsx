import { interpolate, useCurrentFrame } from 'remotion';
import { KuttanFrame } from '../KuttanFrame';

type Props = { titleDe: string; titleEn: string; accent: string };

export const TitleCard: React.FC<Props> = ({ titleDe, titleEn, accent }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const slideUp = interpolate(frame, [0, 24], [40, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', left: 120, bottom: 80 }}>
        <KuttanFrame mood="waving" size={420} />
      </div>
      <div style={{ textAlign: 'center', opacity: fadeIn, transform: `translateY(${slideUp}px)` }}>
        <div style={{ fontSize: 96, fontWeight: 800, color: '#f5f0e8', letterSpacing: -2 }}>{titleDe}</div>
        <div style={{ fontSize: 56, fontWeight: 500, color: accent, marginTop: 8 }}>{titleEn}</div>
      </div>
    </div>
  );
};
