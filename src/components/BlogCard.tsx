import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

type BlogCardProps = {
  post: BlogPost;
  showReadLink?: boolean;
};

export default function BlogCard({ post, showReadLink = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="card-hover overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden rounded-t-3xl">
        <div className="absolute inset-x-0 top-0 z-10 h-2 bg-linear-to-r from-primary to-gold" />
        <div className="relative h-48 bg-slate-100">
          <Image
            src={post.image ?? "/blog-card-placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold leading-tight text-navy">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-600">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-gray-500">
          <span>{post.author}</span>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>
        {showReadLink && (
          <Link
            href={`/blog/${post.slug}`}
            className="mt-6 inline-flex items-center text-sm font-semibold text-primary transition hover:text-navy"
          >
            Read article →
          </Link>
        )}
      </div>
    </article>
  );
}
