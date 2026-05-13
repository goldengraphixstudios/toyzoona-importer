import Image from "next/image";
import { LiveIcon, SparkleIcon, TvIcon } from "@/components/Icons";
import { assetPath } from "@/lib/assetPath";

const tvImages = [
  { src: "/tv-2.jpg", alt: "Toyzoona on Gud Morning Kapatid" },
  { src: "/tv-3.jpg", alt: "TV feature segment" },
  { src: "/tv-4.jpg", alt: "National TV appearance" },
  { src: "/tv-5.jpg", alt: "On-air product display" },
];

const trustMarkers = [
  { Icon: TvIcon, label: "Gud Morning Kapatid", sub: "National TV Feature" },
  { Icon: LiveIcon, label: "Viral Facebook Reel", sub: "Social Media Proof" },
  { Icon: SparkleIcon, label: "Buyer Reviews", sub: "Community Trust" },
];

export default function TVSpotlight() {
  return (
    <section id="tv-feature" className="section bg-tz-bg relative overflow-hidden">
      <Image
        src={assetPath("/pastel-toy-bg-3.webp")}
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
        <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-10 items-center">

          {/* LEFT — Headline + copy + CTA */}
          <div>
            <h2 className="display-xl text-tz-text mb-6">
              We Made It to<br />
              <span className="text-gradient-amber">National TV.</span>
            </h2>

            <p className="body-md mb-6 max-w-xl">
              Toyzoona Importer was featured on{" "}
              <strong className="text-tz-text font-semibold">Gud Morning Kapatid</strong> —
              one of the Philippines&apos; most-watched morning programs. That broadcast exposure
              gives buyers a public place to verify the brand before messaging the official
              Facebook page.
            </p>

            {/* Quote block */}
            <div className="relative pl-6 mb-8 py-2">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                style={{ background: "linear-gradient(180deg, #FFC000, rgba(255,192,0,0.2))" }} />
              <p className="text-tz-muted italic leading-relaxed">
                &ldquo;A public brand moment buyers can watch, share, and verify before
                messaging the official Facebook page or placing a bulk order.&rdquo;
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
              href="#reviews"
              className="btn-amber mb-12 inline-flex"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Read Toyzoona Buyer Reviews
            </a>
          </div>

          {/* RIGHT — TV photo grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {tvImages.map((img, index) => (
              <div
                key={img.src}
                className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-tz-card shadow-[0_18px_50px_rgba(0,0,0,0.24)] group ${
                  index % 2 === 0 ? "h-44 sm:h-56 lg:h-72" : "h-52 sm:h-64 lg:h-80"
                }`}
              >
                <Image
                  src={assetPath(img.src)}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(2,2,16,0.62) 0%, transparent 60%)" }}
                />
                <div className="absolute inset-0 bg-tz-amber/0 transition-colors duration-400 group-hover:bg-tz-amber/8" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
