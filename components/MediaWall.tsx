import Image from "next/image";
import { NewspaperIcon, ShieldIcon } from "@/components/Icons";
import { assetPath } from "@/lib/assetPath";

export default function MediaWall() {
  return (
    <section id="media" className="relative overflow-hidden bg-tz-surface py-14 sm:py-16">
      <Image
        src={assetPath("/pastel-toy-bg-2.webp")}
        alt="Pastel toy proof wall background"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,8,0.86)_0%,rgba(7,7,23,0.68)_45%,rgba(1,1,8,0.82)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(0,207,255,0.12),transparent_18%),radial-gradient(circle_at_84%_28%,rgba(255,121,198,0.12),transparent_20%),linear-gradient(180deg,rgba(1,1,8,0.10),rgba(1,1,8,0.48))] pointer-events-none" />
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-100 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #050518 0%, rgba(255,66,0,0.04) 50%, #050518 100%)" }} />

      <div className="wrap relative z-10">

        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-tz-border" />
              <span className="section-num">Media &amp; Proof Wall</span>
            </div>
            <h2 className="display-xl text-tz-text">
              Seen It?{" "}
              <span className="text-gradient-fire">Now Watch It.</span>
            </h2>
          </div>
          <p className="body-sm max-w-md lg:text-right">
            TV broadcast, national press, and viral social content buyers
            can review, share, and verify before buying.
          </p>
        </div>

        {/* Main 2-col layout */}
        <div className="grid items-stretch gap-4 xl:grid-cols-[1.12fr_0.88fr] mb-4">

          {/* Featured Facebook Reel */}
          <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-tz-orange/25 bg-tz-card
                              shadow-[0_0_60px_rgba(255,66,0,0.10)]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.06] bg-tz-bg px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-tz-orange animate-pulse" />
              <span className="eyebrow flex-1 text-tz-muted !text-[11px]">Facebook Reel · Featured Viral Clip</span>
              <span className="rounded-full text-[10px] font-black uppercase tracking-wider text-white px-3 py-1"
                style={{ background: "rgba(255,66,0,0.9)" }}>
                Featured
              </span>
            </div>

            <div className="flex-1 bg-black p-3 sm:p-4">
              <div className="mx-auto aspect-video h-full max-h-[430px] min-h-[260px] w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-xl">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2064629281014506%2F&show_text=0&width=900"
                  title="Toyzoona Importer featured Facebook reel"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="h-full w-full"
                  scrolling="no"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-white/[0.06] bg-tz-bg px-4 py-3
                            sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-tz-text">Featured Facebook Reel</p>
                <p className="mt-0.5 text-xs text-tz-dim">Viral social content with real product showcase</p>
              </div>
              <a
                href="https://www.facebook.com/reel/2064629281014506/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-tz-orange hover:underline whitespace-nowrap"
              >
                Open Reel ↗
              </a>
            </div>
          </article>

          {/* Philippine STAR Press */}
          <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-tz-amber/25 bg-tz-card
                              shadow-[0_0_60px_rgba(255,192,0,0.08)]">
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-tz-bg px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl text-lg
                              border border-tz-amber/20"
                style={{ background: "rgba(255,192,0,0.08)" }}>
                <NewspaperIcon className="h-5 w-5 text-tz-amber" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="eyebrow !text-tz-amber mb-0">Press Feature</p>
                <p className="truncate font-display text-sm font-bold text-tz-text">Philippine STAR</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
              <h3 className="mb-2 font-display text-lg font-bold text-tz-text">
                Highlighted by Philippine STAR
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-tz-muted">
                The press pickup adds a second trust anchor beside the national TV clip
                and Facebook reel — multiple public references for buyers to check.
              </p>
              <div className="flex min-h-[260px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white shadow-lg xl:min-h-0">
                <div className="h-full max-h-[430px] w-full overflow-hidden bg-white">
                  <iframe
                    src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPhilippineSTAR%2Fposts%2Fpfbid0vDA7WywnMQrir75SeeJAMSqHE7fmWNawG82k2HSZgN4VK6BnmXwREjtNrGGZLohUl&show_text=false&width=500"
                    title="Philippine STAR post about Toyzoona Importer"
                    width="500"
                    height="430"
                    style={{ border: "none", display: "block", height: "100%", maxWidth: "500px", overflow: "hidden", width: "100%", margin: "0 auto" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Secondary videos row */}
        <div className="grid gap-4 lg:grid-cols-3">

          {/* YouTube TV Feature */}
          <article className="overflow-hidden rounded-2xl border border-white/[0.07] bg-tz-card">
            <div className="aspect-video bg-black">
              <iframe
                src="https://www.youtube.com/embed/eAGbGMUIzhY?rel=0&modestbranding=1"
                title="Toyzoona Importer Gud Morning Kapatid TV feature"
                loading="lazy"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="h-full w-full"
              />
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-tz-bg px-4 py-3">
              <div>
                <p className="text-sm font-bold text-tz-text">Gud Morning Kapatid Feature</p>
                <p className="mt-0.5 text-xs text-tz-dim">Full TV segment · YouTube</p>
              </div>
              <a
                href="#reviews"
                className="text-xs font-semibold text-red-400 hover:underline whitespace-nowrap"
              >
                Reviews ↗
              </a>
            </div>
          </article>

          {/* Toyzoona Importer Official Highlight */}
          <article className="overflow-hidden rounded-2xl border border-white/[0.07] bg-tz-card">
            <div className="aspect-video bg-black">
              <iframe
                src="https://www.youtube.com/embed/xCed6-vE4Ko?rel=0&modestbranding=1"
                title="Toyzoona Importer official YouTube highlight"
                loading="lazy"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="h-full w-full"
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-tz-bg px-4 py-3">
              <div>
                <p className="text-sm font-bold text-tz-text">Toyzoona Importer Highlight</p>
                <p className="mt-0.5 text-xs text-tz-dim">Official YouTube feature</p>
              </div>
              <a
                href="https://www.youtube.com/@ToyzoonaImporter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-red-400 hover:underline whitespace-nowrap"
              >
                Channel ↗
              </a>
            </div>
          </article>

          {/* Official Facebook Video */}
          <article className="overflow-hidden rounded-2xl border border-white/[0.07] bg-tz-card">
            <div className="aspect-video bg-black">
              <iframe
                src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FToyzoonaLaguna%2Fvideos%2F7153440271404393%2F&show_text=0&width=720"
                title="Toyzoona Laguna official Facebook video"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="h-full w-full"
                scrolling="no"
              />
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-tz-bg px-4 py-3">
              <div>
                <p className="text-sm font-bold text-tz-text">Toyzoona Laguna Official</p>
                <p className="mt-0.5 text-xs text-tz-dim">Official Facebook video content</p>
              </div>
              <a
                href="https://www.facebook.com/ToyzoonaLaguna/videos/7153440271404393/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-tz-cyan hover:underline whitespace-nowrap"
              >
                Facebook ↗
              </a>
            </div>
          </article>
        </div>

        {/* Trust footer */}
        <div className="flex items-center justify-center gap-2 pt-5">
          <ShieldIcon className="h-5 w-5 text-tz-dim" />
          <p className="text-xs text-tz-dim">
            All TV, social, and press placements shown here are public references buyers can independently review and verify.
          </p>
        </div>

      </div>
    </section>
  );
}
