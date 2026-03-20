'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

interface SpeechBubbleProps {
  message: string;
  visible?: boolean;
  onDismiss?: () => void;
  onTypingDone?: () => void;
  typingSpeed?: number;
  position?: 'top' | 'bottom';
  autoAdvanceMs?: number;
  className?: string;
  showTapHint?: boolean;
}

export function SpeechBubble({
  message,
  visible = true,
  onDismiss,
  onTypingDone,
  typingSpeed = 30,
  position = 'top',
  autoAdvanceMs,
  className = '',
  showTapHint = true,
}: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Typing effect
  useEffect(() => {
    if (!visible || !message) return;

    setDisplayedText('');
    setIsTypingDone(false);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(message.slice(0, i));
      if (i >= message.length) {
        clearInterval(interval);
        setIsTypingDone(true);
        onTypingDone?.();
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [message, visible, typingSpeed, onTypingDone]);

  // Auto-advance
  useEffect(() => {
    if (!isTypingDone || !autoAdvanceMs) return;
    const timer = setTimeout(() => onDismiss?.(), autoAdvanceMs);
    return () => clearTimeout(timer);
  }, [isTypingDone, autoAdvanceMs, onDismiss]);

  const handleTap = useCallback(() => {
    if (!isTypingDone) {
      // Skip to full message
      setDisplayedText(message);
      setIsTypingDone(true);
      onTypingDone?.();
    } else {
      onDismiss?.();
    }
  }, [isTypingDone, message, onDismiss, onTypingDone]);

  const bubblePosition = position === 'top' ? 'mb-3' : 'mt-3';
  const arrowClass = position === 'top' ? 'speech-bubble-arrow-bottom' : 'speech-bubble-arrow-top';

  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: position === 'top' ? 10 : -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position === 'top' ? -10 : 10, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={handleTap}
          className={`speech-bubble ${bubblePosition} ${arrowClass} max-w-[300px] cursor-pointer select-none ${className}`}
        >
          <p className="text-sm font-medium leading-relaxed">
            {displayedText}
            {!isTypingDone && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block ml-0.5"
              >
                |
              </motion.span>
            )}
          </p>
          {isTypingDone && showTapHint && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-400 mt-1"
            >
              Tap to continue
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
