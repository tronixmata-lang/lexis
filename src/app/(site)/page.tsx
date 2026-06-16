import type { Metadata } from "next";
import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import TrustIndicators from "@/components/home/TrustIndicators";
import PracticeAreas from "@/components/home/PracticeAreas";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HomeDeferredSections from "@/components/home/HomeDeferredSections";
import HomeSectionSkeleton from "@/components/home/HomeSectionSkeleton";
import { SITE_TITLE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import { DEFAULT_SITE_DESCRIPTION } from "@/lib/seo-keywords";

export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: SITE_TITLE,
  description: DEFAULT_SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <div className="below-fold-section">
        <PracticeAreas />
        <AboutPreview />
        <WhyChooseUs />
      </div>
      <Suspense fallback={<HomeSectionSkeleton />}>
        <HomeDeferredSections />
      </Suspense>
    </>
  );
}
