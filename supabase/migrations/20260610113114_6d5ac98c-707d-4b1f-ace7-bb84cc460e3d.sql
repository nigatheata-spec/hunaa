
-- Roles enum
create type public.app_role as enum ('admin', 'moderator', 'user');
create type public.family_role as enum ('father', 'mother', 'son', 'daughter');
create type public.title_kind as enum ('movie', 'series', 'reel', 'influencer');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  family_role family_role,
  avatar_url text,
  preferred_tracks text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles self read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles self upsert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles self update" on public.profiles for update to authenticated using (auth.uid() = id);

-- User roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "user_roles self read" on public.user_roles for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));
create policy "user_roles admin manage" on public.user_roles for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Auto create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Titles (movies / series / reels / influencers)
create table public.titles (
  id uuid primary key default gen_random_uuid(),
  kind title_kind not null,
  title text not null,
  slug text unique,
  synopsis text,
  long_description text,
  poster_url text,
  backdrop_url text,
  trailer_url text,
  duration_minutes int,
  age_rating text,
  track text,
  target_roles family_role[] default '{}',
  cast_crew jsonb default '{}'::jsonb,
  badges text[] default '{}',
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.titles to anon, authenticated;
grant all on public.titles to service_role;
alter table public.titles enable row level security;
create policy "titles public read" on public.titles for select using (is_published = true);
create policy "titles admin all" on public.titles for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Episodes
create table public.episodes (
  id uuid primary key default gen_random_uuid(),
  title_id uuid not null references public.titles(id) on delete cascade,
  season int not null default 1,
  episode_number int not null,
  name text,
  synopsis text,
  duration_minutes int,
  video_url text,
  created_at timestamptz not null default now()
);
grant select on public.episodes to anon, authenticated;
grant all on public.episodes to service_role;
alter table public.episodes enable row level security;
create policy "episodes public read" on public.episodes for select using (true);
create policy "episodes admin all" on public.episodes for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Influencer personas (AI characters)
create table public.influencers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text,
  bio text,
  avatar_url text,
  voice_style text,
  system_prompt text not null,
  target_roles family_role[] default '{son,daughter}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.influencers to anon, authenticated;
grant all on public.influencers to service_role;
alter table public.influencers enable row level security;
create policy "influencers public read" on public.influencers for select using (is_active = true);
create policy "influencers admin all" on public.influencers for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Content requests from AI assistant
create table public.content_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  family_role family_role,
  raw_request text not null,
  topic text,
  track text,
  audience text,
  ai_summary text,
  ai_tags text[] default '{}',
  cluster_id uuid,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant select, insert on public.content_requests to authenticated;
grant all on public.content_requests to service_role;
alter table public.content_requests enable row level security;
create policy "requests self insert" on public.content_requests for insert to authenticated with check (auth.uid() = user_id);
create policy "requests self read" on public.content_requests for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "requests admin update" on public.content_requests for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Assistant conversations (parental AI)
create table public.assistant_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text default 'محادثة جديدة',
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.assistant_conversations to authenticated;
grant all on public.assistant_conversations to service_role;
alter table public.assistant_conversations enable row level security;
create policy "conv self all" on public.assistant_conversations for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Plans / subscriptions / promo codes / donations
create table public.plans (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text,
  price_monthly numeric(10,2) not null,
  price_yearly numeric(10,2),
  max_profiles int not null default 1,
  features text[] default '{}',
  is_active boolean not null default true,
  sort_order int default 0,
  created_at timestamptz not null default now()
);
grant select on public.plans to anon, authenticated;
grant all on public.plans to service_role;
alter table public.plans enable row level security;
create policy "plans public read" on public.plans for select using (is_active = true);
create policy "plans admin all" on public.plans for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  description text,
  discount_percent int check (discount_percent between 1 and 100),
  max_uses int,
  uses int not null default 0,
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.promo_codes to anon, authenticated;
grant all on public.promo_codes to service_role;
alter table public.promo_codes enable row level security;
create policy "promo public read active" on public.promo_codes for select using (is_active = true);
create policy "promo admin all" on public.promo_codes for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references public.plans(id),
  status text not null default 'pending',
  provider text,
  provider_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.subscriptions to authenticated;
grant all on public.subscriptions to service_role;
alter table public.subscriptions enable row level security;
create policy "subs self read" on public.subscriptions for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "subs admin all" on public.subscriptions for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  donor_name text,
  donor_email text,
  amount numeric(10,2) not null,
  currency text not null default 'USD',
  tier text,
  message text,
  status text not null default 'pending',
  provider text,
  provider_payment_id text,
  created_at timestamptz not null default now()
);
grant insert on public.donations to anon, authenticated;
grant select on public.donations to authenticated;
grant all on public.donations to service_role;
alter table public.donations enable row level security;
create policy "donations public insert" on public.donations for insert with check (true);
create policy "donations admin read" on public.donations for select to authenticated using (public.has_role(auth.uid(),'admin') or auth.uid() = user_id);
create policy "donations admin all" on public.donations for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.payment_gateways (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  is_enabled boolean not null default false,
  config jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);
grant select on public.payment_gateways to authenticated;
grant all on public.payment_gateways to service_role;
alter table public.payment_gateways enable row level security;
create policy "gateways admin all" on public.payment_gateways for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- updated_at trigger
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger trg_profiles_updated before update on public.profiles for each row execute function public.set_updated_at();
create trigger trg_titles_updated before update on public.titles for each row execute function public.set_updated_at();
create trigger trg_assistant_updated before update on public.assistant_conversations for each row execute function public.set_updated_at();
create trigger trg_subs_updated before update on public.subscriptions for each row execute function public.set_updated_at();

-- Seed plans
insert into public.plans (code, name, description, price_monthly, price_yearly, max_profiles, features, sort_order) values
('individuals','باقة الأفراد','تجربة شخصية متكاملة',7.99,79,1, array['ملف واحد','مشاهدة بدقة Full HD','وصول لكل المسارات الـ12'], 1),
('friends','باقة الأصحاب','شارك المحتوى مع المقربين',14.99,149,3, array['3 ملفات','مشاهدة بدقة 4K','تنزيل للمشاهدة بدون إنترنت'], 2),
('family','باقة الأسرة','الأنسب للعائلة كاملة',19.99,199,5, array['5 ملفات أسرية مخصصة','رقابة أبوية ذكية','مساعد تربوي AI','مؤثرون أذكياء للأطفال'], 3);

insert into public.payment_gateways (code, name, is_enabled) values
('paddle','Paddle', false),
('stripe','Stripe', false),
('paypal','PayPal', false);
