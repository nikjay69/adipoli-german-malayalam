import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

const sceneFrames = [210, 240, 240, 300, 240, 300, 240, 360, 300] as const;
export const DURATION_IN_FRAMES = sceneFrames.reduce((sum, value) => sum + value, 0);

const c = {
  canvas: '#0d1a0d',
  deep: '#081108',
  surface: '#162416',
  raised: '#203520',
  ink: '#f7f0dd',
  muted: '#c8c2b1',
  gold: '#f1d27a',
  goldDeep: '#b8891a',
  success: '#3fbf75',
  successInk: '#bcf7d0',
  danger: '#c0392b',
  dangerInk: '#ffc9c2',
  listening: '#9dc4ff',
};

const display = 'Oswald, Impact, Arial Narrow, sans-serif';
const teaching = 'EB Garamond, Georgia, Times New Roman, serif';
const chrome = 'IBM Plex Mono, Consolas, monospace';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const pop = (frame: number, fps: number, delay = 0) =>
  spring({frame: frame - delay, fps, config: {damping: 24, stiffness: 135, mass: 0.75}});

const opacity = (frame: number, duration: number) =>
  interpolate(frame, [0, 10, duration - 10, duration], [0, 1, 1, 0], clamp);

const Frame: React.FC<{
  children: React.ReactNode;
  scene: string;
  duration: number;
  accent?: string;
}> = ({children, scene, duration, accent = c.gold}) => {
  const frame = useCurrentFrame();
  const lightX = interpolate(frame, [0, duration], [-4, 4], clamp);
  return (
    <AbsoluteFill style={{background: c.canvas, color: c.ink, opacity: opacity(frame, duration)}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${72 + lightX}% 18%, ${accent}1a 0%, transparent 34%), radial-gradient(circle at 12% 92%, #2d6f4b22 0%, transparent 34%), linear-gradient(135deg, ${c.deep}, ${c.canvas} 56%, #10210f)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.04,
          backgroundImage:
            'radial-gradient(circle, #fff 0 1px, transparent 1px), radial-gradient(circle, #fff 0 1px, transparent 1px)',
          backgroundPosition: '0 0, 12px 12px',
          backgroundSize: '24px 24px',
          mixBlendMode: 'soft-light',
        }}
      />
      <div style={{position: 'absolute', left: 144, right: 144, top: 78, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: 14, alignItems: 'center', fontFamily: chrome, fontSize: 19, fontWeight: 700, letterSpacing: 2.2}}>
          <span style={{width: 14, height: 14, background: c.gold, borderRadius: 99}} />
          ADIPOLI GERMAN
        </div>
        <div style={{fontFamily: chrome, fontSize: 18, color: c.muted, letterSpacing: 2.2}}>M01 · L01 / {scene}</div>
      </div>
      <div style={{position: 'absolute', left: 144, right: 144, top: 126, height: 2, background: '#ffffff17'}} />
      {children}
      <div style={{position: 'absolute', left: 144, bottom: 48, fontFamily: chrome, fontSize: 15, letterSpacing: 2, color: '#9e9a8c'}}>GUTEN MORGEN · GRAPHICS REEL</div>
    </AbsoluteFill>
  );
};

