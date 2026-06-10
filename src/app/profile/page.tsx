'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Award,
  RefreshCw,
  FileText,
  Download,
  LogOut,
  LogIn,
  UserPlus,
  Crown,
  Shield,
  ArrowUpRight,
  Mail,
  Fingerprint,
  Check,
  Trash2,
  AlertTriangle,
  CalendarDays,
  Clock,
  Flame,
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '@/components/ui';
import { useGameStore, ACHIEVEMENTS_DATA } from '@/lib/store';
import { Kuttan } from '@/components/character/Kuttan';
import { StreakCalendar } from '@/components/ui/StreakCalendar';
import { HOUR_OPTIONS, getEstimatedDays, getEstimatedCompletionDate, createStudyPlan } from '@/lib/study-plan';
import { ALL_MODULES, getAllVocabulary } from '@/lib/content/modules';
import { calculateExamReadiness } from '@/lib/exam-readiness';
import { useAuthStore } from '@/lib/auth-store';
import { FEATURE_FLAGS, getAuthStatusMessage } from '@/lib/app-config';

export default function ProfilePage() {
  const router = useRouter();
  const { userProgress, resetProgress, setStudyPlan } = useGameStore();
  const { user, isLoggedIn, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showPaceEditor, setShowPaceEditor] = useState(false);

  // Passkey state
  const [webAuthnSupported, setWebAuthnSupported] = useState(false);
  const [passkeyRegistered, setPasskeyRegistered] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [passkeyError, setPasskeyError] = useState('');
  const [passkeySuccess, setPasskeySuccess] = useState('');
  const [showRemovePasskey, setShowRemovePasskey] = useState(false);
  const [passkeyCount, setPasskeyCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    setWebAuthnSupported(
      typeof window !== 'undefined' && !!window.PublicKeyCredential
    );
  }, []);

  // Check if user has passkeys registered
  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const checkPasskeys = async () => {
      try {
        const { createClient } = await import('@/lib/supabase');
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data: creds } = await supabase
          .from('passkey_credentials')
          .select('id')
          .eq('user_id', user.id);

        if (creds && creds.length > 0) {
          setPasskeyRegistered(true);
          setPasskeyCount(creds.length);
        }
      } catch {
        // Silently fail — passkeys are optional
      }
    };

    checkPasskeys();
  }, [isLoggedIn, user]);

  const handleRegisterPasskey = async () => {
    if (!user) return;
    setPasskeyError('');
    setPasskeySuccess('');
    setPasskeyLoading(true);

    try {
      const { createClient } = await import('@/lib/supabase');
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error('Please log in again to set up biometric login');
      }

      // Step 1: Get registration options
      const optionsRes = await fetch('/api/auth/passkey/register-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!optionsRes.ok) {
        const errData = await optionsRes.json();
        throw new Error(errData.error || 'Failed to start registration');
      }

      const options = await optionsRes.json();

      // Step 2: Prompt the user's biometric
      const { startRegistration } = await import('@simplewebauthn/browser');
      const registrationResponse = await startRegistration({ optionsJSON: options });

      // Step 3: Verify the registration
      const verifyRes = await fetch('/api/auth/passkey/register-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(registrationResponse),
      });

      if (!verifyRes.ok) {
        const errData = await verifyRes.json();
        throw new Error(errData.error || 'Registration verification failed');
      }

      const verifyData = await verifyRes.json();

      if (verifyData.verified) {
        setPasskeyRegistered(true);
        setPasskeyCount((prev) => prev + 1);
        setPasskeySuccess('Biometric login set up successfully!');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to set up biometric login';
      if (message.includes('cancelled') || message.includes('canceled') || message.includes('AbortError') || message.includes('NotAllowedError')) {
        setPasskeyError('Setup was cancelled');
      } else {
        setPasskeyError(message);
      }
    } finally {
      setPasskeyLoading(false);
    }
  };

  const handleRemovePasskeys = async () => {
    if (!user) return;
    setPasskeyError('');
    setPasskeySuccess('');
    setPasskeyLoading(true);

    try {
      const { createClient } = await import('@/lib/supabase');
      const supabase = createClient();

      // Delete all passkeys for this user
      const { error: deleteError } = await supabase
        .from('passkey_credentials')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) {
        throw new Error('Failed to remove passkeys');
      }

      setPasskeyRegistered(false);
      setPasskeyCount(0);
      setShowRemovePasskey(false);
      setPasskeySuccess('All passkeys removed');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to remove passkeys';
      setPasskeyError(message);
    } finally {
      setPasskeyLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-2xl" />
        </div>
      </div>
    );
  }

  const totalLessons = ALL_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = userProgress.completedLessons.length;
  const coursePercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleChangePace = (hours: number) => {
    const plan = createStudyPlan(hours);
    // Preserve existing progress
    if (userProgress.studyPlan) {
      plan.completedDays = userProgress.studyPlan.completedDays;
      plan.currentDay = userProgress.studyPlan.currentDay;
      plan.checkpointResults = userProgress.studyPlan.checkpointResults;
      plan.startDate = userProgress.studyPlan.startDate;
    }
    setStudyPlan(plan);
    setShowPaceEditor(false);
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    router.push('/');
  };

  const planColors = {
    free: { bg: 'bg-[var(--foreground)]/10', text: 'text-[var(--foreground)]/60', border: 'border-[var(--foreground)]/20' },
    pro: { bg: 'bg-[#d4a520]/20', text: 'text-[#d4a520]', border: 'border-[#d4a520]/30' },
    premium: { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/30' },
  };

  return (
    <div className="px-4 py-4 max-w-5xl mx-auto md:px-8 md:py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:grid md:grid-cols-2 md:gap-4 md:items-start"
      >
        {/* Account Section - Auth aware */}
        {isLoggedIn && user ? (
          /* Logged In Profile Card */
          <Card padding="sm" className="text-center mb-3 md:col-span-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d4a520] to-[#27ae60] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
              {user.name}
            </h1>

            <div className="flex items-center justify-center gap-1 text-sm text-[var(--foreground)]/50 mb-3">
              <Mail className="w-3.5 h-3.5" />
              {user.email}
            </div>

            {/* Plan Badge */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${planColors[user.plan].bg} ${planColors[user.plan].text} ${planColors[user.plan].border}`}
              >
                <Crown className="w-3 h-3" />
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
              </span>
              {user.plan === 'free' && (
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#d4a520]/20 text-[#d4a520] border border-[#d4a520]/30 hover:bg-[#d4a520]/30 transition-colors"
                >
                  <ArrowUpRight className="w-3 h-3" />
                  Upgrade
                </Link>
              )}
            </div>

            <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/plan"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#d4a520]/10 text-[#d4a520] hover:bg-[#d4a520]/20 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Course Plan
              </Link>

              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#c0392b]/10 text-[#c0392b] hover:bg-[#c0392b]/20 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin Panel
                </Link>
              )}
            </div>

            {/* Course Progress */}
            <div className="max-w-xs mx-auto">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-[var(--foreground)]/50">{completedLessons}/{totalLessons} lessons</span>
                <span className="font-medium text-[#e94560]">{coursePercent}%</span>
              </div>
              <ProgressBar progress={coursePercent} color="primary" size="lg" />
              {userProgress.studyPlan && (
                <p className="text-xs text-[var(--foreground)]/40 mt-1 text-center">
                  Day {userProgress.studyPlan.currentDay} of {userProgress.studyPlan.totalDays} · {userProgress.studyPlan.dailyHours}h/day
                </p>
              )}
            </div>
          </Card>
        ) : (
          /* Not Logged In */
          <Card padding="sm" className="text-center mb-3 md:col-span-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#e94560] to-[#0f3460] rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
              German Learner
            </h1>

            <p className="text-sm text-[var(--foreground)]/50 mb-5">
              {FEATURE_FLAGS.canCreateAccounts
                ? 'Create an account to save progress across devices, unlock premium features, and track your journey.'
                : 'You are using guest mode right now. Progress stays on this device until real accounts go live.'}
            </p>

            {FEATURE_FLAGS.canCreateAccounts ? (
              <div className="flex items-center justify-center gap-3">
                <Link href="/auth/login">
                  <Button variant="ghost" size="md">
                    <LogIn className="w-4 h-4" />
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="md">
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="inline-flex items-center rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                {getAuthStatusMessage()}
              </div>
            )}

            {/* Course progress for non-logged users */}
            <div className="mt-5 pt-5 border-t border-[var(--card-border)]">
              <div className="max-w-xs mx-auto">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[var(--foreground)]/50">{completedLessons}/{totalLessons} lessons</span>
                  <span className="font-medium text-[#e94560]">{coursePercent}%</span>
                </div>
                <ProgressBar progress={coursePercent} color="primary" size="lg" />
                {userProgress.studyPlan && (
                  <p className="text-xs text-[var(--foreground)]/40 mt-1 text-center">
                    Day {userProgress.studyPlan.currentDay} of {userProgress.studyPlan.totalDays} · {userProgress.studyPlan.dailyHours}h/day
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Kuttan greeting — larger, more delightful */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-3 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-gradient-to-br from-[#d4a520]/10 via-[#27ae60]/5 to-transparent p-4 md:col-span-2"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#d4a520]/15 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <div className="flex-shrink-0">
              <Kuttan mood={coursePercent >= 100 ? 'celebrating' : coursePercent > 50 ? 'excited' : 'happy'} size="sm" entrance={true} />
            </div>
            <div className="flex-1">
              <div className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#d4a520]">
                Your German journey
              </div>
              <p className="text-sm leading-snug opacity-80">
                {coursePercent >= 100
                  ? 'Course complete! Adipoli work! 🏆'
                  : coursePercent > 50
                  ? `${coursePercent}% done — more than halfway there.`
                  : coursePercent > 0
                  ? `${coursePercent}% done. Every lesson gets you closer.`
                  : 'Start your first lesson — Kerala to Germany, one word at a time.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats inline strip */}
        <div className="mb-4 grid grid-cols-3 gap-2 md:col-span-2">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 text-center backdrop-blur-sm">
            <div className="text-xl font-extrabold text-[var(--foreground)]">{completedLessons}</div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--foreground)]/50">Lessons</div>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 text-center backdrop-blur-sm">
            <div className="text-xl font-extrabold text-[var(--foreground)]">{userProgress.learnedVocabulary.length}</div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--foreground)]/50">Words</div>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 text-center backdrop-blur-sm">
            <motion.div
              className="flex items-center justify-center gap-1 text-xl font-extrabold text-[var(--foreground)]"
              animate={userProgress.streak > 0 ? { scale: [1, 1.1, 1] } : undefined}
              transition={userProgress.streak > 0 ? { repeat: Infinity, duration: 1.8 } : undefined}
            >
              {userProgress.streak > 0 && <Flame className="h-4 w-4 text-orange-400" />}
              {userProgress.streak}
            </motion.div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--foreground)]/50">Streak</div>
          </div>
        </div>

        {/* === SECTION: PROGRESS === */}
        <div className="mb-3 mt-2 flex items-center gap-2 md:col-span-2">
          <div className="h-4 w-1 rounded-full bg-[#e94560]" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/60">Your progress</h2>
        </div>

        {/* Study Pace — compact inline */}
        <Card padding="sm" className="mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#e94560]" />
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Study Pace</h3>
            </div>
            <button
              onClick={() => setShowPaceEditor(!showPaceEditor)}
              className="text-xs text-[#e94560] font-medium"
            >
              {showPaceEditor ? 'Cancel' : 'Change'}
            </button>
          </div>
          {userProgress.studyPlan ? (
            <div className="mt-1.5 text-xs text-[var(--foreground)]/60">
              <strong className="text-[var(--foreground)]">{userProgress.studyPlan.dailyHours}h</strong>/day · <strong className="text-[var(--foreground)]">{userProgress.studyPlan.totalDays}</strong> days · Done by {getEstimatedCompletionDate(userProgress.studyPlan.dailyHours).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
            </div>
          ) : (
            <p className="mt-1.5 text-xs text-[var(--foreground)]/50">No study plan set yet.</p>
          )}
          {showPaceEditor && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-3 pt-3 border-t border-[var(--card-border)] space-y-2"
            >
              {HOUR_OPTIONS.map((option) => {
                const isActive = userProgress.studyPlan?.dailyHours === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleChangePace(option.value)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-[#d4a520]/15 border-[#d4a520]/40 ring-2 ring-[#d4a520]'
                        : 'bg-[var(--foreground)]/5 border-[var(--foreground)]/10 hover:border-[var(--foreground)]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{option.label}/day</span>
                      <span className="text-xs text-[var(--foreground)]/50">{option.sublabel}</span>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </Card>

        {/* Activity Calendar */}
        {userProgress.completedLessons.length > 0 && (
          <Card padding="sm" className="mb-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Activity</h3>
            <StreakCalendar completedLessons={userProgress.completedLessons} />
          </Card>
        )}

        {/* Course Progress — compact grid */}
        <Card padding="sm" className="mb-3 md:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-[var(--foreground)]">Course Progress</h2>
            <span className="text-xs text-[var(--foreground)]/50">
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5 md:grid-cols-9 md:gap-2">
            {ALL_MODULES.map((module) => {
              const completedModuleLessons = userProgress.completedLessons.filter((l) =>
                module.lessons.some((ml) => ml.id === l.lessonId)
              ).length;
              const progress = (completedModuleLessons / module.lessons.length) * 100;
              const isDone = progress === 100;
              const hasStarted = progress > 0;
              return (
                <Link
                  key={module.id}
                  href={`/learn/${module.id}`}
                  title={`Module ${module.id}: ${module.title}`}
                  className={`relative flex aspect-square flex-col items-center justify-center rounded-lg border text-center transition-all ${
                    isDone
                      ? 'border-emerald-400/40 bg-emerald-400/10 ring-2 ring-[#27ae60]/50 shadow-[0_0_12px_rgba(39,174,96,0.2)]'
                      : hasStarted
                      ? 'border-[#e94560]/30 bg-[#e94560]/5'
                      : 'border-[var(--foreground)]/10 bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10'
                  }`}
                >
                  <div className="text-base">{module.icon}</div>
                  <div className="text-[10px] font-semibold opacity-80">M{module.id}</div>
                  {hasStarted && !isDone && (
                    <div className="absolute inset-x-1 bottom-1 h-0.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#e94560]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                  {isDone && (
                    <div className="absolute right-0.5 top-0.5">
                      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400 text-white">
                        <Check className="h-2 w-2" strokeWidth={4} />
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </Card>

        {/* Exam Readiness */}
        {userProgress.completedLessons.length > 0 && (() => {
          const totalLessonsCalc = ALL_MODULES.reduce((s, m) => s + m.lessons.length, 0);
          const totalVocab = getAllVocabulary().length;
          const readiness = calculateExamReadiness({
            completedLessons: userProgress.completedLessons,
            totalLessons: totalLessonsCalc,
            learnedVocabulary: userProgress.learnedVocabulary.length,
            totalVocabulary: totalVocab,
            streak: userProgress.streak,
            gamesPlayed: userProgress.gamesPlayed,
            quizzesTaken: userProgress.quizzesTaken,
          });
          return (
            <Card padding="sm" className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                  <Award className="w-5 h-5" style={{ color: readiness.color }} />
                  A1 Exam Readiness
                </h2>
                <span className="text-2xl font-bold animate-shimmer" style={{ color: readiness.color }}>{readiness.score}%</span>
              </div>
              <ProgressBar progress={readiness.score} color={readiness.score >= 60 ? 'success' : 'warning'} size="md" />
              <p className="text-xs text-[var(--foreground)]/50 mt-1 mb-2">{readiness.label} · 60% needed to pass Goethe A1</p>

              {/* Collapsible breakdown */}
              <button onClick={() => setShowBreakdown(!showBreakdown)} className="text-xs text-[var(--foreground)]/40 text-center w-full py-1">
                {showBreakdown ? 'Hide breakdown ▲' : 'Show breakdown ▼'}
              </button>
              {showBreakdown && (
                <>
                  {/* Course vs Supplementary */}
                  <div className="grid grid-cols-2 gap-3 mb-3 mt-2">
                    <div className="bg-[var(--foreground)]/5 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold" style={{ color: readiness.color }}>{readiness.courseScore}/80</div>
                      <div className="text-xs text-[var(--foreground)]/40 mt-0.5">Course Path</div>
                      <div className="flex justify-center gap-1 mt-1">
                        {[
                          { label: 'Lessons', value: readiness.breakdown.lessons, max: 35 },
                          { label: 'Vocab', value: readiness.breakdown.vocabulary, max: 20 },
                          { label: 'Accuracy', value: readiness.breakdown.accuracy, max: 25 },
                        ].map(item => (
                          <div key={item.label} className="text-center">
                            <div className="text-xs font-bold text-[var(--foreground)]/80">{item.value}</div>
                            <div className="text-xs text-[var(--foreground)]/40">/{item.max}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[var(--foreground)]/5 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold" style={{ color: readiness.color, opacity: 0.7 }}>{readiness.supplementaryScore}/20</div>
                      <div className="text-xs text-[var(--foreground)]/40 mt-0.5">Extras</div>
                      <div className="flex justify-center gap-1 mt-1">
                        {[
                          { label: 'Games', value: readiness.breakdown.games, max: 8 },
                          { label: 'Tests', value: readiness.breakdown.tests, max: 7 },
                          { label: 'Streak', value: readiness.breakdown.streak, max: 5 },
                        ].map(item => (
                          <div key={item.label} className="text-center">
                            <div className="text-xs font-bold text-[var(--foreground)]/80">{item.value}</div>
                            <div className="text-xs text-[var(--foreground)]/40">/{item.max}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Next action + tips */}
                  <div className="bg-[var(--foreground)]/5 rounded-lg p-2">
                    <p className="text-xs font-semibold text-[var(--foreground)]/60 mb-1">Next step:</p>
                    <p className="text-xs text-[var(--foreground)]/50 mb-1">{readiness.nextAction}</p>
                    {readiness.tips.length > 0 && readiness.tips.map((tip, i) => (
                      <p key={i} className="text-xs text-[var(--foreground)]/40">- {tip}</p>
                    ))}
                  </div>
                </>
              )}
            </Card>
          );
        })()}

        {/* === SECTION: SETTINGS === */}
        <div className="mb-3 mt-4 flex items-center gap-2 md:col-span-2">
          <div className="h-4 w-1 rounded-full bg-[#d4a520]" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/60">Settings</h2>
        </div>

        {/* Biometric Login */}
        {isLoggedIn && (
          <Card padding="sm" className="mb-3">
            <h2 className="font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-[#d4a520]" />
              Biometric Login
            </h2>
            <p className="text-sm text-[var(--foreground)]/50 mb-4">
              Use your fingerprint or Face ID to log in without a password.
            </p>

            {!webAuthnSupported ? (
              <div className="flex items-center gap-2 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 text-[var(--foreground)]/40 px-4 py-3 rounded-xl text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                Not supported on this browser
              </div>
            ) : passkeyRegistered ? (
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 bg-[#27ae60]/10 border border-[#27ae60]/20 text-[#27ae60] px-4 py-3 rounded-xl text-sm"
                >
                  <Check className="w-4 h-4 flex-shrink-0" />
                  Passkey registered ({passkeyCount} {passkeyCount === 1 ? 'device' : 'devices'})
                </motion.div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={handleRegisterPasskey}
                    disabled={passkeyLoading}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#d4a520]/10 text-[#d4a520] rounded-lg text-sm font-medium hover:bg-[#d4a520]/20 transition-colors disabled:opacity-50"
                  >
                    <Fingerprint className="w-4 h-4" />
                    Add another device
                  </motion.button>

                  {!showRemovePasskey ? (
                    <motion.button
                      onClick={() => setShowRemovePasskey(true)}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </motion.button>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => setShowRemovePasskey(false)}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-2 bg-[var(--foreground)]/5 text-[var(--foreground)]/40 rounded-lg text-sm font-medium hover:bg-[var(--foreground)]/10 transition-colors"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        onClick={handleRemovePasskeys}
                        disabled={passkeyLoading}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                      >
                        Confirm Remove
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <motion.button
                onClick={handleRegisterPasskey}
                disabled={passkeyLoading}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#d4a520]/10 to-[#27ae60]/10 border border-[#d4a520]/30 rounded-xl text-[var(--foreground)] text-sm font-medium hover:from-[#d4a520]/20 hover:to-[#27ae60]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {passkeyLoading ? (
                  <div className="w-5 h-5 border-2 border-[#d4a520]/30 border-t-[#d4a520] rounded-full animate-spin" />
                ) : (
                  <>
                    <Fingerprint className="w-5 h-5 text-[#d4a520]" />
                    Set up Biometric Login
                  </>
                )}
              </motion.button>
            )}

            {/* Passkey error */}
            {passkeyError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-sm"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {passkeyError}
              </motion.div>
            )}

            {/* Passkey success */}
            {passkeySuccess && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 bg-[#27ae60]/10 border border-[#27ae60]/20 text-[#27ae60] px-4 py-2.5 rounded-xl text-sm"
              >
                <Check className="w-4 h-4 flex-shrink-0" />
                {passkeySuccess}
              </motion.div>
            )}
          </Card>
        )}

        {/* Lesson Scripts */}
        <Card padding="sm" className="mb-3">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1.5 flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#d4a520]" />
            Lesson Scripts
          </h3>
          <p className="text-xs text-[var(--foreground)]/50 mb-2.5">
            Download complete lesson scripts as PDF for offline study.
          </p>
          <a href="/scripts" className="inline-flex items-center gap-2 bg-[#d4a520]/10 text-[#d4a520] px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#d4a520]/20 transition-colors">
            <Download className="h-3.5 w-3.5" />
            View &amp; Download
          </a>
        </Card>

        {/* Danger zone — logout + reset combined */}
        <Card padding="sm" className="border-[#c0392b]/30">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#c0392b]" />
            Danger zone
          </h3>
          <div className="space-y-2">
            {isLoggedIn && (
              <>
                {!showLogoutConfirm ? (
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex w-full items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-2 text-xs font-medium text-orange-400 hover:bg-orange-500/20 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Log out
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-xs text-[var(--foreground)]/60 hover:bg-white/10">Cancel</button>
                    <button onClick={handleLogout} className="flex-1 rounded-lg bg-orange-500 px-3 py-2 text-xs font-medium text-white hover:bg-orange-600">Confirm logout</button>
                  </div>
                )}
              </>
            )}
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex w-full items-center gap-2 rounded-lg bg-[#c0392b]/10 px-3 py-2 text-xs font-medium text-red-400 hover:bg-[#c0392b]/20 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Reset all progress
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setShowResetConfirm(false)} className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-xs text-[var(--foreground)]/60 hover:bg-white/10">Cancel</button>
                <button onClick={handleReset} className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600">Confirm reset</button>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
