import Image from "next/image";
import { NewspaperIcon } from "@/components/Icons";

const tvImages = [
  { src: "/tv-2.jpg", alt: "Toyzoona on Gud Morning Kapatid" },
  { src: "/tv-3.jpg", alt: "TV feature segment" },
  { src: "/tv-4.jpg", alt: "National TV appearance" },
  { src: "/tv-5.jpg", alt: "On-air product display" },
];

export default function TVSpotlight() {
  return (
    <section id="tv-feature" className="section-pad bg-tz-dark">
      <div className="container-max">
        <div className="text-center mb-14">
          <div className="tag mb-3">National Television Feature</div>
          <h2 className="heading-lg text-white mb-4">
            We Made It to{" "}
            <span className="text-tz-yellow">National TV</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Toyzoona Importer was featured on{" "}
            <strong className="text-white">Gud Morning Kapatid</strong> — one of the Philippines&apos;
            most-watched morning programs. The TV exposure, social clips, and press pickup all work
            together as proof that the brand has real public reach.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
          {/* Featured Facebook reel */}
          <div className="relative">
            <div className="absolute -inset-2 bg-tz-yellow/5 rounded-2xl blur-xl" />
            <div className="relative bg-tz-card border border-tz-border rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-tz-darker border-b border-tz-border">
                <span className="w-2 h-2 rounded-full bg-tz-orange animate-pulse" />
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                  Featured Facebook Reel
                </span>
                <span className="ml-auto bg-tz-yellow/15 text-tz-yellow text-xs font-bold px-2 py-0.5 rounded-full">
                  REEL
                </span>
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
            </div>
          </div>

          {/* Copy + photo strip */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-gray-300 text-base leading-relaxed mb-4">
                The TV guesting gave Toyzoona national visibility, and the reel format keeps that
                exposure alive where buyers actually spend time. Instead of a static mention, the
                brand can show the moment, the toys, and the real audience reaction in motion.
              </p>
              <div className="border-l-2 border-tz-yellow pl-4 mb-6">
                <p className="text-gray-400 text-sm italic">
                  &ldquo;A real brand moment that buyers can watch, share, and remember.&rdquo;
                </p>
              </div>
              <a
                href="https://www.facebook.com/reel/2064629281014506/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                Watch the Featured Reel
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {tvImages.map((img) => (
                <div key={img.src} className="relative h-28 rounded-xl overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-tz-dark/30" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Press callout */}
        <div className="rounded-2xl border border-tz-border bg-gradient-to-r from-tz-card to-tz-darker p-6 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-tz-orange/10 px-4 py-2 text-tz-orange">
                <NewspaperIcon className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Philippine STAR Coverage</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">
                Highlighted in Philippine STAR
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400">
                Beyond TV, Toyzoona&apos;s story also landed in one of the country&apos;s biggest
                publications. That gives the brand a stronger trust stack: broadcast visibility,
                social proof, and recognizable press coverage.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#media" className="btn-secondary !px-5 !py-3 !text-sm">
                  See Press Embed
                </a>
                <a
                  href="https://www.facebook.com/PhilippineSTAR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-tz-yellow hover:underline"
                >
                  Open Philippine STAR ↗
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-xl border border-tz-border bg-white shadow-lg">
                <div className="relative w-full aspect-[5/6]">
                  <iframe
                    src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPhilippineSTAR%2Fposts%2Fpfbid0vDA7WywnMQrir75SeeJAMSqHE7fmWNawG82k2HSZgN4VK6BnmXwREjtNrGGZLohUl&show_text=false&width=500"
                    title="Philippine STAR post about Toyzoona Importer"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
