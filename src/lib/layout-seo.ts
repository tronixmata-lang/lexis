import { unstable_cache } from "next/cache";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { mergeSeoKeywords } from "@/lib/blog-seo";
import { CACHE_TAGS, REVALIDATE_SECONDS } from "@/lib/cache";
import { getBlogPosts } from "@/lib/data";
import type { SiteSettings } from "@/sanity/lib/fetch";

type LayoutSeo = {
  settings: SiteSettings;
  keywords: string[];
};

const getCachedLayoutSeo = unstable_cache(
  async (): Promise<LayoutSeo> => {
    const [settings, posts] = await Promise.all([getSiteSettings(), getBlogPosts()]);
    return {
      settings,
      keywords: mergeSeoKeywords(settings.allKeywords, posts),
    };
  },
  ["layout-seo"],
  {
    tags: [CACHE_TAGS.blog, CACHE_TAGS.seo, CACHE_TAGS.sanity],
    revalidate: REVALIDATE_SECONDS.content,
  }
);

export async function getLayoutSeo(): Promise<LayoutSeo> {
  return getCachedLayoutSeo();
}
