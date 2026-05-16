import type { Metadata } from "next";
import CmsAdminApp from "@/components/CmsAdminApp";

export const metadata: Metadata = {
  title: "Toyzoona CMS",
  description: "Isolated Supabase-authenticated CMS for Toyzoona blog posts.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CmsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07111f] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,66,0,0.24),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(0,207,255,0.18),transparent_24%),linear-gradient(135deg,#07111f_0%,#111827_58%,#180b22_100%)] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full border border-[#ffef3f]/30 bg-[#ffef3f]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ffef3f]">
              Isolated Supabase CMS
            </p>
            <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-black leading-[0.86] tracking-[-0.06em]">
              Toyzoona content control room.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/62 sm:text-lg">
              Login, create drafts, publish database-backed articles, manage SEO fields, and keep the public website separate from the admin workspace.
            </p>
          </div>
          <div className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs font-bold text-white/58 backdrop-blur-sm sm:min-w-72">
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/34">Connected service</span>
            <span className="break-all text-[#ffef3f]">iwikfahiyehlsygpuqjf.supabase.co</span>
            <span>Auth + Postgres CMS</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">
        <CmsAdminApp />
      </section>
    </main>
  );
}
