"use client";

import { useEffect, useMemo, useState } from "react";

const GROUP_URL = "https://www.facebook.com/groups/642834551000763";
const MANILA_TIMEZONE = "Asia/Manila";
const OPEN_MINUTES = 9 * 60;
const CLOSE_MINUTES = 18 * 60 + 30;

type ManilaNow = {
  year: number;
  month: number;
  day: number;
  weekday: number;
  minutes: number;
};

function getManilaNow(date: Date): ManilaNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MANILA_TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "0";
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: weekdayMap[get("weekday")] ?? 0,
    minutes: hour * 60 + minute,
  };
}

function manilaTimestamp(year: number, month: number, day: number, hour: number, minute: number) {
  return Date.UTC(year, month - 1, day, hour - 8, minute, 0, 0);
}

function addManilaDays(now: ManilaNow, days: number) {
  const utc = manilaTimestamp(now.year, now.month, now.day + days, 0, 0);
  const date = new Date(utc);

  return getManilaNow(date);
}

function getNextTarget(nowDate: Date) {
  const now = getManilaNow(nowDate);
  const isLiveDay = now.weekday >= 1 && now.weekday <= 6;
  const isLiveNow = isLiveDay && now.minutes >= OPEN_MINUTES && now.minutes < CLOSE_MINUTES;

  if (isLiveNow) {
    return {
      isLiveNow,
      label: "We are live now",
      helper: "Live selling and orders are open until 6:30 PM Philippine time.",
      target: manilaTimestamp(now.year, now.month, now.day, 18, 30),
    };
  }

  if (isLiveDay && now.minutes < OPEN_MINUTES) {
    return {
      isLiveNow,
      label: "Live selling opens soon",
      helper: "Countdown to today's 9:00 AM Philippine time opening.",
      target: manilaTimestamp(now.year, now.month, now.day, 9, 0),
    };
  }

  const daysUntilNextOpen =
    now.weekday === 0 ? 1 : now.weekday === 6 ? 2 : isLiveDay ? 1 : 1;
  const next = addManilaDays(now, daysUntilNextOpen);

  return {
    isLiveNow,
    label: "Next live window",
    helper: "Countdown to the next 9:00 AM Philippine time buying window.",
    target: manilaTimestamp(next.year, next.month, next.day, 9, 0),
  };
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
        ? getNextTarget(now)
        : {
            isLiveNow: false,
            label: "Checking live hours",
            helper: "Countdown follows Monday to Saturday, 9:00 AM to 6:30 PM Philippine time.",
            target: Date.now(),
          },
    [now],
  );
  const parts = now ? formatTime(state.target - now.getTime()) : formatTime(0);

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
