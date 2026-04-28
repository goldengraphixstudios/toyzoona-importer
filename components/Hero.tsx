import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-tz-darker">
      {/* Background image — full bleed, very low opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/tv-1.jpg"
          alt="Toyzoona team on national TV"
          fill
          className="object-cover opacity-15"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tz-darker via-tz-darker/90 to-tz-darker/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-tz-darker via-transparent to-tz-darker/50" />
      </div>

      {/* Accent glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-tz-orange/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-tz-yellow/6 rounded-full blur-3xl pointer-events-none" />

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 container-max w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-7rem)]">

          {/* LEFT: Text + CTAs */}
          <div className="flex flex-col justify-center">
            <div className="tag mb-4 block">🏆 As Seen on National TV · First in the South</div>

            <h1 className="heading-xl text-white mb-6">
              The South&apos;s First{" "}
              <span className="text-tz-orange">Toys-Per-Kilo</span>{" "}
              Importer
            </h1>

            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              Imported directly from the <strong className="text-white">UK and China</strong>.
              Featured on national television. Trusted by resellers, live sellers, families, and
              bulk buyers across the Philippines.
            </p>

            <p className="text-sm text-gray-500 mb-10">
              Saturday auctions · Live selling · Warehouse visits · Cabuyao, Laguna
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.facebook.com/groups/642834551000763"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center justify-center sm:justify-start"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Join the Facebook Group
              </a>
              <a href="#how-to-buy" className="btn-secondary text-center justify-center sm:justify-start">
                See Saturday Auction ↓
              </a>
            </div>

            {/* Quick stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm">
              {[
                { num: "2+", label: "Years Trusted" },
                { num: "TV", label: "National Feature" },
                { num: "UK+CN", label: "Import Sources" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-display font-black text-tz-orange">{s.num}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Featured Facebook reel */}
          <div className="flex flex-col justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-tz-orange/10 rounded-3xl blur-2xl" />

              <div className="relative bg-tz-card border border-tz-border rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-tz-darker border-b border-tz-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-400 font-mono">📱 Featured Facebook Reel</span>
                  </div>
                  <span className="bg-tz-orange/20 text-tz-orange text-xs font-bold px-2 py-0.5 rounded-full">FEATURED</span>
                </div>

                <div className="px-4 py-5 sm:p-6 bg-gradient-to-b from-tz-darker to-black">
                  <div className="max-w-3xl mx-auto rounded-[24px] overflow-hidden border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
                    <div className="relative w-full aspect-video bg-black">
                      <iframe
                        src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2064629281014506%2F&show_text=0&width=560"
                        title="Toyzoona Importer featured Facebook reel"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        className="absolute inset-0 h-full w-full"
                        scrolling="no"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-tz-darker flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Toyzoona Reel</p>
                    <p className="text-xs text-gray-500">Live content, toy drops, and buyer energy</p>
                  </div>
                  <a
                    href="https://www.facebook.com/reel/2064629281014506/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-tz-orange hover:underline"
                  >
                    Open Reel ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
