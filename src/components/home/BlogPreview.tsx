import Link from "next/link";
import BlogCard from "@/components/BlogCard";
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
            <BlogCard key={post.id} post={post} />
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