const Label: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = c.gold}) => (
  <div style={{fontFamily: chrome, color, fontSize: 20, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase'}}>{children}</div>
);

const FirstSound: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phrase = pop(frame, fps, 10);
  const reply = pop(frame, fps, 86);
  const listening = frame < 86;
  return (
    <Frame scene="01 FIRST SOUND" duration={sceneFrames[0]} accent={c.listening}>
      <div style={{position: 'absolute', left: 144, right: 144, top: 190, bottom: 110, display: 'grid', gridTemplateColumns: '1.5fr .7fr', gap: 82, alignItems: 'center'}}>
        <div>
          <Label color={c.listening}>{listening ? 'Listen first' : 'Now answer aloud'}</Label>
          <div style={{fontFamily: teaching, fontSize: 150, lineHeight: .96, marginTop: 34, opacity: phrase, transform: `translateX(${(1 - phrase) * -44}px)`}}>
            Guten<br />Morgen.
          </div>
          <div style={{width: `${interpolate(frame, [15, 100], [0, 100], clamp)}%`, maxWidth: 760, height: 4, background: c.listening, marginTop: 38}} />
          <div style={{fontFamily: teaching, fontSize: 55, color: c.gold, marginTop: 34, opacity: reply, transform: `translateY(${(1 - reply) * 25}px)`}}>
            You: Guten Morgen, Frau Weber.
          </div>
        </div>
        <div style={{height: 560, borderRadius: 28, background: c.surface, border: `2px solid ${c.listening}55`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
          <div style={{width: 210, height: 210, borderRadius: 999, border: `3px solid ${c.listening}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 ${38 + Math.sin(frame / 7) * 10}px ${c.listening}25`}}>
            <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
              {Array.from({length: 9}, (_, i) => (
                <div key={i} style={{width: 7, height: 28 + Math.abs(Math.sin((frame + i * 5) / 7)) * 62, borderRadius: 99, background: c.listening}} />
              ))}
            </div>
          </div>
          <div style={{fontFamily: chrome, fontSize: 19, letterSpacing: 2, color: c.muted, marginTop: 44}}>FRAU WEBER · MODEL AUDIO</div>
        </div>
      </div>
      <Sequence from={24} durationInFrames={70}><Audio src={staticFile('audio/vocab/vocab1-3-2.mp3')} /></Sequence>
      <Sequence from={105} durationInFrames={70}><Audio src={staticFile('audio/vocab/vocab1-3-2.mp3')} /></Sequence>
    </Frame>
  );
};

const MeaningTable: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rows = [
    ['Guten Morgen', 'Good morning', 'morning'],
    ['Frau Weber', 'Ms / Mrs Weber', 'polite address'],
    ['Hallo', 'Hello', 'casual / neutral'],
  ];
  return (
    <Frame scene="02 MEANING" duration={sceneFrames[1]}>
      <div style={{position: 'absolute', left: 144, right: 144, top: 182}}>
        <Label>Orient</Label>
        <div style={{fontFamily: display, fontSize: 78, fontWeight: 700, textTransform: 'uppercase', marginTop: 20}}>WHAT JUST HAPPENED?</div>
        <div style={{marginTop: 54, borderTop: `3px solid ${c.gold}`}}>
          <div style={{display: 'grid', gridTemplateColumns: '1.35fr 1fr .9fr', padding: '20px 34px', fontFamily: chrome, fontSize: 18, letterSpacing: 2.5, color: c.muted}}>
            <div>GERMAN</div><div>MEANING</div><div>USE</div>
          </div>
          {rows.map((row, i) => {
            const p = pop(frame, fps, 22 + i * 24);
            return (
              <div key={row[0]} style={{display: 'grid', gridTemplateColumns: '1.35fr 1fr .9fr', alignItems: 'center', padding: '27px 34px', minHeight: 122, background: i === 0 ? c.raised : i % 2 ? '#ffffff08' : 'transparent', borderBottom: '2px solid #ffffff13', opacity: p, transform: `translateX(${(1 - p) * 35}px)`}}>
                <div style={{fontFamily: teaching, fontSize: 49, color: i === 0 ? c.gold : c.ink}}>{row[0]}</div>
                <div style={{fontFamily: teaching, fontSize: 37, color: c.muted}}>{row[1]}</div>
                <div><span style={{fontFamily: chrome, fontSize: 17, border: `2px solid ${i === 0 ? c.goldDeep : '#ffffff30'}`, borderRadius: 999, padding: '10px 16px', color: i === 0 ? c.gold : c.muted}}>{row[2]}</span></div>
              </div>
            );
          })}
        </div>
      </div>
    </Frame>
  );
};

const LearningLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const steps = ['WATCH', 'LISTEN', 'SAY', 'CHECK', 'FIX', 'CONTINUE'];
  const line = interpolate(frame, [26, 188], [0, 1], clamp);
  return (
    <Frame scene="03 LEARNING LOOP" duration={sceneFrames[2]} accent={c.listening}>
      <div style={{position: 'absolute', left: 144, right: 144, top: 190}}>
        <Label color={c.listening}>Exact action path</Label>
        <div style={{fontFamily: display, fontSize: 82, textTransform: 'uppercase', marginTop: 22}}>NO RESOURCE DUMPING.</div>
        <div style={{fontFamily: teaching, fontSize: 42, color: c.muted, marginTop: 12}}>One loop carries you from hearing to owning the sentence.</div>
        <div style={{position: 'relative', marginTop: 120}}>
          <div style={{position: 'absolute', left: 72, right: 72, top: 62, height: 4, background: '#ffffff20'}} />
          <div style={{position: 'absolute', left: 72, top: 62, height: 4, width: `calc((100% - 144px) * ${line})`, background: c.gold}} />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {steps.map((step, i) => {
              const p = pop(frame, fps, 22 + i * 24);
              return (
                <div key={step} style={{width: 220, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 28}px)`}}>
                  <div style={{width: 124, height: 124, margin: '0 auto 28px', borderRadius: 999, border: `3px solid ${i === 1 ? c.listening : i >= 4 ? c.success : c.gold}`, background: c.surface, display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: display, fontSize: 42, fontWeight: 700}}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{fontFamily: chrome, fontSize: 18, letterSpacing: 2.5, color: i === 1 ? c.listening : i >= 4 ? c.successInk : c.ink}}>{step}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Frame>
  );
};

const GreetingTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items = [
    ['08:00', 'MORNING', 'Guten Morgen'],
    ['14:00', 'DAY / FORMAL', 'Guten Tag'],
    ['19:00', 'EVENING', 'Guten Abend'],
    ['EXIT', 'LEAVING', 'Auf Wiedersehen'],
  ];
  const fill = interpolate(frame, [24, 220], [0, 1], clamp);
  return (
    <Frame scene="04 GREETING BY TIME" duration={sceneFrames[3]}>
      <div style={{position: 'absolute', left: 144, right: 144, top: 185}}>
        <Label>Choose by context</Label>
        <div style={{fontFamily: display, fontSize: 82, textTransform: 'uppercase', marginTop: 20}}>ONE DAY. FOUR SAFE MOVES.</div>
        <div style={{position: 'relative', marginTop: 128}}>
          <div style={{position: 'absolute', left: 72, right: 72, top: 92, height: 5, background: '#ffffff1d'}} />
          <div style={{position: 'absolute', left: 72, top: 92, height: 5, width: `calc((100% - 144px) * ${fill})`, background: c.gold}} />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {items.map(([time, context, phrase], i) => {
              const p = pop(frame, fps, 30 + i * 34);
              return (
                <div key={phrase} style={{width: 350, textAlign: 'center', opacity: p}}>
                  <div style={{fontFamily: chrome, color: c.muted, fontSize: 18, letterSpacing: 2}}>{time}</div>
                  <div style={{width: 78, height: 78, borderRadius: 999, margin: '34px auto', background: i === 0 ? c.gold : c.surface, border: `4px solid ${c.gold}`, boxShadow: `0 0 ${i === 0 ? 35 : 0}px ${c.gold}35`}} />
                  <div style={{fontFamily: chrome, color: c.gold, fontSize: 16, letterSpacing: 2}}>{context}</div>
                  <div style={{fontFamily: teaching, fontSize: 43, lineHeight: 1.04, marginTop: 18}}>{phrase}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Frame>
  );
};

const WrongBetter: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wrong = pop(frame, fps, 12);
  const right = pop(frame, fps, 70);
  return (
    <Frame scene="05 WRONG VS BETTER" duration={sceneFrames[4]} accent={c.danger}>
      <div style={{position: 'absolute', left: 144, right: 144, top: 190}}>
        <Label color={c.dangerInk}>Repair the trap</Label>
        <div style={{fontFamily: display, fontSize: 76, textTransform: 'uppercase', marginTop: 20}}>MEETING SOMEONE AT 7 PM?</div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 42, marginTop: 60}}>
          <div style={{height: 455, background: '#2a1714', border: `2px solid ${c.danger}`, borderRadius: 28, padding: 48, opacity: wrong, transform: `translateX(${(1 - wrong) * -40}px)`}}>
            <Label color={c.dangerInk}>Wrong hello</Label>
            <div style={{fontFamily: teaching, fontSize: 86, color: c.dangerInk, marginTop: 66}}>Gute Nacht</div>
            <div style={{fontFamily: teaching, fontSize: 34, color: c.muted, marginTop: 34}}>Keep this for bedtime.</div>
            <div style={{position: 'absolute', right: 70, bottom: 44, fontFamily: display, fontSize: 120, color: c.danger}}>×</div>
          </div>
          <div style={{height: 455, background: '#102b1b', border: `2px solid ${c.success}`, borderRadius: 28, padding: 48, opacity: right, transform: `translateX(${(1 - right) * 40}px)`}}>
            <Label color={c.successInk}>Better greeting</Label>
            <div style={{fontFamily: teaching, fontSize: 86, color: c.successInk, marginTop: 66}}>Guten Abend</div>
            <div style={{fontFamily: teaching, fontSize: 34, color: c.muted, marginTop: 34}}>The safe evening hello.</div>
            <div style={{position: 'absolute', right: 70, bottom: 50, fontFamily: display, fontSize: 100, color: c.success}}>✓</div>
          </div>
        </div>
      </div>
    </Frame>
  );
};

const FirstSentence: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = [['Ich', 'I'], ['lerne', 'am learning'], ['Deutsch.', 'German']];
  return (
    <Frame scene="06 FIRST SENTENCE" duration={sceneFrames[5]}>
      <div style={{position: 'absolute', left: 144, right: 144, top: 185}}>
        <Label>Own the sentence</Label>
        <div style={{fontFamily: teaching, fontSize: 118, lineHeight: 1, marginTop: 32}}>Ich lerne Deutsch.</div>
        <div style={{fontFamily: teaching, color: c.muted, fontSize: 42, marginTop: 20}}>I am learning German.</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 78}}>
          {words.map(([word, gloss], i) => {
            const p = pop(frame, fps, 28 + i * 34);
            return (
              <div key={word} style={{height: 280, borderRadius: 28, background: i === 2 ? c.raised : c.surface, borderTop: `5px solid ${i === 2 ? c.gold : '#ffffff25'}`, padding: 40, opacity: p, transform: `translateY(${(1 - p) * 38}px)`}}>
                <div style={{fontFamily: teaching, fontSize: 69, color: i === 2 ? c.gold : c.ink}}>{word}</div>
                <div style={{fontFamily: chrome, fontSize: 18, letterSpacing: 2, color: c.muted, marginTop: 56}}>{gloss.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
      </div>
      <Sequence from={150} durationInFrames={70}><Audio src={staticFile('audio/exercises/ex1-1-9-model.mp3')} /></Sequence>
      <Sequence from={222} durationInFrames={70}><Audio src={staticFile('audio/exercises/ex1-1-9-model.mp3')} /></Sequence>
    </Frame>
  );
};

const Pronunciation: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const left = pop(frame, fps, 16);
  const right = pop(frame, fps, 70);
  return (
    <Frame scene="07 PRONUNCIATION" duration={sceneFrames[6]} accent={c.listening}>
      <div style={{position: 'absolute', left: 144, right: 144, top: 185}}>
        <Label color={c.listening}>Refine, don’t freeze</Label>
        <div style={{fontFamily: display, fontSize: 78, textTransform: 'uppercase', marginTop: 20}}>UNDERSTANDABLE BEATS PERFECT.</div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 42, marginTop: 62}}>
          <div style={{height: 430, borderRadius: 28, background: c.surface, padding: 50, border: `2px solid ${c.listening}55`, opacity: left, transform: `translateX(${(1 - left) * -38}px)`}}>
            <div style={{fontFamily: teaching, color: c.listening, fontSize: 110}}>Ich</div>
            <div style={{fontFamily: chrome, color: c.dangerInk, fontSize: 23, marginTop: 34, letterSpacing: 2}}>NOT “ISH”</div>
            <div style={{fontFamily: teaching, fontSize: 35, color: c.muted, lineHeight: 1.35, marginTop: 32}}>Use a soft breathy <em>ch</em>. Keep it light.</div>
          </div>
          <div style={{height: 430, borderRadius: 28, background: c.raised, padding: 50, border: `2px solid ${c.goldDeep}`, opacity: right, transform: `translateX(${(1 - right) * 38}px)`}}>
            <div style={{fontFamily: teaching, color: c.gold, fontSize: 110}}>Deutsch</div>
            <div style={{fontFamily: chrome, color: c.successInk, fontSize: 23, marginTop: 34, letterSpacing: 2}}>≈ “DOYCH”</div>
            <div style={{fontFamily: teaching, fontSize: 35, color: c.muted, lineHeight: 1.35, marginTop: 32}}>One compact syllable. Finish with <em>ch</em>.</div>
          </div>
        </div>
      </div>
    </Frame>
  );
};

const TinyDialogue: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lines = [
    ['FRAU WEBER', 'Guten Morgen.', true, 18],
    ['YOU', 'Guten Morgen, Frau Weber.', false, 84],
    ['FRAU WEBER', 'Lernen Sie Deutsch?', true, 162],
    ['YOU', 'Ja. Ich lerne Deutsch.', false, 238],
  ] as const;
  return (
    <Frame scene="08 TINY DIALOGUE" duration={sceneFrames[7]} accent={c.listening}>
      <div style={{position: 'absolute', left: 144, right: 144, top: 176, display: 'grid', gridTemplateColumns: '.65fr 1.35fr', gap: 78}}>
        <div>
          <Label color={c.listening}>Perform</Label>
          <div style={{fontFamily: display, fontSize: 88, lineHeight: 1, textTransform: 'uppercase', marginTop: 24}}>YOUR FIRST<br />EXCHANGE.</div>
          <div style={{fontFamily: teaching, fontSize: 37, color: c.muted, lineHeight: 1.35, marginTop: 42}}>Listen to Frau Weber.<br />Read only <span style={{color: c.gold}}>your</span> lines aloud.</div>
          <div style={{width: 240, height: 4, background: c.gold, marginTop: 50}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          {lines.map(([speaker, text, teacherLine, from], i) => {
            const p = pop(frame, fps, from);
            const active = frame >= from && frame < (lines[i + 1]?.[3] ?? 360);
            return (
              <div key={`${speaker}-${text}`} style={{width: '84%', alignSelf: teacherLine ? 'flex-start' : 'flex-end', borderLeft: teacherLine ? `5px solid ${c.listening}` : 'none', borderRight: teacherLine ? 'none' : `5px solid ${c.gold}`, background: active ? c.raised : c.surface, padding: '23px 30px', opacity: p, transform: `translateY(${(1 - p) * 24}px)`, boxShadow: active ? `0 0 32px ${teacherLine ? c.listening : c.gold}15` : 'none'}}>
                <div style={{fontFamily: chrome, fontSize: 16, letterSpacing: 2.2, color: teacherLine ? c.listening : c.gold}}>{speaker}</div>
                <div style={{fontFamily: teaching, fontSize: 40, marginTop: 4, color: active ? c.ink : c.muted}}>{text}</div>
              </div>
            );
          })}
        </div>
      </div>
      <Sequence from={30} durationInFrames={70}><Audio src={staticFile('audio/vocab/vocab1-3-2.mp3')} /></Sequence>
      <Sequence from={250} durationInFrames={70}><Audio src={staticFile('audio/exercises/ex1-1-9-model.mp3')} /></Sequence>
    </Frame>
  );
};

const CheckRecap: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items = ['Guten Morgen, Frau Weber.', 'Ich lerne Deutsch.', 'Auf Wiedersehen.'];
  return (
    <Frame scene="09 CHECK + CTA" duration={sceneFrames[8]}>
      <div style={{position: 'absolute', left: 144, right: 144, top: 178, display: 'grid', gridTemplateColumns: '.82fr 1.18fr', gap: 78}}>
        <div>
          <Label>Closed check</Label>
          <div style={{fontFamily: display, fontSize: 78, textTransform: 'uppercase', lineHeight: 1.02, marginTop: 24}}>NO NOTES.<br />NO GOOGLE.</div>
          <div style={{fontFamily: teaching, fontSize: 37, color: c.muted, lineHeight: 1.35, marginTop: 36}}>Find the weak spot.<br />Then fix it.</div>
          <div style={{marginTop: 55, display: 'inline-flex', alignItems: 'center', gap: 18, border: `2px solid ${c.goldDeep}`, borderRadius: 999, padding: '16px 24px', fontFamily: chrome, fontSize: 17, letterSpacing: 1.6}}><span style={{color: c.gold}}>→</span> PRACTICE: ANSWER FRAU WEBER</div>
        </div>
        <div>
          <Label color={c.successInk}>You can now say</Label>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30}}>
            {items.map((item, i) => {
              const p = pop(frame, fps, 24 + i * 25);
              return (
                <div key={item} style={{background: c.surface, borderRadius: 20, padding: '26px 30px', borderLeft: `5px solid ${i === 2 ? c.gold : c.success}`, fontFamily: teaching, fontSize: 42, opacity: p, transform: `translateX(${(1 - p) * 35}px)`}}><span style={{fontFamily: chrome, color: c.success, fontSize: 22, marginRight: 24}}>✓</span>{item}</div>
              );
            })}
          </div>
          <div style={{fontFamily: chrome, fontSize: 17, letterSpacing: 2, color: c.muted, marginTop: 40}}>WEAKNESS IS DATA, NOT SHAME.</div>
        </div>
      </div>
      <Sequence from={182} durationInFrames={70}><Audio src={staticFile('audio/vocab/vocab1-4-1.mp3')} /></Sequence>
    </Frame>
  );
};

export const FairModule01Lesson01: React.FC = () => {
  const scenes = [<FirstSound />, <MeaningTable />, <LearningLoop />, <GreetingTimeline />, <WrongBetter />, <FirstSentence />, <Pronunciation />, <TinyDialogue />, <CheckRecap />];
  let from = 0;
  return (
    <AbsoluteFill style={{background: c.canvas}}>
      {scenes.map((scene, i) => {
        const start = from;
        from += sceneFrames[i];
        return <Sequence key={i} from={start} durationInFrames={sceneFrames[i]} premountFor={FPS}>{scene}</Sequence>;
      })}
    </AbsoluteFill>
  );
};
