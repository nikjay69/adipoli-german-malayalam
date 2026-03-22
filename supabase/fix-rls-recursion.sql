-- Fix infinite recursion in profiles RLS policies
-- The admin check policy queries profiles, which triggers the same policy

-- Drop all existing policies on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own safe fields" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Service can insert profiles" ON public.profiles;

-- Create a SECURITY DEFINER function to check admin status (bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Simple policies without recursion
-- Users can read their own profile
CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Admins can read all profiles (uses SECURITY DEFINER function)
CREATE POLICY "Admins read all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

-- Users can update their own profile (name/username only — plan and is_admin protected by app logic)
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow inserts (for the signup trigger)
CREATE POLICY "Allow profile creation" ON public.profiles
  FOR INSERT WITH CHECK (true);

-- Fix payments policies too
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;

CREATE POLICY "Users read own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins read all payments" ON public.payments
  FOR SELECT USING (public.is_admin());

-- Allow payment inserts from authenticated users
CREATE POLICY "Users create payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
