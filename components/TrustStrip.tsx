import { TvIcon, TrophyIcon, GlobeIcon, WeightIcon, EventIcon, TruckIcon, UsersIcon } from "@/components/Icons";

const badges = [
  { Icon: TvIcon,      label: "Featured on National TV" },
  { Icon: TrophyIcon,  label: "First in the South" },
  { Icon: GlobeIcon,   label: "UK + China Imports" },
  { Icon: WeightIcon,  label: "Sold by the Kilo" },
  { Icon: EventIcon,   label: "Major Toyfair Participant" },
  { Icon: TruckIcon,   label: "Ships Nationwide" },
  { Icon: UsersIcon,   label: "Reseller Friendly" },
];

export default function TrustStrip() {
  return (
    <section className="bg-tz-card border-y border-tz-border py-6 overflow-hidden">
      <div className="flex">
        <div className="flex gap-4 px-4 flex-wrap justify-center w-full">
          {badges.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 bg-tz-dark border border-tz-border rounded-full px-5 py-2.5 whitespace-nowrap"
            >
              <Icon className="w-4 h-4 text-tz-orange shrink-0" />
              <span className="text-sm font-semibold text-gray-200">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
