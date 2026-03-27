'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Clock, Keyboard } from 'lucide-react';
import { Card, Button, ProgressBar } from '@/components/ui';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { useGameStore } from '@/lib/store';

// ── Kuttan Manglish reactions ──────────────────────────────────────────
const CORRECT_REACTIONS = [
  "Adipoli! Exactly the right word!",
  "Seri seri! You nailed it!",
  "Wunderbar machaa! That sentence reads perfectly now!",
  "Sheriyaayi! German grammar vazhangum nee!",
  "Super ayi! Native speaker vibes!",
  "Richtig! Nee pro aanu!",
  "Perfect machaa! Even a German would approve!",
  "Kollam! You're thinking in German now!",
];

const WRONG_REACTIONS = [
  "Aiyyo! Close but not quite, machaa!",
  "Paravaala! Think about what fits here...",
  "Not that one da... read the sentence again!",
  "Hmm, almost! Check the grammar carefully.",
  "Allada machaa! But good try, think again!",
];

const HINT_REACTIONS = [
  "Here's a clue machaa, try once more!",
  "Hint time! You'll get it now!",
  "Oru small hint, try again!",
  "Look at the first letter and think...",
];

const REVEAL_REACTIONS = [
  "No worries machaa! Now you know it for next time.",
  "Paravaala da! This one was tricky.",
  "Remember this rule — it'll come up again!",
  "Write this one down, machaa. You'll get it next time!",
];

const STREAK_REACTIONS = [
  "ON FIRE machaa!",
  "Unstoppable! Adipoli streak!",
  "Combo power! German brain activated!",
  "Machaa you're in the zone! Keep going!",
];

const COMPLETION_MSGS: Record<string, { msg: string; mood: KuttanMood }> = {
  perfect: { msg: "Machaa! Perfect score! You understood every single situation. Ready for Germany!", mood: 'celebrating' },
  great: { msg: "Adipoli! You can handle real German texts like a pro! Almost perfect!", mood: 'excited' },
  good: { msg: "Not bad machaa! You're getting the hang of reading real German!", mood: 'happy' },
  tryAgain: { msg: "Paravaala da! German grammar takes practice. You'll crack it next time!", mood: 'thinking' },
};

// ── Types ──────────────────────────────────────────────────────────────

type Difficulty = 'easy' | 'medium' | 'hard';

interface GapQuestion {
  /** Where you'd encounter this sentence in real life */
  situation: string;
  /** The German sentence with ______ for the gap */
  sentence: string;
  /** The correct word to fill the gap */
  answer: string;
  /** English translation of the full sentence */
  english: string;
  /** Grammar rule or explanation shown after answering */
  explanation: string;
  /** Difficulty tier */
  difficulty: Difficulty;
}

// ── Question Bank (40+ real-situation sentences) ───────────────────────

