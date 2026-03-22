-- Fix: Users can only update their own name and username, NOT plan or is_admin
-- Run this in Supabase SQL Editor AFTER the initial schema

-- Drop the overly permissive update policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Replace with a restricted policy: only allow updating safe columns
CREATE POLICY "Users can update own safe fields" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND plan = (SELECT plan FROM public.profiles WHERE id = auth.uid())
    AND is_admin = (SELECT is_admin FROM public.profiles WHERE id = auth.uid())
  );

-- Allow admins to update any profile (for plan upgrades, admin grants)
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Insert policy for the trigger
CREATE POLICY "Service can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (true);
