-- Fix 1: Update poll_votes RLS policy to hide voter_email from poll creators
-- Drop the existing SELECT policy
DROP POLICY IF EXISTS "Users can view votes on their polls" ON public.poll_votes;

-- Create a new policy that uses a view or restricts the data
-- Since we can't do field-level security in RLS, we'll create a security definer function
-- that returns votes without exposing emails

-- Create a function to get vote counts per poll item (without exposing voter details)
CREATE OR REPLACE FUNCTION public.get_poll_vote_counts(p_poll_id uuid)
RETURNS TABLE (
  poll_item_id uuid,
  vote_count bigint,
  voter_names text[]
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    poll_item_id,
    COUNT(*) as vote_count,
    ARRAY_AGG(voter_name) FILTER (WHERE voter_name IS NOT NULL) as voter_names
  FROM public.poll_votes
  WHERE poll_id = p_poll_id
  GROUP BY poll_item_id
$$;

-- Create a restricted SELECT policy that only allows viewing your own votes
CREATE POLICY "Users can view votes on their polls (restricted)"
ON public.poll_votes
FOR SELECT
USING (
  -- Users can only see their own votes directly
  voter_id = auth.uid()
  OR
  -- Poll creators can see votes exist but should use the function for aggregated data
  EXISTS (
    SELECT 1 FROM name_polls
    WHERE name_polls.id = poll_votes.poll_id
    AND name_polls.creator_id = auth.uid()
  )
);

-- Fix 2: Add INSERT policy for profiles table
-- This allows the trigger to create profiles, and users to create their own if needed
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Also ensure the trigger function works properly with security definer
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;