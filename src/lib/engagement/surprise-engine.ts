// Surprise Engine
// Random delight moments that occur with probability checks
// Creates unexpected joy to boost retention

export type SurpriseTrigger = 'correct_answer' | 'login' | 'combo_milestone' | 'vocab_milestone' | 'random';

export interface SurpriseEvent {
  type: 'bonus_xp' | 'fun_fact' | 'appu_trick' | 'cultural_tidbit' | 'kuttan_joke';
  title: string;
  message: string;
  emoji: string;
  xpBonus?: number;
}

// ── Fun facts about Germany ──────────────────────────────────

const FUN_FACTS: SurpriseEvent[] = [
  { type: 'fun_fact', title: 'Did you know?', message: 'Germany has over 1,500 different beers! They take their Reinheitsgebot (beer purity law) from 1516 very seriously.', emoji: '🍺' },
  { type: 'fun_fact', title: 'Did you know?', message: 'Germans eat over 60 million Currywurst per year. Berlin alone has its own Currywurst museum!', emoji: '🌭' },
  { type: 'fun_fact', title: 'Did you know?', message: 'The longest German word ever used in official documents was 80 letters: Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz', emoji: '📜' },
  { type: 'fun_fact', title: 'Did you know?', message: 'Germany has over 300 varieties of bread — more than any other country in the world!', emoji: '🍞' },
  { type: 'fun_fact', title: 'Did you know?', message: 'Sundays in Germany are sacred — most shops are CLOSED. It\'s called "Sonntagsruhe" (Sunday rest).', emoji: '🛌' },
  { type: 'fun_fact', title: 'Did you know?', message: 'The German word "Feierabend" means the time after work ends. There\'s no English equivalent — Germans invented the concept of sacred personal time!', emoji: '🌅' },
  { type: 'fun_fact', title: 'Did you know?', message: 'In Germany, you get money BACK for recycling bottles! It\'s called "Pfand" — usually 25 cents per bottle.', emoji: '♻️' },
  { type: 'fun_fact', title: 'Did you know?', message: 'Germany\'s Autobahn has sections with no speed limit. But most Germans drive responsibly — it\'s about freedom, not recklessness!', emoji: '🏎️' },
];

const CULTURAL_TIDBITS: SurpriseEvent[] = [
  { type: 'cultural_tidbit', title: 'Kerala → Germany', message: 'Over 30,000 Malayalis already live in Germany! Frankfurt, Munich, and Berlin have the biggest communities.', emoji: '🇮🇳' },
  { type: 'cultural_tidbit', title: 'Kerala → Germany', message: 'German nurses from Kerala are highly valued — many hospitals actively recruit from Kerala\'s nursing colleges!', emoji: '🏥' },
  { type: 'cultural_tidbit', title: 'Food Connection', message: 'Germans love Indian food! "Indisches Restaurant" is common in every German city. Your Malayalam cooking skills = instant friendship!', emoji: '🍛' },
  { type: 'cultural_tidbit', title: 'Culture Tip', message: 'In Germany, being 5 minutes late is considered RUDE. But in Kerala... well, we know IST (Indian Stretchable Time)! Time to adjust! 😅', emoji: '⏰' },
];

const KUTTAN_JOKES: SurpriseEvent[] = [
  { type: 'kuttan_joke', title: 'Kuttan says...', message: 'Machane, German grammar is like Kerala politics — everyone has a different opinion about what\'s correct! 😂', emoji: '🤣' },
  { type: 'kuttan_joke', title: 'Kuttan says...', message: 'Why did the German article go to therapy? Because it had an identity crisis — der? die? das? 😅', emoji: '😂' },
  { type: 'kuttan_joke', title: 'Kuttan says...', message: 'German word order: verb at the end, like a Malayalam sentence that forgot where it was going and then suddenly remembered! 🤯', emoji: '🧠' },
];

const BONUS_XP_EVENT: SurpriseEvent = {
  type: 'bonus_xp',
  title: 'Bonus XP Rain!',
  message: 'The learning gods are pleased! Here\'s some extra XP!',
  emoji: '🌟',
  xpBonus: 15,
};

const APPU_TRICK: SurpriseEvent = {
  type: 'appu_trick',
  title: 'Appu says hi!',
  message: 'Appu did a little trunk wave just for you! Keep up the great work!',
  emoji: '🐘',
  xpBonus: 5,
};

// ── Main logic ────────────────────────────────────────────────

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Check if a surprise event should trigger.
 * Returns null most of the time — surprises should be rare and delightful.
 */
export function checkForSurprise(trigger: SurpriseTrigger, context?: { combo?: number; vocabCount?: number }): SurpriseEvent | null {
  const roll = Math.random();

  switch (trigger) {
    case 'correct_answer':
      // 3% chance of bonus XP
      if (roll < 0.03) return BONUS_XP_EVENT;
      // 2% chance of Appu trick
      if (roll < 0.05) return APPU_TRICK;
      return null;

    case 'login':
      // 15% chance of fun fact on login
      if (roll < 0.08) return randomPick(FUN_FACTS);
      if (roll < 0.12) return randomPick(CULTURAL_TIDBITS);
      if (roll < 0.15) return randomPick(KUTTAN_JOKES);
      return null;

    case 'combo_milestone':
      // Always trigger on first combo milestones
      if (context?.combo === 5) return { ...BONUS_XP_EVENT, xpBonus: 10, message: 'Combo 5! Here\'s a bonus!' };
      if (context?.combo === 10) return { ...BONUS_XP_EVENT, xpBonus: 25, message: 'COMBO 10! Massive bonus!' };
      if (context?.combo === 20) return { ...BONUS_XP_EVENT, xpBonus: 50, message: 'COMBO 20! LEGENDARY BONUS!' };
      return null;

    case 'vocab_milestone':
      // Every 50th vocab word
      if (context?.vocabCount && context.vocabCount % 50 === 0) {
        return randomPick(CULTURAL_TIDBITS);
      }
      return null;

    case 'random':
      if (roll < 0.1) return randomPick([...FUN_FACTS, ...CULTURAL_TIDBITS, ...KUTTAN_JOKES]);
      return null;

    default:
      return null;
  }
}
