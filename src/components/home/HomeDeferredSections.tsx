import dynamic from "next/dynamic";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import BlogPreview from "@/components/home/BlogPreview";
import { getBlogPosts, getCaseStudies } from "@/lib/data";
import { GOOGLE_REVIEWS } from "@/lib/google-reviews-data";

const Testimonials = dynamic(() => import("@/components/home/Testimonials"));

export default async function HomeDeferredSections() {
  const [posts, studies] = await Promise.all([getBlogPosts(), getCaseStudies()]);

  return (
    <>
      <CaseStudiesPreview studies={studies} />
      <BlogPreview posts={posts} />
      <Testimonials initialData={GOOGLE_REVIEWS} />
    </>
  );
}
