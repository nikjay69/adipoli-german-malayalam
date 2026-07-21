export const BRAND_NAME = 'Adipoli German';

export const BRAND_DESCRIPTION = [
  'The Goethe A1 course for Malayalis.',
  '56 dense owner-led lessons.',
  'Video-led. App-supported.',
].join(' ');

const BRAND_BASE = '/brand';

export const brandAssets = {
  logo: {
    mark: `${BRAND_BASE}/logo/mark-triangle.svg`,
    reversedMark: `${BRAND_BASE}/logo/mark-triangle-reversed.svg`,
    monoBlackMark: `${BRAND_BASE}/logo/mark-triangle-mono-black.svg`,
    monoWhiteMark: `${BRAND_BASE}/logo/mark-triangle-mono-white.svg`,
    tile: `${BRAND_BASE}/logo/tile-a.svg`,
    horizontalSource: `${BRAND_BASE}/logo/logo-primary-horizontal.svg`,
    stackedSource: `${BRAND_BASE}/logo/logo-stacked.svg`,
    descriptorSource: `${BRAND_BASE}/logo/logo-descriptor.svg`,
  },
  icons: {
    favicon16: `${BRAND_BASE}/icons/favicon-16.png`,
    favicon32: `${BRAND_BASE}/icons/favicon-32.png`,
    favicon48: `${BRAND_BASE}/icons/favicon-48.png`,
    appleTouch: `${BRAND_BASE}/icons/apple-touch-180.png`,
    pwa192: `${BRAND_BASE}/icons/pwa-192.png`,
    pwa512: `${BRAND_BASE}/icons/pwa-512.png`,
    maskable512: `${BRAND_BASE}/icons/maskable-512.png`,
    avatar1080: `${BRAND_BASE}/icons/avatar-1080.png`,
  },
  watermarks: {
    forDarkFootage: `${BRAND_BASE}/watermarks/watermark-light-512.png`,
    forBrightFootage: `${BRAND_BASE}/watermarks/watermark-dark-512.png`,
  },
  manifest: `${BRAND_BASE}/manifest.json`,
} as const;

/**
 * Runtime guardrail: product surfaces use the flat Triangle-A system only.
 * Tricolour is a bounded celebration accent; gradient and 3D are marketing-only.
 * Those variants are intentionally absent from the product runtime directory.
 */
export const brandUsage = {
  productDefault: 'Flat forest, cream, and gold Triangle-A artwork.',
  darkSurface: 'Use the reversed mark on forest; never remove the gold trapezoid.',
  celebration: 'German-tricolour only in separately reviewed Germany-topic, exam, or result artwork.',
  marketingOnly: 'Gradient and restrained 3D artwork only in approved marketing masters.',
  forbidden: 'No rotation, skew, arbitrary recolour, baked-in A1, character mashup, flag mashup, or institutional affiliation.',
} as const;

export type BrandMarkVariant = 'mark' | 'reversed' | 'mono-black' | 'mono-white' | 'tile';
export type BrandLockupVariant = 'horizontal' | 'stacked' | 'descriptor';
