import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

const css = read('src/styles/foundation.css');
const layout = read('src/app/layout.tsx');
const preview = read('src/app/preview/design-system/page.tsx');
const components = read('src/components/foundation/Foundation.tsx');
const globalSearch = read('src/components/ui/GlobalSearch.tsx');
const navigation = read('src/components/layout/Navigation.tsx');

const requiredTokens = [
  ['--ag-daylight-canvas', '#f5f0e8'],
  ['--ag-daylight-layer', '#efe9dc'],
  ['--ag-daylight-sunken', '#e9e4d8'],
  ['--ag-answer-sheet', '#f7ead0'],
  ['--ag-forest-deepest', '#0c1811'],
  ['--ag-forest-deep', '#102018'],
  ['--ag-forest-mid', '#12241a'],
  ['--ag-forest-raised', '#16281c'],
  ['--ag-action', '#d4a520'],
  ['--ag-focus-light', '#8a5a2a'],
  ['--ag-ink', '#3f4d44'],
  ['--ag-ink-muted', '#66756a'],
  ['--ag-success', '#1f7a44'],
  ['--ag-recovery', '#b95b33'],
] as const;

for (const [token, value] of requiredTokens) {
  assert.match(css, new RegExp(`${token}:\\s*${value}`, 'i'), `${token} must remain ${value}`);
}

const tokenHex = (token: string) => {
  const match = css.match(new RegExp(`${token}:\\s*(#[0-9a-f]{6})`, 'i'));
  assert.ok(match, `${token} must be a six-digit hex color`);
  return match[1];
};

const luminance = (hex: string) => {
  const channels = hex.match(/[0-9a-f]{2}/gi);
  assert.ok(channels, `${hex} must contain RGB channels`);
  const [red, green, blue] = channels.map((channel) => {
    const value = Number.parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
};

const contrast = (foreground: string, background: string) => {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

for (const [foreground, background] of [
  ['--ag-ink-muted-readable', '--ag-daylight-canvas'],
  ['--ag-ink-muted-readable', '--ag-answer-sheet'],
  ['--ag-success-readable', '--ag-answer-sheet'],
  ['--ag-recovery-readable', '--ag-answer-sheet'],
] as const) {
  assert.ok(
    contrast(tokenHex(foreground), tokenHex(background)) >= 4.5,
    `${foreground} must meet 4.5:1 on ${background}`,
  );
}

for (const font of ['Source_Serif_4', 'Archivo', 'Noto_Sans_Malayalam', 'Geist_Mono']) {
  assert.ok(layout.includes(font), `${font} must be bundled through next/font`);
}

assert.ok(!layout.includes('maximumScale'), 'viewport must permit 200% zoom');
assert.ok(!layout.includes('userScalable: false'), 'viewport must permit pinch zoom');
assert.match(css, /outline:\s*2px solid var\(--ag-current-focus\)/, 'focus ring must be 2px');
assert.match(css, /outline-offset:\s*2px/, 'focus ring offset must be 2px');
assert.match(css, /min-height:\s*44px/, 'interactive target floor must be 44px');
assert.match(css, /prefers-reduced-motion:\s*reduce/, 'reduced-motion override must exist');

for (const primitive of ['DaylightCanvas', 'DarkRoom', 'AnswerSheet', 'SceneFlag']) {
  assert.ok(components.includes(`function ${primitive}`), `${primitive} primitive must exist`);
  assert.ok(preview.includes(`<${primitive}`), `${primitive} must be visible on the review route`);
}

assert.ok(preview.includes('tone="recovery"'), 'review route must show a labelled recovery state');
assert.ok(preview.includes('disabledReason='), 'disabled action must explain what is missing');
assert.ok(preview.includes('lang="ml"'), 'Malayalam examples must declare their language');
assert.ok(globalSearch.includes("pathname.startsWith('/preview')"), 'review routes must hide the legacy search control');
assert.ok(navigation.includes("pathname.startsWith('/preview')"), 'review routes must hide the legacy navigation control');

console.log('design foundation: tokens, fonts, focus, zoom, motion, primitives, and review states verified');
