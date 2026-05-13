import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

const categories = [
  {
    label: "Character Toys",
    img: "/toy-category-character.webp",
    accent: "#FF4200",
  },
  {
    label: "Mixed Toy Bins",
    img: "/toy-category-bulk-bins.webp",
    accent: "#FFC000",
  },
  {
    label: "Branded Shelves",
    img: "/toy-category-shelf-brands.webp",
    accent: "#00CFFF",
  },
  {
    label: "Showroom Finds",
    img: "/toy-category-showroom.webp",
    accent: "#9D4EDD",
  },
  {
    label: "Auction Floor",
    img: "/toy-category-auction-floor.webp",
    accent: "#FF4200",
  },
  {
    label: "China New Stock",
    img: "/toy-category-china-boxes.webp",
    accent: "#FFC000",
  },
];

export default function ProductWorlds() {
  const sliderItems = [...categories, ...categories, ...categories];

  return (
    <section id="products" className="relative overflow-hidden bg-tz-bg py-16 sm:py-20">
      <Image
        src={assetPath("/easter-toy-playground-bg.webp")}
        alt="Playful Easter toy categories background"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,8,0.72)_0%,rgba(7,7,23,0.50)_44%,rgba(1,1,8,0.66)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,239,63,0.18),transparent_18%),radial-gradient(circle_at_84%_28%,rgba(255,121,198,0.17),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(1,1,8,0.36))] pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_390px] lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 bg-white/25" />
              <span className="section-num !text-white/68">Toy categories</span>
            </div>
            <h2 className="font-display text-4xl font-black leading-[0.92] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Toy Worlds<br />
              <span className="text-[#ffef3f] drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)]">Built to Sell.</span>
            </h2>
          </div>
          <div className="max-w-sm rounded-2xl border border-white/20 bg-white/10 p-4 text-sm font-semibold leading-relaxed text-white/76 backdrop-blur-md">
            UK preloved finds and China brand-new per-kilo stock compressed into one moving shelf. Browse fast,
            then join the group for the latest stock drops.
          </div>
        </div>

        <div className="mb-6">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[1.6rem] border-[3px] border-[#ffef3f]/50 bg-[#080819]/80 p-2 shadow-[0_22px_55px_rgba(0,0,0,0.34)]">
            <div className="aspect-video bg-black">
              <iframe
                src="https://www.youtube.com/embed/AMQq10BFM_U?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1"
                title="Toyzoona Importer toy categories highlight"
                loading="lazy"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden border-y border-white/18 bg-[#080819]/34 py-6 backdrop-blur-sm sm:py-7">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#080819]/95 to-transparent sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#080819]/95 to-transparent sm:w-36" />

        <div className="flex w-max animate-marquee gap-5 px-4">
          {sliderItems.map((cat, index) => (
            <article
              key={`${cat.label}-${index}`}
              className="group relative h-[260px] w-[320px] shrink-0 overflow-hidden rounded-[1.65rem] border-[3px] border-white/32 bg-white/[0.08] p-3 shadow-[0_20px_48px_rgba(0,0,0,0.34)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 sm:h-[330px] sm:w-[440px] lg:h-[360px] lg:w-[520px]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#050515]/80">
                <Image
                  src={assetPath(cat.img)}
                  alt={cat.label}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 440px, 320px"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 50%, ${cat.accent}45, transparent 58%)` }}
              />
            </article>
          ))}
        </div>
      </div>

      <div className="wrap relative z-10 mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="grid w-full grid-cols-3 gap-3 sm:max-w-xl">
          {[
            { val: "UK", label: "Preloved" },
            { val: "CN", label: "Brand-New" },
            { val: "Kilo", label: "Buying" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-center backdrop-blur-md">
              <div className="font-display text-2xl font-black leading-none text-[#ffef3f]">{s.val}</div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-white/62">{s.label}</div>
            </div>
          ))}
        </div>

        <a
          href="https://www.facebook.com/groups/642834551000763"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-white bg-[#ff4200] px-6 py-3.5 text-sm font-black text-white shadow-[0_10px_0_#9b2200,0_20px_34px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1 sm:w-auto"
        >
          Browse Latest Stock
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
