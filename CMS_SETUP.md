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

Go to `/cms`, create an account, then click **Create first admin profile**.
That button works only while `cms_profiles` is empty. After the first admin exists,
new CMS users must be added by an admin in Supabase or through a future user-management screen.

## 4. Publishing behavior

`/cms` writes posts into Supabase. `/blog` loads published CMS posts in the browser and keeps the static articles as fallback content.

Database article URLs use:

```text
/blog/post?slug=your-post-slug
```

GitHub Pages cannot server-render new database slugs. If you need fully pre-rendered SEO URLs for every CMS post, move this app to Vercel or another SSR host and remove static export.
