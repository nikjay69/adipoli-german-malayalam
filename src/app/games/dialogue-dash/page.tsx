'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, RefreshCw, MessageCircle, CheckCircle2, Sparkles, Lightbulb, Keyboard, Send } from 'lucide-react';
import { CharacterGuide } from '@/components/character';
import type { KuttanMood } from '@/components/character';
import { Confetti, XPGain } from '@/components/game';
import { GameButton } from '@/components/game';
import { useGameStore } from '@/lib/store';

// ── Types ───────────────────────────────────────────────────────────────
interface DialogueLine {
  speaker: 'user' | 'other';
  text: string;          // Full text with _____ as placeholder
  blankWord?: string;    // The correct answer
  hint?: string;         // Contextual hint shown after first wrong attempt
  options?: string[];    // MCQ fallback (shown after 2nd wrong attempt)
}

interface DialogueScenario {
  id: string;
  title: string;
  titleDe: string;
  emoji: string;
  difficulty: 1 | 2 | 3;
  otherName: string;
  otherRole: string;
  otherEmoji: string;
  lines: DialogueLine[];
  culturalTip: string;
}

type InputMode = 'typing' | 'hint' | 'mcq';

// ── Dialogue Data ───────────────────────────────────────────────────────
// Difficulty 1: Single words, greetings, Ja/Nein
// Difficulty 2: Short phrases (Ich mochte..., Konnen Sie...)
// Difficulty 3: Full sentences, grammar (Dativ, word order)

