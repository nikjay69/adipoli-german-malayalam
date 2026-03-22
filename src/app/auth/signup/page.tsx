'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoggedIn } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const passwordChecks = {
    length: password.length >= 6,
    match: password.length > 0 && confirmPassword.length > 0 && password === confirmPassword,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await signup(name.trim(), email.trim(), password);
    setLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Signup failed');
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
            <span className="text-4xl animate-bounce-slow">&#x1F466;</span>
          </div>
          <div className="speech-bubble speech-bubble-arrow-top inline-block mx-auto mb-4">
            <p className="text-sm font-medium">Adipoli! Let&apos;s start your German journey!</p>
          </div>
          <h1 className="text-2xl font-bold gradient-text">Create Account</h1>
          <p className="text-[var(--foreground)]/50 text-sm mt-1">Join the German-Malayalam learning crew</p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
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

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
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
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]/70 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground)]/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-11 pr-4 py-3 bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-xl text-[var(--foreground)] placeholder:text-[var(--foreground)]/25 focus:outline-none focus:border-[#d4a520]/50 focus:ring-1 focus:ring-[#d4a520]/30 transition-all"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Password strength indicators */}
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-1"
              >
                <div className="flex items-center gap-2 text-xs">
                  <Check className={`w-3.5 h-3.5 ${passwordChecks.length ? 'text-[#27ae60]' : 'text-[var(--foreground)]/20'}`} />
                  <span className={passwordChecks.length ? 'text-[#27ae60]' : 'text-[var(--foreground)]/40'}>
                    At least 6 characters
                  </span>
                </div>
                {confirmPassword.length > 0 && (
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={`w-3.5 h-3.5 ${passwordChecks.match ? 'text-[#27ae60]' : 'text-red-400'}`} />
                    <span className={passwordChecks.match ? 'text-[#27ae60]' : 'text-red-400'}>
                      Passwords match
                    </span>
                  </div>
                )}
              </motion.div>
            )}

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
