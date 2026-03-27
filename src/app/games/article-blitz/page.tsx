'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock, Zap, Lightbulb, Keyboard } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character/Kuttan';
import { useGameStore } from '@/lib/store';
import { GameStoryWrapper, GAME_STORIES } from '@/components/game/GameStoryWrapper';
import { ComboMeter } from '@/components/game/ComboMeter';

// ── Types ──────────────────────────────────────────────────────────────

type Article = 'der' | 'die' | 'das';
type GenderPattern =
  | '-ung/-heit/-keit/-schaft'
  | '-chen/-lein (diminutive)'
  | '-e ending (feminine)'
  | '-er ending (masculine agent)'
  | 'male person/occupation'
  | 'days/months/seasons'
  | 'metals & elements'
  | 'memorize';

interface NounEntry {
  noun: string;
  article: Article;
  english: string;
  pattern: GenderPattern;
}

interface SituationalQuestion {
  /** The scenario context in English */
  situation: string;
  /** The German sentence with ___ for the blank */
  sentence: string;
  /** The correct article to fill the blank */
  answer: Article;
  /** The noun this question is about */
  noun: string;
  /** English meaning */
  english: string;
  /** Pattern for teaching */
  pattern: GenderPattern;
}

interface TypeQuestion {
  /** Prompt: what you need to say in German */
  prompt: string;
  /** The correct full answer: "article Noun" */
  answer: string;
  /** Acceptable alternatives (lowercase) */
  alts: string[];
  /** The noun entry */
  noun: string;
  english: string;
  article: Article;
  pattern: GenderPattern;
}

type Question =
  | { mode: 'pick'; data: SituationalQuestion }
  | { mode: 'type'; data: TypeQuestion };

// ── Gender rule cards ──────────────────────────────────────────────────

interface RuleCard {
  title: string;
  rule: string;
  article: Article;
  examples: string[];
}

const GENDER_RULES: RuleCard[] = [
  {
    title: 'The -ung rule',
    rule: 'Words ending in -ung, -heit, -keit, -schaft are always DIE',
    article: 'die',
    examples: ['die Wohnung', 'die Freiheit', 'die Freundschaft'],
  },
  {
    title: 'Diminutives',
    rule: 'Words ending in -chen or -lein are always DAS (even das Madchen = girl!)',
    article: 'das',
    examples: ['das Madchen', 'das Kaninchen', 'das Brötchen'],
  },
  {
    title: 'Male persons',
    rule: 'Male persons, jobs, and nationalities are almost always DER',
    article: 'der',
    examples: ['der Lehrer', 'der Arzt', 'der Bruder'],
  },
  {
    title: 'Calendar words',
    rule: 'Days of the week, months, and seasons are always DER',
    article: 'der',
    examples: ['der Montag', 'der Januar', 'der Sommer'],
  },
  {
    title: 'The -e ending',
    rule: 'Most nouns ending in -e are DIE (about 90%!)',
    article: 'die',
    examples: ['die Lampe', 'die Tasche', 'die Straße'],
  },
  {
    title: 'The -er agent',
    rule: 'Nouns ending in -er that describe a person/agent are usually DER',
    article: 'der',
    examples: ['der Lehrer', 'der Fahrer', 'der Computer'],
  },
  {
    title: 'Metals & elements',
    rule: 'Most metals and chemical elements are DAS',
    article: 'das',
    examples: ['das Gold', 'das Silber', 'das Eisen'],
  },
  {
    title: 'The -tion ending',
    rule: 'Words ending in -tion or -sion (from Latin/French) are always DIE',
    article: 'die',
    examples: ['die Information', 'die Station', 'die Diskussion'],
  },
];

// ── Noun pool (80+ nouns) ──────────────────────────────────────────────

