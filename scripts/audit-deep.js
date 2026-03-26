const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');
const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.ts')).sort();

let issues = [];
let stats = { lessons: 0, videos: 0, exercises: 0, vocab: 0, totalXP: 0 };

// ============================================================
// 1. STRUCTURAL & CONTENT CHECKS FOR EACH MODULE
// ============================================================

for (const file of files) {
  const content = fs.readFileSync(path.join(modulesDir, file), 'utf-8');
  const moduleNum = file.replace('module-', '').replace('.ts', '');
  
  // Count content
  const lessonCount = (content.match(/id:\s*["']\d+-\d+["']/g) || []).length;
  const exerciseCount = (content.match(/id:\s*["']ex\d/g) || []).length;
  const vocabCount = (content.match(/id:\s*["']vocab\d/g) || []).length;
  const videoCount = (content.match(/id:\s*["']v\d+-\d+-\d+["']/g) || []).length;
  
  stats.lessons += lessonCount;
  stats.videos += videoCount;
  stats.exercises += exerciseCount;
  stats.vocab += vocabCount;
  
  // XP calculation
  const xpMatches = content.match(/xpReward:\s*(\d+)/g) || [];
  const moduleXP = xpMatches.reduce((sum, m) => sum + parseInt(m.match(/(\d+)/)[1]), 0);
  stats.totalXP += moduleXP;
  
  // --- CHECK: German grammar errors in example sentences ---
  
  // Common wrong German patterns
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    
    // Check: "Ich bin ein/eine + profession" (wrong in German)
    if (/Ich bin eine?\s+(Ingenieur|Arzt|Lehrer|Student|Koch|Kellner|Krankenpfleger|Programmierer|Krankenschwester|Lehrerin|Studentin|Ärztin)/i.test(line) && 
        !line.includes('WRONG') && !line.includes('mistake') && !line.includes('English says') && !line.includes('correctAnswer')) {
      issues.push({mod: moduleNum, line: lineNum, type: 'GERMAN', msg: 'Article before profession (should be omitted in German)'});
    }
    
    // Check: Wrong Guten/Gute pairing  
    if (/Gute Morgen/.test(line) && !line.includes('Gute Morgen') || false) {
      // skip  
    }
    if (/Guten Nacht/.test(line) && !line.includes('WRONG') && !line.includes('mistake')) {
      issues.push({mod: moduleNum, line: lineNum, type: 'GERMAN', msg: 'Guten Nacht should be Gute Nacht'});
    }
    
    // Check: "Ich komme von" (should be "aus")
    if (/Ich komme von\s+[A-Z]/.test(line) && !line.includes('option') && !line.includes('WRONG')) {
      issues.push({mod: moduleNum, line: lineNum, type: 'GERMAN', msg: '"Ich komme von" should be "Ich komme aus"'});
    }
    
    // Check: Incorrect verb conjugation patterns
    if (/du\s+spreche\b/.test(line) && !line.includes('WRONG')) {
      issues.push({mod: moduleNum, line: lineNum, type: 'GERMAN', msg: '"du spreche" should be "du sprichst"'});
    }
    if (/er\s+spreche\b/.test(line) && !line.includes('WRONG') && !line.includes('Konjunktiv')) {
      issues.push({mod: moduleNum, line: lineNum, type: 'GERMAN', msg: '"er spreche" should be "er spricht"'});
    }
    if (/ich\s+bist\b/.test(line) && !line.includes('WRONG')) {
      issues.push({mod: moduleNum, line: lineNum, type: 'GERMAN', msg: '"ich bist" should be "ich bin"'});
    }
    if (/du\s+bin\b/.test(line) && !line.includes('WRONG') && !line.includes('RIGHT')) {
      issues.push({mod: moduleNum, line: lineNum, type: 'GERMAN', msg: '"du bin" should be "du bist"'});
    }
    
    // Check: Missing capitalization of German nouns in example sentences
    // (This is too complex for simple regex, skip)
    
    // Check: Pronunciation field issues - empty or clearly wrong
    if (/pronunciation:\s*["']["']/.test(line)) {
      issues.push({mod: moduleNum, line: lineNum, type: 'MISSING', msg: 'Empty pronunciation field'});
    }
    if (/malayalam:\s*["']["']/.test(line)) {
      issues.push({mod: moduleNum, line: lineNum, type: 'MISSING', msg: 'Empty Malayalam field'});
    }
    if (/english:\s*["']["']/.test(line)) {
      issues.push({mod: moduleNum, line: lineNum, type: 'MISSING', msg: 'Empty English field'});
    }
    if (/explanation:\s*["']["']/.test(line)) {
      issues.push({mod: moduleNum, line: lineNum, type: 'MISSING', msg: 'Empty explanation field'});
    }
    
    // Check: correctAnswer not in options
    // (complex, need multi-line parsing)
    
    // Check: Typos in common German words
    if (/Wiedersehn(?!g)/.test(line)) {
      issues.push({mod: moduleNum, line: lineNum, type: 'TYPO', msg: 'Wiedersehn should be Wiedersehen'});
    }
    if (/Entschuldung/.test(line)) {
      issues.push({mod: moduleNum, line: lineNum, type: 'TYPO', msg: 'Entschuldung should be Entschuldigung'});
    }
    if (/Tschuss(?!ü)/.test(line) && !/Tschüss/.test(line)) {
      // May be intentional ASCII
    }
    
    // Check Malayalam: common transliteration issues
    // (Would need Malayalam expertise to validate properly)
  }
  
  console.log(`Module ${moduleNum}: ${lessonCount} lessons, ${videoCount} videos, ${exerciseCount} exercises, ${vocabCount} vocab, ${moduleXP} XP`);
}

// ============================================================
// 2. CROSS-MODULE PEDAGOGICAL FLOW CHECKS
// ============================================================
console.log('\n=== PEDAGOGICAL FLOW ANALYSIS ===');

// Check vocab progression - are concepts introduced before being tested?
// Check that Module N doesn't reference Module N+2 concepts

// ============================================================
// 3. CHECK CORRECT ANSWER IS IN OPTIONS
// ============================================================

for (const file of files) {
  const content = fs.readFileSync(path.join(modulesDir, file), 'utf-8');
  const moduleNum = file.replace('module-', '').replace('.ts', '');
  
  // Parse exercises with options
  const exerciseRegex = /id:\s*["'](ex[^"']+)["'][\s\S]*?type:\s*["']([^"']+)["'][\s\S]*?options:\s*\[([\s\S]*?)\][\s\S]*?correctAnswer:\s*["']([^"']+)["']/g;
  let match;
  
  while ((match = exerciseRegex.exec(content)) !== null) {
    const exId = match[1];
    const exType = match[2];
    const optionsStr = match[3];
    const correctAnswer = match[4];
    
    if (exType === 'multiple-choice' || exType === 'fill-blank') {
      // Extract options
      const opts = optionsStr.match(/["']([^"']+)["']/g);
      if (opts) {
        const optValues = opts.map(o => o.replace(/["']/g, ''));
        if (!optValues.includes(correctAnswer)) {
          issues.push({mod: moduleNum, line: 0, type: 'ANSWER_NOT_IN_OPTIONS', msg: `Exercise ${exId}: correctAnswer "${correctAnswer}" not found in options: [${optValues.join(', ')}]`});
        }
      }
    }
  }
}

// ============================================================
// 4. CHECK FOR DUPLICATE EXERCISE QUESTIONS
// ============================================================

const allQuestions = new Map();
for (const file of files) {
  const content = fs.readFileSync(path.join(modulesDir, file), 'utf-8');
  const moduleNum = file.replace('module-', '').replace('.ts', '');
  
  const qRegex = /question:\s*["']([^"']+)["']/g;
  let match;
  while ((match = qRegex.exec(content)) !== null) {
    const q = match[1];
    if (allQuestions.has(q)) {
      issues.push({mod: moduleNum, line: 0, type: 'DUPE_QUESTION', msg: `Duplicate question (also in M${allQuestions.get(q)}): "${q.substring(0, 60)}..."`});
    } else {
      allQuestions.set(q, moduleNum);
    }
  }
}

// ============================================================
// 5. PRINT RESULTS
// ============================================================

console.log('\n=== COURSE TOTALS ===');
console.log(`Total Lessons: ${stats.lessons}`);
console.log(`Total Videos: ${stats.videos}`);
console.log(`Total Exercises: ${stats.exercises}`);
console.log(`Total Vocabulary: ${stats.vocab}`);
console.log(`Total XP Available: ${stats.totalXP}`);

console.log('\n=== REAL ISSUES FOUND ===');
const issuesByType = {};
for (const issue of issues) {
  issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
  console.log(`[M${issue.mod}:L${issue.line}] ${issue.type}: ${issue.msg}`);
}

console.log('\n=== ISSUE SUMMARY ===');
for (const [type, count] of Object.entries(issuesByType)) {
  console.log(`${type}: ${count}`);
}
console.log(`\nTotal real issues: ${issues.length}`);
