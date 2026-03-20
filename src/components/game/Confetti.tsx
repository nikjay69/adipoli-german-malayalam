'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
  size: number;
}

const COLORS = ['#ff6b9d', '#ffd93d', '#00d9a5', '#a855f7', '#3b82f6', '#f97316'];

export function Confetti({ isActive, duration = 3000 }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          delay: Math.random() * 0.5,
          rotation: Math.random() * 360,
          size: Math.random() * 10 + 5,
        });
      }
      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration]);

  return (
    <AnimatePresence>
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="confetti-piece pointer-events-none"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
          initial={{ top: '-5%', rotate: 0, opacity: 1 }}
          animate={{
            top: '105%',
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: 'easeOut',
          }}
          exit={{ opacity: 0 }}
        />
      ))}
    </AnimatePresence>
  );
}

// XP Gain Animation
interface XPGainProps {
  amount: number;
  isVisible: boolean;
  onComplete?: () => void;
}

export function XPGain({ amount, isVisible, onComplete }: XPGainProps) {
  useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, y: 0 }}
          animate={{ scale: 1, y: -50 }}
          exit={{ scale: 0, y: -100, opacity: 0 }}
          className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 xp-popup"
        >
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold text-2xl px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <span>+{amount}</span>
            <span className="text-lg">XP</span>
            <span className="text-2xl">⭐</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Celebration Screen
interface CelebrationProps {
  isVisible: boolean;
  title: string;
  subtitle?: string;
  xpEarned: number;
  onContinue: () => void;
}

export function Celebration({ isVisible, title, subtitle, xpEarned, onContinue }: CelebrationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <Confetti isActive={true} />

          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-center px-8"
          >
            {/* Trophy */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🏆
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-white mb-2"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/80 mb-6"
              >
                {subtitle}
              </motion.p>
            )}

            {/* XP Display */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold text-3xl px-8 py-4 rounded-2xl shadow-lg mb-8"
            >
              <span>+{xpEarned}</span>
              <span className="text-2xl">XP</span>
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                className="text-4xl"
              >
                ⭐
              </motion.span>
            </motion.div>

            {/* Continue Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={onContinue}
              className="game-button text-xl w-full max-w-xs"
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Stars Rating Display
interface StarsProps {
  rating: number; // 0-3
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function Stars({ rating, size = 'md', animated = false }: StarsProps) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' };

  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((star) => (
        <motion.span
          key={star}
          initial={animated ? { scale: 0, rotate: -180 } : undefined}
          animate={animated ? { scale: 1, rotate: 0 } : undefined}
          transition={{ delay: star * 0.2, type: 'spring' }}
          className={`${sizes[size]} ${star <= rating ? 'star-filled' : 'star-empty'}`}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}
