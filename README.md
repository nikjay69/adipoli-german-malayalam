# Adipoli German

German learning platform for Malayalam speakers, built with Next.js.

Live app: https://adipoli-german.vercel.app/

## Stack
- Next.js 16
- React 19
- Tailwind 4
- Zustand
- Framer Motion

## Current MVP direction
- Guided A1 course first; games later
- Target ~35h owned video lessons for Malayali beginners
- Phone-first + desktop-friendly learner flow
- Must-do path for passing Goethe A1
- Score-booster path for stronger marks
- Closed checkpoints that diagnose Hören/Lesen/Schreiben/Sprechen/grammar/vocab
- Manual scoring/rubrics are acceptable for MVP; AI is optional support

## Current product shape
- 18 learning modules in the app scaffold
- missions/practice modes, with games treated as later reinforcement
- vocabulary audio + thumbnails
- Goethe A1 test prep
- AI tutor route (when Gemini is configured, not required for MVP)

## Important runtime truth
This repo currently ships in **guest-first mode** by default.

That means:
- learners can use the course without accounts
- progress is stored on the current device/browser
- auth is intentionally **disabled by default** until real backend auth is wired
- payments are **preview-only** until real checkout is wired
- demo auth can be enabled locally for testing, but should not be used in production

This is deliberate: fake client-side auth is worse than honest guest mode.

## Environment variables

### Optional / current
```bash
# AI tutor
GEMINI_API_KEY=

# Demo auth for local testing only
NEXT_PUBLIC_ENABLE_DEMO_AUTH=false
```

### Planned real auth
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Planned payments
```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## Getting started
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build
```bash
npm run build
```

## Recommended next steps
1. Replace guest/demo auth with real Supabase or Firebase auth
2. Move progress sync to a real database
3. Wire Razorpay / Stripe checkout + webhooks
4. Move generated media to object storage/CDN over time
5. Keep marketing copy aligned with what is truly live
