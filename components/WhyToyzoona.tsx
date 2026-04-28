import { TvIcon, MedalIcon, WeightIcon, EventIcon, BoxIcon, UsersIcon } from "@/components/Icons";

const reasons = [
  {
    Icon: TvIcon,
    title: "As Seen on National TV",
    body: "Featured on Gud Morning Kapatid — one of the Philippines' biggest morning shows. Real TV exposure, real credibility.",
    accent: "text-tz-yellow",
  },
  {
    Icon: MedalIcon,
    title: "First in the South",
    body: "Toyzoona pioneered the toys-per-kilo model in Southern Luzon. No one else was doing this before we were.",
    accent: "text-tz-orange",
  },
  {
    Icon: WeightIcon,
    title: "Per-Kilo Savings",
    body: "Buy toys by weight, not by piece. The per-kilo model means more variety, lower cost, and better margins for resellers.",
    accent: "text-tz-blue",
  },
  {
    Icon: EventIcon,
    title: "Proven Event Presence",
    body: "We've filled arenas — from Dasma Arena to Filinvest Tent. Real crowds, real buyers, real scale.",
    accent: "text-tz-yellow",
  },
  {
    Icon: BoxIcon,
    title: "Fresh Weekly Arrivals",
    body: "New containers arriving regularly from the UK and China. Saturday auctions always have fresh stock.",
    accent: "text-tz-orange",
  },
  {
    Icon: UsersIcon,
    title: "Built for Resellers",
    body: "Bulk buyers, live sellers, and toy resellers have been sourcing from Toyzoona since day one. This is their home base.",
    accent: "text-tz-blue",
  },
];

export default function WhyToyzoona() {
  return (
    <section id="why-toyzoona" className="section-pad bg-tz-dark">
      <div className="container-max">
        <div className="text-center mb-14">
          <div className="tag mb-3">Why Buyers Choose Us</div>
          <h2 className="heading-lg text-white">
            Not Just Another Toy Shop
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Toyzoona is the real deal — TV-featured, toyfair-proven, and trusted by thousands of
            buyers across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ Icon, title, body, accent }) => (
            <div key={title} className="card-dark hover:border-tz-orange/40 transition-colors group">
              <div className={`mb-4 ${accent}`}><Icon className="w-8 h-8" /></div>
              <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
