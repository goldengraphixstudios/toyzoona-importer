import Image from "next/image";
import { AuctionHammerIcon, ClockIcon, GlobeIcon, MapPinIcon, MailIcon, PhoneIcon, ScaleIcon, TrophyIcon, TruckIcon, TvIcon } from "@/components/Icons";
import { assetPath } from "@/lib/assetPath";
import { FACEBOOK_PAGE_URL } from "@/lib/socialLinks";

const WAZE_LOCATION_URL = "https://waze.com/ul/hwdw1h6ezp";
const WAZE_EMBED_URL = "https://embed.waze.com/iframe?zoom=17&lat=14.25454&lon=121.12951&pin=1";

const contactCards = [
  {
    Icon: MapPinIcon,
    title: "Location",
    info: "Gatcahalian Subdivision\nBrgy. Banay 2, Cabuyao, Laguna",
    link: WAZE_LOCATION_URL,
    linkLabel: "Open in Waze ↗",
  },
  {
    Icon: ClockIcon,
    title: "Hours",
    info: "Monday – Saturday\n9:00 AM – 6:30 PM · Closed Sundays",
    link: null,
    linkLabel: null,
  },
  {
    Icon: PhoneIcon,
    title: "WhatsApp / Viber",
    info: "+63 929 378 1462\nReady for direct buyer inquiries",
    link: "https://wa.me/639293781462",
    linkLabel: "Message Now ↗",
  },
  {
    Icon: AuctionHammerIcon,
    title: "Saturday Auction",
    info: "Every Saturday 11:00 AM\nCabuyao warehouse · Free entry",
    link: FACEBOOK_PAGE_URL,
    linkLabel: "View Schedule ↗",
  },
];

const sisterCompanies = [
  {
    name: "Toys for Less",
    href: "https://www.facebook.com/ToyssforLess",
    logo: "/sister-companies/toys-for-less.png",
    note: "Sister page",
  },
  {
    name: "ToyLandia",
    href: "https://www.facebook.com/officialtoylandia",
    logo: "/sister-companies/toylandia.png",
    note: "Sister page",
  },
];

export default function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden">

      {/* ── Top CTA Block ── */}
      <div className="relative py-28 sm:py-36 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #3D0000 0%, #8B1A00 25%, #CC3400 50%, #FF4200 70%, #FFC000 100%)" }} />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 animate-gradient"
          style={{
            background: "linear-gradient(135deg, rgba(255,66,0,0.4) 0%, rgba(157,78,221,0.2) 50%, rgba(255,192,0,0.3) 100%)",
            backgroundSize: "300% 300%",
          }} />

        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-dots opacity-15 pointer-events-none" />

        {/* Glow orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3"
          style={{ background: "radial-gradient(circle, rgba(0,0,0,0.25) 0%, transparent 70%)" }} />

        {/* Floating decorative chips */}
        <div className="absolute top-8 left-[8%] pill-glass animate-float hidden lg:flex">
          <TvIcon className="h-4 w-4" /> TV Featured
        </div>
        <div className="absolute top-16 right-[10%] pill-glass animate-float-delay hidden lg:flex">
          <ScaleIcon className="h-4 w-4" /> Per Kilo
        </div>
        <div className="absolute bottom-12 left-[12%] pill-glass animate-float-delay2 hidden lg:flex">
          <TrophyIcon className="h-4 w-4" /> First in South
        </div>
        <div className="absolute bottom-8 right-[8%] pill-glass animate-float hidden lg:flex">
          <TruckIcon className="h-4 w-4" /> Ships PH-wide
        </div>

        <div className="wrap relative z-10 text-center">

          {/* Live indicator */}
          <div className="inline-flex items-center gap-2.5 bg-white/[0.12] border border-white/[0.25]
                          rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] font-bold text-white uppercase tracking-[0.22em]">
              Ready to Source? We&apos;re Open
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-[84px]
                          leading-[0.88] tracking-tight text-white mb-7">
            Your Toy Kingdom<br />
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Awaits.</span>
          </h2>

          <p className="text-white/70 text-xl mb-4 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re a first-time buyer, an active reseller, or a bulk event sourcer —
            Toyzoona has a buying path built exactly for you.
          </p>
          <p className="text-white/50 text-sm mb-12 font-medium tracking-wide">
            UK preloved toys · China brand-new stock · Per-kilo pricing · Nationwide shipping
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 justify-center
                         bg-white hover:bg-white/90
                         text-tz-orange font-black px-10 py-4 rounded-xl text-base tracking-wide
                         transition-all duration-200
                         shadow-[0_8px_40px_rgba(0,0,0,0.4)]
                         hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Message the Facebook Page
            </a>
          </div>

          <div className="mb-8 flex flex-col items-center gap-3">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/54">
              Sister company pages
            </p>
            <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
              {sisterCompanies.map((company) => (
                <a
                  key={company.name}
                  href={company.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center gap-3 rounded-2xl border border-white/[0.28] bg-white/[0.13] px-4 py-3 text-left text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.22] hover:shadow-[0_14px_38px_rgba(0,0,0,0.28)]"
                >
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/30 bg-white p-1.5">
                    <Image
                      src={assetPath(company.logo)}
                      alt={`${company.name} logo`}
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-black leading-tight">{company.name}</span>
                    <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wider text-white/56">
                      {company.note}
                    </span>
                  </span>
                  <GlobeIcon className="h-5 w-5 shrink-0 text-white/70 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/45 text-sm">
            <a
              href="https://www.tiktok.com/@toyzoonaimporter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors flex items-center gap-1.5 font-medium"
            >
              <GlobeIcon className="h-4 w-4" />
              TikTok @toyzoonaimporter
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://www.linkedin.com/company/toyzoona-importer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors flex items-center gap-1.5 font-medium"
            >
              <GlobeIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <span className="text-white/20">·</span>
            <a
              href="mailto:official.toyzoonaimporter@gmail.com"
              className="hover:text-white/80 transition-colors flex items-center gap-1.5 font-medium"
            >
              <MailIcon className="h-4 w-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Contact Cards ── */}
      <div className="bg-tz-darker py-14">
        <div className="wrap">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map(({ Icon, title, info, link, linkLabel }) => (
              <div
                key={title}
                className="group bg-tz-card border border-white/[0.06] rounded-2xl p-6
                           hover:border-white/[0.13] hover:-translate-y-1
                           transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-tz-orange/20 bg-tz-orange/10 text-tz-orange">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-display font-bold text-tz-text text-sm mb-2">{title}</div>
                <p className="text-tz-muted text-xs leading-relaxed whitespace-pre-line flex-1">{info}</p>
                {link && linkLabel && (
                  <a
                    href={link}
                    target={link.startsWith("http") ? "_blank" : undefined}
                    rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-3 text-xs font-semibold text-tz-orange hover:underline"
                  >
                    {linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-tz-card">
            <div className="flex flex-col gap-3 border-b border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-display text-lg font-black text-tz-text">Find Toyzoona on Waze</div>
                <p className="mt-1 text-xs font-semibold text-tz-muted">
                  Gatcahalian Subdivision, Brgy. Banay 2, Cabuyao, Laguna
                </p>
              </div>
              <a
                href={WAZE_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-tz-cyan/30 bg-tz-cyan/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-tz-cyan transition-colors hover:bg-tz-cyan/16"
              >
                Open Waze
              </a>
            </div>
            <div className="aspect-[16/9] min-h-[280px] bg-[#050518]">
              <iframe
                src={WAZE_EMBED_URL}
                title="Toyzoona Importer Waze location"
                className="h-full w-full"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
