import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { LEGAL_DISCLAIMER } from "@/lib/constants";
import { articleSchema } from "@/lib/schema";
import { BLOG_RELATED_PRACTICE, createPageMetadata } from "@/lib/seo";

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

  const relatedPractice = BLOG_RELATED_PRACTICE[post.slug] ?? [];

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <section className="bg-navy py-16 text-white">
        <div className="container-narrow px-4 text-center sm:px-6">
          <span className="text-sm font-medium uppercase tracking-widest text-gold">{post.category}</span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-gray-300">
            By {post.author} ·{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>
      <article className="section-padding">
        <div className="container-narrow mx-auto max-w-3xl">
          <div className="prose-legal text-gray-700">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {relatedPractice.length > 0 && (
            <div className="mt-10 rounded-xl border border-gray-100 bg-light-gray p-6">
              <h2 className="text-lg font-bold text-navy">Related Practice Areas</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedPractice.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/${area.slug}`}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
                  >
                    {area.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="mt-10 rounded-lg bg-light-gray p-4 text-xs leading-relaxed text-gray-500">
            {LEGAL_DISCLAIMER}
          </p>
          <div className="mt-8 border-t border-gray-100 pt-8">
            <Link href="/blog" className="text-primary hover:underline">
              ← Back to News &amp; Events
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
