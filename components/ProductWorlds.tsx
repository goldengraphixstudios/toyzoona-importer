import Image from "next/image";

const categories = [
  {
    label: "Character Toys",
    img: "/toy-1.jpg",
    tag: "Popular",
    accent: "#FF4200",
  },
  {
    label: "Educational Toys",
    img: "/toy-2.jpg",
    tag: "Learning",
    accent: "#FFC000",
  },
  {
    label: "Baby & Toddler",
    img: "/toy-3.jpg",
    tag: "Soft Picks",
    accent: "#00CFFF",
  },
  {
    label: "Doll & Roleplay",
    img: "/toy-4.jpg",
    tag: "Pretend Play",
    accent: "#9D4EDD",
  },
  {
    label: "Event Giveaways",
    img: "/toy-5.jpg",
    tag: "Bulk",
    accent: "#FF4200",
  },
  {
    label: "Reseller Finds",
    img: "/toy-6.jpg",
    tag: "Margin",
    accent: "#FFC000",
  },
];

export default function ProductWorlds() {
  const sliderItems = [...categories, ...categories, ...categories];

  return (
    <section id="products" className="relative overflow-hidden bg-tz-bg py-16 sm:py-20">
      <Image
        src="/easter-toy-playground-bg.webp"
        alt="Playful Easter toy categories background"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,8,0.72)_0%,rgba(7,7,23,0.50)_44%,rgba(1,1,8,0.66)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,239,63,0.18),transparent_18%),radial-gradient(circle_at_84%_28%,rgba(255,121,198,0.17),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(1,1,8,0.36))] pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
            Fresh UK and China toy categories compressed into one moving shelf. Browse fast,
            then join the group for the latest stock drops.
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
              className="group relative h-[230px] w-[220px] shrink-0 overflow-hidden rounded-[1.45rem] border-2 border-white/28 bg-white/12 shadow-[0_18px_45px_rgba(0,0,0,0.30)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 sm:h-[250px] sm:w-[240px]"
            >
              <Image
                src={cat.img}
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
                  Per-kilo sourcing
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="wrap relative z-10 mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="grid w-full grid-cols-3 gap-3 sm:max-w-xl">
          {[
            { val: "1K+", label: "SKUs" },
            { val: "Weekly", label: "Arrivals" },
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
