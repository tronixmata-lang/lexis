import Hero from "@/components/home/Hero";
import TrustIndicators from "@/components/home/TrustIndicators";
import PracticeAreas from "@/components/home/PracticeAreas";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import ContactSection from "@/components/home/ContactSection";
import { getBlogPosts, getCaseStudies, getTestimonials } from "@/lib/data";

export default async function HomePage() {
  const [posts, studies, testimonials] = await Promise.all([
    getBlogPosts(),
    getCaseStudies(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <TrustIndicators />
      <PracticeAreas />
      <AboutPreview />
      <WhyChooseUs />
      <CaseStudiesPreview studies={studies} />
      {testimonials.length > 0 && <Testimonials items={testimonials} />}
      <BlogPreview posts={posts} />
      <ContactSection />
    </>
  );
}
