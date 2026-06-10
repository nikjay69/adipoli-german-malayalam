-- ========================================================================
-- Adipoli German — Complete Supabase schema
-- ========================================================================
-- Apply this file once to a fresh Supabase project to set up:
--   1. User profiles (extends auth.users)
--   2. Subscriptions (Paddle + Razorpay)
--   3. Payment records
--   4. Session logs (activity heartbeat)
--   5. Passkey credentials (WebAuthn biometric login)
--   6. Helper RPC: get_login_email (username → email)
--   7. Trigger: auto-create profile on signup
--
-- See also:
--   - supabase/fix-rls-recursion.sql (RLS tweaks)
--   - supabase/lock-profile-updates.sql (server-only updates to plan)
-- ========================================================================

-- ========================================================================
-- 1. User profiles
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  country_code TEXT,                    -- ISO-3166 e.g. 'IN', 'DE', 'US'. Populated via IP on first signup.
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'premium')),
  plan_expires_at TIMESTAMPTZ,          -- set by webhook; null for 'free' or lifetime
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- ========================================================================
-- 2. Subscriptions (recurring) — one row per active subscription
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('paddle', 'razorpay')),
  provider_subscription_id TEXT NOT NULL,   -- Paddle subscription_id or Razorpay subscription_id
  provider_customer_id TEXT,                -- Paddle customer_id or Razorpay customer_id
  plan TEXT NOT NULL CHECK (plan IN ('pro', 'premium')),
  status TEXT NOT NULL CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'paused', 'expired')),
  billing_interval TEXT CHECK (billing_interval IN ('monthly', 'yearly')),
  currency TEXT CHECK (currency IN ('INR', 'EUR', 'USD')),
  amount DECIMAL(10,2),                     -- latest charge amount for display
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (provider, provider_subscription_id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all subscriptions" ON public.subscriptions;
CREATE POLICY "Admins can view all subscriptions" ON public.subscriptions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- ========================================================================
-- 3. Payment records (one-off payments + subscription invoices)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('INR', 'EUR', 'USD')),
  plan TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('paddle', 'razorpay')),
  provider_payment_id TEXT,
  provider_invoice_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  tax_amount DECIMAL(10,2),
  tax_type TEXT,                     -- 'VAT' (EU), 'GST' (IN), 'sales_tax' (US), etc.
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON public.payments(subscription_id);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;
CREATE POLICY "Admins can view all payments" ON public.payments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- ========================================================================
-- 4. Session logs (activity heartbeat — used by session-logger.ts)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.session_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  fingerprint TEXT,                  -- browser / device fingerprint
  user_agent TEXT,
  ip_hash TEXT,                      -- sha256 of IP, not raw IP
  country_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_session_logs_user_id ON public.session_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_session_logs_created_at ON public.session_logs(created_at);

ALTER TABLE public.session_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert own session logs" ON public.session_logs;
CREATE POLICY "Users can insert own session logs" ON public.session_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own session logs" ON public.session_logs;
CREATE POLICY "Users can view own session logs" ON public.session_logs
  FOR SELECT USING (auth.uid() = user_id);

-- ========================================================================
-- 5. Passkey credentials (WebAuthn biometric login)
-- ========================================================================
CREATE TABLE IF NOT EXISTS public.passkey_credentials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  credential_id TEXT NOT NULL UNIQUE,
  public_key TEXT NOT NULL,
  counter BIGINT DEFAULT 0,
  transports TEXT[],
  device_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_used_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_passkey_user_id ON public.passkey_credentials(user_id);

ALTER TABLE public.passkey_credentials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own passkeys" ON public.passkey_credentials;
CREATE POLICY "Users manage own passkeys" ON public.passkey_credentials
  FOR ALL USING (auth.uid() = user_id);

-- ========================================================================
-- 6. Helper RPC: get_login_email (username → email)
-- ========================================================================
-- Used by the login flow when a user types their username instead of email.
-- SECURITY DEFINER so RLS on profiles doesn't block the lookup.
CREATE OR REPLACE FUNCTION public.get_login_email(lookup_username TEXT)
RETURNS TEXT AS $$
DECLARE
  found_email TEXT;
BEGIN
  SELECT u.email INTO found_email
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE p.username = lookup_username
  LIMIT 1;
  RETURN found_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;

GRANT EXECUTE ON FUNCTION public.get_login_email(TEXT) TO anon, authenticated;

-- ========================================================================
-- 7. Trigger: auto-create profile on signup
-- ========================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'username'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================================================
-- 8. updated_at auto-touch
-- ========================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS subscriptions_updated_at ON public.subscriptions;
CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
