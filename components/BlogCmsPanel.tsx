"use client";

import { useEffect, useMemo, useState } from "react";
import publishedPosts from "@/content/blog-posts.json";
import type { BlogPost } from "@/lib/blogPosts";

const STORAGE_KEY = "toyzoona-cms-drafts";

type DraftPost = BlogPost & {
  draftId: string;
};

const emptyDraft = (): DraftPost => ({
  draftId: crypto.randomUUID(),
  slug: "",
  title: "",
  description: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  updatedAt: new Date().toISOString().slice(0, 10),
  category: "Buying Guide",
  readTime: "4 min read",
  keywords: [],
  summary: "",
  deck: "",
  heroImage: {
    src: "/auction-gallery-wide.webp",
    alt: "",
    caption: "",
  },
  takeaways: [],
  sections: [
    {
      heading: "Main answer",
      body: [""],
      image: {
        src: "",
        alt: "",
        caption: "",
      },
      bullets: [],
      quote: "",
    },
  ],
  faqs: [
    {
      question: "",
      answer: "",
    },
  ],
  cta: {
    label: "Join the Facebook Group",
    href: "https://www.facebook.com/groups/642834551000763",
    note: "",
  },
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function serializeSections(sections: BlogPost["sections"]) {
  return sections
    .map((section) => {
      const lines = [
        `## ${section.heading}`,
        section.image?.src ? `IMAGE: ${section.image.src}` : "",
        section.image?.alt ? `ALT: ${section.image.alt}` : "",
        section.image?.caption ? `CAPTION: ${section.image.caption}` : "",
        section.quote ? `QUOTE: ${section.quote}` : "",
        ...(section.bullets ?? []).map((bullet) => `- ${bullet}`),
        "",
        ...section.body,
      ].filter((line, index, array) => line || array[index - 1]);

      return lines.join("\n").trim();
    })
    .join("\n\n");
}

function parseSections(value: string): BlogPost["sections"] {
  return value
    .split(/\n(?=##\s+)/)
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const headingLine = lines.find((line) => line.startsWith("## "));
      const heading = headingLine?.replace(/^##\s+/, "").trim() || "Main answer";
      const imageSrc = lines.find((line) => line.toUpperCase().startsWith("IMAGE:"))?.replace(/^IMAGE:\s*/i, "").trim() ?? "";
      const imageAlt = lines.find((line) => line.toUpperCase().startsWith("ALT:"))?.replace(/^ALT:\s*/i, "").trim() ?? "";
      const imageCaption = lines.find((line) => line.toUpperCase().startsWith("CAPTION:"))?.replace(/^CAPTION:\s*/i, "").trim() ?? "";
      const quote = lines.find((line) => line.toUpperCase().startsWith("QUOTE:"))?.replace(/^QUOTE:\s*/i, "").trim() ?? "";
      const bullets = lines
        .filter((line) => line.startsWith("- "))
        .map((line) => line.replace(/^-\s+/, "").trim())
        .filter(Boolean);
      const body = lines.filter(
        (line) =>
          !line.startsWith("## ") &&
          !line.startsWith("- ") &&
          !/^(IMAGE|ALT|CAPTION|QUOTE):/i.test(line),
      );

      return {
        heading,
        body,
        image: imageSrc
          ? {
              src: imageSrc,
              alt: imageAlt || heading,
              caption: imageCaption,
            }
          : undefined,
        bullets,
        quote,
      };
    })
    .filter((section) => section.heading && section.body.length > 0);
}

function compactDraft(draft: DraftPost): BlogPost {
  return {
    slug: draft.slug || slugify(draft.title),
    title: draft.title.trim(),
    description: draft.description.trim(),
    publishedAt: draft.publishedAt,
    updatedAt: draft.updatedAt,
    category: draft.category.trim() || "Toy Guide",
    readTime: draft.readTime.trim() || "4 min read",
    keywords: draft.keywords.map((keyword) => keyword.trim()).filter(Boolean),
    summary: draft.summary.trim(),
    deck: draft.deck.trim(),
    heroImage: {
      src: draft.heroImage.src.trim() || "/auction-gallery-wide.webp",
      alt: draft.heroImage.alt.trim() || draft.title.trim(),
      caption: draft.heroImage.caption?.trim(),
    },
    takeaways: draft.takeaways.map((takeaway) => takeaway.trim()).filter(Boolean),
    sections: draft.sections
      .map((section) => ({
        heading: section.heading.trim(),
        body: section.body.map((paragraph) => paragraph.trim()).filter(Boolean),
        image: section.image?.src
          ? {
              src: section.image.src.trim(),
              alt: section.image.alt.trim() || section.heading.trim(),
              caption: section.image.caption?.trim(),
            }
          : undefined,
        bullets: section.bullets?.map((bullet) => bullet.trim()).filter(Boolean),
        quote: section.quote?.trim(),
      }))
      .filter((section) => section.heading && section.body.length > 0),
    faqs: draft.faqs
      .map((faq) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      }))
      .filter((faq) => faq.question && faq.answer),
    cta: {
      label: draft.cta.label.trim() || "Join the Facebook Group",
      href: draft.cta.href.trim() || "https://www.facebook.com/groups/642834551000763",
      note: draft.cta.note?.trim(),
    },
  };
}

export default function BlogCmsPanel() {
  const [drafts, setDrafts] = useState<DraftPost[]>([]);
  const [activeDraft, setActiveDraft] = useState<DraftPost>(() => emptyDraft());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      setDrafts(JSON.parse(saved) as DraftPost[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }, [drafts]);

  const mergedPosts = useMemo(() => {
    const cleanDrafts = drafts.map(compactDraft).filter((post) => post.slug && post.title);
    const published = publishedPosts as BlogPost[];
    const draftSlugs = new Set(cleanDrafts.map((post) => post.slug));

    return [
      ...cleanDrafts,
      ...published.filter((post) => !draftSlugs.has(post.slug)),
    ];
  }, [drafts]);

  const exportJson = useMemo(() => JSON.stringify(mergedPosts, null, 2), [mergedPosts]);

  const updateDraft = <Key extends keyof DraftPost>(key: Key, value: DraftPost[Key]) => {
    setActiveDraft((current) => ({
      ...current,
      [key]: value,
      slug: key === "title" && !current.slug ? slugify(String(value)) : current.slug,
    }));
  };

  const saveDraft = () => {
    const cleaned = compactDraft(activeDraft);
    if (!cleaned.title || !cleaned.slug) {
      return;
    }

    const nextDraft = {
      ...activeDraft,
      ...cleaned,
      draftId: activeDraft.draftId,
    };

    setDrafts((current) => {
      const withoutCurrent = current.filter((draft) => draft.draftId !== activeDraft.draftId);
      return [nextDraft, ...withoutCurrent];
    });
    setActiveDraft(emptyDraft());
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(exportJson);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const downloadJson = () => {
    const blob = new Blob([exportJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "blog-posts.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      <section className="rounded-[1.6rem] border-2 border-white/10 bg-white/[0.055] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.26)] sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-black text-white">Create post</h2>
            <p className="mt-1 text-sm font-semibold text-tz-muted">Drafts save in this browser until exported.</p>
          </div>
          <button
            type="button"
            onClick={saveDraft}
            className="rounded-2xl border-2 border-white bg-[#ff4200] px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_8px_0_#9b2200] transition-transform duration-300 hover:-translate-y-1"
          >
            Save Draft
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Title</span>
            <input
              value={activeDraft.title}
              onChange={(event) => updateDraft("title", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="Toys Per Kilo Buying Tips for New Resellers"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Slug</span>
            <input
              value={activeDraft.slug}
              onChange={(event) => updateDraft("slug", slugify(event.target.value))}
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="toys-per-kilo-buying-tips"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Category</span>
            <input
              value={activeDraft.category}
              onChange={(event) => updateDraft("category", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="Buying Guide"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Published date</span>
            <input
              type="date"
              value={activeDraft.publishedAt}
              onChange={(event) => {
                updateDraft("publishedAt", event.target.value);
                updateDraft("updatedAt", event.target.value);
              }}
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Read time</span>
            <input
              value={activeDraft.readTime}
              onChange={(event) => updateDraft("readTime", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="5 min read"
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">SEO description</span>
            <textarea
              value={activeDraft.description}
              onChange={(event) => updateDraft("description", event.target.value)}
              className="min-h-24 w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold leading-relaxed text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="A direct answer-focused summary for Google snippets and AI answer engines."
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Answer snapshot</span>
            <textarea
              value={activeDraft.summary}
              onChange={(event) => updateDraft("summary", event.target.value)}
              className="min-h-24 w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold leading-relaxed text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="Write the short answer that should appear near the top of the article."
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Editorial deck</span>
            <textarea
              value={activeDraft.deck}
              onChange={(event) => updateDraft("deck", event.target.value)}
              className="min-h-24 w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold leading-relaxed text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="Write the article standfirst shown under the headline. Make it persuasive, useful, and specific."
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Hero image path</span>
            <input
              value={activeDraft.heroImage.src}
              onChange={(event) =>
                updateDraft("heroImage", {
                  ...activeDraft.heroImage,
                  src: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="/auction-gallery-wide.webp"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Hero image alt</span>
            <input
              value={activeDraft.heroImage.alt}
              onChange={(event) =>
                updateDraft("heroImage", {
                  ...activeDraft.heroImage,
                  alt: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="Describe the image for accessibility and SEO."
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Hero image caption</span>
            <input
              value={activeDraft.heroImage.caption ?? ""}
              onChange={(event) =>
                updateDraft("heroImage", {
                  ...activeDraft.heroImage,
                  caption: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="Optional caption shown below the hero image."
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Keywords, one per line</span>
            <textarea
              value={activeDraft.keywords.join("\n")}
              onChange={(event) => updateDraft("keywords", splitLines(event.target.value))}
              className="min-h-28 w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold leading-relaxed text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder={"toys per kilo Philippines\nToyzoona Importer\nbulk toys Laguna"}
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Key takeaways, one per line</span>
            <textarea
              value={activeDraft.takeaways.join("\n")}
              onChange={(event) => updateDraft("takeaways", splitLines(event.target.value))}
              className="min-h-28 w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold leading-relaxed text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder={"Paying by kilo is best when you need variety.\nCheck Facebook updates before visiting.\nSort your haul before reselling."}
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">Article sections</span>
            <textarea
              value={serializeSections(activeDraft.sections)}
              onChange={(event) => updateDraft("sections", parseSections(event.target.value))}
              className="min-h-44 w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold leading-relaxed text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder={"## What buyers should know\nIMAGE: /toy-category-bulk-bins.webp\nALT: Mixed Toyzoona toy bins\nCAPTION: Optional image caption\nQUOTE: Optional pull quote\n- Optional bullet\n\nWrite paragraph one.\nWrite paragraph two."}
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">CTA label</span>
            <input
              value={activeDraft.cta.label}
              onChange={(event) =>
                updateDraft("cta", {
                  ...activeDraft.cta,
                  label: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="Join the Facebook Group"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">CTA link</span>
            <input
              value={activeDraft.cta.href}
              onChange={(event) =>
                updateDraft("cta", {
                  ...activeDraft.cta,
                  href: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="https://www.facebook.com/groups/642834551000763"
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">CTA note</span>
            <textarea
              value={activeDraft.cta.note ?? ""}
              onChange={(event) =>
                updateDraft("cta", {
                  ...activeDraft.cta,
                  note: event.target.value,
                })
              }
              className="min-h-24 w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold leading-relaxed text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder="Explain what the reader should do next and why."
            />
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-white/64">FAQs, use Q: and A: lines</span>
            <textarea
              value={activeDraft.faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")}
              onChange={(event) => {
                const blocks = event.target.value.split(/\n\s*\n/);
                updateDraft(
                  "faqs",
                  blocks
                    .map((block) => {
                      const question = block.match(/Q:\s*(.*)/i)?.[1]?.trim() ?? "";
                      const answer = block.match(/A:\s*([\s\S]*)/i)?.[1]?.trim() ?? "";
                      return { question, answer };
                    })
                    .filter((faq) => faq.question || faq.answer),
                );
              }}
              className="min-h-36 w-full rounded-2xl border border-white/10 bg-[#09091a] px-4 py-3 text-sm font-semibold leading-relaxed text-white outline-none ring-[#ffef3f]/30 transition focus:ring-4"
              placeholder={"Q: Where can I buy toys per kilo?\nA: Toyzoona Importer sells through Facebook and warehouse updates."}
            />
          </label>
        </div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-[1.6rem] border-2 border-[#ffef3f]/20 bg-[#ffef3f]/10 p-5">
          <h2 className="font-display text-2xl font-black text-[#ffef3f]">Publish flow</h2>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-white/76">
            This static CMS cannot write to GitHub by itself. Export the JSON, replace
            <span className="font-black text-white"> content/blog-posts.json</span>, commit, and push.
          </p>
          <div className="mt-4 grid gap-2">
            <button
              type="button"
              onClick={copyJson}
              className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#4b1b00]"
            >
              {copied ? "Copied JSON" : "Copy merged JSON"}
            </button>
            <button
              type="button"
              onClick={downloadJson}
              className="rounded-2xl border-2 border-white/25 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white"
            >
              Download JSON
            </button>
          </div>
        </section>

        <section className="rounded-[1.6rem] border-2 border-white/10 bg-white/[0.045] p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-black text-white">Drafts</h2>
            <button
              type="button"
              onClick={() => setDrafts([])}
              className="text-xs font-black uppercase tracking-[0.12em] text-white/48 hover:text-white"
            >
              Clear
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {drafts.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-tz-muted">
                No saved drafts yet.
              </p>
            ) : (
              drafts.map((draft) => (
                <button
                  key={draft.draftId}
                  type="button"
                  onClick={() => setActiveDraft(draft)}
                  className="w-full rounded-2xl border border-white/10 bg-[#09091a] p-4 text-left transition hover:border-[#ffef3f]/40"
                >
                  <span className="block text-sm font-black text-white">{draft.title}</span>
                  <span className="mt-1 block text-xs font-semibold text-tz-muted">/{draft.slug}</span>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="rounded-[1.6rem] border-2 border-white/10 bg-white/[0.045] p-5">
          <h2 className="font-display text-2xl font-black text-white">Current export</h2>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-white/48">
            {mergedPosts.length} total posts
          </p>
          <textarea
            readOnly
            value={exportJson}
            className="mt-4 h-72 w-full rounded-2xl border border-white/10 bg-[#050511] p-4 font-mono text-[11px] leading-relaxed text-white/72 outline-none"
          />
        </section>
      </aside>
    </div>
  );
}
