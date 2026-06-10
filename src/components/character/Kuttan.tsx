'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export type KuttanMood = 'idle' | 'happy' | 'excited' | 'thinking' | 'celebrating' | 'sad' | 'pointing' | 'waving';

interface KuttanProps {
  mood?: KuttanMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  entrance?: boolean; // animate entrance
}

const sizes = {
  sm: 80,
  md: 120,
  lg: 180,
  xl: 240,
};

export function Kuttan({ mood = 'idle', size = 'md', className = '', entrance = true }: KuttanProps) {
  const s = sizes[size];
  const [blinking, setBlinking] = useState(false);

  // Eye blink every 3-5 seconds
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    };
    const interval = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Body animations per mood
  const bodyAnim = {
    idle: { y: [0, -3, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
    happy: { y: [0, -4, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
    excited: { y: [0, -6, 0], scale: [1, 1.03, 1], transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' as const } },
    thinking: { rotate: [0, -1, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
    celebrating: { y: [0, -8, 0], scale: [1, 1.04, 1], transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const } },
    sad: { y: [0, 1, 0], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
    pointing: { x: [0, 2, 0], transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const } },
    waving: { rotate: [0, -1, 1, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
  };

  // Left arm animation
  const leftArmAnim = {
    idle: { rotate: 0 },
    happy: { rotate: [0, -5, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
    excited: { rotate: [0, -10, 0], transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const } },
    thinking: { rotate: -20, y: -3, transition: { duration: 0.5 } },
    celebrating: { rotate: [0, -25, 0], transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const } },
    sad: { rotate: 3 },
    pointing: { rotate: 0 },
    waving: { rotate: [0, -5, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
  };

  // Right arm animation
  const rightArmAnim = {
    idle: { rotate: 0 },
    happy: { rotate: [0, 5, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
    excited: { rotate: [0, 10, 0], transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const } },
    thinking: { rotate: 0 },
    celebrating: { rotate: [0, 25, 0], transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const } },
    sad: { rotate: -3 },
    pointing: { rotate: [-50, -55, -50], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const } },
    waving: { rotate: [-30, -55, -30], transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' as const } },
  };

  // Eye expressions with blink support
  const getEyes = () => {
    // Blink overrides all moods except closed-eye moods
    if (blinking && mood !== 'happy' && mood !== 'celebrating') {
      return (
        <>
          <line x1="35" y1="41" x2="43" y2="41" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="53" y1="41" x2="61" y2="41" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
        </>
      );
    }
    switch (mood) {
      case 'happy':
      case 'celebrating':
        return (
          <>
            <path d="M 36 42 Q 39 38 42 42" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 54 42 Q 57 38 60 42" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      case 'excited':
        return (
          <>
            <circle cx="39" cy="41" r="5" fill="#1a1a2e" />
            <circle cx="57" cy="41" r="5" fill="#1a1a2e" />
            <motion.circle cx="37" cy="39" r="1.5" fill="white" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.circle cx="55" cy="39" r="1.5" fill="white" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <circle cx="40" cy="42" r="1" fill="white" />
            <circle cx="58" cy="42" r="1" fill="white" />
          </>
        );
      case 'thinking':
        return (
          <>
            <circle cx="39" cy="41" r="4" fill="#1a1a2e" />
            <circle cx="57" cy="41" r="4" fill="#1a1a2e" />
            <motion.g animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <circle cx="37" cy="39" r="1.5" fill="white" />
              <circle cx="55" cy="39" r="1.5" fill="white" />
            </motion.g>
            <line x1="35" y1="34" x2="43" y2="35" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
            <line x1="53" y1="33" x2="61" y2="35" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case 'sad':
        return (
          <>
            <circle cx="39" cy="42" r="3.5" fill="#1a1a2e" />
            <circle cx="57" cy="42" r="3.5" fill="#1a1a2e" />
            <circle cx="38" cy="41" r="1" fill="white" />
            <circle cx="56" cy="41" r="1" fill="white" />
            <line x1="34" y1="36" x2="43" y2="34" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="62" y1="36" x2="53" y2="34" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );
      default:
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
      default:
        return <path d="M 43 50 Q 48 54 53 50" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mood}
        className={className}
        initial={entrance ? { opacity: 0, scale: 0.92 } : false}
        animate={entrance ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ width: s, height: s * 1.3 }}
      >
        <svg viewBox="0 0 96 125" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" role="img" aria-label={`Kuttan character feeling ${mood}`}>
          {/* Shadow */}
          <motion.ellipse
            cx={48} cy={122} ry={3}
            fill="black" opacity="0.08"
            initial={{ rx: 18 }}
            animate={{ rx: mood === 'celebrating' ? [18, 14, 18] : [18, 16, 18] }}
            transition={{ duration: mood === 'celebrating' ? 1.2 : 3, repeat: Infinity }}
          />

          {/* Hair */}
          <ellipse cx="48" cy="28" rx="24" ry="22" fill="#1a1a2e" stroke="#0a0a1a" strokeWidth="1.5" />
          <path d="M 26 35 Q 28 15 48 10 Q 68 15 70 35" fill="#1a1a2e" />
          <path d="M 30 25 Q 35 14 42 18 Q 38 12 48 10 Q 55 12 52 18 Q 58 14 64 22" fill="#1a1a2e" />

          {/* Face */}
          <ellipse cx="48" cy="40" rx="20" ry="18" fill="#D4956A" stroke="#1a1a2e" strokeWidth="2" />

          {/* Cheeks — glow on positive moods */}
          {(mood === 'happy' || mood === 'excited' || mood === 'celebrating' || mood === 'waving') && (
            <>
              <motion.circle cx="32" cy="45" r="4" fill="#E8A07A" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.3 }} />
              <motion.circle cx="64" cy="45" r="4" fill="#E8A07A" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.3 }} />
            </>
          )}

          {/* Eyes */}
          {getEyes()}

          {/* Mouth */}
          {getMouth()}

          {/* Ears */}
          <ellipse cx="28" cy="40" rx="4" ry="5" fill="#C48560" stroke="#1a1a2e" strokeWidth="1.5" />
          <ellipse cx="68" cy="40" rx="4" ry="5" fill="#C48560" stroke="#1a1a2e" strokeWidth="1.5" />

          {/* Body / T-shirt — Kerala green */}
          <path d="M 32 58 Q 32 55 35 54 L 48 52 L 61 54 Q 64 55 64 58 L 66 85 Q 66 88 63 88 L 33 88 Q 30 88 30 85 Z" fill="#27ae60" stroke="#1a1a2e" strokeWidth="2" strokeLinejoin="round" />

          {/* Breathing animation on shirt */}
          <motion.path
            d="M 32 58 Q 32 55 35 54 L 48 52 L 61 54 Q 64 55 64 58 L 66 85 Q 66 88 63 88 L 33 88 Q 30 88 30 85 Z"
            fill="#27ae60"
            animate={{ scaleX: [1, 1.01, 1] }}
            style={{ originX: '48px', originY: '70px' }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Polo collar */}
          <path d="M 40 54 L 48 58 L 56 54" stroke="#1e8449" strokeWidth="2" fill="none" />
          <circle cx="48" cy="60" r="1" fill="#1e8449" />{/* Button */}

          {/* Left arm */}
          <motion.g style={{ originX: '36px', originY: '60px' }} animate={leftArmAnim[mood]}>
            <path d="M 32 60 Q 24 68 22 78" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="22" cy="79" r="4" fill="#D4956A" />
          </motion.g>

          {/* Right arm */}
          <motion.g style={{ originX: '60px', originY: '60px' }} animate={rightArmAnim[mood]}>
            <path d="M 64 60 Q 72 68 74 78" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="74" cy="79" r="4" fill="#D4956A" />
          </motion.g>

          {/* White shorts */}
          <path d="M 33 85 L 31 100 L 42 100 L 48 90 L 54 100 L 65 100 L 63 85 Z" fill="#F5F0E8" stroke="#1a1a2e" strokeWidth="2" strokeLinejoin="round" />
          <line x1="48" y1="85" x2="48" y2="100" stroke="#1a1a2e" strokeWidth="1" opacity="0.6" />

          {/* Legs */}
          <line x1="38" y1="100" x2="37" y2="118" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" />
          <line x1="58" y1="100" x2="59" y2="118" stroke="#D4956A" strokeWidth="6" strokeLinecap="round" />

          {/* Chappal */}
          <ellipse cx="36" cy="120" rx="7" ry="3.5" fill="#8B5E34" />
          <ellipse cx="60" cy="120" rx="7" ry="3.5" fill="#8B5E34" />

          {/* Celebration sparkles */}
          {mood === 'celebrating' && (
            <>
              <motion.circle cx="20" cy="20" r="2" fill="#ffd93d" animate={{ y: [0, -15], opacity: [1, 0], scale: [0, 1.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
              <motion.circle cx="76" cy="25" r="2" fill="#e94560" animate={{ y: [0, -12], opacity: [1, 0], scale: [0, 1.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
              <motion.circle cx="48" cy="10" r="2" fill="#27ae60" animate={{ y: [0, -10], opacity: [1, 0], scale: [0, 1.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />
              <motion.circle cx="30" cy="15" r="1.5" fill="#3b82f6" animate={{ y: [0, -12], opacity: [1, 0], scale: [0, 1.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.9 }} />
            </>
          )}

          {/* Thinking bubble */}
          {mood === 'thinking' && (
            <>
              <motion.circle cx="78" cy="30" r="2" fill="white" opacity={0.4} animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.circle cx="82" cy="22" r="3" fill="white" opacity={0.3} animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
            </>
          )}
        </svg>
      </motion.div>
    </AnimatePresence>
  );
}
