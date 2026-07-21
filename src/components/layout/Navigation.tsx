'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sun, Map, Mic, User } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuthStore } from '@/lib/auth-store';
import { FEATURE_FLAGS } from '@/lib/app-config';

// MVP nav (docs/LEARNER_JOURNEY.md): Today / Course / Practice / Me.
// Games, tests, audio etc. stay reachable through the course path and
// recovery prescriptions — not through global navigation.
const navItems = [
  { href: '/learn', icon: Sun, label: 'Today' },
  { href: '/course', icon: Map, label: 'Course' },
  { href: '/practice', icon: Mic, label: 'Practice' },
  { href: '/profile', icon: User, label: 'Me' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { user, isLoggedIn } = useAuthStore();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  // Hide navigation on immersive/focused learning pages (hubs keep it)
  if (
    pathname === '/' ||
    pathname.startsWith('/play') ||
    pathname.startsWith('/intro') ||
    pathname.startsWith('/landing') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/preview') ||
    pathname.startsWith('/scripts') ||
    pathname.startsWith('/missions') ||
    /^\/learn\/\d+\/.+/.test(pathname) ||
    /^\/course\/\d+\/checkpoint/.test(pathname) ||
    pathname.startsWith('/onboarding') ||
    (pathname.startsWith('/tests/') && pathname !== '/tests') ||
    (pathname.startsWith('/practice/') && pathname !== '/practice') ||
    pathname.startsWith('/auth/')
  ) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom" aria-label="Main navigation">
      <div className="mx-4 mb-4">
        <div className="bg-[#162416]/90 backdrop-blur-lg border border-[var(--foreground)]/8 rounded-2xl shadow-lg shadow-black/30">
          <div className="flex items-center justify-around py-2 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              const isProfileTab = item.href === '/profile';

              // Profile tab: if auth is not live, keep users in guest profile instead of fake login.
              const href = isProfileTab && !isLoggedIn && FEATURE_FLAGS.canCreateAccounts ? '/auth/login' : item.href;

              return (
                <Link key={item.href} href={href} className="flex-1">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={clsx(
                      'flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all',
                      isActive && 'bg-[#d4a520]/10'
                    )}
                  >
                    {/* Show user initial avatar for logged-in profile tab */}
                    {isProfileTab && isLoggedIn && user ? (
                      <div
                        className={clsx(
                          'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                          isActive
                            ? 'bg-[#d4a520] text-[#1b2d1b]'
                            : 'bg-[var(--foreground)]/10 text-[var(--foreground)]/40'
                        )}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <Icon
                        className={clsx(
                          'w-6 h-6 transition-colors',
                          isActive ? 'text-[#d4a520]' : 'text-[var(--foreground)]/40'
                        )}
                      />
                    )}
                    <span
                      className={clsx(
                        'text-xs mt-1 transition-colors',
                        isActive ? 'text-[#d4a520] font-medium' : 'text-[var(--foreground)]/40'
                      )}
                    >
                      {item.label}
                    </span>
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-dot"
                        className="w-1 h-1 rounded-full bg-[#d4a520] mt-0.5"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
