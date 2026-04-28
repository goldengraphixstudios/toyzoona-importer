"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-tz-darker/90 backdrop-blur-md border-b border-tz-border">
      <div className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Toyzoona Importer" width={44} height={44} className="rounded-lg object-contain" />
          <span className="font-display font-black text-white text-lg hidden sm:block">
            TOYZOONA <span className="text-tz-orange">IMPORTER</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["Why Toyzoona", "How to Buy", "TV Feature", "Toyfair", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="https://www.facebook.com/groups/642834551000763"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-6 !text-sm"
          >
            Message Now
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-tz-card border-t border-tz-border px-4 pb-4 pt-2 space-y-3">
          {["Why Toyzoona", "How to Buy", "TV Feature", "Toyfair", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="block text-sm text-gray-400 hover:text-white py-1"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="https://www.facebook.com/groups/642834551000763"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-6 !text-sm inline-block"
          >
            Message Now
          </a>
        </div>
      )}
    </nav>
  );
}
