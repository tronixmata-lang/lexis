import { unstable_cache } from "next/cache";
import { CACHE_TAGS, REVALIDATE_SECONDS } from "@/lib/cache";
import type { BlogPost } from "@/lib/types";
import { getSanityClient } from "./client";
import { resolveOgImage, resolvePostImage } from "./image";
import {
  CONTACT_PAGE_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_QUERY,
  SITE_SETTINGS_QUERY,
  type SanityContactPage,
  type SanityPost,
  type SanitySiteSettings,
} from "./queries";
import { CONTACT, SITE_TITLE } from "@/lib/constants";
import { DEFAULT_SITE_DESCRIPTION, PRIMARY_SEO_KEYWORDS, SEO_KEYWORDS } from "@/lib/seo-keywords";

export type SiteSettings = {
  siteTitle: string;
  defaultDescription: string;
  primaryKeywords: string[];
  allKeywords: string[];
  googleSiteVerification?: string;
  ogImage?: string;
};

export type ContactPageContent = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  formTitle: string;
  formSubtitle: string;
  getInTouchTitle: string;
  address: string;
  email: string;
  hours: string;
  days: string;
  phones: { display: string; tel: string }[];
};

function mapPost(doc: SanityPost): BlogPost {
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    category: doc.category,
    author: doc.author,
    publishedAt: doc.publishedAt,
    image: resolvePostImage(doc.image, doc.imageUrl),
    featured: doc.featured ?? false,
  };
}

async function fetchPostsFromSanity(): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client) return [];
  const docs = await client.fetch<SanityPost[]>(POSTS_QUERY);
  return docs.map(mapPost);
}

async function fetchPostBySlugFromSanity(slug: string): Promise<BlogPost | undefined> {
  const client = getSanityClient();
  if (!client) return undefined;
  const doc = await client.fetch<SanityPost | null>(POST_BY_SLUG_QUERY, { slug });
  return doc ? mapPost(doc) : undefined;
}

async function fetchSiteSettingsFromSanity(): Promise<SiteSettings | null> {
  const client = getSanityClient();
  if (!client) return null;
  const doc = await client.fetch<SanitySiteSettings | null>(SITE_SETTINGS_QUERY);
  if (!doc?.siteTitle || !doc.defaultDescription) return null;

  const primaryKeywords = doc.primaryKeywords?.length
    ? doc.primaryKeywords
    : [...PRIMARY_SEO_KEYWORDS];

  return {
    siteTitle: doc.siteTitle,
    defaultDescription: doc.defaultDescription,
    primaryKeywords,
    allKeywords: [...new Set([...SEO_KEYWORDS, ...primaryKeywords])],
    googleSiteVerification: doc.googleSiteVerification,
    ogImage: resolveOgImage(doc.ogImage),
  };
}

async function fetchContactPageFromSanity(): Promise<ContactPageContent | null> {
  const client = getSanityClient();
  if (!client) return null;
  const doc = await client.fetch<SanityContactPage | null>(CONTACT_PAGE_QUERY);
  if (!doc?.heroTitle) return null;

  return {
    metaTitle: doc.metaTitle ?? "Contact Us",
    metaDescription:
      doc.metaDescription ??
      `Contact Lexis and Legis at ${CONTACT.address}. Call ${CONTACT.phones[0].display} or ${CONTACT.phones[1].display}.`,
    heroEyebrow: doc.heroEyebrow ?? "Contact",
    heroTitle: doc.heroTitle,
    heroSubtitle:
      doc.heroSubtitle ??
      "Whether you require legal advice, consultation or case evaluation, do not hesitate to contact us.",
    formTitle: doc.formTitle ?? "Send Us a Message",
    formSubtitle:
      doc.formSubtitle ?? "Fill out the form below and we will respond as soon as possible.",
    getInTouchTitle: doc.getInTouchTitle ?? "Get In Touch",
    address: doc.address ?? CONTACT.address,
    email: doc.email ?? CONTACT.email,
    hours: doc.hours ?? CONTACT.hours,
    days: doc.days ?? CONTACT.days,
    phones: doc.phones?.length ? doc.phones : [...CONTACT.phones],
  };
}

const getCachedSanityPosts = unstable_cache(fetchPostsFromSanity, ["sanity-posts"], {
  tags: [CACHE_TAGS.blog, CACHE_TAGS.sanity],
  revalidate: REVALIDATE_SECONDS.content,
});

const getCachedSiteSettings = unstable_cache(fetchSiteSettingsFromSanity, ["sanity-site-settings"], {
  tags: [CACHE_TAGS.sanity, CACHE_TAGS.seo],
  revalidate: REVALIDATE_SECONDS.content,
});

const getCachedContactPage = unstable_cache(fetchContactPageFromSanity, ["sanity-contact-page"], {
  tags: [CACHE_TAGS.sanity, CACHE_TAGS.contact],
  revalidate: REVALIDATE_SECONDS.content,
});

export async function getSanityBlogPosts(): Promise<BlogPost[]> {
  return getCachedSanityPosts();
}

export async function getSanityBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const client = getSanityClient();
  if (!client) return undefined;
  return unstable_cache(
    () => fetchPostBySlugFromSanity(slug),
    [`sanity-post-${slug}`],
    { tags: [CACHE_TAGS.blog, CACHE_TAGS.sanity], revalidate: REVALIDATE_SECONDS.content }
  )();
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const fromSanity = await getCachedSiteSettings();
  if (fromSanity) return fromSanity;

  return {
    siteTitle: SITE_TITLE,
    defaultDescription: DEFAULT_SITE_DESCRIPTION,
    primaryKeywords: [...PRIMARY_SEO_KEYWORDS],
    allKeywords: [...SEO_KEYWORDS],
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
  };
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  const fromSanity = await getCachedContactPage();
  if (fromSanity) return fromSanity;

  return {
    metaTitle: "Contact Us",
    metaDescription: `Contact Lexis and Legis at ${CONTACT.address}. Call ${CONTACT.phones[0].display} or ${CONTACT.phones[1].display}.`,
    heroEyebrow: "Contact",
    heroTitle: "Your Legal Solution Starts Here",
    heroSubtitle:
      "Whether you require legal advice, consultation or case evaluation, do not hesitate to contact us. Your privacy is important to us and all details you share will be kept confidential.",
    formTitle: "Send Us a Message",
    formSubtitle: "Fill out the form below and we will respond as soon as possible.",
    getInTouchTitle: "Get In Touch",
    address: CONTACT.address,
    email: CONTACT.email,
    hours: CONTACT.hours,
    days: CONTACT.days,
    phones: [...CONTACT.phones],
  };
}
