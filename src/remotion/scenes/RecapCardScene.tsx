import { interpolate, useCurrentFrame } from 'remotion';
import { KuttanFrame } from '../KuttanFrame';

type Scene = { vocab: { de: string; en: string }[]; grammar: string[]; nextTeaser: string };

type Props = { scene: Scene; accent: string };

export const RecapCardScene: React.FC<Props> = ({ scene, accent }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '120px 160px', display: 'flex', flexDirection: 'column', gap: 32, opacity: fadeIn }}>
      <div style={{ position: 'absolute', right: 100, bottom: 60 }}>
        <KuttanFrame mood="celebrating" size={320} />
      </div>
      <div style={{ fontSize: 28, color: accent, letterSpacing: 4, textTransform: 'uppercase' }}>Recap</div>

      <div>
        <div style={{ fontSize: 36, color: '#f5f0e8', marginBottom: 12, fontWeight: 600 }}>Key vocab</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 64px', maxWidth: 1400 }}>
          {scene.vocab.slice(0, 8).map((v, i) => (
            <div key={i} style={{ fontSize: 28, color: '#f5f0e8' }}>
              <span style={{ fontWeight: 700, color: accent }}>{v.de}</span>
              <span style={{ opacity: 0.7 }}> — {v.en}</span>
            </div>
          ))}
        </div>
      </div>

      {scene.grammar.length > 0 ? (
        <div>
          <div style={{ fontSize: 36, color: '#f5f0e8', marginBottom: 12, fontWeight: 600 }}>Grammar</div>
          {scene.grammar.slice(0, 3).map((g, i) => (
            <div key={i} style={{ fontSize: 26, color: 'rgba(245,240,232,0.85)', marginBottom: 6 }}>• {g}</div>
          ))}
        </div>
      ) : null}

      <div style={{ marginTop: 'auto', borderTop: `1px solid ${accent}55`, paddingTop: 24 }}>
        <div style={{ fontSize: 22, color: accent, letterSpacing: 3 }}>NEXT MODULE</div>
        <div style={{ fontSize: 32, color: '#f5f0e8', marginTop: 6, maxWidth: 1400 }}>{scene.nextTeaser}</div>
      </div>
    </div>
  );
};
