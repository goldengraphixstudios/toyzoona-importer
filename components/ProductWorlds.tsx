import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

const categories = [
  {
    label: "Character Toys",
    img: "/toy-category-character.webp",
    tag: "Popular",
    accent: "#FF4200",
  },
  {
    label: "Mixed Toy Bins",
    img: "/toy-category-bulk-bins.webp",
    tag: "Per Kilo",
    accent: "#FFC000",
  },
  {
    label: "Branded Shelves",
    img: "/toy-category-shelf-brands.webp",
    tag: "Brands",
    accent: "#00CFFF",
  },
  {
    label: "Showroom Finds",
    img: "/toy-category-showroom.webp",
    tag: "Walk-In",
    accent: "#9D4EDD",
  },
  {
    label: "Auction Floor",
    img: "/toy-category-auction-floor.webp",
    tag: "Saturday",
    accent: "#FF4200",
  },
  {
    label: "China New Stock",
    img: "/toy-category-china-boxes.webp",
    tag: "Brand-New",
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

        <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-[1.35rem] border border-white/16 bg-white/10 p-4 text-sm font-semibold leading-relaxed text-white/72 backdrop-blur-md">
            Photos below are from the client&apos;s latest toy uploads starting at IMG_4035, including auction-floor stock,
            branded shelves, mixed bins, and boxed China arrivals.
          </div>
          <div className="overflow-hidden rounded-[1.35rem] border-2 border-[#ffef3f]/35 bg-[#080819]/70 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <div className="aspect-video bg-black">
              <iframe
                src="https://www.youtube.com/embed/AMQq10BFM_U?rel=0&modestbranding=1"
                title="Toyzoona Importer toy categories highlight"
                loading="lazy"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="h-full w-full"
              />
            </div>
            <div className="border-t border-white/10 bg-[#080819] px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ffef3f]">Toy Categories Highlight</p>
              <p className="mt-1 text-xs font-semibold text-white/64">Client-uploaded YouTube feature embedded here.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden border-y border-white/18 bg-[#080819]/34 py-5 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#080819]/95 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#080819]/95 to-transparent" />

        <div className="flex w-max animate-marquee gap-4 px-4">
          {sliderItems.map((cat, index) => (
            <article
              key={`${cat.label}-${index}`}
              className="group relative h-[210px] w-[190px] shrink-0 overflow-hidden rounded-[1.45rem] border-2 border-white/28 bg-white/12 shadow-[0_18px_45px_rgba(0,0,0,0.30)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 sm:h-[250px] sm:w-[240px]"
            >
              <Image
                src={assetPath(cat.img)}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="240px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,1,8,0.08)_0%,rgba(1,1,8,0.30)_45%,rgba(1,1,8,0.92)_100%)]" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 20%, ${cat.accent}55, transparent 46%)` }}
              />
              <div
                className="absolute left-3 top-3 rounded-full border border-white/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white"
                style={{ backgroundColor: `${cat.accent}DD` }}
              >
                {cat.tag}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-2xl font-black leading-none text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]">
                  {cat.label}
                </h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/62">
                  Toyzoona stock
                </p>
              </div>
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
