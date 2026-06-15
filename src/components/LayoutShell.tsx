"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import BreadcrumbBar from "./BreadcrumbBar";
import { BreadcrumbProvider } from "./BreadcrumbContext";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isStudio = pathname?.startsWith("/studio");

  if (isAdmin || isStudio) {
    return <>{children}</>;
  }

  return (
    <BreadcrumbProvider>
      <Navbar />
      <BreadcrumbBar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </BreadcrumbProvider>
  );
}
