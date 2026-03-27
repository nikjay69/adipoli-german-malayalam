'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { feedbackCorrect, feedbackWrong, feedbackCombo, feedbackComboBreak, feedbackCelebration } from '@/lib/feedback';
import { isSoundEnabled } from '@/lib/feedback';

export interface GameConfig {
  totalRounds: number;
  /** Seconds per round, 0 = no timer */
  timePerRound?: number;
  /** Enable lives system */
  livesEnabled?: boolean;
  /** Starting lives (default 3) */
  startingLives?: number;
  /** Enable combo tracking + sounds */
  comboEnabled?: boolean;
  /** XP per correct answer */
  xpPerCorrect?: number;
  /** Extra XP per combo level */
  xpBonusCombo?: number;
}

export interface GameState {
  round: number;
  score: number;
  combo: number;
  maxCombo: number;
  lives: number;
  timeRemaining: number;
  totalCorrect: number;
  totalWrong: number;
  isComplete: boolean;
  isPaused: boolean;
}

export interface UseGameEngineReturn {
  state: GameState;
  /** Record a correct answer — increments score + combo */
  recordCorrect: () => void;
  /** Record a wrong answer — resets combo, may lose life */
  recordWrong: () => void;
  /** Advance to next round */
  nextRound: () => void;
  /** End the game */
  endGame: () => void;
  /** Pause / resume timer */
  togglePause: () => void;
  /** Reset entire game */
  reset: () => void;
  /** Computed values */
  percentComplete: number;
  accuracy: number;
  totalXP: number;
  isGameOver: boolean;
}

const DEFAULT_CONFIG: Required<GameConfig> = {
  totalRounds: 10,
  timePerRound: 0,
  livesEnabled: false,
  startingLives: 3,
  comboEnabled: true,
  xpPerCorrect: 5,
  xpBonusCombo: 2,
};

/**
 * Shared game engine hook.
 * Extracts scoring, timer, lives, and combo logic so games can focus on their unique mechanics.
 */
export function useGameEngine(config: GameConfig): UseGameEngineReturn {
  const cfg = { ...DEFAULT_CONFIG, ...config };

  const [state, setState] = useState<GameState>({
    round: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: cfg.startingLives,
    timeRemaining: cfg.timePerRound,
    totalCorrect: 0,
    totalWrong: 0,
    isComplete: false,
    isPaused: false,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer countdown
  useEffect(() => {
    if (cfg.timePerRound > 0 && !state.isComplete && !state.isPaused && state.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timeRemaining <= 1) {
            // Time's up for this round — count as wrong
            return {
              ...prev,
              timeRemaining: 0,
              combo: 0,
              totalWrong: prev.totalWrong + 1,
              lives: cfg.livesEnabled ? prev.lives - 1 : prev.lives,
              isComplete: cfg.livesEnabled && prev.lives <= 1,
            };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cfg.timePerRound, cfg.livesEnabled, state.isComplete, state.isPaused, state.timeRemaining, state.round]);

  const recordCorrect = useCallback(() => {
    setState(prev => {
      if (prev.isComplete) return prev;
      const newCombo = cfg.comboEnabled ? prev.combo + 1 : 0;
      const comboBonus = cfg.comboEnabled ? Math.min(newCombo, 10) * cfg.xpBonusCombo : 0;

      if (cfg.comboEnabled && isSoundEnabled()) {
        feedbackCombo(newCombo);
      } else {
        feedbackCorrect();
      }

      return {
        ...prev,
        score: prev.score + cfg.xpPerCorrect + comboBonus,
        combo: newCombo,
        maxCombo: Math.max(prev.maxCombo, newCombo),
        totalCorrect: prev.totalCorrect + 1,
      };
    });
  }, [cfg]);

  const recordWrong = useCallback(() => {
    setState(prev => {
      if (prev.isComplete) return prev;

      if (prev.combo > 2 && cfg.comboEnabled) {
        feedbackComboBreak();
      } else {
        feedbackWrong();
      }

      const newLives = cfg.livesEnabled ? prev.lives - 1 : prev.lives;
      return {
        ...prev,
        combo: 0,
        totalWrong: prev.totalWrong + 1,
        lives: newLives,
        isComplete: cfg.livesEnabled && newLives <= 0,
      };
    });
  }, [cfg]);

  const nextRound = useCallback(() => {
    setState(prev => {
      if (prev.isComplete) return prev;
      const newRound = prev.round + 1;
      const isComplete = newRound >= cfg.totalRounds;

      if (isComplete) {
        feedbackCelebration();
      }

      return {
        ...prev,
        round: newRound,
        timeRemaining: cfg.timePerRound,
        isComplete,
      };
    });
  }, [cfg]);

  const endGame = useCallback(() => {
    setState(prev => ({ ...prev, isComplete: true }));
    feedbackCelebration();
  }, []);

  const togglePause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const reset = useCallback(() => {
    setState({
      round: 0,
      score: 0,
      combo: 0,
      maxCombo: 0,
      lives: cfg.startingLives,
      timeRemaining: cfg.timePerRound,
      totalCorrect: 0,
      totalWrong: 0,
      isComplete: false,
      isPaused: false,
    });
  }, [cfg]);

  const totalAttempts = state.totalCorrect + state.totalWrong;
  const accuracy = totalAttempts > 0 ? Math.round((state.totalCorrect / totalAttempts) * 100) : 0;
  const percentComplete = cfg.totalRounds > 0 ? Math.round((state.round / cfg.totalRounds) * 100) : 0;
  const totalXP = state.score;
  const isGameOver = state.isComplete || (cfg.livesEnabled && state.lives <= 0);

  return {
    state,
    recordCorrect,
    recordWrong,
    nextRound,
    endGame,
    togglePause,
    reset,
    percentComplete,
    accuracy,
    totalXP,
    isGameOver,
  };
}
