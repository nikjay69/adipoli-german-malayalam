import type { NivinMood } from '@/components/character/Nivin';
import type { AppuMood } from '@/components/character/Appu';
import type { DialogueLine } from '@/components/character/CharacterGuide';

// All Nivin & Appu dialogue, organized by context
// Manglish for conversational text, English for UI labels

export const DIALOGUE = {
  welcome: [
    "Namaskaram! Njan Nivin. German padikkano? Njan help cheyyam.",
    "Hey! German padikkal fun aanu. Ready?",
    "Welcome machaa! Germany-lekku ninte first step.",
  ],
  comeback: [
    "Ethi! Streak break aakandey pokam.",
    "Back aayee! Adipoli. Continue cheyyam?",
    "Missed you machaa! Ninte streak wait cheyyunnu.",
  ],
  correct: [
    "Adipoli! Nailed it.",
    "Sheriyaayi! Perfect answer.",
    "Wunderbar! Ithanu German-il 'Adipoli'.",
    "Richtig! Nee too good da.",
    "Super ayi! Keep going.",
  ],
  wrong: [
    "Aiyyo! Almost there. Try once more.",
    "Paravaala machaa! Mistakes = learning.",
    "Enthu patti? Don't give up. You got this.",
    "Onnum illa. Oru more try.",
  ],
  encourage: [
    "Nee super aanu. Keep it up.",
    "Adipoli ayi poidundu! Almost done.",
    "Ninte German super aakum. Just keep going.",
    "I believe in you machaa. Pokam.",
  ],
  celebrate: [
    "ADIPOLI! Nee cheythu!",
    "Fantastisch! German-il ithanu 'Super'.",
    "Kando? Nee actual German hero aanu.",
    "Malayali German Pro — that's you.",
  ],
  lesson_start: [
    "Puthiya padam! Something exciting today.",
    "Ready? Pokam!",
    "Ithum fun aakum. Promise.",
  ],
  lesson_complete: [
    "Lesson teernu! Adipoli da.",
    "Oru more step to German fluency.",
    "Nee doing great. Streak alive aanu.",
  ],
  intro: [
    "Namaskaram! Njan Nivin — ninte koode ithokke padikkaan varunnu.",
    "Njan ninne Kerala-il ninnu Germany-lekku kondu pokum — ninte same boat-il aanu njanum.",
    "German padikkal tough aanu, but together nammal pokum.",
    "Ready? Pokam!",
  ],
  journey: [
    "Nammude yatra. Kerala to Germany.",
    "Oru step at a time — nammal ethum.",
    "Every lesson = oru step closer.",
  ],
} as const;

export type DialogueContext = keyof typeof DIALOGUE;

/** Get a random message for a given context */
export function getRandomMessage(context: DialogueContext): string {
  const messages = DIALOGUE[context];
  return messages[Math.floor(Math.random() * messages.length)];
}

/** Get mood appropriate for a dialogue context */
export function getMoodForContext(context: DialogueContext): NivinMood {
  const moodMap: Record<DialogueContext, NivinMood> = {
    welcome: 'waving',
    comeback: 'excited',
    correct: 'celebrating',
    wrong: 'sad',
    encourage: 'happy',
    celebrate: 'celebrating',
    lesson_start: 'excited',
    lesson_complete: 'celebrating',
    intro: 'waving',
    journey: 'pointing',
  };
  return moodMap[context];
}

/** Get Appu's mood for a dialogue context */
export function getAppuMoodForContext(context: DialogueContext): AppuMood {
  const moodMap: Record<DialogueContext, AppuMood> = {
    welcome: 'happy',
    comeback: 'happy',
    correct: 'celebrating',
    wrong: 'idle',
    encourage: 'happy',
    celebrate: 'celebrating',
    lesson_start: 'happy',
    lesson_complete: 'celebrating',
    intro: 'happy',
    journey: 'idle',
  };
  return moodMap[context];
}

/** Build a full DialogueLine with appropriate moods */
export function buildDialogueLine(context: DialogueContext, text?: string): DialogueLine {
  return {
    text: text || getRandomMessage(context),
    mood: getMoodForContext(context),
    appuMood: getAppuMoodForContext(context),
    // Appu is UI flourish only — silent, never part of the dialogue beat.
    showAppu: false,
  };
}

/** Get intro sequence as DialogueLine array */
export function getIntroDialogue(): DialogueLine[] {
  return DIALOGUE.intro.map((text, i) => ({
    text,
    mood: i === 0 ? 'waving' as NivinMood : i === 3 ? 'excited' as NivinMood : 'happy' as NivinMood,
    appuMood: 'idle' as AppuMood,
    showAppu: false,
  }));
}
