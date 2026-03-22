'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  Crown,
  Sparkles,
  Star,
  Zap,
  ArrowLeft,
  Globe,
  IndianRupee,
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

type Currency = 'inr' | 'eur';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: 'free' | 'pro' | 'premium';
  name: string;
  tagline: string;
  priceINR: string;
  priceEUR: string;
  taxINR: string;       // GST amount
  taxEUR: string;       // VAT amount (estimated)
  totalINR: string;     // Price + GST
  totalEUR: string;     // Price + VAT
  periodINR: string;
  periodEUR: string;
  features: PlanFeature[];
  recommended?: boolean;
  icon: typeof Star;
  gradient: string;
  borderColor: string;
  badgeColor: string;
  buttonClass: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Get started with the basics',
    priceINR: '0',
    priceEUR: '0',
    taxINR: '0',
    taxEUR: '0',
    totalINR: '0',
    totalEUR: '0',
    periodINR: '',
    periodEUR: '',
    icon: Star,
    gradient: 'from-gray-600/20 to-[#27ae60]/10',
    borderColor: 'border-[#27ae60]/20',
    badgeColor: 'bg-[#27ae60]/20 text-[#27ae60]',
    buttonClass: 'bg-[var(--foreground)]/10 text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/15',
    features: [
      { text: '3 modules (1-3)', included: true },
      { text: '4 basic games', included: true },
      { text: '5 vocab audio per day', included: true },
      { text: 'All 18 modules', included: false },
      { text: 'AI tutor', included: false },
      { text: 'Pronunciation checker', included: false },
      { text: 'Goethe mock tests', included: false },
      { text: 'Certificate', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Unlock full learning power',
    priceINR: '423',
    priceEUR: '8.39',
    taxINR: '76',
    taxEUR: '1.60',
    totalINR: '499',
    totalEUR: '9.99',
    periodINR: '/month',
    periodEUR: '/month',
    recommended: true,
    icon: Zap,
    gradient: 'from-[#d4a520]/20 to-[#b8891a]/10',
    borderColor: 'border-[#d4a520]/40',
    badgeColor: 'bg-[#d4a520]/20 text-[#d4a520]',
    buttonClass: 'game-button',
    features: [
      { text: 'All 18 modules', included: true },
      { text: 'All 8 games', included: true },
      { text: 'Unlimited vocab audio', included: true },
      { text: 'AI tutor (20 msgs/day)', included: true },
      { text: 'Pronunciation checker', included: true },
      { text: 'Goethe mock tests', included: false },
      { text: 'PDF lesson scripts', included: false },
      { text: 'Certificate', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'The complete German mastery package',
    priceINR: '847',
    priceEUR: '16.66',
    taxINR: '152',
    taxEUR: '3.33',
    totalINR: '999',
    totalEUR: '19.99',
    periodINR: '/month',
    periodEUR: '/month',
    icon: Crown,
    gradient: 'from-purple-600/20 to-[#d4a520]/10',
    borderColor: 'border-purple-500/30',
    badgeColor: 'bg-purple-500/20 text-purple-300',
    buttonClass: 'bg-gradient-to-r from-purple-600 to-[#d4a520] text-white hover:from-purple-500 hover:to-[#e8c54a]',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: '8 Goethe A1 mock tests', included: true },
      { text: 'PDF lesson scripts', included: true },
      { text: 'Priority AI tutor (50 msgs/day)', included: true },
      { text: 'Voice practice mode', included: true },
      { text: 'Certificate on completion', included: true },
      { text: 'Direct doubt clearing', included: true },
      { text: 'Early access to new content', included: true },
    ],
  },
];

