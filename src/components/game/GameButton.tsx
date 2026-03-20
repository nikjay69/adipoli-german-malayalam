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
      bg-gradient-to-b from-[#ff6b9d] to-[#c44569]
      shadow-[0_6px_0_#9b2c4a,0_8px_20px_rgba(0,0,0,0.3)]
      active:shadow-[0_2px_0_#9b2c4a,0_4px_10px_rgba(0,0,0,0.3)]
      active:translate-y-1
      text-white
    `,
    secondary: `
      bg-gradient-to-b from-[#a855f7] to-[#7c3aed]
      shadow-[0_6px_0_#5b21b6,0_8px_20px_rgba(0,0,0,0.3)]
      active:shadow-[0_2px_0_#5b21b6,0_4px_10px_rgba(0,0,0,0.3)]
      active:translate-y-1
      text-white
    `,
    success: `
      bg-gradient-to-b from-[#00d9a5] to-[#00b388]
      shadow-[0_6px_0_#008060,0_8px_20px_rgba(0,0,0,0.3)]
      active:shadow-[0_2px_0_#008060,0_4px_10px_rgba(0,0,0,0.3)]
      active:translate-y-1
      text-white
    `,
    ghost: `
      bg-white/10 backdrop-blur-sm
      border-2 border-white/30
      text-white
      hover:bg-white/20
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
    default: 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50',
    selected: 'bg-[#a855f7]/30 border-[#a855f7]',
    correct: 'bg-[#00d9a5]/30 border-[#00d9a5] animate-pop',
    incorrect: 'bg-[#ff6b6b]/30 border-[#ff6b6b] animate-shake',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={clsx(
        'w-full p-4 rounded-xl border-2 text-left font-medium text-white transition-all',
        stateStyles[state],
        disabled && 'cursor-not-allowed'
      )}
    >
      {children}
    </motion.button>
  );
}
