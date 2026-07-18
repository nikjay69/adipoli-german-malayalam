import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type {LessonScene} from '../contract';
import {stagedInsertPath} from '../contract';
import {colors, fonts, clamp, easeOut} from '../theme';
import {
  DaylightRoom,
  ForestRoom,
  LowerThird,
  PaperSheet,
  PresenterAperture,
  SceneFlag,
  SoundRings,
  SubtitleLine,
} from './Primitives';

type SceneProps = {
  scene: LessonScene;
  sceneIndex: number;
};

const entrance = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: {damping: 24, stiffness: 110, mass: 0.85},
  });

const SceneFrame: React.FC<
  SceneProps & {
    tone: 'daylight' | 'forest';
    children: React.ReactNode;
    warming?: boolean;
  }
> = ({scene, tone, children, warming = false}) => {
  const room = (
    <>
      {children}
      <SubtitleLine
        caption={scene.caption}
        onDark={tone === 'forest'}
      />
    </>
  );
  return tone === 'daylight' ? (
    <DaylightRoom durationInFrames={scene.durationFrames}>{room}</DaylightRoom>
  ) : (
    <ForestRoom durationInFrames={scene.durationFrames} warming={warming}>
      {room}
    </ForestRoom>
  );
};

const HookScene: React.FC<SceneProps> = ({scene, sceneIndex}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const headline = entrance(frame, fps, 10);
  const guide = entrance(frame, fps, 34);
  const goldLine = interpolate(frame, [24, 120], [0, 560], clamp);
  return (
    <SceneFrame scene={scene} sceneIndex={sceneIndex} tone="daylight">
      <div
        style={{
          position: 'absolute',
          left: 118,
          right: 104,
          top: 86,
          bottom: 104,
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.75fr',
          alignItems: 'center',
          gap: 80,
        }}
      >
        <div style={{paddingBottom: 30}}>
          <SceneFlag number="00">Your first spoken win</SceneFlag>
          <h1
            style={{
              margin: '42px 0 0',
              maxWidth: 1040,
              fontFamily: fonts.display,
              fontSize: 112,
              fontWeight: 560,
              letterSpacing: -3.8,
              lineHeight: 0.94,
              opacity: headline,
              transform: `translateY(${(1 - headline) * 34}px)`,
            }}
          >
            In 81 seconds,
            <br />
            <em style={{fontStyle: 'normal', color: colors.chai}}>answer</em> your first
            <br />
            German greeting.
          </h1>
          <div
            style={{
              width: goldLine,
              height: 5,
              marginTop: 38,
              background: colors.gold,
            }}
          />
          <p
            style={{
              margin: '26px 0 0',
              fontFamily: fonts.ui,
              fontSize: 27,
              lineHeight: 1.4,
              color: colors.lightMuted,
              opacity: headline,
            }}
          >
            Hear it. Say it. Keep it.
          </p>
        </div>
        <div
          style={{
            justifySelf: 'end',
            position: 'relative',
            opacity: guide,
            transform: `translateX(${(1 - guide) * 35}px)`,
          }}
        >
          <PresenterAperture kind="owner" />
          <LowerThird
            title="Your Manglish guide"
            subtitle="Malayali lesson companion"
            style={{position: 'absolute', left: -70, bottom: 48}}
          />
        </div>
      </div>
    </SceneFrame>
  );
};

