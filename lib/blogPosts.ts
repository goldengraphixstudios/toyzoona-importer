import posts from "@/content/blog-posts.json";

export type BlogSection = {
  heading: string;
  body: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
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
  sections: BlogSection[];
  faqs: BlogFaq[];
};

const typedPosts = posts as BlogPost[];

export function getAllBlogPosts() {
  return [...typedPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(slug: string) {
  return typedPosts.find((post) => post.slug === slug);
}
