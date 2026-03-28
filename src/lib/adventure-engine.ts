// Adventure Engine
// Transforms a lesson's content (vocab, exercises, decisions) into
// a seamless adventure sequence where Kuttan and the user explore together.

import type { Lesson, Exercise, VocabItem, StoryScene } from './content/types';
import type { KuttanMoodImage } from '@/components/character/KuttanImage';

export type AdventureMomentType =
  | 'kuttan-intro'       // Kuttan sets the scene
  | 'vocab-encounter'    // Natural vocab discovery (not a flashcard)
  | 'quick-game'         // Game challenge using recent vocab
  | 'kuttan-confused'    // Kuttan gets something wrong, user helps
  | 'decision'           // What do you say/do?
  | 'exercise-game'      // Exercise as a game
  | 'kuttan-react'       // Kuttan reacts to user's performance
  | 'scene-transition'   // Brief scene change/movement
  | 'celebration'        // Mini celebration between sections
  | 'finale'             // Lesson complete

export interface AdventureMoment {
  type: AdventureMomentType;
  /** Kuttan's mood for this moment */
  kuttanMood: KuttanMoodImage;
  /** What Kuttan says (Manglish) */
  kuttanSays?: string;
  /** The vocab item (for vocab-encounter) */
  vocab?: VocabItem;
  /** The exercise (for exercise-game) */
  exercise?: Exercise;
  /** Decision point data */
  decision?: StoryScene['decisionPoints'][0];
  /** Scene description for transitions */
  sceneText?: string;
  /** Index in the original vocab/exercise arrays */
  sourceIndex?: number;
}

// Kuttan's confused moments — he gets German wrong, user corrects
const KUTTAN_CONFUSIONS = [
  { wrong: "Machane, 'Ich bin kalt' means 'I am cold' right?", correct: "Nope! 'Ich bin kalt' means 'I am a cold person'! Use 'Mir ist kalt'!", mood: 'confused' as KuttanMoodImage },
  { wrong: "Wait wait... 'bekommen' means 'to become'?", correct: "Haha no! 'bekommen' = 'to get/receive'. Classic false friend!", mood: 'confused' as KuttanMoodImage },
  { wrong: "So 'Gift' in German means... a present?", correct: "Careful! 'Gift' = POISON in German! 'Geschenk' = gift! 😅", mood: 'confused' as KuttanMoodImage },
  { wrong: "I'll just say 'du' to everyone, easier right?", correct: "Aiyyo! Not to your boss or strangers! 'Sie' for formal, 'du' for friends!", mood: 'confused' as KuttanMoodImage },
  { wrong: "All nouns start with capital letters? That's weird...", correct: "Yep! Every. Single. Noun. 'der Hund', 'die Katze', 'das Auto'. That's German for you!", mood: 'thinking' as KuttanMoodImage },
];

const KUTTAN_CELEBRATIONS = [
  "Adipoli machane! We're crushing this! 🔥",
  "See? We make a great team! High five! ✋",
  "Germany, here we come! 🇩🇪",
  "Ithokke nammal TOGETHER cheythu! 💪",
  "Wunderbar! (that means wonderful btw 😉)",
];

const KUTTAN_REACTIONS_CORRECT = [
  { text: "YES! Nee arinjath correct aanu!", mood: 'excited' as KuttanMoodImage },
  { text: "Adipoli! I wasn't sure about that one!", mood: 'celebrating' as KuttanMoodImage },
  { text: "Oho! Nee ennekkaal smart aanu!", mood: 'happy' as KuttanMoodImage },
  { text: "Perfect! Nammal ith together cheyythu!", mood: 'thumbsup' as KuttanMoodImage },
];

