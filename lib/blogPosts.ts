import posts from "@/content/blog-posts.json";

export type BlogSection = {
  heading: string;
  body: string[];
  image?: BlogImage;
  bullets?: string[];
  quote?: string;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type BlogCta = {
  label: string;
  href: string;
  note?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  readTime: string;
  keywords: string[];
  summary: string;
  deck: string;
  heroImage: BlogImage;
  takeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  cta: BlogCta;
};

const typedPosts = posts as BlogPost[];

export function getAllBlogPosts() {
  return [...typedPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(slug: string) {
  return typedPosts.find((post) => post.slug === slug);
}
