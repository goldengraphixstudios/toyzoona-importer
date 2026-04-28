import Image from "next/image";

const categories = [
  { label: "Character Toys", img: "/toy-1.jpg", desc: "Licensed and popular character picks" },
  { label: "Educational Toys", img: "/toy-2.jpg", desc: "Learning through play" },
  { label: "Baby & Toddler", img: "/toy-3.jpg", desc: "Safe, colorful, age-appropriate" },
  { label: "Doll & Roleplay", img: "/toy-4.jpg", desc: "Creative and imaginative play sets" },
  { label: "Event Giveaways", img: "/toy-5.jpg", desc: "Bulk picks for parties and events" },
  { label: "Reseller Finds", img: "/toy-6.jpg", desc: "Mixed lots with maximum margin" },
];

export default function ProductWorlds() {
  return (
    <section id="products" className="section-pad bg-tz-dark">
      <div className="container-max">
        <div className="text-center mb-14">
          <div className="tag mb-3">What You&apos;ll Find</div>
          <h2 className="heading-lg text-white mb-4">Toy Categories</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Curated toy worlds sourced directly from the UK and China. Fresh stock arrives regularly
            — Saturday auctions always carry new arrivals.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="group relative rounded-2xl overflow-hidden bg-tz-card border border-tz-border cursor-default"
            >
              <div className="relative h-44 sm:h-52">
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tz-dark via-tz-dark/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-display font-bold text-white text-base">{cat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{cat.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.facebook.com/groups/642834551000763"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Browse Latest Stock →
          </a>
        </div>
      </div>
    </section>
  );
}
