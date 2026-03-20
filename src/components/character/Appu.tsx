'use client';

import { motion } from 'framer-motion';

export type AppuMood = 'idle' | 'happy' | 'celebrating' | 'sleeping' | 'surprised';

interface AppuProps {
  mood?: AppuMood;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const sizes = {
  xs: 40,
  sm: 56,
  md: 80,
};

export function Appu({ mood = 'idle', size = 'sm', className = '' }: AppuProps) {
  const s = sizes[size];

  const bodyAnim = {
    idle: { y: [0, -2, 0], transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const } },
    happy: { y: [0, -5, 0], rotate: [0, -3, 3, 0], transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' as const } },
    celebrating: { y: [0, -8, 0], scale: [1, 1.1, 1], transition: { duration: 0.6, repeat: Infinity } },
    sleeping: { rotate: [0, 2, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
    surprised: { scale: [1, 1.15, 1], transition: { duration: 0.4, repeat: 2 } },
  };

  // Trunk animation
  const trunkAnim = {
    idle: { rotate: [0, 5, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
    happy: { rotate: [0, 15, -5, 0], transition: { duration: 1, repeat: Infinity } },
    celebrating: { rotate: [0, 20, -10, 0], transition: { duration: 0.5, repeat: Infinity } },
    sleeping: { rotate: 5 },
    surprised: { rotate: [-10, 15, 0], transition: { duration: 0.3, repeat: 2 } },
  };

  const getEyes = () => {
    switch (mood) {
      case 'happy':
      case 'celebrating':
        return (
          <>
            <path d="M 16 18 Q 18 15 20 18" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 28 18 Q 30 15 32 18" stroke="#1a1a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        );
      case 'sleeping':
        return (
          <>
            <line x1="15" y1="18" x2="21" y2="18" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="27" y1="18" x2="33" y2="18" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
            {/* Z's */}
            <text x="36" y="12" fontSize="6" fill="white" opacity="0.6" fontWeight="bold">z</text>
            <text x="40" y="7" fontSize="5" fill="white" opacity="0.4" fontWeight="bold">z</text>
          </>
        );
      case 'surprised':
        return (
          <>
            <circle cx="18" cy="17" r="3" fill="#1a1a2e" />
            <circle cx="30" cy="17" r="3" fill="#1a1a2e" />
            <circle cx="17" cy="16" r="1" fill="white" />
            <circle cx="29" cy="16" r="1" fill="white" />
          </>
        );
      default:
        return (
          <>
            <circle cx="18" cy="17" r="2.5" fill="#1a1a2e" />
            <circle cx="30" cy="17" r="2.5" fill="#1a1a2e" />
            <circle cx="17" cy="16" r="1" fill="white" />
            <circle cx="29" cy="16" r="1" fill="white" />
          </>
        );
    }
  };

  return (
    <motion.div className={className} animate={bodyAnim[mood]} style={{ width: s, height: s }}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {/* Body */}
        <ellipse cx="24" cy="30" rx="14" ry="12" fill="#9CA3AF" />

        {/* Head */}
        <circle cx="24" cy="18" r="14" fill="#9CA3AF" />

        {/* Ears */}
        <ellipse cx="9" cy="16" rx="7" ry="9" fill="#9CA3AF" />
        <ellipse cx="9" cy="16" rx="5" ry="7" fill="#D1B4C7" />
        <ellipse cx="39" cy="16" rx="7" ry="9" fill="#9CA3AF" />
        <ellipse cx="39" cy="16" rx="5" ry="7" fill="#D1B4C7" />

        {/* Eyes */}
        {getEyes()}

        {/* Trunk */}
        <motion.g style={{ originX: '24px', originY: '24px' }} animate={trunkAnim[mood]}>
          <path
            d="M 24 22 Q 24 28 22 32 Q 20 36 18 38"
            stroke="#9CA3AF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>

        {/* Tusks */}
        <line x1="19" y1="25" x2="17" y2="30" stroke="#FFFFF0" strokeWidth="2" strokeLinecap="round" />
        <line x1="29" y1="25" x2="31" y2="30" stroke="#FFFFF0" strokeWidth="2" strokeLinecap="round" />

        {/* Legs */}
        <rect x="14" y="38" width="5" height="7" rx="2" fill="#9CA3AF" />
        <rect x="29" y="38" width="5" height="7" rx="2" fill="#9CA3AF" />

        {/* Tiny nettipattam (forehead decoration) */}
        <ellipse cx="24" cy="7" rx="6" ry="3" fill="#d4a520" />
        <circle cx="24" cy="5" r="2" fill="#c0392b" />

        {mood === 'celebrating' && (
          <>
            {/* Confetti particles */}
            <motion.circle cx="8" cy="5" r="1.5" fill="#d4a520"
              animate={{ y: [0, 10], opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
            <motion.circle cx="40" cy="3" r="1.5" fill="#c0392b"
              animate={{ y: [0, 12], opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
            <motion.circle cx="24" cy="0" r="1.5" fill="#27ae60"
              animate={{ y: [0, 8], opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />
          </>
        )}
      </svg>
    </motion.div>
  );
}
