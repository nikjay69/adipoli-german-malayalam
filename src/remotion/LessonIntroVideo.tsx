import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
import { KuttanFrame, type KuttanMoodFrame } from './KuttanFrame';

export type ScriptBeat = {
  text: string;         // Manglish or English narration
  german?: string;      // Optional German phrase to highlight
  malayalam?: string;   // Optional Malayalam gloss to overlay
  mood?: KuttanMoodFrame;
  audioSrc?: string;    // Optional pre-generated TTS audio path (absolute or /public/ relative)
};

export type VocabCard = {
  german: string;
  english: string;
  malayalam: string;
  pronunciation: string;
};

export type LessonIntroProps = {
  lessonId: string;
  title: string;
  subtitle?: string;   // e.g. "Lesson 1-1 · Why Learn German?"
  accentColor?: string;
  scriptLines: ScriptBeat[];
  vocabCards?: VocabCard[];
  outroText?: string;
};

export const DEFAULT_LESSON_INTRO_PROPS: LessonIntroProps = {
  lessonId: 'demo',
  title: 'Why Learn German?',
  subtitle: 'Module 1 · Lesson 1',
  accentColor: '#d4a520',
  scriptLines: [
    { text: "Machaane! Why German? Njan parayaam.", mood: 'waving' },
    { text: "Germany is Europe's biggest economy — over 400 free universities.", german: "Freie Universitäten", mood: 'pointing' },
    { text: "For Malayalis — Ausbildung, nursing, IT — massive demand!", german: "Ausbildung", mood: 'happy' },
    { text: "First words: Deutsch, Deutschland, lernen. Padikkaam!", german: "Ich lerne Deutsch.", malayalam: "Njan German padikkunnu.", mood: 'celebrating' },
  ],
  vocabCards: [
    { german: 'Deutsch', english: 'German', malayalam: 'ജർമ്മൻ', pronunciation: 'doych' },
    { german: 'Deutschland', english: 'Germany', malayalam: 'ജർമ്മനി', pronunciation: 'doych-lant' },
    { german: 'lernen', english: 'to learn', malayalam: 'പഠിക്കുക', pronunciation: 'lair-nen' },
  ],
  outroText: 'Los geht\u2019s! Let\u2019s go!',
};

const FPS = 30;
const INTRO_FRAMES = 3 * FPS;
const PER_LINE_FRAMES = 5 * FPS;
const OUTRO_FRAMES = 3 * FPS;

export const LessonIntroVideo: React.FC<LessonIntroProps> = ({
  title,
  subtitle,
  accentColor = '#d4a520',
  scriptLines,
  vocabCards,
  outroText = 'Los geht\u2019s!',
}) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#0d1a0d', color: '#f5f0e8', fontFamily: 'sans-serif' }}>
      {/* Ambient background */}
      <AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -100,
            width: 900,
            height: 900,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}22 0%, transparent 60%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -100,
            width: 800,
            height: 800,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #27ae6033 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </AbsoluteFill>

      {/* Title card: 0 → INTRO_FRAMES */}
      <Sequence from={0} durationInFrames={INTRO_FRAMES}>
        <TitleCard title={title} subtitle={subtitle} accentColor={accentColor} />
      </Sequence>

      {/* Script beats */}
      {scriptLines.map((beat, i) => {
        const start = INTRO_FRAMES + i * PER_LINE_FRAMES;
        return (
          <Sequence key={i} from={start} durationInFrames={PER_LINE_FRAMES}>
            <ScriptBeatScene beat={beat} accentColor={accentColor} index={i} total={scriptLines.length} />
            {beat.audioSrc && <Audio src={staticFile(beat.audioSrc)} />}
          </Sequence>
        );
      })}

      {/* Optional vocab flash strip during the last line */}
      {vocabCards && vocabCards.length > 0 && (
        <Sequence
          from={INTRO_FRAMES + (scriptLines.length - 1) * PER_LINE_FRAMES}
          durationInFrames={PER_LINE_FRAMES + OUTRO_FRAMES}
        >
          <VocabStrip cards={vocabCards} accentColor={accentColor} />
        </Sequence>
      )}

      {/* Outro */}
      <Sequence from={INTRO_FRAMES + scriptLines.length * PER_LINE_FRAMES} durationInFrames={OUTRO_FRAMES}>
        <OutroCard text={outroText} accentColor={accentColor} />
      </Sequence>

      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          right: 56,
          fontSize: 24,
          letterSpacing: 4,
          opacity: 0.4,
          fontWeight: 700,
        }}
      >
        ADIPOLI GERMAN
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- Subcomponents ---------------- */

