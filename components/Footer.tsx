import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, NewspaperIcon, PhoneIcon, ScaleIcon, TvIcon } from "@/components/Icons";
import { assetPath } from "@/lib/assetPath";

const navLinks = [
  { label: "Products",      href: "/#products" },
  { label: "Live Hours",    href: "/#live-hours" },
  { label: "How to Buy",    href: "/#how-to-buy" },
  { label: "Media",         href: "/#media" },
  { label: "Toyfair",       href: "/#toyfair" },
  { label: "Reviews",       href: "/#reviews" },
  { label: "Blog",          href: "/blog" },
  { label: "FAQ",           href: "/#faq" },
  { label: "Contact",       href: "/#contact" },
];

const socials = [
  {
    label: "Facebook Group",
    href: "https://www.facebook.com/groups/642834551000763",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@toyzoonaimporter",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.68a8.17 8.17 0 004.78 1.52V6.73a4.86 4.86 0 01-1.01-.04z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ToyzoonaImporter",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/toyzoona-importer",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.447-2.136 2.941v5.665H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.371 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-tz-darker border-t border-white/[0.06] relative overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,66,0,0.4), rgba(255,192,0,0.3), transparent)" }} />

      <div className="wrap py-14">

        {/* Top section */}
        <div className="flex flex-col lg:flex-row gap-12 pb-12 border-b border-white/[0.06]">

          {/* Brand column */}
          <div className="flex-1 max-w-xs">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl blur-md"
                  style={{ background: "rgba(255,66,0,0.2)" }} />
                <Image
                  src={assetPath("/logo.png")}
                  alt="Toyzoona Importer"
                  width={44}
                  height={44}
                  className="relative rounded-xl object-contain"
                />
              </div>
              <div>
                <div className="font-display font-black text-[14px] tracking-tight text-tz-text leading-tight">
                  TOYZOONA
                  <span className="text-gradient-orange"> IMPORTER</span>
                </div>
                <div className="text-[10px] text-tz-dim mt-0.5 tracking-wider">
                  The South&apos;s First Toys-Per-Kilo
                </div>
              </div>
            </div>
            <p className="text-tz-dim text-sm leading-relaxed mb-5">
              UK preloved toys and China brand-new toys sold by the kilo.
              Featured on national television. Trusted by buyers
              across the Philippines since day one.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <span className="pill text-[10px]"><TvIcon className="h-3.5 w-3.5" /> On TV</span>
              <span className="pill-amber text-[10px]"><NewspaperIcon className="h-3.5 w-3.5" /> Press</span>
              <span className="pill-glass text-[10px]"><ScaleIcon className="h-3.5 w-3.5" /> Per Kilo</span>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="flex flex-col sm:flex-row gap-10 lg:gap-16">
            <div>
              <div className="text-[11px] font-bold text-tz-dim uppercase tracking-widest mb-4">
                Navigation
              </div>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-tz-dim hover:text-tz-text transition-colors duration-200
                                 hover:translate-x-1 inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-tz-orange/40 group-hover:bg-tz-orange
                                       transition-colors duration-200" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[11px] font-bold text-tz-dim uppercase tracking-widest mb-4">
                Contact
              </div>
              <ul className="space-y-3 text-sm text-tz-dim">
                <li className="font-medium text-tz-muted">
                  <span className="inline-flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    Cabuyao, Laguna, PH
                  </span>
                </li>
                <li>
                  <a href="https://wa.me/639293781462"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-tz-text transition-colors font-medium">
                    <PhoneIcon className="h-4 w-4" />
                    WhatsApp: +63 929 378 1462
                  </a>
                </li>
                <li>
                  <a href="viber://chat?number=%2B639293781462"
                    className="inline-flex items-center gap-2 hover:text-tz-text transition-colors font-medium">
                    <PhoneIcon className="h-4 w-4" />
                    Viber-ready: +63 929 378 1462
                  </a>
                </li>
                <li>
                  <a href="mailto:official.toyzoonaimporter@gmail.com"
                    className="inline-flex items-center gap-2 hover:text-tz-text transition-colors break-all text-xs">
                    <MailIcon className="h-4 w-4 shrink-0" />
                    official.toyzoonaimporter@gmail.com
                  </a>
                </li>
                <li className="pt-2">
                  <div className="text-[11px] font-bold text-tz-dim uppercase tracking-widest mb-3">
                    Follow Us
                  </div>
                  <div className="flex flex-col gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-tz-dim hover:text-tz-text
                                   transition-colors duration-200"
                      >
                        {s.icon}
                        {s.label}
                        <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[11px] text-tz-dim">
            © {new Date().getFullYear()} Toyzoona Importer. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-tz-dim">
              Open Mon–Sat &nbsp;·&nbsp; Cabuyao, Laguna, Philippines
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
