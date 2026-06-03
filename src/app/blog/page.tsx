import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Legal news and articles from Lexis and Legis — carbon trading, e-commerce, NRN citizenship, and Nepalese law.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        title="News & Events"
        subtitle="Legal insights and updates from our team"
        breadcrumb="News"
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="card-hover overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="h-2 bg-gradient-to-r from-primary to-gold" />
                <div className="p-6">
                  <span className="text-xs font-medium uppercase text-primary">{post.category}</span>
                  <h2 className="mt-2 text-lg font-semibold text-navy">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm text-gray-600">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