const ModelResponseScene: React.FC<SceneProps> = ({scene, sceneIndex}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const modelActive = (frame >= 30 && frame < 95) || (frame >= 180 && frame < 245);
  const sheet = entrance(frame, fps, 22);
  const answer = entrance(frame, fps, 126);
  return (
    <SceneFrame scene={scene} sceneIndex={sceneIndex} tone="forest">
      <div
        style={{
          position: 'absolute',
          inset: '82px 104px 104px 112px',
          display: 'grid',
          gridTemplateColumns: '390px 1fr',
          gap: 74,
          alignItems: 'center',
        }}
      >
        <div style={{position: 'relative', paddingTop: 74}}>
          <PresenterAperture kind="teacher" compact onDark active={modelActive} />
          <LowerThird
            title="Frau Fischer"
            subtitle="German teacher · model voice"
            onDark
            style={{position: 'absolute', left: -14, bottom: -36}}
          />
        </div>
        <div>
          <SceneFlag number="01" onDark>Listen, then answer</SceneFlag>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 160px',
              gap: 38,
              alignItems: 'center',
              marginTop: 36,
            }}
          >
            <PaperSheet
              rotate={-0.7}
              style={{
                minHeight: 298,
                padding: '52px 66px',
                boxSizing: 'border-box',
                opacity: sheet,
                transform: `rotate(-0.7deg) translateY(${(1 - sheet) * 30}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: 2.4,
                  color: colors.chai,
                  textTransform: 'uppercase',
                }}
              >
                Model greeting
              </div>
              <div
                style={{
                  marginTop: 26,
                  fontFamily: fonts.german,
                  fontSize: 94,
                  fontWeight: 580,
                  letterSpacing: -2.6,
                  lineHeight: 1,
                }}
              >
                Guten Morgen.
              </div>
            </PaperSheet>
            <SoundRings active={modelActive} onDark />
          </div>
          <div
            style={{
              marginTop: 42,
              paddingLeft: 38,
              borderLeft: `6px solid ${colors.gold}`,
              opacity: answer,
              transform: `translateX(${(1 - answer) * 28}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 16,
                letterSpacing: 2.2,
                color: colors.lightGold,
                textTransform: 'uppercase',
              }}
            >
              Your reply
            </div>
            <div
              style={{
                marginTop: 11,
                fontFamily: fonts.german,
                fontSize: 56,
                lineHeight: 1.08,
                color: colors.darkInk,
              }}
            >
              Guten Morgen, Frau Fischer.
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};

