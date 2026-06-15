import type { BlogPost } from "./types";

/** All blog post titles for SEO and structured data. */
export function getBlogTitles(posts: BlogPost[]): string[] {
  return posts.map((post) => post.title);
}

function slugToKeyword(slug: string): string {
  return slug.replace(/-/g, " ");
}

/** SEO keyword phrases derived from each blog post. */
export function getBlogSeoKeywords(posts: BlogPost[]): string[] {
  const keywords = new Set<string>();

  for (const post of posts) {
    keywords.add(post.title);
    keywords.add(slugToKeyword(post.slug));
    keywords.add(post.category);
    keywords.add(`${post.category} Nepal`);

    if (!/nepal/i.test(post.title)) {
      keywords.add(`${post.title} Nepal`);
    }

    keywords.add(`${post.title} lawyer`);
    keywords.add(`${post.title} law firm Nepal`);
  }

  return [...keywords];
}

/** Meta description listing every published article title. */
export function getBlogTitlesDescription(posts: BlogPost[]): string {
  const titles = getBlogTitles(posts).join(". ");
  return `Expert legal articles from Lexislegis in Nepal: ${titles}.`;
}

/** Deduped merge of static site keywords and blog-derived keywords. */
export function mergeSeoKeywords(
  staticKeywords: readonly string[],
  posts: BlogPost[]
): string[] {
  return [...new Set([...staticKeywords, ...getBlogSeoKeywords(posts)])];
}
