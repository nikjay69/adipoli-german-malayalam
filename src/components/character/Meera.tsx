'use client';

import { motion } from 'framer-motion';

const SIZE_MAP = {
  xs: 'h-14 w-10',
  sm: 'h-24 w-16',
  md: 'h-36 w-24',
  lg: 'h-48 w-32',
  xl: 'h-60 w-40',
};

export function Meera({
  size = 'md',
  className = '',
  animate = true,
}: {
  size?: keyof typeof SIZE_MAP;
  className?: string;
  animate?: boolean;
}) {
  return (
    <motion.img
      src="/images/characters/meera-presenting.png"
      alt="Meera"
      className={`${SIZE_MAP[size]} object-contain object-bottom drop-shadow-lg ${className}`}
      initial={animate ? { opacity: 0, scale: 0.94 } : false}
      animate={animate ? { opacity: 1, scale: 1, y: [0, -3, 0] } : undefined}
      transition={animate ? { opacity: { duration: 0.3 }, scale: { duration: 0.3 }, y: { repeat: Infinity, duration: 3.1, ease: 'easeInOut' } } : undefined}
    />
  );
}
