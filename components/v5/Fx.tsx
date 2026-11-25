import type { CSSProperties } from "react";

type Ray = { x?: string; y?: string; size?: string; o?: number; warm?: boolean };
type Glow = { x: string; y: string; size?: string; c?: string };
type Bokeh = { x: string; y: string; size: number; o?: number };
type Glint = { x: string; y: string; size?: number; o?: number; c?: string };

/**
 * Flat ambient layer: a static sunburst and a dot pattern, nothing blurred.
 * glows / bokeh / glints are still accepted so older call sites compile, but they are no longer drawn:
 * soft lens effects read as AI art next to the client's flat 2D toys.
 */
export default function Fx({
  rays = [],
  dots,
}: {
  rays?: Ray[];
  glows?: Glow[];
  bokeh?: Bokeh[];
  glints?: Glint[];
  dots?: { x?: string; y?: string; o?: number };
}) {
  const v = (o: Record<string, string | number | undefined>) => o as CSSProperties;
  if (!rays.length && !dots) return null;
  return (
    <div className="fx" aria-hidden="true">
      {rays.map((r, i) => (
        <span
          key={`r${i}`}
          className={`rays${r.warm ? " warm" : ""}`}
          style={v({ "--rx": r.x, "--ry": r.y, "--rs": r.size, "--ro": r.o })}
        />
      ))}
      {dots && <span className="dots" style={v({ "--dx": dots.x, "--dy": dots.y, "--do": dots.o })} />}
    </div>
  );
}
