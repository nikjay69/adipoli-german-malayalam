// Boss Battle System
// End-of-module challenges that mix exercise types with dramatic presentation

import type { Exercise } from '@/lib/content/types';

export interface BossBattle {
  moduleId: number;
  bossName: string;
  bossNameGerman: string;
  bossEmoji: string;
  description: string;
  kuttanWarning: string;
  /** Exercises mixed from the module */
  rounds: Exercise[];
  /** Total seconds for the entire battle */
  timeLimit: number;
  /** Minimum score % to win */
  passingScore: number;
  /** XP reward for winning */
  xpReward: number;
  /** Scene type for ambience + background */
  sceneType: string;
  /** Optional cosmetic unlock on victory */
  unlockReward?: { id: string; name: string; emoji: string };
}

// ── Boss definitions ──────────────────────────────────────────

export const BOSS_BATTLES: Record<number, BossBattle> = {
  1: {
    moduleId: 1,
    bossName: 'The Border Officer',
    bossNameGerman: 'Der Grenzbeamte',
    bossEmoji: '👮',
    description: 'Prove you can survive your first day in Germany! Answer the officer\'s questions correctly to enter the country!',
    kuttanWarning: 'Machane... border officer ninnod chodikunnu! Ellaam correct-aayi answer cheythal maatre Germany-il keraan pattoo! Ready aano?!',
    sceneType: 'bahnhof',
    timeLimit: 120,
    passingScore: 70,
    xpReward: 200,
    unlockReward: { id: 'passport-stamp', name: 'Passport Stamp', emoji: '📕' },
    rounds: [
      { id: 'boss1-1', type: 'multiple-choice', question: 'The officer says "Guten Tag." It\'s 3 PM. What is the correct response?', options: ['Guten Morgen!', 'Guten Tag!', 'Gute Nacht!', 'Moin!'], correctAnswer: 'Guten Tag!', explanation: 'Guten Tag is correct for afternoon. Morgen = morning, Nacht = night.', xpReward: 10 },
      { id: 'boss1-2', type: 'type-answer', question: 'The officer asks: "Wie heißen Sie?" Type your response starting with "Ich heiße..."', correctAnswer: 'Ich heiße', explanation: '"Ich heiße..." means "My name is..." — the standard formal self-introduction.', xpReward: 15 },
      { id: 'boss1-3', type: 'multiple-choice', question: '"Ihren Pass, bitte." What does the officer want?', options: ['Your phone', 'Your passport', 'Your ticket', 'Your bag'], correctAnswer: 'Your passport', explanation: 'Pass = passport, bitte = please. "Ihren Pass, bitte" = "Your passport, please."', xpReward: 10 },
      { id: 'boss1-4', type: 'fill-blank', question: 'You hand over your passport: "_____, bitte."', options: ['Hier', 'Dort', 'Wo', 'Nein'], correctAnswer: 'Hier', explanation: '"Hier, bitte" = "Here, please" — the most natural way to hand something over.', xpReward: 10 },
      { id: 'boss1-5', type: 'multiple-choice', question: 'The officer says "Willkommen in Deutschland!" What does this mean?', options: ['Welcome to Germany!', 'Goodbye from Germany!', 'Where are you from?', 'How long will you stay?'], correctAnswer: 'Welcome to Germany!', explanation: 'Willkommen = welcome, Deutschland = Germany.', xpReward: 10 },
      { id: 'boss1-6', type: 'type-answer', question: 'How do you say "Thank you!" in German?', correctAnswer: 'Danke', explanation: '"Danke" or "Danke schön" = Thank you. Essential survival word!', xpReward: 10 },
      { id: 'boss1-7', type: 'multiple-choice', question: 'A student says "Hey, wie heißt du?" vs the officer said "Wie heißen Sie?" What\'s the difference?', options: ['du = informal, Sie = formal', 'du = formal, Sie = informal', 'No difference', 'du = plural, Sie = singular'], correctAnswer: 'du = informal, Sie = formal', explanation: '"du" is informal (friends, peers), "Sie" is formal (officials, strangers, older people).', xpReward: 15 },
      { id: 'boss1-8', type: 'fill-blank', question: 'It\'s 8 PM. You arrive at the hotel. The receptionist greets you: "Guten _____!"', options: ['Morgen', 'Tag', 'Abend', 'Nacht'], correctAnswer: 'Abend', explanation: '"Guten Abend" = Good evening. Used from about 6 PM until bedtime.', xpReward: 10 },
      { id: 'boss1-9', type: 'multiple-choice', question: 'You want to say goodbye formally. Which is the safest option?', options: ['Tschüss!', 'Auf Wiedersehen!', 'Moin!', 'Ciao!'], correctAnswer: 'Auf Wiedersehen!', explanation: '"Auf Wiedersehen" is the safest formal goodbye. "Tschüss" is more casual.', xpReward: 10 },
      { id: 'boss1-10', type: 'type-answer', question: 'How do you say "Excuse me" / "Sorry" in German? (the polite version)', correctAnswer: 'Entschuldigung', explanation: '"Entschuldigung" = Excuse me / I\'m sorry. Used to get attention or apologize.', xpReward: 15 },
    ],
  },

  // ── Module 2: Who Are You? ──────────────────────────────────
  2: {
    moduleId: 2,
    bossName: 'The Registration Lady',
    bossNameGerman: 'Die Bürgeramt Dame',
    bossEmoji: '👩‍💼',
    description: 'Survive the dreaded German registration office — prove your identity in German or get sent to the back of the queue!',
    kuttanWarning: 'Machane... Bürgeramt-il queue-il nikkaan ishtam illenkil, ellaa questions-um sheriyaayi answer cheyyanam! Aval strict aanu, full German-il maatre samsaarikku!',
    sceneType: 'office',
    timeLimit: 90,
    passingScore: 70,
    xpReward: 220,
    unlockReward: { id: 'anmeldung-form', name: 'Anmeldung Certificate', emoji: '📋' },
    rounds: [
      { id: 'boss2-1', type: 'multiple-choice', question: 'The lady asks: "Wie heißen Sie?" What is she asking?', options: ['Where do you live?', 'What is your name?', 'What is your job?', 'Where are you from?'], correctAnswer: 'What is your name?', explanation: '"Wie heißen Sie?" = "What is your name?" (formal). Heißen = to be called.', xpReward: 10 },
      { id: 'boss2-2', type: 'type-answer', question: 'She asks where you\'re from. Type: "Ich komme aus..."', correctAnswer: 'Ich komme aus', explanation: '"Ich komme aus..." = "I come from..." — standard way to state your origin.', xpReward: 15 },
      { id: 'boss2-3', type: 'fill-blank', question: '"Was sind Sie _____ Beruf?" — She wants your profession.', options: ['von', 'mit', 'aus', 'in'], correctAnswer: 'von', explanation: '"Was sind Sie von Beruf?" = "What is your profession?" Von Beruf = by profession.', xpReward: 10 },
      { id: 'boss2-4', type: 'multiple-choice', question: '"Ich bin Student." What did you just tell her?', options: ['I am tired.', 'I am a student.', 'I am German.', 'I am lost.'], correctAnswer: 'I am a student.', explanation: 'Student = student. No article needed with professions after "Ich bin."', xpReward: 10 },
      { id: 'boss2-5', type: 'type-answer', question: 'How do you say "I speak English and a little German"?', correctAnswer: 'Ich spreche Englisch und ein bisschen Deutsch', explanation: '"Ich spreche Englisch und ein bisschen Deutsch" — ein bisschen = a little.', xpReward: 15 },
      { id: 'boss2-6', type: 'multiple-choice', question: 'She asks "Buchstabieren Sie bitte." What must you do?', options: ['Sign the form', 'Spell your name', 'Show your passport', 'Pay a fee'], correctAnswer: 'Spell your name', explanation: 'Buchstabieren = to spell. She wants you to spell your name letter by letter.', xpReward: 10 },
      { id: 'boss2-7', type: 'fill-blank', question: '"Ich _____ 24 Jahre alt." — Tell her your age.', options: ['bin', 'bist', 'ist', 'sind'], correctAnswer: 'bin', explanation: '"Ich bin... Jahre alt" = "I am... years old." Bin = am (first person of sein).', xpReward: 10 },
      { id: 'boss2-8', type: 'multiple-choice', question: '"Welche Sprachen sprechen Sie?" What is she asking?', options: ['What is your address?', 'Which languages do you speak?', 'What is your phone number?', 'When did you arrive?'], correctAnswer: 'Which languages do you speak?', explanation: 'Welche Sprachen = which languages, sprechen = speak.', xpReward: 10 },
      { id: 'boss2-9', type: 'type-answer', question: 'She says "Ihre Adresse bitte." What does "Adresse" mean?', correctAnswer: 'address', explanation: '"Adresse" = address. "Ihre Adresse bitte" = "Your address please."', xpReward: 10 },
      { id: 'boss2-10', type: 'fill-blank', question: '"Sind Sie _____?" — She asks if you\'re married.', options: ['verheiratet', 'müde', 'hungrig', 'krank'], correctAnswer: 'verheiratet', explanation: 'Verheiratet = married. A standard question on registration forms.', xpReward: 15 },
    ],
  },

  // ── Module 3: Numbers & Time ────────────────────────────────
  3: {
    moduleId: 3,
    bossName: 'The Ticket Inspector',
    bossNameGerman: 'Der Fahrkartenkontrolleur',
    bossEmoji: '🎫',
    description: 'A stern ticket inspector boards your train — handle numbers, times, and ticket prices correctly or face a 60-euro fine!',
    kuttanWarning: 'Aiyyo! Ticket inspector vannu! Numbers okke sheriyaayi paranjaal maatre fine adikkilla. German-il numbers reverse aanu, manasilaayi alle? Einundzwanzig = one-and-twenty!',
    sceneType: 'bahnhof',
    timeLimit: 100,
    passingScore: 70,
    xpReward: 240,
    unlockReward: { id: 'deutsche-bahn-pass', name: 'DB BahnCard', emoji: '🚂' },
    rounds: [
      { id: 'boss3-1', type: 'multiple-choice', question: 'The inspector says "Ihre Fahrkarte, bitte." What does he want?', options: ['Your passport', 'Your ticket', 'Your phone', 'Your seat number'], correctAnswer: 'Your ticket', explanation: 'Fahrkarte = ticket. "Ihre Fahrkarte, bitte" = "Your ticket, please."', xpReward: 10 },
      { id: 'boss3-2', type: 'type-answer', question: 'Your ticket costs 15 euros. How do you say "fünfzehn" in English?', correctAnswer: 'fifteen', explanation: 'Fünfzehn = fifteen (fünf = five, zehn = ten).', xpReward: 10 },
      { id: 'boss3-3', type: 'fill-blank', question: '"Der Zug fährt um _____ Uhr ab." The train leaves at 3.', options: ['drei', 'vier', 'fünf', 'sechs'], correctAnswer: 'drei', explanation: 'Drei = three. "Um drei Uhr" = "at three o\'clock."', xpReward: 10 },
      { id: 'boss3-4', type: 'multiple-choice', question: '"Siebenundvierzig" — what number is this?', options: ['74', '47', '37', '57'], correctAnswer: '47', explanation: 'Sieben-und-vierzig = seven-and-forty = 47. German reverses the digits!', xpReward: 15 },
      { id: 'boss3-5', type: 'type-answer', question: 'Write the number 23 in German words.', correctAnswer: 'dreiundzwanzig', explanation: 'Drei-und-zwanzig = three-and-twenty = 23.', xpReward: 15 },
      { id: 'boss3-6', type: 'multiple-choice', question: '"Es ist halb drei." What time is it?', options: ['3:30', '2:30', '3:00', '2:00'], correctAnswer: '2:30', explanation: '"Halb drei" = half TO three = 2:30. German counts the NEXT hour!', xpReward: 15 },
      { id: 'boss3-7', type: 'fill-blank', question: '"Die Fahrkarte kostet _____ Euro fünfzig." The ticket is 12.50.', options: ['zehn', 'elf', 'zwölf', 'dreizehn'], correctAnswer: 'zwölf', explanation: 'Zwölf = twelve. 12,50 Euro = zwölf Euro fünfzig.', xpReward: 10 },
      { id: 'boss3-8', type: 'multiple-choice', question: 'The inspector says "Gleis sieben." Where should you go?', options: ['Platform 7', 'Seat 7', 'Car 7', 'Exit 7'], correctAnswer: 'Platform 7', explanation: 'Gleis = platform/track. "Gleis sieben" = Platform 7.', xpReward: 10 },
      { id: 'boss3-9', type: 'type-answer', question: 'How do you say "What time is it?" in German?', correctAnswer: 'Wie spät ist es', explanation: '"Wie spät ist es?" literally = "How late is it?" — the standard way to ask time.', xpReward: 15 },
      { id: 'boss3-10', type: 'fill-blank', question: '"Mein Zug kommt um Viertel _____ fünf." My train comes at quarter past five.', options: ['vor', 'nach', 'halb', 'um'], correctAnswer: 'nach', explanation: '"Viertel nach" = quarter past. "Viertel vor" = quarter to.', xpReward: 10 },
    ],
  },

  // ── Module 4: Family & People ───────────────────────────────
  4: {
    moduleId: 4,
    bossName: 'The Nosy Neighbor',
    bossNameGerman: 'Die neugierige Nachbarin',
    bossEmoji: '👵',
    description: 'Your German neighbor wants to know EVERYTHING about your family — describe your Kerala kudumbam without making mistakes!',
    kuttanWarning: 'Machane, ee Nachbarin full curious aanu! Ninte family-ye patti ellaam chodyam chodikyum. Mein, meine, der, die okke sheriyaayi use cheyyaanam, illenkil aval confuse aavum!',
    sceneType: 'kitchen',
    timeLimit: 110,
    passingScore: 70,
    xpReward: 260,
    unlockReward: { id: 'family-photo', name: 'Family Photo Frame', emoji: '🖼️' },
    rounds: [
      { id: 'boss4-1', type: 'multiple-choice', question: '"Haben Sie Geschwister?" What is the neighbor asking?', options: ['Do you have pets?', 'Do you have siblings?', 'Do you have children?', 'Do you have friends?'], correctAnswer: 'Do you have siblings?', explanation: 'Geschwister = siblings. "Haben Sie Geschwister?" = "Do you have siblings?"', xpReward: 10 },
      { id: 'boss4-2', type: 'fill-blank', question: '"_____ Mutter heißt Lakshmi." — My mother\'s name is Lakshmi.', options: ['Mein', 'Meine', 'Meinen', 'Meinem'], correctAnswer: 'Meine', explanation: 'Mutter is feminine (die Mutter), so possessive = meine.', xpReward: 15 },
      { id: 'boss4-3', type: 'type-answer', question: 'How do you say "my father" in German?', correctAnswer: 'mein Vater', explanation: 'Vater = father (masculine, der Vater). So: mein Vater.', xpReward: 10 },
      { id: 'boss4-4', type: 'multiple-choice', question: '"Mein Bruder ist groß und lustig." What is your brother like?', options: ['Small and shy', 'Tall and funny', 'Old and strict', 'Young and quiet'], correctAnswer: 'Tall and funny', explanation: 'Groß = tall/big, lustig = funny.', xpReward: 10 },
      { id: 'boss4-5', type: 'fill-blank', question: '"Ich habe _____ Schwester und zwei Brüder." — I have one sister and two brothers.', options: ['ein', 'eine', 'einen', 'einer'], correctAnswer: 'eine', explanation: 'Schwester is feminine — "eine Schwester." Brüder is the plural of Bruder.', xpReward: 15 },
      { id: 'boss4-6', type: 'multiple-choice', question: 'Which word means "grandmother" in German?', options: ['Tante', 'Cousine', 'Großmutter', 'Schwägerin'], correctAnswer: 'Großmutter', explanation: 'Großmutter = grandmother. Groß = big/grand, Mutter = mother.', xpReward: 10 },
      { id: 'boss4-7', type: 'type-answer', question: 'The neighbor asks about your uncle. How do you say "my uncle" in German?', correctAnswer: 'mein Onkel', explanation: 'Onkel = uncle (masculine, der Onkel). So: mein Onkel.', xpReward: 10 },
      { id: 'boss4-8', type: 'fill-blank', question: '"_____ Eltern wohnen in Kerala." — My parents live in Kerala.', options: ['Mein', 'Meine', 'Meinen', 'Meinem'], correctAnswer: 'Meine', explanation: 'Eltern (parents) is always plural — so possessive = meine.', xpReward: 10 },
      { id: 'boss4-9', type: 'multiple-choice', question: '"Meine Schwester ist älter als ich." What does this mean?', options: ['My sister is taller than me.', 'My sister is older than me.', 'My sister is smarter than me.', 'My sister is nicer than me.'], correctAnswer: 'My sister is older than me.', explanation: 'Älter = older (comparative of alt). "Älter als ich" = older than me.', xpReward: 15 },
      { id: 'boss4-10', type: 'type-answer', question: 'How do you say "We are a big family" in German?', correctAnswer: 'Wir sind eine große Familie', explanation: '"Wir sind eine große Familie." Groß → große (feminine adjective ending).', xpReward: 15 },
    ],
  },

  // ── Module 5: Daily Routine ─────────────────────────────────
  5: {
    moduleId: 5,
    bossName: 'The Strict Boss',
    bossNameGerman: 'Der strenge Chef',
    bossEmoji: '👔',
    description: 'Your German boss interviews you about your daily routine — describe your day perfectly to land the job!',
    kuttanWarning: 'Eda, ee Chef angane valya strict aanu! Ninte daily routine German-il sheriyaayi parayaanam. Separable verbs marakkaruthu — aufstehen, anfangen okke verb end-il varum!',
    sceneType: 'office',
    timeLimit: 120,
    passingScore: 70,
    xpReward: 280,
    unlockReward: { id: 'job-contract', name: 'Arbeitsvertrag', emoji: '📝' },
    rounds: [
      { id: 'boss5-1', type: 'multiple-choice', question: '"Wann stehen Sie auf?" What is the boss asking?', options: ['When do you eat?', 'When do you wake up?', 'When do you arrive?', 'When do you sleep?'], correctAnswer: 'When do you wake up?', explanation: 'Aufstehen = to get up/wake up. "Wann stehen Sie auf?" = "When do you get up?"', xpReward: 10 },
      { id: 'boss5-2', type: 'type-answer', question: 'Say "I get up at 7 o\'clock" in German.', correctAnswer: 'Ich stehe um sieben Uhr auf', explanation: 'Aufstehen is separable: "Ich stehe... auf." The prefix goes to the end.', xpReward: 15 },
      { id: 'boss5-3', type: 'fill-blank', question: '"Ich _____ um 8 Uhr." — I eat breakfast at 8.', options: ['frühstücke', 'schlafe', 'arbeite', 'koche'], correctAnswer: 'frühstücke', explanation: 'Frühstücken = to eat breakfast. "Ich frühstücke" = I eat breakfast.', xpReward: 10 },
      { id: 'boss5-4', type: 'multiple-choice', question: '"Ich dusche mich und ziehe mich an." What are you doing?', options: ['Cooking and eating', 'Showering and getting dressed', 'Working and resting', 'Reading and writing'], correctAnswer: 'Showering and getting dressed', explanation: 'Sich duschen = to shower, sich anziehen = to get dressed. Both are reflexive verbs.', xpReward: 10 },
      { id: 'boss5-5', type: 'fill-blank', question: '"Ich _____ von 9 bis 17 Uhr." — I work from 9 to 5.', options: ['schlafe', 'arbeite', 'esse', 'lerne'], correctAnswer: 'arbeite', explanation: 'Arbeiten = to work. "Von... bis..." = from... to... (time range).', xpReward: 10 },
      { id: 'boss5-6', type: 'type-answer', question: 'How do you say "I go to bed at 11 PM" in German?', correctAnswer: 'Ich gehe um elf Uhr ins Bett', explanation: '"Ins Bett gehen" = to go to bed. "Um elf Uhr" = at 11 o\'clock.', xpReward: 15 },
      { id: 'boss5-7', type: 'multiple-choice', question: '"Ich fange um 9 Uhr an." What does "anfangen" mean here?', options: ['To finish', 'To start', 'To arrive', 'To leave'], correctAnswer: 'To start', explanation: 'Anfangen = to start/begin. Separable: "Ich fange... an."', xpReward: 10 },
      { id: 'boss5-8', type: 'fill-blank', question: '"Nach der Arbeit _____ ich gern." — After work I like to cook.', options: ['koche', 'schlafe', 'laufe', 'trinke'], correctAnswer: 'koche', explanation: 'Kochen = to cook. "Nach der Arbeit" = after work. Gern = with pleasure/like to.', xpReward: 10 },
      { id: 'boss5-9', type: 'multiple-choice', question: '"Ich fahre mit dem Bus zur Arbeit." How do you get to work?', options: ['By car', 'By bus', 'By train', 'On foot'], correctAnswer: 'By bus', explanation: '"Mit dem Bus" = by bus. "Zur Arbeit" = to work.', xpReward: 10 },
      { id: 'boss5-10', type: 'type-answer', question: 'The boss says "Beschreiben Sie Ihren Abend." What does "Abend" mean?', correctAnswer: 'evening', explanation: '"Abend" = evening. He wants you to describe your evening routine.', xpReward: 15 },
    ],
  },

  // ── Module 6: Food & Drink ──────────────────────────────────
  6: {
    moduleId: 6,
    bossName: 'The Star Chef',
    bossNameGerman: 'Der Sternekoch',
    bossEmoji: '👨‍🍳',
    description: 'A Michelin-star chef tests your German food vocabulary — order a full meal correctly or go hungry tonight!',
    kuttanWarning: 'Machane, ee chef-inte restaurant-il menu German-il maatre undu! Nee sheriyaayi order cheythillenkil biriyani-kku pakaram sauerkraut kittum! Food words ellaam padichittunde alle?',
    sceneType: 'cafe',
    timeLimit: 110,
    passingScore: 70,
    xpReward: 300,
    unlockReward: { id: 'golden-fork', name: 'Golden Fork', emoji: '🍴' },
    rounds: [
      { id: 'boss6-1', type: 'multiple-choice', question: 'The waiter says "Was möchten Sie bestellen?" What should you do?', options: ['Pay the bill', 'Place your order', 'Ask for the menu', 'Leave a tip'], correctAnswer: 'Place your order', explanation: '"Was möchten Sie bestellen?" = "What would you like to order?" Bestellen = to order.', xpReward: 10 },
      { id: 'boss6-2', type: 'type-answer', question: 'Order water: "Ich möchte ein Glas Wasser, bitte." What does "Wasser" mean?', correctAnswer: 'water', explanation: 'Wasser = water. "Ein Glas Wasser" = a glass of water.', xpReward: 10 },
      { id: 'boss6-3', type: 'fill-blank', question: '"Ich hätte gern _____ Schnitzel." — I\'d like a schnitzel.', options: ['ein', 'eine', 'einen', 'einem'], correctAnswer: 'ein', explanation: 'Schnitzel is neuter (das Schnitzel). Accusative neuter = ein.', xpReward: 15 },
      { id: 'boss6-4', type: 'multiple-choice', question: '"Ich esse gern Hähnchen mit Reis." What do you like eating?', options: ['Fish with bread', 'Chicken with rice', 'Pork with noodles', 'Beef with potatoes'], correctAnswer: 'Chicken with rice', explanation: 'Hähnchen = chicken, Reis = rice. "Gern" = with pleasure/like to.', xpReward: 10 },
      { id: 'boss6-5', type: 'type-answer', question: 'How do you say "The food is delicious" in German?', correctAnswer: 'Das Essen ist lecker', explanation: '"Das Essen ist lecker." Essen = food, lecker = delicious.', xpReward: 15 },
      { id: 'boss6-6', type: 'fill-blank', question: '"Zum _____ nehme ich einen Kuchen." — For dessert I\'ll have a cake.', options: ['Frühstück', 'Nachtisch', 'Mittag', 'Abend'], correctAnswer: 'Nachtisch', explanation: 'Nachtisch = dessert. "Zum Nachtisch" = for dessert.', xpReward: 10 },
      { id: 'boss6-7', type: 'multiple-choice', question: '"Ich trinke keinen Alkohol." What are you telling the waiter?', options: ['I want more alcohol.', 'I don\'t drink alcohol.', 'I like alcohol.', 'I need alcohol.'], correctAnswer: 'I don\'t drink alcohol.', explanation: '"Keinen" = no/not any. "Ich trinke keinen Alkohol" = I don\'t drink alcohol.', xpReward: 10 },
      { id: 'boss6-8', type: 'type-answer', question: 'Ask for the bill: "Die Rechnung, bitte." What does "Rechnung" mean?', correctAnswer: 'bill', explanation: '"Die Rechnung" = the bill/check. Essential restaurant survival word!', xpReward: 10 },
      { id: 'boss6-9', type: 'fill-blank', question: '"Ich bin _____." — I am full (not hungry anymore).', options: ['hungrig', 'durstig', 'satt', 'müde'], correctAnswer: 'satt', explanation: 'Satt = full/satisfied (after eating). Hungrig = hungry, durstig = thirsty.', xpReward: 10 },
      { id: 'boss6-10', type: 'multiple-choice', question: 'You want to say "I\'d like a coffee with milk." Which is correct?', options: ['Ich möchte einen Kaffee mit Milch.', 'Ich möchte ein Kaffee mit Milch.', 'Ich möchte eine Kaffee mit Milch.', 'Ich möchte einem Kaffee mit Milch.'], correctAnswer: 'Ich möchte einen Kaffee mit Milch.', explanation: 'Kaffee is masculine (der Kaffee). Accusative = einen. "Mit Milch" = with milk.', xpReward: 15 },
    ],
  },

  // ── Module 7: Shopping & Money ──────────────────────────────
  7: {
    moduleId: 7,
    bossName: 'The Cashier',
    bossNameGerman: 'Die Kassiererin',
    bossEmoji: '🛒',
    description: 'A lightning-fast German cashier fires prices and questions at you — handle your shopping like a pro!',
    kuttanWarning: 'Eda, German supermarket-il cashier angane speed-il aanu! Tüte venamoo, Kassenbon venamoo okke chodikyum. Numbers sheriyaayi parayan padichittille? Ivide cash maatre nadakkoo, card illa!',
    sceneType: 'street',
    timeLimit: 120,
    passingScore: 70,
    xpReward: 320,
    unlockReward: { id: 'shopping-bag', name: 'Einkaufstüte', emoji: '🛍️' },
    rounds: [
      { id: 'boss7-1', type: 'multiple-choice', question: '"Was kostet das?" What are you asking?', options: ['Where is this from?', 'What does this cost?', 'Is this on sale?', 'Can I return this?'], correctAnswer: 'What does this cost?', explanation: '"Was kostet das?" = "What does this cost?" Kosten = to cost.', xpReward: 10 },
      { id: 'boss7-2', type: 'type-answer', question: 'The price is 4,99. Say it in German: "vier Euro..."', correctAnswer: 'vier Euro neunundneunzig', explanation: '4,99 = vier Euro neunundneunzig (four euros ninety-nine).', xpReward: 15 },
      { id: 'boss7-3', type: 'fill-blank', question: '"Das ist zu _____!" — That is too expensive!', options: ['billig', 'teuer', 'groß', 'klein'], correctAnswer: 'teuer', explanation: 'Teuer = expensive. "Zu teuer" = too expensive. Billig = cheap.', xpReward: 10 },
      { id: 'boss7-4', type: 'multiple-choice', question: '"Brauchen Sie eine Tüte?" What is the cashier offering?', options: ['A receipt', 'A bag', 'A discount', 'A loyalty card'], correctAnswer: 'A bag', explanation: 'Tüte = bag. In Germany, you usually pay extra for bags.', xpReward: 10 },
      { id: 'boss7-5', type: 'type-answer', question: 'How do you say "I\'d like to pay" in German?', correctAnswer: 'Ich möchte bezahlen', explanation: '"Ich möchte bezahlen." Bezahlen = to pay. Möchte = would like.', xpReward: 15 },
      { id: 'boss7-6', type: 'fill-blank', question: '"Dieses Kleid ist _____ als das andere." — This dress is cheaper than the other.', options: ['teurer', 'billiger', 'größer', 'schöner'], correctAnswer: 'billiger', explanation: 'Billiger = cheaper (comparative of billig). "Als" = than (for comparisons).', xpReward: 15 },
      { id: 'boss7-7', type: 'multiple-choice', question: '"Kann ich mit Karte zahlen?" What are you asking?', options: ['Can I get a receipt?', 'Can I pay by card?', 'Can I get a refund?', 'Can I have a discount?'], correctAnswer: 'Can I pay by card?', explanation: '"Mit Karte zahlen" = to pay by card. Many German shops prefer cash!', xpReward: 10 },
      { id: 'boss7-8', type: 'fill-blank', question: '"Ich _____ zwei Kilo Äpfel." — I\'d like 2 kilos of apples.', options: ['hätte gern', 'habe gern', 'bin gern', 'esse gern'], correctAnswer: 'hätte gern', explanation: '"Ich hätte gern" = "I would like" — polite way to ask for something when shopping.', xpReward: 10 },
      { id: 'boss7-9', type: 'type-answer', question: 'The cashier says "Das macht zusammen 27,50 Euro." What does "zusammen" mean?', correctAnswer: 'together', explanation: '"Zusammen" = together/in total. "Das macht zusammen..." = "That comes to... in total."', xpReward: 10 },
      { id: 'boss7-10', type: 'multiple-choice', question: 'You want to say the red jacket is the most beautiful. Which is correct?', options: ['Die rote Jacke ist am schönsten.', 'Die rote Jacke ist schöner.', 'Die rote Jacke ist schön.', 'Die rote Jacke ist mehr schön.'], correctAnswer: 'Die rote Jacke ist am schönsten.', explanation: '"Am schönsten" = the most beautiful (superlative). German uses "am + -sten."', xpReward: 15 },
    ],
  },

  // ── Module 8: My Home ───────────────────────────────────────
  8: {
    moduleId: 8,
    bossName: 'The Landlord',
    bossNameGerman: 'Der Vermieter',
    bossEmoji: '🏠',
    description: 'Impress a tough German landlord to get the apartment — describe your needs and understand the lease terms!',
    kuttanWarning: 'Machane, Germany-il apartment kittaan enthu paadu aanu ariyaamalle! Ee Vermieter-odu rooms, furniture, rent okke German-il sheriyaayi samsaarikanam. Dativ prepositions marakalle — in DER Küche, in DEM Zimmer!',
    sceneType: 'kitchen',
    timeLimit: 130,
    passingScore: 70,
    xpReward: 340,
    unlockReward: { id: 'apartment-key', name: 'Wohnungsschlüssel', emoji: '🔑' },
    rounds: [
      { id: 'boss8-1', type: 'multiple-choice', question: '"Wie viele Zimmer hat die Wohnung?" What is the landlord asking?', options: ['How much is the rent?', 'How many rooms does the apartment have?', 'Where is the apartment?', 'When can you move in?'], correctAnswer: 'How many rooms does the apartment have?', explanation: '"Wie viele Zimmer" = how many rooms. Wohnung = apartment.', xpReward: 10 },
      { id: 'boss8-2', type: 'fill-blank', question: '"Die Küche ist neben _____ Bad." — The kitchen is next to the bathroom.', options: ['der', 'dem', 'den', 'das'], correctAnswer: 'dem', explanation: '"Neben" takes Dativ for location. Das Bad (neuter) → dem Bad.', xpReward: 15 },
      { id: 'boss8-3', type: 'type-answer', question: 'How do you say "the bedroom" in German?', correctAnswer: 'das Schlafzimmer', explanation: 'Schlafzimmer = bedroom (Schlaf = sleep + Zimmer = room). Neuter: das.', xpReward: 10 },
      { id: 'boss8-4', type: 'multiple-choice', question: '"Die Miete beträgt 600 Euro warm." What does "Miete" mean?', options: ['Deposit', 'Rent', 'Electricity', 'Insurance'], correctAnswer: 'Rent', explanation: 'Miete = rent. "Warm" means utilities are included. "Kalt" = without utilities.', xpReward: 10 },
      { id: 'boss8-5', type: 'fill-blank', question: '"Der Tisch steht _____ der Küche." — The table is in the kitchen.', options: ['in', 'auf', 'an', 'unter'], correctAnswer: 'in', explanation: '"In der Küche" = in the kitchen. "In" + Dativ for location (die Küche → der Küche).', xpReward: 10 },
      { id: 'boss8-6', type: 'type-answer', question: 'The landlord mentions "Kaution." What does this word mean in English?', correctAnswer: 'deposit', explanation: 'Kaution = security deposit. Usually 2-3 months\' rent in Germany.', xpReward: 10 },
      { id: 'boss8-7', type: 'multiple-choice', question: '"Das Bett steht an der Wand." Where is the bed?', options: ['On the floor', 'By the wall', 'Near the window', 'In the corner'], correctAnswer: 'By the wall', explanation: '"An der Wand" = by/against the wall. "An" + Dativ = at/by.', xpReward: 10 },
      { id: 'boss8-8', type: 'fill-blank', question: '"Ich suche eine Wohnung _____ Balkon." — I\'m looking for an apartment with a balcony.', options: ['mit', 'ohne', 'für', 'bei'], correctAnswer: 'mit', explanation: '"Mit Balkon" = with a balcony. "Mit" always takes Dativ.', xpReward: 10 },
      { id: 'boss8-9', type: 'multiple-choice', question: '"3ZKB" in a German apartment ad means:', options: ['3 floors, kitchen, bath', '3 rooms, kitchen, bath', '3 beds, kitchen, bath', '3 windows, kitchen, bath'], correctAnswer: '3 rooms, kitchen, bath', explanation: 'ZKB = Zimmer (rooms), Küche (kitchen), Bad (bath). Standard German ad shorthand.', xpReward: 15 },
      { id: 'boss8-10', type: 'type-answer', question: 'Say "I can move in on the first of May" in German.', correctAnswer: 'Ich kann am ersten Mai einziehen', explanation: '"Einziehen" = to move in. "Am ersten Mai" = on the first of May (ordinal + Dativ).', xpReward: 15 },
    ],
  },

  // ── Module 9: Travel & Directions ───────────────────────────
  9: {
    moduleId: 9,
    bossName: 'The Bus Driver',
    bossNameGerman: 'Der Busfahrer',
    bossEmoji: '🚌',
    description: 'A grumpy bus driver only speaks German — navigate public transport and give directions to prove you can survive on the streets!',
    kuttanWarning: 'Aiyyo machane, ee bus driver samsaarikkunnathu German maatre aanu! KSRTC-yil kayariya experience undenkilum ivide German vേnam. Links, rechts, geradeaus okke padichittund alle? Bus stop kazhinjaal pani kittum!',
    sceneType: 'bahnhof',
    timeLimit: 150,
    passingScore: 70,
    xpReward: 380,
    unlockReward: { id: 'bus-pass', name: 'Monatskarte', emoji: '🎫' },
    rounds: [
      { id: 'boss9-1', type: 'multiple-choice', question: '"Wohin möchten Sie fahren?" What is the driver asking?', options: ['Where do you come from?', 'Where would you like to go?', 'When did you arrive?', 'How long will you stay?'], correctAnswer: 'Where would you like to go?', explanation: '"Wohin" = where to (direction). "Fahren" = to go/drive.', xpReward: 10 },
      { id: 'boss9-2', type: 'type-answer', question: 'How do you say "I want to go to the train station" in German?', correctAnswer: 'Ich möchte zum Bahnhof fahren', explanation: '"Zum Bahnhof" = to the train station (zu + dem = zum). Bahnhof = train station.', xpReward: 15 },
      { id: 'boss9-3', type: 'fill-blank', question: '"Gehen Sie _____ und dann links." — Go straight and then left.', options: ['rechts', 'geradeaus', 'zurück', 'oben'], correctAnswer: 'geradeaus', explanation: 'Geradeaus = straight ahead. Links = left, rechts = right.', xpReward: 10 },
      { id: 'boss9-4', type: 'multiple-choice', question: '"Ich fahre mit der U-Bahn." How are you traveling?', options: ['By bus', 'By tram', 'By subway', 'By taxi'], correctAnswer: 'By subway', explanation: 'U-Bahn = subway/underground. S-Bahn = city rail, Straßenbahn = tram.', xpReward: 10 },
      { id: 'boss9-5', type: 'type-answer', question: 'Ask "Where is the bus stop?" in German.', correctAnswer: 'Wo ist die Bushaltestelle', explanation: '"Bushaltestelle" = bus stop. "Wo ist...?" = "Where is...?"', xpReward: 15 },
      { id: 'boss9-6', type: 'fill-blank', question: '"Sie müssen an der nächsten Haltestelle _____." — You must get off at the next stop.', options: ['einsteigen', 'aussteigen', 'umsteigen', 'abfahren'], correctAnswer: 'aussteigen', explanation: 'Aussteigen = to get off/exit. Einsteigen = to get on. Umsteigen = to transfer.', xpReward: 15 },
      { id: 'boss9-7', type: 'multiple-choice', question: '"Nehmen Sie die zweite Straße rechts." What should you do?', options: ['Take the second street on the left.', 'Take the second street on the right.', 'Cross the second bridge.', 'Turn around at the second light.'], correctAnswer: 'Take the second street on the right.', explanation: '"Die zweite Straße rechts" = the second street on the right. Rechts = right.', xpReward: 10 },
      { id: 'boss9-8', type: 'fill-blank', question: '"Ich _____ nach Berlin fliegen." — I want to fly to Berlin.', options: ['kann', 'muss', 'möchte', 'darf'], correctAnswer: 'möchte', explanation: '"Möchte" = would like to. Modal verb — the main verb "fliegen" goes to the end.', xpReward: 10 },
      { id: 'boss9-9', type: 'type-answer', question: 'The driver says "Umsteigen!" What does he want you to do?', correctAnswer: 'transfer', explanation: '"Umsteigen" = to transfer/change (buses/trains). You need to switch to another line.', xpReward: 10 },
      { id: 'boss9-10', type: 'multiple-choice', question: '"Wie weit ist es zum Flughafen?" What are you asking?', options: ['How expensive is the airport?', 'How far is it to the airport?', 'When does the airport close?', 'Where is the airport entrance?'], correctAnswer: 'How far is it to the airport?', explanation: '"Wie weit" = how far. "Flughafen" = airport. "Zum" = to the.', xpReward: 15 },
    ],
  },
};

export function getBossBattle(moduleId: number): BossBattle | undefined {
  return BOSS_BATTLES[moduleId];
}

export function isBossUnlocked(moduleId: number, completedLessons: { lessonId: string }[], allLessons: { id: string }[]): boolean {
  return allLessons.every(lesson => completedLessons.some(cl => cl.lessonId === lesson.id));
}
