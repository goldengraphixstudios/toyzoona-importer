"use client";

import { useEffect, useState } from "react";
import { cmsRowToBlogPost, type CmsPostRow } from "@/lib/cmsPostTypes";
import type { BlogPost } from "@/lib/blogPosts";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";
import { PostCard } from "@/components/v5/BlogV5";

type Props = {
  staticSlugs: string[];
};

/** Articles published from the content dashboard, shown above the built-in ones. */
export default function SupabaseBlogFeed({ staticSlugs }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      return;
    }

    supabase
      .from("cms_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          return;
        }

        const staticSet = new Set(staticSlugs);
        const cmsPosts = ((data ?? []) as CmsPostRow[])
          .map(cmsRowToBlogPost)
          .filter((post) => !staticSet.has(post.slug));

        setPosts(cmsPosts);
      });
  }, [staticSlugs]);

  if (!posts.length) {
    return null;
  }

  return (
    <>
      <div className="bl-sub">
        <h2>Latest guides</h2>
      </div>
      <div className="bl-cards">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="bl-sub">
        <h2>More guides</h2>
      </div>
    </>
  );
}
