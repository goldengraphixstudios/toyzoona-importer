import Image from "next/image";
import { LiveIcon, NewspaperIcon, SparkleIcon, TvIcon } from "@/components/Icons";

const tvImages = [
  { src: "/tv-2.jpg", alt: "Toyzoona on Gud Morning Kapatid" },
  { src: "/tv-3.jpg", alt: "TV feature segment" },
  { src: "/tv-4.jpg", alt: "National TV appearance" },
  { src: "/tv-5.jpg", alt: "On-air product display" },
];

const trustMarkers = [
  { Icon: TvIcon, label: "Gud Morning Kapatid", sub: "National TV Feature" },
  { Icon: NewspaperIcon, label: "Philippine STAR", sub: "Press Coverage" },
  { Icon: LiveIcon, label: "Viral Facebook Reel", sub: "Social Media Proof" },
];

export default function TVSpotlight() {
  return (
    <section id="tv-feature" className="section bg-tz-bg relative overflow-hidden">
      <Image
        src="/pastel-toy-bg-3.webp"
        alt="Pastel toy media background"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,8,0.84)_0%,rgba(7,7,23,0.66)_48%,rgba(1,1,8,0.80)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,66,0,0.12),transparent_18%),radial-gradient(circle_at_84%_30%,rgba(255,239,63,0.12),transparent_20%),linear-gradient(180deg,rgba(1,1,8,0.08),rgba(1,1,8,0.46))] pointer-events-none" />
      {/* Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,192,0,0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,66,0,0.04) 0%, transparent 70%)" }} />

      <div className="wrap relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-14">
          <div className="h-px w-10 bg-tz-border" />
          <span className="section-num">National Television & Press</span>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* LEFT — Headline + copy + CTA + photo grid */}
          <div>
            <h2 className="display-xl text-tz-text mb-6">
              We Made It to<br />
              <span className="text-gradient-amber">National TV.</span>
            </h2>

            <p className="body-md mb-6 max-w-xl">
              Toyzoona Importer was featured on{" "}
              <strong className="text-tz-text font-semibold">Gud Morning Kapatid</strong> —
              one of the Philippines&apos; most-watched morning programs. That broadcast exposure,
              combined with the viral reel and Philippine STAR press pickup, gives buyers
              multiple public places to verify the brand.
            </p>

            {/* Quote block */}
            <div className="relative pl-6 mb-8 py-2">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                style={{ background: "linear-gradient(180deg, #FFC000, rgba(255,192,0,0.2))" }} />
              <p className="text-tz-muted italic leading-relaxed">
                &ldquo;A public brand moment buyers can watch, share, and verify before
                joining the group or placing a bulk order.&rdquo;
              </p>
            </div>

            {/* Trust markers */}
            <div className="flex flex-wrap gap-3 mb-8">
              {trustMarkers.map(({ Icon, label, sub }) => (
                <div key={label}
                  className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08]
                             rounded-xl px-4 py-2.5">
                  <Icon className="h-5 w-5 text-tz-amber" />
                  <div>
                    <div className="text-xs font-bold text-tz-text">{label}</div>
                    <div className="text-[11px] text-tz-dim">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://www.youtube.com/watch?v=eAGbGMUIzhY"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber mb-12 inline-flex"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch Full TV Feature on YouTube
            </a>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-3">
              {tvImages.map((img) => (
                <div key={img.src} className="relative h-32 rounded-xl overflow-hidden group
                                              border border-white/[0.06]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(2,2,16,0.6) 0%, transparent 60%)" }} />
                  <div className="absolute inset-0 bg-tz-amber/0 group-hover:bg-tz-amber/8
                                  transition-colors duration-400" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Philippine STAR press card */}
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl
                              border border-tz-amber/20"
                style={{ background: "rgba(255,192,0,0.08)" }}>
                <NewspaperIcon className="h-5 w-5 text-tz-amber" />
              </div>
              <div>
                <div className="eyebrow !text-tz-amber mb-0.5">Press Coverage</div>
                <div className="font-display font-bold text-tz-text text-sm">Philippine STAR</div>
              </div>
              <span className="ml-auto pill-amber text-[10px]">Press</span>
            </div>

            {/* Press card */}
            <div className="bg-tz-card border border-tz-amber/20 rounded-2xl overflow-hidden
                            shadow-[0_0_60px_rgba(255,192,0,0.08)]">
              {/* Card chrome header */}
              <div className="px-5 py-3.5 bg-tz-bg border-b border-white/[0.06] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tz-amber animate-pulse" />
                <span className="text-xs text-tz-muted font-mono">facebook.com/PhilippineSTAR</span>
              </div>

              <div className="px-6 pt-5 pb-4">
                <h3 className="font-display font-bold text-tz-text text-xl mb-2">
                  Highlighted in Philippine STAR
                </h3>
                <p className="text-tz-muted text-sm leading-relaxed">
                  Beyond TV, Toyzoona&apos;s story landed in one of the country&apos;s biggest
                  publications — giving buyers another public reference point across broadcast,
                  social, and national press.
                </p>
              </div>

              <div className="px-5 pb-5">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-white shadow-lg">
                  <iframe
                    src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPhilippineSTAR%2Fposts%2Fpfbid0vDA7WywnMQrir75SeeJAMSqHE7fmWNawG82k2HSZgN4VK6BnmXwREjtNrGGZLohUl&show_text=false&width=500"
                    title="Philippine STAR post about Toyzoona Importer"
                    width="500"
                    height="498"
                    style={{ border: "none", overflow: "hidden", width: "100%", maxWidth: "500px", display: "block" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              </div>

              <div className="px-6 py-3.5 bg-tz-bg border-t border-white/[0.06] flex items-center justify-between">
                <p className="text-xs text-tz-dim">A stronger trust anchor beyond social content</p>
                <a
                  href="https://www.facebook.com/PhilippineSTAR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-tz-amber hover:underline font-semibold"
                >
                  Philippine STAR ↗
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
