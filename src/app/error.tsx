'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Kuttan } from '@/components/character/Kuttan';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm"
      >
        <div className="flex justify-center mb-4">
          <Kuttan mood="sad" size="lg" />
        </div>

        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
          Aiyyo! Something went wrong
        </h2>
        <p className="text-sm text-[var(--foreground)]/50 mb-6">
          Don&apos;t worry, your progress is saved. Try again.
        </p>

        <div className="flex gap-3 justify-center">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => reset()}
            className="game-button px-6 py-3 text-sm"
          >
            Try Again
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 rounded-xl bg-[var(--foreground)]/10 text-sm font-bold"
          >
            Go Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
