"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/assetPath";
import { cmsRowToBlogPost, type CmsPostRow } from "@/lib/cmsPostTypes";
import type { BlogPost } from "@/lib/blogPosts";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";

type Props = {
  staticSlugs: string[];
};

function resolveImage(src: string) {
  return src.startsWith("/") ? assetPath(src) : src;
}

export default function SupabaseBlogFeed({ staticSlugs }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<"idle" | "loaded" | "error">("idle");

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
          setStatus("error");
          return;
        }

        const staticSet = new Set(staticSlugs);
        const cmsPosts = ((data ?? []) as CmsPostRow[])
          .map(cmsRowToBlogPost)
          .filter((post) => !staticSet.has(post.slug));

        setPosts(cmsPosts);
        setStatus("loaded");
      });
  }, [staticSlugs]);

  if (!posts.length) {
    return null;
  }

  return (
    <section className="mb-10">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ffef3f]">Latest Guides</p>
          <h2 className="mt-2 font-display text-4xl font-black leading-none text-white">Fresh Toyzoona articles</h2>
        </div>
        <p className="text-xs font-semibold text-white/42">
          {status === "error" ? "Live article feed could not load." : "Updated from the content dashboard"}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/post?slug=${post.slug}`}
            className="group overflow-hidden rounded-[1.6rem] border-2 border-[#ffef3f]/20 bg-[#ffef3f]/[0.055] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffef3f]/70"
          >
            <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#070718]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImage(post.heroImage.src)}
                alt={post.heroImage.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(1,1,8,0.72)_100%)]" />
            </div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#ffef3f] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#4b1b00]">
                {post.category}
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/62">
                {post.readTime}
              </span>
            </div>
            <h3 className="font-display text-3xl font-black leading-[0.95] tracking-tight text-white transition-colors duration-300 group-hover:text-[#ffef3f]">
              {post.title}
            </h3>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-tz-muted">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
