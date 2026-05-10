"use client";
import { useState } from "react";

const faqs = [
  {
    q: "What is the toys-per-kilo model?",
    a: "Instead of buying individual toys at retail price, you purchase toys by weight (kilogram). You choose a mix of toys from our available stock, they get weighed, and you pay based on the per-kilo rate. This means more toys for less money — perfect for resellers, bulk buyers, event organizers, and parents shopping for variety.",
  },
  {
    q: "Where are the toys imported from?",
    a: "Toyzoona Importer sources brand-new toys directly from the United Kingdom and China. As the Philippines' first toys-per-kilo importer in Southern Luzon, we have established sourcing channels that deliver consistent quality at import-level pricing.",
  },
  {
    q: "When is the Saturday auction and how does it work?",
    a: "Every Saturday at ~10:00 AM at our Cabuyao, Laguna warehouse. The auction is open to walk-in buyers and Facebook group members. You can view, sort, and bid on lots of toys. The per-kilo rate is the most competitive during auction events. Join our Facebook group for advance schedules and previews.",
  },
  {
    q: "Can I buy without attending in person?",
    a: "Yes! We offer live selling via Facebook and TikTok Monday through Saturday, 9:00 AM – 6:30 PM. Watch the live stream, request your toy picks, and we'll pack and ship them to you nationwide. All orders are accommodated through the Facebook group and direct message.",
  },
  {
    q: "Do you ship nationwide across the Philippines?",
    a: "Yes, we ship to all provinces across the Philippines. Shipping fees are shouldered by the buyer and calculated based on weight and destination. We work with trusted couriers to ensure your orders arrive safely and in good condition.",
  },
  {
    q: "Are the toys brand new?",
    a: "Absolutely. All toys sourced by Toyzoona Importer are brand new — imported directly from the UK and China. We do not sell secondhand or pre-loved toys. Our per-kilo model gives you access to brand-new toys at prices far below individual retail.",
  },
  {
    q: "Is Toyzoona Importer a legitimate business?",
    a: "Yes — we have been featured on Gud Morning Kapatid (national TV), covered by the Philippine STAR, and have participated in major toy fairs including Dasma Arena, Filinvest Tent, and Metrotent Pasig. We have thousands of verified buyers in our Facebook community. All media coverage is publicly accessible for you to verify.",
  },
  {
    q: "Can I visit the warehouse?",
    a: "Yes! Our warehouse is located at Gatcahalian Subdivision, Brgy. Banay 2, Cabuyao, Laguna. Walk-ins are welcome Monday through Saturday, 9:00 AM – 6:30 PM. Browse the full inventory in person, choose your toys, and pay after weighing.",
  },
  {
    q: "Who is Toyzoona best suited for?",
    a: "Toyzoona is built for resellers who need volume at great margins, live sellers who want fresh and varied stock, parents looking for affordable gifts, event organizers sourcing giveaways, and anyone who wants variety and value in one place. If you buy more than 5–10 toys at a time, the per-kilo model works in your favor.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-tz-bg relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-fine opacity-100 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(157,78,221,0.05) 0%, transparent 70%)" }} />

      <div className="wrap relative z-10">

        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left — sticky label */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-tz-border" />
              <span className="section-num">FAQ</span>
            </div>
            <h2 className="display-xl text-tz-text mb-5">
              Got<br />
              <span className="text-gradient-purple">Questions?</span>
            </h2>
            <p className="body-md mb-8">
              Everything you need to know about buying from
              Toyzoona Importer — from the per-kilo model to
              shipping and auctions.
            </p>
            <a
              href="https://www.facebook.com/groups/642834551000763"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Ask in the Group
            </a>
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-tz-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                  open === i
                    ? "border-tz-purple/30 shadow-[0_0_30px_rgba(157,78,221,0.07)]"
                    : "border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left
                             transition-colors duration-200"
                >
                  <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
                    open === i ? "text-tz-text" : "text-tz-muted"
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                  border transition-all duration-300 ${
                    open === i
                      ? "border-tz-purple/40 bg-tz-purple/10 rotate-180"
                      : "border-white/[0.08] bg-white/[0.03]"
                  }`}>
                    <svg
                      className={`w-4 h-4 transition-colors duration-200 ${
                        open === i ? "text-tz-purpleLight" : "text-tz-dim"
                      }`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-350 ease-in-out ${
                  open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-6 pb-6 border-t border-white/[0.05]">
                    <p className="text-sm text-tz-muted leading-relaxed pt-4">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
