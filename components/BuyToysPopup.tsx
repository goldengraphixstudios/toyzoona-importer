"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { assetPath } from "@/lib/assetPath";
const STORAGE_KEY = "toyzoona-buy-popup-dismissed";
const MESSENGER_URL = "https://m.me/ToyzoonaLaguna";

export default function BuyToysPopup() {
  const pathname = usePathname();
  const isCmsRoute = pathname?.includes("/cms");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isCmsRoute) return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "true") return;
    } catch {
      /* storage blocked: still show once */
    }
    const timeout = window.setTimeout(() => setVisible(true), 6000);
    return () => window.clearTimeout(timeout);
  }, [isCmsRoute]);

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible || isCmsRoute) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#12215F]/40 p-4 backdrop-blur-[3px] sm:items-center"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="buy-popup-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] overflow-hidden rounded-[30px] border-[3px] border-white bg-gradient-to-b from-[#FFF6D8] to-[#FFEBB5] px-6 pb-6 pt-5 text-center text-[#1E2B5E] shadow-[0_30px_70px_rgba(18,33,95,0.35)]"
        style={{ fontFamily: "var(--font-nunito), system-ui, sans-serif" }}
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-xl font-black leading-none text-[#12215F] shadow-[0_3px_8px_rgba(18,33,95,0.15)]"
          aria-label="Close"
        >
          ×
        </button>
        <img src={assetPath("/v5/media/logo-hd.png")} alt="Toyzoona Importer" width={1479} height={801} className="mx-auto w-44 drop-shadow-[0_6px_10px_rgba(10,40,120,0.25)]" />
        <img src={assetPath("/v5/flat/crate.svg")} alt="" className="mx-auto -mt-1 w-24" />
        <h2 id="buy-popup-title" className="mt-1 text-[34px] font-extrabold leading-none text-[#12215F]" style={{ fontFamily: "var(--font-baloo), system-ui, sans-serif" }}>
          Want today’s stock?
        </h2>
        <p className="mx-auto mt-2 max-w-[30ch] text-[16px] font-bold leading-snug text-[#4A5880]">
          Message us for photos of what just arrived, today’s per-kilo rate, and warehouse visit details.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={MESSENGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#FFE869] via-[#FFD02A] to-[#F7BB0B] px-6 pb-3.5 pt-4 text-[19px] font-extrabold leading-none text-[#12215F] shadow-[inset_0_2px_0_rgba(255,255,255,.65),0_5px_0_#D99A00,0_12px_22px_rgba(217,154,0,.3)] transition-[translate] hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-baloo), system-ui, sans-serif" }}
          >
            Message Toyzoona
          </a>
          <button type="button" onClick={dismiss} className="text-[15px] font-extrabold text-[#1F6FE5] underline-offset-4 hover:underline">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
