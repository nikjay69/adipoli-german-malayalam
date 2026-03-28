'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Heart } from 'lucide-react';
import { speakGerman } from '@/lib/audio/useGermanTTS';
import { feedbackCorrect, feedbackWrong } from '@/lib/feedback';

interface MovingTarget {
  id: number;
  text: string;
  isCorrect: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alive: boolean;
}

interface ListenBlastProps {
  /** The correct word to listen for */
  correctWord: string;
  /** Wrong options */
  distractors: string[];
  onResult: (correct: boolean) => void;
}

/**
 * ListenBlast — TTS speaks a word, moving targets appear.
 * Tap the correct one before it escapes! Targets bounce off walls.
 * Real game: spatial tracking + audio comprehension + reflexes.
 */
export function ListenBlast({ correctWord, distractors, onResult }: ListenBlastProps) {
  const [targets, setTargets] = useState<MovingTarget[]>([]);
  const [tapped, setTapped] = useState(false);
  const [result, setResult] = useState<'correct' | 'wrong' | 'timeout' | null>(null);
  const [timeLeft, setTimeLeft] = useState(100);
  const animRef = useRef<number>(0);

  // Initialize targets at random positions with random velocities
  useEffect(() => {
    const all = [correctWord, ...distractors.slice(0, 3)];
    const initial: MovingTarget[] = all.map((text, i) => ({
      id: i,
      text,
      isCorrect: text === correctWord,
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      alive: true,
    }));
    setTargets(initial);

    // Speak the word
    setTimeout(() => { try { speakGerman(correctWord, 0.85); } catch {} }, 300);
  }, [correctWord, distractors]);

  // Animate targets — bounce off walls
  useEffect(() => {
    if (tapped) return;
    const animate = () => {
      setTargets(prev => prev.map(t => {
        if (!t.alive) return t;
        let nx = t.x + t.vx;
        let ny = t.y + t.vy;
        let nvx = t.vx;
        let nvy = t.vy;
        // Bounce off edges
        if (nx < 5 || nx > 90) { nvx = -nvx; nx = Math.max(5, Math.min(90, nx)); }
        if (ny < 5 || ny > 80) { nvy = -nvy; ny = Math.max(5, Math.min(80, ny)); }
        return { ...t, x: nx, y: ny, vx: nvx, vy: nvy };
      }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [tapped]);

  // Timer
  useEffect(() => {
    if (tapped) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          setResult('timeout');
          setTapped(true);
          feedbackWrong();
          setTimeout(() => onResult(false), 1000);
          return 0;
        }
        return prev - 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [tapped, onResult]);

  const handleTap = useCallback((target: MovingTarget) => {
    if (tapped) return;
    setTapped(true);
    cancelAnimationFrame(animRef.current);

    if (target.isCorrect) {
      setResult('correct');
      feedbackCorrect();
      setTimeout(() => onResult(true), 600);
    } else {
      setResult('wrong');
      feedbackWrong();
      setTimeout(() => onResult(false), 1000);
    }
  }, [tapped, onResult]);

  return (
    <div className="relative w-full h-[260px] overflow-hidden rounded-2xl bg-black/30 border border-white/10">
      {/* Timer bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-10">
        <motion.div className="h-full rounded-full"
          style={{ backgroundColor: timeLeft > 50 ? '#27ae60' : timeLeft > 25 ? '#d4a520' : '#c0392b' }}
          animate={{ width: `${timeLeft}%` }} transition={{ duration: 0.1 }} />
      </div>

      {/* Listen button */}
      <motion.button whileTap={{ scale: 0.9 }}
        onClick={() => { try { speakGerman(correctWord, 0.85); } catch {} }}
        className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4a520]/20 border border-[#d4a520]/30 text-xs text-[#d4a520]">
        <Volume2 className="w-3 h-3" /> Listen
      </motion.button>

      {/* Moving targets */}
      {targets.map(target => (
        <motion.button
          key={target.id}
          whileTap={{ scale: 0.8 }}
          onClick={() => handleTap(target)}
          disabled={tapped}
          className={`absolute px-3 py-2 rounded-xl text-sm font-bold border-2 whitespace-nowrap transition-colors ${
            tapped && target.isCorrect ? 'bg-[#27ae60]/30 border-[#27ae60] text-[#27ae60]' :
            tapped && result === 'wrong' && !target.isCorrect ? 'opacity-30' :
            'bg-white/10 border-white/20 text-white hover:border-[#d4a520]/50'
          }`}
          style={{
            left: `${target.x}%`,
            top: `${target.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={!tapped ? {
            x: [0, target.vx * 10, 0],
            y: [0, target.vy * 10, 0],
          } : {}}
          transition={!tapped ? { repeat: Infinity, duration: 2 + target.id * 0.3 } : {}}
        >
          {target.text}
        </motion.button>
      ))}

      {/* Result overlay */}
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl z-20">
          <div className="text-center">
            <p className="text-3xl">{result === 'correct' ? '🎯' : result === 'timeout' ? '⏰' : '❌'}</p>
            {result !== 'correct' && (
              <p className="text-xs text-[#27ae60] mt-1 font-bold">{correctWord}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
