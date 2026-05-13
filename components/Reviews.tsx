const featured = {
  name: "Maricel R.",
  role: "Reseller · Laguna",
  initial: "M",
  color: "#FF4200",
  quote:
    "Sobrang sulit ng per-kilo model! I've been sourcing from Toyzoona every Saturday and my customers love the variety. UK preloved finds and China new stock give me more options for resale.",
  stars: 5,
  badge: "Top Reviewer",
};

const reviews = [
  {
    name: "Jay B.",
    role: "Live Seller · Batangas",
    initial: "J",
    color: "#FFC000",
    quote:
      "Nung nakita ko yung TV feature nila, saka ko naalala kung saan ko sila narinig dati. Legit ang Toyzoona — fresh arrivals, great prices, mabilis mag-reply.",
    stars: 5,
  },
  {
    name: "Rowena M.",
    role: "Parent & Gift Buyer",
    initial: "R",
    color: "#9D4EDD",
    quote:
      "Binili ko sa toyfair nila tapos nakuha ko sobrang dami for the price. The kids loved it. Going back for Christmas gifts for sure.",
    stars: 5,
  },
  {
    name: "Arnell T.",
    role: "Bulk Buyer · Manila",
    initial: "A",
    color: "#00CFFF",
    quote:
      "I do corporate giveaway sourcing and Toyzoona has been my go-to for event toys. Consistent quality, fair kilo pricing, and they accommodate large orders.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-tz-amber" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-tz-surface relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,66,0,0.04) 0%, transparent 70%)" }} />

      <div className="wrap relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-tz-border" />
            <span className="section-num">Buyer Feedback</span>
            <div className="h-px w-10 bg-tz-border" />
          </div>
          <h2 className="display-xl text-tz-text mb-5">
            What Real Buyers Say
          </h2>
          <p className="body-md max-w-lg mx-auto">
            From Saturday regulars to nationwide resellers — this is who trusts Toyzoona.
          </p>

          {/* Overall rating */}
          <div className="inline-flex items-center gap-4 mt-8 bg-white/[0.03] border border-white/[0.08]
                          rounded-2xl px-7 py-4">
            <div>
              <div className="font-display font-black text-5xl text-gradient-amber leading-none">5.0</div>
              <div className="text-xs text-tz-dim mt-1 uppercase tracking-wider">Overall Rating</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-left">
              <div className="flex gap-0.5 mb-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-tz-amber" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="text-xs text-tz-muted">Verified buyer reviews</div>
            </div>
          </div>
        </div>

        {/* Featured review */}
        <div className="relative bg-tz-card border border-tz-orange/20 rounded-3xl p-8 sm:p-10 lg:p-12 mb-5
                        shadow-[0_0_60px_rgba(255,66,0,0.07)] overflow-hidden">
          {/* Big quote mark */}
          <div className="absolute -left-3 -top-6 font-display font-black text-[200px] leading-none
                          text-tz-orange/[0.04] select-none pointer-events-none">
            &ldquo;
          </div>
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, #FF4200, rgba(255,66,0,0.2), transparent)" }} />

          <div className="relative z-10">
            <Stars count={featured.stars} />
            <blockquote className="font-display font-bold text-2xl sm:text-3xl text-tz-text
                                    leading-snug mt-6 mb-8 max-w-4xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ background: featured.color }}>
                <span className="font-display font-black text-white text-lg">{featured.initial}</span>
              </div>
              <div>
                <div className="font-bold text-tz-text">{featured.name}</div>
                <div className="text-sm text-tz-muted">{featured.role}</div>
              </div>
              <div className="sm:ml-auto flex items-center gap-2 bg-tz-amber/10 border border-tz-amber/20
                              px-4 py-2 rounded-full">
                <svg className="w-3.5 h-3.5 text-tz-amber" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-bold text-tz-amber">Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="group bg-tz-card border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4
                         hover:border-white/[0.13] hover:-translate-y-1.5
                         transition-all duration-350"
            >
              <Stars count={r.stars} />
              <p className="text-tz-muted italic leading-relaxed text-sm flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: r.color }}>
                  <span className="font-display font-black text-white text-sm">{r.initial}</span>
                </div>
                <div>
                  <div className="font-semibold text-tz-text text-sm">{r.name}</div>
                  <div className="text-xs text-tz-dim">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.facebook.com/groups/642834551000763"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !text-tz-muted hover:!text-tz-orange"
          >
            Read more buyer stories in the Facebook Group
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