const DIALOGUES: DialogueScenario[] = [
  // ── DIFFICULTY 1 (Simple) ─────────────────────────────────────────
  {
    id: 'train',
    title: 'Train Station',
    titleDe: 'Am Bahnhof',
    emoji: '🚂',
    difficulty: 1,
    otherName: 'Beamter',
    otherRole: 'Ticket Officer',
    otherEmoji: '🎫',
    lines: [
      { speaker: 'other', text: 'Guten Tag! Wohin möchten Sie fahren?' },
      {
        speaker: 'user',
        text: 'Guten Tag. Eine Fahrkarte nach _____, bitte.',
        blankWord: 'Berlin',
        hint: 'A famous German capital city...',
        options: ['Berlin', 'Küche', 'Montag', 'Kaffee'],
      },
      { speaker: 'other', text: 'Einfach oder hin und zurück?' },
      {
        speaker: 'user',
        text: 'Hin und _____.',
        blankWord: 'zurück',
        hint: 'The word for "back" or "return"',
        options: ['zurück', 'schnell', 'groß', 'billig'],
      },
      { speaker: 'other', text: 'Erste oder zweite Klasse?' },
      {
        speaker: 'user',
        text: '_____ Klasse, bitte.',
        blankWord: 'Zweite',
        hint: 'The number 2 in German...',
        options: ['Zweite', 'Dritte', 'Letzte', 'Beste'],
      },
    ],
    culturalTip: 'In Germany, always validate your train ticket (entwerten) before boarding regional trains! No validation = big fine, even if you bought a ticket.',
  },
  {
    id: 'supermarket',
    title: 'Supermarket',
    titleDe: 'Im Supermarkt',
    emoji: '🛒',
    difficulty: 1,
    otherName: 'Verkäufer',
    otherRole: 'Cashier',
    otherEmoji: '🧑‍💼',
    lines: [
      {
        speaker: 'user',
        text: '_____, wo finde ich Milch?',
        blankWord: 'Entschuldigung',
        hint: 'How you politely get someone\'s attention (starts with "Ent...")',
        options: ['Entschuldigung', 'Danke', 'Tschüss', 'Bitte'],
      },
      { speaker: 'other', text: 'In Gang drei, neben dem Käse.' },
      {
        speaker: 'user',
        text: '_____ schön!',
        blankWord: 'Danke',
        hint: 'How do you say "thank you"?',
        options: ['Danke', 'Bitte', 'Guten', 'Nein'],
      },
      { speaker: 'other', text: 'Brauchen Sie eine Tüte?' },
      {
        speaker: 'user',
        text: '_____, danke. Ich habe eine Tasche.',
        blankWord: 'Nein',
        hint: 'The opposite of Ja',
        options: ['Nein', 'Ja', 'Gut', 'Hier'],
      },
    ],
    culturalTip: 'German supermarkets charge for plastic bags! Always bring your own bag (Tasche). Most Germans carry reusable bags everywhere.',
  },
  {
    id: 'cafe',
    title: 'Cafe Date',
    titleDe: 'Im Cafe',
    emoji: '☕',
    difficulty: 1,
    otherName: 'Kellner',
    otherRole: 'Waiter',
    otherEmoji: '☕',
    lines: [
      { speaker: 'other', text: 'Willkommen! Was darf es sein?' },
      {
        speaker: 'user',
        text: 'Einen _____, bitte.',
        blankWord: 'Kaffee',
        hint: 'The most popular hot drink (almost the same word in English!)',
        options: ['Kaffee', 'Kuchen', 'Käse', 'Kinder'],
      },
      { speaker: 'other', text: 'Mit Milch und Zucker?' },
      {
        speaker: 'user',
        text: 'Nur mit _____, bitte.',
        blankWord: 'Milch',
        hint: 'The white liquid you put in coffee',
        options: ['Milch', 'Salz', 'Brot', 'Wasser'],
      },
      { speaker: 'other', text: 'Möchten Sie auch etwas essen?' },
      {
        speaker: 'user',
        text: 'Ja, ein Stück _____, bitte.',
        blankWord: 'Kuchen',
        hint: 'A sweet baked dessert (cake)',
        options: ['Kuchen', 'Fleisch', 'Suppe', 'Salat'],
      },
    ],
    culturalTip: '"Kaffee und Kuchen" (coffee and cake) around 3-4 PM is a beloved German tradition, like chai time in Kerala! It is serious business.',
  },
  {
    id: 'neighbors',
    title: 'Meeting Neighbors',
    titleDe: 'Neue Nachbarn',
    emoji: '👋',
    difficulty: 1,
    otherName: 'Herr Müller',
    otherRole: 'Neighbor',
    otherEmoji: '🏡',
    lines: [
      { speaker: 'other', text: 'Hallo! Sie sind neu hier, oder?' },
      {
        speaker: 'user',
        text: 'Ja, ich bin _____. Ich komme aus Indien.',
        blankWord: 'neu',
        hint: 'The German word for "new"',
        options: ['neu', 'alt', 'groß', 'gut'],
      },
      { speaker: 'other', text: 'Willkommen! Ich bin Herr Müller. Und wie heißen Sie?' },
      {
        speaker: 'user',
        text: 'Ich _____ Kuttan. Freut mich!',
        blankWord: 'heiße',
        hint: '"My name is" = "Ich _____ ..."',
        options: ['heiße', 'komme', 'gehe', 'mache'],
      },
    ],
    culturalTip: 'Germans use Herr/Frau (Mr/Mrs) with last names until someone says "Du kannst mich duzen" (You can use the informal "du"). Using "du" too early with strangers is considered rude!',
  },

  // ── DIFFICULTY 2 (Short phrases) ──────────────────────────────────
  {
    id: 'restaurant',
    title: 'Restaurant',
    titleDe: 'Im Restaurant',
    emoji: '🍽️',
    difficulty: 2,
    otherName: 'Kellner',
    otherRole: 'Waiter',
    otherEmoji: '🧑‍🍳',
    lines: [
      { speaker: 'other', text: 'Guten Abend! Haben Sie reserviert?' },
      {
        speaker: 'user',
        text: 'Ja, auf den Namen _____.',
        blankWord: 'Kuttan',
        hint: 'Just say your name here!',
        options: ['Kuttan', 'Restaurant', 'Abend', 'Tisch'],
      },
      { speaker: 'other', text: 'Bitte schön, hier ist die Speisekarte. Was möchten Sie bestellen?' },
      {
        speaker: 'user',
        text: 'Ich _____ gern die Suppe und einen Salat.',
        blankWord: 'hätte',
        hint: '"I would like" in German uses this polite form of "haben"',
        options: ['hätte', 'möchte', 'müsste', 'könnte'],
      },
      { speaker: 'other', text: 'Sehr gerne. Und zu trinken?' },
      {
        speaker: 'user',
        text: 'Ein Glas _____, bitte.',
        blankWord: 'Wasser',
        hint: 'The most basic drink, H2O!',
        options: ['Wasser', 'Zucker', 'Salz', 'Käse'],
      },
    ],
    culturalTip: 'In German restaurants, tap water is NOT free! You must order "Mineralwasser" (sparkling) or "stilles Wasser" (still). Asking for free tap water will get you strange looks.',
  },
  {
    id: 'doctor',
    title: 'Doctor Visit',
    titleDe: 'Beim Arzt',
    emoji: '🏥',
    difficulty: 2,
    otherName: 'Dr. Schmidt',
    otherRole: 'Doctor',
    otherEmoji: '👨‍⚕️',
    lines: [
      { speaker: 'other', text: 'Guten Tag. Was fehlt Ihnen?' },
      {
        speaker: 'user',
        text: 'Ich habe _____ seit gestern.',
        blankWord: 'Kopfschmerzen',
        hint: 'Kopf = head, Schmerzen = pain. Put them together!',
        options: ['Kopfschmerzen', 'Hunger', 'Durst', 'Langeweile'],
      },
      { speaker: 'other', text: 'Haben Sie auch Fieber?' },
      {
        speaker: 'user',
        text: 'Ja, ich _____ mich auch müde.',
        blankWord: 'fühle',
        hint: '"I feel..." = "Ich _____ mich..."',
        options: ['fühle', 'mache', 'gehe', 'nehme'],
      },
      { speaker: 'other', text: 'Nehmen Sie irgendwelche Medikamente?' },
      {
        speaker: 'user',
        text: 'Nein, ich nehme _____ Medikamente.',
        blankWord: 'keine',
        hint: 'The negative form of "ein/eine" — "no" or "not any"',
        options: ['keine', 'viele', 'alle', 'meine'],
      },
    ],
    culturalTip: 'In Germany, you MUST have health insurance (Krankenversicherung). Without it, even an emergency visit can cost a fortune. First thing to sort when you arrive!',
  },
  {
    id: 'bank',
    title: 'Bank Account',
    titleDe: 'Bei der Bank',
    emoji: '🏦',
    difficulty: 2,
    otherName: 'Berater',
    otherRole: 'Bank Advisor',
    otherEmoji: '💼',
    lines: [
      { speaker: 'other', text: 'Guten Tag! Wie kann ich Ihnen helfen?' },
      {
        speaker: 'user',
        text: 'Ich möchte ein _____ eröffnen.',
        blankWord: 'Konto',
        hint: 'A bank _____ (where you keep your money)',
        options: ['Konto', 'Buch', 'Haus', 'Auto'],
      },
      { speaker: 'other', text: 'Natürlich. Haben Sie Ihren Ausweis dabei?' },
      {
        speaker: 'user',
        text: 'Ja, hier ist mein _____.',
        blankWord: 'Reisepass',
        hint: 'The document you use when traveling internationally',
        options: ['Reisepass', 'Führerschein', 'Studentenausweis', 'Schlüssel'],
      },
      { speaker: 'other', text: 'Möchten Sie auch eine EC-Karte?' },
      {
        speaker: 'user',
        text: 'Ja, _____.',
        blankWord: 'bitte',
        hint: 'The magic word! "Please"',
        options: ['bitte', 'danke', 'nein', 'tschüss'],
      },
    ],
    culturalTip: 'Germany is a cash country! Many restaurants and shops still do NOT accept cards. Always carry some Bargeld (cash). "Nur Barzahlung" signs are everywhere.',
  },
  {
    id: 'phone',
    title: 'Phone Call',
    titleDe: 'Telefonanruf',
    emoji: '📞',
    difficulty: 2,
    otherName: 'Empfang',
    otherRole: 'Receptionist',
    otherEmoji: '📋',
    lines: [
      { speaker: 'other', text: 'Praxis Dr. Weber, guten Tag.' },
      {
        speaker: 'user',
        text: 'Guten Tag. Ich möchte einen _____ machen.',
        blankWord: 'Termin',
        hint: 'An appointment = ein _____',
        options: ['Termin', 'Kuchen', 'Spaziergang', 'Fehler'],
      },
      { speaker: 'other', text: 'Wann passt es Ihnen? Montag oder Dienstag?' },
      {
        speaker: 'user',
        text: '_____ wäre gut.',
        blankWord: 'Montag',
        hint: 'The first day of the work week',
        options: ['Montag', 'Gestern', 'Morgen', 'Immer'],
      },
      { speaker: 'other', text: 'Um 10 Uhr oder um 14 Uhr?' },
      {
        speaker: 'user',
        text: 'Um _____ Uhr, bitte.',
        blankWord: 'zehn',
        hint: 'The number 10 written as a word',
        options: ['zehn', 'drei', 'sechs', 'eins'],
      },
    ],
    culturalTip: 'Getting a doctor appointment in Germany can take WEEKS. Pro tip: call at exactly 7:30 AM when lines open, or show up without an appointment during "offene Sprechstunde" (open consultation hours).',
  },

  // ── DIFFICULTY 3 (Full sentences, grammar) ────────────────────────
  {
    id: 'apartment',
    title: 'Apartment Hunting',
    titleDe: 'Wohnungsbesichtigung',
    emoji: '🏠',
    difficulty: 3,
    otherName: 'Vermieter',
    otherRole: 'Landlord',
    otherEmoji: '🔑',
    lines: [
      { speaker: 'other', text: 'Willkommen zur Besichtigung. Die Wohnung hat zwei Zimmer und eine Küche.' },
      {
        speaker: 'user',
        text: 'Wie hoch ist die _____?',
        blankWord: 'Miete',
        hint: 'The monthly payment for an apartment',
        options: ['Miete', 'Straße', 'Schule', 'Arbeit'],
      },
      { speaker: 'other', text: '650 Euro kalt, plus Nebenkosten.' },
      {
        speaker: 'user',
        text: 'Ist die Wohnung ab _____ frei?',
        blankWord: 'sofort',
        hint: '"Immediately" / "right away" in German',
        options: ['sofort', 'niemals', 'gestern', 'langsam'],
      },
      { speaker: 'other', text: 'Ja, Sie können nächste Woche einziehen. Haben Sie noch Fragen?' },
      {
        speaker: 'user',
        text: 'Darf ich _____ in der Wohnung haben?',
        blankWord: 'Haustiere',
        hint: 'Haus = house, Tiere = animals. Pets!',
        options: ['Haustiere', 'Partys', 'Probleme', 'Feuer'],
      },
    ],
    culturalTip: '"Kaltmiete" = rent without utilities. "Warmmiete" = rent WITH utilities. Always ask which one! Also, "Kaution" (deposit) is usually 3 months rent. Apartment hunting in German cities is BRUTAL.',
  },
  {
    id: 'postoffice',
    title: 'Post Office',
    titleDe: 'Bei der Post',
    emoji: '📮',
    difficulty: 3,
    otherName: 'Postbeamter',
    otherRole: 'Postal Worker',
    otherEmoji: '📦',
    lines: [
      { speaker: 'other', text: 'Guten Tag. Was kann ich für Sie tun?' },
      {
        speaker: 'user',
        text: 'Ich möchte dieses Paket nach _____ schicken.',
        blankWord: 'Indien',
        hint: 'Your home country! India in German.',
        options: ['Indien', 'Island', 'Italien', 'Irland'],
      },
      { speaker: 'other', text: 'Per Luftpost oder auf dem Seeweg?' },
      {
        speaker: 'user',
        text: 'Per _____. Wie lange dauert es?',
        blankWord: 'Luftpost',
        hint: 'Luft = air, Post = mail. Airmail!',
        options: ['Luftpost', 'Seeweg', 'Landweg', 'Express'],
      },
      { speaker: 'other', text: 'Etwa 7-10 Werktage. Das macht 15,90 Euro.' },
      {
        speaker: 'user',
        text: 'Kann ich mit _____ bezahlen?',
        blankWord: 'Karte',
        hint: 'Credit/debit _____ (the plastic thing in your wallet)',
        options: ['Karte', 'Kuchen', 'Konto', 'Kleid'],
      },
    ],
    culturalTip: 'Sending parcels to India from Germany? DHL is the go-to. A 2kg package costs around 16 EUR by air. Pro tip: use the DHL Packstation for 24/7 pickup — no waiting in queues!',
  },
  {
    id: 'jobinterview',
    title: 'Job Interview',
    titleDe: 'Vorstellungsgespräch',
    emoji: '💼',
    difficulty: 3,
    otherName: 'Frau Weber',
    otherRole: 'HR Manager',
    otherEmoji: '👩‍💼',
    lines: [
      { speaker: 'other', text: 'Guten Tag. Bitte setzen Sie sich. Erzählen Sie etwas über sich.' },
      {
        speaker: 'user',
        text: 'Ich habe mein _____ in Informatik gemacht.',
        blankWord: 'Studium',
        hint: 'Your university education/degree',
        options: ['Studium', 'Frühstück', 'Hobby', 'Urlaub'],
      },
      { speaker: 'other', text: 'Sehr gut. Warum möchten Sie bei uns arbeiten?' },
      {
        speaker: 'user',
        text: 'Ich _____ mich für Ihre Projekte im Bereich KI.',
        blankWord: 'interessiere',
        hint: '"I am interested in" = "Ich _____ mich für..."',
        options: ['interessiere', 'langweile', 'ärgere', 'entscheide'],
      },
      { speaker: 'other', text: 'Wann könnten Sie anfangen?' },
      {
        speaker: 'user',
        text: 'Ich _____ ab dem ersten Mai anfangen.',
        blankWord: 'könnte',
        hint: '"I could..." — polite form of "können"',
        options: ['könnte', 'müsste', 'wollte', 'sollte'],
      },
    ],
    culturalTip: 'In Germany, Ausbildung (vocational training) is as respected as university! Many well-paying jobs come through the dual education system. Do not overlook it as an option.',
  },
  {
    id: 'university',
    title: 'University Enrollment',
    titleDe: 'Einschreibung',
    emoji: '🎓',
    difficulty: 3,
    otherName: 'Sachbearbeiter',
    otherRole: 'Admin Officer',
    otherEmoji: '📚',
    lines: [
      { speaker: 'other', text: 'Guten Tag. Sind Sie für das Wintersemester eingeschrieben?' },
      {
        speaker: 'user',
        text: 'Nein, ich möchte mich für _____ einschreiben.',
        blankWord: 'Informatik',
        hint: 'Computer Science in German',
        options: ['Informatik', 'Information', 'Internet', 'Industrie'],
      },
      { speaker: 'other', text: 'Haben Sie Ihre Zeugnisse dabei?' },
      {
        speaker: 'user',
        text: 'Ja, hier sind meine _____ Zeugnisse.',
        blankWord: 'beglaubigten',
        hint: '"Certified" / "authenticated" copies — starts with "beg..."',
        options: ['beglaubigten', 'beliebten', 'bekannten', 'bequemen'],
      },
      { speaker: 'other', text: 'Gut. Sie müssen noch den Semesterbeitrag bezahlen.' },
      {
        speaker: 'user',
        text: 'Wie viel _____ der Beitrag?',
        blankWord: 'beträgt',
        hint: '"How much does it amount to?" — formal word for "costs"',
        options: ['beträgt', 'bedeutet', 'bekommt', 'bestellt'],
      },
    ],
    culturalTip: 'Most German public universities are tuition-FREE, even for international students! You only pay a small Semesterbeitrag (around 150-350 EUR) which usually includes a public transport ticket.',
  },
];

