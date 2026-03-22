'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { FEATURE_FLAGS, getAuthStatusMessage } from '@/lib/app-config';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isLoggedIn) {
      router.push('/');
    }
  }, [mounted, isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Login failed');
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
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Character and greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#d4a520]/20 to-[#27ae60]/20 border-2 border-[#d4a520]/30 mb-4">
            <span className="text-4xl animate-float">&#x1F466;</span>
          </div>
          <div className="speech-bubble speech-bubble-arrow-top inline-block mx-auto mb-4">
            <p className="text-sm font-medium">Welcome back machane! Ready to learn?</p>
          </div>
          <h1 className="text-2xl font-bold gradient-text">Log In</h1>
          <p className="text-[var(--foreground)]/50 text-sm mt-1">Continue your German journey</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="game-card p-6"
        >
          {!FEATURE_FLAGS.canCreateAccounts && (
            <div className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              {getAuthStatusMessage()}
            </div>
          )}
          {FEATURE_FLAGS.demoAuthEnabled && (
            <div className="mb-5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">
              Demo auth is enabled for local testing only. Do not use a real password here.
            </div>
          )}
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/30" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={!FEATURE_FLAGS.canCreateAccounts}
                  className="w-full pl-11 pr-4 py-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30 transition-all disabled:opacity-50"
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
                  disabled={!FEATURE_FLAGS.canCreateAccounts}
                  className="w-full pl-11 pr-12 py-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30 transition-all disabled:opacity-50"
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
              disabled={loading || !FEATURE_FLAGS.canCreateAccounts}
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

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Link
            href="/"
            className="text-sm text-[var(--foreground)]/30 hover:text-[var(--foreground)]/60 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
