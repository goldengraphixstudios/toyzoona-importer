export { FACEBOOK_PAGE_URL } from "@/lib/socialLinks";

const MANILA_TIMEZONE = "Asia/Manila";
const AUCTION_HOUR = 11;

type ManilaNow = {
  year: number;
  month: number;
  day: number;
  weekday: number;
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

export function getLiveWindowState(nowDate: Date): LiveWindowState {
  const now = getManilaNow(nowDate);
  const todayAuction = manilaTimestamp(now.year, now.month, now.day, AUCTION_HOUR);
  const isSaturdayBeforeAuction = now.weekday === 6 && nowDate.getTime() < todayAuction;
  const daysUntilSaturday = isSaturdayBeforeAuction ? 0 : (6 - now.weekday + 7) % 7 || 7;

  return {
    isLiveNow: false,
    label: "Next Saturday Auction",
    helper: "Countdown to Saturday, 11:00 AM Philippine time.",
    target: manilaTimestamp(now.year, now.month, now.day + daysUntilSaturday, AUCTION_HOUR),
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
