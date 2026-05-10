import Image from "next/image";
import { MapPinIcon } from "@/components/Icons";
import { assetPath } from "@/lib/assetPath";

const eventCards = [
  {
    src: "/toyfair-1.jpg",
    venue: "Dasma Arena",
    location: "Dasmarinas, Cavite",
    tag: "Crowd Scale",
    accent: "#FF4200",
  },
  {
    src: "/toyfair-2.jpg",
    venue: "Filinvest Tent",
    location: "Alabang, Muntinlupa",
    tag: "South Event",
    accent: "#FFC000",
  },
  {
    src: "/toyfair-3.jpg",
    venue: "Metrotent Pasig",
    location: "Ortigas, Metro Manila",
    tag: "Metro Reach",
    accent: "#9D4EDD",
  },
  {
    src: "/toyfair-4.jpg",
    venue: "Toyfair Floor",
    location: "Live event stock",
    tag: "Real Tables",
    accent: "#00CFFF",
  },
  {
    src: "/toyfair-5.jpg",
    venue: "Buyer Booths",
    location: "Bulk-ready displays",
    tag: "Sell-Through",
    accent: "#FF4200",
  },
  {
    src: "/toyfair-6.jpg",
    venue: "Event Hauls",
    location: "Toyzoona presence",
    tag: "High Volume",
    accent: "#FFC000",
  },
  {
    src: "/toyfair-7.jpg",
    venue: "Public Proof",
    location: "Toyfair history",
    tag: "Verified",
    accent: "#9D4EDD",
  },
];

const venueStats = [
  { label: "Dasma Arena", value: "Cavite" },
  { label: "Filinvest Tent", value: "Alabang" },
  { label: "Metrotent", value: "Pasig" },
];

export default function ToyfairProof() {
  const sliderCards = [...eventCards, ...eventCards, ...eventCards];

  return (
    <section id="toyfair" className="relative overflow-hidden bg-tz-bg py-16 sm:py-20">
      <Image
        src={assetPath("/pastel-toy-bg-1.webp")}
        alt="Pastel toy event background"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,8,0.76)_0%,rgba(7,7,23,0.56)_46%,rgba(1,1,8,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,239,63,0.16),transparent_18%),radial-gradient(circle_at_82%_30%,rgba(0,207,255,0.14),transparent_20%),linear-gradient(180deg,rgba(1,1,8,0.06),rgba(1,1,8,0.42))] pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 bg-white/25" />
              <span className="section-num !text-white/68">Toyfair Presence</span>
            </div>
            <h2 className="font-display text-4xl font-black leading-[0.92] tracking-tight text-white sm:text-5xl lg:text-6xl">
              We&apos;ve Filled<br />
              <span className="text-[#ffef3f] drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)]">Arenas.</span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {venueStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#ffef3f]">
                  <MapPinIcon className="h-4 w-4" />
                </div>
                <div className="font-display text-lg font-black leading-none text-white">{item.label}</div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-white/58">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden border-y border-white/16 bg-[#080819]/34 py-5 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#080819]/95 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#080819]/95 to-transparent" />

        <div className="flex w-max animate-marquee-slow gap-5 px-4">
          {sliderCards.map((card, index) => (
            <article
              key={`${card.src}-${index}`}
              className="group relative h-[320px] w-[340px] shrink-0 overflow-hidden rounded-[1.65rem] border-2 border-white/24 bg-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.32)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 sm:h-[380px] sm:w-[460px]"
            >
              <Image
                src={assetPath(card.src)}
                alt={`${card.venue} Toyzoona event proof`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,1,8,0.04)_0%,rgba(1,1,8,0.22)_42%,rgba(1,1,8,0.92)_100%)]" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 18%, ${card.accent}55, transparent 48%)` }}
              />
            </article>
          ))}
        </div>
      </div>

      <div className="wrap relative z-10 mt-7">
        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/18 bg-white/10 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm font-semibold leading-relaxed text-white/72">
            From Dasma Arena to Filinvest Tent and Metrotent Pasig, Toyzoona has shown up with
            real stock, full tables, and public event-scale proof.
          </p>
          <a
            href="https://www.facebook.com/groups/642834551000763"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border-2 border-white bg-[#ff4200] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_8px_0_#9b2200] transition-transform duration-300 hover:-translate-y-1"
          >
            View latest events
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
