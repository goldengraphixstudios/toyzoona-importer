"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Session, User } from "@supabase/supabase-js";
import publishedPosts from "@/content/blog-posts.json";
import type { BlogPost } from "@/lib/blogPosts";
import { assetPath } from "@/lib/assetPath";
import { cmsRowToBlogPost, type CmsPostInput, type CmsPostRow, type CmsPostStatus } from "@/lib/cmsPostTypes";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";

type Profile = {
  id: string;
  role: "admin" | "editor";
  display_name: string | null;
};

type EditorState = BlogPost & {
  id?: string;
  status: CmsPostStatus;
};

type CmsView = "home" | "articles" | "settings" | "tools";
type CmsTheme = "dark" | "light";

const staticPosts = publishedPosts as BlogPost[];
const ADMIN_EMAIL = "admin@toyzoona-importer.com";
const resourceImages = [
  { label: "Auction wide", src: "/auction-gallery-wide.webp" },
  { label: "Auction stock", src: "/auction-gallery-stock.webp" },
  { label: "Auction kids", src: "/auction-gallery-kids.webp" },
  { label: "Toy category 1", src: "/toy-categories/stock-01.webp" },
  { label: "Toy category 2", src: "/toy-categories/stock-02.webp" },
  { label: "Toy category 3", src: "/toy-categories/stock-03.webp" },
  { label: "Toy category 4", src: "/toy-categories/stock-04.webp" },
  { label: "Toy fair 1", src: "/toyfair-1.jpg" },
  { label: "Toy fair 2", src: "/toyfair-2.jpg" },
  { label: "TV feature", src: "/tv-1.jpg" },
];

const today = () => new Date().toISOString().slice(0, 10);

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

function emptyEditor(authorId: string | null = null): EditorState {
  void authorId;
  return {
    id: undefined,
    status: "draft",
    slug: "",
    title: "",
    description: "",
    publishedAt: today(),
    updatedAt: today(),
    category: "Buying Guide",
    readTime: "5 min read",
    keywords: [],
    summary: "",
    deck: "",
    heroImage: {
      src: "/auction-gallery-wide.webp",
      alt: "Toyzoona toy stock",
      caption: "",
    },
    takeaways: [],
    sections: [
      {
        heading: "Main answer",
        body: [""],
        bullets: [],
        quote: "",
      },
    ],
    faqs: [],
    cta: {
      label: "Message the Facebook Page",
      href: "https://www.facebook.com/ToyzoonaLaguna",
      note: "Message Toyzoona Laguna to confirm current stock, auction previews, and live selling updates.",
    },
  };
}

function rowToEditor(row: CmsPostRow): EditorState {
  const post = cmsRowToBlogPost(row);
  return {
    ...post,
    id: row.id,
    status: row.status,
  };
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
      ].filter(Boolean);

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
      const imageSrc = lines.find((line) => /^IMAGE:/i.test(line))?.replace(/^IMAGE:\s*/i, "").trim() ?? "";
      const imageAlt = lines.find((line) => /^ALT:/i.test(line))?.replace(/^ALT:\s*/i, "").trim() ?? "";
      const imageCaption = lines.find((line) => /^CAPTION:/i.test(line))?.replace(/^CAPTION:\s*/i, "").trim() ?? "";
      const quote = lines.find((line) => /^QUOTE:/i.test(line))?.replace(/^QUOTE:\s*/i, "").trim() ?? "";
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

function editorToInput(editor: EditorState, user: User): CmsPostInput {
  return {
    id: editor.id,
    slug: editor.slug || slugify(editor.title),
    title: editor.title.trim(),
    description: editor.description.trim(),
    status: editor.status,
    published_at: editor.publishedAt || today(),
    updated_at: today(),
    category: editor.category.trim() || "Buying Guide",
    read_time: editor.readTime.trim() || "5 min read",
    keywords: editor.keywords.map((keyword) => keyword.trim()).filter(Boolean),
    summary: editor.summary.trim(),
    deck: editor.deck.trim(),
    hero_image: {
      src: editor.heroImage.src.trim() || "/auction-gallery-wide.webp",
      alt: editor.heroImage.alt.trim() || editor.title.trim(),
      caption: editor.heroImage.caption?.trim(),
    },
    takeaways: editor.takeaways.map((item) => item.trim()).filter(Boolean),
    sections: editor.sections
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
    faqs: editor.faqs
      .map((faq) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      }))
      .filter((faq) => faq.question && faq.answer),
    cta: {
      label: editor.cta.label.trim() || "Message the Facebook Page",
      href: editor.cta.href.trim() || "https://www.facebook.com/ToyzoonaLaguna",
      note: editor.cta.note?.trim(),
    },
    author_id: user.id,
  };
}

