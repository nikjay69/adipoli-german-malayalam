'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  BookOpen, Mic, Gamepad2, GraduationCap, MapPin, WifiOff,
  Check, Star, ArrowRight, Users, ChevronDown, Sparkles, Zap,
  Quote,
} from 'lucide-react';

/* ================================================================
   ANIMATED COUNTER — counts up when scrolled into view
   ================================================================ */
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const ctrl = animate(motionVal, target, { duration: 1.8, ease: 'easeOut' });
      return () => ctrl.stop();
    }
  }, [isInView, motionVal, target]);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ================================================================
   SECTION WRAPPER — fade + slide on scroll
   ================================================================ */
function Section({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ================================================================
   FEATURE DATA
   ================================================================ */
const features = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: 'Linear Course',
    description: '18 modules from Hello to Exam Ready. Spoon-fed, no overwhelm.',
    color: '#27ae60',
  },
  {
    icon: <Mic className="w-7 h-7" />,
    title: 'Speak & Practice',
    description: 'Pronunciation checker, Pimsleur-style drills, AI tutor.',
    color: '#d4a520',
  },
  {
    icon: <Gamepad2 className="w-7 h-7" />,
    title: '8 Fun Games',
    description: 'Word Match, Article Blitz, Verb Rush, and more. Learning = fun.',
    color: '#c0392b',
  },
  {
    icon: <GraduationCap className="w-7 h-7" />,
    title: 'Goethe A1 Tests',
    description: '8 full simulation tests in the official Goethe format.',
    color: '#8e44ad',
  },
  {
    icon: <MapPin className="w-7 h-7" />,
    title: 'Kerala to Germany Journey',
    description: 'Your journey from home to the airport gate — every lesson moves you closer.',
    color: '#e67e22',
  },
  {
    icon: <WifiOff className="w-7 h-7" />,
    title: 'Works Offline',
    description: 'Download scripts and audio files. Study on the train, bus, or backwaters.',
    color: '#2980b9',
  },
];

/* ================================================================
   FREE TRIAL MODULES
   ================================================================ */
const freeModules = [
  { icon: '👋', title: 'Module 1: Welcome to German', lessons: 5 },
  { icon: '🪪', title: 'Module 2: Who Are You?', lessons: 5 },
  { icon: '🔢', title: 'Module 3: Numbers & Time', lessons: 5 },
];

/* ================================================================
   PRICING DATA
   ================================================================ */
const pricing = [
  {
    name: 'Free Trial',
    priceINR: 'Free',
    priceEUR: 'Free',
    period: 'forever',
    features: ['3 modules', '4 games', 'Basic practice', 'Free forever'],
    cta: 'Start Free',
    recommended: false,
    color: '#27ae60',
  },
  {
    name: 'Pro',
    priceINR: '499',
    priceEUR: '9.99',
    period: '/mo',
    features: ['All 18 modules', 'All 8 games', 'AI tutor', 'Pronunciation checker'],
    cta: 'Go Pro',
    recommended: true,
    color: '#d4a520',
  },
  {
    name: 'Premium',
    priceINR: '999',
    priceEUR: '19.99',
    period: '/mo',
    features: ['Everything in Pro', '8 Goethe mock tests', 'PDF scripts', 'Voice practice', 'Certificate'],
    cta: 'Go Premium',
    recommended: false,
    color: '#c0392b',
  },
];

/* ================================================================
   TESTIMONIALS
   ================================================================ */
const testimonials = [
  {
    name: 'Arun',
    location: 'Kochi',
    text: 'This is the first time German learning actually felt natural. The Manglish explanations make everything click!',
    avatar: '👨‍💻',
  },
  {
    name: 'Lakshmi',
    location: 'Trivandrum',
    text: 'I tried Duolingo but it felt so foreign. Adipoli German feels like a friend is teaching me. Love the Kerala references!',
    avatar: '👩‍🎓',
  },
  {
    name: 'Rahul',
    location: 'Berlin',
    text: 'Wish I had this before I moved to Germany. The Goethe exam prep is spot on. Highly recommend for anyone planning to study here.',
    avatar: '👨‍🔬',
  },
];

/* ================================================================
   STATS DATA
   ================================================================ */
const stats = [
  { value: 18, label: 'Modules', suffix: '' },
  { value: 90, label: 'Lessons', suffix: '' },
  { value: 690, label: 'Exercises', suffix: '' },
  { value: 758, label: 'Vocabulary', suffix: '' },
];

/* ================================================================
   FLOATING PARTICLES BACKGROUND
   ================================================================ */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background: ['#d4a520', '#27ae60', '#c0392b'][i % 3],
            opacity: 0.15,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================
   MAIN LANDING PAGE
   ================================================================ */
