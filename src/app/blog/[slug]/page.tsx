import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { LEGAL_DISCLAIMER } from "@/lib/constants";

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
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
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
