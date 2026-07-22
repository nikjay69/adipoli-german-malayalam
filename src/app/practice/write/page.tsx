'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  Zap,
  PenLine,
  FileText,
  MessageSquare,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { Nivin } from '@/components/character/Nivin';
import { Confetti } from '@/components/game';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type WritingMode = 'form' | 'message' | 'free';

interface FormField {
  label: string;
  hint: string;
  expectedKey: string;
}

interface FormPrompt {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  modelAnswers: Record<string, string>;
}

interface MessagePrompt {
  id: string;
  situation: string;
  inhaltspunkte: [string, string, string];
  modelAnswer: string;
  expectedTopics: string;
}

interface FreePrompt {
  id: string;
  topic: string;
  hint: string;
  modelAnswer: string;
}

interface AIFeedback {
  score: number;
  feedback: string;
  corrections: string[];
  isCorrect: boolean;
}

// ---------------------------------------------------------------------------
// Form Filling Prompts
// ---------------------------------------------------------------------------

const FORM_PROMPTS: FormPrompt[] = [
  {
    id: 'anmeldung',
    title: 'Anmeldung (Registration Form)',
    description: 'Fill out this registration form in German',
    fields: [
      { label: 'Vorname', hint: 'First name', expectedKey: 'vorname' },
      { label: 'Nachname', hint: 'Last name / Family name', expectedKey: 'nachname' },
      { label: 'Geburtsdatum', hint: 'Date of birth (e.g. 15.03.1998)', expectedKey: 'geburtsdatum' },
      { label: 'Geburtsort', hint: 'Place of birth', expectedKey: 'geburtsort' },
      { label: 'Staatsangehörigkeit', hint: 'Nationality', expectedKey: 'staatsangehoerigkeit' },
      { label: 'Adresse', hint: 'Address', expectedKey: 'adresse' },
      { label: 'Telefonnummer', hint: 'Phone number', expectedKey: 'telefonnummer' },
      { label: 'E-Mail', hint: 'Email address', expectedKey: 'email' },
    ],
    modelAnswers: {
      vorname: 'Arun',
      nachname: 'Nair',
      geburtsdatum: '15.03.1998',
      geburtsort: 'Kochi, Indien',
      staatsangehoerigkeit: 'indisch',
      adresse: 'Musterstraße 12, 10115 Berlin',
      telefonnummer: '+49 176 12345678',
      email: 'arun.nair@email.de',
    },
  },
  {
    id: 'kursanmeldung',
    title: 'Kursanmeldung (Course Registration)',
    description: 'Register for a German language course',
    fields: [
      { label: 'Name', hint: 'Full name', expectedKey: 'name' },
      { label: 'Alter', hint: 'Age', expectedKey: 'alter' },
      { label: 'Muttersprache', hint: 'Mother tongue', expectedKey: 'muttersprache' },
      { label: 'Beruf', hint: 'Profession', expectedKey: 'beruf' },
      { label: 'Kurswunsch', hint: 'Which course? (e.g. A1, A2)', expectedKey: 'kurswunsch' },
      { label: 'Kurstage', hint: 'Preferred days (e.g. Montag, Mittwoch)', expectedKey: 'kurstage' },
    ],
    modelAnswers: {
      name: 'Meera Krishnan',
      alter: '26',
      muttersprache: 'Malayalam',
      beruf: 'Softwareentwicklerin',
      kurswunsch: 'A1 Intensivkurs',
      kurstage: 'Montag bis Freitag',
    },
  },
];

// ---------------------------------------------------------------------------
// Message Writing Prompts (20)
// ---------------------------------------------------------------------------

