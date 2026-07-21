import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type BrandAsset = {
  path: string;
  role: string;
  mimeType: 'image/png' | 'image/svg+xml';
  width: number;
  height: number;
  sha256: string;
  sourceExact: boolean;
};

type BrandManifest = {
  source: { sha256: string };
  runtimePolicy: Record<string, string>;
  assets: BrandAsset[];
};

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path));
const readText = (path: string) => read(path).toString('utf8');
const sha256 = (contents: Buffer) => createHash('sha256').update(contents).digest('hex').toUpperCase();

const pngDimensions = (contents: Buffer) => {
  assert.equal(contents.subarray(1, 4).toString('ascii'), 'PNG', 'asset must have a PNG signature');
  return {
    width: contents.readUInt32BE(16),
    height: contents.readUInt32BE(20),
  };
};

const brandManifest = JSON.parse(readText('public/brand/manifest.json')) as BrandManifest;
assert.equal(
  brandManifest.source.sha256,
  'AFEEEC516489C4EB595C6777946957691988FD0AE3B2396445CFB32C89F535A1',
  'brand assets must remain tied to the owner-approved ZIP',
);
assert.equal(brandManifest.assets.length, 18, 'runtime package must contain the 8 flat SVGs, 8 icons, and 2 watermarks');

for (const asset of brandManifest.assets) {
  const publicPath = `public/brand/${asset.path}`;
  assert.ok(existsSync(resolve(root, publicPath)), `${publicPath} must exist`);
  const contents = read(publicPath);
  assert.equal(sha256(contents), asset.sha256, `${publicPath} must remain byte-exact to the approved package`);
  assert.equal(asset.sourceExact, true, `${publicPath} must be marked as a source-exact import`);

  if (asset.mimeType === 'image/png') {
    assert.deepEqual(
      pngDimensions(contents),
      { width: asset.width, height: asset.height },
      `${publicPath} dimensions must match the brand manifest`,
    );
  } else {
    const svg = contents.toString('utf8');
    const viewBox = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    assert.ok(viewBox, `${publicPath} must declare a zero-origin viewBox`);
    assert.deepEqual(
      { width: Number(viewBox[1]), height: Number(viewBox[2]) },
      { width: asset.width, height: asset.height },
      `${publicPath} viewBox must match the brand manifest`,
    );
    assert.doesNotMatch(
      svg,
      /<script|<foreignObject|(?:href|src)\s*=\s*["']https?:|url\(\s*https?:/i,
      `${publicPath} must not execute or load external content`,
    );
  }
}

assert.ok(
  brandManifest.assets.every(({ path }) => !/(?:^|\/)(?:de\d|.*gradient|.*3d)/i.test(path)),
  'celebration, gradient, and 3D variants must stay outside the product runtime bundle',
);
assert.match(readText('public/brand/logo/mark-triangle.svg'), /#d4a520/i, 'the gold trapezoid must remain in the default mark');

const webManifest = JSON.parse(readText('public/manifest.json')) as {
  description: string;
  icons: Array<{ src: string; purpose: string }>;
};
assert.equal(
  webManifest.description,
  'The Goethe A1 course for Malayalis. 56 dense owner-led lessons. Video-led. App-supported.',
  'PWA copy must use the approved claim library',
);
assert.deepEqual(
  webManifest.icons.map(({ src, purpose }) => [src, purpose]),
  [
    ['/brand/icons/pwa-192.png', 'any'],
    ['/brand/icons/pwa-512.png', 'any'],
    ['/brand/icons/maskable-512.png', 'maskable'],
  ],
  'PWA must use the approved any-purpose and maskable icon ladder',
);

const layout = readText('src/app/layout.tsx');
const serviceWorker = readText('public/sw.js');
const brandCode = readText('src/lib/brand.ts');
const components = readText('src/components/brand/Brand.tsx');
const css = readText('src/styles/foundation.css');
const preview = readText('src/app/preview/brand/page.tsx');
const gitAttributes = readText('.gitattributes');

assert.doesNotMatch(layout, /Kerala Style/i, 'legacy positioning must not remain in app metadata');
for (const icon of ['favicon16', 'favicon32', 'favicon48', 'appleTouch']) {
  assert.ok(layout.includes(`brandAssets.icons.${icon}`), `metadata must wire ${icon}`);
}
assert.ok(serviceWorker.includes("url.pathname.startsWith('/brand/')"), 'service worker must cache canonical brand assets');
assert.doesNotMatch(serviceWorker, /icon-(?:192|512)\.svg/, 'service worker must not retain legacy icons');
assert.ok(!existsSync(resolve(root, 'public/icon-192.svg')), 'legacy 192px icon must be removed');
assert.ok(!existsSync(resolve(root, 'public/icon-512.svg')), 'legacy 512px icon must be removed');
assert.ok(!existsSync(resolve(root, 'src/app/favicon.ico')), 'legacy auto-injected favicon must be removed');

assert.doesNotMatch(brandCode, /https?:\/\//, 'runtime brand registry must use local assets only');
assert.match(brandCode, /Tricolour is a bounded celebration accent/, 'default-versus-celebration guardrail must live in code');
assert.ok(components.includes('function BrandLockup'), 'shared runtime lockup must exist');
assert.ok(components.includes('brandAssets.logo.tile'), 'runtime lockup must use the approved pure-path tile');
assert.match(css, /\.ag-brand-wordmark[\s\S]*var\(--ag-font-impact\)/, 'runtime wordmark must use bundled Archivo');
assert.match(css, /\.ag-brand-descriptor[\s\S]*var\(--ag-font-ui\)/, 'runtime descriptor must use bundled Geist');
assert.ok(preview.includes('ag-brand-crop--circle'), 'review route must show the circle crop');
assert.ok(preview.includes('ag-brand-maskable-check'), 'review route must show the maskable safe zone');
assert.match(
  gitAttributes,
  /^public\/brand\/logo\/\*\.svg -text$/m,
  'approved SVG bytes must be protected from line-ending conversion',
);

console.log('brand integration: approved checksums, dimensions, metadata, icon crops, local fonts, and usage guardrails verified');