export default function PricingPage() {
  const { user, isLoggedIn } = useAuthStore();
  const [currency, setCurrency] = useState<Currency>('inr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-detect currency based on timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && (tz.startsWith('Europe/') || tz.startsWith('Atlantic/'))) {
        setCurrency('eur');
      }
    } catch {
      // Default to INR
    }
  }, []);

  const handlePayment = (planId: 'free' | 'pro' | 'premium') => {
    if (planId === 'free') {
      if (!isLoggedIn) {
        window.location.href = '/auth/signup';
      }
      return;
    }
    alert('Payment integration coming soon! Contact admin.');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d4a520] to-purple-600 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--foreground)]/40 hover:text-[var(--foreground)]/70 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a520]/20 to-purple-500/20 border border-[#d4a520]/30 mb-4 mx-auto block">
          <Sparkles className="w-8 h-8 text-[#d4a520]" />
        </div>

        <h1 className="text-3xl font-bold gradient-text mb-2">Choose Your Plan</h1>
        <p className="text-[var(--foreground)]/50 text-sm max-w-md mx-auto">
          Learn German the Kerala way. Pick a plan that fits your goals.
        </p>

        {/* Current plan indicator */}
        {isLoggedIn && user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10"
          >
            <span className="text-xs text-[var(--foreground)]/40">Current plan:</span>
            <span className="text-xs font-semibold text-[#d4a520] uppercase">{user.plan}</span>
          </motion.div>
        )}

        {/* Currency Toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setCurrency('inr')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currency === 'inr'
                ? 'bg-[#d4a520]/20 text-[#d4a520] border border-[#d4a520]/30'
                : 'bg-[var(--foreground)]/5 text-[var(--foreground)]/40 border border-transparent hover:text-[var(--foreground)]/60'
            }`}
          >
            <IndianRupee className="w-4 h-4" />
            INR
          </button>
          <button
            onClick={() => setCurrency('eur')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currency === 'eur'
                ? 'bg-[#d4a520]/20 text-[#d4a520] border border-[#d4a520]/30'
                : 'bg-[var(--foreground)]/5 text-[var(--foreground)]/40 border border-transparent hover:text-[var(--foreground)]/60'
            }`}
          >
            <Globe className="w-4 h-4" />
            EUR
          </button>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const total = currency === 'inr' ? plan.totalINR : plan.totalEUR;
          const basePrice = currency === 'inr' ? plan.priceINR : plan.priceEUR;
          const tax = currency === 'inr' ? plan.taxINR : plan.taxEUR;
          const symbol = currency === 'inr' ? '\u20B9' : '\u20AC';
          const period = currency === 'inr' ? plan.periodINR : plan.periodEUR;
          const taxLabel = currency === 'inr' ? 'GST 18%' : 'VAT ~19%';
          const paymentLabel =
            plan.id === 'free'
              ? isLoggedIn
                ? 'Current Plan'
                : 'Get Started'
              : currency === 'inr'
              ? 'Pay with Razorpay'
              : 'Pay with Stripe';
          const isCurrentPlan = isLoggedIn && user?.plan === plan.id;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl border-2 bg-gradient-to-b ${plan.gradient} ${plan.borderColor} p-5 flex flex-col ${
                plan.recommended ? 'md:-mt-3 md:mb-0 md:pb-8' : ''
              }`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-[#d4a520] text-[#1b2d1b] text-xs font-bold rounded-full uppercase tracking-wide shadow-lg shadow-[#d4a520]/30">
                    Recommended
                  </span>
                </div>
              )}

              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div className="absolute -top-3 right-4">
                  <span className="px-2.5 py-1 bg-[#27ae60] text-white text-xs font-bold rounded-full">
                    Active
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg ${plan.badgeColor} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)]">{plan.name}</h3>
                </div>
                <p className="text-xs text-[var(--foreground)]/40">{plan.tagline}</p>
              </div>

              {/* Price with tax breakdown */}
              <div className="mb-5">
                <div className="flex items-baseline gap-1">
                  {total === '0' ? (
                    <span className="text-3xl font-bold text-[#27ae60]">Free</span>
                  ) : (
                    <>
                      <span className="text-sm text-[var(--foreground)]/50">{symbol}</span>
                      <span className="text-3xl font-bold text-[var(--foreground)]">{total}</span>
                      <span className="text-sm text-[var(--foreground)]/40">{period}</span>
                    </>
                  )}
                </div>
                {/* Tax breakdown */}
                {total !== '0' && (
                  <div className="mt-1 text-[10px] text-[var(--foreground)]/30">
                    {symbol}{basePrice} + {symbol}{tax} {taxLabel}
                    <span className="block mt-0.5">Price inclusive of all taxes</span>
                  </div>
                )}
                {/* Show alternate price */}
                {total !== '0' && (
                  <p className="text-[10px] text-[var(--foreground)]/25 mt-1">
                    Also:{' '}
                    {currency === 'inr'
                      ? `\u20AC${plan.totalEUR}${plan.periodEUR} (incl. VAT)`
                      : `\u20B9${plan.totalINR}${plan.periodINR} (incl. GST)`}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature, fi) => (
                  <div key={fi} className="flex items-start gap-2.5">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-[#27ae60]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#27ae60]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-[var(--foreground)]/20" />
                      </div>
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? 'text-[var(--foreground)]/70'
                          : 'text-[var(--foreground)]/25 line-through'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePayment(plan.id)}
                disabled={isCurrentPlan}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.buttonClass} ${
                  isCurrentPlan ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${plan.id !== 'free' ? 'shadow-lg' : ''}`}
              >
                {isCurrentPlan ? 'Current Plan' : paymentLabel}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 space-y-2"
      >
        <p className="text-xs text-[var(--foreground)]/25">
          All prices are in {currency === 'inr' ? 'Indian Rupees (INR)' : 'Euros (EUR)'}. Switch currency above.
        </p>
        <p className="text-xs text-[var(--foreground)]/20">
          Cancel anytime. No questions asked. Your progress is always saved.
        </p>
        <div className="mt-3 text-[10px] text-[var(--foreground)]/15 max-w-md text-center">
          <p>All prices are inclusive of applicable taxes.</p>
          <p>India: 18% GST on digital services (CGST 9% + SGST 9%).</p>
          <p>EU: VAT as per your country (processed via Stripe Tax, auto-calculated).</p>
          <p>Tax invoices generated automatically for every payment.</p>
        </div>
        {!isLoggedIn && (
          <p className="text-xs text-[var(--foreground)]/30 mt-4">
            <Link href="/auth/signup" className="text-[#d4a520] hover:underline">
              Create a free account
            </Link>{' '}
            to get started
          </p>
        )}
      </motion.div>
    </div>
  );
}
