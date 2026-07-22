'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, Info, Fingerprint } from 'lucide-react';
import { useAuthStore, isSupabaseReady } from '@/lib/auth-store';
import { startAuthentication } from '@simplewebauthn/browser';
import { Nivin } from '@/components/character/Nivin';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, isLoggedIn, initAuth } = useAuthStore();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [supabaseActive, setSupabaseActive] = useState(false);
  const [webAuthnSupported, setWebAuthnSupported] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSupabaseActive(isSupabaseReady());
    setWebAuthnSupported(
      typeof window !== 'undefined' && !!window.PublicKeyCredential
    );
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (mounted && isLoggedIn) {
      router.push('/');
    }
  }, [mounted, isLoggedIn, router]);

  const isEmail = emailOrUsername.includes('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailOrUsername.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await login(emailOrUsername.trim(), password);
    setLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    const result = await loginWithGoogle();
    setGoogleLoading(false);

    if (!result.success) {
      setError(result.error || 'Google login failed');
    }
  };

  const handlePasskeyLogin = async () => {
    setError('');
    setPasskeyLoading(true);

    try {
      // Step 1: Get authentication options from the server
      const optionsRes = await fetch('/api/auth/passkey/auth-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}), // No email = discoverable credential flow
      });

      if (!optionsRes.ok) {
        const errData = await optionsRes.json();
        throw new Error(errData.error || 'Failed to start passkey login');
      }

      const options = await optionsRes.json();

      // Step 2: Prompt the user's biometric / passkey
      const authResponse = await startAuthentication({ optionsJSON: options });

      // Step 3: Verify the response with the server
      const verifyRes = await fetch('/api/auth/passkey/auth-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authResponse),
      });

      if (!verifyRes.ok) {
        const errData = await verifyRes.json();
        throw new Error(errData.error || 'Passkey verification failed');
      }

      const verifyData = await verifyRes.json();

      if (verifyData.verified && verifyData.user) {
        // Set user directly in the store (manual session)
        useAuthStore.setState({
          user: {
            id: verifyData.user.id,
            name: verifyData.user.name,
            username: verifyData.user.username,
            email: verifyData.user.email,
            isAdmin: verifyData.user.isAdmin,
            plan: verifyData.user.plan,
            createdAt: Date.now(),
          },
          isLoggedIn: true,
        });

        router.push('/');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Passkey login failed';
      // User cancelled the biometric prompt
      if (message.includes('cancelled') || message.includes('canceled') || message.includes('AbortError') || message.includes('NotAllowedError')) {
        setError('Biometric authentication was cancelled');
      } else {
        setError(message);
      }
    } finally {
      setPasskeyLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d4a520] to-[#27ae60] rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(212,165,32,0.25), transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(39,174,96,0.22), transparent 70%)' }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Header with Nivin */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center mb-3">
            <Nivin mood="waving" size="md" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Welcome back, machaa!</h1>
          <p className="text-[var(--foreground)]/60 text-sm">
            Ready to continue? Your streak is waiting.
          </p>
        </motion.div>

        {/* Demo mode badge */}
        {!supabaseActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-[#d4a520]/10 border border-[#d4a520]/20 text-[#d4a520] px-4 py-2.5 rounded-xl text-xs mb-5"
          >
            <Info className="w-4 h-4 flex-shrink-0" />
            Demo mode — using local storage
          </motion.div>
        )}

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="game-card p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Email or Username */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                {isEmail ? 'Email' : 'Email or Username'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/30" />
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="you@example.com or username"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30 transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30 hover:text-[var(--foreground)]/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
              className="game-button w-full flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#1b2d1b]/30 border-t-[#1b2d1b] rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Log In
                </>
              )}
            </motion.button>
          </form>

          {/* Passkey Login */}
          {supabaseActive && webAuthnSupported && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--foreground)]/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-[var(--card-bg,#1a1a2e)] text-[var(--foreground)]/30">or</span>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handlePasskeyLogin}
                disabled={passkeyLoading}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#d4a520]/10 to-[#27ae60]/10 border border-[#d4a520]/30 rounded-xl text-[var(--foreground)] text-sm font-medium hover:from-[#d4a520]/20 hover:to-[#27ae60]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {passkeyLoading ? (
                  <div className="w-5 h-5 border-2 border-[#d4a520]/30 border-t-[#d4a520] rounded-full animate-spin" />
                ) : (
                  <>
                    <Fingerprint className="w-5 h-5 text-[#d4a520]" />
                    Sign in with Fingerprint / Face ID
                  </>
                )}
              </motion.button>
            </>
          )}

          {/* Divider */}
          {supabaseActive && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--foreground)]/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-[var(--card-bg,#1a1a2e)] text-[var(--foreground)]/30">or</span>
                </div>
              </div>

              {/* Google Login */}
              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[var(--foreground)] text-sm font-medium hover:bg-[var(--foreground)]/8 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {googleLoading ? (
                  <div className="w-5 h-5 border-2 border-[var(--foreground)]/20 border-t-[var(--foreground)]/60 rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </>
                )}
              </motion.button>
            </>
          )}

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--foreground)]/50">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/signup"
                className="text-[#d4a520] font-medium hover:text-[#e8c54a] transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Guest mode reassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-5 text-center text-xs text-[var(--foreground)]/50 leading-relaxed px-2"
        >
          No account? Keep going as guest — your progress stays on this device.
        </motion.p>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <Link
            href="/"
            className="text-sm text-[var(--foreground)]/40 hover:text-[#d4a520] transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
