import React, {type CSSProperties} from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts, clamp, sceneOpacity} from '../theme';

export const DaylightRoom: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({children, durationInFrames}) => {
  const frame = useCurrentFrame();
  const beamShift = interpolate(frame, [0, durationInFrames], [-28, 34], clamp);
  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        color: colors.lightInk,
        background: colors.daylight,
        opacity: sceneOpacity(frame, durationInFrames),
      }}
    >
      <AbsoluteFill
        style={{
          background:
            `linear-gradient(106deg, transparent 0 52%, ${colors.lightGold}1F 52.2% 69%, transparent 69.2%), ` +
            `radial-gradient(circle at ${78 + beamShift / 9}% 8%, #FFFDF8 0 11%, transparent 40%), ` +
            `linear-gradient(145deg, ${colors.daylight}, ${colors.daylightLayer})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 880,
          height: 1160,
          right: -150 + beamShift,
          top: -230,
          transform: 'rotate(11deg)',
          borderLeft: `2px solid ${colors.gold}26`,
          background: `linear-gradient(90deg, transparent, ${colors.white}4D)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 210,
          background: `linear-gradient(180deg, transparent, ${colors.daylightShade}B8)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const ForestRoom: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  warming?: boolean;
}> = ({children, durationInFrames, warming = false}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, durationInFrames], [0.72, 1], clamp);
  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        color: colors.darkInk,
        background: colors.forest,
        opacity: sceneOpacity(frame, durationInFrames),
      }}
    >
      <AbsoluteFill
        style={{
          background:
            `radial-gradient(circle at 76% 18%, ${warming ? colors.lightGold : colors.gold}${warming ? '29' : '16'} 0%, transparent 34%), ` +
            `linear-gradient(125deg, ${colors.forest}, ${colors.forestLayer} 58%, ${colors.forestWarm})`,
          opacity: glow,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 112,
          top: -140,
          width: 370,
          height: 980,
          borderRadius: '190px 190px 0 0',
          border: `2px solid ${colors.darkMuted}1F`,
          background: `linear-gradient(180deg, ${colors.forestRaised}, transparent)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: -170,
          bottom: -300,
          width: 890,
          height: 890,
          borderRadius: '50%',
          border: `2px solid ${colors.gold}18`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const SceneFlag: React.FC<{
  number: string;
  children: React.ReactNode;
  onDark?: boolean;
}> = ({number, children, onDark = false}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'stretch',
      minHeight: 44,
      fontFamily: fonts.mono,
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: 2.2,
      lineHeight: 1,
      textTransform: 'uppercase',
      boxShadow: `0 10px 30px ${colors.forest}12`,
    }}
  >
    <span
      style={{
        minWidth: 58,
        display: 'grid',
        placeItems: 'center',
        background: colors.gold,
        color: colors.forest,
      }}
    >
      {number}
    </span>
    <span
      style={{
        display: 'grid',
        placeItems: 'center',
        padding: '0 20px',
        color: onDark ? colors.darkInk : colors.lightInk,
        background: onDark ? colors.forestRaised : colors.white,
        border: `1px solid ${onDark ? colors.darkMuted + '2B' : colors.lightMuted + '28'}`,
        borderLeft: 0,
      }}
    >
      {children}
    </span>
  </div>
);

export const PaperSheet: React.FC<{
  children: React.ReactNode;
  style?: CSSProperties;
  rotate?: number;
  ruled?: boolean;
}> = ({children, style, rotate = -1.2, ruled = false}) => (
  <div
    style={{
      position: 'relative',
      color: colors.lightInk,
      background:
        ruled
          ? `repeating-linear-gradient(180deg, ${colors.answerSheet}, ${colors.answerSheet} 65px, ${colors.chai}18 66px, ${colors.answerSheet} 67px)`
          : colors.answerSheet,
      border: `1px solid ${colors.chai}30`,
      boxShadow: `0 28px 60px ${colors.forest}24, 0 3px 0 ${colors.white}80 inset`,
      transform: `rotate(${rotate}deg)`,
      ...style,
    }}
  >
    <span
      style={{
        position: 'absolute',
        right: -1,
        top: -1,
        width: 64,
        height: 64,
        background: `linear-gradient(225deg, ${colors.daylightShade} 0 49%, transparent 50%)`,
      }}
    />
    {children}
  </div>
);

