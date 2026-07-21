import Image from 'next/image';
import type { CSSProperties } from 'react';
import {
  BRAND_DESCRIPTION,
  brandAssets,
  type BrandLockupVariant,
  type BrandMarkVariant,
} from '@/lib/brand';

const markConfig = {
  mark: { src: brandAssets.logo.mark, minimum: 12 },
  reversed: { src: brandAssets.logo.reversedMark, minimum: 12 },
  'mono-black': { src: brandAssets.logo.monoBlackMark, minimum: 12 },
  'mono-white': { src: brandAssets.logo.monoWhiteMark, minimum: 12 },
  tile: { src: brandAssets.logo.tile, minimum: 24 },
} as const;

type BrandMarkProps = {
  variant?: BrandMarkVariant;
  size?: number;
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

export function BrandMark({
  variant = 'mark',
  size = 48,
  alt = 'Adipoli German',
  className,
  style,
}: BrandMarkProps) {
  const asset = markConfig[variant];
  const displaySize = Math.max(size, asset.minimum);

  return (
    <Image
      src={asset.src}
      alt={alt}
      width={displaySize}
      height={displaySize}
      className={className}
      style={{ width: displaySize, height: displaySize, ...style }}
      unoptimized
    />
  );
}

type BrandLockupProps = {
  variant?: BrandLockupVariant;
  surface?: 'light' | 'dark';
  className?: string;
};

/**
 * Product lockups combine the pure-path approved tile/mark with live text.
 * This lets the app use its bundled Archivo and Geist files; text inside an
 * external editable SVG cannot inherit the next/font family from the page.
 */
export function BrandLockup({
  variant = 'horizontal',
  surface = 'light',
  className,
}: BrandLockupProps) {
  const isDark = surface === 'dark';
  const symbolVariant: BrandMarkVariant = isDark ? 'reversed' : 'tile';
  const classes = ['ag-brand-lockup', className].filter(Boolean).join(' ');

  return (
    <span className={classes} data-variant={variant} data-surface={surface}>
      <BrandMark variant={symbolVariant} size={48} alt="" className="ag-brand-lockup__symbol" />
      <span className="ag-brand-lockup__copy">
        {variant === 'stacked' ? (
          <span className="ag-brand-wordmark ag-brand-wordmark--stacked">
            <span>ADIPOLI</span>
            <span>GERMAN</span>
          </span>
        ) : (
          <span className="ag-brand-wordmark">ADIPOLI GERMAN</span>
        )}
        {variant === 'descriptor' ? (
          <span className="ag-brand-descriptor">The Goethe A1 course for Malayalis</span>
        ) : null}
      </span>
    </span>
  );
}

type BrandWatermarkProps = {
  footage: 'bright' | 'dark';
  size?: number;
  className?: string;
};

export function BrandWatermark({ footage, size = 128, className }: BrandWatermarkProps) {
  const src = footage === 'dark'
    ? brandAssets.watermarks.forDarkFootage
    : brandAssets.watermarks.forBrightFootage;

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={['ag-brand-watermark', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      unoptimized
    />
  );
}

export const brandAccessibleDescription = BRAND_DESCRIPTION;
