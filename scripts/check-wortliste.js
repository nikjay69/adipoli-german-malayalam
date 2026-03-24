/**
 * Cross-reference course vocabulary against Goethe A1 core words
 * Run: node scripts/check-wortliste.js
 */
const fs = require('fs');
const path = require('path');

// Core Goethe A1 vocabulary (essential words that are highly likely to be tested)
const GOETHE_A1_CORE = [
  // Greetings & Polite
  'Hallo', 'Guten Morgen', 'Guten Tag', 'Guten Abend', 'Gute Nacht',
  'Tschüss', 'Auf Wiedersehen', 'Bitte', 'Danke', 'Entschuldigung',
  // Personal info
  'Name', 'Vorname', 'Nachname', 'Adresse', 'Straße', 'Telefonnummer',
  'Alter', 'Geburtstag', 'Geburtsdatum', 'Geburtsort', 'Beruf',
  // Pronouns
  'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr',
  // Core verbs
  'sein', 'haben', 'machen', 'gehen', 'kommen', 'sprechen', 'lernen',
  'arbeiten', 'wohnen', 'heißen', 'spielen', 'lesen', 'schreiben',
  'essen', 'trinken', 'kaufen', 'kosten', 'brauchen', 'möchten',
  'können', 'müssen', 'dürfen', 'wollen', 'fahren', 'fliegen',
  'nehmen', 'geben', 'schlafen', 'aufstehen', 'kochen', 'helfen',
  'verstehen', 'finden', 'sehen', 'hören',
  // Family
  'Mutter', 'Vater', 'Bruder', 'Schwester', 'Kind', 'Eltern', 'Familie',
  'Großmutter', 'Großvater', 'Tochter', 'Sohn', 'Frau', 'Mann',
  // Numbers
  'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn',
  // Time
  'Uhr', 'Stunde', 'Minute', 'Tag', 'Woche', 'Monat', 'Jahr',
  'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag',
  'heute', 'morgen', 'gestern',
  // Food & Drink
  'Brot', 'Wasser', 'Kaffee', 'Tee', 'Milch', 'Reis', 'Fleisch',
  'Obst', 'Gemüse', 'Ei', 'Käse', 'Butter', 'Zucker', 'Salz',
  // Body & Health
  'Kopf', 'Arm', 'Bein', 'Auge', 'Hand', 'Fuß',
  'krank', 'gesund', 'Schmerzen', 'Fieber', 'Arzt', 'Apotheke',
  // Places
  'Haus', 'Wohnung', 'Zimmer', 'Küche', 'Schule', 'Büro',
  'Bahnhof', 'Flughafen', 'Supermarkt', 'Restaurant', 'Bank', 'Post',
  'Krankenhaus', 'Kirche', 'Stadt',
  // Transport
  'Bus', 'Zug', 'Auto', 'Fahrrad', 'Fahrkarte', 'Straßenbahn',
  // Rooms & Furniture
  'Tisch', 'Stuhl', 'Bett', 'Schrank', 'Lampe', 'Sofa',
  'Wohnzimmer', 'Schlafzimmer', 'Badezimmer', 'Balkon',
  // Clothing
  'Hemd', 'Hose', 'Kleid', 'Jacke', 'Schuhe', 'Mantel',
  // Adjectives
  'groß', 'klein', 'gut', 'schlecht', 'schön', 'alt', 'jung', 'neu',
  'teuer', 'billig', 'kalt', 'warm', 'heiß', 'nett', 'freundlich',
  // Question words
  'was', 'wer', 'wo', 'wann', 'wie', 'warum', 'woher', 'wohin',
  // Articles & Prepositions
  'der', 'die', 'das', 'ein', 'eine',
  'in', 'auf', 'an', 'mit', 'von', 'zu', 'nach', 'für',
  // Common words
  'ja', 'nein', 'nicht', 'kein', 'auch', 'sehr', 'gern',
  'und', 'oder', 'aber', 'viel', 'wenig', 'noch', 'schon',
  // Weather
  'Wetter', 'Sonne', 'Regen', 'kalt', 'warm',
  // Countries
  'Deutschland', 'Indien',
];

// Extract all German words from module files
const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');
const allGerman = new Set();
const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const content = fs.readFileSync(path.join(modulesDir, file), 'utf8');
  const matches = content.match(/german:\s*"([^"]+)"/g) || [];
  matches.forEach(m => {
    const word = m.match(/german:\s*"([^"]+)"/)[1];
    allGerman.add(word);
    // Also add individual words from phrases
    word.split(/\s+/).forEach(w => allGerman.add(w));
  });

  // Also check examples and exercises for German words
  const examples = content.match(/example:\s*"([^"]+)"/g) || [];
  examples.forEach(m => {
    const text = m.match(/example:\s*"([^"]+)"/)[1];
    text.split(/\s+/).forEach(w => {
      if (w.length > 2 && /^[A-ZÄÖÜ]/.test(w)) allGerman.add(w.replace(/[.,!?]$/, ''));
    });
  });
}

console.log(`Course vocabulary: ${allGerman.size} unique words/phrases`);
console.log(`Goethe A1 core list: ${GOETHE_A1_CORE.length} words\n`);

// Check coverage
const covered = [];
const missing = [];

for (const word of GOETHE_A1_CORE) {
  const found = allGerman.has(word) ||
    allGerman.has(word.toLowerCase()) ||
    [...allGerman].some(g => g.toLowerCase().includes(word.toLowerCase()));

  if (found) covered.push(word);
  else missing.push(word);
}

const coverage = Math.round((covered.length / GOETHE_A1_CORE.length) * 100);
console.log(`=== COVERAGE: ${covered.length}/${GOETHE_A1_CORE.length} (${coverage}%) ===\n`);

if (missing.length > 0) {
  console.log(`MISSING (${missing.length} words):`);
  missing.forEach(w => console.log(`  ❌ ${w}`));
} else {
  console.log('✅ 100% coverage — all Goethe A1 core words present!');
}
