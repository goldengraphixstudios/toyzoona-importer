import Image from "next/image";

const images = [
  { src: "/toyfair-1.jpg", span: "col-span-2 row-span-2", h: "h-80" },
  { src: "/toyfair-2.jpg", span: "col-span-1", h: "h-36" },
  { src: "/toyfair-3.jpg", span: "col-span-1", h: "h-36" },
  { src: "/toyfair-4.jpg", span: "col-span-1", h: "h-36" },
  { src: "/toyfair-5.jpg", span: "col-span-1", h: "h-36" },
  { src: "/toyfair-6.jpg", span: "col-span-1", h: "h-36" },
  { src: "/toyfair-7.jpg", span: "col-span-1", h: "h-36" },
];

export default function ToyfairProof() {
  return (
    <section id="toyfair" className="section-pad bg-tz-darker overflow-hidden">
      <div className="container-max">
        <div className="text-center mb-14">
          <div className="tag mb-3">Toyfair Presence</div>
          <h2 className="heading-lg text-white mb-4">
            We&apos;ve Filled Arenas
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From Dasma Arena to Filinvest Tent and Metrotent Pasig — Toyzoona has shown up at
            the country&apos;s biggest toy fairs with full tables, real stock, and real crowds.
            This is event-scale credibility you can see.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`relative rounded-xl overflow-hidden ${img.h} ${i === 0 ? "sm:col-span-2 sm:row-span-2 sm:h-auto" : ""}`}
              style={i === 0 ? { minHeight: "320px" } : {}}
            >
              <Image
                src={img.src}
                alt={`Toyzoona toyfair ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ))}
        </div>

        {/* Proof callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { venue: "Dasma Arena", detail: "Full-scale toyfair participation with high foot traffic and sell-out sessions." },
            { venue: "Filinvest Tent", detail: "Multiple-table presence at one of the South's premier trade venues." },
            { venue: "Metrotent Pasig", detail: "Took Toyzoona's brand to Metro Manila's biggest event halls." },
          ].map((v) => (
            <div key={v.venue} className="card-dark border-l-2 border-tz-orange">
              <div className="font-display font-bold text-white mb-1">{v.venue}</div>
              <p className="text-gray-400 text-sm">{v.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
