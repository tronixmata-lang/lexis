import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const featured = posts.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section-padding bg-light-gray">
      <div className="container-narrow">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Legal Insights</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">News &amp; Events</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Expert articles on Nepalese law, business compliance, and legal best practices.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((post) => (
            <article key={post.id} className="card-hover overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
              <div className="relative overflow-hidden rounded-t-3xl">
                <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-primary to-gold" />
                <div className="relative h-48 bg-slate-100">
                  <Image
                    src={post.image ?? "/blog-card-placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold leading-tight text-navy">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-4 text-sm leading-7 text-gray-600">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between gap-4 text-sm text-gray-500">
                  <span>By {post.author}</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-primary transition hover:text-navy"
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
