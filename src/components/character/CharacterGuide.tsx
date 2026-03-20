'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Kuttan, KuttanMood } from './Kuttan';
import { Appu, AppuMood } from './Appu';
import { SpeechBubble } from './SpeechBubble';

export interface DialogueLine {
  text: string;
  mood?: KuttanMood;
  appuMood?: AppuMood;
  showAppu?: boolean;
}

interface CharacterGuideProps {
  /** Single message or array of messages to show in sequence */
  messages: string | DialogueLine[];
  /** Kuttan's mood (used when messages is a simple string) */
  mood?: KuttanMood;
  /** Size of the character */
  size?: 'sm' | 'md' | 'lg';
  /** Show Appu alongside Kuttan */
  showAppu?: boolean;
  /** Appu's mood */
  appuMood?: AppuMood;
  /** Layout direction */
  layout?: 'vertical' | 'horizontal';
  /** Called when all messages are done */
  onComplete?: () => void;
  /** Called on each message advance */
  onAdvance?: (index: number) => void;
  /** Show action button after messages */
  actionButton?: { label: string; onClick: () => void };
  /** Auto-advance messages */
  autoAdvanceMs?: number;
  className?: string;
}

export function CharacterGuide({
  messages,
  mood = 'happy',
  size = 'md',
  showAppu = false,
  appuMood = 'idle',
  layout = 'vertical',
  onComplete,
  onAdvance,
  actionButton,
  autoAdvanceMs,
  className = '',
}: CharacterGuideProps) {
  const lines: DialogueLine[] = typeof messages === 'string'
    ? [{ text: messages, mood }]
    : messages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [allDone, setAllDone] = useState(false);

  const currentLine = lines[currentIndex];
  const currentMood = currentLine?.mood || mood;
  const currentAppuMood = currentLine?.appuMood || appuMood;
  const shouldShowAppu = showAppu || currentLine?.showAppu;

  // Reset when messages change
  useEffect(() => {
    setCurrentIndex(0);
    setShowBubble(true);
    setAllDone(false);
  }, [messages]);

  const advance = useCallback(() => {
    if (currentIndex < lines.length - 1) {
      setShowBubble(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setShowBubble(true);
        onAdvance?.(currentIndex + 1);
      }, 200);
    } else {
      setAllDone(true);
      onComplete?.();
    }
  }, [currentIndex, lines.length, onComplete, onAdvance]);

  const isHorizontal = layout === 'horizontal';

  return (
    <div className={`flex ${isHorizontal ? 'flex-row items-end gap-4' : 'flex-col items-center'} ${className}`}>
      {/* Speech bubble (above character in vertical, beside in horizontal) */}
      {!allDone && currentLine && (
        <div className={isHorizontal ? 'flex-1' : ''}>
          <SpeechBubble
            message={currentLine.text}
            visible={showBubble}
            onDismiss={advance}
            position={isHorizontal ? 'bottom' : 'top'}
            autoAdvanceMs={autoAdvanceMs}
          />
        </div>
      )}

      {/* Action button (shows after all messages) */}
      <AnimatePresence>
        {allDone && actionButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={actionButton.onClick}
            className="game-button mb-4 text-lg"
          >
            {actionButton.label}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Characters */}
      <div className="flex items-end gap-2">
        <div className="flex flex-col items-center">
          <Kuttan mood={currentMood} size={size} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-0.5"
          >
            <span className="text-white/80 text-xs font-medium">Kuttan</span>
          </motion.div>
        </div>

        {shouldShowAppu && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
          >
            <Appu mood={currentAppuMood} size={size === 'lg' ? 'md' : size === 'md' ? 'sm' : 'xs'} />
            <span className="text-white/60 text-[10px] font-medium mt-1">Appu</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
