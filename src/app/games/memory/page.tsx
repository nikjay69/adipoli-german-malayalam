'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, RefreshCw, Ear } from 'lucide-react';
import { Button } from '@/components/ui';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character/Kuttan';
import { Confetti, XPGain } from '@/components/game';
import { useGameStore } from '@/lib/store';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EavesdropScenario {
  id: string;
  location: string;
  germanText: string;
  question: string;
  answer: string;
  distractors: [string, string, string];
  explanation: string;
  difficulty: 1 | 2 | 3;
}

// ---------------------------------------------------------------------------
// Content: 24 eavesdrop scenarios across 3 difficulty tiers
// ---------------------------------------------------------------------------

const SCENARIOS: EavesdropScenario[] = [
  // ===== DIFFICULTY 1 (easy — short, common situations) =====
  {
    id: 'cafe-order-1',
    location: '\u2615 Caf\u00e9',
    germanText: 'Einmal Cappuccino und ein St\u00fcck Kuchen, bitte.',
    question: 'What is this person doing?',
    answer: 'Ordering a coffee and a piece of cake',
    distractors: [
      'Complaining that the coffee is cold',
      'Asking for the Wi-Fi password',
      'Requesting the bill',
    ],
    explanation:
      '"Einmal" = one (when ordering) | "St\u00fcck Kuchen" = piece of cake | "bitte" = please. In German caf\u00e9s you order at the table, not the counter.',
    difficulty: 1,
  },
  {
    id: 'bakery-1',
    location: '\ud83c\udf5e B\u00e4ckerei',
    germanText: 'Zwei Br\u00f6tchen und ein Vollkornbrot, bitte.',
    question: 'What is being bought?',
    answer: 'Two bread rolls and a wholegrain loaf',
    distractors: [
      'Two croissants and a pretzel',
      'A birthday cake for two people',
      'Two slices of pizza and a drink',
    ],
    explanation:
      '"Br\u00f6tchen" = bread rolls (a breakfast staple!) | "Vollkornbrot" = wholegrain bread. Germans take their bread VERY seriously \u2014 there are 3,000+ varieties.',
    difficulty: 1,
  },
  {
    id: 'greet-1',
    location: '\ud83c\udfe2 B\u00fcro (Office)',
    germanText: 'Guten Morgen! Wie geht es Ihnen?',
    question: 'What is happening?',
    answer: 'Someone is greeting a colleague formally',
    distractors: [
      'Someone is saying goodbye for the day',
      'A boss is firing an employee',
      'Someone is apologizing for being late',
    ],
    explanation:
      '"Guten Morgen" = Good morning | "Wie geht es Ihnen?" = How are you? (formal). "Ihnen" (capital I) = formal "you". Germans use "Sie" with colleagues until invited to use "du".',
    difficulty: 1,
  },
  {
    id: 'supermarket-1',
    location: '\ud83d\uded2 Supermarkt',
    germanText: 'Entschuldigung, wo finde ich die Milch?',
    question: 'What does this person need?',
    answer: 'They are looking for milk',
    distractors: [
      'They want to return expired yogurt',
      'They are asking about store closing time',
      'They need help carrying bags',
    ],
    explanation:
      '"Entschuldigung" = Excuse me | "wo finde ich" = where do I find | "die Milch" = the milk. Fun fact: Germans often store milk unrefrigerated (H-Milch / UHT milk).',
    difficulty: 1,
  },
  {
    id: 'intro-1',
    location: '\ud83c\udf93 Sprachkurs (Language class)',
    germanText: 'Ich hei\u00dfe Priya und ich komme aus Indien.',
    question: 'What is Priya doing?',
    answer: 'Introducing herself and saying where she is from',
    distractors: [
      'Booking a flight to India',
      'Telling someone she misses India',
      'Asking for directions to the Indian restaurant',
    ],
    explanation:
      '"Ich hei\u00dfe" = My name is | "ich komme aus" = I come from. This is THE standard self-introduction in every German class (Integrationskurs).',
    difficulty: 1,
  },
  {
    id: 'pharmacy-1',
    location: '\ud83d\udc8a Apotheke (Pharmacy)',
    germanText: 'Haben Sie etwas gegen Kopfschmerzen?',
    question: 'What does this person want?',
    answer: 'Something for a headache',
    distractors: [
      'A prescription for antibiotics',
      'Directions to the nearest hospital',
      'Vitamins for their children',
    ],
    explanation:
      '"Haben Sie" = Do you have | "etwas gegen" = something for/against | "Kopfschmerzen" = headache (Kopf=head + Schmerzen=pain). German loves compound words!',
    difficulty: 1,
  },
  {
    id: 'number-1',
    location: '\ud83d\udcde Telefon',
    germanText: 'Meine Telefonnummer ist null eins sieben sechs, drei zwei vier f\u00fcnf acht neun eins.',
    question: 'What information is being shared?',
    answer: 'A phone number',
    distractors: [
      'A bank account number',
      'A postal code and address',
      'An appointment date and time',
    ],
    explanation:
      '"Telefonnummer" = phone number | Germans say each digit individually. "null" = 0, "eins" = 1, "sieben" = 7, "sechs" = 6. German phone numbers start with 0 for domestic calls.',
    difficulty: 1,
  },
  {
    id: 'weather-1',
    location: '\ud83c\udf27\ufe0f Stra\u00dfe (Street)',
    germanText: 'Es regnet schon wieder! Hast du einen Regenschirm?',
    question: 'What is the situation?',
    answer: 'It is raining and someone is asking about an umbrella',
    distractors: [
      'Someone is complaining about the heat',
      'They are planning a picnic for tomorrow',
      'Someone lost their umbrella on the bus',
    ],
    explanation:
      '"Es regnet" = It\'s raining | "schon wieder" = yet again | "Regenschirm" = umbrella (Regen=rain + Schirm=shield). German weather = complaining about rain. Very relatable.',
    difficulty: 1,
  },

  // ===== DIFFICULTY 2 (medium — longer sentences, real-life situations) =====
  {
    id: 'train-1',
    location: '\ud83d\ude82 Hauptbahnhof',
    germanText: 'Achtung! Der ICE nach M\u00fcnchen hat 15 Minuten Versp\u00e4tung. Wir bitten um Entschuldigung.',
    question: 'What is being announced?',
    answer: 'A train to Munich is delayed by 15 minutes',
    distractors: [
      'The train to Munich has been cancelled',
      'Platform 15 is closed for repairs',
      'A special express train to Munich is departing now',
    ],
    explanation:
      '"ICE" = Inter-City Express (Germany\'s high-speed train) | "Versp\u00e4tung" = delay | "Wir bitten um Entschuldigung" = We apologize. Deutsche Bahn delays are basically a national meme.',
    difficulty: 2,
  },
  {
    id: 'doctor-1',
    location: '\ud83c\udfe5 Arztpraxis (Doctor\'s office)',
    germanText: 'Nehmen Sie die Tabletten dreimal t\u00e4glich nach dem Essen. Kommen Sie in zwei Wochen wieder.',
    question: 'What instructions is the doctor giving?',
    answer: 'Take tablets three times daily after meals, return in two weeks',
    distractors: [
      'Take two tablets before sleeping for three weeks',
      'Stop eating for three days and come back tomorrow',
      'Take the medicine once a day and call if symptoms worsen',
    ],
    explanation:
      '"Tabletten" = tablets | "dreimal t\u00e4glich" = three times daily | "nach dem Essen" = after eating | "in zwei Wochen" = in two weeks. Always bring your Versichertenkarte (insurance card) to the doctor!',
    difficulty: 2,
  },
  {
    id: 'wg-1',
    location: '\ud83c\udfe0 WG (Shared flat)',
    germanText: 'Wer hat meine Milch aus dem K\u00fchlschrank genommen? Ich habe meinen Namen draufgeschrieben!',
    question: 'What is this person upset about?',
    answer: 'Someone took their labelled milk from the fridge',
    distractors: [
      'The fridge is broken and all the food went bad',
      'Nobody cleaned the kitchen this week',
      'Their name was removed from the doorbell',
    ],
    explanation:
      '"Wer hat ... genommen?" = Who took...? | "K\u00fchlschrank" = fridge (K\u00fchl=cool + Schrank=cupboard) | "draufgeschrieben" = written on it. WG (Wohngemeinschaft) drama is universal \u2014 label your food!',
    difficulty: 2,
  },
  {
    id: 'rent-1',
    location: '\ud83d\udce7 E-Mail',
    germanText: 'Sehr geehrte Frau M\u00fcller, hiermit k\u00fcndige ich meinen Mietvertrag zum 31. M\u00e4rz. Mit freundlichen Gr\u00fc\u00dfen.',
    question: 'What is this email about?',
    answer: 'Terminating a rental contract effective March 31',
    distractors: [
      'Requesting a rent reduction from the landlord',
      'Complaining about noisy neighbors',
      'Asking to extend the lease for another year',
    ],
    explanation:
      '"k\u00fcndige ... Mietvertrag" = terminate rental contract | "zum 31. M\u00e4rz" = effective March 31 | "Sehr geehrte" = Dear (very formal). In Germany, most rentals need 3 months\' written notice (K\u00fcndigungsfrist).',
    difficulty: 2,
  },
  {
    id: 'restaurant-1',
    location: '\ud83c\udf7d\ufe0f Restaurant',
    germanText: 'Die Rechnung, bitte. K\u00f6nnen wir getrennt bezahlen?',
    question: 'What is being requested?',
    answer: 'The bill, and they want to pay separately',
    distractors: [
      'A table for two near the window',
      'A discount because the food was cold',
      'The menu in English, please',
    ],
    explanation:
      '"Die Rechnung" = the bill | "getrennt bezahlen" = pay separately. Germans almost ALWAYS split bills individually \u2014 don\'t be surprised when the waiter asks each person!',
    difficulty: 2,
  },
  {
    id: 'transport-1',
    location: '\ud83d\ude8c Bus',
    germanText: 'Entschuldigung, f\u00e4hrt dieser Bus zum Marienplatz? Muss ich umsteigen?',
    question: 'What does this passenger need to know?',
    answer: 'Whether this bus goes to Marienplatz and if they need to transfer',
    distractors: [
      'How much a ticket to Marienplatz costs',
      'What time the last bus to Marienplatz leaves',
      'Where to buy a monthly bus pass',
    ],
    explanation:
      '"F\u00e4hrt dieser Bus zum...?" = Does this bus go to...? | "umsteigen" = to transfer/change (buses/trains). Always validate your ticket \u2014 Schwarzfahren (riding without a ticket) gets you a \u20ac60 fine!',
    difficulty: 2,
  },
  {
    id: 'appointment-1',
    location: '\ud83d\udcde Telefonat (Phone call)',
    germanText: 'Ich m\u00f6chte einen Termin beim Augenarzt. Haben Sie n\u00e4chste Woche noch etwas frei?',
    question: 'What is this person trying to do?',
    answer: 'Book an appointment with an eye doctor for next week',
    distractors: [
      'Cancel an existing dentist appointment',
      'Ask about the doctor\'s vacation schedule',
      'Get an emergency referral to a specialist',
    ],
    explanation:
      '"Termin" = appointment | "Augenarzt" = eye doctor (Auge=eye + Arzt=doctor) | "n\u00e4chste Woche" = next week | "frei" = available. Getting a Facharzt (specialist) appointment in Germany can take weeks \u2014 call early!',
    difficulty: 2,
  },
  {
    id: 'postoffice-1',
    location: '\ud83d\udce6 Post',
    germanText: 'Ich m\u00f6chte dieses Paket nach Indien schicken. Was kostet das per Luftpost?',
    question: 'What is this person asking?',
    answer: 'The cost of sending a parcel to India by airmail',
    distractors: [
      'How long a letter to India takes by sea',
      'Whether they can track a package from India',
      'If the post office sells boxes and tape',
    ],
    explanation:
      '"Paket" = parcel | "schicken" = to send | "Was kostet das" = How much does it cost | "Luftpost" = airmail. Sending packages home to India from Germany? DHL is your best friend.',
    difficulty: 2,
  },

  // ===== DIFFICULTY 3 (complex — cultural context, longer text, subtle meaning) =====
  {
    id: 'anmeldung-1',
    location: '\ud83c\udfe2 B\u00fcrgeramt',
    germanText: 'F\u00fcr die Anmeldung brauchen Sie Ihren Reisepass, den Mietvertrag und das ausgef\u00fcllte Formular. Bitte nehmen Sie eine Nummer und warten Sie.',
    question: 'What official process is happening?',
    answer: 'Registering a new address \u2014 they need passport, rental contract, and a form',
    distractors: [
      'Applying for German citizenship with documents',
      'Reporting a stolen passport at the police station',
      'Registering a new business at the city office',
    ],
    explanation:
      '"Anmeldung" = address registration (MANDATORY within 2 weeks of moving!) | "Reisepass" = passport | "Mietvertrag" = rental contract | "ausgef\u00fclltes Formular" = filled-out form. This is THE first bureaucratic hurdle every newcomer faces in Germany.',
    difficulty: 3,
  },
  {
    id: 'landlord-1',
    location: '\ud83d\udce7 E-Mail vom Vermieter',
    germanText: 'Sehr geehrte Mieter, aufgrund gestiegener Betriebskosten erh\u00f6ht sich Ihre monatliche Nebenkostenvorauszahlung ab dem 1. April um 45 Euro.',
    question: 'What is the landlord informing tenants about?',
    answer: 'A \u20ac45 monthly increase in utility cost prepayments starting April',
    distractors: [
      'The building will be renovated and rent will increase by 45%',
      'Tenants must pay a one-time \u20ac45 fee for new mailboxes',
      'Hot water will be turned off for 45 days for maintenance',
    ],
    explanation:
      '"Betriebskosten" = operating costs | "Nebenkostenvorauszahlung" = utility prepayment (a classic German compound word!) | "erh\u00f6ht sich" = increases. Nebenkosten (utilities) are paid monthly on top of Kaltmiete (base rent).',
    difficulty: 3,
  },
  {
    id: 'notice-1',
    location: '\ud83d\udecf Hausflur (Building hallway)',
    germanText: 'Liebe Hausbewohner, bitte achten Sie auf die Ruhezeiten: 22:00\u201306:00 Uhr und 13:00\u201315:00 Uhr. Danke f\u00fcr Ihr Verst\u00e4ndnis.',
    question: 'What rule is being communicated?',
    answer: 'Quiet hours must be observed: 10 PM\u20136 AM and 1\u20133 PM',
    distractors: [
      'The building entrance will be locked from 10 PM to 6 AM',
      'Electricity will be shut off during maintenance hours',
      'Garbage collection times have changed to twice daily',
    ],
    explanation:
      '"Ruhezeiten" = quiet hours | "achten Sie auf" = please observe. Germany has legally mandated quiet hours \u2014 no loud music, no drilling, no laundry machine noise during these times. Yes, even on Sundays!',
    difficulty: 3,
  },
  {
    id: 'insurance-1',
    location: '\ud83d\udcdd Krankenkasse (Health insurance)',
    germanText: 'Ihre elektronische Gesundheitskarte ist abgelaufen. Bitte beantragen Sie eine neue Karte \u00fcber unser Online-Portal oder rufen Sie uns an.',
    question: 'What is this notice about?',
    answer: 'Their health insurance card has expired and they need a new one',
    distractors: [
      'Their insurance premium is going up next month',
      'They need to choose a new primary care doctor',
      'Their insurance claim was rejected',
    ],
    explanation:
      '"Gesundheitskarte" = health insurance card | "abgelaufen" = expired | "beantragen" = to apply for. Without a valid Gesundheitskarte, you can\'t see a doctor (except emergencies). Keep it updated!',
    difficulty: 3,
  },
  {
    id: 'job-1',
    location: '\ud83d\udcbc Stellenanzeige (Job posting)',
    germanText: 'Wir suchen ab sofort eine/n Werkstudent/in (m/w/d) f\u00fcr unser Marketing-Team. Gute Deutschkenntnisse (mindestens B2) erforderlich.',
    question: 'What is being advertised?',
    answer: 'A part-time student job in marketing requiring B2 German',
    distractors: [
      'A full-time marketing manager position',
      'A German language course for marketing students',
      'An internship that does not require German skills',
    ],
    explanation:
      '"Werkstudent/in" = working student (part-time job alongside studies, up to 20hrs/week) | "m/w/d" = male/female/diverse | "Deutschkenntnisse B2" = German skills level B2. Werkstudent jobs are great for income + experience while studying!',
    difficulty: 3,
  },
  {
    id: 'train-cancel-1',
    location: '\ud83d\ude82 Deutsche Bahn App',
    germanText: 'Ihr Zug RE 4523 wurde ersatzlos gestrichen. Bitte nutzen Sie die S-Bahn Linie S3 als Alternative. Ihre Fahrgastrechte bleiben bestehen.',
    question: 'What happened to the journey?',
    answer: 'The train was cancelled with no replacement, but they can use the S3 line instead',
    distractors: [
      'The train is running 45 minutes late on a different platform',
      'The ticket price was refunded automatically',
      'The train route has been permanently discontinued',
    ],
    explanation:
      '"ersatzlos gestrichen" = cancelled without replacement | "S-Bahn" = suburban rail | "Fahrgastrechte" = passenger rights. If your DB train is 60+ min late, you can claim 25% of the ticket price back. Keep your tickets!',
    difficulty: 3,
  },
  {
    id: 'pfand-1',
    location: '\ud83c\udfea Supermarkt',
    germanText: 'Der Pfandautomat ist leider au\u00dfer Betrieb. Bitte geben Sie Ihre Leergutflaschen an der Kasse ab.',
    question: 'What is the sign saying?',
    answer: 'The bottle return machine is broken \u2014 return empties at the checkout',
    distractors: [
      'The self-checkout machines are closed today',
      'Plastic bags are no longer available at checkout',
      'Glass bottles are now banned from the store',
    ],
    explanation:
      '"Pfandautomat" = bottle deposit machine | "au\u00dfer Betrieb" = out of order | "Leergut" = empties (empty bottles/cans). Germany has a Pfand (deposit) system: 0.25\u20ac per plastic bottle, 0.08\u20ac per glass. Always return them!',
    difficulty: 3,
  },
];

