import type { Metadata } from "next";
import { Baloo_2, Fredoka, Nunito } from "next/font/google";
import BuyToysPopup from "@/components/BuyToysPopup";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  // Only the old CMS/blog chrome uses Fredoka; v5 pages use Baloo 2 + Nunito, so don't preload it.
  preload: false,
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

// The picture shown when a link is shared on Facebook, Messenger, Viber and so on.
// Absolute URL because the site lives under /toyzoona-importer/ on GitHub Pages.
const shareImage = {
  url: "https://goldengraphixstudios.github.io/toyzoona-importer/og-cover.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Toyzoona Importer. Big toy hauls, by the kilo. A crate of toys on a scale outside the warehouse, with a waving teddy bear.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://goldengraphixstudios.github.io/toyzoona-importer/"),
  title: "Toyzoona Importer | The South's First Toys-Per-Kilo Importer",
  description:
    "Toyzoona Importer is a toys-per-kilo supplier with UK preloved toys and China brand-new stock. As seen on national TV. Saturday auctions, live selling, warehouse visits. Cabuyao, Laguna.",
  keywords:
    "toys per kilo, toy importer Philippines, toyzoona, Cabuyao toys, reseller toys, bulk toys, Saturday auction, live selling toys, UK toys, China toys, Laguna toy importer",
  openGraph: {
    title: "Toyzoona Importer | The South's First Toys-Per-Kilo Importer",
    description:
      "As seen on national TV. UK preloved toys, China brand-new stock, and Saturday auctions for resellers, families, and bulk buyers. Based in Cabuyao, Laguna.",
    type: "website",
    siteName: "Toyzoona Importer",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toyzoona Importer | The South's First Toys-Per-Kilo Importer",
    description:
      "As seen on national TV. UK preloved toys, China brand-new stock, and Saturday auctions. Cabuyao, Laguna.",
    images: [shareImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${baloo.variable} ${nunito.variable} antialiased`}>
        {children}
        <BuyToysPopup />
      </body>
    </html>
  );
}
