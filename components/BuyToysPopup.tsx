"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FACEBOOK_PAGE_URL } from "@/lib/socialLinks";
const STORAGE_KEY = "toyzoona-buy-popup-dismissed";

export default function BuyToysPopup() {
  const pathname = usePathname();
  const isCmsRoute = pathname?.includes("/cms");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isCmsRoute) {
      return;
    }

    if (window.sessionStorage.getItem(STORAGE_KEY) === "true") {
      return;
    }

    const timeout = window.setTimeout(() => setVisible(true), 1800);
    return () => window.clearTimeout(timeout);
  }, [isCmsRoute]);

  const dismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible || isCmsRoute) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/42 p-4 backdrop-blur-sm sm:items-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-[1.8rem] border-2 border-white bg-[#ffef3f] p-5 text-[#4b1b00] shadow-[0_26px_80px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#4b1b00] bg-white text-lg font-black"
          aria-label="Close popup"
        >
          x
        </button>

        <div className="mb-4 inline-flex rounded-full bg-[#ff4200] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
          Toyzoona Importer
        </div>
        <h2 className="font-display text-4xl font-black leading-[0.9] tracking-tight">
          Buy Toys Per Kilo
        </h2>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-[#4b1b00]/75">
          Message the official Facebook page for current stock, warehouse visit details,
          live selling links, and per-kilo toy availability.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-2xl border-2 border-white bg-[#ff4200] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_9px_0_#9b2200] transition-transform duration-300 hover:-translate-y-1"
          >
            Go to Facebook Page
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-2xl border-2 border-[#4b1b00] bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em]"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
