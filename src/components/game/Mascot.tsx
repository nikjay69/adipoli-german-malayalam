'use client';

import { motion, AnimatePresence } from 'framer-motion';

export const MASCOT_MESSAGES = {
  welcome: [
    "Namaskaram! Ente peru Gopi! German padicham? 🎉",
    "Heyy! German fun aaki padikkam! Ready ano? 🚀",
    "Welcome da! Germany-lekku ninte first step! Pokam! ✈️",
  ],
  comeback: [
    "Ethi! Streak break aakandey, cheetah speed-il pokam! 🔥",
    "Oh! Back aayee! Adipoli! Continue cheyyam! 💪",
    "Missed you machaa! Ninte streak wait cheyyunnu! ⚡",
  ],
  correct: [
    "Adipoli! You totally nailed it! 🔥",
    "Sheriyaayi! Perfect answer! Nee pro aanu! 🎯",
    "Wunderbar! Ithanu German-il 'Adipoli'! ⭐",
    "Richtig! 100%! Nee too good da! 🏆",
    "Super ayi! Keep it going! 🚀",
  ],
  wrong: [
    "Aiyyo! Almost there! Try once more! 💪",
    "Paravaala machaa! Mistakes = learning! 😄",
    "Enthu patti? Don't give up! You got this! 🙌",
    "Onnum illa! Oru more try! 🎯",
  ],
  encourage: [
    "Nee super aanu! Keep it up! 💪",
    "Adipoli ayi poidundu! Almost done! 🔥",
    "Ninte German super aakum! Just keep going! ⭐",
    "I believe in you machaa! Pokam! 🚀",
  ],
  celebrate: [
    "ADIPOLI! Nee cheythu! Incredible! 🎉",
    "Fantastisch! German-il ithanu 'Super'! You're a star! ⭐",
    "WOW! Kando? Nee actual German hero aanu! 🦸",
    "Malayali German Pro - that's YOU! 🏆",
  ],
  lesson_start: [
    "Puthiya padam! Something exciting today! 📚",
    "Ready? Pokam! Here we go! 🚀",
    "Ithum adipoli fun aakum! Promise! 🎮",
  ],
  lesson_complete: [
    "Lesson teernu! Adipoli da! 🎉",
    "Oru more step to German fluency! Super! 🏆",
    "Nee doing great! Streak alive aanu! 🔥",
  ],
};

export const getRandomMessage = (type: keyof typeof MASCOT_MESSAGES): string => {
  const messages = MASCOT_MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)];
};

interface MascotProps {
  message?: string;
  mood?: 'happy' | 'excited' | 'thinking' | 'celebrating' | 'sad';
  size?: 'sm' | 'md' | 'lg';
  showMessage?: boolean;
  onMessageDismiss?: () => void;
  animate?: boolean;
}

export function Mascot({
  message,
  mood = 'happy',
  size = 'md',
  showMessage = true,
  onMessageDismiss,
  animate = true,
}: MascotProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-3xl',
    md: 'w-24 h-24 text-5xl',
    lg: 'w-32 h-32 text-6xl',
  };

  const moodAnimations = {
    happy: 'animate-float',
    excited: 'animate-bounce-slow',
    thinking: '',
    celebrating: 'animate-wiggle',
    sad: '',
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence>
        {message && showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            onClick={onMessageDismiss}
            className="speech-bubble mb-4 max-w-[280px] text-center cursor-pointer"
          >
            <p className="text-sm font-medium">{message}</p>
            <p className="text-xs text-gray-400 mt-1">Tap cheyyuka to continue</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`
          ${sizeClasses[size]}
          ${animate ? moodAnimations[mood] : ''}
          bg-gradient-to-br from-[#ff6b9d]/20 to-[#a855f7]/20
          rounded-full flex items-center justify-center
          backdrop-blur-sm border-2 border-white/20
          cursor-pointer select-none
          shadow-lg shadow-[#ff6b9d]/20
        `}
      >
        <span className={mood === 'celebrating' ? 'animate-heart-beat' : ''}>
          🐘
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1"
      >
        <span className="text-white/80 text-xs font-medium">Gopi</span>
      </motion.div>
    </div>
  );
}
