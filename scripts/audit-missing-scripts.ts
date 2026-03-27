
import { MODULE_01 } from './src/lib/content/modules/module-01';
import { MODULE_02 } from './src/lib/content/modules/module-02';
import { MODULE_03 } from './src/lib/content/modules/module-03';
import { MODULE_04 } from './src/lib/content/modules/module-04';
import { MODULE_05 } from './src/lib/content/modules/module-05';
import { MODULE_06 } from './src/lib/content/modules/module-06';
import { MODULE_07 } from './src/lib/content/modules/module-07';
import { MODULE_08 } from './src/lib/content/modules/module-08';
import { MODULE_09 } from './src/lib/content/modules/module-09';
import { MODULE_10 } from './src/lib/content/modules/module-10';
import { MODULE_11 } from './src/lib/content/modules/module-11';
import { MODULE_12 } from './src/lib/content/modules/module-12';
import { MODULE_13 } from './src/lib/content/modules/module-13';
import { MODULE_14 } from './src/lib/content/modules/module-14';
import { MODULE_15 } from './src/lib/content/modules/module-15';
import { MODULE_16 } from './src/lib/content/modules/module-16';
import { MODULE_17 } from './src/lib/content/modules/module-17';
import { MODULE_18 } from './src/lib/content/modules/module-18';
import * as fs from 'fs';
import * as path from 'path';

const modules = [
  MODULE_01, MODULE_02, MODULE_03, MODULE_04, MODULE_05,
  MODULE_06, MODULE_07, MODULE_08, MODULE_09, MODULE_10,
  MODULE_11, MODULE_12, MODULE_13, MODULE_14, MODULE_15,
  MODULE_16, MODULE_17, MODULE_18
];

const scriptDir = path.join(process.cwd(), 'docs', 'scripts');
const existingScripts = fs.readdirSync(scriptDir);

console.log('--- Missing Scripts Audit ---');
let missingCount = 0;
modules.forEach(m => {
  m.lessons.forEach(l => {
    l.videos.forEach(v => {
      const scriptName = `${v.id}_FULL_SCRIPT.md`;
      if (!existingScripts.includes(scriptName)) {
        console.log(`Missing: ${v.id} - ${v.title} (Module ${m.id})`);
        missingCount++;
      }
    });
  });
});
console.log(`\nTotal Missing: ${missingCount}`);
