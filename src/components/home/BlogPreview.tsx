import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const featured = posts.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section-padding bg-light-gray">
      <div className="container-narrow">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Legal Insights</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Latest from Our Blog</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Expert articles on Nepalese law, business compliance, and legal best practices.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((post) => (
            <article key={post.id} className="card-hover overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="h-2 bg-gradient-to-r from-primary to-gold" />
              <div className="p-6">
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  {post.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-navy">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog" className="btn-primary">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
