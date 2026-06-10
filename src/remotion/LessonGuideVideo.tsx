import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { KuttanFrame, type KuttanMoodFrame } from './KuttanFrame';
import { TitleCard } from './scenes/TitleCard';
import { SectionHeaderCard } from './scenes/SectionHeaderCard';
import { VocabCardScene } from './scenes/VocabCardScene';
import { DialogueCardScene } from './scenes/DialogueCardScene';
import { PracticeCardScene } from './scenes/PracticeCardScene';
import { RecapCardScene } from './scenes/RecapCardScene';

// One scene per parsed markdown section/element. Composition iterates these
// and emits a Sequence per scene with a deterministic frame budget.

export type GuideScene =
  | { kind: 'title'; titleDe: string; titleEn: string; durationSec?: number }
  | { kind: 'section'; sectionLabel: string; timestamp: string; visual?: string; durationSec?: number }
  | { kind: 'vocab'; german: string; english: string; malayalam?: string; example?: string; exampleEn?: string; audioId?: string; durationSec?: number }
  | { kind: 'dialogue'; lines: { speaker: string; de: string; en: string }[]; visual?: string; audioIds?: string[]; durationSec?: number }
  | { kind: 'practice'; promptEn: string; tryDe: string; answerDe: string; answerEn: string; durationSec?: number }
  | { kind: 'recap'; vocab: { de: string; en: string }[]; grammar: string[]; nextTeaser: string; durationSec?: number };

export type LessonGuideProps = {
  moduleId: number;
  titleEn: string;
  titleDe: string;
  accentColor?: string;
  scenes: GuideScene[];
  /** When true, audio MP3s are expected at /public/audio/module-XX/<audioId>.mp3 */
  hasAudio?: boolean;
};

export const FPS = 30;

const DEFAULT_DURATIONS: Record<GuideScene['kind'], number> = {
  title: 4,
  section: 3,
  vocab: 6,
  dialogue: 8,
  practice: 9,
  recap: 10,
};

export function sceneDurationSec(scene: GuideScene): number {
  return scene.durationSec ?? DEFAULT_DURATIONS[scene.kind];
}

export function totalDurationFrames(scenes: GuideScene[]): number {
  const totalSec = scenes.reduce((acc, s) => acc + sceneDurationSec(s), 0);
  return Math.ceil(totalSec * FPS);
}

export const DEFAULT_LESSON_GUIDE_PROPS: LessonGuideProps = {
  moduleId: 0,
  titleEn: 'Demo Module',
  titleDe: 'Demo-Modul',
  accentColor: '#d4a520',
  hasAudio: false,
  scenes: [
    { kind: 'title', titleDe: 'Demo-Modul', titleEn: 'Demo Module' },
    { kind: 'section', sectionLabel: 'Intro & Hook', timestamp: '00:00', visual: 'Kuttan in Berlin Hauptbahnhof, dusk' },
    { kind: 'vocab', german: 'der Bahnhof', english: 'train station', malayalam: 'റെയിൽവേ സ്റ്റേഷൻ', example: 'Wo ist der Bahnhof?', exampleEn: 'Where is the train station?' },
    { kind: 'dialogue', lines: [
      { speaker: 'Kuttan', de: 'Guten Tag!', en: 'Good day!' },
      { speaker: 'Reisender', de: 'Hallo, wie geht es Ihnen?', en: 'Hello, how are you?' },
    ], visual: 'Bakery counter' },
    { kind: 'practice', promptEn: 'Ask where the train station is in German.', tryDe: 'Wo ist ____?', answerDe: 'Wo ist der Bahnhof?', answerEn: 'Where is the train station?' },
    { kind: 'recap', vocab: [{ de: 'der Bahnhof', en: 'train station' }], grammar: ['Question word: Wo? = Where?'], nextTeaser: 'Next module: ordering food in a Bäckerei.' },
  ],
};

export const LessonGuideVideo: React.FC<LessonGuideProps> = ({ moduleId, titleEn, titleDe, accentColor = '#d4a520', scenes, hasAudio = false }) => {
  const { width } = useVideoConfig();
  let cursor = 0;

  return (
    <AbsoluteFill style={{ background: '#0d1a0d', color: '#f5f0e8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Ambient wash */}
      <AbsoluteFill>
        <div style={{ position: 'absolute', top: -200, right: -200, width: 1000, height: 1000, borderRadius: '50%', background: `radial-gradient(circle, ${accentColor}22 0%, transparent 60%)`, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: -300, left: -200, width: 1000, height: 1000, borderRadius: '50%', background: `radial-gradient(circle, #2c5530AA 0%, transparent 60%)`, filter: 'blur(80px)' }} />
      </AbsoluteFill>

      {/* Persistent module banner */}
      <div style={{ position: 'absolute', top: 24, left: 32, fontSize: 22, opacity: 0.7, letterSpacing: 2 }}>
        ADIPOLI · MODULE {moduleId.toString().padStart(2, '0')} · {titleDe}
      </div>

      {scenes.map((scene, idx) => {
        const fromFrame = cursor;
        const dur = Math.ceil(sceneDurationSec(scene) * FPS);
        cursor += dur;
        return (
          <Sequence key={idx} from={fromFrame} durationInFrames={dur}>
            {renderScene(scene, accentColor, moduleId, hasAudio)}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

function renderScene(scene: GuideScene, accent: string, moduleId: number, hasAudio: boolean) {
  switch (scene.kind) {
    case 'title':
      return <TitleCard titleDe={scene.titleDe} titleEn={scene.titleEn} accent={accent} />;
    case 'section':
      return <SectionHeaderCard label={scene.sectionLabel} timestamp={scene.timestamp} visual={scene.visual} accent={accent} />;
    case 'vocab':
      return <VocabCardScene scene={scene} accent={accent} audioSrc={audioSrcFor(scene.audioId, moduleId, hasAudio)} />;
    case 'dialogue':
      return <DialogueCardScene scene={scene} accent={accent} audioSrcs={(scene.audioIds ?? []).map((id) => audioSrcFor(id, moduleId, hasAudio)).filter(Boolean) as string[]} />;
    case 'practice':
      return <PracticeCardScene scene={scene} accent={accent} />;
    case 'recap':
      return <RecapCardScene scene={scene} accent={accent} />;
  }
}

function audioSrcFor(audioId: string | undefined, moduleId: number, hasAudio: boolean): string | undefined {
  if (!hasAudio || !audioId) return undefined;
  return staticFile(`audio/module-${moduleId.toString().padStart(2, '0')}/${audioId}.mp3`);
}
