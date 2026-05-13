"use client";
import { useEffect, useState } from "react";
import { FACEBOOK_PAGE_URL } from "@/lib/socialLinks";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Floating Messenger / Facebook button (desktop) ── */}
      <a
        href={FACEBOOK_PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-36 right-6 z-50 hidden md:flex items-center gap-3
                    text-white font-bold text-sm px-5 py-3.5 rounded-2xl
                    shadow-[0_8px_32px_rgba(255,66,0,0.40)]
                    hover:shadow-[0_12px_44px_rgba(255,66,0,0.55)]
                    hover:-translate-y-1 active:translate-y-0
                    transition-all duration-300 group
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}
        style={{
          background: "linear-gradient(135deg, #FF4200, #CC3400)",
          border: "1px solid rgba(255,106,61,0.5)",
        }}
      >
        {/* Pulse ring */}
        {pulse && (
          <span className="absolute inset-0 rounded-2xl animate-ping opacity-30 pointer-events-none"
            style={{ background: "rgba(255,66,0,0.6)" }} />
        )}
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span className="whitespace-nowrap">Message Page &amp; Order Now</span>
        <svg
          className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform duration-200"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>

    </>
  );
}
