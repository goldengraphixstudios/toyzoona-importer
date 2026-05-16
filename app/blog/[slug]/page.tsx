import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assetPath } from "@/lib/assetPath";
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
      images: [
        {
          url: assetPath(post.heroImage.src),
          alt: post.heroImage.alt,
        },
      ],
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
    image: `${siteUrl}${assetPath(post.heroImage.src)}`,
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
      <article className="pb-20">
        <header className="relative overflow-hidden pt-32">
          <div className="absolute inset-0">
            <Image
              src={assetPath(post.heroImage.src)}
              alt=""
              fill
              priority
              className="object-cover opacity-35"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,16,0.72)_0%,rgba(2,2,16,0.92)_72%,#020210_100%)]" />
          </div>

          <div className="wrap relative z-10">
            <Link
              href="/blog"
              className="mb-8 inline-flex rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffef3f] backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.12]"
            >
              Back to articles
            </Link>

            <div className="max-w-5xl">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#ff4200] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                  {post.category}
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/70">
                  {post.readTime}
                </span>
                <time className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/70" dateTime={post.publishedAt}>
                  Updated {post.updatedAt}
                </time>
              </div>
              <h1 className="max-w-5xl font-display text-[clamp(2.8rem,8vw,6.8rem)] font-black leading-[0.86] tracking-[-0.07em] text-white">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl font-semibold leading-relaxed text-white/82">
                {post.deck}
              </p>
            </div>

            <figure className="mt-10 overflow-hidden rounded-[1.7rem] border-2 border-white/12 bg-[#070718] shadow-[0_26px_80px_rgba(0,0,0,0.34)]">
              <div className="relative aspect-[16/8]">
                <Image
                  src={assetPath(post.heroImage.src)}
                  alt={post.heroImage.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 1120px, 100vw"
                />
              </div>
              {post.heroImage.caption ? (
                <figcaption className="border-t border-white/10 px-5 py-3 text-xs font-semibold text-white/56">
                  {post.heroImage.caption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </header>

        <div className="wrap mt-12 grid gap-10 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-center">
          <div className="min-w-0">
            <section className="border-y border-white/12 py-7">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffef3f]">Answer first</p>
              <p className="mt-4 text-2xl font-semibold leading-relaxed tracking-[-0.02em] text-white sm:text-3xl">
                {post.summary}
              </p>
            </section>

            <div className="article-prose mt-10 space-y-12">
              {post.sections.map((section, index) => (
                <section key={section.heading} id={`section-${index + 1}`} className="scroll-mt-28">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4200]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                    {section.heading}
                  </h2>

                  {section.image ? (
                    <figure className="my-7 overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035]">
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={assetPath(section.image.src)}
                          alt={section.image.alt}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 760px, 100vw"
                        />
                      </div>
                      {section.image.caption ? (
                        <figcaption className="border-t border-white/10 px-4 py-3 text-xs font-semibold text-white/54">
                          {section.image.caption}
                        </figcaption>
                      ) : null}
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

                  {section.quote ? (
                    <blockquote className="mt-8 border-l-4 border-[#ffef3f] pl-5 font-display text-2xl font-black leading-tight text-white sm:text-3xl" dangerouslySetInnerHTML={{ __html: section.quote }} />
                  ) : null}
                </section>
              ))}
            </div>

            <section className="mt-14 rounded-[1.6rem] border-2 border-[#ffef3f]/30 bg-[#ffef3f]/10 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffef3f]">Next step</p>
              <h2 className="mt-3 font-display text-4xl font-black leading-none text-white">
                Ready to check current toy stocks?
              </h2>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-relaxed text-white/74">
                {post.cta.note}
              </p>
              <a
                href={post.cta.href}
                target={post.cta.href.startsWith("http") ? "_blank" : undefined}
                rel={post.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex rounded-2xl border-2 border-white bg-[#ff4200] px-6 py-3.5 text-sm font-black uppercase tracking-[0.1em] text-white shadow-[0_9px_0_#9b2200] transition-transform duration-300 hover:-translate-y-1"
              >
                {post.cta.label}
              </a>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-4xl font-black text-white">Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="py-6">
                    <h3 className="text-xl font-black text-[#ffef3f]">{faq.question}</h3>
                    <p className="mt-3 text-base font-medium leading-relaxed text-white/72">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="top-28 hidden rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-5 lg:sticky lg:block">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-white/46">In this article</p>
            <nav className="mt-4 space-y-3">
              {post.sections.map((section, index) => (
                <a
                  key={section.heading}
                  href={`#section-${index + 1}`}
                  className="block text-sm font-bold leading-snug text-white/64 transition-colors hover:text-[#ffef3f]"
                >
                  {section.heading}
                </a>
              ))}
            </nav>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-white/46">Key takeaways</p>
              <ul className="mt-3 space-y-2">
                {post.takeaways.map((takeaway) => (
                  <li key={takeaway} className="text-sm font-semibold leading-relaxed text-white/62">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
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
