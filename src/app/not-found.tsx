'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Kuttan } from '@/components/character/Kuttan';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm"
      >
        <div className="flex justify-center mb-4">
          <Kuttan mood="thinking" size="lg" />
        </div>

        <h1 className="text-4xl font-black gradient-text mb-2">404</h1>
        <p className="text-[var(--foreground)]/60 mb-1">
          Aiyyo! This page doesn&apos;t exist.
        </p>
        <p className="text-sm text-[var(--foreground)]/40 mb-6">
          Kuttan is confused too. Let&apos;s go back.
        </p>

        <Link href="/">
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="game-button px-8 py-3 text-base"
          >
            Go Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
