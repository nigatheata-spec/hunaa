ALTER TABLE public.children
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS traits text,
  ADD COLUMN IF NOT EXISTS assessment jsonb,
  ADD COLUMN IF NOT EXISTS assessment_completed_at timestamptz;