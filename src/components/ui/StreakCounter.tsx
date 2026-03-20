'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <motion.div
      className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full font-bold shadow-md"
      animate={{ scale: streak > 0 ? [1, 1.05, 1] : 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={streak > 0 ? { rotate: [-5, 5, -5, 5, 0] } : undefined}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <Flame className="w-4 h-4 fill-white" />
      </motion.div>
      <span>{streak}</span>
      <span className="text-xs opacity-80">day{streak !== 1 ? 's' : ''}</span>
    </motion.div>
  );
}
