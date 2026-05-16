import type { Metadata } from "next";
import { Suspense } from "react";
import SupabaseBlogArticle from "@/components/SupabaseBlogArticle";

export const metadata: Metadata = {
  title: "Toyzoona CMS Article",
  description: "Database-backed Toyzoona article.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CmsArticlePage() {
  return (
    <Suspense fallback={null}>
      <SupabaseBlogArticle />
    </Suspense>
  );
}