const QUESTIONS: GapQuestion[] = [
  // ─── EASY (questions 1-4 range: basic conjugation, articles, common words) ───

  {
    situation: "Your WG mate left this note on the kitchen table:",
    sentence: "Ich ______ heute Abend nicht zu Hause.",
    answer: "bin",
    english: "I'm not home this evening.",
    explanation: "sein (to be): ich bin. One of the first verbs to memorize — it's irregular!",
    difficulty: 'easy',
  },
  {
    situation: "You see this text from your Tandempartner:",
    sentence: "______ wir uns morgen um 10 Uhr?",
    answer: "Treffen",
    english: "Shall we meet tomorrow at 10?",
    explanation: "Verb-first in yes/no questions. treffen (to meet) stays as infinitive with wir.",
    difficulty: 'easy',
  },
  {
    situation: "A sign at the Uni Mensa reads:",
    sentence: "Heute ______ es Currywurst mit Pommes.",
    answer: "gibt",
    english: "Today there's Currywurst with fries.",
    explanation: "es gibt = there is/are. One of the most useful phrases in daily German life.",
    difficulty: 'easy',
  },
  {
    situation: "Your German course teacher writes on the whiteboard:",
    sentence: "Bitte ______ Sie das Buch auf Seite 42.",
    answer: "öffnen",
    english: "Please open the book to page 42.",
    explanation: "Formal imperative: verb stem + Sie. öffnen Sie = please open (polite).",
    difficulty: 'easy',
  },
  {
    situation: "Your flatmate's girlfriend texts the WG group:",
    sentence: "Ich ______ einen Kuchen für die Party.",
    answer: "bringe",
    english: "I'm bringing a cake for the party.",
    explanation: "bringen: ich bringe. Regular -e ending for ich-form.",
    difficulty: 'easy',
  },
  {
    situation: "You read this on a poster at the Studentenwerk:",
    sentence: "Wir ______ neue Tutoren für Mathe!",
    answer: "suchen",
    english: "We're looking for new math tutors!",
    explanation: "suchen: wir suchen. The wir-form always matches the infinitive (-en ending).",
    difficulty: 'easy',
  },
  {
    situation: "The cashier at Rewe asks you:",
    sentence: "______ Sie eine Tüte?",
    answer: "Brauchen",
    english: "Do you need a bag?",
    explanation: "Yes/no questions start with the verb. brauchen (to need): Brauchen Sie...?",
    difficulty: 'easy',
  },
  {
    situation: "You see this note on the Waschmaschine in your WG:",
    sentence: "Die Maschine ______ kaputt. Bitte nicht benutzen!",
    answer: "ist",
    english: "The machine is broken. Please don't use it!",
    explanation: "sein: die Maschine (sie) -> ist. Third person singular of sein.",
    difficulty: 'easy',
  },
  {
    situation: "Your WG mate asks at breakfast:",
    sentence: "______ du auch Kaffee?",
    answer: "Möchtest",
    english: "Would you also like coffee?",
    explanation: "möchten (would like): du möchtest. Konjunktiv II — super polite, used daily.",
    difficulty: 'easy',
  },
  {
    situation: "A text from your Sprachkurs friend:",
    sentence: "Ich ______ Deutsch seit drei Monaten.",
    answer: "lerne",
    english: "I've been learning German for three months.",
    explanation: "lernen: ich lerne. Also note: seit + Dativ for duration (since/for).",
    difficulty: 'easy',
  },
  {
    situation: "You overhear this at the Bäckerei:",
    sentence: "Ein Brötchen ______ bitte.",
    answer: "kostet",
    english: "How much is one bread roll, please?",
    explanation: "Wait — this actually means 'One roll costs..., please' (asking for price). kosten: es/ein Brötchen kostet.",
    difficulty: 'easy',
  },
  {
    situation: "The S-Bahn announcement says:",
    sentence: "Nächster Halt: Hauptbahnhof. Bitte ______.",
    answer: "aussteigen",
    english: "Next stop: Central Station. Please alight.",
    explanation: "Separable verb: aussteigen (to get off). In commands/infinitives it stays together.",
    difficulty: 'easy',
  },
  {
    situation: "Your landlord's automated email says:",
    sentence: "Die Miete ______ am Ersten des Monats fällig.",
    answer: "ist",
    english: "The rent is due on the first of the month.",
    explanation: "sein: die Miete (fem.) -> ist. Straightforward but important to understand for Anmeldung life!",
    difficulty: 'easy',
  },
  {
    situation: "WhatsApp from your WG mate:",
    sentence: "Ich ______ im Supermarkt. Brauchst du was?",
    answer: "bin",
    english: "I'm at the supermarket. Do you need anything?",
    explanation: "sein: ich bin. Location uses sein, not haben.",
    difficulty: 'easy',
  },

  // ─── MEDIUM (questions 5-8 range: prepositions, accusative, word order) ───

  {
    situation: "Your Tandempartner texts about weekend plans:",
    sentence: "Wir gehen am Samstag ______ Kino.",
    answer: "ins",
    english: "We're going to the cinema on Saturday.",
    explanation: "in + das = ins (Akkusativ, because there's movement toward). Wechselpräposition!",
    difficulty: 'medium',
  },
  {
    situation: "An email from the Ausländerbehörde reads:",
    sentence: "Bitte bringen Sie ______ Reisepass mit.",
    answer: "Ihren",
    english: "Please bring your passport.",
    explanation: "Akkusativ: Ihr + en (masculine Akk.). Reisepass is masculine, and mitbringen takes Akkusativ.",
    difficulty: 'medium',
  },
  {
    situation: "This sign hangs in the Uni library:",
    sentence: "Das Benutzen von Handys ist hier nicht ______.",
    answer: "erlaubt",
    english: "Using mobile phones is not allowed here.",
    explanation: "Partizip II as adjective: erlaubt (allowed). Very common in official signs.",
    difficulty: 'medium',
  },
  {
    situation: "You get this WhatsApp from a German friend:",
    sentence: "Ich habe gestern einen tollen Film ______.",
    answer: "gesehen",
    english: "I saw a great film yesterday.",
    explanation: "Perfekt: haben + Partizip II at end. sehen -> gesehen (strong verb, irregular).",
    difficulty: 'medium',
  },
  {
    situation: "A note from your Vermieter on the mailbox:",
    sentence: "Das Paket liegt ______ der Tür.",
    answer: "vor",
    english: "The package is in front of the door.",
    explanation: "vor + Dativ (location, no movement). vor der Tür = in front of the door.",
    difficulty: 'medium',
  },
  {
    situation: "Your professor sends this reminder email:",
    sentence: "Vergessen Sie nicht, die Hausarbeit bis Freitag ______.",
    answer: "abzugeben",
    english: "Don't forget to submit the assignment by Friday.",
    explanation: "Separable verb + zu: ab|geben -> abzugeben. The 'zu' goes between prefix and stem.",
    difficulty: 'medium',
  },
  {
    situation: "Text from your Sprachkurs classmate:",
    sentence: "Kannst du mir ______ dem Hausaufgabe helfen?",
    answer: "bei",
    english: "Can you help me with the homework?",
    explanation: "helfen bei + Dativ = to help with. Also: helfen always takes Dativ (mir, not mich).",
    difficulty: 'medium',
  },
  {
    situation: "You read this on a café menu board:",
    sentence: "Zu ______ Kaffee gibt es ein Stück Kuchen gratis.",
    answer: "jedem",
    english: "With every coffee you get a free piece of cake.",
    explanation: "zu + Dativ: jeder (masc.) -> jedem. Kaffee is masculine, Dativ = jedem.",
    difficulty: 'medium',
  },
  {
    situation: "Your WG's house rules document says:",
    sentence: "Nach 22 Uhr darf man keine laute Musik ______.",
    answer: "spielen",
    english: "After 10 PM you may not play loud music.",
    explanation: "Modalverb (dürfen) sends the main verb (spielen) to the end as infinitive.",
    difficulty: 'medium',
  },
  {
    situation: "An automated message from Deutsche Bahn:",
    sentence: "Ihr Zug ______ voraussichtlich 15 Minuten Verspätung.",
    answer: "hat",
    english: "Your train is expected to be 15 minutes late.",
    explanation: "haben: Ihr Zug (er) -> hat. 'Verspätung haben' = to be delayed. Welcome to Deutsche Bahn!",
    difficulty: 'medium',
  },
  {
    situation: "A poster in the Studierendenwerk reads:",
    sentence: "Wer ______ an dem Workshop teilnehmen möchte, bitte hier anmelden.",
    answer: "gern",
    english: "Whoever would like to participate in the workshop, please register here.",
    explanation: "gern/gerne = gladly/willingly. 'gern teilnehmen möchte' = would like to participate.",
    difficulty: 'medium',
  },
  {
    situation: "Your German friend texts after you helped them move:",
    sentence: "Danke, dass du mir ______ hast!",
    answer: "geholfen",
    english: "Thanks for helping me!",
    explanation: "Perfekt of helfen: haben + geholfen (strong verb). In dass-clauses, the verb goes to the end.",
    difficulty: 'medium',
  },
  {
    situation: "You see this at the entrance of a Schwimmbad:",
    sentence: "Kinder ______ 6 Jahren zahlen keinen Eintritt.",
    answer: "unter",
    english: "Children under 6 years pay no admission.",
    explanation: "unter + Dativ (age context). unter 6 Jahren = under 6 years old.",
    difficulty: 'medium',
  },

  // ─── HARD (questions 9-12 range: Dativ, word order, separable verbs, subordinate clauses) ───

  {
    situation: "The landlord sent this email about a repair:",
    sentence: "Der Handwerker kommt am Montag, ______ er das Waschbecken reparieren kann.",
    answer: "damit",
    english: "The handyman is coming on Monday so that he can repair the sink.",
    explanation: "damit = so that (purpose clause). It's a subordinating conjunction — verb goes to the end!",
    difficulty: 'hard',
  },
  {
    situation: "A doctor's letter reads:",
    sentence: "Dem ______ wird empfohlen, drei Tage zu Hause zu bleiben.",
    answer: "Patienten",
    english: "The patient is recommended to stay home for three days.",
    explanation: "Dativ: der Patient -> dem Patienten (n-Deklination!). Weak masculine nouns add -en in all cases except Nominativ.",
    difficulty: 'hard',
  },
  {
    situation: "Your professor writes in the course forum:",
    sentence: "Die Studierenden, ______ die Prüfung bestanden haben, können sich das Zeugnis abholen.",
    answer: "die",
    english: "Students who passed the exam can pick up their certificate.",
    explanation: "Relativpronomen: die Studierenden (plural) -> die (Nominativ plural). The relative pronoun matches the noun's gender/number.",
    difficulty: 'hard',
  },
  {
    situation: "You read this in a Wohnungsanzeige online:",
    sentence: "Die Wohnung, ______ sich im dritten Stock befindet, hat einen Balkon.",
    answer: "die",
    english: "The apartment, which is on the third floor, has a balcony.",
    explanation: "Relativsatz: die Wohnung (fem.) -> die (Nom. fem.). sich befinden = to be located (reflexive).",
    difficulty: 'hard',
  },
  {
    situation: "The Finanzamt sends you this letter:",
    sentence: "Falls Sie ______ Fragen haben, wenden Sie sich an unser Büro.",
    answer: "weitere",
    english: "If you have further questions, please contact our office.",
    explanation: "weitere = further/additional (plural Akkusativ, no article). Formal letter style you'll see in official documents.",
    difficulty: 'hard',
  },
  {
    situation: "A text from your colleague at the Werkstudent job:",
    sentence: "Der Chef hat gesagt, dass er die Besprechung ______ hat.",
    answer: "verschoben",
    english: "The boss said that he postponed the meeting.",
    explanation: "Perfekt in Nebensatz: hat goes to the very end. verschieben -> verschoben (strong verb). In dass-clauses: ...verschoben hat.",
    difficulty: 'hard',
  },
  {
    situation: "An important clause in your Mietvertrag:",
    sentence: "Der Mieter verpflichtet sich, die Wohnung in ______ Zustand zurückzugeben.",
    answer: "ordnungsgemäßem",
    english: "The tenant commits to returning the apartment in proper condition.",
    explanation: "Dativ after 'in' (location sense): ordnungsgemäß + em (masc. Dativ adjective ending, no article = strong ending).",
    difficulty: 'hard',
  },
  {
    situation: "You see this in the Tagesschau news ticker:",
    sentence: "Die Regierung hat beschlossen, die Steuern zu ______.",
    answer: "senken",
    english: "The government has decided to lower taxes.",
    explanation: "zu + Infinitiv at end. senken = to lower/reduce. beschließen, etwas zu tun = decide to do something.",
    difficulty: 'hard',
  },
  {
    situation: "Your Krankenkasse sends this letter:",
    sentence: "Wir bitten Sie, uns die ______ Unterlagen bis zum 15. März zuzusenden.",
    answer: "fehlenden",
    english: "We ask you to send us the missing documents by March 15th.",
    explanation: "Partizip I as adjective: fehlend + en (Akk. plural with die). fehlend = missing (from fehlen).",
    difficulty: 'hard',
  },
  {
    situation: "A German friend explains why they're late:",
    sentence: "Ich wäre pünktlich gewesen, wenn der Zug nicht ______ wäre.",
    answer: "ausgefallen",
    english: "I would have been on time if the train hadn't been cancelled.",
    explanation: "Konjunktiv II Vergangenheit: wäre + Partizip II. ausfallen -> ausgefallen. Nebensatz word order!",
    difficulty: 'hard',
  },
  {
    situation: "Your Betreuer writes this feedback on your thesis:",
    sentence: "Es wäre besser, wenn Sie ______ Quellen zitieren würden.",
    answer: "mehr",
    english: "It would be better if you cited more sources.",
    explanation: "Konjunktiv II for polite suggestions: würden + Infinitiv. mehr = more (comparative of viel).",
    difficulty: 'hard',
  },
  {
    situation: "An official letter from your Uni:",
    sentence: "Hiermit wird bestätigt, dass ______ oben genannte Person an dieser Universität immatrikuliert ist.",
    answer: "die",
    english: "This hereby confirms that the above-mentioned person is enrolled at this university.",
    explanation: "die (Nom. fem.) for Person. Official German loves passive voice + dass-clauses. Learn to parse these!",
    difficulty: 'hard',
  },
  {
    situation: "Your boss at the Werkstudent job emails:",
    sentence: "Könnten Sie die Präsentation bis morgen fertig ______?",
    answer: "stellen",
    english: "Could you finish the presentation by tomorrow?",
    explanation: "fertigstellen = to finish/complete (separable verb). With Modalverb: fertig + stellen at end.",
    difficulty: 'hard',
  },
  {
    situation: "A Jobcenter letter reads:",
    sentence: "Der Antrag, ______ Sie eingereicht haben, wird derzeit bearbeitet.",
    answer: "den",
    english: "The application that you submitted is currently being processed.",
    explanation: "Relativpronomen: der Antrag (masc.) but it's the object of eingereicht haben -> den (Akkusativ masc.).",
    difficulty: 'hard',
  },
];

