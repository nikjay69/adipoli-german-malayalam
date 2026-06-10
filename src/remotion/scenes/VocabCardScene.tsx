import { Audio, interpolate, useCurrentFrame } from 'remotion';
import { KuttanFrame } from '../KuttanFrame';

type Scene = {
  german: string;
  english: string;
  malayalam?: string;
  example?: string;
  exampleEn?: string;
};

type Props = { scene: Scene; accent: string; audioSrc?: string };

export const VocabCardScene: React.FC<Props> = ({ scene, accent, audioSrc }) => {
  const frame = useCurrentFrame();
  const cardScale = interpolate(frame, [0, 12], [0.92, 1], { extrapolateRight: 'clamp' });
  const fadeIn = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {audioSrc ? <Audio src={audioSrc} /> : null}
      <div style={{ position: 'absolute', right: 80, bottom: 60 }}>
        <KuttanFrame mood="pointing" size={300} />
      </div>
      <div style={{
        background: 'rgba(20,40,30,0.85)',
        border: `2px solid ${accent}`,
        borderRadius: 24,
        padding: '64px 96px',
        minWidth: 900,
        maxWidth: 1300,
        opacity: fadeIn,
        transform: `scale(${cardScale})`,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}>
        <div style={{ fontSize: 28, color: accent, letterSpacing: 3, marginBottom: 8 }}>VOCAB</div>
        <div style={{ fontSize: 96, fontWeight: 800, color: '#f5f0e8' }}>{scene.german}</div>
        <div style={{ fontSize: 44, fontWeight: 500, color: '#f5f0e8', marginTop: 8 }}>{scene.english}</div>
        {scene.malayalam ? <div style={{ fontSize: 36, color: accent, marginTop: 6 }}>{scene.malayalam}</div> : null}
        {scene.example ? (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${accent}55` }}>
            <div style={{ fontSize: 32, fontWeight: 600, color: '#f5f0e8' }}>{scene.example}</div>
            {scene.exampleEn ? <div style={{ fontSize: 24, color: 'rgba(245,240,232,0.7)', marginTop: 6, fontStyle: 'italic' }}>{scene.exampleEn}</div> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
