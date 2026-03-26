'use client';

import { motion } from 'framer-motion';
import { Kuttan } from '@/components/character/Kuttan';

export default function GameError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-sm">
        <div className="flex justify-center mb-4"><Kuttan mood="sad" size="md" /></div>
        <h2 className="text-lg font-bold mb-2">Game crashed!</h2>
        <p className="text-sm text-[var(--foreground)]/50 mb-4">Paravaala machaa, try again.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="game-button px-6 py-2.5 text-sm">Retry</button>
          <button onClick={() => window.location.href = '/games'} className="px-6 py-2.5 rounded-xl bg-[var(--foreground)]/10 text-sm font-bold">Back to Games</button>
        </div>
      </motion.div>
    </div>
  );
}
