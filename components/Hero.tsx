import Image from "next/image";
import { BalloonToy, BearToy, BlocksToy, RocketToy, StarToy, ToyDisplaySvg, TrainToy, YoYoToy } from "@/components/ToySvgs";

const proofItems = [
  "National TV proof",
  "Philippine STAR pickup",
  "8,000+ buyer group",
  "Saturday auctions",
];

const stats = [
  { value: "8K+", label: "Buyers" },
  { value: "UK+CN", label: "Imports" },
  { value: "kg", label: "Bulk" },
  { value: "Sat", label: "Auction" },
];

const heroToys = [
  { Toy: BearToy, className: "left-[4%] top-[19%] h-14 w-14 animate-toy-bob" },
  { Toy: TrainToy, className: "right-[10%] top-[17%] h-16 w-20 animate-toy-wiggle" },
  { Toy: BalloonToy, className: "right-[6%] top-[43%] h-16 w-12 animate-balloon-rise" },
  { Toy: YoYoToy, className: "left-[8%] bottom-[18%] h-14 w-14 animate-toy-spin" },
  { Toy: StarToy, className: "right-[35%] bottom-[14%] h-12 w-12 animate-spark-pop" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#13a4ff] text-white lg:min-h-[calc(100vh+84px)]">
      <Image
        src="/hero-toyzoona-bg.webp"
        alt="Colorful Toyzoona toy world background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,10,0,0.88)_0%,rgba(95,31,0,0.72)_36%,rgba(35,21,0,0.42)_70%,rgba(1,1,20,0.52)_100%)] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(255,255,255,0.30),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(0,207,255,0.18),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(1,1,8,0.54)_100%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-20 h-24 overflow-hidden">
        <div className="absolute left-[-18rem] top-3 h-12 w-48 rounded-full bg-white/72 blur-[1px] animate-cloud-drift" />
        <div className="absolute right-[-20rem] top-1 h-14 w-52 rounded-full bg-white/62 blur-[1px] animate-cloud-drift-rev" />
      </div>

      {heroToys.map(({ Toy, className }) => (
        <Toy key={className} className={`pointer-events-none absolute z-10 drop-shadow-[0_10px_22px_rgba(0,0,0,0.28)] ${className}`} />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(2,2,16,0.64)_100%)]" />

      <div className="wrap relative z-20 flex min-h-screen items-center pt-32 pb-24 lg:min-h-[calc(100vh+84px)] lg:pt-28 lg:pb-28">
        <div className="grid w-full items-center gap-9 lg:grid-cols-[1fr_390px] xl:grid-cols-[1fr_430px]">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap gap-2 fade-up">
              {proofItems.map((item, index) => (
                <span
                  key={item}
                  className={`rounded-full border-2 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] shadow-[0_8px_18px_rgba(0,0,0,0.16)] ${
                    index === 0
                      ? "border-white bg-white text-tz-orange"
                      : "border-white/45 bg-white/18 text-white backdrop-blur-md"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mb-3 inline-flex rounded-full bg-[#ffef3f] px-4 py-1.5 font-display text-xs font-black uppercase tracking-[0.2em] text-[#8c2400] shadow-[0_10px_22px_rgba(255,239,63,0.3)] fade-up-1">
              Toyzoona Importer
            </p>

            <h1 className="mb-5 max-w-4xl font-display text-[clamp(3.25rem,6.8vw,7.1rem)] font-black leading-[0.82] tracking-[-0.07em] text-white drop-shadow-[0_14px_30px_rgba(81,25,0,0.38)] fade-up-2">
              Toys by the kilo.
              <span className="block text-[#ffef3f]">Big color. Better hauls.</span>
            </h1>

            <p className="mb-8 max-w-2xl text-base font-semibold leading-relaxed text-white/92 drop-shadow-[0_4px_12px_rgba(0,0,0,0.22)] sm:text-lg fade-up-3">
              A bright bulk-buying toy funnel for resellers, live sellers, families, and
              Saturday auction buyers who want warehouse-style finds without the boring retail feel.
            </p>

            <div className="mb-9 flex flex-col gap-3 sm:flex-row fade-up-4">
              <a
                href="https://www.facebook.com/groups/642834551000763"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-[1.1rem] border-2 border-white bg-[#ff3d00] px-6 py-3.5 text-sm font-black text-white shadow-[0_12px_0_#9b2200,0_22px_34px_rgba(100,24,0,0.32)] transition-all duration-300 hover:-translate-y-1 hover:rotate-[-1deg] hover:bg-[#ff5f18] active:translate-y-1 active:shadow-[0_7px_0_#9b2200,0_12px_22px_rgba(100,24,0,0.24)]"
              >
                Join the Toy Group
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-[1.1rem] border-2 border-[#4b1b00] bg-[#ffef3f] px-6 py-3.5 text-sm font-black text-[#4b1b00] shadow-[0_12px_0_#d19a00,0_22px_34px_rgba(100,72,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:rotate-[1deg] hover:bg-white active:translate-y-1 active:shadow-[0_7px_0_#d19a00,0_12px_22px_rgba(100,72,0,0.18)]"
              >
                Browse Toy Worlds
              </a>
            </div>

            <div className="grid max-w-xl grid-cols-4 gap-2.5 fade-up-5">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border-2 border-white bg-white/22 p-3 text-center shadow-[0_10px_22px_rgba(0,0,0,0.14)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:rotate-2 ${
                    index % 2 === 0 ? "animate-toy-card" : "animate-toy-card-delay"
                  }`}
                >
                  <div className="font-display text-2xl font-black leading-none text-[#ffef3f] drop-shadow-[0_4px_8px_rgba(0,0,0,0.24)]">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[9px] font-black uppercase tracking-widest text-white">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[360px] fade-up-3 lg:max-w-[390px]">
            <div className="absolute -inset-5 rounded-[2.2rem] bg-[conic-gradient(from_180deg,#ff4200,#ffef3f,#00cfff,#9d4edd,#ff4200)] opacity-65 blur-xl animate-rainbow-spin" />
            <div className="relative rotate-[1.5deg] rounded-[1.8rem] border-[7px] border-white bg-[#ffef3f] p-4 shadow-[0_18px_0_#9b2200,0_32px_58px_rgba(63,18,0,0.34)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.015]">
              <div className="mb-3 flex items-center justify-start gap-3">
                <span className="rounded-full bg-[#ff3d00] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                  Toy motion
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[1.35rem] border-[5px] border-[#4b1b00] bg-white">
                <ToyDisplaySvg className="aspect-[1.3/1] w-full" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_54%,rgba(255,61,0,0.12)_76%,rgba(0,207,255,0.18)_100%)]" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Watch", Toy: RocketToy },
                  { label: "Join", Toy: BlocksToy },
                  { label: "Auction", Toy: TrainToy },
                ].map(({ label, Toy }, index) => (
                  <span
                    key={label}
                    className={`flex flex-col items-center gap-1 rounded-xl border-2 border-[#4b1b00] bg-white px-2 py-2 font-display text-[10px] font-black uppercase text-[#4b1b00] shadow-[0_6px_0_#d19a00] ${
                      index === 1 ? "animate-toy-hop" : "animate-toy-bob"
                    }`}
                  >
                    <Toy className="h-7 w-7" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 border-t-4 border-white/70 bg-[#0814a8]/82 backdrop-blur-md">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-3.5 text-center text-xs font-black uppercase tracking-[0.1em] text-white sm:flex-row sm:text-left">
          <span>Warehouse schedule: Mon-Sat, 9:00 AM - 6:30 PM</span>
          <a href="#how-to-buy" className="rounded-full bg-[#ffef3f] px-4 py-1.5 text-[#4b1b00] transition-transform duration-300 hover:-translate-y-1">
            See buying steps
          </a>
        </div>
      </div>
    </section>
  );
}
