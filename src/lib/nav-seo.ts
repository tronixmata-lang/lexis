import type { Metadata } from "next";
import { SITE_TITLE } from "./constants";
import { PRACTICE_AREA_ORDER } from "./area-icons";
import { PRACTICE_NAV_LABELS } from "./practice-nav-labels";
import { createPageMetadata } from "./seo";
import { DEFAULT_SITE_DESCRIPTION } from "./seo-keywords";

export type NavSeoItem = {
  href: string;
  label: string;
  title: string;
  description: string;
  keywords?: string[];
  sitemapPriority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/** Main site navigation with SEO metadata for each linked page. */
export const NAV_SEO: NavSeoItem[] = [
  {
    href: "/",
    label: "Home",
    title: SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    keywords: ["law firm in nepal", "best law firm in kathmandu", "lexis and legis"],
    sitemapPriority: 1,
    changeFrequency: "weekly",
  },
  {
    href: "/practice-areas",
    label: "Practice Areas",
    title: "18 Practice Areas | Law Firm in Nepal",
    description:
      "Explore litigation, foreign investment, banking, aviation, IP, tax, company law and more. Trusted legal advisors in Kathmandu, Nepal.",
    keywords: ["practice areas", "corporate law nepal", "litigation nepal", "legal services kathmandu"],
    sitemapPriority: 0.9,
    changeFrequency: "monthly",
  },
  {
    href: "/about",
    label: "About",
    title: "About Us | Leading Law Firm in Kathmandu",
    description:
      "Lexis and Legis Law Associates, a leading law firm in Kathmandu, Nepal offering commercial, civil, IP, litigation and arbitration services.",
    keywords: ["about lexis legis", "law firm kathmandu", "legal team nepal"],
    sitemapPriority: 0.9,
    changeFrequency: "monthly",
  },
  {
    href: "/team",
    label: "Teams",
    title: "Our Legal Team | Experienced Attorneys in Nepal",
    description:
      "Meet the experienced legal professionals at Lexis and Legis Law Associates, a leading law firm in Kathmandu, Nepal.",
    keywords: ["legal team nepal", "corporate lawyers kathmandu", "attorneys nepal"],
    sitemapPriority: 0.8,
    changeFrequency: "monthly",
  },
  {
    href: "/blog",
    label: "News & Events",
    title: "Legal News and Articles | Law Firm in Nepal",
    description:
      "Legal insights, news and updates on Nepalese law from Lexis and Legis Law Associates in Kathmandu.",
    keywords: ["legal news nepal", "law articles nepal", "legal updates kathmandu"],
    sitemapPriority: 0.8,
    changeFrequency: "weekly",
  },
  {
    href: "/court-fee-calculator",
    label: "Court Fee",
    title: "Court Fee Calculator | Civil Court Fees in Nepal",
    description:
      "Calculate court filing fees for civil cases in Nepal. Slab-wise breakdown, legal basis, and applicable case types.",
    keywords: ["court fee calculator nepal", "court filing fees nepal", "civil court fees"],
    sitemapPriority: 0.7,
    changeFrequency: "monthly",
  },
  {
    href: "/contact",
    label: "Contact",
    title: "Contact Us | Law Firm in Anamnagar, Kathmandu",
    description:
      "Contact Lexis and Legis Law Associates in Anamnagar, Kathmandu. Phone, email, office hours and inquiry form.",
    keywords: ["contact law firm nepal", "lawyer contact kathmandu", "legal consultation nepal"],
    sitemapPriority: 0.9,
    changeFrequency: "monthly",
  },
  {
    href: "/consultation",
    label: "Book Consultation",
    title: "Book Legal Consultation | Law Firm in Nepal",
    description:
      "Schedule a consultation with experienced attorneys at Lexis and Legis Law Associates in Kathmandu, Nepal. Corporate, civil, IP and litigation advice.",
    keywords: ["book legal consultation nepal", "lawyer appointment kathmandu", "legal advice nepal"],
    sitemapPriority: 0.9,
    changeFrequency: "monthly",
  },
];

const NAV_SEO_BY_PATH = new Map(NAV_SEO.map((item) => [item.href, item]));

export const NAV_LINKS = NAV_SEO.map(({ href, label }) => ({ href, label }));

export function getNavSeo(path: string): NavSeoItem | undefined {
  return NAV_SEO_BY_PATH.get(path);
}

export function createNavPageMetadata(path: string): Metadata {
  const item = getNavSeo(path);
  if (!item) {
    throw new Error(`Missing NAV_SEO entry for path: ${path}`);
  }

  return createPageMetadata({
    title: item.title,
    description: item.description,
    path: item.href,
    keywords: item.keywords,
  });
}

export function siteNavigationSchema() {
  const mainNav = NAV_SEO.filter((item) => item.href !== "/").map((item) => ({
    "@type": "SiteNavigationElement" as const,
    name: item.label,
    description: item.description,
    url: item.href,
  }));

  const practiceNav = PRACTICE_AREA_ORDER.map((slug) => ({
    "@type": "SiteNavigationElement" as const,
    name: PRACTICE_NAV_LABELS[slug],
    url: `/${slug}`,
  }));

  return [...mainNav, ...practiceNav];
}
