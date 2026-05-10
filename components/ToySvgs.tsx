type ToySvgProps = {
  className?: string;
};

export function BearToy({ className = "" }: ToySvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle cx="31" cy="31" r="18" fill="#ffb347" stroke="#4b1b00" strokeWidth="6" />
      <circle cx="89" cy="31" r="18" fill="#ffb347" stroke="#4b1b00" strokeWidth="6" />
      <circle cx="60" cy="62" r="42" fill="#ffcf5a" stroke="#4b1b00" strokeWidth="7" />
      <circle cx="45" cy="55" r="6" fill="#4b1b00" />
      <circle cx="75" cy="55" r="6" fill="#4b1b00" />
      <ellipse cx="60" cy="72" rx="17" ry="13" fill="#fff2b2" stroke="#4b1b00" strokeWidth="5" />
      <path d="M55 69h10M60 69v8" stroke="#4b1b00" strokeWidth="5" strokeLinecap="round" />
      <path d="M34 91c13 14 38 15 52 0" stroke="#ff6b3d" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function TrainToy({ className = "" }: ToySvgProps) {
  return (
    <svg viewBox="0 0 140 100" className={className} fill="none" aria-hidden="true">
      <rect x="20" y="37" width="70" height="34" rx="9" fill="#00cfff" stroke="#4b1b00" strokeWidth="6" />
      <rect x="77" y="25" width="34" height="46" rx="8" fill="#ff4200" stroke="#4b1b00" strokeWidth="6" />
      <rect x="85" y="33" width="15" height="13" rx="3" fill="#fff" stroke="#4b1b00" strokeWidth="4" />
      <path d="M33 30h29v15H33z" fill="#ffef3f" stroke="#4b1b00" strokeWidth="5" />
      <path d="M112 61h14" stroke="#4b1b00" strokeWidth="6" strokeLinecap="round" />
      <circle cx="38" cy="77" r="12" fill="#fff" stroke="#4b1b00" strokeWidth="6" />
      <circle cx="86" cy="77" r="12" fill="#fff" stroke="#4b1b00" strokeWidth="6" />
      <circle cx="38" cy="77" r="4" fill="#ff4200" />
      <circle cx="86" cy="77" r="4" fill="#ff4200" />
    </svg>
  );
}

export function BlocksToy({ className = "" }: ToySvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <rect x="14" y="54" width="44" height="44" rx="8" fill="#ff4200" stroke="#4b1b00" strokeWidth="6" />
      <rect x="62" y="54" width="44" height="44" rx="8" fill="#00cfff" stroke="#4b1b00" strokeWidth="6" />
      <rect x="38" y="18" width="44" height="44" rx="8" fill="#ffef3f" stroke="#4b1b00" strokeWidth="6" />
      <path d="M31 81h11M79 81h11M55 45h11" stroke="#4b1b00" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function RocketToy({ className = "" }: ToySvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path d="M65 16c23 13 31 41 18 66L39 38c7-13 15-20 26-22Z" fill="#fff" stroke="#4b1b00" strokeWidth="7" />
      <path d="M39 38 26 57l22 5" fill="#00cfff" stroke="#4b1b00" strokeWidth="7" strokeLinejoin="round" />
      <path d="m83 82-19 13-5-22" fill="#9d4edd" stroke="#4b1b00" strokeWidth="7" strokeLinejoin="round" />
      <circle cx="64" cy="47" r="11" fill="#ffef3f" stroke="#4b1b00" strokeWidth="5" />
      <path d="M35 78c-11 3-18 10-22 23 13-4 20-11 23-22Z" fill="#ff4200" stroke="#4b1b00" strokeWidth="6" />
    </svg>
  );
}

export function BalloonToy({ className = "" }: ToySvgProps) {
  return (
    <svg viewBox="0 0 100 130" className={className} fill="none" aria-hidden="true">
      <ellipse cx="50" cy="42" rx="31" ry="36" fill="#ff79c6" stroke="#4b1b00" strokeWidth="7" />
      <path d="M50 78c-4 10-7 17-4 28 2 8 9 11 14 17" stroke="#4b1b00" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 80h16l-8 12-8-12Z" fill="#ffef3f" stroke="#4b1b00" strokeWidth="5" strokeLinejoin="round" />
      <path d="M39 25c5-8 15-11 23-7" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function StarToy({ className = "" }: ToySvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path
        d="m60 10 13 31 34 3-26 22 8 34-29-18-29 18 8-34-26-22 34-3 13-31Z"
        fill="#ffef3f"
        stroke="#4b1b00"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path d="M45 50h30M52 66h16" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function CarToy({ className = "" }: ToySvgProps) {
  return (
    <svg viewBox="0 0 140 90" className={className} fill="none" aria-hidden="true">
      <path d="M30 49 45 25h45l20 24h12c6 0 10 4 10 10v8H10v-8c0-6 4-10 10-10h10Z" fill="#7dff57" stroke="#4b1b00" strokeWidth="6" strokeLinejoin="round" />
      <path d="M49 31h17v18H38l11-18ZM73 31h14l15 18H73V31Z" fill="#fff" stroke="#4b1b00" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="38" cy="68" r="12" fill="#fff" stroke="#4b1b00" strokeWidth="6" />
      <circle cx="102" cy="68" r="12" fill="#fff" stroke="#4b1b00" strokeWidth="6" />
      <circle cx="38" cy="68" r="4" fill="#ff4200" />
      <circle cx="102" cy="68" r="4" fill="#ff4200" />
    </svg>
  );
}

export function YoYoToy({ className = "" }: ToySvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path d="M60 12v24" stroke="#4b1b00" strokeWidth="6" strokeLinecap="round" />
      <circle cx="60" cy="70" r="37" fill="#9d4edd" stroke="#4b1b00" strokeWidth="7" />
      <circle cx="60" cy="70" r="20" fill="#00cfff" stroke="#4b1b00" strokeWidth="6" />
      <circle cx="60" cy="70" r="7" fill="#ffef3f" stroke="#4b1b00" strokeWidth="4" />
      <path d="M60 36c-16 2-24 13-24 25" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export function ToyDisplaySvg({ className = "" }: ToySvgProps) {
  return (
    <svg viewBox="0 0 520 400" className={className} fill="none" aria-label="Animated Toyzoona toy box display">
      <rect x="56" y="78" width="408" height="266" rx="40" fill="#ffef3f" stroke="#4b1b00" strokeWidth="12" />
      <path d="M82 132h356" stroke="#4b1b00" strokeWidth="10" strokeLinecap="round" />
      <rect x="100" y="160" width="132" height="132" rx="22" fill="#fff" stroke="#4b1b00" strokeWidth="9" />
      <rect x="288" y="160" width="132" height="132" rx="22" fill="#fff" stroke="#4b1b00" strokeWidth="9" />
      <g className="animate-toy-hop">
        <circle cx="166" cy="219" r="43" fill="#ffb347" stroke="#4b1b00" strokeWidth="8" />
        <circle cx="151" cy="210" r="6" fill="#4b1b00" />
        <circle cx="181" cy="210" r="6" fill="#4b1b00" />
        <path d="M153 236c10 8 19 8 29 0" stroke="#4b1b00" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g className="animate-toy-wiggle">
        <path d="M354 177 392 260h-76l38-83Z" fill="#00cfff" stroke="#4b1b00" strokeWidth="8" strokeLinejoin="round" />
        <circle cx="354" cy="232" r="12" fill="#ff4200" stroke="#4b1b00" strokeWidth="6" />
      </g>
      <g className="animate-toy-card">
        <rect x="184" y="52" width="152" height="70" rx="24" fill="#ff4200" stroke="#4b1b00" strokeWidth="10" />
        <path d="M226 87h68" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
      </g>
      <path d="M92 328c68 26 272 25 336 0" stroke="#ff4200" strokeWidth="13" strokeLinecap="round" />
      <circle cx="86" cy="90" r="18" fill="#00cfff" stroke="#4b1b00" strokeWidth="8" />
      <circle cx="434" cy="90" r="18" fill="#9d4edd" stroke="#4b1b00" strokeWidth="8" />
      <path d="M52 358h416" stroke="#4b1b00" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}
