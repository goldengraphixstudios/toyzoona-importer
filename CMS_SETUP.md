# Toyzoona Supabase CMS Setup

The old static JSON generator has been removed. `/cms` is now a Supabase-authenticated CMS.

## 1. Create Supabase project

Create a Supabase project, then open SQL Editor and run:

```sql
-- paste the full contents of supabase/schema.sql
```

## 2. Add environment variables

Copy `.env.example` to `.env.local` for local development:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

For GitHub Pages deployment, add the same variables as repository secrets or workflow environment variables before building.

## 3. Create the first CMS user

Go to `/cms`, create an account, then copy the displayed Supabase Auth user id.

Run this in Supabase SQL Editor:

```sql
insert into public.cms_profiles (id, role, display_name)
values ('PASTE_AUTH_USER_ID_HERE', 'admin', 'Toyzoona Admin');
```

After that, log in again at `/cms`.

## 4. Publishing behavior

`/cms` writes posts into Supabase. `/blog` loads published CMS posts in the browser and keeps the static articles as fallback content.

CMS article URLs use:

```text
/blog/cms?slug=your-post-slug
```

GitHub Pages cannot server-render new database slugs. If you need fully pre-rendered SEO URLs for every CMS post, move this app to Vercel or another SSR host and remove static export.
