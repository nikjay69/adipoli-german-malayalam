'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Gamepad2, BookOpen, User } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/games', icon: Gamepad2, label: 'Games' },
  { href: '/vocabulary', icon: BookOpen, label: 'Words' },
  { href: '/profile', icon: User, label: 'Me' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide navigation on immersive pages
  if (pathname.startsWith('/play') || pathname.startsWith('/learn/') || pathname.startsWith('/intro')) {
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

              return (
                <Link key={item.href} href={item.href} className="flex-1">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={clsx(
                      'flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all',
                      isActive && 'bg-[#d4a520]/10'
                    )}
                  >
                    <Icon
                      className={clsx(
                        'w-6 h-6 transition-colors',
                        isActive ? 'text-[#d4a520]' : 'text-[var(--foreground)]/40'
                      )}
                    />
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