const PresenterBridgeScene: React.FC<SceneProps> = ({scene, sceneIndex}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const owner = entrance(frame, fps, 8);
  const sheet = entrance(frame, fps, 34);
  const audioActive = frame >= 30 && frame < 100;
  const wordReveal = [0, 1, 2].map((index) => entrance(frame, fps, 78 + index * 18));
  return (
    <SceneFrame scene={scene} sceneIndex={sceneIndex} tone="daylight">
      <div
        style={{
          position: 'absolute',
          inset: '80px 110px 104px',
          display: 'grid',
          gridTemplateColumns: '500px 1fr',
          gap: 90,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            opacity: owner,
            transform: `translateX(${(1 - owner) * -28}px)`,
          }}
        >
          <PresenterAperture kind="owner" active={audioActive} />
          <LowerThird
            title="Your Manglish guide"
            subtitle="Make the three words one idea"
            style={{position: 'absolute', right: -54, bottom: 42}}
          />
        </div>
        <div>
          <SceneFlag number="03">Carry it into speech</SceneFlag>
          <PaperSheet
            rotate={0.7}
            ruled
            style={{
              minHeight: 445,
              marginTop: 38,
              padding: '56px 64px',
              boxSizing: 'border-box',
              opacity: sheet,
              transform: `rotate(0.7deg) translateY(${(1 - sheet) * 34}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 15,
                fontWeight: 700,
                color: colors.chai,
                letterSpacing: 2.2,
                textTransform: 'uppercase',
              }}
            >
              Say the whole sentence once
            </div>
            <div
              style={{
                display: 'flex',
                gap: 22,
                alignItems: 'baseline',
                marginTop: 40,
                fontFamily: fonts.german,
                fontSize: 88,
                fontWeight: 590,
                lineHeight: 1,
              }}
            >
              {['Ich', 'lerne', 'Deutsch.'].map((word, index) => (
                <span
                  key={word}
                  style={{
                    opacity: wordReveal[index],
                    transform: `translateY(${(1 - wordReveal[index]) * 22}px)`,
                    color: index === 2 ? colors.success : colors.lightInk,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '0.7fr 1.25fr 1fr',
                gap: 22,
                marginTop: 86,
                fontFamily: fonts.ui,
                fontSize: 21,
                color: colors.lightMuted,
              }}
            >
              <span>I</span>
              <span>am learning</span>
              <span>German</span>
            </div>
          </PaperSheet>
        </div>
      </div>
    </SceneFrame>
  );
};

const PausePracticeScene: React.FC<SceneProps> = ({scene, sceneIndex}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const timerStart = 105;
  const timerEnd = 285;
  const timerProgress = interpolate(frame, [timerStart, timerEnd], [0, 1], clamp);
  const remaining = Math.max(0, Math.ceil((timerEnd - frame) / fps));
  const answerVisible = easeOut(frame, 298, 330);
  const teacherActive = frame >= 30 && frame < 95;
  const timerLabel = frame < timerStart ? 'LISTEN' : frame < timerEnd ? String(remaining) : '✓';
  return (
    <SceneFrame scene={scene} sceneIndex={sceneIndex} tone="forest">
      <div
        style={{
          position: 'absolute',
          inset: '78px 108px 104px',
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: 80,
          alignItems: 'center',
        }}
      >
        <div style={{position: 'relative', paddingTop: 76}}>
          <PresenterAperture kind="teacher" compact onDark active={teacherActive} />
          <LowerThird
            title="Frau Fischer"
            subtitle="She has greeted you"
            onDark
            style={{position: 'absolute', left: -18, bottom: -38}}
          />
        </div>
        <div>
          <SceneFlag number="05" onDark>No notes · answer aloud</SceneFlag>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 360px',
              gap: 72,
              alignItems: 'center',
              marginTop: 46,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 16,
                  fontWeight: 700,
                  color: colors.lightGold,
                  letterSpacing: 2.4,
                  textTransform: 'uppercase',
                }}
              >
                Frau Fischer says
              </div>
              <div
                style={{
                  marginTop: 17,
                  fontFamily: fonts.german,
                  fontSize: 76,
                  lineHeight: 1.02,
                }}
              >
                “Guten Morgen.”
              </div>
              <div
                style={{
                  marginTop: 43,
                  fontFamily: fonts.display,
                  fontSize: 43,
                  color: colors.darkMuted,
                }}
              >
                Your turn. Include her name.
              </div>
              <PaperSheet
                rotate={-0.8}
                style={{
                  marginTop: 45,
                  padding: '28px 38px',
                  opacity: answerVisible,
                  transform: `rotate(-0.8deg) translateY(${(1 - answerVisible) * 22}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.german,
                    fontSize: 43,
                    color: colors.success,
                  }}
                >
                  Guten Morgen, Frau Fischer.
                </span>
              </PaperSheet>
            </div>
            <div
              style={{
                width: 330,
                height: 330,
                display: 'grid',
                placeItems: 'center',
                borderRadius: '50%',
                background: `conic-gradient(${colors.gold} ${timerProgress * 360}deg, ${colors.forestWarm} 0deg)`,
                boxShadow: `0 0 0 12px ${colors.gold}12, 0 30px 80px ${colors.forest}80`,
              }}
            >
              <div
                style={{
                  width: 286,
                  height: 286,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '50%',
                  background: colors.forestLayer,
                  color: frame >= timerEnd ? colors.successDark : colors.lightGold,
                  fontFamily: frame < timerStart ? fonts.mono : fonts.display,
                  fontSize: frame < timerStart ? 24 : 126,
                  fontWeight: 650,
                  letterSpacing: frame < timerStart ? 3 : -3,
                }}
              >
                {timerLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};

const MiniDialogueScene: React.FC<SceneProps> = ({scene, sceneIndex}) => {
  const frame = useCurrentFrame();
  const teacherSpeaking = frame >= 30 && frame < 112;
  const learnerSpeaking = frame >= 150 && frame < 238;
  const teacherLine = entrance(frame, 30, 20);
  const learnerLine = entrance(frame, 30, 128);
  return (
    <SceneFrame scene={scene} sceneIndex={sceneIndex} tone="daylight">
      <div
        style={{
          position: 'absolute',
          inset: '78px 100px 104px',
        }}
      >
        <SceneFlag number="06">Perform the tiny dialogue</SceneFlag>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 92,
            bottom: 28,
            display: 'grid',
            gridTemplateColumns: '335px 1fr 335px',
            alignItems: 'center',
            gap: 38,
          }}
        >
          <div style={{position: 'relative'}}>
            <PresenterAperture kind="teacher" compact active={teacherSpeaking} />
            <LowerThird
              title="Frau Fischer"
              subtitle="Teacher"
              style={{position: 'absolute', left: -8, bottom: -34}}
            />
          </div>
          <PaperSheet
            rotate={0}
            ruled
            style={{
              minHeight: 450,
              padding: '48px 60px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 15,
                fontWeight: 700,
                color: colors.chai,
                letterSpacing: 2.1,
                textTransform: 'uppercase',
              }}
            >
              One exchange · no translation
            </div>
            <div
              style={{
                marginTop: 40,
                padding: '22px 0 27px 30px',
                borderLeft: `6px solid ${teacherSpeaking ? colors.gold : colors.lightMuted + '55'}`,
                opacity: teacherLine,
              }}
            >
              <div style={{fontFamily: fonts.mono, fontSize: 13, letterSpacing: 2, color: colors.lightMuted}}>FRAU FISCHER</div>
              <div style={{fontFamily: fonts.german, fontSize: 54, marginTop: 8}}>Guten Morgen.</div>
            </div>
            <div
              style={{
                marginTop: 25,
                padding: '22px 30px 27px 0',
                borderRight: `6px solid ${learnerSpeaking ? colors.success : colors.lightMuted + '55'}`,
                textAlign: 'right',
                opacity: learnerLine,
                transform: `translateY(${(1 - learnerLine) * 22}px)`,
              }}
            >
              <div style={{fontFamily: fonts.mono, fontSize: 13, letterSpacing: 2, color: colors.lightMuted}}>YOU</div>
              <div style={{fontFamily: fonts.german, fontSize: 51, marginTop: 8, color: learnerSpeaking ? colors.success : colors.lightInk}}>
                Ja, ich lerne Deutsch.
              </div>
            </div>
          </PaperSheet>
          <div style={{position: 'relative'}}>
            <PresenterAperture kind="learner" compact active={learnerSpeaking} />
            <LowerThird
              title="You"
              subtitle="Adult learner"
              style={{position: 'absolute', right: -8, bottom: -34}}
            />
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};

const RecapScene: React.FC<SceneProps> = ({scene, sceneIndex}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phrases = [
    ['01', 'Guten Morgen.', 'greet'],
    ['02', 'Ich lerne Deutsch.', 'introduce your purpose'],
    ['03', 'Auf Wiedersehen.', 'leave politely'],
  ] as const;
  const closeActive = frame >= 60 && frame < 130;
  return (
    <SceneFrame scene={scene} sceneIndex={sceneIndex} tone="forest" warming>
      <div
        style={{
          position: 'absolute',
          inset: '74px 104px 104px',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: 76,
          alignItems: 'center',
        }}
      >
        <div>
          <SceneFlag number="07" onDark>Three useful moves</SceneFlag>
          <div
            style={{
              marginTop: 30,
              fontFamily: fonts.display,
              fontSize: 64,
              lineHeight: 1,
              color: colors.white,
            }}
          >
            Your first German morning,
            <span style={{color: colors.lightGold}}> complete.</span>
          </div>
          <PaperSheet
            rotate={-0.4}
            style={{marginTop: 34, padding: '24px 44px 28px'}}
          >
            {phrases.map(([number, phrase, purpose], index) => {
              const reveal = entrance(frame, fps, 18 + index * 22);
              return (
                <div
                  key={phrase}
                  style={{
                    minHeight: 102,
                    display: 'grid',
                    gridTemplateColumns: '66px 1fr 245px',
                    alignItems: 'center',
                    borderBottom: index < phrases.length - 1 ? `1px solid ${colors.chai}25` : 0,
                    opacity: reveal,
                    transform: `translateX(${(1 - reveal) * 24}px)`,
                  }}
                >
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: '50%',
                      color: colors.white,
                      background: colors.success,
                      fontFamily: fonts.mono,
                      fontSize: 13,
                    }}
                  >
                    {number}
                  </span>
                  <span style={{fontFamily: fonts.german, fontSize: 42}}>{phrase}</span>
                  <span
                    style={{
                      fontFamily: fonts.ui,
                      fontSize: 18,
                      color: colors.lightMuted,
                      textAlign: 'right',
                    }}
                  >
                    {purpose}
                  </span>
                </div>
              );
            })}
          </PaperSheet>
        </div>
        <div style={{position: 'relative', paddingTop: 66}}>
          <PresenterAperture kind="owner" compact onDark active={closeActive} />
          <LowerThird
            title="Auf Wiedersehen"
            subtitle="Close with confidence"
            onDark
            style={{position: 'absolute', right: -10, bottom: -34}}
          />
        </div>
      </div>
    </SceneFrame>
  );
};

const InsertScene: React.FC<SceneProps> = ({scene}) => {
  if (!scene.insertId) throw new Error(`Teaching insert scene ${scene.id} has no insertId.`);
  return (
    <AbsoluteFill style={{background: colors.forest}}>
      <OffthreadVideo
        src={staticFile(stagedInsertPath(scene.insertId))}
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </AbsoluteFill>
  );
};

export const SceneView: React.FC<SceneProps> = (props) => {
  switch (props.scene.type) {
    case 'lesson-hook':
      return <HookScene {...props} />;
    case 'listen-and-respond':
      return <ModelResponseScene {...props} />;
    case 'teaching-insert':
      return <InsertScene {...props} />;
    case 'presenter-bridge':
      return <PresenterBridgeScene {...props} />;
    case 'timed-production':
      return <PausePracticeScene {...props} />;
    case 'dialogue-performance':
      return <MiniDialogueScene {...props} />;
    case 'closed-recap':
      return <RecapScene {...props} />;
    default: {
      const neverScene: never = props.scene.type;
      throw new Error(`Unsupported scene type: ${neverScene}`);
    }
  }
};
