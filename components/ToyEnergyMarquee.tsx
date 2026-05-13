const toyBrands = [
  "Barbie",
  "LEGO",
  "Bluey",
  "Disney",
  "Blippi",
  "Cocomelon",
  "Fisher-Price",
  "VTech",
  "Nerf",
  "Hot Wheels",
  "Little Tikes",
  "Paw Patrol",
  "Peppa Pig",
  "Lamaze",
  "Chicco",
  "Marvel",
];

export default function ToyEnergyMarquee() {
  return (
    <section className="relative overflow-hidden border-y-4 border-white bg-[#ffef3f] py-5 text-[#4b1b00]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,66,0,0.28),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(0,207,255,0.26),transparent_20%),radial-gradient(circle_at_46%_100%,rgba(157,78,221,0.18),transparent_18%)]" />

      <div className="relative">
        <div className="mb-3 text-center font-display text-xs font-black uppercase tracking-[0.28em] text-[#8c2400]">
          Toy brands found in Toyzoona hauls
        </div>
        <div className="flex w-max animate-marquee-slow gap-3">
          {[...toyBrands, ...toyBrands, ...toyBrands].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="inline-flex min-w-[150px] items-center justify-center rounded-[1.05rem] border-4 border-[#4b1b00] bg-white px-5 py-3 font-display text-lg font-black shadow-[0_7px_0_#ff4200] transition-transform duration-300 hover:-translate-y-2 hover:rotate-2 sm:min-w-[176px] sm:text-xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