const MESSAGE_PROMPTS: MessagePrompt[] = [
  {
    id: 'msg-1',
    situation: 'You missed your German class yesterday. Write an email to your teacher.',
    inhaltspunkte: [
      'Apologize for your absence',
      'Give the reason (you were sick)',
      'Ask about homework',
    ],
    modelAnswer: 'Liebe Frau Müller,\n\nentschuldigen Sie bitte, ich war gestern nicht im Kurs. Ich war leider krank. Können Sie mir bitte die Hausaufgaben schicken?\n\nVielen Dank!\nArun Nair',
    expectedTopics: 'Apology for missing class, reason for absence, ask about homework',
  },
  {
    id: 'msg-2',
    situation: 'Your friend Lena has invited you to dinner on Saturday. Write to accept.',
    inhaltspunkte: [
      'Thank her for the invitation',
      'Confirm you will come',
      'Ask what you should bring',
    ],
    modelAnswer: 'Liebe Lena,\n\ndanke für die Einladung! Ich komme gerne am Samstag. Soll ich etwas mitbringen?\n\nBis Samstag!\nArun',
    expectedTopics: 'Thank for invitation, confirm attendance, ask what to bring',
  },
  {
    id: 'msg-3',
    situation: 'Someone gave you a birthday gift. Write a thank-you message.',
    inhaltspunkte: [
      'Thank the person for the gift',
      'Say what you liked about it',
      'Suggest meeting soon',
    ],
    modelAnswer: 'Lieber Thomas,\n\nvielen Dank für das tolle Geburtstagsgeschenk! Das Buch gefällt mir sehr gut. Wollen wir bald zusammen einen Kaffee trinken?\n\nViele Grüße\nArun',
    expectedTopics: 'Thank for gift, what you liked, suggest meeting',
  },
  {
    id: 'msg-4',
    situation: 'You need to cancel a doctor\'s appointment. Write to the practice.',
    inhaltspunkte: [
      'Say which appointment you want to cancel',
      'Give the reason',
      'Ask for a new appointment',
    ],
    modelAnswer: 'Sehr geehrte Damen und Herren,\n\nich möchte meinen Termin am Mittwoch, den 15. März um 10:00 Uhr absagen. Ich muss leider arbeiten. Kann ich bitte einen neuen Termin bekommen?\n\nMit freundlichen Grüßen\nArun Nair',
    expectedTopics: 'Cancel appointment with date, reason, request new appointment',
  },
  {
    id: 'msg-5',
    situation: 'You saw an apartment ad online. Write to ask for more information.',
    inhaltspunkte: [
      'Say you are interested in the apartment',
      'Ask about the rent and Nebenkosten',
      'Ask when you can visit',
    ],
    modelAnswer: 'Sehr geehrte Damen und Herren,\n\nich habe Ihre Anzeige für die Wohnung in der Berliner Straße gelesen. Ich interessiere mich für die Wohnung. Wie hoch sind die Miete und die Nebenkosten? Wann kann ich die Wohnung besichtigen?\n\nMit freundlichen Grüßen\nArun Nair',
    expectedTopics: 'Interest in apartment, ask about rent/costs, ask for viewing',
  },
  {
    id: 'msg-6',
    situation: 'A friend invited you to a party, but you cannot come. Write to decline politely.',
    inhaltspunkte: [
      'Thank for the invitation',
      'Say you cannot come and why',
      'Wish them a great party',
    ],
    modelAnswer: 'Lieber Max,\n\ndanke für die Einladung zu deiner Party! Leider kann ich nicht kommen, weil ich an dem Tag arbeiten muss. Ich wünsche dir eine tolle Party!\n\nViele Grüße\nArun',
    expectedTopics: 'Thank for invitation, decline with reason, wish well',
  },
  {
    id: 'msg-7',
    situation: 'Write to your teacher about being absent next week.',
    inhaltspunkte: [
      'Inform about your absence',
      'Give the dates and reason',
      'Ask for materials you will miss',
    ],
    modelAnswer: 'Liebe Frau Schmidt,\n\nich möchte Ihnen mitteilen, dass ich nächste Woche (vom 20. bis 24. März) nicht am Kurs teilnehmen kann. Ich muss nach Indien fliegen. Können Sie mir bitte die Unterlagen per E-Mail schicken?\n\nVielen Dank!\nArun Nair',
    expectedTopics: 'Inform about absence, dates and reason, request materials',
  },
  {
    id: 'msg-8',
    situation: 'Your neighbor plays loud music every night. Write them a polite message.',
    inhaltspunkte: [
      'Describe the problem',
      'Explain how it affects you',
      'Ask them to be quieter',
    ],
    modelAnswer: 'Lieber Nachbar,\n\nich schreibe Ihnen wegen der lauten Musik am Abend. Ich muss früh aufstehen und kann leider nicht schlafen. Könnten Sie bitte nach 22 Uhr die Musik leiser machen?\n\nVielen Dank für Ihr Verständnis!\nArun Nair',
    expectedTopics: 'Describe noise problem, impact on you, polite request to be quiet',
  },
  {
    id: 'msg-9',
    situation: 'You want to confirm a meeting with your study partner on Thursday.',
    inhaltspunkte: [
      'Confirm the meeting day and time',
      'Suggest a place to meet',
      'Ask them to bring something',
    ],
    modelAnswer: 'Hallo Julia,\n\nich möchte unseren Termin am Donnerstag um 14:00 Uhr bestätigen. Sollen wir uns in der Bibliothek treffen? Kannst du bitte dein Deutschbuch mitbringen?\n\nBis Donnerstag!\nArun',
    expectedTopics: 'Confirm day/time, suggest meeting place, ask to bring something',
  },
  {
    id: 'msg-10',
    situation: 'Write to an office to request information about German language courses.',
    inhaltspunkte: [
      'Say you want to learn German',
      'Ask about course times and costs',
      'Ask how to register',
    ],
    modelAnswer: 'Sehr geehrte Damen und Herren,\n\nich möchte einen Deutschkurs besuchen. Ich bin Anfänger (Niveau A1). Können Sie mir bitte Informationen über Kurszeiten und Kosten schicken? Wie kann ich mich anmelden?\n\nMit freundlichen Grüßen\nArun Nair',
    expectedTopics: 'Want to learn German, ask about times/costs, how to register',
  },
  {
    id: 'msg-11',
    situation: 'You lost your bag on the bus. Write to the transport office.',
    inhaltspunkte: [
      'Describe what happened',
      'Describe the bag',
      'Give your contact information',
    ],
    modelAnswer: 'Sehr geehrte Damen und Herren,\n\ngestern habe ich meine Tasche im Bus Linie 42 vergessen. Die Tasche ist schwarz und hat einen roten Reißverschluss. Darin sind meine Bücher und mein Geldbeutel. Bitte rufen Sie mich an: 0176 12345678.\n\nMit freundlichen Grüßen\nArun Nair',
    expectedTopics: 'Describe incident, describe bag, contact information',
  },
  {
    id: 'msg-12',
    situation: 'Invite a colleague to go to a restaurant for lunch.',
    inhaltspunkte: [
      'Invite them to lunch',
      'Suggest a restaurant and time',
      'Ask what food they like',
    ],
    modelAnswer: 'Hallo Maria,\n\nhast du Lust, zusammen Mittagessen zu gehen? Es gibt ein neues italienisches Restaurant in der Nähe. Wollen wir um 12:30 Uhr gehen? Was isst du gerne?\n\nBis dann!\nArun',
    expectedTopics: 'Invite to lunch, suggest restaurant/time, ask food preference',
  },
  {
    id: 'msg-13',
    situation: 'You want to buy a used bicycle from an online ad. Write to the seller.',
    inhaltspunkte: [
      'Say you are interested in the bicycle',
      'Ask about the condition',
      'Ask when and where you can see it',
    ],
    modelAnswer: 'Hallo,\n\nich habe Ihre Anzeige für das Fahrrad gelesen. Ich interessiere mich dafür. In welchem Zustand ist das Fahrrad? Wann und wo kann ich es mir ansehen?\n\nViele Grüße\nArun',
    expectedTopics: 'Interest in bicycle, ask condition, when/where to see it',
  },
  {
    id: 'msg-14',
    situation: 'Your child is sick and cannot go to school. Write to the teacher.',
    inhaltspunkte: [
      'Inform that your child is sick',
      'Say how long they will be absent',
      'Ask for homework',
    ],
    modelAnswer: 'Liebe Frau Fischer,\n\nmein Sohn Arjun ist leider krank und kann diese Woche nicht in die Schule kommen. Er hat Fieber. Können Sie mir bitte die Hausaufgaben per E-Mail schicken?\n\nVielen Dank!\nArun Nair',
    expectedTopics: 'Child is sick, duration of absence, request homework',
  },
  {
    id: 'msg-15',
    situation: 'Thank a friend for helping you move to a new apartment.',
    inhaltspunkte: [
      'Thank them for their help',
      'Say what you liked about the new apartment',
      'Invite them to visit',
    ],
    modelAnswer: 'Lieber Paul,\n\nvielen Dank für deine Hilfe beim Umzug! Ohne dich hätte ich das nicht geschafft. Die neue Wohnung ist super — sie hat viel Licht und einen Balkon. Komm doch mal zum Abendessen vorbei!\n\nViele Grüße\nArun',
    expectedTopics: 'Thank for help moving, describe new apartment, invite to visit',
  },
  {
    id: 'msg-16',
    situation: 'Write to a hotel to book a room for your vacation.',
    inhaltspunkte: [
      'Say when you want to come and for how long',
      'Ask about room types and prices',
      'Ask if breakfast is included',
    ],
    modelAnswer: 'Sehr geehrte Damen und Herren,\n\nich möchte ein Zimmer vom 10. bis 15. Juli buchen. Haben Sie ein Einzelzimmer oder Doppelzimmer frei? Wie viel kostet es pro Nacht? Ist das Frühstück inklusive?\n\nMit freundlichen Grüßen\nArun Nair',
    expectedTopics: 'Dates and duration, room types and prices, breakfast included',
  },
  {
    id: 'msg-17',
    situation: 'You are new in the city. Write to a sports club to ask about joining.',
    inhaltspunkte: [
      'Introduce yourself briefly',
      'Ask about activities and schedule',
      'Ask about membership costs',
    ],
    modelAnswer: 'Sehr geehrte Damen und Herren,\n\nmein Name ist Arun Nair und ich bin neu in der Stadt. Ich interessiere mich für Ihren Sportverein. Welche Sportarten bieten Sie an und wann ist das Training? Wie viel kostet die Mitgliedschaft?\n\nMit freundlichen Grüßen\nArun Nair',
    expectedTopics: 'Brief introduction, activities/schedule, membership costs',
  },
  {
    id: 'msg-18',
    situation: 'Write to your landlord because the heating in your apartment is broken.',
    inhaltspunkte: [
      'Describe the problem',
      'Say since when it is broken',
      'Ask for a repair',
    ],
    modelAnswer: 'Sehr geehrter Herr Meier,\n\nich schreibe Ihnen, weil die Heizung in meiner Wohnung nicht funktioniert. Seit Montag ist es sehr kalt in der Wohnung. Können Sie bitte einen Handwerker schicken?\n\nMit freundlichen Grüßen\nArun Nair',
    expectedTopics: 'Describe heating problem, since when, request repair',
  },
  {
    id: 'msg-19',
    situation: 'Reply to a friend who asked about your weekend plans.',
    inhaltspunkte: [
      'Say what you did or will do on Saturday',
      'Say what you did or will do on Sunday',
      'Ask about their weekend',
    ],
    modelAnswer: 'Hallo Lisa,\n\nam Samstag gehe ich mit Freunden ins Kino. Wir sehen einen neuen Film. Am Sonntag möchte ich zu Hause kochen und ein Buch lesen. Was machst du am Wochenende?\n\nViele Grüße\nArun',
    expectedTopics: 'Saturday plans, Sunday plans, ask about their weekend',
  },
  {
    id: 'msg-20',
    situation: 'You want to return a product you bought online. Write to customer service.',
    inhaltspunkte: [
      'Say what you bought and when',
      'Explain the problem with the product',
      'Ask for a refund or exchange',
    ],
    modelAnswer: 'Sehr geehrte Damen und Herren,\n\nam 5. März habe ich bei Ihnen eine Jacke bestellt (Bestellnummer: 12345). Leider ist die Jacke zu klein. Ich möchte sie zurückschicken. Kann ich bitte mein Geld zurückbekommen oder eine größere Größe bekommen?\n\nMit freundlichen Grüßen\nArun Nair',
    expectedTopics: 'What was bought and when, problem with product, request refund/exchange',
  },
];

