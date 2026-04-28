const reviews = [
  {
    name: "Maricel R.",
    role: "Reseller · Laguna",
    quote:
      "Sobrang sulit ng per-kilo model! I've been sourcing from Toyzoona every Saturday and my customers love the variety. No other supplier gives this kind of value.",
    stars: 5,
  },
  {
    name: "Jay B.",
    role: "Live Seller · Batangas",
    quote:
      "Nung nakita ko yung TV feature nila, saka ko naalala kung saan ko sila narinig dati. Legit ang Toyzoona — fresh arrivals, great prices, mabilis mag-reply.",
    stars: 5,
  },
  {
    name: "Rowena M.",
    role: "Parent & Gift Buyer",
    quote:
      "Binili ko sa toyfair nila tapos nakuha ko sobrang dami for the price. The kids loved it. Going back for Christmas gifts for sure.",
    stars: 5,
  },
  {
    name: "Arnell T.",
    role: "Bulk Buyer · Manila",
    quote:
      "I do corporate giveaway sourcing and Toyzoona has been my go-to for event toys. Consistent quality, fair kilo pricing, and they accommodate large orders.",
    stars: 5,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section-pad bg-tz-darker">
      <div className="container-max">
        <div className="text-center mb-14">
          <div className="tag mb-3">Buyer Feedback</div>
          <h2 className="heading-lg text-white mb-4">What Real Buyers Say</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            From Saturday regulars to nationwide resellers — this is who shops with Toyzoona.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="card-dark flex flex-col gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} className="text-tz-yellow text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-300 italic leading-relaxed text-sm flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-white text-sm">{r.name}</div>
                <div className="text-xs text-gray-500">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
