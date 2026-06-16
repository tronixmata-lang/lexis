import type { Metadata } from "next";
import { Suspense } from "react";
import BlogCard from "@/components/BlogCard";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import BlogToolbar from "@/components/blog/BlogToolbar";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { getBlogPosts } from "@/lib/data";
import { filterBlogPosts, getBlogCategories } from "@/lib/blog-filters";
import { getBlogSeoKeywords, getBlogTitlesDescription } from "@/lib/blog-seo";
import { blogItemListSchema } from "@/lib/schema";
import { getNavSeo } from "@/lib/nav-seo";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getBlogPosts();
  const nav = getNavSeo("/blog");

  return createPageMetadata({
    title: nav?.title ?? "Legal News and Articles",
    description: getBlogTitlesDescription(posts),
    path: "/blog",
    keywords: [...(nav?.keywords ?? []), ...getBlogSeoKeywords(posts)],
  });
}

type BlogPageProps = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

function BlogToolbarFallback() {
  return (
    <section className="border-b border-gray-200/80 bg-white">
      <div className="h-1 bg-linear-to-r from-primary to-gold" />
      <div className="container-narrow h-44 animate-pulse px-4 py-8 sm:px-6 lg:px-8" />
    </section>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, q } = await searchParams;
  const allPosts = await getBlogPosts();
  const categories = getBlogCategories(allPosts);
  const posts = filterBlogPosts(allPosts, { category, query: q });
  const trimmedQuery = q?.trim();
  const hasFilters = Boolean(category || trimmedQuery);

  const title = category ?? "News & Events";
  const subtitle = trimmedQuery
    ? `Search results for "${trimmedQuery}"`
    : category
      ? `Articles in ${category}`
      : "Legal insights and updates from our team";

  return (
    <>
      <JsonLd data={blogItemListSchema(allPosts)} />
      <PageHeader title={title} subtitle={subtitle} />

      <Suspense fallback={<BlogToolbarFallback />}>
        <BlogToolbar
          categories={categories}
          totalCount={allPosts.length}
          filteredCount={posts.length}
          activeCategory={category}
          activeQuery={q}
        />
      </Suspense>

      <section className="section-padding bg-light-gray">
        <div className="container-narrow">
          {posts.length === 0 ? (
            <BlogEmptyState category={category} query={q} />
          ) : (
            <>
              {hasFilters && (
                <p className="mb-8 text-center text-sm text-gray-500 sm:text-left">
                  Showing{" "}
                  <span className="font-semibold text-navy">{posts.length}</span>{" "}
                  {posts.length === 1 ? "article" : "articles"}
                  {category ? ` in ${category}` : ""}
                  {trimmedQuery ? ` matching "${trimmedQuery}"` : ""}.
                </p>
              )}

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
