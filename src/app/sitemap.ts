import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/data";
import { SERVICE_PAGES } from "@/lib/services";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexislegis.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const staticPages = [
    "",
    "/about",
    "/team",
    "/contact",
    "/consultation",
    "/practice-areas",
    "/case-studies",
    "/blog",
    "/court-fee-calculator",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.9,
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
