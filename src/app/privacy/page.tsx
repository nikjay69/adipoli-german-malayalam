'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Trash2, Mail } from 'lucide-react';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-6 safe-top safe-bottom max-w-2xl mx-auto">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[var(--foreground)]/50 mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-6 h-6 text-[#27ae60]" />
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
        </div>
        <p className="text-[var(--foreground)]/40 text-sm mb-6">Last updated: March 2026</p>
      </motion.div>

      <div className="space-y-6 text-sm text-[var(--foreground)]/70 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">1. What We Collect</h2>
          <p className="mb-2">We collect only what's needed to provide the service and protect accounts:</p>
          <div className="space-y-2 ml-4">
            <div className="flex gap-2">
              <span className="text-[#27ae60] font-bold">•</span>
              <span><strong>Account info:</strong> Name, email, username (provided by you at signup)</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#27ae60] font-bold">•</span>
              <span><strong>Learning progress:</strong> Lessons completed, scores, XP, vocabulary learned</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#27ae60] font-bold">•</span>
              <span><strong>Session data (for account security):</strong> Device type, screen size, timezone, browser language, platform</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#d4a520] font-bold">•</span>
              <span><strong>Hashed IP address:</strong> Your IP is processed through a one-way SHA-256 hash before storage. The original IP is <strong>never stored</strong> and <strong>cannot be recovered</strong> from the hash. This is used solely to detect unauthorized account sharing.</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4" /> 2. Why We Collect It
          </h2>
          <div className="space-y-2 ml-4">
            <div className="flex gap-2">
              <span className="text-[#27ae60] font-bold">•</span>
              <span><strong>Account info:</strong> To create and manage your account</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#27ae60] font-bold">•</span>
              <span><strong>Progress:</strong> To save your learning state and show your advancement</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#27ae60] font-bold">•</span>
              <span><strong>Session & hashed IP data:</strong> Legitimate interest (GDPR Article 6(1)(f)) — protecting our service from unauthorized account sharing. This is the same legal basis used by Netflix, Spotify, and other subscription services.</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">3. How IP Hashing Works</h2>
          <div className="p-3 rounded-lg bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
            <p className="mb-2">Your IP address goes through this process:</p>
            <div className="font-mono text-xs space-y-1 text-[var(--foreground)]/50">
              <p>1. Your IP: <span className="text-[#c0392b]">192.168.1.100</span> (example)</p>
              <p>2. We add a salt: <span className="text-[#d4a520]">salt + 192.168.1.100</span></p>
              <p>3. SHA-256 hash: <span className="text-[#27ae60]">a3f2b8c1e9d4...</span></p>
              <p>4. Only the hash is stored. The IP is <strong>discarded immediately</strong>.</p>
            </div>
            <p className="mt-2 text-xs">SHA-256 is a one-way function. The hash cannot be reversed to find the original IP. We can only compare: "Is this the same network as before?" — not "What is the actual IP?"</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">4. What We Do NOT Collect</h2>
          <div className="space-y-1 ml-4">
            <p>❌ Raw IP addresses (never stored)</p>
            <p>❌ GPS/precise location</p>
            <p>❌ Contacts, photos, or files</p>
            <p>❌ Browsing history outside our app</p>
            <p>❌ Microphone recordings (speech recognition runs locally in your browser)</p>
            <p>❌ Third-party tracking cookies</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">5. Data Storage & Security</h2>
          <div className="space-y-2 ml-4">
            <p><strong>Provider:</strong> Supabase (PostgreSQL database hosted in EU/US)</p>
            <p><strong>Encryption:</strong> All data encrypted at rest and in transit (TLS 1.3)</p>
            <p><strong>Row Level Security:</strong> Users can only access their own data</p>
            <p><strong>Session data retention:</strong> 90 days, then automatically purged</p>
            <p><strong>Payment data:</strong> Processed by Razorpay (India) or Stripe (EU) — we never see your card details</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> 6. Your Rights (GDPR / DPDPA)
          </h2>
          <div className="space-y-2 ml-4">
            <p><strong>Right to access:</strong> Request a copy of all data we hold about you</p>
            <p><strong>Right to correction:</strong> Update your personal information anytime</p>
            <p><strong>Right to deletion:</strong> Request deletion of your account and all associated data</p>
            <p><strong>Right to data portability:</strong> Export your learning progress</p>
            <p><strong>Right to object:</strong> Object to session logging (note: this may require account verification alternatives)</p>
          </div>
          <p className="mt-2">To exercise any of these rights, contact us at the email below.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">7. Third Parties</h2>
          <div className="space-y-1 ml-4">
            <p><strong>Supabase:</strong> Database and authentication</p>
            <p><strong>Vercel:</strong> Web hosting</p>
            <p><strong>Google (Gemini):</strong> AI tutor responses (your messages are sent to Google's API)</p>
            <p><strong>Razorpay / Stripe:</strong> Payment processing</p>
            <p><strong>ipify.org:</strong> IP address lookup (only to hash — IP is not stored by us)</p>
          </div>
          <p className="mt-2">We do not sell or share your data with advertisers or data brokers.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">8. Cookies</h2>
          <p>We use only essential cookies for authentication (Supabase session). No tracking cookies, no analytics cookies, no advertising cookies.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" /> 9. Contact
          </h2>
          <p>For privacy questions, data requests, or complaints:</p>
          <p className="mt-1"><strong>Email:</strong> privacy@adipoligerman.com</p>
          <p className="text-xs text-[var(--foreground)]/40 mt-2">If you are in the EU, you also have the right to lodge a complaint with your local data protection authority.</p>
        </section>
      </div>

      <div className="mt-8 pt-4 border-t border-[var(--foreground)]/10 text-center text-xs text-[var(--foreground)]/30">
        Adipoli German · Privacy Policy · March 2026
      </div>
    </div>
  );
}
