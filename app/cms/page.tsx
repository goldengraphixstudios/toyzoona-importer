import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCmsPanel from "@/components/BlogCmsPanel";
import { assetPath } from "@/lib/assetPath";

export const metadata: Metadata = {
  title: "Toyzoona Static Blog CMS",
  description: "Static browser-based CMS for preparing Toyzoona blog posts.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CmsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-tz-bg text-tz-text">
      <Navbar />
      <section className="relative overflow-hidden pt-32 pb-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-18"
          style={{ backgroundImage: `url(${assetPath("/pastel-toy-bg-2.webp")})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,16,0.86),rgba(2,2,16,0.96))]" />

        <div className="wrap relative z-10">
          <Link
            href="/blog"
            className="mb-5 inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffef3f] transition-colors hover:bg-white/[0.1]"
          >
            View blog
          </Link>
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full bg-[#ff4200] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
              Static CMS
            </p>
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.86] tracking-[-0.06em]">
              Build blog posts without digging through code.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-tz-muted sm:text-lg">
              Add SEO, GEO, and AEO-ready article drafts, then copy or download the merged
              JSON for publishing into the static site.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap pb-16">
        <BlogCmsPanel />
      </section>

      <Footer />
    </main>
  );
}
