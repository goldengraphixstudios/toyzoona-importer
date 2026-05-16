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

User creation is disabled in the public CMS screen. Create users from Supabase Auth,
then add approved users to `cms_profiles` as `admin` or `editor`.

The production admin account is:

```text
admin@toyzoona-importer.com
```

If the CMS shows `infinite recursion detected in policy for relation "cms_profiles"`,
run `supabase/fix-rls-recursion.sql` once in Supabase SQL Editor.

## 4. Publishing behavior

`/cms` writes posts into Supabase. `/blog` loads published CMS posts in the browser and keeps the static articles as fallback content.

Database article URLs use:

```text
/blog/post?slug=your-post-slug
```

GitHub Pages cannot server-render new database slugs. If you need fully pre-rendered SEO URLs for every CMS post, move this app to Vercel or another SSR host and remove static export.
