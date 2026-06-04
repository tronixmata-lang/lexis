import { BRAND, CONTACT } from "./constants";
import { absoluteUrl } from "./seo";
import type { BlogPost } from "./types";

function socialProfiles(): string[] {
  const profiles: string[] = [BRAND.social.whatsapp, BRAND.website];
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim();
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
  if (facebook) profiles.push(facebook);
  if (linkedin) profiles.push(linkedin);
  return profiles;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness", "Attorney"],
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/lexis.png"),
    image: absoluteUrl("/lexis.png"),
    description:
      "Leading law firm in Kathmandu, Nepal offering corporate law, litigation, foreign investment, intellectual property, tax, and commercial legal services.",
    email: CONTACT.email,
    telephone: CONTACT.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address,
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati Province",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.latitude,
      longitude: CONTACT.geo.longitude,
    },
    hasMap: CONTACT.mapsUrl,
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    priceRange: "$$",
    sameAs: socialProfiles(),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: absoluteUrl("/"),
    description:
      "Official website of Lexis and Legis Law Associates, a leading law firm in Kathmandu, Nepal.",
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/lexis.png"),
      },
    },
  };
}

export function serviceSchema(slug: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${name} in Nepal`,
    description,
    provider: {
      "@type": "LegalService",
      name: BRAND.name,
      url: absoluteUrl("/"),
    },
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    url: absoluteUrl(`/${slug}`),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? (post.image.startsWith("http") ? post.image : absoluteUrl(post.image)) : absoluteUrl("/lexis.png"),
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/lexis.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
