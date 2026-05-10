import { BalloonToy, BearToy, BlocksToy, CarToy, RocketToy, StarToy, TrainToy, YoYoToy } from "@/components/ToySvgs";

const topItems = [
  { label: "Plush", Toy: BearToy },
  { label: "Trains", Toy: TrainToy },
  { label: "Surprise Bins", Toy: BlocksToy },
  { label: "Auctions", Toy: YoYoToy },
  { label: "Kids Picks", Toy: StarToy },
  { label: "Party Gifts", Toy: BalloonToy },
  { label: "Mini Cars", Toy: CarToy },
  { label: "New Finds", Toy: RocketToy },
];

const bottomItems = [
  "UK imports",
  "China imports",
  "Bulk buyers",
  "Live sellers",
  "Reseller-friendly",
  "Family hauls",
  "Saturday auctions",
  "Warehouse visits",
];

export default function ToyEnergyMarquee() {
  return (
    <section className="relative overflow-hidden border-y-4 border-white bg-[#ffef3f] py-6 text-[#4b1b00]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,66,0,0.28),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(0,207,255,0.26),transparent_20%),radial-gradient(circle_at_46%_100%,rgba(157,78,221,0.18),transparent_18%)]" />

      <div className="relative space-y-3">
        <div className="flex w-max animate-marquee gap-3">
          {[...topItems, ...topItems].map(({ label, Toy }, index) => (
            <span
              key={`${label}-${index}`}
              className="inline-flex items-center gap-2 rounded-full border-4 border-[#4b1b00] bg-white px-5 py-2 font-display text-lg font-black shadow-[0_7px_0_#ff4200] transition-transform duration-300 hover:-translate-y-2 hover:rotate-2"
            >
              <Toy className="h-9 w-9 shrink-0" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex w-max animate-marquee-rev gap-3">
          {[...bottomItems, ...bottomItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-2xl border-2 border-white bg-[#ff4200] px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_6px_0_#9b2200]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