const NOUNS: NounEntry[] = [
  // DER — male persons / occupations
  { noun: 'Mann', article: 'der', english: 'man', pattern: 'male person/occupation' },
  { noun: 'Vater', article: 'der', english: 'father', pattern: 'male person/occupation' },
  { noun: 'Bruder', article: 'der', english: 'brother', pattern: 'male person/occupation' },
  { noun: 'Arzt', article: 'der', english: 'doctor', pattern: 'male person/occupation' },
  { noun: 'Lehrer', article: 'der', english: 'teacher', pattern: '-er ending (masculine agent)' },
  { noun: 'Student', article: 'der', english: 'student', pattern: 'male person/occupation' },
  // DER — -er ending agents / tools
  { noun: 'Computer', article: 'der', english: 'computer', pattern: '-er ending (masculine agent)' },
  { noun: 'Fernseher', article: 'der', english: 'television', pattern: '-er ending (masculine agent)' },
  // DER — days/months/seasons
  { noun: 'Montag', article: 'der', english: 'Monday', pattern: 'days/months/seasons' },
  { noun: 'Sommer', article: 'der', english: 'summer', pattern: 'days/months/seasons' },
  { noun: 'Winter', article: 'der', english: 'winter', pattern: 'days/months/seasons' },
  { noun: 'Januar', article: 'der', english: 'January', pattern: 'days/months/seasons' },
  // DER — common masculine (memorize)
  { noun: 'Hund', article: 'der', english: 'dog', pattern: 'memorize' },
  { noun: 'Tisch', article: 'der', english: 'table', pattern: 'memorize' },
  { noun: 'Stuhl', article: 'der', english: 'chair', pattern: 'memorize' },
  { noun: 'Apfel', article: 'der', english: 'apple', pattern: 'memorize' },
  { noun: 'Kaffee', article: 'der', english: 'coffee', pattern: 'memorize' },
  { noun: 'Zug', article: 'der', english: 'train', pattern: 'memorize' },
  { noun: 'Bahnhof', article: 'der', english: 'train station', pattern: 'memorize' },
  { noun: 'Schuh', article: 'der', english: 'shoe', pattern: 'memorize' },
  { noun: 'Berg', article: 'der', english: 'mountain', pattern: 'memorize' },
  { noun: 'Flughafen', article: 'der', english: 'airport', pattern: 'memorize' },
  { noun: 'Schlüssel', article: 'der', english: 'key', pattern: 'memorize' },
  { noun: 'Kühlschrank', article: 'der', english: 'fridge', pattern: 'memorize' },
  { noun: 'Supermarkt', article: 'der', english: 'supermarket', pattern: 'memorize' },
  { noun: 'Bus', article: 'der', english: 'bus', pattern: 'memorize' },
  { noun: 'Park', article: 'der', english: 'park', pattern: 'memorize' },
  { noun: 'Reis', article: 'der', english: 'rice', pattern: 'memorize' },

  // DIE — -ung/-heit/-keit/-schaft
  { noun: 'Wohnung', article: 'die', english: 'apartment', pattern: '-ung/-heit/-keit/-schaft' },
  { noun: 'Zeitung', article: 'die', english: 'newspaper', pattern: '-ung/-heit/-keit/-schaft' },
  { noun: 'Übung', article: 'die', english: 'exercise', pattern: '-ung/-heit/-keit/-schaft' },
  { noun: 'Rechnung', article: 'die', english: 'bill/invoice', pattern: '-ung/-heit/-keit/-schaft' },
  { noun: 'Ordnung', article: 'die', english: 'order/tidiness', pattern: '-ung/-heit/-keit/-schaft' },
  { noun: 'Freiheit', article: 'die', english: 'freedom', pattern: '-ung/-heit/-keit/-schaft' },
  { noun: 'Möglichkeit', article: 'die', english: 'possibility', pattern: '-ung/-heit/-keit/-schaft' },
  { noun: 'Freundschaft', article: 'die', english: 'friendship', pattern: '-ung/-heit/-keit/-schaft' },
  // DIE — -e ending
  { noun: 'Lampe', article: 'die', english: 'lamp', pattern: '-e ending (feminine)' },
  { noun: 'Tasche', article: 'die', english: 'bag', pattern: '-e ending (feminine)' },
  { noun: 'Straße', article: 'die', english: 'street', pattern: '-e ending (feminine)' },
  { noun: 'Küche', article: 'die', english: 'kitchen', pattern: '-e ending (feminine)' },
  { noun: 'Schule', article: 'die', english: 'school', pattern: '-e ending (feminine)' },
  { noun: 'Blume', article: 'die', english: 'flower', pattern: '-e ending (feminine)' },
  { noun: 'Kasse', article: 'die', english: 'cash register', pattern: '-e ending (feminine)' },
  { noun: 'Jacke', article: 'die', english: 'jacket', pattern: '-e ending (feminine)' },
  // DIE — female persons
  { noun: 'Frau', article: 'die', english: 'woman', pattern: 'memorize' },
  { noun: 'Mutter', article: 'die', english: 'mother', pattern: 'memorize' },
  { noun: 'Schwester', article: 'die', english: 'sister', pattern: 'memorize' },
  // DIE — common feminine (memorize)
  { noun: 'Milch', article: 'die', english: 'milk', pattern: 'memorize' },
  { noun: 'Stadt', article: 'die', english: 'city', pattern: 'memorize' },
  { noun: 'Katze', article: 'die', english: 'cat', pattern: '-e ending (feminine)' },
  { noun: 'Uhr', article: 'die', english: 'clock/watch', pattern: 'memorize' },
  { noun: 'Tür', article: 'die', english: 'door', pattern: 'memorize' },
  { noun: 'Bibliothek', article: 'die', english: 'library', pattern: 'memorize' },
  { noun: 'Haltestelle', article: 'die', english: 'bus stop', pattern: '-e ending (feminine)' },
  { noun: 'Medizin', article: 'die', english: 'medicine', pattern: 'memorize' },
  { noun: 'Musik', article: 'die', english: 'music', pattern: 'memorize' },
  { noun: 'Arbeit', article: 'die', english: 'work', pattern: 'memorize' },
  { noun: 'Butter', article: 'die', english: 'butter', pattern: 'memorize' },
  { noun: 'Adresse', article: 'die', english: 'address', pattern: '-e ending (feminine)' },
  { noun: 'Pizza', article: 'die', english: 'pizza', pattern: 'memorize' },

  // DAS — -chen diminutives
  { noun: 'Mädchen', article: 'das', english: 'girl', pattern: '-chen/-lein (diminutive)' },
  { noun: 'Brötchen', article: 'das', english: 'bread roll', pattern: '-chen/-lein (diminutive)' },
  { noun: 'Kaninchen', article: 'das', english: 'rabbit', pattern: '-chen/-lein (diminutive)' },
  { noun: 'Hähnchen', article: 'das', english: 'chicken (food)', pattern: '-chen/-lein (diminutive)' },
  // DAS — metals
  { noun: 'Gold', article: 'das', english: 'gold', pattern: 'metals & elements' },
  { noun: 'Silber', article: 'das', english: 'silver', pattern: 'metals & elements' },
  // DAS — common neuter (memorize)
  { noun: 'Buch', article: 'das', english: 'book', pattern: 'memorize' },
  { noun: 'Auto', article: 'das', english: 'car', pattern: 'memorize' },
  { noun: 'Kind', article: 'das', english: 'child', pattern: 'memorize' },
  { noun: 'Haus', article: 'das', english: 'house', pattern: 'memorize' },
  { noun: 'Brot', article: 'das', english: 'bread', pattern: 'memorize' },
  { noun: 'Wasser', article: 'das', english: 'water', pattern: 'memorize' },
  { noun: 'Bier', article: 'das', english: 'beer', pattern: 'memorize' },
  { noun: 'Fenster', article: 'das', english: 'window', pattern: 'memorize' },
  { noun: 'Zimmer', article: 'das', english: 'room', pattern: 'memorize' },
  { noun: 'Handy', article: 'das', english: 'phone', pattern: 'memorize' },
  { noun: 'Geld', article: 'das', english: 'money', pattern: 'memorize' },
  { noun: 'Land', article: 'das', english: 'country', pattern: 'memorize' },
  { noun: 'Ticket', article: 'das', english: 'ticket', pattern: 'memorize' },
  { noun: 'Hotel', article: 'das', english: 'hotel', pattern: 'memorize' },
  { noun: 'Frühstück', article: 'das', english: 'breakfast', pattern: 'memorize' },
  { noun: 'Restaurant', article: 'das', english: 'restaurant', pattern: 'memorize' },
  { noun: 'Rezept', article: 'das', english: 'recipe/prescription', pattern: 'memorize' },
  { noun: 'Problem', article: 'das', english: 'problem', pattern: 'memorize' },
  { noun: 'Telefon', article: 'das', english: 'telephone', pattern: 'memorize' },
  { noun: 'Ei', article: 'das', english: 'egg', pattern: 'memorize' },
];

