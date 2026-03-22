/**
 * Auto-add options arrays to all fill-blank exercises that are missing them.
 * Generates 3 plausible wrong options alongside the correct answer.
 */
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');
const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.ts')).sort();

let totalFixed = 0;

// Common German distractors by category
const distractors = {
  verbs: ['mache', 'machst', 'macht', 'machen', 'gehe', 'gehst', 'geht', 'gehen', 'habe', 'hast', 'hat', 'haben', 'bin', 'bist', 'ist', 'sind', 'komme', 'kommst', 'kommt', 'kommen', 'spreche', 'sprichst', 'spricht', 'sprechen', 'lerne', 'lernst', 'lernt', 'lernen', 'esse', 'isst', 'essen', 'fahre', 'fährst', 'fährt', 'fahren', 'sehe', 'siehst', 'sieht', 'sehen', 'arbeite', 'arbeitest', 'arbeitet', 'arbeiten', 'wohne', 'wohnst', 'wohnt', 'wohnen', 'spiele', 'spielst', 'spielt', 'spielen', 'trinke', 'trinkst', 'trinkt', 'trinken', 'lese', 'liest', 'lest', 'lesen', 'schlafe', 'schläfst', 'schläft', 'schlafen', 'nehme', 'nimmst', 'nimmt', 'nehmen', 'gebe', 'gibst', 'gibt', 'geben', 'stehe', 'stehst', 'steht', 'stehen', 'kann', 'kannst', 'können', 'muss', 'musst', 'müssen', 'will', 'willst', 'wollen', 'darf', 'darfst', 'dürfen', 'soll', 'sollst', 'sollen'],
  articles: ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'kein', 'keine', 'keinen', 'keinem', 'mein', 'meine', 'meinen', 'meinem', 'dein', 'deine', 'deinen', 'sein', 'seine', 'seinen', 'ihr', 'ihre', 'ihren'],
  prepositions: ['in', 'auf', 'an', 'unter', 'über', 'vor', 'hinter', 'neben', 'zwischen', 'mit', 'von', 'zu', 'aus', 'bei', 'nach', 'seit', 'für', 'gegen', 'um', 'durch', 'ohne'],
  pronouns: ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'mir', 'dir', 'ihm', 'uns', 'euch', 'ihnen', 'mich', 'dich', 'sich'],
  adjEndings: ['e', 'er', 'es', 'en', 'em'],
  qwords: ['Wie', 'Was', 'Wo', 'Wer', 'Wann', 'Warum', 'Woher', 'Wohin', 'Welche', 'Welcher'],
  timeWords: ['gestern', 'heute', 'morgen', 'jetzt', 'dann', 'danach', 'zuerst', 'später', 'immer', 'oft', 'manchmal', 'nie', 'selten'],
  common: ['ja', 'nein', 'nicht', 'auch', 'sehr', 'gut', 'schlecht', 'gern', 'viel', 'wenig', 'mehr', 'noch', 'schon', 'bald'],
};

function generateOptions(correctAnswer) {
  const answer = correctAnswer.trim();
  const allWords = [
    ...distractors.verbs, ...distractors.articles, ...distractors.prepositions,
    ...distractors.pronouns, ...distractors.qwords, ...distractors.timeWords,
    ...distractors.common,
  ];

  // Filter out the correct answer and find similar-looking words
  const candidates = allWords.filter(w => w.toLowerCase() !== answer.toLowerCase());

  // Try to find words of similar length
  const similarLength = candidates.filter(w => Math.abs(w.length - answer.length) <= 3);
  const pool = similarLength.length >= 3 ? similarLength : candidates;

  // Shuffle and pick 3
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const picked = new Set();
  for (const w of shuffled) {
    if (picked.size >= 3) break;
    if (w.toLowerCase() !== answer.toLowerCase()) {
      picked.add(w);
    }
  }

  // Ensure we have exactly 3 distractors
  while (picked.size < 3) {
    picked.add(candidates[Math.floor(Math.random() * candidates.length)]);
  }

  // Shuffle answer into options
  const options = [answer, ...picked];
  return options.sort(() => Math.random() - 0.5);
}

for (const file of files) {
  const filePath = path.join(modulesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileFixed = 0;

  // Find fill-blank exercises without options
  // Pattern: type: "fill-blank", question: "...", correctAnswer: "..."  (NO options: before correctAnswer)
  const regex = /(\s*\{[^}]*?type:\s*"fill-blank",\s*question:\s*"[^"]*",)\s*(correctAnswer:\s*"([^"]*)")/g;

  let match;
  const replacements = [];

  while ((match = regex.exec(content))) {
    const fullMatch = match[0];
    const beforeAnswer = match[1];
    const answerPart = match[2];
    const correctAnswer = match[3];

    // Check if options already exists between type and correctAnswer
    if (beforeAnswer.includes('options:')) continue;

    const options = generateOptions(correctAnswer);
    const optionsStr = `options: [${options.map(o => `"${o}"`).join(', ')}], `;

    replacements.push({
      original: fullMatch,
      replacement: `${beforeAnswer} ${optionsStr}${answerPart}`,
    });
    fileFixed++;
  }

  // Apply replacements
  for (const r of replacements) {
    content = content.replace(r.original, r.replacement);
  }

  if (fileFixed > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`${file}: Fixed ${fileFixed} exercises`);
    totalFixed += fileFixed;
  }
}

console.log(`\nTotal fixed: ${totalFixed}`);
