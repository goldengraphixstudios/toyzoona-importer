"use client";

import { useEffect, useMemo, useState } from "react";
import { FACEBOOK_GROUP_URL, formatCountdownParts, getLiveWindowState } from "@/lib/liveSchedule";

export default function BottomCountdown() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const state = useMemo(
    () =>
      now
        ? getLiveWindowState(now)
        : {
            isLiveNow: false,
            label: "Checking live hours",
            helper: "Mon-Sat, 9:00 AM to 6:30 PM Philippine time.",
            target: Date.now(),
          },
    [now],
  );
  const parts = now ? formatCountdownParts(state.target - now.getTime()) : formatCountdownParts(0);

  return (
    <aside
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[70] border-t-[5px] border-[#4b1b00] bg-[#ffef3f] px-3 pb-[calc(0.85rem+env(safe-area-inset-bottom))] pt-3 text-[#4b1b00] shadow-[0_-18px_50px_rgba(0,0,0,0.32)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#ff4200,#00cfff,#9d4edd,#ff4200)]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative hidden h-16 w-16 shrink-0 place-items-center rounded-2xl border-[4px] border-[#4b1b00] bg-white shadow-[0_7px_0_#ff4200] sm:grid">
            <span className={`absolute right-1.5 top-1.5 h-3 w-3 rounded-full ${state.isLiveNow ? "animate-pulse bg-green-500" : "bg-[#ff4200]"}`} />
            <svg className="h-9 w-9 animate-toy-hop" viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <rect x="18" y="48" width="84" height="50" rx="14" fill="#00cfff" stroke="#4b1b00" strokeWidth="7" />
              <path d="M36 48V32c0-13 11-23 24-23s24 10 24 23v16" stroke="#4b1b00" strokeWidth="7" strokeLinecap="round" />
              <path d="M42 71h36M50 86h20" stroke="#4b1b00" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border-2 border-[#4b1b00] bg-[#ff4200] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[0_4px_0_#9b2200]">
                {state.isLiveNow ? "Live now" : "Countdown"}
              </span>
              <p className="font-display text-xl font-black leading-none tracking-[-0.03em] sm:text-2xl">
                {state.label}
              </p>
            </div>
            <p className="mt-1 text-xs font-bold leading-snug text-[#4b1b00]/75 sm:text-sm">
              {state.helper} Mon-Sat schedule, Philippine time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="grid flex-1 grid-cols-4 gap-1.5 sm:gap-2 md:flex-none">
            {parts.map((part) => (
              <div
                key={part.label}
                className="min-w-0 rounded-2xl border-[3px] border-[#4b1b00] bg-white px-2 py-2 text-center shadow-[0_6px_0_#ff4200] sm:min-w-[82px] sm:px-3"
              >
                <div className="font-display text-2xl font-black leading-none tracking-[-0.04em] text-[#ff4200] sm:text-4xl">
                  {String(part.value).padStart(2, "0")}
                </div>
                <div className="mt-0.5 text-[8px] font-black uppercase tracking-[0.14em] text-[#4b1b00]/70 sm:text-[10px]">
                  {part.label}
                </div>
              </div>
            ))}
          </div>
          <a
            href={FACEBOOK_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-[68px] items-center justify-center rounded-2xl border-[3px] border-[#4b1b00] bg-[#ff4200] px-5 font-black uppercase tracking-[0.08em] text-white shadow-[0_7px_0_#9b2200] transition-transform duration-300 hover:-translate-y-1 active:translate-y-0 sm:inline-flex"
          >
            Join FB Group
          </a>
        </div>

        <a
          href={FACEBOOK_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center rounded-2xl border-[3px] border-[#4b1b00] bg-[#ff4200] text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_6px_0_#9b2200] sm:hidden"
        >
          Join Facebook Group
        </a>
      </div>
    </aside>
  );
}