const TOTAL_QUESTIONS = 12;
const XP_PER_CORRECT = 8;
const MAX_XP = TOTAL_QUESTIONS * XP_PER_CORRECT;

// ── Helpers ────────────────────────────────────────────────────────────

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Get difficulty for a question index (0-based) */
function getDifficulty(index: number): Difficulty {
  if (index < 4) return 'easy';
  if (index < 8) return 'medium';
  return 'hard';
}

/** Split sentence around the gap marker */
function getSentenceParts(sentence: string) {
  const parts = sentence.split('______');
  return { before: parts[0] || '', after: parts[1] || '' };
}

// ── Component ──────────────────────────────────────────────────────────

export default function FillTheGapGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();
  const inputRef = useRef<HTMLInputElement>(null);

  // Game state
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'complete'>('ready');
  const [questions, setQuestions] = useState<GapQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  // Per-question state
  const [typedAnswer, setTypedAnswer] = useState('');
  const [attempt, setAttempt] = useState(0); // 0 = first try, 1 = hint shown, 2 = revealed
  const [answerState, setAnswerState] = useState<'typing' | 'correct' | 'wrong' | 'hint' | 'revealed'>('typing');

  // Streak & UI
  const [streak, setStreak] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [kuttanMsg, setKuttanMsg] = useState("You'll see real German texts — notes, signs, emails. Fill in the missing word by typing it!");

  // ── Generate questions with difficulty progression ──
  const generateQuestions = useCallback((): GapQuestion[] => {
    const easy = shuffleArray(QUESTIONS.filter(q => q.difficulty === 'easy'));
    const medium = shuffleArray(QUESTIONS.filter(q => q.difficulty === 'medium'));
    const hard = shuffleArray(QUESTIONS.filter(q => q.difficulty === 'hard'));

    const picked: GapQuestion[] = [
      ...easy.slice(0, 4),
      ...medium.slice(0, 4),
      ...hard.slice(0, 4),
    ];

    // If we don't have enough of any tier, fill from others
    while (picked.length < TOTAL_QUESTIONS) {
      const remaining = shuffleArray(QUESTIONS.filter(q => !picked.includes(q)));
      if (remaining.length === 0) break;
      picked.push(remaining[0]);
    }

    setQuestions(picked);
    return picked;
  }, []);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  // Focus input when question changes or state returns to typing
  useEffect(() => {
    if (gameState === 'playing' && (answerState === 'typing' || answerState === 'hint')) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [currentIndex, answerState, gameState]);

  const currentQ = questions[currentIndex];
  const difficulty = getDifficulty(currentIndex);

  // Placeholder text based on difficulty tier
  const getPlaceholder = useMemo(() => {
    if (!currentQ) return 'Type the missing word...';
    if (answerState === 'hint') {
      return `Starts with "${currentQ.answer[0]}..." (${currentQ.answer.length} letters)`;
    }
    if (difficulty === 'easy') {
      return `${currentQ.answer[0]}... (${currentQ.answer.length} letters)`;
    }
    if (difficulty === 'medium') {
      return `${currentQ.answer.length} letters`;
    }
    return 'Type the missing word...';
  }, [currentQ, difficulty, answerState]);

  // Difficulty label
  const difficultyLabel = difficulty === 'easy' ? 'Warm-up' : difficulty === 'medium' ? 'Real-world' : 'Advanced';
  const difficultyColor = difficulty === 'easy' ? 'text-emerald-400' : difficulty === 'medium' ? 'text-amber-400' : 'text-red-400';

  // ── Start game ──
  const startGame = () => {
    const picked = generateQuestions();
    setCurrentIndex(0);
    setScore(0);
    setResults([]);
    setTypedAnswer('');
    setAttempt(0);
    setAnswerState('typing');
    setStreak(0);
    setShowCombo(false);
    setKuttanMood('excited');
    setKuttanMsg("Sheriyaano? Let's go! Type the missing German word!");
    setGameState('playing');
  };

  // ── Advance to next question ──
  const advanceToNext = useCallback((newScore: number, wasCorrect: boolean) => {
    const newResults = [...results, wasCorrect];
    setResults(newResults);

    setTimeout(() => {
      if (currentIndex < TOTAL_QUESTIONS - 1) {
        setCurrentIndex(prev => prev + 1);
        setTypedAnswer('');
        setAttempt(0);
        setAnswerState('typing');
      } else {
        // Game complete
        setGameState('complete');
        incrementGamesPlayed();
        const earnedXP = newScore * XP_PER_CORRECT;
        addXP(earnedXP);

        const comp = newScore === TOTAL_QUESTIONS ? COMPLETION_MSGS.perfect
          : newScore >= 10 ? COMPLETION_MSGS.great
          : newScore >= 7 ? COMPLETION_MSGS.good
          : COMPLETION_MSGS.tryAgain;
        setKuttanMood(comp.mood);
        setKuttanMsg(comp.msg);
      }
    }, answerState === 'correct' ? 1800 : 2800);
  }, [currentIndex, results, answerState, addXP, incrementGamesPlayed]);

  // ── Handle answer submission ──
  const handleSubmit = useCallback(() => {
    if (!currentQ || answerState === 'correct' || answerState === 'revealed') return;

    const trimmed = typedAnswer.trim();
    if (!trimmed) return;

    // Case-insensitive comparison, but also check exact match for proper capitalization feedback
    const isCorrect = trimmed.toLowerCase() === currentQ.answer.toLowerCase();

    if (isCorrect) {
      setAnswerState('correct');
      // Only full points on first attempt
      const pointsEarned = attempt === 0 ? 1 : 0;
      const newScore = score + pointsEarned;
      setScore(newScore);

      const newStreak = streak + 1;
      setStreak(newStreak);

      if (newStreak >= 3) {
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 1200);
        setKuttanMood('celebrating');
        setKuttanMsg(pickRandom(STREAK_REACTIONS));
      } else {
        setKuttanMood('happy');
        setKuttanMsg(pickRandom(CORRECT_REACTIONS));
      }

      // Show with correct capitalization
      setTypedAnswer(currentQ.answer);
      advanceToNext(newScore, pointsEarned > 0);
    } else {
      // Wrong answer
      if (attempt === 0) {
        // First wrong: show hint, let them try again
        setAttempt(1);
        setAnswerState('hint');
        setTypedAnswer('');
        setStreak(0);
        setKuttanMood('thinking');
        setKuttanMsg(pickRandom(HINT_REACTIONS));
      } else {
        // Second wrong: reveal answer
        setAttempt(2);
        setAnswerState('revealed');
        setTypedAnswer(currentQ.answer);
        setStreak(0);
        setKuttanMood('sad');
        setKuttanMsg(pickRandom(REVEAL_REACTIONS));
        advanceToNext(score, false);
      }
    }
  }, [currentQ, typedAnswer, attempt, answerState, score, streak, advanceToNext]);

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ── Render ──
  return (
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
        {gameState === 'playing' && (
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold uppercase tracking-wide ${difficultyColor}`}>
              {difficultyLabel}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentIndex + 1}/{TOTAL_QUESTIONS}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Ready Screen ── */}
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
                  messages="You'll read real German notes, texts, signs, and emails. Type the missing word to complete each sentence!"
                  mood="excited"
                  size="sm"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Fill the Gap
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Real situations. Real sentences. Type the missing German word.
              </p>

              {/* How it works */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 text-left space-y-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">How it works:</p>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Keyboard className="w-4 h-4 mt-0.5 shrink-0 text-[#e94560]" />
                  <span>Type the missing word — no multiple choice, you have to think!</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-[#ffd93d] font-bold shrink-0 mt-0.5">Q1-4</span>
                  <span>Warm-up: first letter hint shown</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">Q5-8</span>
                  <span>Real-world: no hints, just the sentence</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">Q9-12</span>
                  <span>Advanced: tricky grammar, subordinate clauses</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> No timer
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Up to {MAX_XP} XP
                </span>
              </div>
              <Button onClick={startGame} size="lg" fullWidth>
                Start Game
              </Button>
            </Card>
          </motion.div>
        )}

        {/* ── Playing Screen ── */}
        {gameState === 'playing' && currentQ && (
          <motion.div
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Kuttan Guide */}
            <div className="mb-4">
              <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" />
            </div>

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i < results.length
                      ? results[i]
                        ? 'bg-emerald-500'
                        : 'bg-red-400'
                      : i === currentIndex
                      ? 'bg-[#e94560] ring-2 ring-[#e94560]/30'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <ProgressBar
                progress={(currentIndex / TOTAL_QUESTIONS) * 100}
                color="primary"
                size="sm"
              />
            </div>

            {/* Score & Streak */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-[#e94560]">{score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
              {streak >= 3 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-orange-500">{streak}x</div>
                  <div className="text-xs text-orange-400">Streak</div>
                </motion.div>
              )}
            </div>

            {/* Combo indicator */}
            <AnimatePresence>
              {showCombo && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center justify-center gap-2 mb-3"
                >
                  <span className="text-lg font-black text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-4 py-1 rounded-full">
                    {streak >= 5 ? '3x' : '2x'} COMBO!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Situation Context */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-3"
            >
              <div className="bg-[#0f3460]/20 dark:bg-[#0f3460]/40 border border-[#0f3460]/30 rounded-xl px-4 py-3">
                <p className="text-sm text-[#7eb8da] dark:text-[#a3d5f7] font-medium italic">
                  {currentQ.situation}
                </p>
              </div>
            </motion.div>

            {/* Sentence Card with Typing Input */}
            <Card className="mb-5">
              <div className="py-4">
                {/* The sentence with inline gap */}
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex flex-wrap items-center justify-center gap-1 leading-relaxed px-2">
                  {(() => {
                    const { before, after } = getSentenceParts(currentQ.sentence);
                    return (
                      <>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {before}
                        </motion.span>

                        {/* The Gap / Input / Answer */}
                        <motion.span
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15, duration: 0.3 }}
                          className="inline-flex items-center mx-1"
                        >
                          {answerState === 'correct' ? (
                            <span className="inline-block px-3 py-1 rounded-lg border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold min-w-[80px] text-center">
                              {typedAnswer}
                            </span>
                          ) : answerState === 'revealed' ? (
                            <span className="inline-block px-3 py-1 rounded-lg border-2 border-amber-500 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-bold min-w-[80px] text-center">
                              {currentQ.answer}
                            </span>
                          ) : (
                            <input
                              ref={inputRef}
                              type="text"
                              value={typedAnswer}
                              onChange={e => setTypedAnswer(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder={getPlaceholder}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck={false}
                              className={`inline-block px-3 py-1 rounded-lg border-2 border-dashed font-bold text-center min-w-[100px] max-w-[200px] bg-transparent outline-none transition-colors duration-200 ${
                                answerState === 'hint'
                                  ? 'border-amber-400 text-gray-900 dark:text-white placeholder:text-amber-400/60'
                                  : 'border-[#ffd93d] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500'
                              } focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/20`}
                              style={{ width: `${Math.max(100, currentQ.answer.length * 18)}px` }}
                            />
                          )}
                        </motion.span>

                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.05, duration: 0.3 }}
                        >
                          {after}
                        </motion.span>
                      </>
                    );
                  })()}
                </div>

                {/* Hint badge on second attempt */}
                <AnimatePresence>
                  {answerState === 'hint' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-center mt-3"
                    >
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full font-medium">
                        Wrong! Try once more — hint: starts with &quot;{currentQ.answer[0]}&quot;
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* English Translation — shown after answering */}
                <AnimatePresence>
                  {(answerState === 'correct' || answerState === 'revealed') && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="text-gray-500 dark:text-gray-400 text-base mt-4 italic text-center"
                    >
                      {currentQ.english}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Grammar explanation — always shown after resolution */}
                <AnimatePresence>
                  {(answerState === 'correct' || answerState === 'revealed') && currentQ.explanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className={`mt-3 rounded-lg border px-4 py-2 ${
                        answerState === 'correct'
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700'
                          : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
                      }`}
                    >
                      <p className={`text-xs font-bold mb-0.5 ${
                        answerState === 'correct'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}>
                        Grammar Note
                      </p>
                      <p className={`text-sm ${
                        answerState === 'correct'
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : 'text-amber-700 dark:text-amber-300'
                      }`}>
                        {currentQ.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>

            {/* Submit Button */}
            {(answerState === 'typing' || answerState === 'hint') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  size="lg"
                  disabled={!typedAnswer.trim()}
                >
                  {answerState === 'hint' ? 'Try Again' : 'Check Answer'}
                </Button>
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
                  Press Enter to submit
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── Complete Screen ── */}
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
                {score === TOTAL_QUESTIONS
                  ? 'Perfect!'
                  : score >= 10
                  ? 'Brilliant!'
                  : score >= 7
                  ? 'Great Job!'
                  : score >= 4
                  ? 'Good Effort!'
                  : 'Keep Practicing!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You got {score} out of {TOTAL_QUESTIONS} correct on the first try!
              </p>

              {/* Result Dots */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {results.map((correct, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05, type: 'spring' }}
                    className={`w-4 h-4 rounded-full ${
                      correct ? 'bg-emerald-500' : 'bg-red-400'
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-500">{score}</div>
                  <div className="text-xs text-gray-500">Correct</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-500">{TOTAL_QUESTIONS - score}</div>
                  <div className="text-xs text-gray-500">Mistakes</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-amber-500">
                    +{score * XP_PER_CORRECT}
                  </div>
                  <div className="text-xs text-gray-500">XP Earned</div>
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
  );
}
