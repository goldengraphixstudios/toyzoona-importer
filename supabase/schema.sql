-- Toyzoona CMS schema
-- Run this in Supabase SQL Editor after creating the project.

create extension if not exists pgcrypto;

create table if not exists public.cms_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'editor')),
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at date not null default current_date,
  updated_at date not null default current_date,
  category text not null default 'Buying Guide',
  read_time text not null default '5 min read',
  keywords text[] not null default '{}',
  summary text not null default '',
  deck text not null default '',
  hero_image jsonb not null default '{"src":"/auction-gallery-wide.webp","alt":"Toyzoona toy stock","caption":""}'::jsonb,
  takeaways text[] not null default '{}',
  sections jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  cta jsonb not null default '{"label":"Message the Facebook Page","href":"https://www.facebook.com/ToyzoonaLaguna","note":""}'::jsonb,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists cms_posts_status_published_at_idx on public.cms_posts(status, published_at desc);
create index if not exists cms_posts_author_id_idx on public.cms_posts(author_id);

alter table public.cms_profiles enable row level security;
alter table public.cms_posts enable row level security;

drop policy if exists "cms profiles readable by self" on public.cms_profiles;
create policy "cms profiles readable by self"
  on public.cms_profiles
  for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "cms admins manage profiles" on public.cms_profiles;
create policy "cms admins manage profiles"
  on public.cms_profiles
  for all
  to authenticated
  using (
    exists (
      select 1 from public.cms_profiles profile
      where profile.id = auth.uid() and profile.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.cms_profiles profile
      where profile.id = auth.uid() and profile.role = 'admin'
    )
  );

drop policy if exists "first cms user can bootstrap admin" on public.cms_profiles;
create policy "first cms user can bootstrap admin"
  on public.cms_profiles
  for insert
  to authenticated
  with check (
    id = auth.uid()
    and role = 'admin'
    and not exists (select 1 from public.cms_profiles)
  );

drop policy if exists "published posts are public" on public.cms_posts;
create policy "published posts are public"
  on public.cms_posts
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "cms editors read all posts" on public.cms_posts;
create policy "cms editors read all posts"
  on public.cms_posts
  for select
  to authenticated
  using (
    exists (
      select 1 from public.cms_profiles profile
      where profile.id = auth.uid() and profile.role in ('admin', 'editor')
    )
  );

drop policy if exists "cms editors insert posts" on public.cms_posts;
create policy "cms editors insert posts"
  on public.cms_posts
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.cms_profiles profile
      where profile.id = auth.uid() and profile.role in ('admin', 'editor')
    )
  );

drop policy if exists "cms editors update posts" on public.cms_posts;
create policy "cms editors update posts"
  on public.cms_posts
  for update
  to authenticated
  using (
    exists (
      select 1 from public.cms_profiles profile
      where profile.id = auth.uid() and profile.role in ('admin', 'editor')
    )
  )
  with check (
    exists (
      select 1 from public.cms_profiles profile
      where profile.id = auth.uid() and profile.role in ('admin', 'editor')
    )
  );

drop policy if exists "cms admins delete posts" on public.cms_posts;
create policy "cms admins delete posts"
  on public.cms_posts
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.cms_profiles profile
      where profile.id = auth.uid() and profile.role = 'admin'
    )
  );

-- First admin setup:
-- After the schema is installed, the first logged-in CMS user can click
-- "Create first admin profile" inside /cms. That insert is allowed only
-- while cms_profiles is empty. After that, only admins can manage profiles.
