'use client';

import { motion } from 'framer-motion';

interface GeminiBadgeProps {
  /** Whether to show the badge */
  visible?: boolean;
  /** Position override */
  className?: string;
}

/**
 * Small Gemini sparkle attribution badge.
 * Shows in the bottom-right corner when AI-generated content (via Gemini API) is displayed.
 */
export function GeminiBadge({ visible = true, className }: GeminiBadgeProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className || 'fixed bottom-4 right-4 z-40'}
    >
      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm shadow-sm">
        {/* Gemini sparkle icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#4285f4]">
          <path
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            fill="currentColor"
            opacity="0.8"
          />
          <path
            d="M19 2L19.75 4.25L22 5L19.75 5.75L19 8L18.25 5.75L16 5L18.25 4.25L19 2Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
        <span className="text-[9px] font-medium text-[var(--foreground)]/40">Gemini</span>
      </div>
    </motion.div>
  );
}