export default function LandingPage() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowScrollHint(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#1b2d1b] text-[#f5f0e8] overflow-x-hidden">

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a0d] via-[#1b2d1b] to-[#1b2d1b]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#d4a520]/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#27ae60]/[0.03] rounded-full blur-[100px]" />
          <FloatingParticles />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#d4a520]/10 border border-[#d4a520]/20 rounded-full px-4 py-1.5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#d4a520]" />
            <span className="text-sm font-medium text-[#d4a520]">A1 to A2.1 CEFR Level</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6"
          >
            <span className="block">Learn German.</span>
            <span className="block mt-2 bg-gradient-to-r from-[#d4a520] via-[#e8c54a] to-[#d4a520] bg-clip-text text-transparent">
              From Kerala to Germany.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg sm:text-xl text-[#f5f0e8]/60 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            The first German course designed for Malayalees. Learn with Manglish,
            Kerala culture, and fun.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(212, 165, 32, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="game-button text-lg px-10 py-4 flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Start Free Trial
              </motion.button>
            </Link>

            <Link
              href="/auth/login"
              className="text-[#f5f0e8]/50 hover:text-[#d4a520] transition-colors text-sm font-medium"
            >
              Already have an account? <span className="underline underline-offset-2">Log in</span>
            </Link>
          </motion.div>

          {/* Goethe badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-[#f5f0e8]/30 text-sm"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Goethe A1 Exam Prep Included</span>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showScrollHint ? 1 : 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-[#f5f0e8]/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================
          STATS BAR
          ============================================================ */}
      <Section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="game-card p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl sm:text-4xl font-extrabold gradient-text">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-[#f5f0e8]/40 mt-1 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-[#f5f0e8]/[0.06] mt-6 pt-6">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-[#f5f0e8]/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#27ae60]" />
                  <span>A1 to A2.1 CEFR Level</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#d4a520]" />
                  <span>Goethe A1 Exam Prep</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c0392b]" />
                  <span>Made for Malayalees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          WHAT YOU GET
          ============================================================ */}
      <Section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Everything you need to{' '}
              <span className="gradient-text">crack German</span>
            </h2>
            <p className="text-[#f5f0e8]/50 max-w-lg mx-auto">
              A complete course designed from scratch for how Malayalees actually learn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -4, borderColor: `${feat.color}40` }}
                className="game-card p-6 transition-colors duration-300 group cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${feat.color}15`, color: feat.color }}
                >
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-[#f5f0e8]/50 leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================
          FREE TRIAL SECTION
          ============================================================ */}
      <Section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative game-card overflow-hidden">
            {/* Glow behind */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#27ae60]/[0.06] rounded-full blur-[80px]" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#d4a520]/[0.06] rounded-full blur-[80px]" />

            <div className="relative p-8 sm:p-12">
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-[#27ae60]/10 border border-[#27ae60]/20 rounded-full px-4 py-1.5 mb-4"
                >
                  <Zap className="w-4 h-4 text-[#27ae60]" />
                  <span className="text-sm font-bold text-[#27ae60]">No credit card needed</span>
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
                  Try <span className="text-[#27ae60]">3 Modules</span> Free
                </h2>
                <p className="text-[#f5f0e8]/50">
                  Get a real taste of the course. No strings attached.
                </p>
              </div>

              {/* Module list */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {freeModules.map((mod, i) => (
                  <motion.div
                    key={mod.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    viewport={{ once: true }}
                    className="glass-card p-5 text-center"
                  >
                    <div className="text-3xl mb-3">{mod.icon}</div>
                    <h4 className="font-bold text-sm mb-1">{mod.title}</h4>
                    <p className="text-xs text-[#f5f0e8]/40">{mod.lessons} lessons</p>
                  </motion.div>
                ))}
              </div>

              {/* Plus extras */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                <div className="flex items-center gap-2 bg-[#d4a520]/10 border border-[#d4a520]/15 rounded-full px-4 py-2">
                  <Gamepad2 className="w-4 h-4 text-[#d4a520]" />
                  <span className="text-sm text-[#d4a520] font-medium">+ 4 basic games</span>
                </div>
                <div className="flex items-center gap-2 bg-[#27ae60]/10 border border-[#27ae60]/15 rounded-full px-4 py-2">
                  <BookOpen className="w-4 h-4 text-[#27ae60]" />
                  <span className="text-sm text-[#27ae60] font-medium">15 lessons total</span>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link href="/auth/signup">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="game-button-success text-lg font-extrabold px-10 py-4 rounded-2xl border-none cursor-pointer flex items-center gap-2 mx-auto"
                    style={{
                      boxShadow: '0 5px 0 #14572b, 0 7px 16px rgba(0,0,0,0.3)',
                    }}
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          PRICING
          ============================================================ */}
      <Section className="py-20 px-4" delay={0.1}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Simple <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-[#f5f0e8]/50 max-w-md mx-auto">
              Start free. Upgrade when you're ready. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                  plan.recommended
                    ? 'bg-gradient-to-b from-[#d4a520]/[0.12] to-[rgba(39,62,39,0.6)] border-2 border-[#d4a520]/40 shadow-lg shadow-[#d4a520]/10'
                    : 'game-card'
                }`}
              >
                {/* Recommended badge */}
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="bg-[#d4a520] text-[#1b2d1b] text-xs font-extrabold px-4 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#1b2d1b]" />
                      RECOMMENDED
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: plan.color }}>{plan.name}</h3>
                  <div className="mb-1">
                    {plan.priceINR === 'Free' ? (
                      <span className="text-4xl font-extrabold">Free</span>
                    ) : (
                      <>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-lg text-[#f5f0e8]/40">&#8377;</span>
                          <span className="text-4xl font-extrabold">{plan.priceINR}</span>
                          <span className="text-[#f5f0e8]/40 text-sm">{plan.period}</span>
                        </div>
                        <div className="text-xs text-[#f5f0e8]/30 mt-1">
                          or &euro;{plan.priceEUR}{plan.period}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: plan.color }}
                      />
                      <span className="text-[#f5f0e8]/70">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/auth/signup" className="block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer border-none ${
                      plan.recommended
                        ? 'game-button text-base'
                        : 'bg-[#f5f0e8]/[0.08] hover:bg-[#f5f0e8]/[0.14] text-[#f5f0e8] border border-[#f5f0e8]/[0.12]'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
      <Section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              What learners are <span className="gradient-text">saying</span>
            </h2>
            <p className="text-[#f5f0e8]/40 text-sm">
              Coming soon — real reviews from our beta users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-[#d4a520]/20 mb-4" />
                <p className="text-sm text-[#f5f0e8]/70 leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4a520]/10 border border-[#d4a520]/20 flex items-center justify-center text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-[#f5f0e8]/40">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <Section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 -m-20">
              <div className="absolute inset-0 bg-[#d4a520]/[0.03] rounded-full blur-[100px]" />
            </div>

            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
                  Ready to start your{' '}
                  <span className="gradient-text">German journey</span>?
                </h2>
                <p className="text-[#f5f0e8]/50 mb-8 max-w-md mx-auto">
                  Join 1000+ Malayalees learning German the fun way.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4"
              >
                <Link href="/auth/signup">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(212, 165, 32, 0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="game-button text-lg px-12 py-5 flex items-center gap-3"
                  >
                    <Zap className="w-5 h-5" />
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <div className="flex items-center gap-2 text-[#f5f0e8]/30 text-sm mt-2">
                  <Users className="w-4 h-4" />
                  <span>Join 1000+ Malayalees learning German</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="border-t border-[#f5f0e8]/[0.06] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#d4a520]/20 flex items-center justify-center text-sm">
                  🇩🇪
                </div>
                <span className="font-extrabold gradient-text">Adipoli German</span>
              </div>
              <p className="text-xs text-[#f5f0e8]/30 leading-relaxed">
                The first German course built for Malayalees. From Kerala, with love.
              </p>
            </div>

            {/* Links: Product */}
            <div>
              <h4 className="text-xs font-bold uppercase text-[#f5f0e8]/30 mb-3 tracking-wider">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/landing" className="text-sm text-[#f5f0e8]/50 hover:text-[#d4a520] transition-colors">Home</Link></li>
                <li><Link href="/landing#pricing" className="text-sm text-[#f5f0e8]/50 hover:text-[#d4a520] transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Links: Account */}
            <div>
              <h4 className="text-xs font-bold uppercase text-[#f5f0e8]/30 mb-3 tracking-wider">Account</h4>
              <ul className="space-y-2">
                <li><Link href="/auth/login" className="text-sm text-[#f5f0e8]/50 hover:text-[#d4a520] transition-colors">Login</Link></li>
                <li><Link href="/auth/signup" className="text-sm text-[#f5f0e8]/50 hover:text-[#d4a520] transition-colors">Signup</Link></li>
              </ul>
            </div>

            {/* Links: Connect */}
            <div>
              <h4 className="text-xs font-bold uppercase text-[#f5f0e8]/30 mb-3 tracking-wider">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-[#f5f0e8]/50 hover:text-[#d4a520] transition-colors">Contact</a></li>
                <li><a href="#" className="text-sm text-[#f5f0e8]/50 hover:text-[#d4a520] transition-colors">Instagram</a></li>
                <li><a href="#" className="text-sm text-[#f5f0e8]/50 hover:text-[#d4a520] transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#f5f0e8]/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#f5f0e8]/25">
              Made with &#10084;&#65039; in Kerala
            </p>
            <p className="text-xs text-[#f5f0e8]/20">
              &copy; {new Date().getFullYear()} Adipoli German. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
