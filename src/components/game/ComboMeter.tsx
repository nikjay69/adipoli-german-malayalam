'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ComboMeterProps {
  combo: number;
  maxCombo: number;
}

const MILESTONES = [
  { threshold: 3, label: 'Gut!', color: '#d4a520', emoji: '👍' },
  { threshold: 5, label: 'Super!', color: '#27ae60', emoji: '🔥' },
  { threshold: 10, label: 'UNGLAUBLICH!', color: '#3b82f6', emoji: '⚡' },
  { threshold: 15, label: 'WAHNSINN!', color: '#e94560', emoji: '💥' },
  { threshold: 20, label: 'LEGENDE!', color: '#9333ea', emoji: '🌟' },
];

function getMilestone(combo: number) {
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (combo >= MILESTONES[i].threshold) return MILESTONES[i];
  }
  return null;
}

/**
 * Visual combo/streak meter with milestone celebrations.
 * Shows current combo count with escalating visual intensity.
 */
export function ComboMeter({ combo, maxCombo }: ComboMeterProps) {
  const milestone = getMilestone(combo);
  const barWidth = Math.min((combo / 20) * 100, 100);

  if (combo === 0 && maxCombo === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {/* Combo bar */}
      <div className="flex-1 h-2 bg-[var(--foreground)]/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: milestone?.color || '#d4a520' }}
          animate={{ width: `${barWidth}%` }}
          transition={{ type: 'spring', damping: 15 }}
        />
      </div>

      {/* Combo count */}
      <AnimatePresence mode="wait">
        {combo > 0 && (
          <motion.div
            key={combo}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex items-center gap-1"
          >
            <span
              className="text-xs font-bold"
              style={{ color: milestone?.color || '#d4a520' }}
            >
              {combo}x
            </span>
            {milestone && (
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-xs"
              >
                {milestone.emoji}
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone label flash */}
      <AnimatePresence>
        {milestone && combo === milestone.threshold && (
          <motion.span
            initial={{ opacity: 0, y: -10, scale: 1.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-[10px] font-black uppercase tracking-wider"
            style={{ color: milestone.color }}
          >
            {milestone.label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Compact combo badge for use inside game headers.
 */
export function ComboBadge({ combo }: { combo: number }) {
  if (combo < 2) return null;

  const milestone = getMilestone(combo);

  return (
    <motion.div
      key={combo}
      initial={{ scale: 1.3 }}
      animate={{ scale: 1 }}
      className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold"
      style={{
        backgroundColor: `${milestone?.color || '#d4a520'}20`,
        color: milestone?.color || '#d4a520',
      }}
    >
      {combo}x {milestone?.emoji || '🔥'}
    </motion.div>
  );
}
