import { BoxIcon, GlobeIcon, HandshakeIcon, MedalIcon, NewspaperIcon, ScaleIcon, SparkleIcon, TrophyIcon, TruckIcon, TvIcon } from "@/components/Icons";

const badges = [
  { Icon: TvIcon, label: "Featured on National TV" },
  { Icon: TrophyIcon, label: "First in Southern Luzon" },
  { Icon: GlobeIcon, label: "UK + China Direct Imports" },
  { Icon: ScaleIcon, label: "Sold by the Kilo" },
  { Icon: MedalIcon, label: "Toyfair Participant" },
  { Icon: TruckIcon, label: "Ships Nationwide" },
  { Icon: HandshakeIcon, label: "Reseller-Friendly Pricing" },
  { Icon: NewspaperIcon, label: "Philippine STAR Featured" },
  { Icon: BoxIcon, label: "Warehouse in Cabuyao" },
  { Icon: SparkleIcon, label: "5-Star Buyer Reviews" },
];

function Item({ Icon, label }: { Icon: typeof TvIcon; label: string }) {
  return (
    <div className="flex items-center gap-3 shrink-0 px-7 py-0.5">
      <Icon className="h-4 w-4 text-white" />
      <span className="text-[12.5px] font-semibold text-white/85 whitespace-nowrap tracking-wide">
        {label}
      </span>
      <span className="ml-5 text-white/20 text-lg select-none">◆</span>
    </div>
  );
}

export default function TrustStrip() {
  const doubled = [...badges, ...badges];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.07]">
      {/* Gradient background */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(255,66,0,0.85) 0%, rgba(204,52,0,0.90) 40%, rgba(255,192,0,0.80) 100%)" }} />

      {/* Subtle dots pattern overlay */}
      <div className="absolute inset-0 bg-dots-warm opacity-20 pointer-events-none" />

      {/* Fade masks */}
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(204,52,0,0.9), transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, rgba(204,52,0,0.9), transparent)" }} />

      <div className="relative py-3.5">
        <div className="animate-marquee">
          {doubled.map((b, i) => (
            <Item key={i} Icon={b.Icon} label={b.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
