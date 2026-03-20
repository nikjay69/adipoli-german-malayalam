'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className = '',
  onClick,
  hover = false,
  padding = 'md',
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-2xl shadow-md',
        paddingStyles[padding],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
