import Image from "next/image";
import { BoxIcon, MedalIcon, ScaleIcon, TrophyIcon, TvIcon, UsersIcon } from "@/components/Icons";
import { assetPath } from "@/lib/assetPath";

const reasons = [
  {
    Icon: TvIcon,
    num: "01",
    title: "As Seen on National TV",
    body: "Featured on Gud Morning Kapatid — one of the Philippines' biggest morning programs. Real broadcast exposure buyers can watch, share, and verify before ordering.",
    accent: "#FFC000",
    border: "border-tz-amber/20",
    glow: "shadow-[0_0_50px_rgba(255,192,0,0.08)]",
    tag: "Top Credibility",
    tagClass: "pill-amber",
    featured: true,
  },
  {
    Icon: TrophyIcon,
    num: "02",
    title: "First in the South",
    body: "Toyzoona pioneered the toys-per-kilo model in Southern Luzon. That head start built years of trust, repeat buyers, and reseller loyalty no one else can replicate.",
    accent: "#FF4200",
    border: "border-tz-orange/15",
    glow: "",
    tag: "",
    tagClass: "",
    featured: false,
  },
  {
    Icon: ScaleIcon,
    num: "03",
    title: "Per-Kilo Savings",
    body: "Buy by weight, not by piece. More variety, lower cost per toy, significantly better margins for resellers — a buying model built for serious volume.",
    accent: "#9D4EDD",
    border: "border-tz-purple/15",
    glow: "",
    tag: "",
    tagClass: "",
    featured: false,
  },
  {
    Icon: MedalIcon,
    num: "04",
    title: "Proven Event Scale",
    body: "From Dasma Arena to Filinvest Tent and Metrotent Pasig — real crowds, real tables, real sell-through at the country's biggest toy fairs.",
    accent: "#FFC000",
    border: "border-tz-amber/15",
    glow: "",
    tag: "",
    tagClass: "",
    featured: false,
  },
  {
    Icon: BoxIcon,
    num: "05",
    title: "Fresh Weekly Arrivals",
    body: "UK preloved toy hauls and China brand-new per-kilo stock arrive regularly. Every Saturday auction features fresh mixed lots for buyers who show up early.",
    accent: "#FF4200",
    border: "border-tz-orange/15",
    glow: "",
    tag: "",
    tagClass: "",
    featured: false,
  },
  {
    Icon: UsersIcon,
    num: "06",
    title: "Built for Resellers",
    body: "Live sellers, bulk buyers, and toy entrepreneurs have sourced from Toyzoona since day one. The per-kilo model was engineered for their margin and volume needs.",
    accent: "#00CFFF",
    border: "border-tz-cyan/15",
    glow: "",
    tag: "",
    tagClass: "",
    featured: false,
  },
];

export default function WhyToyzoona() {
  const [featured, ...rest] = reasons;

  return (
    <section id="why-toyzoona" className="relative overflow-hidden bg-tz-surface py-16 sm:py-20">
      <Image
        src={assetPath("/easter-toy-playground-bg.webp")}
        alt="Playful Easter toy scene background"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,8,0.66)_0%,rgba(7,7,23,0.44)_42%,rgba(1,1,8,0.58)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(255,239,63,0.22),transparent_18%),radial-gradient(circle_at_82%_25%,rgba(255,121,198,0.21),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(1,1,8,0.30))] pointer-events-none" />

      <div className="wrap relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-tz-border" />
              <span className="section-num !text-white/65">Why buyers choose us</span>
            </div>
            <h2 className="font-display text-4xl font-black leading-[0.92] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Not Just Another<br />
              <span className="text-[#ffef3f] drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)]">Toy Shop.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-semibold leading-relaxed text-white/72 sm:text-right">
            TV-featured, toyfair-proven, and trusted by
            thousands of buyers across the Philippines.
          </p>
        </div>

        {/* Featured card */}
        <div className={`relative rounded-[1.75rem] overflow-hidden bg-[#080819]/70 backdrop-blur-md ${featured.border} border mb-4 ${featured.glow}`}>
          {/* Large number watermark */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 font-display font-black text-[160px]
                          leading-none text-tz-amber/[0.05] select-none pointer-events-none">
            01
          </div>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, #FFC000, rgba(255,192,0,0.3), transparent)" }} />
          {/* Dots */}
          <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

          <div className="relative z-10 grid gap-5 p-6 sm:grid-cols-[auto_1fr] sm:p-7 lg:p-8 items-start">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                            border border-tz-amber/20"
              style={{ background: "rgba(255,192,0,0.08)" }}>
              <featured.Icon className="h-7 w-7 text-tz-amber" />
            </div>
            <div>
              <div className="pill-amber mb-3">{featured.tag}</div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-tz-text mb-3 leading-tight">
                As Seen on National TV<br className="hidden sm:block" />
                Gud Morning Kapatid
              </h3>
              <p className="text-white/68 text-sm sm:text-base leading-relaxed max-w-3xl mb-5">
                {featured.body} The TV guesting, the viral reel, and the Philippine STAR
                press pickup give buyers multiple public references to verify before joining
                the official Facebook page or placing a bulk order.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/watch?v=eAGbGMUIzhY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-amber !text-xs !py-2.5 !px-5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Watch TV Feature
                </a>
                <a href="#media" className="btn-ghost !text-tz-amber/80 hover:!text-tz-amber">
                  See All Media Coverage
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {rest.map(({ Icon, num, title, body, accent, border }) => (
            <div
              key={num}
              className={`group relative bg-[#080819]/66 backdrop-blur-md border ${border} rounded-2xl p-5
                          hover:border-white/[0.18] hover:-translate-y-1.5
                          hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                          transition-all duration-350 overflow-hidden`}
            >
              {/* Number watermark */}
              <div className="absolute right-4 top-2 font-display font-black text-7xl leading-none
                              text-white/[0.035] select-none pointer-events-none">
                {num}
              </div>
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100
                              transition-opacity duration-350"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

              {/* Icon */}
              <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]" style={{ color: accent }}>
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="font-display font-bold text-tz-text text-lg mb-2 relative z-10 leading-snug">
                {title}
              </h3>
              <p className="text-white/58 text-xs leading-relaxed relative z-10">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
