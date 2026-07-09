'use client';

// Root has ONE job: send the visitor to their single home (DECISIONS #13, one-path rule).
// Cold visitor  → /intro  (promise screen + first German action inside 90 seconds).
// Everyone else → /learn  (the Today command center — the only home).
// The old study-plan dashboard is parked in _legacy-dashboard-home.tsx, not routed.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';

export default function RootRedirect() {
  const router = useRouter();
  const { userProgress } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isColdVisitor = !userProgress.hasSeenIntro && userProgress.completedLessons.length === 0;
    router.replace(isColdVisitor ? '/intro' : '/learn');
  }, [mounted, router, userProgress.hasSeenIntro, userProgress.completedLessons.length]);

  // Blank shell for the instant before replace() lands — no competing home may render here.
  return <div className="min-h-screen" aria-hidden="true" />;
}
