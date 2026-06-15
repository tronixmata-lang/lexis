"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { BreadcrumbItem } from "./Breadcrumbs";

type BreadcrumbContextValue = {
  items: BreadcrumbItem[] | null;
  setItems: (items: BreadcrumbItem[] | null) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BreadcrumbItem[] | null>(null);

  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>{children}</BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbItems() {
  return useContext(BreadcrumbContext);
}

/** Set page-specific breadcrumbs from server-rendered pages. */
export default function SetBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const context = useContext(BreadcrumbContext);

  useEffect(() => {
    context?.setItems(items);
    return () => context?.setItems(null);
  }, [context, JSON.stringify(items)]);

  return null;
}