// ── Kuttan Reactions ────────────────────────────────────────────────────
const CORRECT_REACTIONS_TYPED = [
  "Adipoli machaa! You typed it perfectly!",
  "No hints needed! Pure brain power! 🔥",
  "Wunderbar! German is flowing from your fingers!",
  "Look at you typing German like a pro!",
  "First try correct?! Nee oru monster aanu!",
];

const CORRECT_REACTIONS_HINT = [
  "Got it with a small hint — still great machaa!",
  "Hint helped, but YOU did the thinking!",
  "Seri seri! The hint just nudged you!",
  "Almost had it! Good recovery!",
];

const CORRECT_REACTIONS_MCQ = [
  "MCQ helped, but now you know the word!",
  "Paravaala! Next time type it from memory!",
  "Options make it easier — try typing next time!",
  "You'll remember this one now machaa!",
];

const WRONG_REACTIONS = [
  "Aiyyo! That's not quite right da...",
  "Hmm, awkward silence... try again machaa!",
  "Paravaala! Think about the context!",
  "Not that one da... read the conversation again!",
  "Close but no cigar! Give it another shot!",
];

const SCENARIO_INTROS: Record<string, string> = {
  train: "Kuttan needs a train ticket! Help him at the Bahnhof!",
  restaurant: "Dinner time machaa! Time to order some food!",
  doctor: "Aiyyo! Not feeling well. Doctor visit time!",
  supermarket: "Shopping time! Where's the milk da?",
  bank: "Opening a bank account — adulting in Germany!",
  apartment: "Apartment hunting in Germany! Athrem scary stuff!",
  cafe: "Coffee and cake time! Very German, very nice!",
  neighbors: "New neighbors! First impressions matter machaa!",
  phone: "Phone call to the doctor! No hiding behind texts!",
  postoffice: "Sending a parcel home to Kerala! Ammakku oru gift!",
  jobinterview: "Job interview da! Dress sharp, speak sharper!",
  university: "Uni enrollment! The real reason you're in Germany!",
};

