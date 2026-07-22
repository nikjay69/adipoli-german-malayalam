import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path));
const readText = (path: string) => read(path).toString('utf8');
const sha256 = (contents: Buffer) => createHash('sha256').update(contents).digest('hex');

const publicHome = readText('src/app/page.tsx');
const publicStyles = readText('src/app/PublicBoundary.module.css');
const firstMoment = readText('src/app/intro/page.tsx');
const legacyLanding = readText('src/app/landing/page.tsx');
const navigation = readText('src/components/layout/Navigation.tsx');
const layout = readText('src/app/layout.tsx');
const onboarding = readText('src/app/onboarding/page.tsx');

for (const claim of [
  'The Goethe A1 course for Malayalis.',
  '56 dense owner-led lessons.',
  'Video-led. App-supported.',
  'Hear it. Say it. Repair it. Prove it.',
  "Build evidence that you&apos;re A1 ready.",
]) {
  assert.ok(publicHome.includes(claim), `public home must use approved claim: ${claim}`);
}

for (const destination of ['/intro', '/auth/login', '#curriculum']) {
  assert.ok(publicHome.includes(`href=\"${destination}\"`), `public home must expose ${destination}`);
}

assert.ok(publicHome.includes('SPINE_MODULES.map'), 'public home must show the canonical eight-module spine');
assert.ok(publicHome.includes('Zero to Goethe A1-ready.'), 'public hero must retain the approved impact headline');
assert.ok(publicHome.includes('/images/scenes/hub-goethe-kochi-classroom.jpg'), 'public hero must use the approved classroom scene');
assert.ok(publicHome.includes('<FrauFischer mood="greeting"'), 'public hero must integrate Frau Fischer into the theatre');
assert.equal((publicHome.match(/scene: '\/images\/scenes\/hub-/g) ?? []).length, 8, 'public curriculum must retain eight photographic scene flags');
for (const visualStructure of ['heroStage', 'methodSheet', 'moduleRail', 'momentTeaser', 'audioPreview']) {
  assert.ok(publicHome.includes(`styles.${visualStructure}`), `public home must retain the approved ${visualStructure} composition`);
}
for (const mobileBrandStructure of ['mobileBrand', 'finalBrand', 'footerBrand', 'footerMeta']) {
  assert.ok(publicHome.includes(`styles.${mobileBrandStructure}`), `public home must retain the polished ${mobileBrandStructure} treatment`);
}
assert.match(publicStyles, /grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/, 'desktop scene flags must keep the approved four-column theatre');
assert.match(publicStyles, /scroll-snap-type:\s*inline mandatory/, 'mobile scene flags must retain the approved swipe rail');
assert.match(publicStyles, /"brand links"\s*\n\s*"meta meta"/, 'mobile footer must keep its collision-free two-row layout');
assert.doesNotMatch(publicHome, /router\.replace|hasSeenIntro/, 'the canonical public route must not redirect visitors away');
assert.doesNotMatch(
  publicHome,
  /€|₹|pricing|testimonial|1,?000\+|pass guarantee|affiliated with/i,
  'public home must not publish unapproved pricing, proof, or affiliation claims',
);

assert.ok(
  firstMoment.includes("'/audio/tts/v1-3-1/v1-3-1-line-0.mp3'"),
  'first moment must use the approved native Guten Morgen audio',
);
for (const required of [
  "'hear', 'say', 'repair', 'win'",
  'Gute Morgen.',
  'Guten Morgen.',
  'Guten Morgen, Frau Fischer.',
  'markIntroSeen()',
  "router.push('/onboarding?from=first-moment')",
]) {
  assert.ok(firstMoment.includes(required), `first moment must contain ${required}`);
}
assert.doesNotMatch(firstMoment, /speechSynthesis|webkitSpeechRecognition/i, 'first win must not depend on browser speech APIs');
assert.ok(existsSync(resolve(root, 'public/audio/tts/v1-3-1/v1-3-1-line-0.mp3')), 'first moment audio must exist');

const frauFischerGreeting = read('public/images/characters/frau-weber-greeting-clean.png');
assert.equal(
  sha256(frauFischerGreeting),
  'd66ce5d9093a0a40679dfecfffeddbe61defbcb60b65b47e4df6c35639d96c55',
  'Frau Fischer greeting cutout must retain the cleaned transparent arm-to-torso gap',
);

assert.match(legacyLanding, /redirect\('\/'\)/, 'legacy /landing must redirect to the canonical public route');
assert.ok(navigation.includes("pathname === '/'"), 'learner navigation must stay hidden on the public homepage');
assert.ok(navigation.includes("pathname.startsWith('/intro')"), 'learner navigation must stay hidden during the first moment');
assert.equal(layout.match(/summary_large_image/)?.[0], 'summary_large_image', 'social metadata must use the large image card');
assert.match(layout, /metadataBase: new URL\("https:\/\/adipoli-german\.vercel\.app"\)/, 'social metadata must resolve against the live app URL');
assert.doesNotMatch(onboarding, /18 modules|TOTAL_COURSE_HOURS|Appu/, 'first-moment handoff must not revive legacy course claims or cast');
assert.match(onboarding, /56 dense lessons/, 'onboarding handoff must retain the approved lesson claim');
assert.match(onboarding, /8 guided modules/, 'onboarding handoff must match the canonical spine');

const approvedSocialMaster = read('marketing/adipoli-marketing-kit-v0.1/exports/templates/og-1200x630.png');
for (const target of ['src/app/opengraph-image.png', 'src/app/twitter-image.png']) {
  assert.ok(existsSync(resolve(root, target)), `${target} must exist`);
  const image = read(target);
  assert.equal(image.subarray(1, 4).toString('ascii'), 'PNG', `${target} must be a PNG`);
  assert.deepEqual(
    { width: image.readUInt32BE(16), height: image.readUInt32BE(20) },
    { width: 1200, height: 630 },
    `${target} must use the 1200x630 social format`,
  );
  assert.equal(sha256(image), sha256(approvedSocialMaster), `${target} must remain byte-exact to the approved master`);
}

console.log('public boundary: approved copy, native first moment, canonical routing, and social artwork verified');