// ── Situational sentence templates ─────────────────────────────────────
// Each template has a situation (English context) and a German sentence
// with {___} where the article goes and {noun} for the noun.

interface SentenceTemplate {
  situation: string;
  sentence: string;
}

const SENTENCE_TEMPLATES: SentenceTemplate[] = [
  // Shopping / supermarket
  { situation: 'You\'re at the supermarket. You tell the cashier:', sentence: 'Ich nehme {___} {noun}.' },
  { situation: 'You\'re shopping and can\'t find something. You ask:', sentence: 'Wo finde ich {___} {noun}?' },
  { situation: 'You point at something in the shop:', sentence: 'Ich möchte {___} {noun}, bitte.' },
  // Home / flatmate
  { situation: 'Your flatmate asks you:', sentence: 'Wo ist {___} {noun}?' },
  { situation: 'You tell your flatmate:', sentence: 'Ich habe {___} {noun} gefunden.' },
  { situation: 'You notice something is missing at home:', sentence: '{___} {noun} ist nicht hier.' },
  // Restaurant
  { situation: 'At a restaurant, you order:', sentence: 'Ich hätte gern {___} {noun}.' },
  { situation: 'The waiter recommends:', sentence: '{___} {noun} ist heute sehr gut.' },
  // Doctor / pharmacy
  { situation: 'The doctor tells you:', sentence: 'Nehmen Sie {___} {noun}.' },
  { situation: 'At the pharmacy, you say:', sentence: 'Ich brauche {___} {noun}.' },
  // Directions / city
  { situation: 'You ask a stranger for directions:', sentence: 'Wo ist {___} {noun}?' },
  { situation: 'A sign reads:', sentence: '{___} {noun} ist geschlossen.' },
  { situation: 'You describe what you see:', sentence: '{___} {noun} ist dort drüben.' },
  // Daily life
  { situation: 'You\'re writing an email to your landlord:', sentence: 'Ich suche {___} {noun}.' },
  { situation: 'A friend asks what you\'re looking for:', sentence: 'Ich suche {___} {noun}.' },
  { situation: 'You describe your morning routine:', sentence: 'Zuerst kommt {___} {noun}.' },
  // Work / school
  { situation: 'Your colleague says:', sentence: '{___} {noun} ist auf dem Tisch.' },
  { situation: 'You explain to a classmate:', sentence: 'Hast du {___} {noun} gesehen?' },
];

