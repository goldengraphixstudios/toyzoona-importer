import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupabaseBlogFeed from "@/components/SupabaseBlogFeed";
import { assetPath } from "@/lib/assetPath";
import { getAllBlogPosts } from "@/lib/blogPosts";

const siteUrl = "https://goldengraphixstudios.github.io/toyzoona-importer";

export const metadata: Metadata = {
  title: "Toyzoona Blog | Toys Per Kilo Guides, Reseller Tips, and Live Buying",
  description:
    "Read Toyzoona Importer guides for toys-per-kilo buying, toy reseller planning, Facebook live selling, giveaways, and bulk toy event ideas.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Toyzoona Importer Blog",
    description: metadata.description,
    url: `${siteUrl}/blog/`,
    mainEntity: posts.map((post) => ({
      "@type": "Article",
      headline: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}/`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-tz-bg text-tz-text">
      <Navbar />
      <section className="relative overflow-hidden pt-32 pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-24"
          style={{ backgroundImage: `url(${assetPath("/easter-toy-playground-bg.webp")})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,16,0.86),rgba(2,2,16,0.94))]" />

        <div className="wrap relative z-10">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border-2 border-white/30 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffef3f] backdrop-blur-md">
              Toyzoona Articles
            </p>
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.86] tracking-[-0.06em]">
              Bulk toy guides built for search and buyers.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-tz-muted sm:text-lg">
              SEO, GEO, and answer-focused articles for toys per kilo, toy reselling,
              Facebook live buying, event prizes, and bulk toy planning in the Philippines.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-14">
        <SupabaseBlogFeed staticSlugs={posts.map((post) => post.slug)} />

        <div className="grid gap-5 lg:grid-cols-2">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group overflow-hidden rounded-[1.6rem] border-2 border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffef3f]/70 hover:bg-white/[0.07] ${
                index === 0 ? "lg:col-span-2 lg:p-7" : ""
              }`}
            >
              <div className={`relative mb-5 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#070718] ${
                index === 0 ? "aspect-[16/7]" : "aspect-[16/10]"
              }`}>
                <Image
                  src={assetPath(post.heroImage.src)}
                  alt={post.heroImage.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={index === 0 ? "(min-width: 1024px) 1100px, 100vw" : "(min-width: 1024px) 540px, 100vw"}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(1,1,8,0.72)_100%)]" />
              </div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#ff4200] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                  {post.category}
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/62">
                  {post.readTime}
                </span>
              </div>
              <h2 className="font-display text-3xl font-black leading-[0.95] tracking-tight text-white transition-colors duration-300 group-hover:text-[#ffef3f] sm:text-4xl">
                {post.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-tz-muted">
                {post.description}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/66">
                {post.deck}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.keywords.slice(0, 4).map((keyword) => (
                  <span key={keyword} className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-bold text-white/58">
                    {keyword}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Footer />
    </main>
  );
}
