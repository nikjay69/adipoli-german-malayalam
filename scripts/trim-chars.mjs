// Trim transparent margins from character PNGs so figures anchor to the floor.
import sharp from 'sharp'; import fs from 'fs';
const dir='public/images/characters';
const files=fs.readdirSync(dir).filter(f=>/^(kuttan|frau-weber)-.*\.png$/.test(f));
for(const f of files){
  const p=`${dir}/${f}`;
  const buf=await sharp(p).trim({threshold:10}).toBuffer().catch(()=>null);
  if(buf){fs.writeFileSync(p,buf);const m=await sharp(p).metadata();console.log(f,'->',m.width+'x'+m.height);}
}
