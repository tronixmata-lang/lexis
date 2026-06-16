import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/data";
import { NAV_SEO } from "@/lib/nav-seo";
import { SERVICE_PAGES } from "@/lib/services";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexislegis.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const staticPages = NAV_SEO.map((item) => ({
    url: `${BASE}${item.href}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.sitemapPriority,
  }));

  const servicePages = Object.keys(SERVICE_PAGES).map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
