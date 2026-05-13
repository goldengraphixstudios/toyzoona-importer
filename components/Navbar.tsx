"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { assetPath } from "@/lib/assetPath";
import { FACEBOOK_PAGE_URL } from "@/lib/socialLinks";

const links = [
  { label: "Products",     href: "/#products" },
  { label: "Live Hours",   href: "/#live-hours" },
  { label: "How to Buy",   href: "/#how-to-buy" },
  { label: "Proof",        href: "/#media" },
  { label: "Blog",         href: "/blog" },
  { label: "Contact",      href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[60] transition-all duration-100"
        style={{
          width: `${scrollPct}%`,
          background: "linear-gradient(90deg, #FF4200, #FFC000, #9D4EDD)",
        }}
      />

      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-tz-bg/80 backdrop-blur-2xl border-b border-white/[0.07] shadow-[0_2px_40px_rgba(0,0,0,0.7)]"
            : "bg-transparent"
        }`}
      >
        <div className="wrap flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-tz-orange/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <Image
                src={assetPath("/logo.png")}
                alt="Toyzoona Importer"
                width={42}
                height={42}
                className="relative rounded-xl object-contain drop-shadow-lg"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-black text-[14px] tracking-tight text-tz-text leading-tight">
                TOYZOONA
                <span className="text-gradient-orange"> IMPORTER</span>
              </div>
              <div className="text-[10px] text-tz-dim font-medium tracking-wider">
                The South&apos;s First Toys-Per-Kilo
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="relative px-4 py-2 text-[13px] font-medium text-tz-muted hover:text-tz-text
                           transition-colors duration-200 rounded-lg hover:bg-white/[0.04] group"
              >
                {label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-tz-orange
                                 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-primary !py-2.5 !px-5 !text-xs !rounded-xl"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Message Page
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]
                       rounded-xl border border-white/[0.08] hover:border-white/[0.16]
                       bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-200"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-tz-text transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-tz-text transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-tz-text transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-350 ease-in-out
                      bg-tz-bg/95 backdrop-blur-2xl border-b border-white/[0.07]
                      ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="wrap py-5 space-y-1">
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 text-sm font-medium text-tz-muted hover:text-tz-text
                           py-3 px-4 rounded-xl hover:bg-white/[0.04] transition-all duration-200"
                onClick={() => setOpen(false)}
              >
                <span className="w-1 h-1 rounded-full bg-tz-orange/60" />
                {label}
              </Link>
            ))}
            <div className="pt-3 pb-1">
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center !text-sm"
                onClick={() => setOpen(false)}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Message the Facebook Page
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
