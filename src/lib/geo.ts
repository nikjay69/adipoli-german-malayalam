/**
 * Resolve the user's country from an HTTP request using Vercel's geo headers.
 * Falls back to undefined if not on Vercel (local dev).
 */

export type Geo = {
  country?: string;
  region?: string;
  city?: string;
};

const GROUPS = {
  india: new Set(['IN']),
  // Paddle charges VAT for all EU + UK + Switzerland. Use PADDLE for these.
  eu: new Set([
    'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'LU', 'AT', 'IE', 'PT', 'FI',
    'SE', 'DK', 'GR', 'CY', 'MT', 'SK', 'SI', 'EE', 'LV', 'LT', 'PL',
    'CZ', 'HU', 'RO', 'BG', 'HR', 'GB', 'CH', 'NO', 'IS',
  ]),
};

export type PaymentMarket = 'india' | 'eu' | 'global';
export type PresentCurrency = 'INR' | 'EUR' | 'USD';

export function getPaymentMarket(country?: string): PaymentMarket {
  if (!country) return 'global';
  if (GROUPS.india.has(country)) return 'india';
  if (GROUPS.eu.has(country)) return 'eu';
  return 'global';
}

export function getPresentCurrency(country?: string): PresentCurrency {
  const market = getPaymentMarket(country);
  switch (market) {
    case 'india': return 'INR';
    case 'eu': return 'EUR';
    default: return 'USD';
  }
}

export function getProviderForMarket(market: PaymentMarket): 'razorpay' | 'paddle' {
  return market === 'india' ? 'razorpay' : 'paddle';
}

/**
 * Read geo from a Next.js Request headers. Vercel injects these.
 */
export function geoFromHeaders(headers: Headers): Geo {
  return {
    country: headers.get('x-vercel-ip-country') ?? undefined,
    region: headers.get('x-vercel-ip-country-region') ?? undefined,
    city: headers.get('x-vercel-ip-city') ?? undefined,
  };
}
