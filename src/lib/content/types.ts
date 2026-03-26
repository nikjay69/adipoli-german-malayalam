// Shared types for course content

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
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'ordering' | 'speaking';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  xpReward: number;
}

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
