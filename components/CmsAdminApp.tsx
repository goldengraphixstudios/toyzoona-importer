"use client";

import { useEffect, useMemo, useState } from "react";
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
  return "w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/28 focus:border-[#ffef3f]/70";
}

function labelClassName() {
  return "mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-white/54";
}

export default function CmsAdminApp() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<CmsPostRow[]>([]);
  const [editor, setEditor] = useState<EditorState>(() => emptyEditor());
  const [sectionsText, setSectionsText] = useState(serializeSections(emptyEditor().sections));
  const [status, setStatus] = useState("Checking CMS connection...");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setStatus("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
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
      setStatus("Loading CMS access...");
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
        setStatus("Logged in, but this user is not an approved CMS admin/editor yet.");
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
    setStatus("CMS loaded.");
  }

  async function handleAuth() {
    if (!supabase) {
      return;
    }

    setBusy(true);
    const result =
      authMode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setBusy(false);
    if (result.error) {
      setStatus(result.error.message);
      return;
    }

    setStatus(authMode === "login" ? "Logged in." : "Account created. Add this user to cms_profiles to grant CMS access.");
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
    if (!supabase || !id || !window.confirm("Delete this post from Supabase?")) {
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

  async function createFirstAdminProfile() {
    if (!supabase || !session?.user) {
      return;
    }

    setBusy(true);
    const { error } = await supabase.from("cms_profiles").insert({
      id: session.user.id,
      role: "admin",
      display_name: session.user.email ?? "Toyzoona Admin",
    });
    setBusy(false);

    if (error) {
      setStatus(`Admin bootstrap failed: ${error.message}`);
      return;
    }

    setProfile({
      id: session.user.id,
      role: "admin",
      display_name: session.user.email ?? "Toyzoona Admin",
    });
    setStatus("First admin profile created.");
    await fetchPosts();
  }

  function loadStaticPost(post: BlogPost) {
    setEditor({ ...post, status: "draft" });
    setSectionsText(serializeSections(post.sections));
    setStatus("Loaded static article as a new Supabase draft.");
  }

  if (!isSupabaseConfigured() || !supabase) {
    return (
      <div className="rounded-[1.6rem] border border-[#ffef3f]/30 bg-[#ffef3f]/10 p-6 text-white">
        <h2 className="font-display text-3xl font-black">Supabase is not connected yet.</h2>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-white/72">
          Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project, then redeploy.
          Use `supabase/schema.sql` to create the CMS tables and access policies.
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-xl rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.26)]">
        <p className="mb-3 inline-flex rounded-full bg-[#ff4200] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white">
          Secured Supabase CMS
        </p>
        <h2 className="font-display text-4xl font-black leading-none text-white">{authMode === "login" ? "Login to manage content." : "Create a CMS user."}</h2>
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
            className="rounded-2xl border-2 border-white bg-[#ff4200] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_8px_0_#9b2200] disabled:opacity-50"
          >
            {busy ? "Please wait..." : authMode === "login" ? "Login" : "Create account"}
          </button>
          <button
            onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
            className="text-sm font-bold text-[#ffef3f] hover:underline"
          >
            {authMode === "login" ? "Need an account? Sign up" : "Already have access? Login"}
          </button>
          <p className="text-xs font-semibold leading-relaxed text-white/52">{status}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-6 text-white">
        <h2 className="font-display text-3xl font-black">CMS access pending.</h2>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-white/68">
          You are logged in as `{session.user.email}`, but this user is not listed in `cms_profiles`.
          If this is the first CMS account, create the first admin profile below.
        </p>
        <p className="mt-4 rounded-2xl bg-black/30 p-3 font-mono text-xs text-[#ffef3f]">{session.user.id}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={createFirstAdminProfile}
            disabled={busy}
            className="rounded-xl bg-[#ffef3f] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#4b1b00] disabled:opacity-50"
          >
            Create first admin profile
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-xl border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/70"
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
        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.055] p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ffef3f]">Logged in</p>
          <p className="mt-2 break-all text-sm font-bold text-white">{session.user.email}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/42">{profile.role}</p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-4 rounded-xl border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/70"
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
          className="w-full rounded-2xl border-2 border-white bg-[#ff4200] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_8px_0_#9b2200]"
        >
          New post
        </button>

        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/46">Supabase posts</p>
          <div className="space-y-2">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => {
                  setEditor(rowToEditor(post));
                  setSectionsText(serializeSections(post.sections));
                }}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-left transition-colors hover:border-[#ffef3f]/40"
              >
                <span className="block text-sm font-black leading-tight text-white">{post.title}</span>
                <span className="mt-1 block text-[10px] font-black uppercase tracking-wider text-white/42">{post.status}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/46">Import old static posts</p>
          <div className="space-y-2">
            {staticPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => loadStaticPost(post)}
                className="w-full rounded-xl border border-white/10 px-3 py-2 text-left text-xs font-bold text-white/68 hover:border-[#ffef3f]/40"
              >
                {post.title}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-7">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ffef3f]">Editor</p>
            <h2 className="mt-2 font-display text-3xl font-black leading-none text-white">Article CMS</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => savePost("draft")} disabled={busy} className="rounded-xl border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/74 disabled:opacity-50">
              Save draft
            </button>
            <button onClick={() => savePost("published")} disabled={busy} className="rounded-xl bg-[#ffef3f] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#4b1b00] disabled:opacity-50">
              Publish
            </button>
            {editor.id ? (
              <button onClick={() => deletePost(editor.id)} disabled={busy} className="rounded-xl border border-red-400/40 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-red-200 disabled:opacity-50">
                Delete
              </button>
            ) : null}
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs font-semibold text-white/62">{status}</div>

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
            <textarea className={`${inputClassName()} min-h-[420px] font-mono text-xs leading-relaxed`} value={sectionsText} onChange={(event) => setSectionsText(event.target.value)} />
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
