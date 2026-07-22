// Immersive Encounter System
// Instead of bare flashcards, due SRS words are presented through
// contextual mini-experiences: dialogues, sentence completions, scenes, etc.
// The SRS scheduler still decides WHEN to show words — this decides HOW.

import type { VocabItem } from './content/types';
import type { Rating } from './srs';

// ─── Types ───────────────────────────────────────────────────

export type EncounterType =
  | 'sentence-complete'   // Fill the blank in the example sentence
  | 'what-does-it-mean'   // See German word in context → pick English meaning
  | 'how-do-you-say'      // See English meaning + scene → pick German word (production!)
  | 'spot-the-error'      // A sentence with a wrong word swapped in — find it
  | 'mini-dialogue'       // Short conversation with a blank to fill
  | 'context-clue'        // See a situation description → pick the right German word
  | 'type-it'             // See English meaning → TYPE the German word (no options!)
  | 'listen-type';        // HEAR the word via TTS → TYPE what you heard

export interface Encounter {
  type: EncounterType;
  targetVocab: VocabItem;
  /** Scene-setting text from Nivin (Manglish) */
  peerSays: string;
  /** The main prompt/question */
  prompt: string;
  /** Optional German context shown above the prompt */
  contextGerman?: string;
  /** The options to choose from (empty for typing encounters) */
  options: string[];
  /** Index of the correct option (-1 for typing encounters) */
  correctIndex: number;
  /** The correct text answer (for typing encounters) */
  correctText?: string;
  /** Explanation shown after answering */
  explanation: string;
  /** Optional scene image URL (for future Gemini images) */
  sceneImage?: string;
}

/** Result of a single encounter — used to derive implicit SRS rating */
export interface EncounterResult {
  encounter: Encounter;
  /** Did the user get it right on first try? */
  firstTryCorrect: boolean;
  /** How many wrong attempts before getting it right (0 = first try) */
  wrongAttempts: number;
  /** Time taken in ms from showing the encounter to answering */
  responseTimeMs: number;
}

// ─── Nivin's Manglish scene-setters ─────────────────────────

const PEER_SENTENCE_COMPLETE = [
  "Nee ithu complete cheyyano? Easy aanu! 💪",
  "Blank fill cheyyuka machane! You got this!",
  "One word missing... brain ON cheyyuka! 🧠",
  "Ithinte answer ariyaam enikkk... nee try cheyy!",
  "Aah, oru word maathram missing! Nokkatte...",
];

const PEER_WHAT_DOES_IT_MEAN = [
  "Ee German word ariyaamo? Think think! 🤔",
  "German word kandaal meaning para! Quick!",
  "Ith enthaa ennu nokkaam... 👀",
  "Brain use cheyy machane! Ithu simple aanu!",
  "Ee word last time padichathaa... ormayundo? 🧠",
];

const PEER_HOW_DO_YOU_SAY = [
  "German-il engane parayum? Aalochichu nokk! 🇩🇪",
  "Ithinu German word enthaa? Come on! 💪",
  "English ariyaam, ippo German parayuka!",
  "Production time! German word pick cheyy! 🎯",
  "Reverse round! English → German. Nee ready aano?",
];

const PEER_SPOT_ERROR = [
  "Ivide oru thett und! Kandupidikk! 🔍",
  "Aiyyo! Someone made a mistake... find it!",
  "Error detective mode ON! Ethaanu wrong? 🕵️",
  "One word is an impostor here... catch it!",
  "Sherlock mode activate cheyy! Wrong word und ivide 🔎",
];

const PEER_DIALOGUE = [
  "Real conversation! Blank fill cheyy machane! 🗣️",
  "Imagine you're in Germany... enthaa parayuka?",
  "Dialogue complete cheyyuka! You're doing great! 💬",
  "Scene set aayikkazhinju... ithinte answer?",
  "Nee Germany-il aanu... respond cheyy! 🇩🇪",
];

