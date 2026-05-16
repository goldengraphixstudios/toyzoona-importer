"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { assetPath } from "@/lib/assetPath";
import { cmsRowToBlogPost, type CmsPostRow } from "@/lib/cmsPostTypes";
import type { BlogPost } from "@/lib/blogPosts";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";

function resolveImage(src: string) {
  return src.startsWith("/") ? assetPath(src) : src;
}

export default function SupabaseBlogArticle() {
  const params = useSearchParams();
  const slug = params.get("slug") ?? "";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState("Loading article...");

  useEffect(() => {
    if (!slug) {
      setStatus("No article slug was provided.");
      return;
    }

    if (!isSupabaseConfigured()) {
      setStatus("Live articles are not configured yet.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("Live articles are not configured yet.");
      return;
    }

    supabase
      .from("cms_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          setStatus(error.message);
          return;
        }

        if (!data) {
          setStatus("Article not found or not published.");
          return;
        }

        setPost(cmsRowToBlogPost(data as CmsPostRow));
      });
  }, [slug]);

  if (!post) {
    return (
      <main className="min-h-screen bg-tz-bg text-tz-text">
        <Navbar />
        <section className="wrap py-36">
          <Link href="/blog" className="mb-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffef3f]">
            Back to articles
          </Link>
          <h1 className="font-display text-5xl font-black text-white">Toyzoona article</h1>
          <p className="mt-4 max-w-xl text-sm font-semibold leading-relaxed text-white/62">{status}</p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-tz-bg text-tz-text">
      <Navbar />
      <article className="pb-20">
        <header className="relative overflow-hidden pt-32">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resolveImage(post.heroImage.src)} alt="" className="h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,16,0.72)_0%,rgba(2,2,16,0.92)_72%,#020210_100%)]" />
          </div>
          <div className="wrap relative z-10">
            <Link href="/blog" className="mb-8 inline-flex rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffef3f] backdrop-blur-md">
              Back to articles
            </Link>
            <div className="max-w-5xl">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#ff4200] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white">{post.category}</span>
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/70">{post.readTime}</span>
                <time className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/70" dateTime={post.publishedAt}>
                  Updated {post.updatedAt}
                </time>
              </div>
              <h1 className="max-w-5xl font-display text-[clamp(2.8rem,8vw,6.8rem)] font-black leading-[0.86] tracking-[-0.07em] text-white">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl font-semibold leading-relaxed text-white/82">{post.deck}</p>
            </div>
          </div>
        </header>

        <div className="wrap mt-12 grid gap-10 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-center">
          <div className="min-w-0">
            <section className="border-y border-white/12 py-7">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffef3f]">Answer first</p>
              <p className="mt-4 text-2xl font-semibold leading-relaxed tracking-[-0.02em] text-white sm:text-3xl">{post.summary}</p>
            </section>

            <div className="article-prose mt-10 space-y-12">
              {post.sections.map((section, index) => (
                <section key={`${section.heading}-${index}`} id={`section-${index + 1}`} className="scroll-mt-28">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4200]">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="font-display text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">{section.heading}</h2>
                  {section.image?.src ? (
                    <figure className="my-7 overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={resolveImage(section.image.src)} alt={section.image.alt} className="aspect-[16/9] w-full object-cover" />
                      {section.image.caption ? <figcaption className="border-t border-white/10 px-4 py-3 text-xs font-semibold text-white/54">{section.image.caption}</figcaption> : null}
                    </figure>
                  ) : null}
                  <div className="mt-5 space-y-5">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-lg font-medium leading-[1.85] text-white/74" dangerouslySetInnerHTML={{ __html: paragraph }} />
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-7 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-base font-semibold leading-relaxed text-white/78">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ffef3f]" />
                          <span dangerouslySetInnerHTML={{ __html: bullet }} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.quote ? <blockquote className="mt-8 border-l-4 border-[#ffef3f] pl-5 font-display text-2xl font-black leading-tight text-white sm:text-3xl" dangerouslySetInnerHTML={{ __html: section.quote }} /> : null}
                </section>
              ))}
            </div>
          </div>

          <aside className="top-28 hidden rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-5 lg:sticky lg:block">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-white/46">In this article</p>
            <nav className="mt-4 space-y-3">
              {post.sections.map((section, index) => (
                <a key={`${section.heading}-${index}`} href={`#section-${index + 1}`} className="block text-sm font-bold leading-snug text-white/64 transition-colors hover:text-[#ffef3f]">
                  {section.heading}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </article>
      <Footer />
    </main>
  );
}
