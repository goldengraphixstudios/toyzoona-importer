import Image from "next/image";
import { AuctionHammerIcon, ClockIcon, LiveIcon, PhoneIcon, UsersIcon, WarehouseIcon } from "@/components/Icons";
import { assetPath } from "@/lib/assetPath";
import AuctionCountdown from "@/components/AuctionCountdown";
import { FACEBOOK_GROUP_URL, FACEBOOK_PAGE_URL } from "@/lib/socialLinks";

const steps = [
  {
    num: "01",
    Icon: AuctionHammerIcon,
    title: "Saturday Auction",
    body: "Every Saturday at 10:00 AM Philippine time. Warehouse opens and the bidding begins. Best for scoring mixed lots at the lowest per-kilo prices. Join the Facebook group for auction schedules.",
    cta: "Join Group for Schedule",
    href: FACEBOOK_GROUP_URL,
    accent: "#FF4200",
    bgAccent: "rgba(255,66,0,0.08)",
    border: "border-tz-orange/20",
    topBorder: "#FF4200",
    chip: "Best Price",
    chipStyle: "pill",
  },
  {
    num: "02",
    Icon: LiveIcon,
    title: "Live Selling",
    body: "Mon–Sat, 9 AM – 6:30 PM. Watch on Facebook or TikTok, pick your toys, and order in real time from anywhere in the Philippines. Live demos, real stock.",
    cta: "Watch Live on Facebook",
    href: FACEBOOK_PAGE_URL,
    accent: "#FFC000",
    bgAccent: "rgba(255,192,0,0.07)",
    border: "border-tz-amber/20",
    topBorder: "#FFC000",
    chip: "Nationwide",
    chipStyle: "pill-amber",
  },
  {
    num: "03",
    Icon: WarehouseIcon,
    title: "Walk-In Warehouse",
    body: "Browse the floor in person at Cabuyao, Laguna. Pick exactly what you want, pay after weighing your haul on-site. See the full inventory first-hand.",
    cta: "Get Directions",
    href: "https://maps.google.com/?q=Gatcahalian+Subdivision,+Brgy.+Banay+2,+Cabuyao,+Laguna",
    accent: "#9D4EDD",
    bgAccent: "rgba(157,78,221,0.07)",
    border: "border-tz-purple/20",
    topBorder: "#9D4EDD",
    chip: "Hands-On",
    chipStyle: "pill-purple",
  },
  {
    num: "04",
    Icon: UsersIcon,
    title: "Facebook Group",
    body: "Join the official buyers' community for early auction previews, exclusive deals, live selling links, and direct order access. 8,000+ active members.",
    cta: "Join the Group",
    href: FACEBOOK_GROUP_URL,
    accent: "#00CFFF",
    bgAccent: "rgba(0,207,255,0.06)",
    border: "border-tz-cyan/20",
    topBorder: "#00CFFF",
    chip: "Community",
    chipStyle: "pill-glass",
  },
];

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="section bg-tz-surface relative overflow-hidden">
      <Image
        src={assetPath("/pastel-toy-bg-2.webp")}
        alt="Pastel toy buying background"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,8,0.82)_0%,rgba(7,7,23,0.64)_46%,rgba(1,1,8,0.78)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(255,239,63,0.12),transparent_18%),radial-gradient(circle_at_82%_28%,rgba(0,207,255,0.12),transparent_18%),linear-gradient(180deg,rgba(1,1,8,0.10),rgba(1,1,8,0.42))] pointer-events-none" />
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-100 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]
                      rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,66,0,0.04) 0%, transparent 70%)" }} />

      <div className="wrap relative z-10">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-tz-border" />
            <span className="section-num">How to buy</span>
            <div className="h-px w-10 bg-tz-border" />
          </div>
          <h2 className="display-xl text-tz-text mb-5">
            4 Ways to Buy from{" "}
            <span className="text-gradient-orange">Toyzoona</span>
          </h2>
          <p className="body-md max-w-xl mx-auto">
            Whether you&apos;re a first-time buyer or a seasoned reseller,
            there&apos;s a path built exactly for you.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mb-6">
          <AuctionCountdown />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`group relative bg-tz-card border ${s.border} rounded-2xl p-7
                          hover:border-white/[0.14] hover:-translate-y-2
                          transition-all duration-350 overflow-hidden flex flex-col`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Giant number watermark */}
              <div className="absolute -right-2 -top-3 font-display font-black text-[90px]
                              leading-none text-white/[0.025] select-none pointer-events-none">
                {s.num}
              </div>

              {/* Top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100
                              transition-opacity duration-350"
                style={{ background: `linear-gradient(90deg, ${s.topBorder}, transparent)` }} />

              {/* Step number chip */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-tz-dim">
                  Step {s.num}
                </span>
                <span className={s.chipStyle}>{s.chip}</span>
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]" style={{ color: s.accent }}>
                <s.Icon className="h-6 w-6" />
              </div>

              <h3 className="font-display font-bold text-tz-text text-lg mb-3 relative z-10 leading-snug">
                {s.title}
              </h3>
              <p className="text-tz-muted text-sm leading-relaxed flex-1 relative z-10">{s.body}</p>

              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide
                           relative z-10 transition-colors duration-200 hover:underline"
                style={{ color: s.accent }}
              >
                {s.cta}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Hours info strip */}
        <div className="bg-tz-card border border-white/[0.07] rounded-2xl px-5 sm:px-8 py-5
                        flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Clock icon */}
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl
                          border border-tz-orange/20"
            style={{ background: "rgba(255,66,0,0.08)" }}>
            <ClockIcon className="h-5 w-5 text-tz-orange" />
          </div>
          <div className="text-sm text-tz-muted leading-relaxed">
            <strong className="text-tz-text font-semibold">Operating Hours:</strong>{" "}
            Monday – Saturday &nbsp;·&nbsp; 9:00 AM – 6:30 PM &nbsp;·&nbsp;
            <strong className="text-tz-orange font-semibold">Saturday Auction</strong>{" "}
            starts ~10:00 AM &nbsp;·&nbsp; Closed Sundays
          </div>
          <div className="flex w-full flex-col gap-2 sm:ml-auto sm:w-auto sm:flex-row">
            <a
              href="https://wa.me/639293781462"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !justify-center !py-2.5 !px-5 !text-xs"
            >
              <PhoneIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="viber://chat?number=%2B639293781462"
              className="btn-outline !justify-center !py-2.5 !px-5 !text-xs"
            >
              <PhoneIcon className="h-4 w-4" />
              Viber
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
