# Launch Checklist — What Sister Does When Ready

This is the hand-off document. Everything on the **code side** is being built by Claude in parallel sessions. Everything on the **bureaucracy side** is what sister (the business owner) does when she's ready to go live.

---

## Part A — Business setup (sister, ~2 weeks)

1. **Udyam / MSME registration** — https://udyamregistration.gov.in — free, 15 min.
2. **Current account** — any bank; minimum AQB ~₹10k. About 1 week.
3. **PAN** — sister's existing personal PAN is fine for a sole prop.
4. **CA consultation** — 1 hour, ~₹3–5k. Review Udyam certificate, answer "should I register for GST voluntarily?" (yes if most revenue will be foreign).

### Payment processors (after Udyam + account ready)

5. **Razorpay** — https://razorpay.com — sign up with Udyam doc + bank statement + PAN. 2–5 day review. **Enable International cards in settings** once approved.
6. **Paddle** — https://paddle.com — sign up with Udyam doc + PAN + business description + website URL (adipoli-german.vercel.app). 3–7 day review. Paddle vets more strictly than Razorpay.

---

## Part B — Supabase project (tech side, 15 min)

7. Create a Supabase project at https://supabase.com — free tier is fine to start.
8. In the SQL editor, paste and run **`supabase/schema.sql`** from this repo. This creates all tables + RLS policies + triggers.
9. Then run **`supabase/fix-rls-recursion.sql`** and **`supabase/lock-profile-updates.sql`** (smaller follow-up SQL files that tighten security).
10. Copy the project's **URL** and **anon key** from Settings → API.
11. In Vercel dashboard → project → Settings → Environment Variables, set:
    - `NEXT_PUBLIC_SUPABASE_URL` = the project URL
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon key
    - `SUPABASE_SERVICE_ROLE_KEY` = the service_role key (for webhook handlers)

**After this, auth works for all users on the next deploy.**

---

## Part C — Paddle configuration (when Paddle account is approved)

12. In Paddle dashboard → Catalog → create two products:
    - **Adipoli German — Pro** (€14.99/month)
    - **Adipoli German — Premium** (€24.99/month)
13. Copy each product's `product_id` and `price_id`.
14. In Paddle dashboard → Developer Tools → **Client-side token** — copy the public token.
15. In Paddle dashboard → Notifications → Webhook endpoints → add:
    - URL: `https://adipoli-german.vercel.app/api/webhooks/paddle`
    - Events: all subscription events (`subscription.created`, `subscription.updated`, `subscription.canceled`, `transaction.completed`, etc.)
    - Copy the generated **webhook secret**.
16. Set Vercel env vars:
    - `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` = client-side token
    - `PADDLE_API_KEY` = server-side API key
    - `PADDLE_WEBHOOK_SECRET` = webhook secret
    - `NEXT_PUBLIC_PADDLE_PRO_PRICE_ID` = pro monthly price id
    - `NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID` = premium monthly price id
    - `PADDLE_ENV` = `sandbox` for testing, `production` for real

---

## Part D — Razorpay configuration (when Razorpay account is approved)

17. In Razorpay dashboard → Settings → API Keys → generate Key ID + Key Secret.
18. In Razorpay dashboard → Subscriptions → create two plans:
    - **Pro monthly** — ₹499/month
    - **Premium monthly** — ₹999/month
    - Copy each plan's `plan_id`.
19. In Razorpay dashboard → Settings → Webhooks → add:
    - URL: `https://adipoli-german.vercel.app/api/webhooks/razorpay`
    - Events: `subscription.activated`, `subscription.charged`, `subscription.cancelled`, `subscription.pending`, `subscription.halted`, `payment.failed`
    - Copy the generated **webhook secret**.
20. Set Vercel env vars:
    - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = key id (public)
    - `RAZORPAY_KEY_SECRET` = key secret (private)
    - `RAZORPAY_WEBHOOK_SECRET` = webhook secret
    - `NEXT_PUBLIC_RAZORPAY_PRO_PLAN_ID` = pro plan id
    - `NEXT_PUBLIC_RAZORPAY_PREMIUM_PLAN_ID` = premium plan id

---

## Part E — Email (optional, day 1 is fine with Supabase defaults)

21. Sign up for Resend (https://resend.com) — free for 3000 emails/month.
22. Verify a sending domain (`adipoli.in` or similar; can use Resend's subdomain temporarily).
23. Set `RESEND_API_KEY` in Vercel.
24. Supabase auth emails (signup confirmation, password reset) work out of the box with Supabase's default sender. Custom templates + Resend come later.

---

## Part F — Go-live checklist

- [ ] All Vercel env vars set (Supabase + Paddle + Razorpay + Resend)
- [ ] Paddle in **production** mode (not sandbox)
- [ ] Razorpay in **live** mode (not test)
- [ ] Webhook endpoints tested (send a test event from each dashboard; verify 200 response)
- [ ] `FEATURE_FLAGS.authReady` returns `true` (check `/api/debug/flags` endpoint)
- [ ] `FEATURE_FLAGS.paymentsReady` returns `true`
- [ ] Create one test account, pay ₹499 via Razorpay test mode, verify subscription appears in Supabase
- [ ] Create one test account, pay €14.99 via Paddle sandbox, verify subscription appears in Supabase
- [ ] Cancel both test subscriptions from the user profile page; verify `status = canceled` in Supabase
- [ ] Reset Vercel env vars to production keys
- [ ] Deploy
- [ ] Tell three Malayali friends to try the live site

---

## Ongoing compliance (once revenue flows)

- **GST registration** — mandatory above ₹20L turnover/year. File quarterly via CA or self-serve on gst.gov.in.
- **LUT (Letter of Undertaking)** — file once per financial year, lets foreign sales (Paddle payouts) be zero-rated. Without it, 18% GST is charged and refundable (but slow).
- **FIRC** — the bank issues this for each foreign remittance. Keep on file for GST audits.
- **ITR-3** — sister files this annually by July 31. Business income + expenses.
- **Bookkeeping** — Zoho Books (~₹500/mo) or a spreadsheet is fine below ₹50L.

---

## What sister should NOT worry about on day 1

- Private limited / LLP incorporation (wait until revenue ≥ ₹50L or you need to fundraise)
- Trademark registration (file once you have a brand worth protecting, ~₹4.5k/class)
- EU VAT registration (Paddle handles it on sister's behalf as Merchant of Record)
- US sales tax (Paddle handles)
- Stripe / PayPal / other processors (Paddle + Razorpay cover 98% of target markets)