// ---------------------------------------------------------------------------
// Free Writing Prompts
// ---------------------------------------------------------------------------

const FREE_PROMPTS: FreePrompt[] = [
  {
    id: 'free-1',
    topic: 'Describe your typical day',
    hint: 'Use time words: morgens, mittags, abends, um ... Uhr',
    modelAnswer: 'Morgens stehe ich um 7 Uhr auf. Ich frühstücke und fahre zur Arbeit. Mittags esse ich in der Kantine. Abends koche ich und lese ein Buch. Um 23 Uhr gehe ich schlafen.',
  },
  {
    id: 'free-2',
    topic: 'Describe your family',
    hint: 'Use: Meine Familie hat... Mein Vater/Meine Mutter...',
    modelAnswer: 'Meine Familie wohnt in Indien, in Kerala. Mein Vater ist Lehrer und meine Mutter ist Ärztin. Ich habe eine Schwester. Sie studiert in Mumbai. Wir telefonieren jeden Sonntag.',
  },
  {
    id: 'free-3',
    topic: 'Describe your city or town',
    hint: 'Use: Es gibt... Man kann... Die Stadt hat...',
    modelAnswer: 'Ich wohne in Kochi. Die Stadt liegt am Meer. Es gibt viele Tempel und Kirchen. Man kann leckeres Essen probieren. Die Stadt ist nicht so groß, aber sehr schön.',
  },
  {
    id: 'free-4',
    topic: 'What do you like to eat?',
    hint: 'Use: Ich esse gern... Mein Lieblingsessen ist...',
    modelAnswer: 'Ich esse gern indisches Essen. Mein Lieblingsessen ist Dosa mit Chutney. Ich mag auch deutsches Brot. Zum Frühstück trinke ich Chai. Abends koche ich meistens Reis mit Curry.',
  },
  {
    id: 'free-5',
    topic: 'Write about your hobbies',
    hint: 'Use: In meiner Freizeit... Ich spiele gern... Mein Hobby ist...',
    modelAnswer: 'In meiner Freizeit lese ich gern Bücher. Ich spiele auch gern Cricket mit Freunden. Mein Hobby ist Kochen. Am Wochenende gehe ich manchmal ins Kino oder spazieren.',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Character-count color ramp: gray -> gold -> green
function charCountColor(chars: number, target: number): string {
  if (chars === 0) return '#9ca3af'; // gray
  const ratio = chars / target;
  if (ratio < 0.4) return '#9ca3af'; // gray — just started
  if (ratio < 0.9) return '#d4a520'; // gold — getting there
  if (ratio <= 1.4) return '#27ae60'; // green — in the sweet spot
  return '#e67e22'; // amber — too long
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WritePracticePage() {
  const router = useRouter();
  const { addXP, updateStreak } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<WritingMode | null>(null);

  // Form mode state
  const [formPrompt, setFormPrompt] = useState<FormPrompt | null>(null);
  const [formAnswers, setFormAnswers] = useState<Record<string, string>>({});

  // Message mode state
  const [messagePrompt, setMessagePrompt] = useState<MessagePrompt | null>(null);
  const [messageText, setMessageText] = useState('');

  // Free mode state
  const [freePrompt, setFreePrompt] = useState<FreePrompt | null>(null);
  const [freeText, setFreeText] = useState('');

  // AI feedback
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [showModel, setShowModel] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);

  // Prompt history (to avoid repeats)
  const [usedMessageIds, setUsedMessageIds] = useState<string[]>([]);
  const [usedFreeIds, setUsedFreeIds] = useState<string[]>([]);

  // UX polish state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Confetti when feedback arrives correct
  useEffect(() => {
    if (feedback?.isCorrect) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  // ---------------------------------------------------------------------------
  // Pick prompts
  // ---------------------------------------------------------------------------

  const pickFormPrompt = useCallback(() => {
    const prompt = FORM_PROMPTS[Math.floor(Math.random() * FORM_PROMPTS.length)];
    setFormPrompt(prompt);
    setFormAnswers({});
    setFeedback(null);
    setShowModel(false);
    setXpAwarded(0);
  }, []);

  const pickMessagePrompt = useCallback(() => {
    const available = MESSAGE_PROMPTS.filter(p => !usedMessageIds.includes(p.id));
    const pool = available.length > 0 ? available : MESSAGE_PROMPTS;
    const shuffled = shuffleArray(pool);
    const prompt = shuffled[0];
    setMessagePrompt(prompt);
    setMessageText('');
    setFeedback(null);
    setShowModel(false);
    setShowHint(false);
    setXpAwarded(0);
    setUsedMessageIds(prev => [...prev, prompt.id]);
  }, [usedMessageIds]);

  const pickFreePrompt = useCallback(() => {
    const available = FREE_PROMPTS.filter(p => !usedFreeIds.includes(p.id));
    const pool = available.length > 0 ? available : FREE_PROMPTS;
    const shuffled = shuffleArray(pool);
    const prompt = shuffled[0];
    setFreePrompt(prompt);
    setFreeText('');
    setFeedback(null);
    setShowModel(false);
    setShowHint(false);
    setXpAwarded(0);
    setUsedFreeIds(prev => [...prev, prompt.id]);
  }, [usedFreeIds]);

  // ---------------------------------------------------------------------------
  // Mode selection
  // ---------------------------------------------------------------------------

  const selectMode = useCallback((m: WritingMode) => {
    setMode(m);
    setFeedback(null);
    setShowModel(false);
    if (m === 'form') pickFormPrompt();
    if (m === 'message') pickMessagePrompt();
    if (m === 'free') pickFreePrompt();
  }, [pickFormPrompt, pickMessagePrompt, pickFreePrompt]);

  // ---------------------------------------------------------------------------
  // Check answers via API
  // ---------------------------------------------------------------------------

  const checkWriting = useCallback(async () => {
    setIsChecking(true);
    setFeedback(null);
    setShowModel(false);

    let userInput = '';
    let expected = '';
    let context = '';

    if (mode === 'form' && formPrompt) {
      userInput = Object.entries(formAnswers)
        .map(([key, val]) => `${key}: ${val}`)
        .join('\n');
      expected = Object.entries(formPrompt.modelAnswers)
        .map(([key, val]) => `${key}: ${val}`)
        .join('\n');
      context = `German A1 form filling exercise: ${formPrompt.title}. Fields: ${formPrompt.fields.map(f => f.label).join(', ')}`;
    } else if (mode === 'message' && messagePrompt) {
      userInput = messageText;
      expected = messagePrompt.modelAnswer;
      context = `German A1 message writing. Situation: ${messagePrompt.situation}. Must address: ${messagePrompt.inhaltspunkte.join('; ')}. Check for: Anrede (greeting), all 3 content points, Grußformel (closing).`;
    } else if (mode === 'free' && freePrompt) {
      userInput = freeText;
      expected = freePrompt.modelAnswer;
      context = `German A1 free writing. Topic: ${freePrompt.topic}. Check grammar, vocabulary, and relevance to topic.`;
    }

    if (!userInput.trim()) {
      setIsChecking(false);
      return;
    }

    try {
      const res = await fetch('/api/check-german', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expected, userInput, context }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
        setFeedback({
          score: 0,
          feedback: errData.error || 'Could not check your writing. Please try again.',
          corrections: [],
          isCorrect: false,
        });
      } else {
        const data: AIFeedback = await res.json();
        setFeedback(data);

        // Award XP based on score
        const xp = Math.round((data.score / 100) * 30); // max 30 XP per writing
        if (xp > 0) {
          addXP(xp);
          setXpAwarded(xp);
          updateStreak();
        }
      }
    } catch {
      setFeedback({
        score: 0,
        feedback: 'Network error. Check your connection and try again.',
        corrections: [],
        isCorrect: false,
      });
    } finally {
      setIsChecking(false);
    }
  }, [mode, formPrompt, formAnswers, messagePrompt, messageText, freePrompt, freeText, addXP, updateStreak]);

  // ---------------------------------------------------------------------------
  // Score color helper
  // ---------------------------------------------------------------------------

  const scoreColor = (score: number) => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#d4a520';
    if (score >= 40) return '#e67e22';
    return '#c0392b';
  };

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[#d4a520] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Mode selection screen
  // ---------------------------------------------------------------------------

  if (!mode) {
    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <button
            onClick={() => router.push('/practice')}
            className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl font-bold mb-1">
            <span className="gradient-text">Schreiben</span>
          </h1>
          <p className="text-[var(--foreground)]/40 text-sm mb-6">
            Practice writing German for the Goethe A1 exam
          </p>
        </motion.div>

        {/* Nivin guidance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2.5 game-card px-3 py-2 mb-3"
        >
          <Nivin mood="pointing" size="sm" entrance={false} />
          <p className="text-xs text-[var(--foreground)]/60 leading-snug">Writing in German is the best practice. Don&apos;t worry about perfection! ✍️</p>
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="game-card p-4 mb-6"
        >
          <h3 className="font-bold text-sm mb-2">Goethe A1 Schreiben</h3>
          <div className="space-y-2 text-xs text-[var(--foreground)]/50">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#d4a520] flex-shrink-0" />
              <span><strong>Teil 1</strong> — Fill out a form with personal information</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#8b5cf6] flex-shrink-0" />
              <span><strong>Teil 2</strong> — Write a short message (~30 words) with 3 content points</span>
            </div>
            <div className="flex items-center gap-2">
              <PenLine className="w-4 h-4 text-[#27ae60] flex-shrink-0" />
              <span><strong>Free Write</strong> — Open-ended topics graded by AI</span>
            </div>
          </div>
        </motion.div>

        {/* Mode cards */}
        <div className="space-y-3">
          {([
            {
              id: 'form' as WritingMode,
              name: 'Form Filling',
              description: 'Fill out German forms with your personal information. Exam Teil 1 practice.',
              icon: '📋',
              color: '#d4a520',
              badge: 'Teil 1',
              detail: 'Registration forms, applications',
            },
            {
              id: 'message' as WritingMode,
              name: 'Message Writing',
              description: 'Write a short German message with 3 content points. Core exam skill.',
              icon: '✉️',
              color: '#8b5cf6',
              badge: 'Teil 2',
              detail: '20 prompts · AI graded · ~30 words',
            },
            {
              id: 'free' as WritingMode,
              name: 'Free Writing',
              description: 'Write freely on a topic. Build confidence and expand vocabulary.',
              icon: '✏️',
              color: '#27ae60',
              badge: 'BONUS',
              detail: 'Open topics · AI feedback',
            },
          ]).map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => selectMode(m.id)}
                className="game-card p-4 cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${m.color}15`, border: `2px solid ${m.color}30` }}
                  >
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-sm">{m.name}</h3>
                      <span
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `${m.color}20`, color: m.color }}
                      >
                        {m.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--foreground)]/40 leading-relaxed mb-1">{m.description}</p>
                    <p className="text-[10px] text-[var(--foreground)]/25">{m.detail}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--foreground)]/20 flex-shrink-0" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-[var(--foreground)]/20 text-xs"
        >
          Your writing is checked by AI for grammar, vocabulary, and content
        </motion.div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Feedback card (shared by all modes)
  // ---------------------------------------------------------------------------

  const renderFeedback = (modelAnswer: string) => (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-4"
        >
          {/* Score card */}
          <div className="game-card p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {feedback.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-[#27ae60]" />
                ) : (
                  <XCircle className="w-5 h-5 text-[#c0392b]" />
                )}
                <span className="font-bold text-sm">
                  {feedback.isCorrect ? 'Good job!' : 'Keep practicing!'}
                </span>
              </div>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold"
                style={{ color: scoreColor(feedback.score) }}
              >
                {feedback.score}%
              </motion.span>
            </div>

            {/* Score bar */}
            <div className="w-full h-2.5 bg-[var(--foreground)]/10 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feedback.score}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: scoreColor(feedback.score) }}
              />
            </div>

            {/* Feedback text */}
            <p className="text-sm text-[var(--foreground)]/70 mb-3">{feedback.feedback}</p>

            {/* Corrections */}
            {feedback.corrections.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-[var(--foreground)]/40 uppercase tracking-wide">
                  Corrections
                </p>
                {feedback.corrections.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-[var(--foreground)]/60 bg-[var(--foreground)]/5 rounded-lg p-2"
                  >
                    <span className="text-[#d4a520] font-bold mt-0.5">{i + 1}.</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            )}

            {/* XP earned */}
            {xpAwarded > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-1 mt-3 text-[#d4a520] font-bold text-sm"
              >
                <Zap className="w-4 h-4" />
                +{xpAwarded} XP
              </motion.div>
            )}
          </div>

          {/* Model answer toggle */}
          <button
            onClick={() => setShowModel(!showModel)}
            className="w-full text-left game-card p-3 cursor-pointer hover:bg-[var(--foreground)]/5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4a520]" />
                <span className="text-sm font-bold">Model Answer</span>
              </div>
              <motion.span
                animate={{ rotate: showModel ? 90 : 0 }}
                className="text-[var(--foreground)]/30"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.span>
            </div>
            <AnimatePresence>
              {showModel && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <pre className="mt-3 text-xs text-[var(--foreground)]/60 whitespace-pre-wrap font-sans leading-relaxed border-t border-[var(--foreground)]/10 pt-3">
                    {modelAnswer}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ---------------------------------------------------------------------------
  // FORM MODE
  // ---------------------------------------------------------------------------

  if (mode === 'form' && formPrompt) {
    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setMode(null)}
              className="flex items-center gap-2 text-[var(--foreground)]/50 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-[8px] font-bold px-2 py-1 rounded-full bg-[#d4a520]/20 text-[#d4a520]">
              TEIL 1
            </span>
          </div>
          <h1 className="text-xl font-bold mb-1">
            <span className="gradient-text">{formPrompt.title}</span>
          </h1>
          <p className="text-[var(--foreground)]/40 text-sm mb-5">{formPrompt.description}</p>
        </motion.div>

        {/* Form fields */}
        <div className="space-y-3">
          {formPrompt.fields.map((field, i) => (
            <motion.div
              key={field.expectedKey}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="game-card p-3"
            >
              <label className="block text-sm font-bold text-[#d4a520] mb-0.5">
                {field.label}
              </label>
              <p className="text-[10px] text-[var(--foreground)]/30 mb-2">{field.hint}</p>
              <input
                type="text"
                value={formAnswers[field.expectedKey] || ''}
                onChange={(e) =>
                  setFormAnswers(prev => ({ ...prev, [field.expectedKey]: e.target.value }))
                }
                placeholder={`Enter ${field.hint.toLowerCase()}`}
                className="w-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/20 focus:outline-none focus:border-[#d4a520]/50 transition-colors"
                disabled={!!feedback}
              />
            </motion.div>
          ))}
        </div>

        {/* Check button */}
        {!feedback && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkWriting}
            disabled={isChecking || Object.keys(formAnswers).length === 0}
            className="w-full mt-5 game-button text-center disabled:opacity-50"
          >
            {isChecking ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Checking...
              </span>
            ) : (
              'Check My Answers'
            )}
          </motion.button>
        )}

        {/* Feedback */}
        {renderFeedback(
          Object.entries(formPrompt.modelAnswers)
            .map(([k, v]) => {
              const field = formPrompt.fields.find(f => f.expectedKey === k);
              return `${field?.label || k}: ${v}`;
            })
            .join('\n')
        )}

        {/* Next button */}
        {feedback && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={pickFormPrompt}
            className="w-full mt-4 game-button-secondary game-button text-center"
          >
            <span className="flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" /> Next Form
            </span>
          </motion.button>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // MESSAGE MODE
  // ---------------------------------------------------------------------------

  if (mode === 'message' && messagePrompt) {
    const wordCount = countWords(messageText);
    const charCount = messageText.length;
    const charTarget = 180; // ~30 words * ~6 chars
    const charColor = charCountColor(charCount, charTarget);

    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        <Confetti isActive={showConfetti} />
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setMode(null)}
              className="flex items-center gap-2 text-[var(--foreground)]/50 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-[8px] font-bold px-2 py-1 rounded-full bg-[#8b5cf6]/20 text-[#8b5cf6]">
              TEIL 2
            </span>
          </div>
        </motion.div>

        {/* Situation — styled as an incoming message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-end gap-2 mb-1">
            <Nivin mood="pointing" size="sm" entrance={false} />
            <div className="flex-1 max-w-[85%] rounded-2xl rounded-bl-md bg-gradient-to-br from-[#d4a520]/25 to-[#d4a520]/10 border border-[#d4a520]/35 px-4 py-3 shadow-[0_2px_10px_rgba(212,165,32,0.15)]">
              <p className="text-[10px] font-bold text-[#d4a520] uppercase tracking-wide mb-1">
                Incoming message
              </p>
              <p className="text-sm text-[var(--foreground)]/85 leading-relaxed">
                {messagePrompt.situation}
              </p>
              <p className="text-[11px] text-[var(--foreground)]/50 italic mt-2">
                Write your reply in German.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Inhaltspunkte */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="game-card p-4 mb-4"
        >
          <h2 className="font-bold text-sm mb-2 text-[#8b5cf6]">
            Inhaltspunkte (Content Points)
          </h2>
          <div className="space-y-2">
            {messagePrompt.inhaltspunkte.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-[var(--foreground)]/60"
              >
                <span className="w-5 h-5 rounded-full bg-[#8b5cf6]/20 text-[#8b5cf6] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Writing area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="game-card p-4 mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-sm">Your Message</h2>
            <span
              className={`text-xs font-bold ${
                wordCount >= 25 && wordCount <= 40
                  ? 'text-[#27ae60]'
                  : wordCount > 40
                  ? 'text-[#c0392b]'
                  : 'text-[var(--foreground)]/30'
              }`}
            >
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
              <span className="text-[var(--foreground)]/20 font-normal"> (aim for ~30)</span>
            </span>
          </div>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Liebe/r ...,&#10;&#10;... (write your message here)&#10;&#10;Viele Grüße&#10;..."
            rows={8}
            className="w-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl px-3 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/15 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors resize-none leading-relaxed"
            disabled={!!feedback}
          />

          {/* Writing tips */}
          {!feedback && wordCount === 0 && (
            <div className="mt-2 text-[10px] text-[var(--foreground)]/25 space-y-0.5">
              <p>Tip: Start with a greeting (Liebe/r ... or Sehr geehrte ...)</p>
              <p>Tip: End with a closing (Viele Grüße / Mit freundlichen Grüßen)</p>
            </div>
          )}
        </motion.div>

        {/* Check button */}
        {!feedback && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkWriting}
            disabled={isChecking || wordCount < 5}
            className="w-full game-button text-center disabled:opacity-50"
          >
            {isChecking ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Checking with AI...
              </span>
            ) : (
              'Check My Writing'
            )}
          </motion.button>
        )}

        {/* Feedback */}
        {renderFeedback(messagePrompt.modelAnswer)}

        {/* Next button */}
        {feedback && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={pickMessagePrompt}
            className="w-full mt-4 game-button-secondary game-button text-center"
          >
            <span className="flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" /> Next Prompt
            </span>
          </motion.button>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // FREE MODE
  // ---------------------------------------------------------------------------

  if (mode === 'free' && freePrompt) {
    const wordCount = countWords(freeText);

    return (
      <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setMode(null)}
              className="flex items-center gap-2 text-[var(--foreground)]/50 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-[8px] font-bold px-2 py-1 rounded-full bg-[#27ae60]/20 text-[#27ae60]">
              FREE WRITE
            </span>
          </div>
        </motion.div>

        {/* Topic */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-card p-4 mb-4"
        >
          <h2 className="font-bold text-base mb-1 text-[#d4a520]">{freePrompt.topic}</h2>
          <p className="text-xs text-[var(--foreground)]/40">{freePrompt.hint}</p>
        </motion.div>

        {/* Writing area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="game-card p-4 mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-sm">Write in German</h2>
            <span className={`text-xs font-bold ${wordCount >= 20 ? 'text-[#27ae60]' : 'text-[var(--foreground)]/30'}`}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
          </div>
          <textarea
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            placeholder="Write at least 3-5 sentences in German..."
            rows={8}
            className="w-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl px-3 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/15 focus:outline-none focus:border-[#27ae60]/50 transition-colors resize-none leading-relaxed"
            disabled={!!feedback}
          />
        </motion.div>

        {/* Check button */}
        {!feedback && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkWriting}
            disabled={isChecking || wordCount < 5}
            className="w-full game-button text-center disabled:opacity-50"
          >
            {isChecking ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Checking with AI...
              </span>
            ) : (
              'Check My Writing'
            )}
          </motion.button>
        )}

        {/* Feedback */}
        {renderFeedback(freePrompt.modelAnswer)}

        {/* Next button */}
        {feedback && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={pickFreePrompt}
            className="w-full mt-4 game-button-secondary game-button text-center"
          >
            <span className="flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" /> Next Topic
            </span>
          </motion.button>
        )}
      </div>
    );
  }

  // Fallback
  return null;
}
