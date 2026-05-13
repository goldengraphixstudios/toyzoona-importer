import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

const toyBrands = [
  { label: "Barbie", src: "/brand-logos/barbie.png" },
  { label: "LEGO", src: "/brand-logos/lego.png" },
  { label: "Bluey", src: "/brand-logos/bluey.png" },
  { label: "Disney", src: "/brand-logos/disney.png" },
  { label: "Blippi", src: "/brand-logos/blippi.png" },
  { label: "Cocomelon", src: "/brand-logos/cocomelon.png" },
  { label: "Fisher-Price", src: "/brand-logos/fisher-price.png" },
  { label: "VTech", src: "/brand-logos/vtech.png" },
  { label: "Nerf", src: "/brand-logos/nerf.png" },
  { label: "Hot Wheels", src: "/brand-logos/hot-wheels.png" },
  { label: "Little Tikes", src: "/brand-logos/little-tikes.png" },
  { label: "Paw Patrol", src: "/brand-logos/paw-patrol.png" },
  { label: "Peppa Pig", src: "/brand-logos/peppa-pig.png" },
  { label: "Lamaze", src: "/brand-logos/lamaze.png" },
  { label: "Chicco", src: "/brand-logos/chicco.png" },
  { label: "Marvel", src: "/brand-logos/marvel.png" },
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
              key={`${brand.label}-${index}`}
              className="relative inline-flex h-[76px] w-[150px] items-center justify-center overflow-hidden rounded-[1.05rem] border-4 border-[#4b1b00] bg-white px-4 py-3 shadow-[0_7px_0_#ff4200] transition-transform duration-300 hover:-translate-y-2 hover:rotate-2 sm:h-[86px] sm:w-[176px]"
            >
              <Image
                src={assetPath(brand.src)}
                alt={`${brand.label} logo`}
                fill
                className="object-contain p-3"
                sizes="176px"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
