import { assetPath } from "./assetPath";

/** Widths generated for every photo in /public/v5/img (see scratchpad opt.py). */
const WIDTHS = [480, 800, 1200] as const;
export type PicWidth = (typeof WIDTHS)[number];

/** Map an original photo path to its /v5/img variant base, or null if it has none. */
function variantBase(src: string): string | null {
  let m = src.match(/^\/v5\/ph\/(.+)\.webp$/);
  if (m) return `/v5/img/${m[1]}`;
  m = src.match(/^\/v5\/media\/(.+)\.jpg$/);
  if (m) return `/v5/img/poster-${m[1]}`;
  m = src.match(/^\/v5\/img\/(.+)-(?:480|800|1200)\.webp$/);
  if (m) return `/v5/img/${m[1]}`;
  return null;
}

/** One fixed-size variant, e.g. for a video poster (no srcset there). */
export function picAt(src: string, w: PicWidth): string {
  const b = variantBase(src);
  return assetPath(b ? `${b}-${w}.webp` : src);
}

/**
 * Responsive <img> props: small files for phones, sharper ones for desktop/retina.
 * `sizes` describes the rendered width so the browser picks the right file.
 */
export function pic(src: string, sizes: string) {
  const b = variantBase(src);
  if (!b) return { src: assetPath(src) };
  return {
    src: assetPath(`${b}-800.webp`),
    srcSet: WIDTHS.map((w) => `${assetPath(`${b}-${w}.webp`)} ${w}w`).join(", "),
    sizes,
  };
}
