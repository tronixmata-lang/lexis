import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import JsonLd from "@/components/JsonLd";
import {
  estimateReadingTime,
  getTableOfContents,
  parseBlogContent,
} from "@/lib/blog-content";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { getBlogSeoKeywords } from "@/lib/blog-seo";
import { articleSchema } from "@/lib/schema";
import { BLOG_RELATED_PRACTICE, createPageMetadata, isNepaliContent } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.publishedAt,
    language: isNepaliContent(post.title) ? "ne" : "en",
    keywords: getBlogSeoKeywords([post]),
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const blocks = parseBlogContent(post.content, post.title);
  const tableOfContents = getTableOfContents(blocks);
  const readingTime = estimateReadingTime(post.content);
  const relatedPractice = BLOG_RELATED_PRACTICE[post.slug] ?? [];

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <BlogArticleLayout
        post={post}
        blocks={blocks}
        tableOfContents={tableOfContents}
        readingTime={readingTime}
        relatedPractice={relatedPractice}
      />
    </>
  );
}
