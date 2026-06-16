import dynamic from "next/dynamic";
import DeferredSiteWidgets from "@/components/DeferredSiteWidgets";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const BreadcrumbBar = dynamic(() => import("@/components/BreadcrumbBar"), { loading: () => null });

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <BreadcrumbBar />
      <main className="flex-1">{children}</main>
      <Footer />
      <DeferredSiteWidgets />
    </>
  );
}
