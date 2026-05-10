import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllBlogPosts, getBlogPost } from "@/lib/blogPosts";

const siteUrl = "https://goldengraphixstudios.github.io/toyzoona-importer";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Article Not Found | Toyzoona Importer",
    };
  }

  return {
    title: `${post.title} | Toyzoona Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: `${siteUrl}/blog/${post.slug}/`,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Toyzoona Importer",
    },
    publisher: {
      "@type": "Organization",
      name: "Toyzoona Importer",
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}/`,
    keywords: post.keywords.join(", "),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-tz-bg text-tz-text">
      <Navbar />
      <article className="wrap max-w-4xl pt-32 pb-16">
        <Link
          href="/blog"
          className="mb-7 inline-flex rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffef3f] transition-colors duration-200 hover:bg-white/[0.09]"
        >
          Back to articles
        </Link>

        <header className="rounded-[2rem] border-2 border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#ff4200] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white">
              {post.category}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/62">
              {post.readTime}
            </span>
            <time className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/62" dateTime={post.publishedAt}>
              {post.publishedAt}
            </time>
          </div>
          <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-black leading-[0.88] tracking-[-0.06em] text-white">
            {post.title}
          </h1>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-tz-muted">
            {post.summary}
          </p>
        </header>

        <section className="mt-8 rounded-[1.6rem] border-2 border-[#ffef3f]/25 bg-[#ffef3f]/10 p-5 sm:p-6">
          <h2 className="font-display text-2xl font-black text-[#ffef3f]">Answer Snapshot</h2>
          <p className="mt-3 text-base font-semibold leading-relaxed text-white/78">
            {post.description}
          </p>
        </section>

        <div className="mt-10 space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading} className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <h2 className="font-display text-3xl font-black leading-none text-white">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-base font-medium leading-relaxed text-tz-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-[1.6rem] border-2 border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <h2 className="font-display text-3xl font-black text-white">FAQs</h2>
          <div className="mt-5 divide-y divide-white/10">
            {post.faqs.map((faq) => (
              <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-lg font-black text-[#ffef3f]">{faq.question}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-tz-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Footer />
    </main>
  );
}