const KUTTAN_REACTIONS_WRONG = [
  { text: "Paravaala! Njanum ithu wrong aakki first time!", mood: 'sad' as KuttanMoodImage },
  { text: "Aiyyo! Sheriyilla... but we learn from mistakes!", mood: 'thinking' as KuttanMoodImage },
  { text: "Hmm, athu tricky aayirunnu. Next time we'll get it!", mood: 'confused' as KuttanMoodImage },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Build an adventure sequence from lesson content.
 * Interleaves vocab, exercises, decisions, and Kuttan moments
 * into one flowing sequence that feels like an adventure, not a drill.
 */
export function buildAdventure(lesson: Lesson, shownVocab: VocabItem[], exercises: Exercise[]): AdventureMoment[] {
  const moments: AdventureMoment[] = [];
  const scene = lesson.storyScene;

  // 1. Kuttan intro — sets the scene
  moments.push({
    type: 'kuttan-intro',
    kuttanMood: 'waving',
    kuttanSays: scene?.kuttanIntro?.[Math.floor(Math.random() * (scene?.kuttanIntro?.length || 1))]
      || `Machane! ${lesson.title} — let's figure this out together!`,
    sceneText: scene?.setting.description || lesson.description,
  });

  // 2. Interleave vocab encounters with mini reactions
  shownVocab.forEach((vocab, i) => {
    // Vocab encounter
    const encounter = scene?.vocabEncounters?.[i];
    moments.push({
      type: 'vocab-encounter',
      kuttanMood: 'pointing',
      kuttanSays: encounter?.encounterMoment || `Check this out — "${vocab.german}"!`,
      vocab,
      sourceIndex: i,
    });

    // After every 2 vocab items, Kuttan reacts or gets confused
    if (i > 0 && i % 2 === 1) {
      if (Math.random() < 0.3 && KUTTAN_CONFUSIONS.length > 0) {
        // 30% chance Kuttan gets confused — user corrects him
        const confusion = pickRandom(KUTTAN_CONFUSIONS);
        moments.push({
          type: 'kuttan-confused',
          kuttanMood: confusion.mood,
          kuttanSays: confusion.wrong,
          sceneText: confusion.correct,
        });
      } else {
        // Quick game using recent vocab
        moments.push({
          type: 'quick-game',
          kuttanMood: 'excited',
          kuttanSays: "Quick test machane! Let's see if we remember! ⚡",
        });
      }
    }
  });

  // 3. Decision points from story
  if (scene?.decisionPoints) {
    scene.decisionPoints.forEach((dp, i) => {
      moments.push({
        type: 'decision',
        kuttanMood: 'thinking',
        kuttanSays: "Hmm... what should we do here? 🤔",
        decision: dp,
        sourceIndex: i,
      });
    });
  }

  // 4. Mini celebration after vocab + decisions
  moments.push({
    type: 'celebration',
    kuttanMood: 'celebrating',
    kuttanSays: pickRandom(KUTTAN_CELEBRATIONS),
  });

  // 5. Exercise games — interleaved with Kuttan reactions
  exercises.forEach((exercise, i) => {
    moments.push({
      type: 'exercise-game',
      kuttanMood: i % 3 === 0 ? 'pointing' : i % 3 === 1 ? 'thinking' : 'excited',
      kuttanSays: i === 0 ? "Okay, challenge time! Show me what we learned! 💪" : undefined,
      exercise,
      sourceIndex: i,
    });

    // React after every 3 exercises
    if (i > 0 && i % 3 === 2) {
      moments.push({
        type: 'kuttan-react',
        kuttanMood: 'happy',
        kuttanSays: pickRandom(KUTTAN_CELEBRATIONS),
      });
    }
  });

  // 6. Finale
  moments.push({
    type: 'finale',
    kuttanMood: 'celebrating',
    kuttanSays: scene?.narrative.nextTeaser
      ? `Adipoli! ${scene.narrative.nextTeaser}`
      : "We did it machane! Another adventure complete! 🎉",
  });

  return moments;
}

/** Get a random Kuttan reaction based on whether the user was correct */
export function getKuttanReaction(correct: boolean) {
  return correct ? pickRandom(KUTTAN_REACTIONS_CORRECT) : pickRandom(KUTTAN_REACTIONS_WRONG);
}