// ── Kuttan Manglish reactions ──────────────────────────────────────────

const CORRECT_REACTIONS = [
  'Adipoli! Correct article!',
  'Wunderbar machaa! Nailed it!',
  'Sheriyaayi! You got it!',
  'Super ayi! Correct!',
  'Richtig! Nee oru pro aanu!',
  'Seri machaa! That\'s the one!',
  'Kollaam! Perfect pick!',
];

const WRONG_REACTIONS = [
  'Aiyyo! Not that one, machaa!',
  'Paravaala! Check the pattern next time.',
  'Not quite da... look at the ending!',
  'Hmm close! Remember the rule!',
  'Oru thavana koodi try cheyyam!',
];

const STREAK_REACTIONS = [
  'ON FIRE machaa! Adipoli streak!',
  'Unstoppable! Keep going!',
  'Combo power! You\'re a machine!',
  'FIRE MODE da! Nobody can stop you!',
];

const TYPING_CORRECT = [
  'Adipoli! You WROTE it correctly!',
  'Machaa, you can actually produce German!',
  'Wunderbar! That\'s real German skill!',
  'Sheriyaayi! Article + noun, perfect combo!',
];

const TYPING_WRONG = [
  'Almost machaa! The correct answer was: ',
  'So close! It should be: ',
  'Paravaala! Remember it\'s: ',
];

const COMPLETION_MSGS: Record<string, { msg: string; mood: KuttanMood }> = {
  amazing: { msg: 'Adipoli machaa! You don\'t just guess articles, you KNOW them! Der/die/das master!', mood: 'celebrating' },
  great: { msg: 'Wunderbar! You\'re building real article intuition. The patterns are clicking!', mood: 'excited' },
  good: { msg: 'Not bad machaa! You\'re learning the rules. A few more rounds will lock them in!', mood: 'happy' },
  tryAgain: { msg: 'Paravaala da! Articles are the hardest part of German. The rules will help — keep at it!', mood: 'thinking' },
};

// ── Article colors ─────────────────────────────────────────────────────

const ARTICLE_COLORS: Record<Article, { bg: string; text: string; border: string; hex: string; shadow: string }> = {
  der: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', hex: '#3b82f6', shadow: '#2563eb' },
  die: { bg: 'bg-pink-500', text: 'text-pink-500', border: 'border-pink-500', hex: '#ec4899', shadow: '#be185d' },
  das: { bg: 'bg-[#d4a520]', text: 'text-[#d4a520]', border: 'border-[#d4a520]', hex: '#d4a520', shadow: '#a17c10' },
};

// ── Utility ────────────────────────────────────────────────────────────

function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getPatternTip(pattern: GenderPattern): string {
  switch (pattern) {
    case '-ung/-heit/-keit/-schaft': return 'Words ending in -ung, -heit, -keit, -schaft are always DIE.';
    case '-chen/-lein (diminutive)': return 'Diminutives (-chen, -lein) are always DAS. Even das Madchen!';
    case '-e ending (feminine)': return 'About 90% of nouns ending in -e are DIE.';
    case '-er ending (masculine agent)': return 'Nouns ending in -er (for people/agents) are usually DER.';
    case 'male person/occupation': return 'Male persons and occupations are almost always DER.';
    case 'days/months/seasons': return 'Days, months, and seasons are always DER.';
    case 'metals & elements': return 'Metals and chemical elements are usually DAS.';
    case 'memorize': return 'This one you just have to memorize. Repetition is your friend!';
  }
}

// ── Question generation ────────────────────────────────────────────────

function generateQuestions(): Question[] {
  const shuffled = shuffle(NOUNS);
  const questions: Question[] = [];

  // Mode A: first 10 = pick article in context
  const pickNouns = shuffled.slice(0, 12);
  for (let i = 0; i < 12; i++) {
    const n = pickNouns[i];
    const template = pickRandom(SENTENCE_TEMPLATES);
    questions.push({
      mode: 'pick',
      data: {
        situation: template.situation,
        sentence: template.sentence.replace('{noun}', n.noun),
        answer: n.article,
        noun: n.noun,
        english: n.english,
        pattern: n.pattern,
      },
    });
  }

  // Mode B: next 8 = type the article + noun
  const typeNouns = shuffled.slice(12, 20);
  for (let i = 0; i < 8 && i < typeNouns.length; i++) {
    const n = typeNouns[i];
    const answer = `${n.article} ${n.noun}`;
    questions.push({
      mode: 'type',
      data: {
        prompt: `How do you say "${n.english}" in German with its article?`,
        answer,
        alts: [answer.toLowerCase(), `${n.article.charAt(0).toUpperCase() + n.article.slice(1)} ${n.noun}`],
        noun: n.noun,
        english: n.english,
        article: n.article,
        pattern: n.pattern,
      },
    });
  }

  return questions;
}

// ── Component ──────────────────────────────────────────────────────────

