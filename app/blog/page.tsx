import type { Metadata } from "next";
import "../v5.css";
import "../v5-flat.css";
import "../blog-v5.css";
import SupabaseBlogFeed from "@/components/SupabaseBlogFeed";
import { ShellV5 } from "@/components/v5/ChromeV5";
import { BlogIntro, PostCard } from "@/components/v5/BlogV5";
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
      url: `${siteUrl}/blog/post/?slug=${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };

  return (
    <ShellV5>
      <main>
        <BlogIntro
          title="Toyzoona Blog"
          sub="Guides for buying toys per kilo, reselling, live selling and planning prizes for events."
        />
        <section className="bl-list">
          <div className="wr">
            <SupabaseBlogFeed staticSlugs={posts.map((post) => post.slug)} />
            <div className="bl-cards">
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} featured={i === 0} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
    </ShellV5>
  );
}
