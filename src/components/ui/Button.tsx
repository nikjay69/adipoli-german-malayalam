'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-[#e94560] hover:bg-[#d63d56] text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-[#0f3460] hover:bg-[#1a4a80] text-white shadow-lg hover:shadow-xl',
    success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
