'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Nivin } from '@/components/character/Nivin';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(212,165,32,0.15), transparent 60%)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center max-w-sm"
      >
        <div className="flex justify-center mb-4">
          <Nivin mood="sad" size="lg" />
        </div>

        <h1 className="text-5xl font-black gradient-text mb-3">404</h1>
        <p className="text-[var(--foreground)] text-lg font-semibold mb-1">
          Iee page enthaanu?
        </p>
        <p className="text-sm text-[var(--foreground)]/50 mb-6">
          (What page is this?) Let&apos;s go home, machaa.
        </p>

        <Link href="/">
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            className="px-8 py-3.5 text-base font-bold rounded-xl text-[#1b2d1b] shadow-lg shadow-[#d4a520]/20"
            style={{ background: 'linear-gradient(135deg, #d4a520 0%, #e8c54a 50%, #27ae60 100%)' }}
          >
            Back to Home →
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
