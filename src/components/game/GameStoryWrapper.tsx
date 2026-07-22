'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterGuide } from '@/components/character';
import { SceneBackground } from '@/components/visual';
import { GameButton } from './GameButton';
import { startAmbience, stopAmbience } from '@/lib/audio/ambience';
import type { SceneType } from '@/lib/audio/ambience';

export interface GameStoryContext {
  /** Scene type for background + ambience */
  scene: SceneType;
  /** Story title shown during intro */
  title: string;
  /** Narrative setup text */
  narrative: string;
  /** Nivin's Manglish intro */
  peerSays?: string;
  /** @deprecated Compatibility field for legacy game pages. */
  kuttanSays?: string;
  /** Emoji for the scene */
  emoji: string;
}

interface GameStoryWrapperProps {
  story: GameStoryContext;
  children: React.ReactNode;
}

/**
 * Wraps any game with a 3-second narrative intro + ambient soundscape.
 * Shows a story screen first, then renders the game.
 */
export function GameStoryWrapper({ story, children }: GameStoryWrapperProps) {
  const [showIntro, setShowIntro] = useState(true);

  // Start ambience on mount
  useEffect(() => {
    startAmbience(story.scene, 0.25);
    return () => { stopAmbience(500); };
  }, [story.scene]);

  return (
    <>
      {/* Scene background — always visible */}
      <SceneBackground scene={story.scene} opacity={0.15} />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="story-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-[var(--background)]/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl mb-4"
            >
              {story.emoji}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-bold text-center mb-2"
            >
              {story.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-[var(--foreground)]/60 text-center max-w-sm mb-5 leading-relaxed"
            >
              {story.narrative}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <CharacterGuide
                messages={story.peerSays ?? story.kuttanSays ?? ''}
                mood="excited"
                size="sm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6"
            >
              <GameButton onClick={() => setShowIntro(false)} variant="primary" size="lg">
                Let&apos;s Go!
              </GameButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="game-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Pre-defined story contexts for existing games ──────────────

export const GAME_STORIES: Record<string, GameStoryContext> = {
  'article-blitz': {
    scene: 'street',
    title: 'Sorting Day at REWE!',
    narrative: 'You got a part-time job at REWE supermarket. Your task: sort every item into the right aisle — der, die, or das. The manager is watching!',
    peerSays: 'Machane! REWE supermarket-il nammal job kittiyi! Items sort cheyyuka — der, die, das aisle-il! Manager nokkunnund!',
    emoji: '🛒',
  },
  'speed-quiz': {
    scene: 'bahnhof',
    title: 'Airport Dash!',
    narrative: 'Your flight is boarding in 5 minutes! Answer vocab questions as fast as you can while running through the airport. Every second counts!',
    peerSays: 'Flight boarding aakunnuuuu! Speed-il answer cheyy machane — nee miss cheythal plane poyi!',
    emoji: '✈️',
  },
  'number-blitz': {
    scene: 'street',
    title: 'Kochi Fish Market... auf Deutsch!',
    narrative: 'Imagine the Kochi fish market, but all the vendors speak German! Can you understand the prices and numbers they\'re shouting?',
    peerSays: 'Kochi fish market aanu machane, but vendors ellam German-il aanu parayunne! Numbers pidikkanam!',
    emoji: '🐟',
  },
  'food-order': {
    scene: 'cafe',
    title: 'Dinner at Gasthof zum Bären',
    narrative: 'A traditional German restaurant. The waiter approaches with a notepad. It\'s time to order — auf Deutsch, natürlich!',
    peerSays: 'German restaurant-il aanu nammal! Waiter vannu — enthaa order cheyyuka? German-il parayan padikkaam!',
    emoji: '🍽️',
  },
  'fill-the-gap': {
    scene: 'kitchen',
    title: 'WhatsApp from your Flatmate',
    narrative: 'Your WG flatmate sent a WhatsApp message, but autocorrect mangled some words! Can you fix them before replying?',
    peerSays: 'Roommate WhatsApp-il message ayachirikkunnu, but autocorrect kashttam aakki! Fix cheyyuka machane!',
    emoji: '📱',
  },
  'greeting-time': {
    scene: 'street',
    title: 'A Day of Greetings!',
    narrative: 'Walk through a full day in Germany — morning to night. Greet everyone you meet with the right words!',
    peerSays: 'Morning muthal night vare — ellarum-neyum correct-aayi greet cheyyuka! Ready?',
    emoji: '👋',
  },
  'dialogue-dash': {
    scene: 'cafe',
    title: 'Café Conversations!',
    narrative: 'You\'re at a busy Berlin café. People keep starting conversations with you. Can you keep up?',
    peerSays: 'Berlin café-il aarenkilum ninnod samsarikkaan varunnu! German-il reply cheyyuka — fast!',
    emoji: '💬',
  },
  'verb-rush': {
    scene: 'classroom',
    title: 'Professor\'s Pop Quiz!',
    narrative: 'The German professor surprised everyone with a verb conjugation quiz. Conjugate under pressure!',
    peerSays: 'Aiyyo! Professor surprise quiz thannirikkunu! Verbs conjugate cheyy — vega!',
    emoji: '📝',
  },
  'sentence-builder': {
    scene: 'office',
    title: 'Your Bewerbung (Application)!',
    narrative: 'You\'re writing a job application letter. Build grammatically perfect German sentences to impress the hiring manager!',
    peerSays: 'Job application ezhuthanam machane! Sentence perfect aayirikkanam — manager-ne impress cheyyanam!',
    emoji: '💼',
  },
  'scene-sort': {
    scene: 'classroom',
    title: 'Scene Sort at Sprachschule!',
    narrative: 'Which place does each word belong to? Sort German words into Küche, Bahnhof, or Arztpraxis.',
    peerSays: 'Sprachschule-il Scene Sort machane! Oru word — ethu place-il cherum? Kitchen, station, clinic — sort cheyyuka!',
    emoji: '🎭',
  },
  'memory': {
    scene: 'cafe',
    title: 'Eavesdrop at the Café!',
    narrative: 'You\'re sitting in a Berlin café. Conversations float around you in German. Can you understand what people are saying?',
    peerSays: 'Shh! Café-il aarenkilum samsaarikkunnath kelkkuka machane! German understand cheyyuka — nee spy aanu!',
    emoji: '👂',
  },
};
