import type { CSSProperties } from "react";

type Ray = { x?: string; y?: string; size?: string; o?: number; warm?: boolean };
type Glow = { x: string; y: string; size?: string; c?: string };
type Bokeh = { x: string; y: string; size: number; o?: number };
type Glint = { x: string; y: string; size?: number; o?: number; c?: string };

/** Ambient light layer: slow sun rays, soft glows, bokeh and glints. Purely decorative. */
export default function Fx({
  rays = [],
  glows = [],
  bokeh = [],
  glints = [],
  dots,
}: {
  rays?: Ray[];
  glows?: Glow[];
  bokeh?: Bokeh[];
  glints?: Glint[];
  dots?: { x?: string; y?: string; o?: number };
}) {
  const v = (o: Record<string, string | number | undefined>) => o as CSSProperties;
  return (
    <div className="fx" aria-hidden="true">
      {glows.map((g, i) => (
        <span key={`g${i}`} className="glow" style={v({ left: g.x, top: g.y, "--gs": g.size, "--gc": g.c })} />
      ))}
      {rays.map((r, i) => (
        <span
          key={`r${i}`}
          className={`rays${r.warm ? " warm" : ""}`}
          style={v({ "--rx": r.x, "--ry": r.y, "--rs": r.size, "--ro": r.o })}
        />
      ))}
      {dots && <span className="dots" style={v({ "--dx": dots.x, "--dy": dots.y, "--do": dots.o })} />}
      {bokeh.map((b, i) => (
        <span key={`b${i}`} className="bok" data-par="" style={v({ left: b.x, top: b.y, "--bs": `${b.size}px`, "--bo": b.o })} />
      ))}
      {glints.map((g, i) => (
        <span key={`l${i}`} className="gl" data-tw="" style={v({ left: g.x, top: g.y, "--s": `${g.size ?? 18}px`, "--o": g.o, "--gc": g.c })}>
          <svg viewBox="0 0 40 40">
            <path d="M20 0C21.5 13 27 18.5 40 20 27 21.5 21.5 27 20 40 18.5 27 13 21.5 0 20 13 18.5 18.5 13 20 0Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
