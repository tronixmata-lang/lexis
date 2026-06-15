"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { useBreadcrumbItems } from "./BreadcrumbContext";
import { trailFromPathname } from "@/lib/breadcrumbs";

export default function BreadcrumbBar() {
  const pathname = usePathname();
  const context = useBreadcrumbItems();

  const items = useMemo(() => {
    if (context?.items?.length) return context.items;
    return trailFromPathname(pathname ?? "");
  }, [context?.items, pathname]);

  if (!pathname || pathname === "/" || pathname.startsWith("/admin") || items.length < 2) {
    return null;
  }

  return (
    <div className="border-b border-gray-100 bg-light-gray/80">
      <div className="container-narrow px-4 py-3 sm:px-6 lg:px-8">
        <Breadcrumbs items={items} variant="light" className="justify-start" />
      </div>
    </div>
  );
}
