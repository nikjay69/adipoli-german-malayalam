const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');
const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.ts')).sort();

let totalIssues = [];
let courseStats = { lessons: 0, videos: 0, exercises: 0, vocab: 0 };

for (const file of files) {
  const content = fs.readFileSync(path.join(modulesDir, file), 'utf-8');
  const moduleNum = file.replace('module-', '').replace('.ts', '');
  
  // Count content items
  const lessonCount = (content.match(/id:\s*["'](\d+-\d+)["']/g) || []).length;
  const exerciseCount = (content.match(/id:\s*["']ex\d+-\d+-\d+["']/g) || []).length;
  const vocabCount = (content.match(/id:\s*["']vocab\d+-\d+-\d+["']/g) || []).length;
  const videoCount = (content.match(/id:\s*["']v\d+-\d+-\d+["']/g) || []).length;
  
  courseStats.lessons += lessonCount;
  courseStats.videos += videoCount;
  courseStats.exercises += exerciseCount;
  courseStats.vocab += vocabCount;
  
  // Check for duplicate IDs
  const allIds = content.match(/id:\s*["'][^"']+["']/g) || [];
  const idValues = allIds.map(m => m.match(/["']([^"']+)["']/)[1]);
  const duplicates = idValues.filter((item, index) => idValues.indexOf(item) !== index);
  if (duplicates.length > 0) {
    totalIssues.push({module: moduleNum, type: 'DUPLICATE_ID', details: [...new Set(duplicates)].join(', ')});
  }
  
  // Check for empty correctAnswer
  const emptyAnswers = content.match(/correctAnswer:\s*["']["']/g);
  if (emptyAnswers) {
    totalIssues.push({module: moduleNum, type: 'EMPTY_ANSWER', details: `${emptyAnswers.length} exercises with empty correctAnswer`});
  }
  
  // Check lessonId sequence consistency
  const lessonIds = (content.match(/id:\s*["'](\d+-\d+)["']/g) || []).map(m => m.match(/["']([^"']+)["']/)[1]);
  for (const lid of lessonIds) {
    const [mod, les] = lid.split('-');
    if (mod !== moduleNum) {
      totalIssues.push({module: moduleNum, type: 'WRONG_MODULE_REF', details: `Lesson ${lid} in module ${moduleNum}`});
    }
  }
  
  // Check exercise IDs match their lesson
  const exerciseIds = (content.match(/id:\s*["']ex(\d+-\d+-\d+)["']/g) || []).map(m => m.match(/["']ex([^"']+)["']/)[1]);
  for (const eid of exerciseIds) {
    const parts = eid.split('-');
    if (parts[0] !== moduleNum) {
      totalIssues.push({module: moduleNum, type: 'WRONG_EX_ID', details: `Exercise ex${eid} in module ${moduleNum}`});
    }
  }
  
  // Check vocab IDs match their lesson
  const vocabIds = (content.match(/id:\s*["']vocab(\d+-\d+-\d+)["']/g) || []).map(m => m.match(/["']vocab([^"']+)["']/)[1]);
  for (const vid of vocabIds) {
    const parts = vid.split('-');
    if (parts[0] !== moduleNum) {
      totalIssues.push({module: moduleNum, type: 'WRONG_VOCAB_ID', details: `Vocab vocab${vid} in module ${moduleNum}`});
    }
  }
  
  // --- GERMAN LANGUAGE CHECKS ---
  
  // Check for wrong article before professions in German examples
  const articleProfession = content.match(/Ich bin ein[e]?\s+(Ingenieur|Arzt|Lehrer|Student|Programmierer|Koch|Kellner|Krankenpfleger|Krankenschwester)/g);
  if (articleProfession) {
    totalIssues.push({module: moduleNum, type: 'GERMAN_GRAMMAR', details: `Article before profession: ${articleProfession.join(', ')}`});
  }
  
  // Check for incorrect Guten/Gute usage
  if (content.match(/["']Gute Morgen["'!]/)) totalIssues.push({module: moduleNum, type: 'GERMAN_ERROR', details: 'Wrong: "Gute Morgen" (should be "Guten Morgen")'});
  if (content.match(/["']Gute Tag["'!]/)) totalIssues.push({module: moduleNum, type: 'GERMAN_ERROR', details: 'Wrong: "Gute Tag" (should be "Guten Tag")'});
  if (content.match(/["']Gute Abend["'!]/)) totalIssues.push({module: moduleNum, type: 'GERMAN_ERROR', details: 'Wrong: "Gute Abend" (should be "Guten Abend")'});
  if (content.match(/["']Guten Nacht["'!]/)) totalIssues.push({module: moduleNum, type: 'GERMAN_ERROR', details: 'Wrong: "Guten Nacht" (should be "Gute Nacht")'});
  
  // Check for missing exercises or vocab in lessons
  // Parse lesson blocks and check each has at least exercises and vocab
  const lessonBlocks = content.split(/\/\/\s*={3,}/).filter(b => b.includes('exercises:'));
  for (const block of lessonBlocks) {
    const idMatch = block.match(/id:\s*["'](\d+-\d+)["']/);
    if (idMatch) {
      const lid = idMatch[1];
      const exCount = (block.match(/id:\s*["']ex/g) || []).length;
      const vCount = (block.match(/id:\s*["']vocab/g) || []).length;
      if (exCount < 3) {
        totalIssues.push({module: moduleNum, type: 'LOW_EXERCISES', details: `Lesson ${lid} has only ${exCount} exercises (need at least 5)`});
      }
      if (vCount < 3) {
        totalIssues.push({module: moduleNum, type: 'LOW_VOCAB', details: `Lesson ${lid} has only ${vCount} vocab items (need at least 5)`});
      }
    }
  }
  
  // Check for repeated explanations
  const explanations = (content.match(/explanation:\s*["'][^"']+["']/g) || []).map(e => e.replace(/explanation:\s*["']/, '').replace(/["']$/, ''));
  const dupeExplanations = explanations.filter((item, index) => explanations.indexOf(item) !== index);
  if (dupeExplanations.length > 0) {
    totalIssues.push({module: moduleNum, type: 'DUPE_EXPLANATION', details: `${dupeExplanations.length} duplicate explanations`});
  }
  
  // Check for consistency in pronunciation field (should have pronunciation for all vocab)
  const vocabBlocks = content.match(/\{[\s\S]*?id:\s*["']vocab[\s\S]*?\}/g) || [];
  for (const vb of vocabBlocks) {
    const vid = (vb.match(/id:\s*["']([^"']+)["']/) || [])[1];
    if (!vb.includes('pronunciation:')) {
      totalIssues.push({module: moduleNum, type: 'MISSING_PRONUNCIATION', details: `Vocab ${vid} missing pronunciation`});
    }
    if (!vb.includes('malayalam:')) {
      totalIssues.push({module: moduleNum, type: 'MISSING_MALAYALAM', details: `Vocab ${vid} missing Malayalam translation`});
    }
  }
  
  console.log(`Module ${moduleNum}: ${lessonCount} lessons, ${videoCount} videos, ${exerciseCount} exercises, ${vocabCount} vocab`);
}

console.log('\n=== COURSE TOTALS ===');
console.log(`Total Lessons: ${courseStats.lessons}`);
console.log(`Total Videos: ${courseStats.videos}`);
console.log(`Total Exercises: ${courseStats.exercises}`);
console.log(`Total Vocabulary: ${courseStats.vocab}`);

console.log('\n=== ISSUES FOUND ===');
const issuesByType = {};
for (const issue of totalIssues) {
  issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
  console.log(`[M${issue.module}] ${issue.type}: ${issue.details}`);
}

console.log('\n=== ISSUE SUMMARY ===');
for (const [type, count] of Object.entries(issuesByType)) {
  console.log(`${type}: ${count}`);
}
console.log(`\nTotal issues: ${totalIssues.length}`);
