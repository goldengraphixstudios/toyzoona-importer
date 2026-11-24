"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cmsRowToBlogPost, type CmsPostRow } from "@/lib/cmsPostTypes";
import { getBlogPost, type BlogPost } from "@/lib/blogPosts";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";
import { ShellV5 } from "@/components/v5/ChromeV5";
import { ArticleStatus, ArticleV5 } from "@/components/v5/BlogV5";

/** /blog/post?slug=...: dashboard articles, falling back to the built-in ones. */
export default function SupabaseBlogArticle() {
  const params = useSearchParams();
  const slug = params.get("slug") ?? "";
  const builtIn = slug ? getBlogPost(slug) ?? null : null;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState("Loading article...");

  useEffect(() => {
    if (!slug) {
      setStatus("No article was picked.");
      return;
    }

    const supabase = isSupabaseConfigured() ? getSupabaseBrowserClient() : null;
    if (!supabase) {
      if (!builtIn) setStatus("Article not found.");
      return;
    }

    supabase
      .from("cms_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data, error }) => {
        if (data) {
          setPost(cmsRowToBlogPost(data as CmsPostRow));
          return;
        }
        if (!builtIn) setStatus(error ? error.message : "Article not found or not published.");
      });
  }, [slug, builtIn]);

  const shown = post ?? builtIn;

  return (
    <ShellV5>
      <main>{shown ? <ArticleV5 post={shown} /> : <ArticleStatus status={status} />}</main>
    </ShellV5>
  );
}
