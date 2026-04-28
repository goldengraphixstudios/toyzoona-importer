import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-tz-darker border-t border-tz-border py-10">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Toyzoona Importer" width={36} height={36} className="rounded-lg object-contain" />
            <div>
              <div className="font-display font-black text-white text-sm">TOYZOONA IMPORTER</div>
              <div className="text-xs text-gray-500">The South&apos;s First Toys-Per-Kilo Importer</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center sm:text-right">
            <p>Gatcahalian Subdivision, Brgy. Banay 2, Cabuyao, Laguna</p>
            <p className="mt-1">© {new Date().getFullYear()} Toyzoona Importer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
