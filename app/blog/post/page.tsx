import type { Metadata } from "next";
import { Suspense } from "react";
import SupabaseBlogArticle from "@/components/SupabaseBlogArticle";

export const metadata: Metadata = {
  title: "Toyzoona Article",
  description: "Toyzoona buying guide and toy sourcing article.",
};

export default function BlogPostPage() {
  return (
    <Suspense fallback={null}>
      <SupabaseBlogArticle />
    </Suspense>
  );
}
