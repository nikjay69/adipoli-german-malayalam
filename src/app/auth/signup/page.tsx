'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AtSign, UserPlus, Eye, EyeOff, AlertCircle, Info } from 'lucide-react';
import { useAuthStore, isSupabaseReady } from '@/lib/auth-store';

function getPasswordStrength(pw: string): { label: string; level: 0 | 1 | 2 | 3 } {
  if (pw.length === 0) return { label: '', level: 0 };
  if (pw.length < 6) return { label: 'Weak', level: 1 };
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  if (pw.length >= 8 && score >= 3) return { label: 'Strong', level: 3 };
  if (pw.length >= 6 && score >= 2) return { label: 'Medium', level: 2 };
  return { label: 'Weak', level: 1 };
}

const strengthColors: Record<number, string> = {
  0: 'bg-[var(--foreground)]/10',
  1: 'bg-red-500',
  2: 'bg-[#d4a520]',
  3: 'bg-[#27ae60]',
};

const strengthTextColors: Record<number, string> = {
  0: 'text-[var(--foreground)]/30',
  1: 'text-red-400',
  2: 'text-[#d4a520]',
  3: 'text-[#27ae60]',
};

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle, isLoggedIn, initAuth } = useAuthStore();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [supabaseActive, setSupabaseActive] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  useEffect(() => {
    setMounted(true);
    setSupabaseActive(isSupabaseReady());
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (mounted && isLoggedIn) {
      router.push('/');
    }
  }, [mounted, isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
      setError('Username must be 3-20 characters (letters, numbers, underscores)');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await signup(name.trim(), email.trim(), password, username.trim().toLowerCase());
    setLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Signup failed');
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">Start Learning German</h1>
          <p className="text-[var(--foreground)]/50 text-sm">
            Join the German-Malayalam learning crew
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

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="game-card p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/30" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  placeholder="Pick a unique username"
                  maxLength={20}
                  className="w-full pl-11 pr-4 py-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30 transition-all"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30 transition-all"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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
                  placeholder="At least 6 characters"
                  className="w-full pl-11 pr-12 py-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30 transition-all"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30 hover:text-[var(--foreground)]/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2.5"
                >
                  <div className="flex gap-1.5 mb-1.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                          i <= strength.level ? strengthColors[strength.level] : strengthColors[0]
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs ${strengthTextColors[strength.level]}`}>
                    {strength.label}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
              className="game-button game-button-success w-full flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

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

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--foreground)]/50">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-[#d4a520] font-medium hover:text-[#e8c54a] transition-colors"
              >
                Log in
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
