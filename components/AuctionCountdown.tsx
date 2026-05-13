"use client";

import { useEffect, useMemo, useState } from "react";
import { FACEBOOK_PAGE_URL } from "@/lib/socialLinks";

const MANILA_TIMEZONE = "Asia/Manila";
const AUCTION_HOUR = 10;

type ManilaNow = {
  year: number;
  month: number;
  day: number;
  weekday: number;
};

function getManilaNow(date: Date): ManilaNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MANILA_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "0";
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: weekdayMap[get("weekday")] ?? 0,
  };
}

function manilaTimestamp(year: number, month: number, day: number, hour: number) {
  return Date.UTC(year, month - 1, day, hour - 8, 0, 0, 0);
}

function getNextAuction(nowDate: Date) {
  const now = getManilaNow(nowDate);
  const todayAuction = manilaTimestamp(now.year, now.month, now.day, AUCTION_HOUR);
  const isSaturdayBeforeAuction = now.weekday === 6 && nowDate.getTime() < todayAuction;
  const daysUntilSaturday = isSaturdayBeforeAuction ? 0 : (6 - now.weekday + 7) % 7 || 7;
  const target = manilaTimestamp(now.year, now.month, now.day + daysUntilSaturday, AUCTION_HOUR);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: MANILA_TIMEZONE,
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(target));

  return { target, dateLabel };
}

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];
}

export default function AuctionCountdown() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const auction = useMemo(() => (now ? getNextAuction(now) : null), [now]);
  const parts = now && auction ? formatTime(auction.target - now.getTime()) : formatTime(0);

  return (
    <div className="rounded-[1.35rem] border-2 border-[#ffef3f]/35 bg-[#ffef3f]/10 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.20)] backdrop-blur-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffef3f]">Next Saturday Auction</p>
          <h3 className="mt-1 font-display text-2xl font-black leading-none text-white">
            {auction ? auction.dateLabel : "Checking date"} · 10:00 AM PHT
          </h3>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-white/68">
            Grand auction stock previews, toy lots, and per-kilo bidding updates are posted on the Toyzoona Facebook page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {parts.map((part) => (
            <div key={part.label} className="min-w-14 rounded-xl border border-white/20 bg-[#080819]/64 px-3 py-2 text-center">
              <div className="font-display text-xl font-black leading-none text-white">
                {String(part.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-white/52">{part.label}</div>
            </div>
          ))}
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-white bg-[#ff4200] px-4 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_7px_0_#9b2200] transition-transform duration-300 hover:-translate-y-1"
          >
            View Facebook Updates
          </a>
        </div>
      </div>
    </div>
  );
}
