'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isFocusedFirstPath =
    pathname === '/' ||
    pathname === '/intro' ||
    pathname === '/learn' ||
    pathname === '/learn/1' ||
    pathname === '/learn/2' ||
    pathname.startsWith('/missions/');
  const isLesson = pathname.startsWith('/play') || (pathname.startsWith('/learn/') && pathname.split('/').length > 3);
  const isGame = pathname.startsWith('/games/') && pathname !== '/games';
  const isPractice = pathname.startsWith('/practice/') && pathname !== '/practice';
  const isTest = pathname.startsWith('/tests/') && pathname !== '/tests';

  if (isFocusedFirstPath) {
    return <>{children}</>;
  }

  // Games: scale in from center (immersive feel)
  if (isGame) {
    return (
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  // Lessons: slide in from right (forward progress feel)
  if (isLesson) {
    return (
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  // Practice/Tests: fade with subtle scale
  if (isPractice || isTest) {
    return (
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    );
  }

  // Regular pages: smooth slide up with spring
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
