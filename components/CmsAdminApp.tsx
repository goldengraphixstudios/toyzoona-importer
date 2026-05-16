"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import publishedPosts from "@/content/blog-posts.json";
import type { BlogPost } from "@/lib/blogPosts";
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

const staticPosts = publishedPosts as BlogPost[];

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
  return "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-amber-300/60 hover:text-amber-200";
}

export default function CmsAdminApp() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const sectionsTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<CmsPostRow[]>([]);
  const [editor, setEditor] = useState<EditorState>(() => emptyEditor());
  const [sectionsText, setSectionsText] = useState(serializeSections(emptyEditor().sections));
  const [status, setStatus] = useState("Preparing content manager...");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setStatus("Content manager is not configured yet.");
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setProfile(null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !session?.user) {
      return;
    }
    const client = supabase;
    const userId = session.user.id;

    async function loadProfileAndPosts() {
      setBusy(true);
      setStatus("Loading your workspace...");
      const { data: profileData, error: profileError } = await client
        .from("cms_profiles")
        .select("id, role, display_name")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) {
        setStatus(profileError.message);
        setBusy(false);
        return;
      }

      if (!profileData) {
        setStatus("Logged in, but this account does not have publishing access yet.");
        setBusy(false);
        return;
      }

      setProfile(profileData as Profile);
      await fetchPosts();
      setBusy(false);
    }

    loadProfileAndPosts();
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

    const payload = editorToInput({ ...editor, status: nextStatus ?? editor.status, sections: parseSections(sectionsText) }, session.user);
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
    setSectionsText(serializeSections(saved.sections));
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
    setSectionsText(serializeSections(emptyEditor().sections));
    setStatus("Post deleted.");
    await fetchPosts();
  }

  async function refreshAccess() {
    if (!supabase || !session?.user) {
      return;
    }

    setBusy(true);
    setStatus("Checking access...");
    const { data, error } = await supabase
      .from("cms_profiles")
      .select("id, role, display_name")
      .eq("id", session.user.id)
      .maybeSingle();
    setBusy(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    if (!data) {
      setStatus("This account is still waiting for publishing access.");
      return;
    }

    setProfile(data as Profile);
    setStatus("Access approved.");
    await fetchPosts();
  }

  function loadStaticPost(post: BlogPost) {
    setEditor({ ...post, status: "draft" });
    setSectionsText(serializeSections(post.sections));
    setStatus("Loaded existing article as a new draft.");
  }

  function insertSectionsFormat(snippet: string) {
    const textarea = sectionsTextareaRef.current;
    if (!textarea) {
      setSectionsText((current) => `${current.trim()}\n\n${snippet}`.trim());
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = sectionsText.slice(0, start);
    const after = sectionsText.slice(end);
    const needsLeadingBreak = before.trim().length > 0 && !before.endsWith("\n\n");
    const needsTrailingBreak = after.trim().length > 0 && !snippet.endsWith("\n\n");
    const insertion = `${needsLeadingBreak ? "\n\n" : ""}${snippet}${needsTrailingBreak ? "\n\n" : ""}`;
    const nextValue = `${before}${insertion}${after}`;

    setSectionsText(nextValue);
    window.requestAnimationFrame(() => {
      textarea.focus();
      const cursor = before.length + insertion.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  }

  const sectionFormatOptions = [
    {
      label: "Section",
      snippet: "## New section heading\nWrite the main paragraph here. Keep one idea per paragraph for easier reading.",
    },
    {
      label: "Paragraph",
      snippet: "Add a clear paragraph that answers one buyer question or explains one buying step.",
    },
    {
      label: "Bullet",
      snippet: "- Add one scannable point for buyers",
    },
    {
      label: "Quote",
      snippet: "QUOTE: Add a strong pull quote or key buying reminder.",
    },
    {
      label: "Image",
      snippet: "IMAGE: /toy-categories/stock-01.webp\nALT: Toyzoona toy stock arranged for buyers\nCAPTION: Use captions to explain what buyers are seeing.",
    },
    {
      label: "SEO Template",
      snippet:
        "## Quick answer\nStart with a direct answer in 2 to 3 sentences so search engines and AI answer engines can understand the page immediately.\n\n- Who this is for\n- What to check first\n- What action to take next\n\n## Buying checklist\nWrite practical steps the customer can follow before messaging Toyzoona.\n\nQUOTE: Clear answers convert better than vague descriptions.",
    },
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

  if (!profile) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-slate-100">
        <h2 className="text-2xl font-bold">Access pending</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          You are logged in as `{session.user.email}`, but this account does not have publishing access yet.
          Use the approved Toyzoona admin account or refresh access after an admin grants permission.
        </p>
        <p className="mt-4 rounded-lg bg-slate-950/70 p-3 font-mono text-xs text-amber-200">{session.user.id}</p>
        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/50 p-3 text-xs leading-relaxed text-slate-300">
          {status}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={refreshAccess}
            disabled={busy}
            className="rounded-lg bg-amber-300 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-50"
          >
            {busy ? "Checking..." : "Refresh access"}
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-bold text-slate-300 transition-colors hover:border-slate-500"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Logged in</p>
          <p className="mt-2 break-all text-sm font-semibold text-white">{session.user.email}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{profile.role}</p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-4 rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-500"
          >
            Sign out
          </button>
        </div>

        <button
          onClick={() => {
            const blank = emptyEditor(session.user.id);
            setEditor(blank);
            setSectionsText(serializeSections(blank.sections));
            setStatus("New draft started.");
          }}
          className="w-full rounded-lg bg-amber-300 px-4 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-200"
        >
          New post
        </button>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Articles</p>
          <div className="space-y-2">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => {
                  setEditor(rowToEditor(post));
                  setSectionsText(serializeSections(post.sections));
                }}
                className="w-full rounded-lg border border-slate-800 bg-slate-950/45 px-3 py-3 text-left transition-colors hover:border-amber-300/50"
              >
                <span className="block text-sm font-semibold leading-snug text-slate-100">{post.title}</span>
                <span className="mt-1 block text-xs font-medium capitalize text-slate-500">{post.status}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Starter articles</p>
          <div className="space-y-2">
            {staticPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => loadStaticPost(post)}
                className="w-full rounded-lg border border-slate-800 px-3 py-2 text-left text-xs font-medium text-slate-300 transition-colors hover:border-amber-300/50"
              >
                {post.title}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-black/20 sm:p-7">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Editor</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">Article Editor</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => savePost("draft")} disabled={busy} className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 disabled:opacity-50">
              Save draft
            </button>
            <button onClick={() => savePost("published")} disabled={busy} className="rounded-lg bg-amber-300 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-50">
              Publish
            </button>
            {editor.id ? (
              <button onClick={() => deletePost(editor.id)} disabled={busy} className="rounded-lg border border-red-400/40 px-4 py-2 text-xs font-semibold text-red-200 disabled:opacity-50">
                Delete
              </button>
            ) : null}
          </div>
        </div>

        <div className="mb-5 rounded-lg border border-slate-800 bg-slate-950/50 p-3 text-xs text-slate-300">{status}</div>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className={labelClassName()}>Title</span>
            <input className={inputClassName()} value={editor.title} onChange={(event) => setEditor((current) => ({ ...current, title: event.target.value, slug: current.slug || slugify(event.target.value) }))} />
          </label>
          <label>
            <span className={labelClassName()}>Slug</span>
            <input className={inputClassName()} value={editor.slug} onChange={(event) => setEditor((current) => ({ ...current, slug: slugify(event.target.value) }))} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClassName()}>Meta description</span>
            <textarea className={`${inputClassName()} min-h-24`} value={editor.description} onChange={(event) => setEditor((current) => ({ ...current, description: event.target.value }))} />
          </label>
          <label>
            <span className={labelClassName()}>Status</span>
            <select className={inputClassName()} value={editor.status} onChange={(event) => setEditor((current) => ({ ...current, status: event.target.value as CmsPostStatus }))}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <label>
            <span className={labelClassName()}>Category</span>
            <input className={inputClassName()} value={editor.category} onChange={(event) => setEditor((current) => ({ ...current, category: event.target.value }))} />
          </label>
          <label>
            <span className={labelClassName()}>Published date</span>
            <input className={inputClassName()} type="date" value={editor.publishedAt} onChange={(event) => setEditor((current) => ({ ...current, publishedAt: event.target.value }))} />
          </label>
          <label>
            <span className={labelClassName()}>Read time</span>
            <input className={inputClassName()} value={editor.readTime} onChange={(event) => setEditor((current) => ({ ...current, readTime: event.target.value }))} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClassName()}>Keywords, one per line</span>
            <textarea className={`${inputClassName()} min-h-28`} value={editor.keywords.join("\n")} onChange={(event) => setEditor((current) => ({ ...current, keywords: splitLines(event.target.value) }))} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClassName()}>Answer-first summary</span>
            <textarea className={`${inputClassName()} min-h-28`} value={editor.summary} onChange={(event) => setEditor((current) => ({ ...current, summary: event.target.value }))} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClassName()}>Deck / intro</span>
            <textarea className={`${inputClassName()} min-h-28`} value={editor.deck} onChange={(event) => setEditor((current) => ({ ...current, deck: event.target.value }))} />
          </label>
          <label>
            <span className={labelClassName()}>Hero image path or URL</span>
            <input className={inputClassName()} value={editor.heroImage.src} onChange={(event) => setEditor((current) => ({ ...current, heroImage: { ...current.heroImage, src: event.target.value } }))} />
          </label>
          <label>
            <span className={labelClassName()}>Hero alt text</span>
            <input className={inputClassName()} value={editor.heroImage.alt} onChange={(event) => setEditor((current) => ({ ...current, heroImage: { ...current.heroImage, alt: event.target.value } }))} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClassName()}>Takeaways, one per line</span>
            <textarea className={`${inputClassName()} min-h-28`} value={editor.takeaways.join("\n")} onChange={(event) => setEditor((current) => ({ ...current, takeaways: splitLines(event.target.value) }))} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClassName()}>Article sections</span>
            <div className="mb-3 rounded-xl border border-slate-800 bg-slate-950/45 p-3">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-300">Insert structured article formatting:</p>
                <p className="text-xs font-medium text-slate-500">Heading, image, bullets, quote, SEO template</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {sectionFormatOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => insertSectionsFormat(option.snippet)}
                    className={formatButtonClassName()}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid gap-2 rounded-lg bg-slate-900 p-3 text-xs leading-relaxed text-slate-400 sm:grid-cols-2">
                <span><strong className="text-amber-200">## Heading</strong> starts a new article section.</span>
                <span><strong className="text-amber-200">IMAGE / ALT / CAPTION</strong> attaches a section image.</span>
                <span><strong className="text-amber-200">- Bullet</strong> creates scannable buyer points.</span>
                <span><strong className="text-amber-200">QUOTE:</strong> creates a highlighted pull quote.</span>
              </div>
            </div>
            <textarea
              ref={sectionsTextareaRef}
              className={`${inputClassName()} min-h-[420px] font-mono text-xs leading-relaxed`}
              value={sectionsText}
              onChange={(event) => setSectionsText(event.target.value)}
            />
          </label>
          <label className="md:col-span-2">
            <span className={labelClassName()}>FAQs, one question/answer pair per block</span>
            <textarea
              className={`${inputClassName()} min-h-40`}
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
            <span className={labelClassName()}>CTA label</span>
            <input className={inputClassName()} value={editor.cta.label} onChange={(event) => setEditor((current) => ({ ...current, cta: { ...current.cta, label: event.target.value } }))} />
          </label>
          <label>
            <span className={labelClassName()}>CTA URL</span>
            <input className={inputClassName()} value={editor.cta.href} onChange={(event) => setEditor((current) => ({ ...current, cta: { ...current.cta, href: event.target.value } }))} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClassName()}>CTA note</span>
            <textarea className={`${inputClassName()} min-h-24`} value={editor.cta.note ?? ""} onChange={(event) => setEditor((current) => ({ ...current, cta: { ...current.cta, note: event.target.value } }))} />
          </label>
        </div>
      </section>
    </div>
  );
}
