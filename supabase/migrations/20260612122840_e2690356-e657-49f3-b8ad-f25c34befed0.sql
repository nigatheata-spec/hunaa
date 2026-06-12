
-- children
CREATE TABLE public.children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  age int,
  gender text CHECK (gender IN ('boy','girl')),
  interests text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.children TO authenticated;
GRANT ALL ON public.children TO service_role;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parent manages own children" ON public.children FOR ALL USING (auth.uid() = parent_id) WITH CHECK (auth.uid() = parent_id);
CREATE TRIGGER trg_children_updated BEFORE UPDATE ON public.children FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- assistant_conversations: add child_id + family_role + thread label
ALTER TABLE public.assistant_conversations
  ADD COLUMN IF NOT EXISTS child_id uuid REFERENCES public.children(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS family_role text,
  ADD COLUMN IF NOT EXISTS title text;

-- recommendations from assistant
CREATE TABLE public.recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id uuid REFERENCES public.children(id) ON DELETE SET NULL,
  family_member text,
  topic text,
  reason text,
  suggested_title text,
  suggested_kind text,
  title_id uuid REFERENCES public.titles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recommendations TO authenticated;
GRANT ALL ON public.recommendations TO service_role;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User manages own recs" ON public.recommendations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- titles: add audience tags array for family filtering
ALTER TABLE public.titles
  ADD COLUMN IF NOT EXISTS audience text[] DEFAULT ARRAY['father','mother','son','daughter']::text[],
  ADD COLUMN IF NOT EXISTS stars text[];
