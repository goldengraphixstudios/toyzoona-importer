export { FACEBOOK_PAGE_URL } from "@/lib/socialLinks";

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

export type LiveWindowState = {
  isLiveNow: boolean;
  label: string;
  helper: string;
  target: number;
};

export type CountdownPart = {
  value: number;
  label: "Days" | "Hours" | "Min" | "Sec";
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

export function getLiveWindowState(nowDate: Date): LiveWindowState {
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

export function formatCountdownParts(ms: number): CountdownPart[] {
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