export const PresenterAperture: React.FC<{
  kind: 'owner' | 'teacher' | 'learner';
  compact?: boolean;
  onDark?: boolean;
  active?: boolean;
}> = ({kind, compact = false, onDark = false, active = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({
    fps,
    frame: frame - 5,
    config: {damping: 22, stiffness: 105, mass: 0.9},
  });
  const width = compact ? 315 : 520;
  const height = compact ? 405 : 660;
  const muted = onDark ? colors.darkMuted : colors.lightMuted;
  const portraitColor =
    kind === 'owner'
      ? colors.darkMuted
      : kind === 'teacher'
        ? colors.lightMuted
        : colors.chai;
  const apertureBackground =
    kind === 'owner'
      ? `linear-gradient(155deg, ${colors.forestWarm}, ${colors.forest})`
      : kind === 'teacher'
        ? `linear-gradient(155deg, ${colors.daylight}, ${colors.daylightShade})`
        : `linear-gradient(155deg, ${colors.answerSheet}, ${colors.daylightLayer})`;
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: compact ? '160px 160px 24px 24px' : '270px 270px 36px 36px',
        border: `2px solid ${active ? colors.gold : muted + '66'}`,
        background: apertureBackground,
        boxShadow: active ? `0 0 0 8px ${colors.gold}14, 0 28px 70px ${colors.forest}35` : `0 24px 60px ${colors.forest}24`,
        transform: `translateY(${(1 - entrance) * 30}px)`,
        opacity: entrance,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 18,
          borderRadius: 'inherit',
          border: `1px solid ${active ? colors.gold + '80' : muted + '2E'}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: compact ? 92 : 154,
          width: compact ? 98 : 152,
          height: compact ? 98 : 152,
          borderRadius: '50%',
          transform: 'translateX(-50%)',
          background: portraitColor,
          opacity: 0.72,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: compact ? 46 : 70,
          width: compact ? 230 : 380,
          height: compact ? 190 : 320,
          borderRadius: '50% 50% 18% 18%',
          transform: 'translateX(-50%)',
          background: portraitColor,
          opacity: 0.62,
        }}
      />
    </div>
  );
};

export const LowerThird: React.FC<{
  title: string;
  subtitle: string;
  onDark?: boolean;
  style?: CSSProperties;
}> = ({title, subtitle, onDark = false, style}) => (
  <div
    style={{
      display: 'inline-grid',
      gridTemplateColumns: '8px auto',
      background: onDark ? colors.forestRaised : colors.white,
      color: onDark ? colors.darkInk : colors.lightInk,
      boxShadow: `0 18px 45px ${colors.forest}24`,
      ...style,
    }}
  >
    <span style={{background: colors.gold}} />
    <span style={{padding: '15px 24px 14px'}}>
      <strong
        style={{
          display: 'block',
          fontFamily: fonts.ui,
          fontSize: 20,
          fontWeight: 760,
          letterSpacing: 0.2,
        }}
      >
        {title}
      </strong>
      <span
        style={{
          display: 'block',
          marginTop: 3,
          color: onDark ? colors.darkMuted : colors.lightMuted,
          fontFamily: fonts.mono,
          fontSize: 12,
          fontWeight: 650,
          letterSpacing: 1.8,
          textTransform: 'uppercase',
        }}
      >
        {subtitle}
      </span>
    </span>
  </div>
);

export const SubtitleLine: React.FC<{
  caption: string;
  onDark?: boolean;
}> = ({caption, onDark = false}) => (
  <div
    style={{
      position: 'absolute',
      left: 120,
      right: 120,
      bottom: 28,
      textAlign: 'center',
      pointerEvents: 'none',
    }}
  >
    <span
      style={{
        display: 'inline-block',
        maxWidth: 1120,
        padding: '10px 24px 12px',
        border: `1px solid ${onDark ? colors.darkMuted + '26' : colors.chai + '20'}`,
        borderRadius: 5,
        background: onDark ? `${colors.forestLayer}E8` : `${colors.white}E8`,
        boxShadow: `0 10px 34px ${colors.forest}1C`,
        color: onDark ? colors.darkInk : colors.lightInk,
        fontFamily: fonts.display,
        fontSize: 29,
        fontWeight: 520,
        lineHeight: 1.18,
      }}
    >
      {caption}
    </span>
  </div>
);

export const SoundRings: React.FC<{active: boolean; onDark?: boolean}> = ({
  active,
  onDark = false,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'relative', width: 160, height: 160}}>
      {[0, 1, 2].map((ring) => {
        const phase = ((frame + ring * 18) % 54) / 54;
        const scale = active ? 0.55 + phase * 0.7 : 0.62 + ring * 0.16;
        return (
          <div
            key={ring}
            style={{
              position: 'absolute',
              inset: 20,
              borderRadius: '50%',
              border: `3px solid ${onDark ? colors.lightGold : colors.gold}`,
              transform: `scale(${scale})`,
              opacity: active ? 1 - phase : 0.22,
            }}
          />
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 69,
          top: 69,
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: onDark ? colors.lightGold : colors.gold,
        }}
      />
    </div>
  );
};
