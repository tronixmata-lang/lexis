import type { BlogPost } from "./types";

export type BlogCategoryCount = {
  name: string;
  count: number;
};

export function getBlogCategories(posts: BlogPost[]): BlogCategoryCount[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function filterBlogPosts(
  posts: BlogPost[],
  options: { category?: string; query?: string }
): BlogPost[] {
  const normalizedQuery = options.query?.trim().toLowerCase();

  return posts.filter((post) => {
    if (options.category && post.category !== options.category) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [post.title, post.excerpt, post.category, post.author]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
