import Link from "next/link";
import type { BlogPost } from "@/lib/blogPosts";
import { assetPath } from "@/lib/assetPath";
import { pic } from "@/lib/pic";
import Fx from "./Fx";
import { MSG, Spark, ext } from "./ChromeV5";

// Blog in the v5 look: cream page, navy Baloo headings, white rounded cards, yellow buttons.
// Used by the built-in posts (app/blog) and the dashboard posts (SupabaseBlog*).

export const blogImage = (src: string) => (src.startsWith("/") ? assetPath(src) : src);
/** Local photos get responsive variants; CMS/remote URLs pass through. */
const blogPic = (src: string, sizes: string) => (src.startsWith("/") ? pic(src, sizes) : { src });
const SZ_CARD = "(max-width: 900px) 92vw, 400px";
const SZ_FEAT = "(max-width: 900px) 92vw, 760px";
const SZ_HERO = "(max-width: 900px) 100vw, 960px";
export const postHref = (slug: string) => `/blog/post?slug=${slug}`;
const isExt = (href: string) => href.startsWith("http");

/** Cream intro band with the sparkle heading. */
export function BlogIntro({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="bl-intro">
      <Fx
        rays={[{ x: "50%", y: "-20%", size: "2200px", o: 0.4 }]}
        glows={[{ x: "50%", y: "0%", size: "900px", c: "rgba(255,255,255,.9)" }, { x: "6%", y: "70%", size: "520px", c: "rgba(211,233,252,.7)" }, { x: "95%", y: "40%", size: "520px", c: "rgba(255,241,184,.8)" }]}
        glints={[{ x: "12%", y: "20%", size: 16, c: "#FFC94A" }, { x: "88%", y: "16%", size: 14, c: "#8EC2FF" }]}
      />
      <div className="wr">
        <div className="shead">
          <div className="row">
            <Spark />
            <h1>{title}</h1>
            <Spark r />
          </div>
          <p>{sub}</p>
        </div>
      </div>
    </section>
  );
}

export function PostCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link href={postHref(post.slug)} className={`bl-card${featured ? " big" : ""}`}>
      <span className="bl-img">
        <img {...blogPic(post.heroImage.src, featured ? SZ_FEAT : SZ_CARD)} alt={post.heroImage.alt} loading={featured ? "eager" : "lazy"} decoding="async" />
      </span>
      <span className="bl-body">
        <span className="bl-meta">
          <span className="bl-cat">{post.category}</span>
          <span>{post.readTime}</span>
        </span>
        <span className="bl-t">{post.title}</span>
        <span className="bl-d">{post.description}</span>
        <span className="tlink">Read the guide ›</span>
      </span>
    </Link>
  );
}

/** One article. Works for built-in posts and dashboard posts. */
export function ArticleV5({ post }: { post: BlogPost }) {
  return (
    <article className="bl-art">
      <header className="bl-ahead">
        <Fx
          rays={[{ x: "50%", y: "-20%", size: "2200px", o: 0.35 }]}
          glows={[{ x: "50%", y: "0%", size: "900px", c: "rgba(255,255,255,.9)" }, { x: "92%", y: "50%", size: "520px", c: "rgba(255,241,184,.8)" }]}
        />
        <div className="wr bl-narrow">
          <Link href="/blog" className="bl-back">‹ All articles</Link>
          <div className="bl-meta">
            <span className="bl-cat">{post.category}</span>
            <span>{post.readTime}</span>
            <time dateTime={post.updatedAt}>Updated {post.updatedAt}</time>
          </div>
          <h1>{post.title}</h1>
          {post.deck ? <p className="bl-deck">{post.deck}</p> : null}
        </div>
        {post.heroImage?.src ? (
          <figure className="wr bl-hero">
            <img {...blogPic(post.heroImage.src, SZ_HERO)} alt={post.heroImage.alt} decoding="async" fetchPriority="high" />
            {post.heroImage.caption ? <figcaption>{post.heroImage.caption}</figcaption> : null}
          </figure>
        ) : null}
      </header>

      <div className="wr bl-grid">
        <div className="bl-main">
          {post.summary ? (
            <section className="bl-answer">
              <p className="bl-lbl">The short answer</p>
              <p>{post.summary}</p>
            </section>
          ) : null}

          {post.sections.map((section, i) => (
            <section key={`${section.heading}-${i}`} id={`section-${i + 1}`} className="bl-sec">
              <h2><span className="bl-n">{i + 1}</span>{section.heading}</h2>
              {section.image?.src ? (
                <figure className="bl-fig">
                  <img {...blogPic(section.image.src, SZ_HERO)} alt={section.image.alt} loading="lazy" decoding="async" />
                  {section.image.caption ? <figcaption>{section.image.caption}</figcaption> : null}
                </figure>
              ) : null}
              {section.body.map((p, j) => <p key={j} dangerouslySetInnerHTML={{ __html: p }} />)}
              {section.bullets?.length ? (
                <ul>{section.bullets.map((b, j) => <li key={j} dangerouslySetInnerHTML={{ __html: b }} />)}</ul>
              ) : null}
              {section.quote ? <blockquote dangerouslySetInnerHTML={{ __html: section.quote }} /> : null}
            </section>
          ))}

          <section className="bl-cta">
            <Fx glints={[{ x: "88%", y: "18%", size: 14, c: "#FFE27A" }, { x: "8%", y: "80%", size: 10 }]} />
            <h2>Ready to check today&apos;s toy stock?</h2>
            {post.cta?.note ? <p>{post.cta.note}</p> : <p>Message us and we&apos;ll send what&apos;s on the shelves today.</p>}
            <a className="btn btn-y" href={post.cta?.href || MSG} {...(isExt(post.cta?.href || MSG) ? ext : {})}>
              {post.cta?.label || "Message Us"}
            </a>
          </section>

          {post.faqs?.length ? (
            <section className="bl-faq">
              <h2>Questions buyers ask</h2>
              <div className="bl-accs">
                {post.faqs.map((f) => (
                  <details className="acc" key={f.question}>
                    <summary>{f.question}<span className="pm" /></summary>
                    <div className="ans">{f.answer}</div>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="bl-side">
          <div className="bl-box">
            <p className="bl-lbl">In this article</p>
            <nav>
              {post.sections.map((s, i) => <a key={`${s.heading}-${i}`} href={`#section-${i + 1}`}>{s.heading}</a>)}
            </nav>
          </div>
          {post.takeaways?.length ? (
            <div className="bl-box tk">
              <p className="bl-lbl">Key takeaways</p>
              <ul>{post.takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}

/** Loading or not-found state for dashboard posts. */
export function ArticleStatus({ status }: { status: string }) {
  return (
    <section className="bl-ahead bl-empty">
      <div className="wr bl-narrow">
        <Link href="/blog" className="bl-back">‹ All articles</Link>
        <h1>Toyzoona article</h1>
        <p className="bl-deck">{status}</p>
      </div>
    </section>
  );
}
