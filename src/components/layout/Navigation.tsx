'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Gamepad2, Mic, FileText, User } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuthStore } from '@/lib/auth-store';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/games', icon: Gamepad2, label: 'Games' },
  { href: '/practice', icon: Mic, label: 'Practice' },
  { href: '/tests', icon: FileText, label: 'Tests' },
  { href: '/profile', icon: User, label: 'Me' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { user, isLoggedIn } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide navigation on immersive pages
  if (pathname.startsWith('/play') || pathname.startsWith('/learn/') || pathname.startsWith('/intro') || pathname.startsWith('/scripts') || (pathname.startsWith('/tests/') && pathname !== '/tests') || (pathname.startsWith('/practice/') && pathname !== '/practice') || pathname.startsWith('/auth/')) {
    return null;
  }

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-4 mb-4">
        <div className="bg-[#162416]/90 backdrop-blur-lg border border-[var(--foreground)]/8 rounded-2xl shadow-lg shadow-black/30">
          <div className="flex items-center justify-around py-2 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              const isProfileTab = item.href === '/profile';

              // Profile tab: if not logged in, link to login page
              const href = isProfileTab && !isLoggedIn ? '/auth/login' : item.href;

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
