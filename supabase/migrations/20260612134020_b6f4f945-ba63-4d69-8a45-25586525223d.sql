ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS father_avatar_url text,
  ADD COLUMN IF NOT EXISTS mother_avatar_url text;