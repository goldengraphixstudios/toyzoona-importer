import type { Metadata } from "next";
import CmsAdminApp from "@/components/CmsAdminApp";

export const metadata: Metadata = {
  title: "Toyzoona Content Manager",
  description: "Toyzoona content manager for articles and buyer guides.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CmsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b1120] font-sans text-slate-100">
      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <CmsAdminApp />
      </section>
    </main>
  );
}