// ---------------------------------------------------------------------------
// Kuttan reactions (Manglish)
// ---------------------------------------------------------------------------

const CORRECT_REACTIONS = [
  'Adipoli machaa! Nailed it!',
  'Sherikkum correct aanu! You got it!',
  'Ohh, sharp aanu nee! Well done!',
  'Kollaam! That was spot on!',
  'Myraa! Big brain energy!',
  'Wunderbar! Athu thanne!',
  'Class machaa! Keep going!',
  'Richtig! You\'re getting this!',
];

const WRONG_REACTIONS = [
  'Aiyyo! Close, but not quite...',
  'Paravaala machaa! Read it again...',
  'Almost! Athinu oru logic und though...',
  'Not this time... but you\'ll get the next one!',
  'Hmm, tricky one alle? Look at the explanation!',
  'Saaramilla! Mistakes = learning!',
];

const FINAL_REACTIONS: Record<string, { message: string; mood: KuttanMood }> = {
  perfect: { message: 'FULL MARKS! Nee oru German spy aano machaa?! Adipoli da!', mood: 'celebrating' },
  great: { message: 'Myraa! Almost perfect! Germany\'s waiting for you!', mood: 'excited' },
  good: { message: 'Kollaam machaa! Solid effort! Keep eavesdropping!', mood: 'happy' },
  ok: { message: 'Not bad! Practice cheythaal you\'ll crack it!', mood: 'thinking' },
  low: { message: 'Paravaala! Every round you learned something new. Try again?', mood: 'sad' },
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/** Pick 10 scenarios with progressive difficulty */
function pickRoundScenarios(): EavesdropScenario[] {
  const easy = shuffleArray(SCENARIOS.filter((s) => s.difficulty === 1));
  const medium = shuffleArray(SCENARIOS.filter((s) => s.difficulty === 2));
  const hard = shuffleArray(SCENARIOS.filter((s) => s.difficulty === 3));

  // 3 easy, 4 medium, 3 hard
  const selected = [...easy.slice(0, 3), ...medium.slice(0, 4), ...hard.slice(0, 3)];
  return selected;
}

function getFinalReaction(score: number, total: number) {
  const pct = score / total;
  if (pct === 1) return FINAL_REACTIONS.perfect;
  if (pct >= 0.8) return FINAL_REACTIONS.great;
  if (pct >= 0.6) return FINAL_REACTIONS.good;
  if (pct >= 0.4) return FINAL_REACTIONS.ok;
  return FINAL_REACTIONS.low;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function EavesdropGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed } = useGameStore();

  // Game state
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'reveal' | 'complete'>('intro');
  const [scenarios, setScenarios] = useState<EavesdropScenario[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Shuffled options for the current round (to avoid answer always in same slot)
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Celebration state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXPGain, setShowXPGain] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  // Kuttan
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('thinking');
  const [kuttanMessage, setKuttanMessage] = useState('');

  const TOTAL_ROUNDS = 10;

  // Current scenario
  const scenario = scenarios[currentRound] || null;

  // ---------------------------------------------------------------------------
  // Start / Reset
  // ---------------------------------------------------------------------------

  const startGame = useCallback(() => {
    const picked = pickRoundScenarios();
    setScenarios(picked);
    setCurrentRound(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowConfetti(false);
    setShowXPGain(false);
    setKuttanMood('thinking');
    setKuttanMessage('');
    setGameState('playing');

    // Shuffle options for first round
    const first = picked[0];
    if (first) {
      setShuffledOptions(shuffleArray([first.answer, ...first.distractors]));
    }
  }, []);

  // ---------------------------------------------------------------------------
  // Answer handling
  // ---------------------------------------------------------------------------

  const handleAnswer = useCallback(
    (answer: string) => {
      if (!scenario || selectedAnswer !== null) return;

      const correct = answer === scenario.answer;
      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setGameState('reveal');

      if (correct) {
        setScore((prev) => prev + 1);
        setKuttanMood('happy');
        setKuttanMessage(pickRandom(CORRECT_REACTIONS));
      } else {
        setKuttanMood('sad');
        setKuttanMessage(pickRandom(WRONG_REACTIONS));
      }
    },
    [scenario, selectedAnswer],
  );

  // ---------------------------------------------------------------------------
  // Next round / Finish
  // ---------------------------------------------------------------------------

  const handleNext = useCallback(() => {
    const nextRound = currentRound + 1;

    if (nextRound >= TOTAL_ROUNDS) {
      // Game complete
      const finalScore = score; // score already updated from handleAnswer
      incrementGamesPlayed();
      const baseXP = 20;
      const bonusXP = finalScore * 5; // up to 50 bonus
      const xp = baseXP + bonusXP;
      setEarnedXP(xp);
      addXP(xp);
      setShowConfetti(true);
      setShowXPGain(true);

      const reaction = getFinalReaction(finalScore, TOTAL_ROUNDS);
      setKuttanMood(reaction.mood);
      setKuttanMessage(reaction.message);
      setGameState('complete');
    } else {
      // Next round
      setCurrentRound(nextRound);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setKuttanMood('thinking');
      setKuttanMessage('');
      setGameState('playing');

      const next = scenarios[nextRound];
      if (next) {
        setShuffledOptions(shuffleArray([next.answer, ...next.distractors]));
      }
    }
  }, [currentRound, score, scenarios, addXP, incrementGamesPlayed, TOTAL_ROUNDS]);

  // ---------------------------------------------------------------------------
  // Star rating
  // ---------------------------------------------------------------------------

  const starRating = useMemo(() => {
    if (score >= 9) return { stars: 3, label: 'Gold', color: '#ffd93d' };
    if (score >= 7) return { stars: 2, label: 'Silver', color: '#c0c0c0' };
    if (score >= 5) return { stars: 1, label: 'Bronze', color: '#cd7f32' };
    return { stars: 0, label: 'Keep practicing!', color: '#e94560' };
  }, [score]);

  // ---------------------------------------------------------------------------
  // Difficulty badge color
  // ---------------------------------------------------------------------------

  const difficultyMeta = useMemo(() => {
    if (!scenario) return { label: '', color: '' };
    if (scenario.difficulty === 1) return { label: 'Easy', color: '#00d9a5' };
    if (scenario.difficulty === 2) return { label: 'Medium', color: '#ffd93d' };
    return { label: 'Hard', color: '#e94560' };
  }, [scenario]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto relative overflow-hidden">
      {/* Confetti + XP */}
      <Confetti isActive={showConfetti} />
      <XPGain amount={earnedXP} isVisible={showXPGain} onComplete={() => setShowXPGain(false)} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {(gameState === 'playing' || gameState === 'reveal') && (
          <div className="flex items-center gap-3">
            <div className="glass-card px-3 py-1.5 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#ffd93d]" />
              <span className="font-bold text-sm text-[var(--foreground)]">
                {score}/{currentRound + (gameState === 'reveal' ? 1 : 0)}
              </span>
            </div>
            <div className="glass-card px-3 py-1.5 text-sm font-medium text-[var(--foreground)]/70">
              {currentRound + 1} / {TOTAL_ROUNDS}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ===== INTRO ===== */}
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <CharacterGuide
                messages="Psst machaa... we're going undercover in Germany! Listen carefully to what people say and figure out what's going on!"
                mood="excited"
                size="md"
                showAppu={false}
                autoAdvanceMs={5000}
              />
            </div>

            <div className="glass-card p-6 w-full text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Ear className="w-7 h-7 text-[#ff6b9d]" />
                <h1 className="text-2xl font-bold text-[var(--foreground)]">Eavesdrop</h1>
              </div>
              <p className="text-[var(--foreground)]/60 mb-6 text-sm leading-relaxed">
                You&apos;re a fly on the wall in Germany. You&apos;ll overhear conversations, read signs, and see
                notices. Figure out what&apos;s happening from the German text.
              </p>

              <div className="flex items-center justify-center gap-4 mb-4 text-sm text-[var(--foreground)]/50">
                <span className="flex items-center gap-1.5 glass-card px-3 py-1.5">
                  <span className="font-bold text-[#ff6b9d]">10</span> rounds
                </span>
                <span className="flex items-center gap-1.5 glass-card px-3 py-1.5">
                  <Star className="w-4 h-4 text-[#ffd93d]" /> Up to 70 XP
                </span>
              </div>

              <div className="glass-card p-3 mb-6 text-xs text-[var(--foreground)]/50 text-left space-y-1">
                <p className="font-semibold text-[var(--foreground)]/70 text-center mb-2">How it works</p>
                <p><span className="text-[#00d9a5] font-bold">1.</span> Read the German text you &quot;overhear&quot;</p>
                <p><span className="text-[#ffd93d] font-bold">2.</span> Figure out what&apos;s happening</p>
                <p><span className="text-[#ff6b9d] font-bold">3.</span> Pick the right answer from 4 options</p>
                <p><span className="text-[#a855f7] font-bold">4.</span> Learn from the vocab breakdown after each round</p>
              </div>

              <Button onClick={startGame} size="lg" fullWidth>
                Start Eavesdropping
              </Button>
            </div>
          </motion.div>
        )}

        {/* ===== PLAYING / REVEAL ===== */}
        {(gameState === 'playing' || gameState === 'reveal') && scenario && (
          <motion.div
            key={`round-${currentRound}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#ff6b9d] to-[#a855f7]"
                initial={{ width: `${(currentRound / TOTAL_ROUNDS) * 100}%` }}
                animate={{ width: `${((currentRound + (gameState === 'reveal' ? 1 : 0)) / TOTAL_ROUNDS) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Location badge + difficulty */}
            <div className="flex items-center justify-between mb-4">
              <div className="glass-card px-4 py-2 text-base font-semibold text-[var(--foreground)]">
                {scenario.location}
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${difficultyMeta.color}22`, color: difficultyMeta.color }}
              >
                {difficultyMeta.label}
              </span>
            </div>

            {/* German text card — the "overheard" snippet */}
            <motion.div
              className="glass-card p-5 mb-5 border border-white/10 relative"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative ear icon */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#ff6b9d]/20 flex items-center justify-center">
                <Ear className="w-4 h-4 text-[#ff6b9d]" />
              </div>

              <p className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 mb-2 font-semibold">
                You overhear...
              </p>
              <p className="text-lg md:text-xl font-medium text-[var(--foreground)] leading-relaxed italic">
                &ldquo;{scenario.germanText}&rdquo;
              </p>
            </motion.div>

            {/* Question */}
            <p className="text-sm font-semibold text-[var(--foreground)]/80 mb-3">{scenario.question}</p>

            {/* Options */}
            <div className="space-y-2.5 mb-4">
              {shuffledOptions.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isAnswer = option === scenario.answer;
                const showResult = gameState === 'reveal';

                let borderColor = 'border-white/10';
                let bgColor = 'bg-white/5';
                let textColor = 'text-[var(--foreground)]';

                if (showResult) {
                  if (isAnswer) {
                    borderColor = 'border-[#00d9a5]/60';
                    bgColor = 'bg-[#00d9a5]/10';
                    textColor = 'text-[#00d9a5]';
                  } else if (isSelected && !isAnswer) {
                    borderColor = 'border-[#e94560]/60';
                    bgColor = 'bg-[#e94560]/10';
                    textColor = 'text-[#e94560]';
                  } else {
                    textColor = 'text-[var(--foreground)]/40';
                  }
                }

                return (
                  <motion.button
                    key={`${scenario.id}-opt-${idx}`}
                    onClick={() => handleAnswer(option)}
                    disabled={gameState === 'reveal'}
                    whileTap={gameState !== 'reveal' ? { scale: 0.98 } : undefined}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border ${borderColor} ${bgColor} ${textColor} transition-all duration-200 ${
                      gameState !== 'reveal' ? 'hover:border-[#ff6b9d]/40 hover:bg-[#ff6b9d]/5 cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          showResult && isAnswer
                            ? 'bg-[#00d9a5]/20 text-[#00d9a5]'
                            : showResult && isSelected && !isAnswer
                            ? 'bg-[#e94560]/20 text-[#e94560]'
                            : 'bg-white/10 text-[var(--foreground)]/50'
                        }`}
                      >
                        {showResult && isAnswer ? '\u2713' : showResult && isSelected && !isAnswer ? '\u2717' : String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm leading-snug">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Reveal: explanation + Kuttan reaction */}
            <AnimatePresence>
              {gameState === 'reveal' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Kuttan reaction */}
                  <div className="mb-4">
                    <CharacterGuide
                      messages={kuttanMessage}
                      mood={kuttanMood}
                      size="sm"
                      layout="horizontal"
                      showAppu={false}
                    />
                  </div>

                  {/* Explanation card */}
                  <motion.div
                    className="glass-card p-4 mb-5 border border-[#a855f7]/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <p className="text-[10px] uppercase tracking-widest text-[#a855f7]/70 font-bold mb-2">
                      Vocab breakdown
                    </p>
                    <p className="text-sm text-[var(--foreground)]/80 leading-relaxed">{scenario.explanation}</p>
                  </motion.div>

                  {/* Next button */}
                  <Button onClick={handleNext} size="lg" fullWidth>
                    {currentRound + 1 >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ===== COMPLETE ===== */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* Kuttan celebration */}
            <div className="mb-6">
              <CharacterGuide
                messages={kuttanMessage}
                mood={kuttanMood}
                size="md"
                showAppu={score >= 8}
                appuMood={score >= 8 ? 'celebrating' : 'idle'}
                autoAdvanceMs={5000}
              />
            </div>

            <div className="glass-card p-6 w-full text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-gradient-to-br from-[#ffd93d] to-[#d4a520] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,217,61,0.3)]"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>

              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Eavesdrop Complete!
              </h1>
              <p className="text-[var(--foreground)]/60 mb-4 text-sm">
                You got {score} out of {TOTAL_ROUNDS} right!
              </p>

              {/* Star rating */}
              <div className="flex items-center justify-center gap-1 mb-5">
                {[1, 2, 3].map((star) => (
                  <motion.span
                    key={star}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + star * 0.2, type: 'spring' }}
                    className="text-3xl"
                    style={{ color: star <= starRating.stars ? starRating.color : 'rgba(255,255,255,0.15)' }}
                  >
                    {'\u2605'}
                  </motion.span>
                ))}
              </div>
              <p className="text-xs text-[var(--foreground)]/50 mb-5">
                {starRating.label} &mdash; {score}/{TOTAL_ROUNDS} correct
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass-card p-3">
                  <div className="text-xl font-bold text-[#00d9a5]">{score}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Correct</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-xl font-bold text-[#e94560]">{TOTAL_ROUNDS - score}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">Missed</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-xl font-bold text-[#ffd93d]">+{earnedXP}</div>
                  <div className="text-[10px] text-[var(--foreground)]/50 uppercase tracking-wide">XP Earned</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setGameState('intro');
                    setShowConfetti(false);
                  }}
                  fullWidth
                >
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </Button>
                <Button variant="ghost" onClick={() => router.push('/games')} fullWidth>
                  Back to Games
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
