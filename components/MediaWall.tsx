import { NewspaperIcon, ShieldIcon } from "@/components/Icons";

export default function MediaWall() {
  return (
    <section id="media" className="section-pad bg-tz-darker">
      <div className="container-max">
        <div className="text-center mb-14">
          <div className="tag mb-3">Media &amp; Press</div>
          <h2 className="heading-lg text-white mb-4">
            Seen It?{" "}
            <span className="text-tz-orange">Now Watch It.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real coverage across formats. From the featured reel to the TV segment and
            Philippine STAR pickup, this is how Toyzoona shows up in public.
          </p>
        </div>

        {/* Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* Featured Facebook Reel */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-tz-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-tz-yellow">
                Facebook · Featured Reel
              </span>
            </div>
            <div className="flex-1 bg-tz-card border border-tz-border rounded-2xl overflow-hidden shadow-lg">
              <div className="px-4 py-5 sm:p-6 bg-gradient-to-b from-tz-darker to-black">
                <div className="mx-auto max-w-[560px] overflow-hidden rounded-[24px] border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
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
              <div className="px-4 py-3 bg-tz-darker border-t border-tz-border flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Toyzoona Reel · Featured clip</p>
                  <p className="text-xs text-gray-500">Landscape reel embed framed to its native player width</p>
                </div>
                <a href="https://www.facebook.com/reel/2064629281014506/" target="_blank" rel="noopener noreferrer" className="text-xs text-tz-yellow hover:underline shrink-0 ml-4">Open ↗</a>
              </div>
            </div>
          </div>

          {/* Philippine STAR Post */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Press Coverage · Philippine STAR
              </span>
            </div>
            <div className="flex-1 bg-tz-card border border-tz-border rounded-2xl overflow-hidden shadow-lg">
              <div className="px-4 py-3 bg-tz-darker border-b border-tz-border">
                <p className="text-xs font-semibold text-white">Philippine STAR coverage</p>
                <p className="text-xs text-gray-500">National press mention presented in a proper post frame</p>
              </div>
              <div className="bg-white p-3 sm:p-4">
                <div className="mx-auto max-w-[500px] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <iframe
                    src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPhilippineSTAR%2Fposts%2Fpfbid0vDA7WywnMQrir75SeeJAMSqHE7fmWNawG82k2HSZgN4VK6BnmXwREjtNrGGZLohUl&show_text=false&width=500"
                    title="Philippine STAR post about Toyzoona Importer"
                    width="500"
                    height="620"
                    style={{ border: "none", overflow: "hidden", width: "100%", maxWidth: "500px", display: "block" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    className="block"
                  />
                </div>
              </div>
              <div className="px-4 py-3 bg-tz-darker border-t border-tz-border flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Philippine STAR · Official post</p>
                  <p className="text-xs text-gray-500">A stronger trust marker beyond social content</p>
                </div>
                <a href="https://www.facebook.com/PhilippineSTAR" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white hover:underline shrink-0 ml-4">Open ↗</a>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* YouTube */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-tz-orange" />
              <span className="text-xs font-bold uppercase tracking-widest text-tz-orange">
                YouTube · National TV Feature
              </span>
            </div>
            <div className="flex-1 bg-tz-card border border-tz-border rounded-2xl overflow-hidden shadow-lg">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://www.youtube.com/embed/eAGbGMUIzhY?rel=0&modestbranding=1"
                  title="Toyzoona Importer — Toys Per Kilo"
                  loading="lazy"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="px-4 py-3 bg-tz-darker border-t border-tz-border flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Gud Morning Kapatid Feature</p>
                  <p className="text-xs text-gray-500">Full TV segment on YouTube</p>
                </div>
                <a href="https://www.youtube.com/watch?v=eAGbGMUIzhY" target="_blank" rel="noopener noreferrer" className="text-xs text-tz-orange hover:underline shrink-0 ml-4">Open ↗</a>
              </div>
            </div>
          </div>

          {/* Facebook Video 1 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-tz-blue" />
              <span className="text-xs font-bold uppercase tracking-widest text-tz-blue">
                Facebook · Video Feature
              </span>
            </div>
            <div className="flex-1 bg-tz-card border border-tz-border rounded-2xl overflow-hidden shadow-lg">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FToyzoonaLaguna%2Fvideos%2F7153440271404393%2F&show_text=0&width=560"
                  title="Toyzoona Laguna official Facebook video"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="absolute inset-0 w-full h-full"
                  scrolling="no"
                />
              </div>
              <div className="px-4 py-3 bg-tz-darker border-t border-tz-border flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Toyzoona Laguna · Facebook Video</p>
                  <p className="text-xs text-gray-500">Official Toyzoona video content</p>
                </div>
                <a href="https://www.facebook.com/ToyzoonaLaguna/videos/7153440271404393/" target="_blank" rel="noopener noreferrer" className="text-xs text-tz-blue hover:underline shrink-0 ml-4">Open ↗</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center flex items-center justify-center gap-2">
          <ShieldIcon className="w-4 h-4 text-gray-500" />
          <p className="text-gray-500 text-xs">
            TV, social, and press placements are shown here as brand proof and public-facing coverage.
          </p>
        </div>
      </div>
    </section>
  );
}
