import type { Metadata } from "next";
import { BRAND } from "./constants";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexislegis.com";

export const DEFAULT_OG_IMAGE = "/lexis.png";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      locale: "en_US",
      type,
      images: [{ url: image, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Related practice area links for blog posts (internal linking). */
export const BLOG_RELATED_PRACTICE: Record<string, { slug: string; label: string }[]> = {
  "carbon-trading-in-nepal": [
    { slug: "energy-and-infrastructure-law", label: "Energy And Infrastructure Law" },
    { slug: "company-law", label: "Company Law" },
  ],
  "e-commerce-and-online-business-registration-in-nepal": [
    { slug: "cyber-law", label: "Cyber Law" },
    { slug: "commercial-contracts", label: "Commercial Contracts" },
    { slug: "company-law", label: "Company Law" },
  ],
  "legal-provisions-for-nrn-citizenship": [
    { slug: "immigration-law", label: "Immigration Law" },
    { slug: "property-law", label: "Property Law" },
  ],
  "nepal-ma-darta-vivah-sambandhi-kanuni-vyavastha": [
    { slug: "civil-and-criminal-litigation", label: "Civil And Criminal Litigation" },
    { slug: "property-law", label: "Property Law" },
  ],
};
