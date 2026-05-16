-- Fix Toyzoona CMS RLS recursion.
-- Run this once in Supabase SQL Editor.

create or replace function public.current_cms_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.cms_profiles where id = auth.uid() limit 1
$$;

grant execute on function public.current_cms_role() to authenticated;

drop policy if exists "cms admins manage profiles" on public.cms_profiles;
create policy "cms admins manage profiles"
  on public.cms_profiles
  for all
  to authenticated
  using (public.current_cms_role() = 'admin')
  with check (public.current_cms_role() = 'admin');

drop policy if exists "cms editors read all posts" on public.cms_posts;
create policy "cms editors read all posts"
  on public.cms_posts
  for select
  to authenticated
  using (public.current_cms_role() in ('admin', 'editor'));

drop policy if exists "cms editors insert posts" on public.cms_posts;
create policy "cms editors insert posts"
  on public.cms_posts
  for insert
  to authenticated
  with check (public.current_cms_role() in ('admin', 'editor'));

drop policy if exists "cms editors update posts" on public.cms_posts;
create policy "cms editors update posts"
  on public.cms_posts
  for update
  to authenticated
  using (public.current_cms_role() in ('admin', 'editor'))
  with check (public.current_cms_role() in ('admin', 'editor'));

drop policy if exists "cms admins delete posts" on public.cms_posts;
create policy "cms admins delete posts"
  on public.cms_posts
  for delete
  to authenticated
  using (public.current_cms_role() = 'admin');
