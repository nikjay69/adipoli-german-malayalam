// Script to find and fix all empty explanation fields across all modules
// Generates context-aware explanations based on the exercise type, question, and correct answer.
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'src', 'lib', 'content', 'modules');
const files = fs.readdirSync(modulesDir).filter(f => f.endsWith('.ts')).sort();

let totalFixed = 0;
let totalSkipped = 0;

for (const file of files) {
  let content = fs.readFileSync(path.join(modulesDir, file), 'utf-8');
  const moduleNum = file.replace('module-', '').replace('.ts', '');
  let moduleFixed = 0;
  
  // Find all empty explanation patterns and their surrounding context
  // We need to find exercises with explanation: "" and generate meaningful ones
  
  // Strategy: find each occurrence of explanation: "" and look at the surrounding exercise block
  // to generate a context-aware explanation
  
  const lines = content.split('\n');
  const newLines = [...lines];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match empty explanation fields (both '' and "")
    if (/^\s*explanation:\s*["']["']\s*,?\s*$/.test(line)) {
      // Look backwards to find the exercise context
      let question = '';
      let correctAnswer = '';
      let exerciseType = '';
      let options = [];
      
      for (let j = i - 1; j >= Math.max(0, i - 30); j--) {
        if (!question && /question:\s*["'](.+?)["']/.test(lines[j])) {
          question = lines[j].match(/question:\s*["'](.+?)["']/)?.[1] || '';
        }
        if (!correctAnswer) {
          // Handle string correctAnswer
          const strMatch = lines[j].match(/correctAnswer:\s*["'](.+?)["']/);
          if (strMatch) correctAnswer = strMatch[1];
          // Handle array correctAnswer
          const arrMatch = lines[j].match(/correctAnswer:\s*\[/);
          if (arrMatch) correctAnswer = '[array]';
        }
        if (!exerciseType && /type:\s*["'](.+?)["']/.test(lines[j])) {
          exerciseType = lines[j].match(/type:\s*["'](.+?)["']/)?.[1] || '';
        }
      }
      
      // Also check forward for correctAnswer if not found above
      if (!correctAnswer) {
        for (let j = i + 1; j < Math.min(lines.length, i + 10); j++) {
          const strMatch = lines[j].match(/correctAnswer:\s*["'](.+?)["']/);
          if (strMatch) { correctAnswer = strMatch[1]; break; }
        }
      }
      
      // Skip if this is inside a vocab block, not an exercise
      let isExercise = false;
      for (let j = i - 1; j >= Math.max(0, i - 40); j--) {
        if (/id:\s*["']ex/.test(lines[j])) { isExercise = true; break; }
        if (/id:\s*["']vocab/.test(lines[j])) { break; }
        if (/vocabulary:/.test(lines[j])) { break; }
      }
      
      if (!isExercise) {
        totalSkipped++;
        continue;
      }
      
      // Generate an appropriate explanation based on the exercise context
      // We just mark these for now - they need manual/AI intervention  
      console.log(`[M${moduleNum}:L${i+1}] ${exerciseType} | Q: "${question ? question.substring(0, 60) : 'N/A'}..." | A: "${correctAnswer ? correctAnswer.substring(0, 40) : 'N/A'}"`);
      moduleFixed++;
    }
  }
  
  if (moduleFixed > 0) {
    console.log(`  → Module ${moduleNum}: ${moduleFixed} empty explanations found`);
  }
  totalFixed += moduleFixed;
}

console.log(`\n=== TOTAL EMPTY EXPLANATIONS: ${totalFixed} ===`);
console.log(`Skipped (non-exercise): ${totalSkipped}`);
