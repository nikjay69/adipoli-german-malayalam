/**
 * Plan-level gating. The source of truth is `profiles.plan` in Supabase
 * (updated by webhooks). Client reads it via `useAuthStore().user.plan`.
 *
 * Free plan = Modules 1-3 (the free-trial block per docs/LAUNCH_CHECKLIST.md)
 * Pro plan = all 18 modules + core practice
 * Premium plan = pro + Goethe mock tests + PDFs + voice practice + completion badge
 */

export type Plan = 'free' | 'pro' | 'premium';

export const PLAN_RANK: Record<Plan, number> = {
  free: 0,
  pro: 1,
  premium: 2,
};

export const FREE_TIER_MAX_MODULE = 3;

export function isPaidPlan(plan: Plan | undefined): boolean {
  return plan === 'pro' || plan === 'premium';
}

export function hasAccessToModule(plan: Plan | undefined, moduleId: number): boolean {
  if (!plan) return moduleId <= FREE_TIER_MAX_MODULE;
  if (plan === 'free') return moduleId <= FREE_TIER_MAX_MODULE;
  // Pro and Premium unlock everything module-wise
  return true;
}

export function hasAccessToFeature(plan: Plan | undefined, feature: 'mock-tests' | 'pdf-scripts' | 'voice-practice' | 'completion-badge'): boolean {
  if (plan === 'premium') return true;
  if (plan === 'pro' && (feature === 'voice-practice')) return true;
  return false;
}

export function requiredPlanFor(moduleId: number): Plan {
  if (moduleId <= FREE_TIER_MAX_MODULE) return 'free';
  return 'pro';
}
