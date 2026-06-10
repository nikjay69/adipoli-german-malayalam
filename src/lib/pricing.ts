import type { Plan } from './plan';
import type { PaymentMarket, PresentCurrency } from './geo';

export type PricingTier = {
  id: Plan;
  label: string;
  tagline: string;
  highlight?: boolean;
  prices: {
    INR: { amount: number; currency: 'INR'; display: string };
    EUR: { amount: number; currency: 'EUR'; display: string };
    USD: { amount: number; currency: 'USD'; display: string };
  };
  features: string[];
};

export const PRICING: PricingTier[] = [
  {
    id: 'free',
    label: 'Free',
    tagline: 'Taste it, no card needed',
    prices: {
      INR: { amount: 0, currency: 'INR', display: 'Free' },
      EUR: { amount: 0, currency: 'EUR', display: 'Free' },
      USD: { amount: 0, currency: 'USD', display: 'Free' },
    },
    features: [
      'Modules 1–3 (3 full modules)',
      'Basic games',
      'Daily streak tracking',
      'Guest mode — progress on this device',
    ],
  },
  {
    id: 'pro',
    label: 'Pro',
    tagline: 'Full A1 course',
    highlight: true,
    prices: {
      INR: { amount: 499, currency: 'INR', display: '₹499' },
      EUR: { amount: 14.99, currency: 'EUR', display: '€14.99' },
      USD: { amount: 14.99, currency: 'USD', display: '$14.99' },
    },
    features: [
      'All 18 modules',
      'All 8 games',
      'AI voice practice (Kuttan roleplay)',
      'Vocab SRS across devices',
      'Progress sync',
    ],
  },
  {
    id: 'premium',
    label: 'Premium',
    tagline: 'Pro + Goethe A1 exam prep',
    prices: {
      INR: { amount: 999, currency: 'INR', display: '₹999' },
      EUR: { amount: 24.99, currency: 'EUR', display: '€24.99' },
      USD: { amount: 24.99, currency: 'USD', display: '$24.99' },
    },
    features: [
      'Everything in Pro',
      '8 Goethe A1 mock tests',
      'PDF lesson scripts (offline)',
      'Voice conversation roleplays',
      'Completion badge',
    ],
  },
];

export function getTierPrice(tier: PricingTier, currency: PresentCurrency) {
  return tier.prices[currency];
}

export function getTierById(id: Plan): PricingTier | undefined {
  return PRICING.find((t) => t.id === id);
}

/**
 * Return the recommended billing period copy for a market.
 * Indian subscriptions are monthly by default; EU/global can include yearly discount later.
 */
export function getBillingIntervalCopy(market: PaymentMarket): string {
  return market === 'india' ? '/month' : '/month';
}