const TOTAL_TIME = 90; // seconds - more time since typing mode needs it
const TOTAL_QUESTIONS = 20;

export default function ArticleBlitzGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'ruleCard' | 'complete'>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [feedback, setFeedback] = useState<{ correct: boolean; correctAnswer?: string } | null>(null);
  const [timePenalty, setTimePenalty] = useState(false);
  const [showCombo, setShowCombo] = useState(false);
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [kuttanMsg, setKuttanMsg] = useState('Real German situations, real article practice. Let\'s do this machaa!');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [ruleCardData, setRuleCardData] = useState<RuleCard | null>(null);
  const [questionsAnsweredSinceRule, setQuestionsAnsweredSinceRule] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ noun: string; article: Article; correct: boolean; pattern: GenderPattern }[]>([]);

  // Track timer reference for cleanup
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initQuestions = useCallback(() => {
    setQuestions(generateQuestions());
  }, []);

  useEffect(() => {
    initQuestions();
  }, [initQuestions]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !feedback) {
      timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    } else if (timeLeft <= 0 && gameState === 'playing') {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, timeLeft, feedback]);

  // Focus input for type mode
  useEffect(() => {
    if (gameState === 'playing' && questions[currentIndex]?.mode === 'type' && !feedback) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [gameState, currentIndex, feedback, questions]);

  const startGame = () => {
    const qs = generateQuestions();
    setQuestions(qs);
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeLeft(TOTAL_TIME);
    setFeedback(null);
    setTimePenalty(false);
    setTypedAnswer('');
    setQuestionsAnsweredSinceRule(0);
    setAnsweredQuestions([]);
    setKuttanMood('excited');
    setKuttanMsg('Der, die, or das? But this time — think about the SITUATION!');
  };

  const endGame = () => {
    setGameState('complete');
    incrementGamesPlayed();
    const total = correctCount + wrongCount;
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const earnedXP = correctCount * 5 + maxStreak * 3;
    addXP(earnedXP);

    const comp = pct >= 80 ? COMPLETION_MSGS.amazing
      : pct >= 60 ? COMPLETION_MSGS.great
      : pct >= 40 ? COMPLETION_MSGS.good
      : COMPLETION_MSGS.tryAgain;
    setKuttanMood(comp.mood);
    setKuttanMsg(comp.msg);
  };

  const advanceQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFeedback(null);
      setTypedAnswer('');
    } else {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions.length]);

  const showRuleIfNeeded = useCallback((afterCorrect: boolean): boolean => {
    const newCount = questionsAnsweredSinceRule + 1;
    setQuestionsAnsweredSinceRule(newCount);

    // Show a rule card every 4 questions
    if (newCount >= 4) {
      setQuestionsAnsweredSinceRule(0);
      // Pick a rule card relevant to recently seen patterns
      const recentPatterns = answeredQuestions.slice(-4).map(q => q.pattern);
      let relevantRule = GENDER_RULES.find(r =>
        recentPatterns.some(p => r.rule.toLowerCase().includes(p.split('/')[0].replace('-', '').toLowerCase()))
      );
      if (!relevantRule) {
        relevantRule = pickRandom(GENDER_RULES);
      }
      setRuleCardData(relevantRule);
      setGameState('ruleCard');
      return true;
    }
    return false;
  }, [questionsAnsweredSinceRule, answeredQuestions]);

  const processAnswer = useCallback((isCorrect: boolean, noun: string, article: Article, pattern: GenderPattern, correctAnswer?: string) => {
    setAnsweredQuestions(prev => [...prev, { noun, article, correct: isCorrect, pattern }]);

    if (isCorrect) {
      const newStreak = streak + 1;
      const comboMultiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      const points = comboMultiplier;
      setScore(prev => prev + points);
      setStreak(newStreak);
      setCorrectCount(prev => prev + 1);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      if (newStreak >= 3) {
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 800);
        setKuttanMood('celebrating');
        setKuttanMsg(pickRandom(STREAK_REACTIONS));
      } else {
        setKuttanMood('happy');
        setKuttanMsg(pickRandom(CORRECT_REACTIONS));
      }

      setFeedback({ correct: true });

      setTimeout(() => {
        if (!showRuleIfNeeded(true)) {
          advanceQuestion();
        }
      }, 600);
    } else {
      setStreak(0);
      setWrongCount(prev => prev + 1);
      setTimeLeft(prev => Math.max(0, prev - 2));
      setTimePenalty(true);
      setTimeout(() => setTimePenalty(false), 400);

      setKuttanMood('sad');
      setKuttanMsg(pickRandom(WRONG_REACTIONS));

      setFeedback({ correct: false, correctAnswer: correctAnswer || `${article} ${noun}` });

      setTimeout(() => {
        if (!showRuleIfNeeded(false)) {
          advanceQuestion();
        }
      }, 2200);
    }
  }, [streak, maxStreak, advanceQuestion, showRuleIfNeeded]);

  // Handle pick mode
  const handleArticleChoice = (chosenArticle: Article) => {
    if (feedback || gameState !== 'playing') return;
    const q = questions[currentIndex];
    if (q.mode !== 'pick') return;

    const isCorrect = chosenArticle === q.data.answer;
    processAnswer(isCorrect, q.data.noun, q.data.answer, q.data.pattern);
  };

  // Handle type mode
  const handleTypeSubmit = () => {
    if (feedback || gameState !== 'playing') return;
    const q = questions[currentIndex];
    if (q.mode !== 'type') return;

    const trimmed = typedAnswer.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();
    const correctNormalized = q.data.answer.toLowerCase();
    const allAcceptable = [correctNormalized, ...q.data.alts.map(a => a.toLowerCase())];
    const isCorrect = allAcceptable.includes(normalized);

    if (isCorrect) {
      setKuttanMsg(pickRandom(TYPING_CORRECT));
    }

    processAnswer(isCorrect, q.data.noun, q.data.article, q.data.pattern, q.data.answer);
  };

  const dismissRuleCard = () => {
    setRuleCardData(null);
    setGameState('playing');
    // Need to advance to next question since we paused
    setFeedback(null);
    setTypedAnswer('');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      endGame();
    }
  };

  // Derived
  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;
  const totalAnswered = correctCount + wrongCount;
  const earnedXP = correctCount * 5 + maxStreak * 3;

  // Build the sentence display for pick mode with highlighted blank
  const renderSentence = (sentence: string) => {
    const parts = sentence.split('{___}');
    if (parts.length < 2) return <span>{sentence}</span>;

    return (
      <span>
        {parts[0]}
        <span className="inline-block min-w-[4rem] mx-1 border-b-3 border-dashed border-white/60 text-center font-black text-[#ffd93d]">
          {feedback
            ? (
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={feedback.correct ? 'text-emerald-400' : 'text-red-400'}
                >
                  {currentQuestion?.mode === 'pick'
                    ? (currentQuestion.data as SituationalQuestion).answer
                    : ''}
                </motion.span>
              )
            : '___'}
        </span>
        {parts[1]}
      </span>
    );
  };

  return (
    <GameStoryWrapper story={GAME_STORIES['article-blitz']}>
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        {(gameState === 'playing' || gameState === 'ruleCard') && (
          <motion.div
            animate={{
              scale: timeLeft <= 10 ? [1, 1.08, 1] : 1,
              ...(timePenalty ? { x: [-3, 3, -3, 3, 0] } : {}),
            }}
            transition={{ duration: 0.3, repeat: timeLeft <= 10 ? Infinity : 0 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold ${
              timePenalty
                ? 'bg-red-100 dark:bg-red-900/40 text-red-600'
                : timeLeft <= 10
                ? 'bg-red-100 dark:bg-red-900/40 text-red-600'
                : 'bg-amber-100 dark:bg-amber-900/40 text-amber-600'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>{timeLeft}s</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Ready Screen ─────────────────────────────────────────────── */}
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="text-center">
              <div className="mb-4">
                <CharacterGuide
                  messages="Articles in real German sentences! Not just bare nouns — you'll see how der, die, das actually work in conversation."
                  mood="excited"
                  size="sm"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Article Blitz
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Two modes that build real German intuition:
              </p>

              {/* Mode explanation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-blue-700 dark:text-blue-300 text-sm">Mode A: Pick (Q1-12)</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Read a real German sentence and pick the correct article. Context matters!
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Keyboard className="w-4 h-4 text-purple-500" />
                    <span className="font-bold text-purple-700 dark:text-purple-300 text-sm">Mode B: Type (Q13-20)</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Type the full article + noun from memory. Real production, not guessing!
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {TOTAL_TIME}s
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" /> {TOTAL_QUESTIONS} questions
                </span>
                <span className="flex items-center gap-1">
                  <Lightbulb className="w-4 h-4" /> Rule tips
                </span>
              </div>

              {/* Article color legend */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm font-bold">DER masc.</span>
                <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-sm font-bold">DIE fem.</span>
                <span className="px-3 py-1 rounded-full bg-[#d4a520] text-white text-sm font-bold">DAS neut.</span>
              </div>

              <Button onClick={startGame} size="lg" fullWidth>
                Start Blitz
              </Button>
            </Card>
          </motion.div>
        )}

        {/* ── Rule Card Screen ─────────────────────────────────────────── */}
        {gameState === 'ruleCard' && ruleCardData && (
          <motion.div
            key="rule"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="text-center">
              <div className="mb-3">
                <CharacterGuide
                  messages="Quick tip before we continue machaa! This will help with the next questions."
                  mood="thinking"
                  size="sm"
                />
              </div>

              <div className="flex items-center justify-center gap-2 mb-3">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Gender Rule: {ruleCardData.title}
                </h2>
              </div>

              <div
                className="rounded-xl p-5 mb-4 border-2"
                style={{
                  borderColor: ARTICLE_COLORS[ruleCardData.article].hex,
                  backgroundColor: `${ARTICLE_COLORS[ruleCardData.article].hex}15`,
                }}
              >
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {ruleCardData.rule}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {ruleCardData.examples.map((ex) => (
                    <span
                      key={ex}
                      className="px-3 py-1.5 rounded-lg text-sm font-bold text-white"
                      style={{ backgroundColor: ARTICLE_COLORS[ruleCardData.article].hex }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              <Button onClick={dismissRuleCard} size="lg" fullWidth>
                Got it! Continue
              </Button>
            </Card>
          </motion.div>
        )}

        {/* ── Playing Screen ───────────────────────────────────────────── */}
        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Kuttan Guide */}
            <div className="mb-4">
              <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" />
            </div>

            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#e94560]">{score}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                </div>
                {streak >= 3 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-2 py-1 rounded-full"
                  >
                    <Zap className="w-4 h-4" />
                    <span className="font-bold">{streak >= 5 ? '3x' : '2x'}!</span>
                  </motion.div>
                )}
                {streak > 0 && (
                  <motion.div
                    key={streak}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 px-2 py-1 rounded-full"
                  >
                    <Star className="w-3 h-3" />
                    <span className="font-bold text-sm">{streak}</span>
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-3">
                {/* Mode indicator */}
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  currentQuestion.mode === 'pick'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                }`}>
                  {currentQuestion.mode === 'pick' ? 'PICK' : 'TYPE'}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentIndex + 1}/{questions.length}
                </span>
              </div>
            </div>

            {/* Timer Bar */}
            <div className="mb-5">
              <motion.div
                animate={timePenalty ? { opacity: [1, 0.3, 1, 0.3, 1] } : { opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ProgressBar
                  progress={(timeLeft / TOTAL_TIME) * 100}
                  color={timeLeft <= 15 ? 'warning' : 'primary'}
                  size="sm"
                />
              </motion.div>
            </div>

            {/* ── Pick Mode ──────────────────────────────────────────── */}
            {currentQuestion.mode === 'pick' && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`pick-${currentIndex}`}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {/* Situation card */}
                  <Card className="mb-4">
                    <div className="py-4">
                      {/* English situation */}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 italic">
                        {(currentQuestion.data as SituationalQuestion).situation}
                      </p>
                      {/* German sentence with blank */}
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed text-center">
                        {renderSentence((currentQuestion.data as SituationalQuestion).sentence)}
                      </div>
                      {/* English meaning of noun */}
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-3 text-center">
                        {(currentQuestion.data as SituationalQuestion).noun} = {(currentQuestion.data as SituationalQuestion).english}
                      </p>
                    </div>
                  </Card>

                  {/* Article Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    {(['der', 'die', 'das'] as const).map((article) => {
                      const colors = ARTICLE_COLORS[article];
                      const isCorrectAnswer = (currentQuestion.data as SituationalQuestion).answer === article;
                      const showGreen = feedback?.correct && isCorrectAnswer;
                      const showRed = feedback && !feedback.correct && !isCorrectAnswer && feedback.correctAnswer?.startsWith(article);
                      const showCorrectHint = feedback && !feedback.correct && isCorrectAnswer;

                      return (
                        <motion.button
                          key={article}
                          onClick={() => handleArticleChoice(article)}
                          disabled={!!feedback}
                          whileTap={feedback ? {} : { scale: 0.9 }}
                          animate={
                            showRed
                              ? { x: [-6, 6, -6, 6, 0] }
                              : showGreen
                              ? { scale: [1, 1.08, 1] }
                              : {}
                          }
                          transition={{ duration: 0.3 }}
                          className={`
                            relative p-5 rounded-2xl text-center font-bold text-xl text-white uppercase tracking-wider
                            transition-all duration-150 select-none
                            shadow-lg active:shadow-sm active:translate-y-0.5
                            ${
                              showGreen
                                ? 'bg-emerald-500 border-4 border-emerald-300 shadow-emerald-400/50'
                                : showCorrectHint
                                ? 'bg-emerald-500 border-4 border-emerald-300 opacity-80'
                                : feedback && !isCorrectAnswer
                                ? `${colors.bg} border-4 border-transparent opacity-30`
                                : `${colors.bg} border-4 border-transparent`
                            }
                          `}
                          style={
                            !feedback
                              ? { boxShadow: `0 4px 0 0 ${colors.shadow}` }
                              : {}
                          }
                        >
                          {article}
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-1.5">
                    <div className="text-center text-xs text-blue-400 font-medium">Masculine</div>
                    <div className="text-center text-xs text-pink-400 font-medium">Feminine</div>
                    <div className="text-center text-xs text-[#d4a520] font-medium">Neuter</div>
                  </div>

                  {/* Wrong answer: show correct + pattern tip */}
                  <AnimatePresence>
                    {feedback && !feedback.correct && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 space-y-2"
                      >
                        <div
                          className="rounded-xl border-2 p-3 text-center"
                          style={{
                            borderColor: ARTICLE_COLORS[(currentQuestion.data as SituationalQuestion).answer].hex,
                            backgroundColor: `${ARTICLE_COLORS[(currentQuestion.data as SituationalQuestion).answer].hex}15`,
                          }}
                        >
                          <span
                            className="text-xl font-black"
                            style={{ color: ARTICLE_COLORS[(currentQuestion.data as SituationalQuestion).answer].hex }}
                          >
                            {(currentQuestion.data as SituationalQuestion).answer.toUpperCase()}
                          </span>{' '}
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {(currentQuestion.data as SituationalQuestion).noun}
                          </span>
                        </div>
                        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-4 py-2 text-center">
                          <p className="text-xs text-amber-700 dark:text-amber-300">
                            {getPatternTip((currentQuestion.data as SituationalQuestion).pattern)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            )}

            {/* ── Type Mode ──────────────────────────────────────────── */}
            {currentQuestion.mode === 'type' && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`type-${currentIndex}`}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Card className="mb-4">
                    <div className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Keyboard className="w-5 h-5 text-purple-500" />
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                          Type the answer
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {(currentQuestion.data as TypeQuestion).prompt}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Type the article + noun (e.g. &quot;der Hund&quot;)
                      </p>
                    </div>
                  </Card>

                  {/* Text input */}
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleTypeSubmit(); }}
                        disabled={!!feedback}
                        placeholder="der / die / das + Noun"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        className={`
                          w-full px-5 py-4 text-xl font-bold text-center rounded-2xl border-3 outline-none transition-all
                          bg-white dark:bg-gray-800
                          ${feedback === null
                            ? 'border-gray-300 dark:border-gray-600 focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/20'
                            : feedback.correct
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                          }
                          text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                        `}
                      />
                      {!feedback && typedAnswer.trim() && (
                        <button
                          onClick={handleTypeSubmit}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#e94560] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#d63d56] transition-colors"
                        >
                          Check
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Wrong answer feedback for type mode */}
                  <AnimatePresence>
                    {feedback && !feedback.correct && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-2"
                      >
                        <div
                          className="rounded-xl border-2 p-3 text-center"
                          style={{
                            borderColor: ARTICLE_COLORS[(currentQuestion.data as TypeQuestion).article].hex,
                            backgroundColor: `${ARTICLE_COLORS[(currentQuestion.data as TypeQuestion).article].hex}15`,
                          }}
                        >
                          <span className="text-sm text-gray-500 dark:text-gray-400">Correct answer: </span>
                          <span
                            className="text-xl font-black"
                            style={{ color: ARTICLE_COLORS[(currentQuestion.data as TypeQuestion).article].hex }}
                          >
                            {(currentQuestion.data as TypeQuestion).article}
                          </span>{' '}
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {(currentQuestion.data as TypeQuestion).noun}
                          </span>
                        </div>
                        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-4 py-2 text-center">
                          <p className="text-xs text-amber-700 dark:text-amber-300">
                            {getPatternTip((currentQuestion.data as TypeQuestion).pattern)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Correct answer celebration for type mode */}
                  <AnimatePresence>
                    {feedback?.correct && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700 p-3 text-center"
                      >
                        <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                          Correct!
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Combo visual */}
            <AnimatePresence>
              {showCombo && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 mt-3"
                >
                  <span className="text-lg font-black text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-4 py-1 rounded-full">
                    {streak >= 5 ? '3x' : '2x'} COMBO!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Complete Screen ──────────────────────────────────────────── */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              <div className="mb-4">
                <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {totalAnswered > 0 && correctCount / totalAnswered >= 0.8
                  ? 'Incredible!'
                  : totalAnswered > 0 && correctCount / totalAnswered >= 0.6
                  ? 'Great Job!'
                  : totalAnswered > 0 && correctCount / totalAnswered >= 0.4
                  ? 'Good Effort!'
                  : 'Keep Practicing!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {correctCount} correct out of {totalAnswered} answered
              </p>
              {totalAnswered > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Accuracy: {Math.round((correctCount / totalAnswered) * 100)}%
                </p>
              )}

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#e94560]">{score}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Points</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-500 flex items-center justify-center gap-1">
                    <Zap className="w-5 h-5" />{maxStreak}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Best Streak</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-500">+{earnedXP}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">XP Earned</div>
                </div>
              </div>

              {/* Missed words review */}
              {answeredQuestions.filter(q => !q.correct).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 text-left">
                    Review these:
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {answeredQuestions
                      .filter(q => !q.correct)
                      .slice(0, 10)
                      .map((q, i) => (
                        <span
                          key={`${q.noun}-${i}`}
                          className="px-3 py-1.5 rounded-lg text-sm font-bold text-white"
                          style={{ backgroundColor: ARTICLE_COLORS[q.article].hex }}
                        >
                          {q.article} {q.noun}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Article quick reference */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-sm font-semibold">
                  der = Masc.
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-500 text-sm font-semibold">
                  die = Fem.
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#d4a520]/10 text-[#d4a520] text-sm font-semibold">
                  das = Neut.
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={startGame} fullWidth>
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </Button>
                <Button variant="ghost" onClick={() => router.push('/games')} fullWidth>
                  Back to Games
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </GameStoryWrapper>
  );
}
