"use client";

import { useEffect, useMemo, useState } from "react";
import { GROUP_URL, formatCountdownParts, getLiveWindowState } from "@/lib/liveSchedule";

export default function LiveCountdown() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const isReady = now !== null;
  const state = useMemo(
    () =>
      now
        ? getLiveWindowState(now)
        : {
            isLiveNow: false,
            label: "Checking live hours",
            helper: "Countdown follows Monday to Saturday, 9:00 AM to 6:30 PM Philippine time.",
            target: Date.now(),
          },
    [now],
  );
  const parts = now ? formatCountdownParts(state.target - now.getTime()) : formatCountdownParts(0);

  return (
    <div id="live-hours" className="fade-up-4 mb-8 max-w-2xl scroll-mt-28 overflow-hidden rounded-[1.35rem] border-2 border-white/40 bg-white/14 p-3 shadow-[0_16px_34px_rgba(0,0,0,0.24)] backdrop-blur-md sm:p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${isReady && state.isLiveNow ? "bg-green-300 animate-pulse" : "bg-[#ffef3f]"}`} />
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffef3f]">
              {isReady ? state.label : "Checking live hours"}
            </p>
          </div>
          <p className="text-sm font-semibold leading-relaxed text-white/76">
            {isReady ? state.helper : "Countdown follows Monday to Saturday, 9:00 AM to 6:30 PM Philippine time."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {parts.map((part) => (
            <div key={part.label} className="min-w-14 rounded-xl border border-white/30 bg-[#080819]/50 px-3 py-2 text-center">
              <div className="font-display text-xl font-black leading-none text-white">
                {String(part.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-white/55">
                {part.label}
              </div>
            </div>
          ))}
          <a
            href={GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-white bg-[#ff4200] px-4 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_7px_0_#9b2200] transition-transform duration-300 hover:-translate-y-1"
          >
            Join live
          </a>
        </div>
      </div>
    </div>
  );
}
