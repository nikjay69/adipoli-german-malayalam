'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Different transitions for different page types
  const isLesson = pathname.startsWith('/play') || pathname.startsWith('/learn/');
  const isGame = pathname.startsWith('/games/') && pathname !== '/games';
  const isPractice = pathname.startsWith('/practice/') && pathname !== '/practice';

  // Immersive pages get a subtle fade
  if (isLesson || isGame || isPractice) {
    return (
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    );
  }

  // Regular pages get a smooth slide-up
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