const TitleCard: React.FC<{ title: string; subtitle?: string; accentColor: string }> = ({ title, subtitle, accentColor }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15, 80, 90], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 30], [0.85, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity }}>
      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: 'center',
        }}
      >
        {subtitle && (
          <div
            style={{
              color: accentColor,
              fontSize: 32,
              letterSpacing: 8,
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 32,
              opacity: 0.85,
            }}
          >
            {subtitle}
          </div>
        )}
        <div
          style={{
            fontSize: 148,
            fontWeight: 900,
            lineHeight: 1.05,
            background: `linear-gradient(135deg, ${accentColor} 0%, #f5e6a8 50%, ${accentColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: -3,
          }}
        >
          {title}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScriptBeatScene: React.FC<{ beat: ScriptBeat; accentColor: string; index: number; total: number }> = ({ beat, accentColor, index, total }) => {
  const frame = useCurrentFrame();
  const textOpacity = interpolate(frame, [0, 20, PER_LINE_FRAMES - 20, PER_LINE_FRAMES], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ padding: '80px 120px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 80 }}>
      {/* Kuttan */}
      <div style={{ flex: '0 0 auto' }}>
        <KuttanFrame mood={beat.mood ?? 'happy'} size={520} />
      </div>

      {/* Speech card */}
      <div style={{ flex: 1, transform: `translateY(${textY}px)`, opacity: textOpacity }}>
        {/* Progress pips */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? 40 : 16,
                height: 6,
                borderRadius: 3,
                background: i <= index ? accentColor : 'rgba(245,240,232,0.2)',
                transition: 'width 300ms',
              }}
            />
          ))}
        </div>

        {/* Main narration */}
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.25,
            fontWeight: 700,
            marginBottom: beat.german || beat.malayalam ? 36 : 0,
          }}
        >
          {beat.text}
        </div>

        {/* Highlighted German phrase */}
        {beat.german && (
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: accentColor,
              padding: '18px 32px',
              background: `${accentColor}15`,
              border: `2px solid ${accentColor}40`,
              borderRadius: 18,
              display: 'inline-block',
              marginBottom: 16,
            }}
          >
            {beat.german}
          </div>
        )}

        {/* Malayalam gloss */}
        {beat.malayalam && (
          <div style={{ fontSize: 36, opacity: 0.7, fontStyle: 'italic' }}>
            {beat.malayalam}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

const VocabStrip: React.FC<{ cards: VocabCard[]; accentColor: string }> = ({ cards, accentColor }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 120,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 24,
        opacity,
      }}
    >
      {cards.map((card, i) => {
        const cardOpacity = interpolate(frame, [i * 8, i * 8 + 20], [0, 1], { extrapolateRight: 'clamp' });
        const cardY = interpolate(frame, [i * 8, i * 8 + 20], [20, 0], { extrapolateRight: 'clamp' });
        return (
          <div
            key={card.german}
            style={{
              opacity: cardOpacity,
              transform: `translateY(${cardY}px)`,
              background: 'rgba(245,240,232,0.08)',
              border: `2px solid ${accentColor}40`,
              borderRadius: 18,
              padding: '18px 24px',
              backdropFilter: 'blur(8px)',
              minWidth: 220,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 800, color: accentColor }}>{card.german}</div>
            <div style={{ fontSize: 18, opacity: 0.6, marginTop: 4 }}>[{card.pronunciation}]</div>
            <div style={{ fontSize: 20, opacity: 0.8, marginTop: 4 }}>{card.english}</div>
            <div style={{ fontSize: 22, opacity: 0.9, marginTop: 4, fontStyle: 'italic' }}>{card.malayalam}</div>
          </div>
        );
      })}
    </div>
  );
};

const OutroCard: React.FC<{ text: string; accentColor: string }> = ({ text, accentColor }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 20], [0.8, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [0, 15, OUTRO_FRAMES - 10, OUTRO_FRAMES], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity }}>
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          color: accentColor,
          transform: `scale(${scale})`,
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
