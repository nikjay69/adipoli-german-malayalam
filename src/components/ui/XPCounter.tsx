'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface XPCounterProps {
  xp: number;
  showAnimation?: boolean;
}

export function XPCounter({ xp, showAnimation = true }: XPCounterProps) {
  const [displayXP, setDisplayXP] = useState(xp);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (xp !== displayXP && showAnimation) {
      setIsAnimating(true);
      const diff = xp - displayXP;
      const steps = Math.min(Math.abs(diff), 20);
      const increment = diff / steps;
      let current = displayXP;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current += increment;
        setDisplayXP(Math.round(current));

        if (step >= steps) {
          clearInterval(interval);
          setDisplayXP(xp);
          setTimeout(() => setIsAnimating(false), 300);
        }
      }, 50);

      return () => clearInterval(interval);
    } else {
      setDisplayXP(xp);
    }
  }, [xp, displayXP, showAnimation]);

  return (
    <motion.div
      className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1.5 rounded-full font-bold shadow-md"
      animate={isAnimating ? { scale: [1, 1.1, 1] } : undefined}
    >
      <Star className="w-4 h-4 fill-white" />
      <span>{displayXP.toLocaleString()}</span>
      <span className="text-xs opacity-80">XP</span>
      <AnimatePresence>
        {isAnimating && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-500 font-bold text-sm"
          >
            +{xp - displayXP + (xp - displayXP > 0 ? Math.abs(xp - displayXP) : 0)}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
