import { AuctionHammerIcon, LiveIcon, WarehouseIcon, UsersIcon, ClockIcon } from "@/components/Icons";

const steps = [
  {
    num: "01",
    Icon: AuctionHammerIcon,
    title: "Join the Saturday Auction",
    body: "Every Saturday starting around 10:00 AM. Warehouse opens and the auction begins. Great for scoring mixed lots at the best prices.",
    cta: "Get Auction Schedule",
    href: "https://www.facebook.com/groups/642834551000763",
    color: "border-tz-orange",
    numColor: "text-tz-orange",
    iconColor: "text-tz-orange",
  },
  {
    num: "02",
    Icon: LiveIcon,
    title: "Shop the Live Selling",
    body: "Monday to Saturday, 9:00 AM to 6:30 PM. Watch live, pick what you like, and place your order in real time.",
    cta: "Follow on TikTok",
    href: "https://www.tiktok.com/@toyzoonaimporter",
    color: "border-tz-yellow",
    numColor: "text-tz-yellow",
    iconColor: "text-tz-yellow",
  },
  {
    num: "03",
    Icon: WarehouseIcon,
    title: "Visit the Warehouse",
    body: "Open Monday to Saturday, 9:00 AM to 6:30 PM. Come in, browse the floor, pick your toys, and weigh your haul.",
    cta: "Get Directions",
    href: "https://maps.google.com/?q=Gatcahalian+Subdivision,+Brgy.+Banay+2,+Cabuyao,+Laguna",
    color: "border-tz-blue",
    numColor: "text-tz-blue",
    iconColor: "text-tz-blue",
  },
  {
    num: "04",
    Icon: UsersIcon,
    title: "Join the Facebook Group",
    body: "The official Toyzoona buyers' group. Get exclusive deals, early auction previews, and direct inquiry access.",
    cta: "Join Group",
    href: "https://www.facebook.com/groups/642834551000763",
    color: "border-purple-500",
    numColor: "text-purple-400",
    iconColor: "text-purple-400",
  },
];

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="section-pad bg-tz-darker">
      <div className="container-max">
        <div className="text-center mb-14">
          <div className="tag mb-3">Simple Buying Process</div>
          <h2 className="heading-lg text-white">4 Ways to Buy from Toyzoona</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Whether you&apos;re a first-time buyer or a seasoned reseller, there&apos;s a buying path built for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className={`card-dark border-t-2 ${s.color} flex flex-col`}>
              <div className={`font-display font-black text-4xl ${s.numColor} mb-3`}>{s.num}</div>
              <s.Icon className={`w-6 h-6 ${s.iconColor} mb-3`} />
              <h3 className="font-display font-bold text-white text-lg mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{s.body}</p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 text-sm font-semibold ${s.numColor} hover:underline inline-flex items-center gap-1`}
              >
                {s.cta} →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-tz-card border border-tz-border rounded-2xl p-6 text-center flex items-center justify-center gap-3">
          <ClockIcon className="w-5 h-5 text-tz-orange shrink-0" />
          <p className="text-gray-400 text-sm">
            <strong className="text-white">Operating Hours:</strong>{" "}
            Monday – Saturday · 9:00 AM – 6:30 PM &nbsp;|&nbsp;
            <strong className="text-tz-orange">Saturday Auction</strong> starts ~10:00 AM &nbsp;|&nbsp;
            Closed Sundays
          </p>
        </div>
      </div>
    </section>
  );
}
