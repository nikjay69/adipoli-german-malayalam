import fs from 'fs';
import path from 'path';

const modulesPath = 'c:/Users/nikhi/VSCode/German Course/german-malayali/src/lib/content/modules';
const scriptsPath = 'c:/Users/nikhi/VSCode/German Course/german-malayali/docs/scripts';

const moduleFiles = fs.readdirSync(modulesPath).filter(f => f.endsWith('.ts'));
const scriptFiles = fs.readdirSync(scriptsPath).filter(f => f.endsWith('.md'));

const definedVideos: string[] = [];

for (const file of moduleFiles) {
  const content = fs.readFileSync(path.join(modulesPath, file), 'utf8');
  // Match lines like: id: "v1-1-1",
  const matches = content.match(/id:\s*"v(\d+-\d+-\d+)"/g);
  if (matches) {
    matches.forEach(m => {
      const id = m.match(/"(v\d+-\d+-\d+)"/)?.[1];
      if (id) definedVideos.push(id);
    });
  }
}

const existingScripts = scriptFiles.map(f => f.split('_')[0]);

const missing = definedVideos.filter(v => !existingScripts.includes(v));

console.log('Total defined videos:', definedVideos.length);
console.log('Total existing scripts:', existingScripts.length);
console.log('Missing scripts:', missing);