function inputClassName() {
  return "w-full rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm font-medium text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/10";
}

function labelClassName() {
  return "mb-1.5 block text-xs font-semibold text-slate-300";
}

function formatButtonClassName() {
  return "rounded-lg border border-[var(--cms-border)] bg-[var(--cms-panel-strong)] px-3 py-2 text-xs font-semibold text-[var(--cms-muted)] transition-colors hover:border-[var(--cms-accent)] hover:text-[var(--cms-text)]";
}

function themedInputClassName() {
  return "w-full rounded-lg border border-[var(--cms-border)] bg-[var(--cms-field)] px-3 py-2.5 text-sm font-medium text-[var(--cms-field-text)] outline-none transition-colors placeholder:text-[var(--cms-soft)] focus:border-[var(--cms-accent)] focus:ring-2 focus:ring-[var(--cms-accent)]/10";
}

function themedLabelClassName() {
  return "mb-1.5 block text-xs font-semibold text-[var(--cms-muted)]";
}

function panelClassName(extra = "") {
  return `rounded-2xl border border-[var(--cms-border)] bg-[var(--cms-panel)] shadow-sm ${extra}`;
}

function secondaryButtonClassName(extra = "") {
  return `rounded-lg border border-[var(--cms-border)] px-4 py-2 text-xs font-semibold text-[var(--cms-muted)] transition-colors hover:border-[var(--cms-accent)] hover:text-[var(--cms-text)] disabled:cursor-not-allowed disabled:opacity-50 ${extra}`;
}

function primaryButtonClassName(extra = "") {
  return `rounded-lg bg-[var(--cms-accent)] px-4 py-2 text-xs font-bold text-[var(--cms-accent-text)] transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${extra}`;
}

function getThemeStyle(theme: CmsTheme): CSSProperties {
  const values =
    theme === "light"
      ? {
          "--cms-bg": "#f8fafc",
          "--cms-panel": "rgba(255,255,255,0.92)",
          "--cms-panel-strong": "#ffffff",
          "--cms-text": "#0f172a",
          "--cms-muted": "#475569",
          "--cms-soft": "#64748b",
          "--cms-border": "#dbe3ef",
          "--cms-field": "#ffffff",
          "--cms-field-text": "#0f172a",
          "--cms-accent": "#f59e0b",
          "--cms-accent-text": "#111827",
          "--cms-danger": "#dc2626",
        }
      : {
          "--cms-bg": "#0b1120",
          "--cms-panel": "rgba(15,23,42,0.72)",
          "--cms-panel-strong": "rgba(2,6,23,0.62)",
          "--cms-text": "#f8fafc",
          "--cms-muted": "#cbd5e1",
          "--cms-soft": "#94a3b8",
          "--cms-border": "#1e293b",
          "--cms-field": "rgba(2,6,23,0.55)",
          "--cms-field-text": "#f8fafc",
          "--cms-accent": "#fcd34d",
          "--cms-accent-text": "#111827",
          "--cms-danger": "#fca5a5",
        };

  return values as CSSProperties;
}

