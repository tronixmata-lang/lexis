import Link from "next/link";
import BlogCardImage from "./BlogCardImage";
import type { BlogPost } from "@/lib/types";

type BlogCardProps = {
  post: BlogPost;
};

function isIllustration(src?: string) {
  return Boolean(src?.startsWith("/blog/") || src?.endsWith(".png") || src?.endsWith(".svg"));
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const imageSrc = post.image ?? "/blog-card-placeholder.svg";
  const illustration = isIllustration(post.image);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_8px_30px_-18px_rgba(10,31,68,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-[0_20px_45px_-20px_rgba(10,31,68,0.4)]">
      <Link href={`/blog/${post.slug}`} className="relative block overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-linear-to-r from-primary to-gold" />
        <div
          className={`relative h-56 overflow-hidden ${
            illustration ? "bg-[#efe8d4]" : "bg-slate-100"
          }`}
        >
          <BlogCardImage src={imageSrc} alt={post.title} />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/35 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="absolute left-4 top-5 z-20 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur-sm">
            {post.category}
          </span>
          {post.featured && (
            <span className="rounded-full bg-gold/95 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-navy shadow-sm backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-serif text-xl font-bold leading-snug text-navy">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">{post.excerpt}</p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-gray-100 pt-5 text-sm text-gray-500">
          <span className="truncate font-medium text-gray-600">{post.author}</span>
          <time dateTime={post.publishedAt} className="shrink-0">
            {formattedDate}
          </time>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3 hover:text-navy"
        >
          Read article
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
