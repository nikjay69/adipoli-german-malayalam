'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { feedbackCorrect, feedbackWrong } from '@/lib/feedback';

interface FlyingWord {
  id: number;
  text: string;
  isTarget: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alive: boolean;
  sliced: boolean;
}

interface WordNinjaProps {
  /** The prompt shown at top (e.g., "Slice the German GREETINGS!") */
  prompt: string;
  /** Words that are correct targets */
  targets: string[];
  /** Words that are wrong (avoid these) */
  distractors: string[];
  onResult: (correct: boolean) => void;
}

/**
 * WordNinja — words fly across the screen, tap/slice the correct ones.
 * Wrong words must be AVOIDED. Speed increases. Lives system.
 * Genuinely a game — timing, reflexes, spatial awareness.
 */
export function WordNinja({ prompt, targets, distractors, onResult }: WordNinjaProps) {
  const [words, setWords] = useState<FlyingWord[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [targetsLeft, setTargetsLeft] = useState(targets.length);
  const spawnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(0);
  const allTargets = useRef([...targets]);
  const allDistractors = useRef([...distractors]);
  const spawnedTargets = useRef(0);

  // Spawn words at intervals
  useEffect(() => {
    if (gameOver) return;

    const spawnWord = () => {
      if (gameOver) return;

      // Decide target or distractor
      const useTarget = spawnedTargets.current < allTargets.current.length && Math.random() < 0.5;
      let text: string;
      let isTarget: boolean;

      if (useTarget) {
        text = allTargets.current[spawnedTargets.current];
        spawnedTargets.current++;
        isTarget = true;
      } else {
        text = allDistractors.current[Math.floor(Math.random() * allDistractors.current.length)] || 'Nein';
        isTarget = false;
      }

      // Random start position (edges)
      const side = Math.floor(Math.random() * 4);
      let x: number, y: number, vx: number, vy: number;
      const speed = 0.3 + score * 0.05; // Gets faster!

      switch (side) {
        case 0: // left
          x = -10; y = 20 + Math.random() * 60; vx = speed; vy = (Math.random() - 0.5) * 0.3; break;
        case 1: // right
          x = 110; y = 20 + Math.random() * 60; vx = -speed; vy = (Math.random() - 0.5) * 0.3; break;
        case 2: // top
          x = 20 + Math.random() * 60; y = -10; vx = (Math.random() - 0.5) * 0.3; vy = speed; break;
        default: // bottom
          x = 20 + Math.random() * 60; y = 110; vx = (Math.random() - 0.5) * 0.3; vy = -speed; break;
      }

      setWords(prev => [...prev, { id: nextId.current++, text, isTarget, x, y, vx, vy, alive: true, sliced: false }]);

      // Schedule next spawn
      const delay = Math.max(600, 1500 - score * 100);
      spawnTimer.current = setTimeout(spawnWord, delay);
    };

    spawnTimer.current = setTimeout(spawnWord, 500);
    return () => { if (spawnTimer.current) clearTimeout(spawnTimer.current); };
  }, [gameOver, score, targets.length]);

  // Move words
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setWords(prev => {
        const updated = prev.map(w => {
          if (!w.alive) return w;
          const nx = w.x + w.vx;
          const ny = w.y + w.vy;
          // Remove if off-screen
          if (nx < -20 || nx > 120 || ny < -20 || ny > 120) {
            // If target escaped, it's a miss
            if (w.isTarget && !w.sliced) {
              setLives(l => {
                const nl = l - 1;
                if (nl <= 0) setGameOver(true);
                return nl;
              });
              feedbackWrong();
              setTargetsLeft(t => t - 1);
            }
            return { ...w, alive: false };
          }
          return { ...w, x: nx, y: ny };
        });
        return updated.filter(w => w.alive || w.sliced);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Check win
  useEffect(() => {
    if (score >= targets.length && !gameOver) {
      setGameOver(true);
      setTimeout(() => onResult(true), 800);
    }
  }, [score, targets.length, gameOver, onResult]);

  // Check lose
  useEffect(() => {
    if (lives <= 0 && !gameOver) {
      setGameOver(true);
      setTimeout(() => onResult(false), 800);
    }
  }, [lives, gameOver, onResult]);

  const handleTap = useCallback((word: FlyingWord) => {
    if (gameOver || word.sliced) return;

    if (word.isTarget) {
      feedbackCorrect();
      setScore(s => s + 1);
      setTargetsLeft(t => t - 1);
      setWords(prev => prev.map(w => w.id === word.id ? { ...w, sliced: true, alive: false } : w));
    } else {
      feedbackWrong();
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) setGameOver(true);
        return nl;
      });
      setWords(prev => prev.map(w => w.id === word.id ? { ...w, sliced: true, alive: false } : w));
    }
  }, [gameOver]);

  return (
    <div className="relative w-full h-[280px] overflow-hidden rounded-2xl bg-black/30 border border-white/10">
      {/* HUD */}
      <div className="absolute top-2 left-3 right-3 z-10 flex items-center justify-between">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <Heart key={i} className={`w-4 h-4 ${i < lives ? 'text-[#e94560] fill-[#e94560]' : 'text-white/20'}`} />
          ))}
        </div>
        <p className="text-[10px] text-white/50 font-bold">{score}/{targets.length}</p>
      </div>

      {/* Prompt */}
      <div className="absolute top-8 left-0 right-0 text-center z-10">
        <p className="text-xs text-[#d4a520] font-bold">{prompt}</p>
      </div>

      {/* Flying words */}
      <AnimatePresence>
        {words.filter(w => w.alive).map(word => (
          <motion.button
            key={word.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleTap(word)}
            className={`absolute px-3 py-1.5 rounded-xl text-sm font-bold border-2 whitespace-nowrap ${
              word.isTarget
                ? 'bg-[#d4a520]/20 border-[#d4a520]/40 text-[#d4a520]'
                : 'bg-white/10 border-white/20 text-white/70'
            }`}
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {word.text}
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Slice effects */}
      <AnimatePresence>
        {words.filter(w => w.sliced).map(word => (
          <motion.div
            key={`slice-${word.id}`}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute w-8 h-8 rounded-full ${word.isTarget ? 'bg-[#27ae60]/30' : 'bg-[#c0392b]/30'}`}
            style={{ left: `${word.x}%`, top: `${word.y}%`, transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </AnimatePresence>

      {/* Game over overlay */}
      {gameOver && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
          <div className="text-center">
            <p className="text-3xl mb-1">{score >= targets.length ? '⚔️' : '💥'}</p>
            <p className="text-white font-bold">{score}/{targets.length}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
