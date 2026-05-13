import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const postsPath = path.join(root, "content", "blog-posts.json");

function getFlag(name, fallback = "") {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) {
    return fallback;
  }

  return process.argv[index + 1];
}

function getTitle() {
  const args = process.argv.slice(2);
  const titleParts = [];

  for (let index = 0; index < args.length; index += 1) {
    const current = args[index];
    if (current.startsWith("--")) {
      index += 1;
      continue;
    }
    titleParts.push(current);
  }

  return titleParts.join(" ").trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const title = getTitle();

if (!title) {
  console.error('Usage: npm run cms:new-post -- "Article Title" --category "Buying Guide" --description "Short SEO description"');
  process.exit(1);
}

const now = new Date().toISOString().slice(0, 10);
const posts = JSON.parse(await readFile(postsPath, "utf8"));
const slug = slugify(getFlag("--slug", title));

if (posts.some((post) => post.slug === slug)) {
  console.error(`A post with slug "${slug}" already exists.`);
  process.exit(1);
}

posts.unshift({
  slug,
  title,
  description: getFlag("--description", "Write a concise SEO description for this Toyzoona article."),
  publishedAt: getFlag("--date", now),
  updatedAt: getFlag("--date", now),
  category: getFlag("--category", "Toy Guide"),
  readTime: getFlag("--read-time", "4 min read"),
  keywords: getFlag("--keywords", "Toyzoona Importer,toys per kilo Philippines,bulk toys")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean),
  summary: "Write the direct answer summary for GEO and AEO snippets.",
  deck: "Write a persuasive editorial deck that expands the headline and tells buyers why this article matters.",
  heroImage: {
    src: getFlag("--hero", "/auction-gallery-wide.webp"),
    alt: "Describe the Toyzoona image for accessibility and search.",
    caption: "Add an optional caption that supports the article angle."
  },
  takeaways: [
    "Add the first practical takeaway.",
    "Add the second practical takeaway.",
    "Add the third practical takeaway."
  ],
  sections: [
    {
      heading: "Main answer",
      image: {
        src: "/toy-category-bulk-bins.webp",
        alt: "Describe the supporting Toyzoona stock image.",
        caption: "Explain what this image shows."
      },
      body: [
        "Write the clearest answer first so search engines and answer engines can understand the article quickly.",
        "Add location, schedule, buying process, and Facebook CTA details where relevant."
      ],
      bullets: [
        "Add a scannable buyer tip.",
        "Add a second practical buyer tip."
      ],
      quote: "Add a short pull quote that summarizes the buyer insight."
    },
    {
      heading: "Buyer tips",
      body: [
        "Add practical details for resellers, parents, event buyers, or live sellers."
      ]
    }
  ],
  faqs: [
    {
      question: "What should buyers know first?",
      answer: "Replace this with a short, direct answer."
    },
    {
      question: "How can buyers contact Toyzoona?",
      answer: "Replace this with the official Facebook page or buying instruction."
    }
  ],
  cta: {
    label: "Message the Facebook Page",
    href: "https://www.facebook.com/ToyzoonaLaguna",
    note: "Explain what the reader should do next and why."
  }
});

await writeFile(postsPath, `${JSON.stringify(posts, null, 2)}\n`);
console.log(`Created draft post: content/blog-posts.json -> ${slug}`);
