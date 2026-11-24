import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../v5.css";
import "../../blog-v5.css";
import { ShellV5 } from "@/components/v5/ChromeV5";
import { ArticleV5 } from "@/components/v5/BlogV5";
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
          url: `${siteUrl}${post.heroImage.src}`,
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
    image: `${siteUrl}${post.heroImage.src}`,
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
    <ShellV5>
      <main>
        <ArticleV5 post={post} />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </ShellV5>
  );
}
