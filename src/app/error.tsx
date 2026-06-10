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
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(233,69,96,0.12), transparent 60%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center max-w-sm"
      >
        <div className="flex justify-center mb-4">
          <Kuttan mood="thinking" size="lg" />
        </div>

        <h2 className="text-2xl font-bold gradient-text mb-2">
          Aiyo! Something broke.
        </h2>
        <p className="text-sm text-[var(--foreground)]/70 mb-3">
          Not your fault, machaa — try again?
        </p>
        <p className="text-[10px] text-[#c0392b]/50 mb-5 font-mono break-all px-2 leading-relaxed">
          {error?.message || 'Unknown error'}
        </p>

        <div className="flex gap-3 justify-center">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => reset()}
            className="px-6 py-3 text-sm font-bold rounded-xl text-[#1b2d1b] shadow-lg shadow-[#d4a520]/20"
            style={{ background: 'linear-gradient(135deg, #d4a520 0%, #e8c54a 100%)' }}
          >
            Try Again
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 rounded-xl bg-[var(--foreground)]/10 hover:bg-[var(--foreground)]/15 text-sm font-bold transition-colors"
          >
            Go Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