export default function CmsAdminApp() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<CmsPostRow[]>([]);
  const [editor, setEditor] = useState<EditorState>(() => emptyEditor());
  const [status, setStatus] = useState("Preparing content manager...");
  const [busy, setBusy] = useState(false);
  const [activeView, setActiveView] = useState<CmsView>("home");
  const [theme, setTheme] = useState<CmsTheme>("dark");

  const previewPost = editor;
  const publishedCount = posts.filter((post) => post.status === "published").length;
  const draftCount = posts.filter((post) => post.status === "draft").length;
  const latestPost = posts[0];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("toyzoona-cms-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("toyzoona-cms-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!supabase) {
      setStatus("Content manager is not configured yet.");
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setProfile(nextSession?.user.email === ADMIN_EMAIL ? {
        id: nextSession.user.id,
        role: "admin",
        display_name: "Toyzoona Admin",
      } : null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !session?.user) {
      return;
    }
    const user = session.user;

    async function loadWorkspace() {
      setBusy(true);
      setStatus("Loading your workspace...");

      if (user.email !== ADMIN_EMAIL) {
        setStatus("This account is not allowed to manage content.");
        setBusy(false);
        return;
      }

      setProfile({
        id: user.id,
        role: "admin",
        display_name: "Toyzoona Admin",
      });
      await fetchPosts();
      setBusy(false);
    }

    loadWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, session?.user?.id]);

  async function fetchPosts() {
    if (!supabase) {
      return;
    }

    const { data, error } = await supabase
      .from("cms_posts")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      setStatus(error.message);
      return;
    }

    setPosts((data ?? []) as CmsPostRow[]);
    setStatus("Content manager loaded.");
  }

  async function handleAuth() {
    if (!supabase) {
      return;
    }

    setBusy(true);
    const result = await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);
    if (result.error) {
      setStatus(result.error.message);
      return;
    }

    setStatus("Logged in.");
  }

  async function savePost(nextStatus?: CmsPostStatus) {
    if (!supabase || !session?.user) {
      return;
    }

    const payload = editorToInput({ ...editor, status: nextStatus ?? editor.status }, session.user);
    if (!payload.title || !payload.slug || !payload.description || !payload.summary) {
      setStatus("Title, slug, description, and answer-first summary are required.");
      return;
    }

    setBusy(true);
    const { data, error } = await supabase
      .from("cms_posts")
      .upsert(payload, { onConflict: "slug" })
      .select("*")
      .single();

    setBusy(false);
    if (error) {
      setStatus(error.message);
      return;
    }

    const saved = data as CmsPostRow;
    setEditor(rowToEditor(saved));
    setStatus(saved.status === "published" ? "Post published." : "Draft saved.");
    await fetchPosts();
  }

  async function deletePost(id?: string) {
    if (!supabase || !id || !window.confirm("Delete this post?")) {
      return;
    }

    setBusy(true);
    const { error } = await supabase.from("cms_posts").delete().eq("id", id);
    setBusy(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    setEditor(emptyEditor(session?.user.id ?? null));
    setStatus("Post deleted.");
    await fetchPosts();
  }

  function loadStaticPost(post: BlogPost) {
    setEditor({ ...post, status: "draft" });
    setActiveView("articles");
    setStatus("Loaded existing article as a new draft.");
  }

  function loadCmsPost(post: CmsPostRow) {
    setEditor(rowToEditor(post));
    setActiveView("articles");
  }

  function startNewPost() {
    const blank = emptyEditor(session?.user.id ?? null);
    setEditor(blank);
    setActiveView("articles");
    setStatus("New draft started.");
  }

  function updateSection(index: number, nextSection: Partial<BlogPost["sections"][number]>) {
    setEditor((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...nextSection } : section,
      ),
    }));
  }

  function addSection(template?: Partial<BlogPost["sections"][number]>) {
    setEditor((current) => ({
      ...current,
      sections: [
        ...current.sections,
        {
          heading: template?.heading ?? "New section heading",
          body: template?.body ?? ["Write the main paragraph here."],
          image: template?.image,
          bullets: template?.bullets ?? [],
          quote: template?.quote ?? "",
        },
      ],
    }));
  }

  function removeSection(index: number) {
    setEditor((current) => ({
      ...current,
      sections: current.sections.filter((_section, sectionIndex) => sectionIndex !== index),
    }));
  }

  function moveSection(index: number, direction: -1 | 1) {
    setEditor((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.sections.length) {
        return current;
      }

      const sections = [...current.sections];
      const [section] = sections.splice(index, 1);
      sections.splice(nextIndex, 0, section);
      return { ...current, sections };
    });
  }

  function applySectionTemplate(type: "quick-answer" | "checklist" | "image-proof" | "quote") {
    if (type === "quick-answer") {
      addSection({
        heading: "Quick answer",
        body: ["Start with a direct answer in 2 to 3 sentences so search engines and AI answer engines can understand the page immediately."],
        bullets: ["Who this is for", "What to check first", "What action to take next"],
      });
      return;
    }

    if (type === "checklist") {
      addSection({
        heading: "Buying checklist",
        body: ["Use this section to give buyers practical steps they can follow before messaging Toyzoona."],
        bullets: ["Confirm current stock", "Prepare budget and quantity", "Message the official Facebook page"],
      });
      return;
    }

    if (type === "image-proof") {
      addSection({
        heading: "Stock proof",
        body: ["Use this section to explain what the customer is seeing in the photo and why it matters."],
        image: {
          src: "/toy-categories/stock-01.webp",
          alt: "Toyzoona toy stock arranged for buyers",
          caption: "Use captions to explain product context, not just decorate the page.",
        },
      });
      return;
    }

    addSection({
      heading: "Buyer reminder",
      body: ["Use this section to support the quote with one clear explanation."],
      quote: "Clear answers convert better than vague descriptions.",
    });
  }

  const sectionFormatOptions = [
    { label: "Section", action: () => addSection() },
    { label: "Quick answer", action: () => applySectionTemplate("quick-answer") },
    { label: "Checklist", action: () => applySectionTemplate("checklist") },
    { label: "Image proof", action: () => applySectionTemplate("image-proof") },
    { label: "Quote", action: () => applySectionTemplate("quote") },
  ];

  if (!isSupabaseConfigured() || !supabase) {
    return (
      <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-6 text-slate-100">
        <h2 className="text-2xl font-bold">Content manager is not ready yet.</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          The publishing dashboard needs to be configured before articles can be managed.
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
        <p className="mb-3 inline-flex rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-300">
          Toyzoona Admin
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white">Login to manage content</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Use the approved Toyzoona admin account to edit and publish articles.
        </p>
        <div className="mt-6 grid gap-4">
          <label>
            <span className={labelClassName()}>Email</span>
            <input className={inputClassName()} type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            <span className={labelClassName()}>Password</span>
            <input className={inputClassName()} type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button
            onClick={handleAuth}
            disabled={busy}
            className="rounded-lg bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Please wait..." : "Login"}
          </button>
          <p className="text-xs leading-relaxed text-slate-400">{status}</p>
        </div>
      </div>
    );
  }

  const activeProfile: Profile = profile ?? {
    id: session.user.id,
    role: "admin",
    display_name: "Toyzoona Admin",
  };

  const navItems: Array<{ id: CmsView; label: string; description: string }> = [
    { id: "home", label: "Home", description: "Overview and recent content" },
    { id: "articles", label: "Articles", description: "Write, preview, publish" },
    { id: "settings", label: "Settings", description: "Defaults and account info" },
    { id: "tools", label: "Tools", description: "SEO helpers and imports" },
  ];

  return (
    <div
      style={getThemeStyle(theme)}
      className="min-h-[calc(100vh-3rem)] rounded-3xl bg-[var(--cms-bg)] p-4 text-[var(--cms-text)] transition-colors sm:p-6"
    >
      <header className={`${panelClassName("mb-5 p-4")} flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--cms-soft)]">Toyzoona Content Manager</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--cms-text)]">Dashboard</h1>
          <p className="mt-1 text-sm text-[var(--cms-muted)]">{status}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={secondaryButtonClassName()}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <button type="button" onClick={startNewPost} className={primaryButtonClassName()}>
            New article
          </button>
          <button type="button" onClick={() => supabase.auth.signOut()} className={secondaryButtonClassName()}>
            Sign out
          </button>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className={panelClassName("p-4")}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--cms-soft)]">Signed in</p>
            <p className="mt-2 break-all text-sm font-semibold text-[var(--cms-text)]">{session.user.email}</p>
            <p className="mt-1 text-xs font-medium capitalize text-[var(--cms-soft)]">{activeProfile.role}</p>
          </div>

          <nav className={panelClassName("p-2")}>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`w-full rounded-xl px-3 py-3 text-left transition-colors ${
                  activeView === item.id
                    ? "bg-[var(--cms-accent)] text-[var(--cms-accent-text)]"
                    : "text-[var(--cms-muted)] hover:bg-[var(--cms-panel-strong)] hover:text-[var(--cms-text)]"
                }`}
              >
                <span className="block text-sm font-bold">{item.label}</span>
                <span className="mt-0.5 block text-xs opacity-75">{item.description}</span>
              </button>
            ))}
          </nav>

          <div className={panelClassName("p-4")}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--cms-soft)]">Articles</p>
              <span className="text-xs text-[var(--cms-soft)]">{posts.length} total</span>
            </div>
            <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
              {posts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => loadCmsPost(post)}
                  className="w-full rounded-lg border border-[var(--cms-border)] bg-[var(--cms-panel-strong)] px-3 py-3 text-left transition-colors hover:border-[var(--cms-accent)]"
                >
                  <span className="block text-sm font-semibold leading-snug text-[var(--cms-text)]">{post.title}</span>
                  <span className="mt-1 block text-xs font-medium capitalize text-[var(--cms-soft)]">{post.status}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          {activeView === "home" ? (
            <section className="space-y-5">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ["Total articles", posts.length],
                  ["Published", publishedCount],
                  ["Drafts", draftCount],
                  ["Starter templates", staticPosts.length],
                ].map(([label, value]) => (
                  <div key={label} className={panelClassName("p-5")}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--cms-soft)]">{label}</p>
                    <p className="mt-2 text-3xl font-bold text-[var(--cms-text)]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
                <div className={panelClassName("p-5")}>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-[var(--cms-text)]">Recent articles</h2>
                      <p className="text-sm text-[var(--cms-muted)]">Open any article to edit and preview it.</p>
                    </div>
                    <button type="button" onClick={startNewPost} className={primaryButtonClassName()}>
                      Create article
                    </button>
                  </div>
                  <div className="divide-y divide-[var(--cms-border)]">
                    {posts.slice(0, 8).map((post) => (
                      <button
                        key={post.id}
                        type="button"
                        onClick={() => loadCmsPost(post)}
                        className="grid w-full gap-2 py-4 text-left md:grid-cols-[1fr_130px_100px] md:items-center"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-[var(--cms-text)]">{post.title}</span>
                          <span className="mt-1 block text-xs text-[var(--cms-soft)]">{post.slug}</span>
                        </span>
                        <span className="text-xs text-[var(--cms-muted)]">{post.updated_at}</span>
                        <span className="text-xs font-semibold capitalize text-[var(--cms-muted)]">{post.status}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={panelClassName("p-5")}>
                  <h2 className="text-lg font-bold text-[var(--cms-text)]">Workspace health</h2>
                  <div className="mt-4 space-y-3 text-sm text-[var(--cms-muted)]">
                    <p>Latest update: {latestPost?.updated_at ?? "No articles yet"}</p>
                    <p>Current editor: {editor.title || "Untitled draft"}</p>
                    <p>SEO fields: title, slug, description, keywords, summary, and FAQ schema content are editable.</p>
                  </div>
                  <button type="button" onClick={() => setActiveView("tools")} className={`${secondaryButtonClassName("mt-5")} w-full`}>
                    Open tools
                  </button>
                </div>
              </div>
            </section>
          ) : null}

          {activeView === "articles" ? (
            <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">
              <div className={panelClassName("p-5 sm:p-6")}>
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--cms-soft)]">Article Editor</p>
                    <h2 className="mt-1 text-xl font-bold text-[var(--cms-text)]">{editor.title || "Untitled article"}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => savePost("draft")} disabled={busy} className={secondaryButtonClassName()}>
                      Save draft
                    </button>
                    <button onClick={() => savePost("published")} disabled={busy} className={primaryButtonClassName()}>
                      Publish
                    </button>
                    {editor.id ? (
                      <button onClick={() => deletePost(editor.id)} disabled={busy} className="rounded-lg border border-red-400/40 px-4 py-2 text-xs font-semibold text-[var(--cms-danger)] disabled:opacity-50">
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="mb-5 rounded-lg border border-[var(--cms-border)] bg-[var(--cms-panel-strong)] p-3 text-xs text-[var(--cms-muted)]">{status}</div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label>
                    <span className={themedLabelClassName()}>Title</span>
                    <input className={themedInputClassName()} value={editor.title} onChange={(event) => setEditor((current) => ({ ...current, title: event.target.value, slug: current.slug || slugify(event.target.value) }))} />
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>Slug</span>
                    <input className={themedInputClassName()} value={editor.slug} onChange={(event) => setEditor((current) => ({ ...current, slug: slugify(event.target.value) }))} />
                  </label>
                  <label className="md:col-span-2">
                    <span className={themedLabelClassName()}>Meta description</span>
                    <textarea className={`${themedInputClassName()} min-h-24`} value={editor.description} onChange={(event) => setEditor((current) => ({ ...current, description: event.target.value }))} />
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>Status</span>
                    <select className={themedInputClassName()} value={editor.status} onChange={(event) => setEditor((current) => ({ ...current, status: event.target.value as CmsPostStatus }))}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>Category</span>
                    <input className={themedInputClassName()} value={editor.category} onChange={(event) => setEditor((current) => ({ ...current, category: event.target.value }))} />
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>Published date</span>
                    <input className={themedInputClassName()} type="date" value={editor.publishedAt} onChange={(event) => setEditor((current) => ({ ...current, publishedAt: event.target.value }))} />
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>Read time</span>
                    <input className={themedInputClassName()} value={editor.readTime} onChange={(event) => setEditor((current) => ({ ...current, readTime: event.target.value }))} />
                  </label>
                  <label className="md:col-span-2">
                    <span className={themedLabelClassName()}>Keywords, one per line</span>
                    <textarea className={`${themedInputClassName()} min-h-24`} value={editor.keywords.join("\n")} onChange={(event) => setEditor((current) => ({ ...current, keywords: splitLines(event.target.value) }))} />
                  </label>
                  <label className="md:col-span-2">
                    <span className={themedLabelClassName()}>Answer-first summary</span>
                    <textarea className={`${themedInputClassName()} min-h-28`} value={editor.summary} onChange={(event) => setEditor((current) => ({ ...current, summary: event.target.value }))} />
                  </label>
                  <label className="md:col-span-2">
                    <span className={themedLabelClassName()}>Deck / intro</span>
                    <textarea className={`${themedInputClassName()} min-h-28`} value={editor.deck} onChange={(event) => setEditor((current) => ({ ...current, deck: event.target.value }))} />
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>Hero image path or URL</span>
                    <input className={themedInputClassName()} value={editor.heroImage.src} onChange={(event) => setEditor((current) => ({ ...current, heroImage: { ...current.heroImage, src: event.target.value } }))} />
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>Hero alt text</span>
                    <input className={themedInputClassName()} value={editor.heroImage.alt} onChange={(event) => setEditor((current) => ({ ...current, heroImage: { ...current.heroImage, alt: event.target.value } }))} />
                  </label>
                  <label className="md:col-span-2">
                    <span className={themedLabelClassName()}>Takeaways, one per line</span>
                    <textarea className={`${themedInputClassName()} min-h-24`} value={editor.takeaways.join("\n")} onChange={(event) => setEditor((current) => ({ ...current, takeaways: splitLines(event.target.value) }))} />
                  </label>
                  <div className="md:col-span-2">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className={themedLabelClassName()}>Article sections</span>
                        <p className="text-xs text-[var(--cms-soft)]">Edit the exact structured fields used by the website article renderer.</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sectionFormatOptions.map((option) => (
                          <button key={option.label} type="button" onClick={option.action} className={formatButtonClassName()}>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {editor.sections.map((section, index) => (
                        <div key={`${section.heading}-${index}`} className="rounded-xl border border-[var(--cms-border)] bg-[var(--cms-panel-strong)] p-4">
                          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-bold text-[var(--cms-text)]">Section {index + 1}</p>
                            <div className="flex flex-wrap gap-2">
                              <button type="button" onClick={() => moveSection(index, -1)} className={secondaryButtonClassName("px-3 py-1.5")}>Up</button>
                              <button type="button" onClick={() => moveSection(index, 1)} className={secondaryButtonClassName("px-3 py-1.5")}>Down</button>
                              <button type="button" onClick={() => removeSection(index)} className="rounded-lg border border-red-400/40 px-3 py-1.5 text-xs font-semibold text-[var(--cms-danger)]">Remove</button>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <label className="md:col-span-2">
                              <span className={themedLabelClassName()}>Heading</span>
                              <input className={themedInputClassName()} value={section.heading} onChange={(event) => updateSection(index, { heading: event.target.value })} />
                            </label>
                            <label className="md:col-span-2">
                              <span className={themedLabelClassName()}>Body paragraphs, one per line</span>
                              <textarea className={`${themedInputClassName()} min-h-32`} value={section.body.join("\n")} onChange={(event) => updateSection(index, { body: splitLines(event.target.value) })} />
                            </label>
                            <label>
                              <span className={themedLabelClassName()}>Image path or URL</span>
                              <input
                                className={themedInputClassName()}
                                value={section.image?.src ?? ""}
                                onChange={(event) => updateSection(index, {
                                  image: event.target.value
                                    ? {
                                        src: event.target.value,
                                        alt: section.image?.alt || section.heading,
                                        caption: section.image?.caption ?? "",
                                      }
                                    : undefined,
                                })}
                              />
                            </label>
                            <label>
                              <span className={themedLabelClassName()}>Image alt text</span>
                              <input className={themedInputClassName()} value={section.image?.alt ?? ""} onChange={(event) => updateSection(index, { image: { src: section.image?.src ?? "", alt: event.target.value, caption: section.image?.caption ?? "" } })} />
                            </label>
                            <label className="md:col-span-2">
                              <span className={themedLabelClassName()}>Image caption</span>
                              <input className={themedInputClassName()} value={section.image?.caption ?? ""} onChange={(event) => updateSection(index, { image: { src: section.image?.src ?? "", alt: section.image?.alt || section.heading, caption: event.target.value } })} />
                            </label>
                            <div className="md:col-span-2">
                              <p className={themedLabelClassName()}>Resource image picker</p>
                              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                                {resourceImages.map((image) => (
                                  <button
                                    key={image.src}
                                    type="button"
                                    onClick={() => updateSection(index, { image: { src: image.src, alt: section.image?.alt || image.label, caption: section.image?.caption ?? "" } })}
                                    className="overflow-hidden rounded-lg border border-[var(--cms-border)] bg-[var(--cms-field)] text-left transition-colors hover:border-[var(--cms-accent)]"
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={assetPath(image.src)} alt="" className="h-16 w-full object-cover" />
                                    <span className="block truncate px-2 py-1.5 text-xs font-medium text-[var(--cms-muted)]">{image.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <label>
                              <span className={themedLabelClassName()}>Bullets, one per line</span>
                              <textarea className={`${themedInputClassName()} min-h-28`} value={(section.bullets ?? []).join("\n")} onChange={(event) => updateSection(index, { bullets: splitLines(event.target.value) })} />
                            </label>
                            <label>
                              <span className={themedLabelClassName()}>Pull quote</span>
                              <textarea className={`${themedInputClassName()} min-h-28`} value={section.quote ?? ""} onChange={(event) => updateSection(index, { quote: event.target.value })} />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <label className="md:col-span-2">
                    <span className={themedLabelClassName()}>FAQs, one question/answer pair per block</span>
                    <textarea
                      className={`${themedInputClassName()} min-h-40`}
                      value={editor.faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")}
                      onChange={(event) => {
                        const faqs = event.target.value
                          .split(/\n\s*\n/)
                          .map((block) => {
                            const question = block.match(/^Q:\s*(.+)$/im)?.[1]?.trim() ?? "";
                            const answer = block.match(/^A:\s*([\s\S]+)$/im)?.[1]?.trim() ?? "";
                            return { question, answer };
                          })
                          .filter((faq) => faq.question || faq.answer);
                        setEditor((current) => ({ ...current, faqs }));
                      }}
                    />
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>CTA label</span>
                    <input className={themedInputClassName()} value={editor.cta.label} onChange={(event) => setEditor((current) => ({ ...current, cta: { ...current.cta, label: event.target.value } }))} />
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>CTA URL</span>
                    <input className={themedInputClassName()} value={editor.cta.href} onChange={(event) => setEditor((current) => ({ ...current, cta: { ...current.cta, href: event.target.value } }))} />
                  </label>
                  <label className="md:col-span-2">
                    <span className={themedLabelClassName()}>CTA note</span>
                    <textarea className={`${themedInputClassName()} min-h-24`} value={editor.cta.note ?? ""} onChange={(event) => setEditor((current) => ({ ...current, cta: { ...current.cta, note: event.target.value } }))} />
                  </label>
                </div>
              </div>

              <aside className={`${panelClassName("overflow-hidden")} xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto`}>
                <div className="border-b border-[var(--cms-border)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--cms-soft)]">Live preview</p>
                  <h2 className="mt-1 text-lg font-bold text-[var(--cms-text)]">Website article render</h2>
                </div>
                <article className="bg-white text-slate-950">
                  {previewPost.heroImage.src ? (
                    <div className="relative h-48 overflow-hidden bg-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewPost.heroImage.src.startsWith("/") ? assetPath(previewPost.heroImage.src) : previewPost.heroImage.src} alt="" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-orange-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">{previewPost.category || "Category"}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{previewPost.readTime || "Read time"}</span>
                    </div>
                    <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950">{previewPost.title || "Untitled article"}</h1>
                    <p className="mt-4 text-base leading-relaxed text-slate-700">{previewPost.deck || "Intro text appears here."}</p>
                    <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-orange-600">Answer first</p>
                      <p className="mt-2 text-lg font-semibold leading-relaxed text-slate-900">{previewPost.summary || "The answer-first summary appears here."}</p>
                    </section>
                    {previewPost.takeaways.length ? (
                      <section className="mt-6">
                        <h2 className="text-xl font-bold text-slate-950">Key takeaways</h2>
                        <ul className="mt-3 space-y-2">
                          {previewPost.takeaways.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ) : null}
                    <div className="mt-8 space-y-8">
                      {previewPost.sections.map((section, index) => (
                        <section key={`${section.heading}-${index}`}>
                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-orange-600">{String(index + 1).padStart(2, "0")}</p>
                          <h2 className="text-2xl font-black leading-tight text-slate-950">{section.heading}</h2>
                          {section.image?.src ? (
                            <figure className="my-4 overflow-hidden rounded-2xl border border-slate-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={section.image.src.startsWith("/") ? assetPath(section.image.src) : section.image.src} alt={section.image.alt} className="aspect-video w-full object-cover" />
                              {section.image.caption ? <figcaption className="border-t border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">{section.image.caption}</figcaption> : null}
                            </figure>
                          ) : null}
                          <div className="mt-3 space-y-3">
                            {section.body.map((paragraph) => (
                              <p key={paragraph} className="text-sm leading-7 text-slate-700">{paragraph}</p>
                            ))}
                          </div>
                          {section.bullets?.length ? (
                            <ul className="mt-4 space-y-2">
                              {section.bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {section.quote ? <blockquote className="mt-5 border-l-4 border-orange-500 pl-4 text-lg font-bold leading-snug text-slate-950">{section.quote}</blockquote> : null}
                        </section>
                      ))}
                    </div>
                  </div>
                </article>
              </aside>
            </section>
          ) : null}

          {activeView === "settings" ? (
            <section className="grid gap-5 xl:grid-cols-2">
              <div className={panelClassName("p-5")}>
                <h2 className="text-lg font-bold text-[var(--cms-text)]">Account</h2>
                <div className="mt-4 space-y-3 text-sm text-[var(--cms-muted)]">
                  <p>Email: {session.user.email}</p>
                  <p>Role: {activeProfile.role}</p>
                  <p>Theme: {theme}</p>
                </div>
              </div>
              <div className={panelClassName("p-5")}>
                <h2 className="text-lg font-bold text-[var(--cms-text)]">Publishing defaults</h2>
                <div className="mt-4 grid gap-3">
                  <label>
                    <span className={themedLabelClassName()}>Default CTA label</span>
                    <input className={themedInputClassName()} value={editor.cta.label} onChange={(event) => setEditor((current) => ({ ...current, cta: { ...current.cta, label: event.target.value } }))} />
                  </label>
                  <label>
                    <span className={themedLabelClassName()}>Default CTA URL</span>
                    <input className={themedInputClassName()} value={editor.cta.href} onChange={(event) => setEditor((current) => ({ ...current, cta: { ...current.cta, href: event.target.value } }))} />
                  </label>
                </div>
              </div>
            </section>
          ) : null}

          {activeView === "tools" ? (
            <section className="grid gap-5 xl:grid-cols-3">
              <div className={panelClassName("p-5")}>
                <h2 className="text-lg font-bold text-[var(--cms-text)]">SEO checklist</h2>
                <div className="mt-4 space-y-2 text-sm text-[var(--cms-muted)]">
                  <p>Title: {editor.title ? "Ready" : "Missing"}</p>
                  <p>Description: {editor.description.length >= 120 ? "Good length" : "Needs more detail"}</p>
                  <p>Keywords: {editor.keywords.length} added</p>
                  <p>FAQs: {editor.faqs.length} added</p>
                </div>
              </div>
              <div className={panelClassName("p-5")}>
                <h2 className="text-lg font-bold text-[var(--cms-text)]">Formatting shortcuts</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {sectionFormatOptions.map((option) => (
                    <button key={option.label} type="button" onClick={() => { option.action(); setActiveView("articles"); }} className={formatButtonClassName()}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className={panelClassName("p-5")}>
                <h2 className="text-lg font-bold text-[var(--cms-text)]">Starter imports</h2>
                <div className="mt-4 space-y-2">
                  {staticPosts.map((post) => (
                    <button key={post.slug} type="button" onClick={() => loadStaticPost(post)} className="w-full rounded-lg border border-[var(--cms-border)] px-3 py-2 text-left text-xs font-medium text-[var(--cms-muted)] transition-colors hover:border-[var(--cms-accent)]">
                      {post.title}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