const PEER_CONTEXT_CLUE = [
  "Situation imagine cheyy... German word pick cheyy! 🎭",
  "Ee scene-il enthaa German-il parayuka?",
  "Context nokkiyal answer kittum! Think! 🤔",
  "Real-life situation! Right word choose cheyy!",
  "Germany-il ith sambhavichaal... word enthaa? 🇩🇪",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ─── Distractor Selection ────────────────────────────────────

/** Pick N random distractors from the vocab pool, excluding the target */
function pickDistractors(
  target: VocabItem,
  pool: VocabItem[],
  count: number
): VocabItem[] {
  const others = pool.filter((v) => v.id !== target.id);
  const shuffled = shuffleArray(others);
  return shuffled.slice(0, count);
}

// ─── Encounter Generators ────────────────────────────────────

function generateSentenceComplete(
  target: VocabItem,
  distractors: VocabItem[]
): Encounter {
  // Use the example sentence, blank out the German word
  const blankSentence = target.example.replace(
    new RegExp(target.german, 'gi'),
    '______'
  );

  const options = shuffleArray([
    target.german,
    ...distractors.map((d) => d.german),
  ]);

  return {
    type: 'sentence-complete',
    targetVocab: target,
    peerSays: pickRandom(PEER_SENTENCE_COMPLETE),
    prompt: `Complete the sentence:`,
    contextGerman: blankSentence,
    options,
    correctIndex: options.indexOf(target.german),
    explanation: `"${target.example}" → ${target.exampleTranslation}`,
  };
}

function generateWhatDoesItMean(
  target: VocabItem,
  distractors: VocabItem[]
): Encounter {
  const options = shuffleArray([
    target.english,
    ...distractors.map((d) => d.english),
  ]);

  return {
    type: 'what-does-it-mean',
    targetVocab: target,
    peerSays: pickRandom(PEER_WHAT_DOES_IT_MEAN),
    prompt: `What does this mean?`,
    contextGerman: target.german,
    options,
    correctIndex: options.indexOf(target.english),
    explanation: `${target.german} = ${target.english} (${target.malayalam})`,
  };
}

function generateHowDoYouSay(
  target: VocabItem,
  distractors: VocabItem[]
): Encounter {
  const options = shuffleArray([
    target.german,
    ...distractors.map((d) => d.german),
  ]);

  return {
    type: 'how-do-you-say',
    targetVocab: target,
    peerSays: pickRandom(PEER_HOW_DO_YOU_SAY),
    prompt: `How do you say "${target.english}" in German?`,
    options,
    correctIndex: options.indexOf(target.german),
    explanation: `${target.english} = ${target.german} [${target.pronunciation}]`,
  };
}

function generateSpotTheError(
  target: VocabItem,
  distractors: VocabItem[]
): Encounter {
  // Take the example sentence and swap the target word with a distractor
  const wrongWord = distractors[0];
  const corruptedSentence = target.example.replace(
    new RegExp(`\\b${escapeRegex(target.german)}\\b`, 'i'),
    wrongWord.german
  );

  // If replacement didn't work (regex edge case), fall back to sentence-complete
  if (corruptedSentence === target.example) {
    return generateSentenceComplete(target, distractors);
  }

  // Options: the wrong word (that was inserted) is the "error" — user picks the correct replacement
  const options = shuffleArray([
    target.german,
    ...distractors.slice(0, 3).map((d) => d.german),
  ]);

  return {
    type: 'spot-the-error',
    targetVocab: target,
    peerSays: pickRandom(PEER_SPOT_ERROR),
    prompt: `Something's wrong! Replace "${wrongWord.german}" with the right word:`,
    contextGerman: corruptedSentence,
    options,
    correctIndex: options.indexOf(target.german),
    explanation: `The correct sentence is: "${target.example}" → ${target.exampleTranslation}`,
  };
}

function generateMiniDialogue(
  target: VocabItem,
  distractors: VocabItem[]
): Encounter {
  // Create a mini dialogue using the example sentence context
  const dialogues = [
    {
      setup: `🧑 Person A: "${target.exampleTranslation.replace(target.english, '...')}"\n🧑‍🦱 Person B: "Ja, ______ ist wichtig!"`,
      prompt: `Fill in the blank in this conversation:`,
    },
    {
      setup: `🧑 "Weißt du das Wort für '${target.english}'?"\n🧑‍🦱 "Ja, das ist ______!"`,
      prompt: `What word completes this dialogue?`,
    },
    {
      setup: `🧑 "Was bedeutet '${target.english}' auf Deutsch?"\n🧑‍🦱 "Das ist ______."`,
      prompt: `Help Person B answer:`,
    },
  ];

  const dialogue = pickRandom(dialogues);
  const options = shuffleArray([
    target.german,
    ...distractors.map((d) => d.german),
  ]);

  return {
    type: 'mini-dialogue',
    targetVocab: target,
    peerSays: pickRandom(PEER_DIALOGUE),
    prompt: dialogue.prompt,
    contextGerman: dialogue.setup,
    options,
    correctIndex: options.indexOf(target.german),
    explanation: `${target.german} = ${target.english} (${target.malayalam})\n"${target.example}"`,
  };
}

function generateContextClue(
  target: VocabItem,
  distractors: VocabItem[]
): Encounter {
  // Create a situational description based on the word
  const situations = [
    `You're filling out a form in Germany and need the word for "${target.english}".`,
    `Someone asks you about "${target.english}" — what's the German word?`,
    `You're at a language exchange. Your partner says "${target.exampleTranslation}". Which German word fits?`,
    `In your German class, the teacher points to something and says "Wie heißt '${target.english}' auf Deutsch?"`,
  ];

  const options = shuffleArray([
    target.german,
    ...distractors.map((d) => d.german),
  ]);

  return {
    type: 'context-clue',
    targetVocab: target,
    peerSays: pickRandom(PEER_CONTEXT_CLUE),
    prompt: pickRandom(situations),
    options,
    correctIndex: options.indexOf(target.german),
    explanation: `${target.german} [${target.pronunciation}] = ${target.english}\n"${target.example}" → ${target.exampleTranslation}`,
  };
}

// ─── Type-It Generator (no options, user must type) ─────────

const PEER_TYPE_IT = [
  "Type cheyyuka machane! Keyboard ready aano? ⌨️",
  "Ithinte German type cheyyuka — no hints! 💪",
  "Options illa! German word type cheyy! 🧠",
  "Nee ariyum ith! Type it out! ✍️",
  "Production time! Brain-il ninnu German varavoo? 🎯",
];

function generateTypeIt(target: VocabItem, _pool: VocabItem[]): Encounter {
  return {
    type: 'type-it',
    targetVocab: target,
    peerSays: pickRandom(PEER_TYPE_IT),
    prompt: `Type the German word for "${target.english}"`,
    options: [], // No options — must type
    correctIndex: -1,
    correctText: target.german,
    explanation: `${target.german} [${target.pronunciation}] = ${target.english} (${target.malayalam})`,
  };
}

// ─── Listen-Type Generator (hear TTS, type what you heard) ──

const PEER_LISTEN_TYPE = [
  "Kelkkuka, type cheyyuka! Ears + fingers combo! 👂⌨️",
  "Audio kelkku, German type cheyy! Dictation round! 🎧",
  "Ithokke kelkkaan ariyaamo? Type what you hear! 🔊",
  "Listen carefully machane... type it back! 📝",
  "Ear training time! Type enthaa kelkkunnath! 👂",
];

function generateListenType(target: VocabItem, _pool: VocabItem[]): Encounter {
  return {
    type: 'listen-type',
    targetVocab: target,
    peerSays: pickRandom(PEER_LISTEN_TYPE),
    prompt: 'Listen and type what you hear',
    contextGerman: '🔊 Tap to listen',
    options: [], // No options — must type after hearing
    correctIndex: -1,
    correctText: target.german,
    explanation: `You heard: "${target.german}" [${target.pronunciation}] = ${target.english}`,
  };
}

// ─── Main Generator ──────────────────────────────────────────

/** All encounter generators, weighted by learning value */
const ENCOUNTER_GENERATORS = [
  { gen: generateSentenceComplete, weight: 18 },   // Reading comprehension
  { gen: generateWhatDoesItMean, weight: 12 },      // Recognition (easier)
  { gen: generateHowDoYouSay, weight: 15 },         // Production (harder, more valuable)
  { gen: generateMiniDialogue, weight: 12 },         // Conversational context
  { gen: generateSpotTheError, weight: 8 },          // Error detection
  { gen: generateContextClue, weight: 8 },           // Situational application
  { gen: generateTypeIt, weight: 15 },               // Type the answer (no options!)
  { gen: generateListenType, weight: 12 },           // Listen & type (dictation-style)
];

/** Pick a weighted random encounter type, optionally excluding certain types */
function pickWeightedEncounter(excludeTypes?: Set<EncounterType>) {
  const eligible = excludeTypes
    ? ENCOUNTER_GENERATORS.filter((e) => {
        // Generate a temp encounter to check its type — instead, map gen to type
        return !excludeTypes.has(GENERATOR_TYPE_MAP.get(e.gen)!);
      })
    : ENCOUNTER_GENERATORS;

  const pool = eligible.length > 0 ? eligible : ENCOUNTER_GENERATORS; // fallback if all excluded
  const totalWeight = pool.reduce((sum, e) => sum + e.weight, 0);
  let random = Math.random() * totalWeight;
  for (const entry of pool) {
    random -= entry.weight;
    if (random <= 0) return entry.gen;
  }
  return pool[0].gen;
}

// Map generators to their encounter types for filtering
const GENERATOR_TYPE_MAP = new Map<typeof ENCOUNTER_GENERATORS[number]['gen'], EncounterType>([
  [generateSentenceComplete, 'sentence-complete'],
  [generateWhatDoesItMean, 'what-does-it-mean'],
  [generateHowDoYouSay, 'how-do-you-say'],
  [generateMiniDialogue, 'mini-dialogue'],
  [generateSpotTheError, 'spot-the-error'],
  [generateContextClue, 'context-clue'],
  [generateTypeIt, 'type-it'],
  [generateListenType, 'listen-type'],
]);

/**
 * Generate an immersive encounter for a vocabulary item.
 * @param target - The vocab word being reviewed
 * @param pool - All available vocab for generating distractors
 * @param avoidType - Encounter type to avoid (e.g. from last review session)
 */
export function generateEncounter(
  target: VocabItem,
  pool: VocabItem[],
  avoidType?: EncounterType | null
): Encounter {
  const distractors = pickDistractors(target, pool, 3);

  // Need at least 3 distractors for good options
  if (distractors.length < 3) {
    return generateWhatDoesItMean(target, distractors);
  }

  const excludeTypes = avoidType ? new Set([avoidType]) : undefined;
  const generator = pickWeightedEncounter(excludeTypes);
  return generator(target, distractors);
}

/**
 * Generate encounters for a batch of due vocab IDs.
 * - Avoids reusing the SAME encounter type a word had last session (via lastEncounterTypes map)
 * - Also avoids showing the same type twice in a row within a session
 *
 * @param vocabItems - Due vocab items to review
 * @param pool - All vocab for generating distractors
 * @param lastEncounterTypes - Map of vocabId → last encounter type used (from SRS cards)
 */
export function generateEncounterBatch(
  vocabItems: VocabItem[],
  pool: VocabItem[],
  lastEncounterTypes?: Record<string, string | undefined>
): Encounter[] {
  const encounters: Encounter[] = [];
  let prevTypeInSession: EncounterType | null = null;

  for (const target of vocabItems) {
    // Avoid: (1) what this word had last time, (2) what the previous word just had in this session
    const lastType = lastEncounterTypes?.[target.id] as EncounterType | undefined;
    const avoidType = lastType || prevTypeInSession;

    let encounter = generateEncounter(target, pool, avoidType);

    // Extra check: also avoid same as previous in session
    if (encounter.type === prevTypeInSession) {
      const retry = generateEncounter(target, pool, prevTypeInSession);
      if (retry.type !== prevTypeInSession) {
        encounter = retry;
      }
    }

    prevTypeInSession = encounter.type;
    encounters.push(encounter);
  }

  return encounters;
}

// ─── Implicit SRS Rating ─────────────────────────────────────

/**
 * Derive an SRS rating from how the user performed on an encounter.
 * No self-rating buttons — difficulty is inferred from behavior.
 *
 * - First try + fast (< 4s) → 'easy'
 * - First try → 'good'
 * - One wrong attempt → 'hard'
 * - Multiple wrong attempts → 'again'
 */
export function deriveRating(result: EncounterResult): Rating {
  if (result.wrongAttempts >= 2) return 'again';
  if (result.wrongAttempts === 1) return 'hard';
  if (result.firstTryCorrect && result.responseTimeMs < 4000) return 'easy';
  return 'good';
}

// ─── Encounter Type Labels (for UI) ─────────────────────────

export const ENCOUNTER_TYPE_LABELS: Record<EncounterType, { label: string; icon: string }> = {
  'sentence-complete': { label: 'Complete the Sentence', icon: '✍️' },
  'what-does-it-mean': { label: 'What Does It Mean?', icon: '🤔' },
  'how-do-you-say': { label: 'How Do You Say?', icon: '🗣️' },
  'spot-the-error': { label: 'Spot the Error', icon: '🔍' },
  'mini-dialogue': { label: 'Mini Dialogue', icon: '💬' },
  'context-clue': { label: 'Context Clue', icon: '🎭' },
  'type-it': { label: 'Type It!', icon: '⌨️' },
  'listen-type': { label: 'Listen & Type', icon: '👂' },
};

// ─── Helpers ─────────────────────────────────────────────────

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
