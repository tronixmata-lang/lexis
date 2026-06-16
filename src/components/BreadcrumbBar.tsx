"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { blogCategoryTrail, trailFromPathname } from "@/lib/breadcrumbs";

function BreadcrumbBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const items = useMemo(() => {
    if (pathname === "/blog" && category) {
      return blogCategoryTrail(category);
    }
    return trailFromPathname(pathname ?? "");
  }, [pathname, category]);

  if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/studio") || items.length < 1) {
    return null;
  }

  return (
    <div className="bg-navy">
      <div className="container-narrow px-4 py-3 sm:px-6 lg:px-8">
        <Breadcrumbs items={items} variant="dark" className="justify-start" includeSchema />
      </div>
    </div>
  );
}

export default function BreadcrumbBar() {
  return (
    <Suspense fallback={null}>
      <BreadcrumbBarInner />
    </Suspense>
  );
}
