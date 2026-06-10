import { interpolate, useCurrentFrame } from 'remotion';

export type KuttanMoodFrame = 'idle' | 'waving' | 'happy' | 'pointing' | 'thinking' | 'celebrating';

type Props = {
  mood?: KuttanMoodFrame;
  size?: number;
  entryDelay?: number; // in frames
};

/**
 * SVG Kuttan for Remotion videos — matches the in-app Kuttan vibes but uses
 * Remotion's frame-based animation instead of framer-motion.
 */
export const KuttanFrame = ({ mood = 'happy', size = 360, entryDelay = 0 }: Props) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - entryDelay);

  // Entry: scale + fade in over 18 frames (~0.6s at 30fps)
  const entryScale = interpolate(localFrame, [0, 18], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const entryOpacity = interpolate(localFrame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle idle bounce
  const bounce = Math.sin(localFrame / 20) * 4;

  // Arm angle depending on mood
  const armAngle = (() => {
    switch (mood) {
      case 'waving':
        return -40 + Math.sin(localFrame / 6) * 20;
      case 'pointing':
        return -15;
      case 'celebrating':
        return -55 + Math.sin(localFrame / 8) * 10;
      default:
        return -8;
    }
  })();

  // Mouth state
  const mouthHappy = mood === 'happy' || mood === 'celebrating' || mood === 'waving';
  const mouthPath = mouthHappy
    ? 'M 82 128 Q 100 144 118 128'
    : 'M 82 132 Q 100 130 118 132';

  const skin = '#d2a36a';
  const shirt = '#27ae60';
  const shirtDark = '#1e8449';
  const shorts = '#f5f0e8';
  const hair = '#1a1a1a';

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `translateY(${bounce}px) scale(${entryScale})`,
        opacity: entryOpacity,
        transformOrigin: 'center bottom',
      }}
    >
      <svg viewBox="0 0 200 280" width="100%" height="100%">
        {/* Shadow */}
        <ellipse cx="100" cy="270" rx="60" ry="6" fill="rgba(0,0,0,0.2)" />

        {/* Legs */}
        <rect x="78" y="208" width="18" height="52" rx="6" fill={skin} />
        <rect x="104" y="208" width="18" height="52" rx="6" fill={skin} />

        {/* Shorts */}
        <path d="M 70 168 L 130 168 L 128 214 L 104 214 L 100 196 L 96 214 L 72 214 Z" fill={shorts} />
        <path d="M 70 168 L 130 168 L 130 176 L 70 176 Z" fill="#d4ccb8" />

        {/* Shirt */}
        <path
          d="M 58 108 C 58 100, 70 96, 100 96 C 130 96, 142 100, 142 108 L 138 172 L 62 172 Z"
          fill={shirt}
          stroke={shirtDark}
          strokeWidth="2"
        />
        {/* Shirt collar */}
        <path d="M 90 96 L 100 110 L 110 96 Z" fill={shirtDark} />

        {/* Right arm (static unless pointing) */}
        <g transform={`rotate(8 142 118)`}>
          <rect x="134" y="108" width="16" height="60" rx="8" fill={shirt} stroke={shirtDark} strokeWidth="1.5" />
          <circle cx="142" cy="172" r="11" fill={skin} />
        </g>

        {/* Left arm (animated based on mood) */}
        <g transform={`rotate(${armAngle} 58 118)`}>
          <rect x="50" y="108" width="16" height="60" rx="8" fill={shirt} stroke={shirtDark} strokeWidth="1.5" />
          <circle cx="58" cy="172" r="11" fill={skin} />
          {mood === 'waving' && (
            <g transform="translate(58 172)">
              <path
                d="M -8 -4 L -14 -12 M -2 -4 L -4 -14 M 4 -4 L 6 -14 M 10 -4 L 14 -12"
                stroke={skin}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>

        {/* Head */}
        <ellipse cx="100" cy="88" rx="42" ry="46" fill={skin} />

        {/* Hair */}
        <path
          d="M 58 76 Q 60 44 100 42 Q 140 44 142 76 L 138 88 Q 130 68 100 66 Q 70 68 62 88 Z"
          fill={hair}
        />

        {/* Ears */}
        <ellipse cx="56" cy="92" rx="8" ry="12" fill={skin} />
        <ellipse cx="144" cy="92" rx="8" ry="12" fill={skin} />

        {/* Eyes */}
        <ellipse cx="82" cy="92" rx="4.5" ry="5.5" fill="#1a1a1a" />
        <ellipse cx="118" cy="92" rx="4.5" ry="5.5" fill="#1a1a1a" />
        <circle cx="83.5" cy="90" r="1.4" fill="white" />
        <circle cx="119.5" cy="90" r="1.4" fill="white" />

        {/* Brows */}
        <path d="M 74 82 Q 82 79 90 82" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 110 82 Q 118 79 126 82" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Cheeks */}
        <ellipse cx="72" cy="108" rx="7" ry="4" fill="#e78b7a" opacity="0.55" />
        <ellipse cx="128" cy="108" rx="7" ry="4" fill="#e78b7a" opacity="0.55" />

        {/* Mouth */}
        <path d={mouthPath} stroke="#6b3a2c" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};
