'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: 'primary' | 'success' | 'warning' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  color = 'primary',
  size = 'md',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const colors = {
    primary: 'bg-[#d4a520]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    secondary: 'bg-[#27ae60]',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={clsx('w-full', className)}>
      <div className={clsx('w-full bg-[var(--foreground)]/10 rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={clsx('h-full rounded-full', colors[color])}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-right">
          {Math.round(clampedProgress)}%
        </p>
      )}
    </div>
  );
}
