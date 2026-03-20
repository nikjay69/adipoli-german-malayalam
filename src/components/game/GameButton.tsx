'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
  pulse?: boolean;
}

export function GameButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  icon,
  pulse = false,
}: GameButtonProps) {
  const baseStyles = `
    font-bold rounded-2xl transition-all duration-100
    flex items-center justify-center gap-3
    uppercase tracking-wide
    select-none
  `;

  const variants = {
    primary: `
      bg-gradient-to-b from-[#d4a520] to-[#b8891a]
      shadow-[0_5px_0_#8a6412,0_7px_16px_rgba(0,0,0,0.3)]
      active:shadow-[0_2px_0_#8a6412,0_3px_8px_rgba(0,0,0,0.3)]
      active:translate-y-[3px]
      text-[#1b2d1b]
    `,
    secondary: `
      bg-gradient-to-b from-[#c0392b] to-[#962d22]
      shadow-[0_5px_0_#6b1f17,0_7px_16px_rgba(0,0,0,0.3)]
      active:shadow-[0_2px_0_#6b1f17,0_3px_8px_rgba(0,0,0,0.3)]
      active:translate-y-[3px]
      text-white
    `,
    success: `
      bg-gradient-to-b from-[#27ae60] to-[#1e8449]
      shadow-[0_5px_0_#14572b,0_7px_16px_rgba(0,0,0,0.3)]
      active:shadow-[0_2px_0_#14572b,0_3px_8px_rgba(0,0,0,0.3)]
      active:translate-y-[3px]
      text-white
    `,
    ghost: `
      bg-[var(--card-bg)]
      border-2 border-[var(--card-border)]
      text-[var(--foreground)]
      hover:bg-[var(--foreground)]/10
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      animate={pulse && !disabled ? { scale: [1, 1.02, 1] } : undefined}
      transition={pulse ? { duration: 1.5, repeat: Infinity } : undefined}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        pulse && !disabled && 'animate-pulse-glow',
        className
      )}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </motion.button>
  );
}

// Choice Button for exercises
interface ChoiceButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  state?: 'default' | 'selected' | 'correct' | 'incorrect';
  disabled?: boolean;
}

export function ChoiceButton({ children, onClick, state = 'default', disabled = false }: ChoiceButtonProps) {
  const stateStyles = {
    default: 'bg-[var(--card-bg)] border-[var(--card-border)] hover:bg-[var(--foreground)]/10 hover:border-[var(--foreground)]/20',
    selected: 'bg-[#d4a520]/15 border-[#d4a520]',
    correct: 'bg-[#27ae60]/20 border-[#27ae60] animate-pop',
    incorrect: 'bg-[#c0392b]/20 border-[#c0392b] animate-shake',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={clsx(
        'w-full p-4 rounded-xl border-2 text-left font-medium transition-all',
        stateStyles[state],
        disabled && 'cursor-not-allowed'
      )}
    >
      {children}
    </motion.button>
  );
}
