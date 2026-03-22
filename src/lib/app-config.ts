export const APP_CONFIG = {
  auth: {
    // Real auth is not wired yet. Keep false by default to avoid fake accounts in production.
    enableDemoAuth: process.env.NEXT_PUBLIC_ENABLE_DEMO_AUTH === 'true',
    hasRealAuth: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
  },
  payments: {
    hasRazorpay: Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),
    hasStripe: Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
  },
  ai: {
    hasTutor: Boolean(process.env.GEMINI_API_KEY),
  },
};

export const FEATURE_FLAGS = {
  authReady: APP_CONFIG.auth.hasRealAuth,
  demoAuthEnabled: APP_CONFIG.auth.enableDemoAuth,
  paymentsReady: APP_CONFIG.payments.hasRazorpay || APP_CONFIG.payments.hasStripe,
  canCreateAccounts: APP_CONFIG.auth.hasRealAuth || APP_CONFIG.auth.enableDemoAuth,
};

export function getAuthStatusMessage() {
  if (FEATURE_FLAGS.authReady) return 'Secure sign in is enabled.';
  if (FEATURE_FLAGS.demoAuthEnabled) return 'Demo auth is enabled for testing only. Do not use real passwords.';
  return 'Accounts are not live yet. You can still use the course in guest mode.';
}
