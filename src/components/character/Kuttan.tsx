'use client';

import { motion } from 'framer-motion';

export type KuttanMood = 'idle' | 'happy' | 'excited' | 'thinking' | 'celebrating' | 'sad' | 'pointing' | 'waving';

interface KuttanProps {
  mood?: KuttanMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 80,
  md: 120,
  lg: 180,
  xl: 240,
};

export function Kuttan({ mood = 'idle', size = 'md', className = '' }: KuttanProps) {
  const s = sizes[size];

  // Body animations per mood
  const bodyAnim = {
    idle: { y: [0, -4, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
    happy: { y: [0, -6, 0], transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const } },
    excited: { y: [0, -12, 0], scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' as const } },
    thinking: { rotate: [0, -2, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
    celebrating: { y: [0, -15, 0], rotate: [0, -3, 3, 0], transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const } },
    sad: { y: [0, 2, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
    pointing: { x: [0, 3, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
    waving: { rotate: [0, -2, 2, 0], transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const } },
  };

  // Left arm animation
  const leftArmAnim = {
    idle: { rotate: 0 },
    happy: { rotate: [0, -10, 0], transition: { duration: 1.5, repeat: Infinity } },
    excited: { rotate: [0, -30, 0], transition: { duration: 0.5, repeat: Infinity } },
    thinking: { rotate: -45, y: -5 },
    celebrating: { rotate: [0, -45, 0], transition: { duration: 0.6, repeat: Infinity } },
    sad: { rotate: 5 },
    pointing: { rotate: 0 },
    waving: { rotate: [0, -10, 0], transition: { duration: 1, repeat: Infinity } },
  };

  // Right arm animation
  const rightArmAnim = {
    idle: { rotate: 0 },
    happy: { rotate: [0, 10, 0], transition: { duration: 1.5, repeat: Infinity } },
    excited: { rotate: [0, 30, 0], transition: { duration: 0.5, repeat: Infinity } },
    thinking: { rotate: 0 },
    celebrating: { rotate: [0, 45, 0], transition: { duration: 0.6, repeat: Infinity } },
    sad: { rotate: -5 },
    pointing: { rotate: [-60, -65, -60], transition: { duration: 1, repeat: Infinity } },
    waving: { rotate: [-40, -60, -40], transition: { duration: 0.5, repeat: Infinity } },
  };

  // Eye expressions
  const getEyes = () => {
    switch (mood) {
      case 'happy':
      case 'celebrating':
        // Happy closed eyes (arcs)
        return (
          <>
            <path d="M 36 42 Q 39 38 42 42" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 54 42 Q 57 38 60 42" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      case 'excited':
        // Big sparkly eyes
        return (
          <>
            <circle cx="39" cy="41" r="5" fill="#1a1a2e" />
            <circle cx="57" cy="41" r="5" fill="#1a1a2e" />
            <circle cx="37" cy="39" r="1.5" fill="white" />
            <circle cx="55" cy="39" r="1.5" fill="white" />
            <circle cx="40" cy="42" r="1" fill="white" />
            <circle cx="58" cy="42" r="1" fill="white" />
          </>
        );
      case 'thinking':
        // Looking up/side
        return (
          <>
            <circle cx="39" cy="41" r="4" fill="#1a1a2e" />
            <circle cx="57" cy="41" r="4" fill="#1a1a2e" />
            <circle cx="37" cy="39" r="1.5" fill="white" />
            <circle cx="55" cy="39" r="1.5" fill="white" />
            {/* One eyebrow raised */}
            <line x1="35" y1="34" x2="43" y2="35" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
            <line x1="53" y1="33" x2="61" y2="35" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 'sad':
        // Droopy eyes
        return (
          <>
            <circle cx="39" cy="42" r="3.5" fill="#1a1a2e" />
            <circle cx="57" cy="42" r="3.5" fill="#1a1a2e" />
            <circle cx="38" cy="41" r="1" fill="white" />
            <circle cx="56" cy="41" r="1" fill="white" />
            {/* Sad eyebrows */}
            <line x1="34" y1="36" x2="43" y2="34" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="62" y1="36" x2="53" y2="34" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );
      default:
        // Normal eyes
        return (
          <>
            <circle cx="39" cy="41" r="4" fill="#1a1a2e" />
            <circle cx="57" cy="41" r="4" fill="#1a1a2e" />
            <circle cx="37.5" cy="39.5" r="1.5" fill="white" />
            <circle cx="55.5" cy="39.5" r="1.5" fill="white" />
          </>
        );
    }
  };

  // Mouth expressions
  const getMouth = () => {
    switch (mood) {
      case 'happy':
      case 'waving':
        return <path d="M 42 50 Q 48 56 54 50" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />;
      case 'excited':
      case 'celebrating':
        return <ellipse cx="48" cy="52" rx="5" ry="4" fill="#1a1a2e" />;
      case 'thinking':
        return <circle cx="52" cy="51" r="2.5" fill="#1a1a2e" />;
      case 'sad':
        return <path d="M 42 53 Q 48 48 54 53" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />;
      case 'pointing':
        return <path d="M 43 50 Q 48 54 53 50" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />;
      default:
        return <path d="M 43 50 Q 48 54 53 50" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />;
    }
  };

  return (
    <motion.div className={className} animate={bodyAnim[mood]} style={{ width: s, height: s * 1.3 }}>
      <svg viewBox="0 0 96 125" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {/* Hair */}
        <ellipse cx="48" cy="28" rx="24" ry="22" fill="#1a1a2e" />
        <path d="M 26 35 Q 28 15 48 10 Q 68 15 70 35" fill="#1a1a2e" />
        {/* Messy fringe */}
        <path d="M 30 25 Q 35 14 42 18 Q 38 12 48 10 Q 55 12 52 18 Q 58 14 64 22" fill="#1a1a2e" />

        {/* Face */}
        <ellipse cx="48" cy="40" rx="20" ry="18" fill="#D4956A" />
        {/* Cheeks */}
        {(mood === 'happy' || mood === 'excited' || mood === 'celebrating') && (
          <>
            <circle cx="32" cy="45" r="4" fill="#E8A07A" opacity="0.7" />
            <circle cx="64" cy="45" r="4" fill="#E8A07A" opacity="0.7" />
          </>
        )}

        {/* Eyes */}
        {getEyes()}

        {/* Mouth */}
        {getMouth()}

        {/* Ears */}
        <ellipse cx="28" cy="40" rx="4" ry="5" fill="#C48560" />
        <ellipse cx="68" cy="40" rx="4" ry="5" fill="#C48560" />

        {/* Body / T-shirt — Kerala green */}
        <path d="M 32 58 Q 32 55 35 54 L 48 52 L 61 54 Q 64 55 64 58 L 66 85 Q 66 88 63 88 L 33 88 Q 30 88 30 85 Z" fill="#27ae60" />
        {/* Shirt collar */}
        <path d="M 42 54 L 48 58 L 54 54" stroke="#1e8449" strokeWidth="1.5" fill="none" />
        {/* Shirt design - small DE flag stripe */}
        <rect x="42" y="70" width="12" height="2" rx="1" fill="#1a1a1a" opacity="0.4" />
        <rect x="42" y="73" width="12" height="2" rx="1" fill="#c0392b" opacity="0.4" />
        <rect x="42" y="76" width="12" height="2" rx="1" fill="#d4a520" opacity="0.4" />

        {/* Backpack straps — brown */}
        <line x1="36" y1="56" x2="34" y2="75" stroke="#8B6914" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="56" x2="62" y2="75" stroke="#8B6914" strokeWidth="3" strokeLinecap="round" />

        {/* Left arm */}
        <motion.g style={{ originX: '36px', originY: '60px' }} animate={leftArmAnim[mood]}>
          <path d="M 32 60 Q 24 68 22 78" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Hand */}
          <circle cx="22" cy="79" r="4" fill="#D4956A" />
          {mood === 'thinking' && (
            // Hand near chin when thinking
            <circle cx="22" cy="79" r="4" fill="#D4956A" />
          )}
        </motion.g>

        {/* Right arm */}
        <motion.g style={{ originX: '60px', originY: '60px' }} animate={rightArmAnim[mood]}>
          <path d="M 64 60 Q 72 68 74 78" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Hand */}
          <circle cx="74" cy="79" r="4" fill="#D4956A" />
        </motion.g>

        {/* Mundu — white with gold border */}
        <path d="M 33 85 L 30 105 L 42 105 L 48 90 L 54 105 L 66 105 L 63 85 Z" fill="#F0EBE0" />
        <path d="M 30 103 L 42 103 L 48 88 L 54 103 L 66 103" stroke="#d4a520" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Legs */}
        <line x1="38" y1="105" x2="37" y2="118" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" />
        <line x1="58" y1="105" x2="59" y2="118" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" />

        {/* Chappal / sandals */}
        <ellipse cx="36" cy="120" rx="7" ry="3.5" fill="#8B5E34" />
        <ellipse cx="60" cy="120" rx="7" ry="3.5" fill="#8B5E34" />
      </svg>
    </motion.div>
  );
}
