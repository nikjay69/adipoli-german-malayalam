import puppeteer from 'puppeteer';
import fs from 'node:fs';

const BASE = 'http://localhost:3000';
const OUT = 'scripts/output/nav-audit';
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

const checks = [
  { name: 'learn-module-1', path: '/learn/1' },
  { name: 'learn-module-2', path: '/learn/2' },
  { name: 'learn-index', path: '/learn' },
  { name: 'home', path: '/' },
];

for (const c of checks) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE + c.path, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  // Check if nav is present
  const navCount = await page.evaluate(() => document.querySelectorAll('nav[aria-label="Main navigation"]').length);
  const backBtns = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button,a'))
      .filter((el) => /back/i.test(el.textContent || '') || el.querySelector('svg[class*="arrow-left" i]'))
      .map((el) => (el.textContent || '').trim().slice(0, 40))
      .slice(0, 3);
  });
  await page.screenshot({ path: `${OUT}/${c.name}.png`, fullPage: false });
  console.log(`${c.name}: nav=${navCount > 0 ? 'YES' : 'NO'}, back-btns=${JSON.stringify(backBtns)}`);
  await page.close();
}

await browser.close();
