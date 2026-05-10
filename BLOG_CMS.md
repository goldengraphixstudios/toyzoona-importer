# Toyzoona Blog CMS

This site is a static Next.js export for GitHub Pages, so blog posts are managed from `content/blog-posts.json`.

## CMS Webpage

Use the static CMS page:

```text
https://goldengraphixstudios.github.io/toyzoona-importer/cms/
```

The page stores drafts in your browser, then lets you copy or download the merged `blog-posts.json` content. Because GitHub Pages is static, it cannot save directly to the repository without a separate authenticated backend.

## Add a Post With the CMS Script

```bash
npm run cms:new-post -- "Article Title" --category "Buying Guide" --description "Short SEO description"
```

Optional flags:

```bash
--slug "custom-url-slug"
--date "2026-05-11"
--read-time "5 min read"
--keywords "toys per kilo Philippines,Toyzoona Importer,bulk toys"
```

After running the script, edit the generated draft in `content/blog-posts.json`, then run:

```bash
npm run lint
npm run build
```

## Content Fields

- `title`: Article headline.
- `description`: SEO meta description and answer-engine summary.
- `summary`: Short direct answer shown near the top of the article.
- `sections`: Main article body.
- `faqs`: FAQ schema content for answer-focused search results.
- `keywords`: Search targets for SEO, GEO, and AEO.
