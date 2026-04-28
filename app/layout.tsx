import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toyzoona Importer | The South's First Toys-Per-Kilo Importer",
  description:
    "Toyzoona Importer — the Philippines' first toys-per-kilo importer from the UK and China. As seen on national TV. Saturday auctions, live selling, warehouse visits. Cabuyao, Laguna.",
  keywords:
    "toys per kilo, toy importer Philippines, toyzoona, Cabuyao toys, reseller toys, bulk toys, Saturday auction, live selling toys",
  openGraph: {
    title: "Toyzoona Importer | The South's First Toys-Per-Kilo Importer",
    description:
      "As seen on national TV. UK and China imports. Saturday auctions. Serving resellers, families, and bulk buyers. Based in Cabuyao, Laguna.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
