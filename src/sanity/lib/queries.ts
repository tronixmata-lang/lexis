import type { SanityImageSource } from "@sanity/image-url";

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  image?: SanityImageSource;
  imageUrl?: string;
  featured?: boolean;
};

export type SanitySiteSettings = {
  siteTitle: string;
  defaultDescription: string;
  primaryKeywords?: string[];
  googleSiteVerification?: string;
  ogImage?: SanityImageSource;
};

export type SanityContactPage = {
  metaTitle?: string;
  metaDescription?: string;
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle?: string;
  formTitle?: string;
  formSubtitle?: string;
  getInTouchTitle?: string;
  address?: string;
  email?: string;
  hours?: string;
  days?: string;
  phones?: { display: string; tel: string }[];
};

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  author,
  publishedAt,
  image,
  imageUrl,
  featured
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  author,
  publishedAt,
  image,
  imageUrl,
  featured
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  siteTitle,
  defaultDescription,
  primaryKeywords,
  googleSiteVerification,
  ogImage
}`;

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0] {
  metaTitle,
  metaDescription,
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  formTitle,
  formSubtitle,
  getInTouchTitle,
  address,
  email,
  hours,
  days,
  phones
}`;
