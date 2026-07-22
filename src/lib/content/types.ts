// Shared types for course content

import type { LearnerPeerId } from '@/lib/cast';


export type RichElement = 
  | { type: 'table'; title?: string; headers: string[]; rows: string[][] }
  | { type: 'note'; title?: string; content: string; variant: 'info' | 'tip' | 'warning' }
  | { type: 'list'; title?: string; items: string[] }
  | { type: 'vocabulary'; items: { german: string; english: string; malayalam: string; pronunciation: string }[] };

export interface Video {
  id: string;
  title: string;
  duration: string;
  description: string;
  scriptOutline: string[];
  keyVocabulary: string[];
  learningObjectives: string[];
  placeholderThumbnail: string;
  /** Full video script for recording/generation */
  script?: string;
  /** URL once video is uploaded */
  videoUrl?: string;
  /** Automatically generated rich content from the script */
  richContent?: RichElement[];
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'ordering' | 'speaking' | 'free-text' | 'dictation' | 'image-prompt' | 'type-answer';
  question: string;
  questionGerman?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  xpReward: number;
  imageUrl?: string;
  audioUrl?: string;
}

// ── Story Scene System ──────────────────────────────────────────
// Transforms lessons from linear steps into immersive mini-adventures

export interface DecisionOption {
  text: string;
  isCorrect: boolean;
  response: string;       // What happens in the story after choosing this
  peerReaction: string; // Assigned peer's Manglish reaction
}

export interface VocabEncounter {
  vocabId: string;
  encounterMoment: string;  // e.g. "The baker says 'Möchten Sie ein Brötchen?'"
  contextSentence: string;  // The sentence where the word naturally appears
}

export interface DecisionPoint {
  moment: string;           // Scene description at this choice point
  options: DecisionOption[];
}

export interface StoryScene {
  learnerOwner: LearnerPeerId;
  setting: {
    name: string;           // e.g. "Bäckerei Schmidt"
    sceneType: string;      // Maps to SceneBackground + ambience (cafe, bahnhof, street, etc.)
    timeOfDay: 'morning' | 'afternoon' | 'evening';
    description: string;    // Narrative text: "You push open the bakery door..."
  };
  narrative: {
    previousRecap?: string;     // "Yesterday you arrived in Berlin..."
    currentObjective: string;   // "Order breakfast at the bakery"
    nextTeaser?: string;        // "Tomorrow you'll navigate the U-Bahn..."
  };
  peerIntro: string[];          // Manglish scene-setting lines from the assigned peer
  vocabEncounters: VocabEncounter[];
  decisionPoints: DecisionPoint[];
}

// ── Lesson ──────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  titleGerman: string;
  description: string;
  duration: string;
  xpReward: number;
  videos: Video[];
  exercises: Exercise[];
  vocabulary: VocabItem[];
  /** Optional story scene data — when present, lesson uses immersive story flow */
  storyScene?: StoryScene;
}

export interface VocabItem {
  id: string;
  german: string;
  english: string;
  malayalam: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  audioPlaceholder?: string;
  /** Path to pronunciation audio file */
  audioUrl?: string;
  /** Path to example sentence audio */
  exampleAudioUrl?: string;
}

export interface Module {
  id: number;
  title: string;
  titleGerman: string;
  description: string;
  icon: string;
  color: string;
  totalHours: number;
  lessons: Lesson[];
  unlockRequirement?: string;
  learningTips?: string[];  // Pedagogical tips shown at module start
}
