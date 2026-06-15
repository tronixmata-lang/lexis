import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustIndicators from "@/components/home/TrustIndicators";
import PracticeAreas from "@/components/home/PracticeAreas";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import { getBlogPosts, getCaseStudies } from "@/lib/data";
import { getGoogleReviews } from "@/lib/google-reviews";
import { SITE_TITLE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import { DEFAULT_SITE_DESCRIPTION } from "@/lib/seo-keywords";

export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: SITE_TITLE,
  description: DEFAULT_SITE_DESCRIPTION,
  path: "/",
});

export default async function HomePage() {
  const [posts, studies, googleReviews] = await Promise.all([
    getBlogPosts(),
    getCaseStudies(),
    getGoogleReviews(),
  ]);

  return (
    <>
      <Hero />
      <TrustIndicators />
      <PracticeAreas />
      <AboutPreview />
      <WhyChooseUs />
      <CaseStudiesPreview studies={studies} />
      <BlogPreview posts={posts} />
      <Testimonials initialData={googleReviews} />
    </>
  );
}
