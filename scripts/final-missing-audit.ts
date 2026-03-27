
import * as fs from 'fs';
import * as path from 'path';

const allVideoIds = fs.readFileSync('all_video_ids.txt', 'utf-16le')
  .split('\n')
  .map(id => id.trim())
  .filter(id => id.startsWith('v'));

const scriptDir = path.join(process.cwd(), 'docs', 'scripts');
const existingScripts = fs.readdirSync(scriptDir);

const missing = allVideoIds.filter(id => !existingScripts.includes(`${id}_FULL_SCRIPT.md`));

console.log('--- Missing Scripts Audit ---');
missing.forEach(id => console.log(id));
console.log(`\nTotal Missing: ${missing.length}`);
