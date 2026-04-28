import { MapPinIcon, ClockIcon, PhoneIcon, AuctionHammerIcon, MusicIcon, MailIcon } from "@/components/Icons";

const cards = [
  {
    Icon: MapPinIcon,
    title: "Location",
    info: "Gatcahalian Subdivision, Brgy. Banay 2, Cabuyao, Laguna",
  },
  {
    Icon: ClockIcon,
    title: "Hours",
    info: "Monday – Saturday · 9:00 AM – 6:30 PM\nClosed Sundays",
  },
  {
    Icon: PhoneIcon,
    title: "Contact",
    info: "+63 960 310 6916\nofficial.toyzoonaimporter@gmail.com",
  },
  {
    Icon: AuctionHammerIcon,
    title: "Saturday Auction",
    info: "Every Saturday starting ~10:00 AM at the Cabuyao warehouse",
  },
];

export default function FinalCTA() {
  return (
    <section id="contact" className="section-pad bg-tz-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-tz-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="tag mb-4">Ready to Source?</div>
          <h2 className="heading-lg text-white mb-6">
            Ready to Source Toys{" "}
            <span className="text-tz-orange">by the Kilo?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Whether you&apos;re a first-time buyer, an active reseller, or a bulk event sourcer —
            Toyzoona has a buying path for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.facebook.com/groups/642834551000763"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Join the Facebook Group
            </a>
            <a href="tel:+639603106916" className="btn-secondary">
              <PhoneIcon className="w-5 h-5" /> Call / Viber: +63 960 310 6916
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ Icon, title, info }) => (
            <div key={title} className="card-dark text-center">
              <Icon className="w-8 h-8 mx-auto mb-3 text-tz-orange" />
              <div className="font-display font-bold text-white mb-2 text-sm">{title}</div>
              <p className="text-gray-400 text-xs leading-relaxed whitespace-pre-line">{info}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
          <a
            href="https://www.tiktok.com/@toyzoonaimporter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <MusicIcon className="w-4 h-4" /> TikTok: @toyzoonaimporter
          </a>
          <a
            href="mailto:official.toyzoonaimporter@gmail.com"
            className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <MailIcon className="w-4 h-4" /> official.toyzoonaimporter@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
