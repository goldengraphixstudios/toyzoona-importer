import type { Metadata } from "next";
import { Baloo_2, Fredoka } from "next/font/google";
import BuyToysPopup from "@/components/BuyToysPopup";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goldengraphixstudios.github.io/toyzoona-importer/"),
  title: "Toyzoona Importer | The South's First Toys-Per-Kilo Importer",
  description:
    "Toyzoona Importer — toys-per-kilo supplier with UK preloved toys and China brand-new stock. As seen on national TV. Saturday auctions, live selling, warehouse visits. Cabuyao, Laguna.",
  keywords:
    "toys per kilo, toy importer Philippines, toyzoona, Cabuyao toys, reseller toys, bulk toys, Saturday auction, live selling toys, UK toys, China toys, Laguna toy importer",
  openGraph: {
    title: "Toyzoona Importer | The South's First Toys-Per-Kilo Importer",
    description:
      "As seen on national TV. UK preloved toys, China brand-new stock, and Saturday auctions for resellers, families, and bulk buyers. Based in Cabuyao, Laguna.",
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
      <body className={`${fredoka.variable} ${baloo.variable} antialiased`}>
        {children}
        <BuyToysPopup />
      </body>
    </html>
  );
}
