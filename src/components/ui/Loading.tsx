'use client';

import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md';
}

export function Loading({ message, size = 'md' }: LoadingProps) {
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {/* Animated dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${dotSize} rounded-full bg-gradient-to-r from-[#d4a520] to-[#27ae60]`}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-[var(--foreground)]/40"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
