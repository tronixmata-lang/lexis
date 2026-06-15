import { revalidatePath, revalidateTag } from "next/cache";

/** Next.js cache tags — used with unstable_cache and revalidateTag */
export const CACHE_TAGS = {
  blog: "blog",
  testimonials: "testimonials",
  caseStudies: "case-studies",
  googleReviews: "google-reviews",
  sanity: "sanity",
  seo: "seo",
  contact: "contact",
} as const;

/** Default revalidation windows (seconds) */
export const REVALIDATE_SECONDS = {
  /** JSON content: blog, testimonials, case studies */
  content: 3600,
  /** Google reviews from API / file cache */
  googleReviews: 86400,
  /** Public pages ISR */
  pages: 3600,
} as const;

export function revalidateBlogCache() {
  revalidateTag(CACHE_TAGS.blog, "max");
  revalidatePath("/", "layout");
  revalidatePath("/blog", "layout");
}

export function revalidateTestimonialsCache() {
  revalidateTag(CACHE_TAGS.testimonials, "max");
  revalidatePath("/");
}

export function revalidateCaseStudiesCache() {
  revalidateTag(CACHE_TAGS.caseStudies, "max");
  revalidatePath("/", "layout");
  revalidatePath("/case-studies");
}

export function revalidateGoogleReviewsCache() {
  revalidateTag(CACHE_TAGS.googleReviews, "max");
  revalidatePath("/");
}

export function revalidateSanityCache() {
  revalidateTag(CACHE_TAGS.sanity, "max");
  revalidateTag(CACHE_TAGS.blog, "max");
  revalidateTag(CACHE_TAGS.seo, "max");
  revalidateTag(CACHE_TAGS.contact, "max");
  revalidatePath("/", "layout");
  revalidatePath("/blog", "layout");
  revalidatePath("/contact");
}
