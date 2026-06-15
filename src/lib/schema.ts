import { BRAND, CONTACT } from "./constants";
import { PRIMARY_SEO_KEYWORDS } from "./seo-keywords";
import { absoluteUrl, isNepaliContent } from "./seo";
import type { BlogPost } from "./types";

export type FaqItem = { question: string; answer: string };

type ReviewRating = {
  rating: number;
  totalReviews: number;
};

function socialProfiles(): string[] {
  const profiles: string[] = [BRAND.social.whatsapp, BRAND.website];
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim();
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
  if (facebook) profiles.push(facebook);
  if (linkedin) profiles.push(linkedin);
  return profiles;
}

export function organizationSchema(
  reviews?: ReviewRating,
  blogTitles: string[] = []
) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness", "Attorney"],
    name: BRAND.name,
    legalName: BRAND.legalName,
    alternateName: ["Lexislegis", "Lexis and Legis Law Associates"],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/lexis.png"),
    image: absoluteUrl("/lexis.png"),
    description:
      "Best consulting and law firm in Nepal, Kathmandu (Anamnagar). Corporate law, litigation, divorce, family law, criminal defense, property law, and legal consultation.",
    knowsAbout: [
      ...PRIMARY_SEO_KEYWORDS.slice(0, 20),
      "Corporate Law",
      "Civil Litigation",
      "Criminal Law",
      "Family Law",
      "Property Law",
      "Immigration Law",
      "Tax Law",
      "Intellectual Property Law",
      ...blogTitles,
    ],
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

  if (reviews && reviews.rating > 0 && reviews.totalReviews > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.rating,
      reviewCount: reviews.totalReviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    alternateName: "Lexislegis",
    url: absoluteUrl("/"),
    description:
      "Official website of Lexislegis — best consulting and law firm in Nepal, Kathmandu. Law firm near me in Anamnagar with corporate, criminal, family, and property law services.",
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
  const inLanguage = isNepaliContent(post.title) ? "ne-NP" : "en";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? (post.image.startsWith("http") ? post.image : absoluteUrl(post.image)) : absoluteUrl("/lexis.png"),
    datePublished: post.publishedAt,
    inLanguage,
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

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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

export function blogItemListSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Legal News and Articles",
    description: "Expert articles on Nepalese law published by Lexislegis.",
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
    })),
  };
}