const COMPLETION_MSGS: Record<string, { msg: string; mood: KuttanMood }> = {
  perfect: { msg: "Adipoli machaa! Every conversation nailed! You can handle ANY German situation!", mood: 'celebrating' },
  great: { msg: "Wunderbar! You typed most answers! Germans will think you're a local!", mood: 'excited' },
  good: { msg: "Not bad machaa! You can survive real German conversations! Keep at it!", mood: 'happy' },
  tryAgain: { msg: "Paravaala da! Real conversations are tough. Practice more and come back!", mood: 'thinking' },
};

const DIFFICULTY_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: 'Beginner', color: '#00d9a5' },
  2: { label: 'Intermediate', color: '#ffd93d' },
  3: { label: 'Advanced', color: '#ff6b9d' },
};

// ── Typing Dots ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-[var(--foreground)]/30"
          animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

// ── Chat Bubble ─────────────────────────────────────────────────────────
function ChatBubble({
  speaker,
  text,
  isBlank,
  blankFilled,
  isNew,
  otherEmoji,
  otherName,
  showCorrectFlash,
}: {
  speaker: 'user' | 'other';
  text: string;
  isBlank: boolean;
  blankFilled?: string | null;
  isNew: boolean;
  otherEmoji: string;
  otherName: string;
  showCorrectFlash?: boolean;
}) {
  const isUser = speaker === 'user';

  const renderText = () => {
    if (!isBlank) return text;

    const parts = text.split('_____');
    return (
      <span>
        {parts[0]}
        {blankFilled ? (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`inline-block font-bold px-1.5 py-0.5 rounded ${
              showCorrectFlash
                ? 'bg-[#00d9a5]/20 text-[#00d9a5]'
                : 'text-[var(--foreground)]'
            }`}
          >
            {blankFilled}
          </motion.span>
        ) : (
          <motion.span
            animate={{
              boxShadow: ['0 0 5px rgba(255,217,61,0.3)', '0 0 15px rgba(255,217,61,0.6)', '0 0 5px rgba(255,217,61,0.3)'],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block bg-[#ffd93d]/20 text-[#ffd93d] font-bold px-3 py-0.5 rounded border border-[#ffd93d]/30 mx-0.5"
          >
            ?????
          </motion.span>
        )}
        {parts[1]}
      </span>
    );
  };

  return (
    <motion.div
      initial={isNew ? { opacity: 0, x: isUser ? 30 : -30, y: 10 } : { opacity: 1, x: 0, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
        isUser
          ? 'bg-[#27ae60]/20 border border-[#27ae60]/30'
          : 'bg-[#ff6b9d]/20 border border-[#ff6b9d]/30'
      }`}>
        {isUser ? '👦' : otherEmoji}
      </div>

      {/* Bubble */}
      <motion.div
        animate={showCorrectFlash ? {
          boxShadow: ['0 0 0px rgba(0,217,165,0)', '0 0 20px rgba(0,217,165,0.4)', '0 0 0px rgba(0,217,165,0)'],
        } : {}}
        transition={{ duration: 0.6 }}
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-[#27ae60]/15 border border-[#27ae60]/20 rounded-br-md'
            : 'bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-bl-md'
        }`}
      >
        <div className="text-[10px] font-bold mb-0.5 opacity-40">
          {isUser ? 'You' : otherName}
        </div>
        <div className="font-medium">{renderText()}</div>
      </motion.div>
    </motion.div>
  );
}

// ── Cultural Tip Card ───────────────────────────────────────────────────
function CulturalTipCard({ tip, onContinue }: { tip: string; onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="game-card p-4 border border-[#ffd93d]/20 bg-[#ffd93d]/5"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ffd93d]/20 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-[#ffd93d]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#ffd93d] mb-1">Cultural Tip</p>
            <p className="text-sm text-[var(--foreground)]/70 leading-relaxed">{tip}</p>
          </div>
        </div>
      </motion.div>
      <GameButton onClick={onContinue} fullWidth size="sm">
        Next Conversation
      </GameButton>
    </motion.div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────
function shuffleArray<T>(array: T[]): T[] {
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

function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/[.,!?;:]+$/, '');
}

// ── Main Component ──────────────────────────────────────────────────────
export default function DialogueDashGame() {
  const router = useRouter();
  const { addXP, incrementGamesPlayed, learnVocabulary } = useGameStore();

  // Game state
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'culturalTip' | 'complete'>('ready');
  const [dialogues, setDialogues] = useState<DialogueScenario[]>([]);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  // Scoring
  const [score, setScore] = useState(0);
  const [totalBlanks, setTotalBlanks] = useState(0);
  const [typedCount, setTypedCount] = useState(0);     // answered via typing
  const [hintCount, setHintCount] = useState(0);        // answered via hint
  const [mcqCount, setMcqCount] = useState(0);          // answered via MCQ

  // Answer state
  const [inputMode, setInputMode] = useState<InputMode>('typing');
  const [typedValue, setTypedValue] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [filledBlanks, setFilledBlanks] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [correctFlashKey, setCorrectFlashKey] = useState<string | null>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  // UI state
  const [kuttanMood, setKuttanMood] = useState<KuttanMood>('excited');
  const [kuttanMsg, setKuttanMsg] = useState("Real German conversations machaa! Type your responses!");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [completedDialogues, setCompletedDialogues] = useState<string[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Scroll to bottom ──────────────────────────────────────────────
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleLines, showTyping, showResult, inputMode]);

  // ── Focus input when typing mode is active ────────────────────────
  useEffect(() => {
    if (inputMode === 'typing' || inputMode === 'hint') {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [inputMode, currentLine, currentDialogue, visibleLines]);

  // ── Sort dialogues by difficulty ──────────────────────────────────
  const generateDialogues = useCallback(() => {
    // Group by difficulty, shuffle within each group, then concatenate
    const d1 = shuffleArray(DIALOGUES.filter(d => d.difficulty === 1));
    const d2 = shuffleArray(DIALOGUES.filter(d => d.difficulty === 2));
    const d3 = shuffleArray(DIALOGUES.filter(d => d.difficulty === 3));
    setDialogues([...d1, ...d2, ...d3]);
  }, []);

  useEffect(() => {
    generateDialogues();
  }, [generateDialogues]);

  // ── Count total blanks ────────────────────────────────────────────
  useEffect(() => {
    let count = 0;
    DIALOGUES.forEach(d => {
      d.lines.forEach(l => {
        if (l.blankWord) count++;
      });
    });
    setTotalBlanks(count);
  }, []);

  // ── Start game ────────────────────────────────────────────────────
  const startGame = () => {
    generateDialogues();
    setGameState('playing');
    setCurrentDialogue(0);
    setCurrentLine(0);
    setVisibleLines(0);
    setScore(0);
    setTypedCount(0);
    setHintCount(0);
    setMcqCount(0);
    setFilledBlanks({});
    setSelectedAnswer(null);
    setShowResult(false);
    setCompletedDialogues([]);
    setWaitingForNext(false);
    setInputMode('typing');
    setTypedValue('');
    setWrongAttempts(0);
    setKuttanMood('excited');

    setTimeout(() => {
      revealNextLine(0, 0);
    }, 500);
  };

  // ── Reveal next line ──────────────────────────────────────────────
  const revealNextLine = (dialogueIdx: number, lineIdx: number) => {
    const dialogue = (dialogues.length > 0 ? dialogues : DIALOGUES)[dialogueIdx];
    if (!dialogue || lineIdx >= dialogue.lines.length) return;

    setShowTyping(true);

    setTimeout(() => {
      setShowTyping(false);
      setVisibleLines(lineIdx + 1);
      setCurrentLine(lineIdx);

      const line = dialogue.lines[lineIdx];
      if (!line.blankWord) {
        // Non-blank line: auto-advance
        setTimeout(() => {
          if (lineIdx + 1 < dialogue.lines.length) {
            revealNextLine(dialogueIdx, lineIdx + 1);
          }
        }, 800);
      } else {
        // Blank line: reset input state
        setInputMode('typing');
        setTypedValue('');
        setWrongAttempts(0);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 600);
  };

  // ── Handle correct answer ─────────────────────────────────────────
  const handleCorrectAnswer = (answer: string, mode: InputMode) => {
    const dialogue = dialogues[currentDialogue];
    if (!dialogue) return;
    const line = dialogue.lines[currentLine];
    if (!line) return;

    const blankKey = `${currentDialogue}-${currentLine}`;

    setScore(prev => prev + 1);
    setFilledBlanks(prev => ({ ...prev, [blankKey]: answer }));
    setCorrectFlashKey(blankKey);
    setIsCorrect(true);
    setShowResult(true);

    // Track which mode was used
    if (mode === 'typing') {
      setTypedCount(prev => prev + 1);
      setKuttanMood('celebrating');
      setKuttanMsg(pickRandom(CORRECT_REACTIONS_TYPED));
    } else if (mode === 'hint') {
      setHintCount(prev => prev + 1);
      setKuttanMood('happy');
      setKuttanMsg(pickRandom(CORRECT_REACTIONS_HINT));
    } else {
      setMcqCount(prev => prev + 1);
      setKuttanMood('happy');
      setKuttanMsg(pickRandom(CORRECT_REACTIONS_MCQ));
    }

    learnVocabulary(`dialogue-${dialogue.id}-${line.blankWord}`);

    setTimeout(() => {
      setCorrectFlashKey(null);
    }, 600);

    // Advance
    setWaitingForNext(true);
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
      setWaitingForNext(false);
      setTypedValue('');

      const nextLine = currentLine + 1;
      if (nextLine < dialogue.lines.length) {
        revealNextLine(currentDialogue, nextLine);
      } else {
        // Dialogue complete — show cultural tip
        setCompletedDialogues(prev => [...prev, dialogue.id]);
        setGameState('culturalTip');
      }
    }, 1200);
  };

  // ── Handle wrong answer ───────────────────────────────────────────
  const handleWrongAnswer = () => {
    const newAttempts = wrongAttempts + 1;
    setWrongAttempts(newAttempts);
    setIsCorrect(false);
    setShowResult(true);
    setKuttanMood('thinking');
    setKuttanMsg(pickRandom(WRONG_REACTIONS));

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);

      if (newAttempts === 1) {
        // After first wrong: show first-letter hint
        setInputMode('hint');
        setTypedValue('');
      } else if (newAttempts >= 2) {
        // After second wrong: fall back to MCQ
        setInputMode('mcq');
        setTypedValue('');
      }
    }, 1000);
  };

  // ── Handle typed submit ───────────────────────────────────────────
  const handleTypedSubmit = () => {
    if (showResult || waitingForNext) return;

    const dialogue = dialogues[currentDialogue];
    if (!dialogue) return;
    const line = dialogue.lines[currentLine];
    if (!line?.blankWord) return;

    const userAnswer = normalizeAnswer(typedValue);
    const correctAnswer = normalizeAnswer(line.blankWord);

    if (userAnswer === correctAnswer) {
      handleCorrectAnswer(line.blankWord, inputMode);
    } else {
      handleWrongAnswer();
    }
  };

  // ── Handle MCQ answer ─────────────────────────────────────────────
  const handleMCQAnswer = (answer: string) => {
    if (showResult || waitingForNext) return;

    const dialogue = dialogues[currentDialogue];
    if (!dialogue) return;
    const line = dialogue.lines[currentLine];
    if (!line?.blankWord) return;

    setSelectedAnswer(answer);

    if (answer === line.blankWord) {
      handleCorrectAnswer(answer, 'mcq');
    } else {
      handleWrongAnswer();
    }
  };

  // ── Continue after cultural tip ───────────────────────────────────
  const handleCulturalTipContinue = () => {
    const nextDialogue = currentDialogue + 1;

    if (nextDialogue < dialogues.length) {
      setCurrentDialogue(nextDialogue);
      setCurrentLine(0);
      setVisibleLines(0);
      setGameState('playing');
      setKuttanMood('excited');
      setKuttanMsg(SCENARIO_INTROS[dialogues[nextDialogue].id] || "Next conversation machaa!");

      setTimeout(() => {
        revealNextLine(nextDialogue, 0);
      }, 500);
    } else {
      endGame();
    }
  };

  // ── End game ──────────────────────────────────────────────────────
  const endGame = useCallback(() => {
    setGameState('complete');
    incrementGamesPlayed();

    // Bonus XP for typing answers (5 per typed, 3 per hint, 2 per MCQ)
    const earnedXP = (typedCount * 5) + (hintCount * 3) + (mcqCount * 2) + (score === totalBlanks ? 20 : 0);
    addXP(earnedXP);

    const ratio = score / Math.max(totalBlanks, 1);
    const comp = ratio === 1 ? COMPLETION_MSGS.perfect
      : ratio >= 0.8 ? COMPLETION_MSGS.great
      : ratio >= 0.5 ? COMPLETION_MSGS.good
      : COMPLETION_MSGS.tryAgain;

    setKuttanMood(comp.mood);
    setKuttanMsg(comp.msg);
    setShowConfetti(ratio >= 0.8);
    setShowXP(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, totalBlanks, typedCount, hintCount, mcqCount]);

  // ── Derived state ─────────────────────────────────────────────────
  const currentDialogueData = dialogues[currentDialogue];
  const currentLineData = currentDialogueData?.lines[currentLine];
  const isBlankLine = currentLineData?.blankWord != null;
  const totalXP = (typedCount * 5) + (hintCount * 3) + (mcqCount * 2) + (score === totalBlanks ? 20 : 0);
  const dialogueCount = dialogues.length || DIALOGUES.length;

  // Current blank line's first letter hint
  const firstLetterHint = currentLineData?.blankWord
    ? currentLineData.blankWord.charAt(0).toUpperCase() + '...'
    : '';

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto relative overflow-hidden flex flex-col">
      {/* Confetti */}
      <Confetti isActive={showConfetti} />
      <XPGain amount={totalXP} isVisible={showXP} onComplete={() => setShowXP(false)} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <button
          onClick={() => router.push('/games')}
          className="flex items-center gap-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        {gameState === 'playing' && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-[#ff6b9d]/15 text-[#ff6b9d] border border-[#ff6b9d]/20">
              <MessageCircle className="w-4 h-4" />
              <span>{currentDialogue + 1}/{dialogueCount}</span>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Ready Screen ──────────────────────────────────────────── */}
        {gameState === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <CharacterGuide
                messages="Real German conversations machaa! Type your responses — no multiple choice crutch! If you get stuck, hints will help you out."
                mood="excited"
                size="md"
                showAppu
                appuMood="happy"
              />
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="game-card p-6 w-full text-center mb-6"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                💬
              </motion.div>
              <h1 className="text-2xl font-bold mb-2">
                <span className="gradient-text">Dialogue Dash</span>
              </h1>
              <p className="text-[var(--foreground)]/50 text-sm mb-2 leading-relaxed">
                Complete {dialogueCount} real-life German conversations!
              </p>
              <p className="text-[var(--foreground)]/40 text-xs mb-4 leading-relaxed">
                Type your answers. Wrong once = hint. Wrong twice = multiple choice.
              </p>

              {/* How it works */}
              <div className="game-card p-3 mb-5 border border-[var(--foreground)]/10 text-left space-y-2">
                <p className="text-xs font-bold text-[var(--foreground)]/50 mb-2">How it works</p>
                <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/60">
                  <Keyboard className="w-4 h-4 text-[#00d9a5] flex-shrink-0" />
                  <span><strong className="text-[#00d9a5]">First try:</strong> Type the answer (5 XP)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/60">
                  <Lightbulb className="w-4 h-4 text-[#ffd93d] flex-shrink-0" />
                  <span><strong className="text-[#ffd93d]">With hint:</strong> First letter shown (3 XP)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/60">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b9d] flex-shrink-0" />
                  <span><strong className="text-[#ff6b9d]">MCQ fallback:</strong> Pick from options (2 XP)</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-5 text-sm text-[var(--foreground)]/40">
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" /> {dialogueCount} dialogues
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> 3 difficulty levels
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> Up to {totalBlanks * 5 + 20} XP
                </span>
              </div>

              {/* Scenario preview by difficulty */}
              {[1, 2, 3].map(diff => {
                const group = DIALOGUES.filter(d => d.difficulty === diff);
                const { label, color } = DIFFICULTY_LABELS[diff];
                return (
                  <div key={diff} className="mb-3">
                    <p className="text-[10px] font-bold mb-1.5 text-left" style={{ color }}>{label}</p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {group.map(d => (
                        <motion.div
                          key={d.id}
                          whileHover={{ scale: 1.05 }}
                          className="bg-[var(--foreground)]/5 rounded-lg p-1.5 text-center"
                        >
                          <div className="text-lg">{d.emoji}</div>
                          <div className="text-[9px] text-[var(--foreground)]/40 mt-0.5 leading-tight">{d.title}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}

              <GameButton onClick={startGame} size="lg" fullWidth pulse>
                Start Conversations
              </GameButton>
            </motion.div>
          </motion.div>
        )}

        {/* ── Playing Screen ────────────────────────────────────────── */}
        {gameState === 'playing' && currentDialogueData && (
          <motion.div
            key={`playing-${currentDialogue}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* Overall progress */}
            <div className="w-full h-1.5 bg-[var(--foreground)]/10 rounded-full mb-3 overflow-hidden flex-shrink-0">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] rounded-full"
                animate={{ width: `${(completedDialogues.length / dialogueCount) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>

            {/* Scenario header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="game-card p-3 mb-3 flex items-center gap-3 border border-[var(--foreground)]/10 flex-shrink-0"
            >
              <span className="text-2xl">{currentDialogueData.emoji}</span>
              <div className="flex-1">
                <div className="text-sm font-bold">{currentDialogueData.title}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">{currentDialogueData.titleDe}</div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    color: DIFFICULTY_LABELS[currentDialogueData.difficulty].color,
                    backgroundColor: DIFFICULTY_LABELS[currentDialogueData.difficulty].color + '20',
                  }}
                >
                  {DIFFICULTY_LABELS[currentDialogueData.difficulty].label}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#00d9a5] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  {score}
                </div>
              </div>
            </motion.div>

            {/* Kuttan guide */}
            <motion.div
              key={kuttanMsg}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-3 flex-shrink-0"
            >
              <CharacterGuide messages={kuttanMsg} mood={kuttanMood} size="sm" layout="horizontal" />
            </motion.div>

            {/* Chat area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto space-y-1 mb-3 min-h-[180px] max-h-[280px] scroll-smooth"
            >
              {currentDialogueData.lines.slice(0, visibleLines).map((line, lineIdx) => {
                const blankKey = `${currentDialogue}-${lineIdx}`;
                const filled = filledBlanks[blankKey] || null;
                const showFlash = correctFlashKey === blankKey;

                return (
                  <ChatBubble
                    key={`${currentDialogue}-${lineIdx}`}
                    speaker={line.speaker}
                    text={line.text}
                    isBlank={line.blankWord != null}
                    blankFilled={filled}
                    isNew={lineIdx === visibleLines - 1}
                    otherEmoji={currentDialogueData.otherEmoji}
                    otherName={currentDialogueData.otherName}
                    showCorrectFlash={showFlash}
                  />
                );
              })}

              {/* Typing indicator */}
              {showTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--foreground)]/5 text-sm">
                    {currentDialogueData.lines[visibleLines]?.speaker === 'user' ? '👦' : currentDialogueData.otherEmoji}
                  </div>
                  <div className="bg-[var(--foreground)]/5 rounded-2xl rounded-bl-md">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input area */}
            <AnimatePresence mode="wait">
              {isBlankLine && !waitingForNext && visibleLines > currentLine && (
                <motion.div
                  key={`input-${currentDialogue}-${currentLine}-${inputMode}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex-shrink-0 space-y-2"
                >
                  {/* Typing / Hint mode */}
                  {(inputMode === 'typing' || inputMode === 'hint') && (
                    <>
                      {/* Mode indicator */}
                      <div className="flex items-center justify-center gap-2 text-xs">
                        {inputMode === 'typing' ? (
                          <span className="flex items-center gap-1 text-[#00d9a5]">
                            <Keyboard className="w-3 h-3" /> Type your answer
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[#ffd93d]">
                            <Lightbulb className="w-3 h-3" /> Hint: starts with &quot;{firstLetterHint}&quot;
                          </span>
                        )}
                      </div>

                      {/* Context hint if available */}
                      {inputMode === 'hint' && currentLineData?.hint && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center text-xs text-[var(--foreground)]/40 italic"
                        >
                          {currentLineData.hint}
                        </motion.p>
                      )}

                      {/* Input field */}
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <input
                            ref={inputRef}
                            type="text"
                            value={typedValue}
                            onChange={(e) => setTypedValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && typedValue.trim()) {
                                handleTypedSubmit();
                              }
                            }}
                            placeholder={inputMode === 'hint'
                              ? `${firstLetterHint}`
                              : 'Type the missing word...'
                            }
                            disabled={showResult}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--foreground)]/5 border-2 border-[var(--foreground)]/10 focus:border-[#ffd93d]/50 focus:outline-none text-sm font-medium placeholder:text-[var(--foreground)]/20 transition-colors"
                            autoComplete="off"
                            autoCapitalize="off"
                            spellCheck={false}
                          />
                          {showResult && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold ${
                                isCorrect ? 'text-[#00d9a5]' : 'text-[#c0392b]'
                              }`}
                            >
                              {isCorrect ? '✓' : '✗'}
                            </motion.div>
                          )}
                        </div>
                        <motion.button
                          onClick={handleTypedSubmit}
                          disabled={!typedValue.trim() || showResult}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#ff6b9d] to-[#ffd93d] text-white font-bold text-sm disabled:opacity-30 transition-opacity"
                        >
                          <Send className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </>
                  )}

                  {/* MCQ fallback mode */}
                  {inputMode === 'mcq' && (
                    <>
                      <p className="text-xs text-center text-[#ff6b9d]">
                        Pick the correct word
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {currentLineData?.options?.map((option, index) => {
                          const isSelected = selectedAnswer === option;
                          const isCorrectOpt = showResult && option === currentLineData.blankWord;
                          const isWrongOpt = showResult && isSelected && option !== currentLineData.blankWord;

                          return (
                            <motion.button
                              key={`${currentDialogue}-${currentLine}-mcq-${index}`}
                              onClick={() => handleMCQAnswer(option)}
                              disabled={showResult}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                x: isWrongOpt ? [0, -3, 3, -3, 3, 0] : 0,
                              }}
                              transition={{ delay: index * 0.06, duration: isWrongOpt ? 0.4 : 0.2 }}
                              whileTap={showResult ? {} : { scale: 0.95 }}
                              className={`p-3 rounded-xl border-2 text-center text-sm font-medium transition-all ${
                                isCorrectOpt
                                  ? 'bg-[#00d9a5]/20 border-[#00d9a5] text-[#00d9a5] shadow-[0_0_12px_rgba(0,217,165,0.2)]'
                                  : isWrongOpt
                                  ? 'bg-[#c0392b]/20 border-[#c0392b] text-[#c0392b] shadow-[0_0_12px_rgba(192,57,43,0.2)]'
                                  : 'game-card border-transparent hover:border-[#ffd93d]/30'
                              }`}
                            >
                              {option}
                            </motion.button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Cultural Tip Screen ───────────────────────────────────── */}
        {gameState === 'culturalTip' && currentDialogueData && (
          <motion.div
            key={`tip-${currentDialogue}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4">
              <CharacterGuide
                messages={`${currentDialogueData.title} conversation done! Here's something useful about Germany...`}
                mood="happy"
                size="sm"
                layout="horizontal"
              />
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full mb-4 text-center"
            >
              <div className="text-3xl mb-2">{currentDialogueData.emoji}</div>
              <h2 className="text-lg font-bold mb-1">{currentDialogueData.title}</h2>
              <p className="text-xs text-[#00d9a5] font-bold">Completed!</p>
            </motion.div>

            <div className="w-full">
              <CulturalTipCard
                tip={currentDialogueData.culturalTip}
                onContinue={handleCulturalTipContinue}
              />
            </div>
          </motion.div>
        )}

        {/* ── Complete Screen ───────────────────────────────────────── */}
        {gameState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* Character */}
            <div className="mb-4">
              <CharacterGuide
                messages={kuttanMsg}
                mood={kuttanMood}
                size="md"
                showAppu={score >= totalBlanks * 0.8}
                appuMood="happy"
              />
            </div>

            {/* Trophy */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="mb-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff6b9d] to-[#ffd93d] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b9d]/30">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-1"
            >
              {score === totalBlanks ? 'Conversation Master!' : score >= totalBlanks * 0.8 ? 'Great Talker!' : score >= totalBlanks * 0.5 ? 'Good Effort!' : 'Keep Talking!'}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-sm text-[var(--foreground)]/50 mb-5"
            >
              {score} of {totalBlanks} blanks filled correctly!
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3 w-full mb-3"
            >
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#ff6b9d]">{score}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">Correct</div>
              </div>
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#00d9a5]">{dialogueCount}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">Dialogues</div>
              </div>
              <div className="game-card p-3 text-center">
                <div className="text-xl font-bold text-[#ffd93d]">+{totalXP}</div>
                <div className="text-[10px] text-[var(--foreground)]/40">XP Earned</div>
              </div>
            </motion.div>

            {/* Input mode breakdown */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="w-full game-card p-3 mb-4 border border-[var(--foreground)]/10"
            >
              <p className="text-xs font-bold text-[var(--foreground)]/50 mb-2">Answer breakdown</p>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <Keyboard className="w-3 h-3 text-[#00d9a5]" />
                  <span className="text-[var(--foreground)]/60">
                    <strong className="text-[#00d9a5]">{typedCount}</strong> typed
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3 text-[#ffd93d]" />
                  <span className="text-[var(--foreground)]/60">
                    <strong className="text-[#ffd93d]">{hintCount}</strong> with hint
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#ff6b9d]" />
                  <span className="text-[var(--foreground)]/60">
                    <strong className="text-[#ff6b9d]">{mcqCount}</strong> MCQ
                  </span>
                </div>
              </div>
              {typedCount > 0 && (
                <p className="text-[10px] text-[var(--foreground)]/30 mt-1.5">
                  {typedCount >= totalBlanks * 0.8
                    ? 'Incredible typing accuracy! You really know your German!'
                    : typedCount >= totalBlanks * 0.5
                    ? 'Good mix of typing and hints. Keep practicing to type more!'
                    : 'Try typing more answers next time for bonus XP!'}
                </p>
              )}
            </motion.div>

            {/* Completed dialogues timeline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full game-card p-4 mb-5 border border-[var(--foreground)]/10"
            >
              <p className="text-xs font-bold text-[var(--foreground)]/50 mb-3">Conversations completed</p>
              <div className="space-y-2">
                {dialogues.map((d, i) => {
                  const isComplete = completedDialogues.includes(d.id);
                  const diffStyle = DIFFICULTY_LABELS[d.difficulty];
                  return (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isComplete
                          ? 'bg-[#00d9a5]/20 border border-[#00d9a5]/30'
                          : 'bg-[var(--foreground)]/5 border border-[var(--foreground)]/10'
                      }`}>
                        {isComplete ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00d9a5]" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[var(--foreground)]/20" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-base">{d.emoji}</span>
                        <div>
                          <div className="text-xs font-bold">{d.title}</div>
                          <div className="text-[10px] text-[var(--foreground)]/30">{d.titleDe}</div>
                        </div>
                      </div>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ color: diffStyle.color, backgroundColor: diffStyle.color + '15' }}
                      >
                        {diffStyle.label}
                      </span>
                      {isComplete && (
                        <span className="text-[10px] text-[#00d9a5] font-bold">DONE</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Perfect bonus */}
            {score === totalBlanks && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full mb-4 px-4 py-3 bg-[#ffd93d]/10 rounded-xl border border-[#ffd93d]/20"
              >
                <p className="text-sm text-[#ffd93d] font-medium text-center">
                  Perfect score bonus: +20 XP
                </p>
              </motion.div>
            )}

            {/* Actions */}
            <div className="w-full space-y-3">
              <GameButton onClick={() => { generateDialogues(); startGame(); }} fullWidth icon={<RefreshCw className="w-5 h-5" />}>
                Play Again
              </GameButton>
              <GameButton variant="ghost" onClick={() => router.push('/games')} fullWidth>
                Back to Games
              </GameButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
