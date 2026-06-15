import Image from "next/image";
import Link from "next/link";
import BlogContent from "@/components/BlogContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import SetBreadcrumbs from "@/components/BreadcrumbContext";
import { blogPostTrail } from "@/lib/breadcrumbs";
import type { ContentBlock } from "@/lib/blog-content";
import type { BlogPost } from "@/lib/types";

type RelatedArea = { slug: string; label: string };

type BlogArticleLayoutProps = {
  post: BlogPost;
  blocks: ContentBlock[];
  tableOfContents: { id: string; text: string }[];
  readingTime: number;
  relatedPractice: RelatedArea[];
};

function isIllustration(src?: string) {
  return Boolean(src?.startsWith("/blog/") || src?.endsWith(".png") || src?.endsWith(".svg"));
}

export default function BlogArticleLayout({
  post,
  blocks,
  tableOfContents,
  readingTime,
  relatedPractice,
}: BlogArticleLayoutProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const breadcrumbs = blogPostTrail(post);
  const illustration = isIllustration(post.image);

  return (
    <>
      <SetBreadcrumbs items={breadcrumbs} />
      <section className="relative overflow-hidden bg-navy text-white">
        {post.image && (
          <>
            <Image
              src={post.image}
              alt=""
              fill
              priority
              unoptimized={illustration}
              className={`opacity-25 ${illustration ? "object-contain p-16" : "object-cover"}`}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/90 to-navy" />
          </>
        )}
        <div className="container-narrow relative z-10 px-4 py-14 sm:px-6 sm:py-20">
          <Breadcrumbs
            items={breadcrumbs}
            className="mb-6"
            includeSchema={false}
          />
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {post.category}
            </span>
            <h1 className="mt-5 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-300">
              <span>{post.author}</span>
              <span className="hidden h-1 w-1 rounded-full bg-gold sm:inline-block" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span className="hidden h-1 w-1 rounded-full bg-gold sm:inline-block" aria-hidden="true" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
            <article className="min-w-0">
              <Breadcrumbs
                items={breadcrumbs}
                variant="light"
                includeSchema={false}
                className="mb-6 justify-start"
              />

              {post.image && (
                <div className="relative mb-10 overflow-hidden rounded-2xl shadow-lg">
                  <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-primary to-gold" />
                  <div
                    className={`relative aspect-[16/7] w-full ${
                      illustration ? "bg-[#efe8d4]" : "bg-slate-100"
                    }`}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized={illustration}
                      className={illustration ? "object-contain p-8" : "object-cover"}
                      sizes="(max-width: 1024px) 100vw, 768px"
                      priority
                    />
                  </div>
                </div>
              )}

              {tableOfContents.length > 2 && (
                <nav
                  aria-label="Table of contents"
                  className="mb-10 rounded-2xl border border-gray-100 bg-light-gray p-5 lg:hidden"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    In This Article
                  </p>
                  <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                    {tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block text-sm leading-snug text-gray-600 transition hover:text-primary"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <BlogContent blocks={blocks} />

              {relatedPractice.length > 0 && (
                <div className="mt-12 rounded-2xl border border-gray-100 bg-light-gray p-6 sm:p-8">
                  <h2 className="font-serif text-xl font-bold text-navy">Related Practice Areas</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Explore how our legal team can assist with matters related to this article.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {relatedPractice.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/${area.slug}`}
                        className="rounded-lg border border-white bg-white px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-white"
                      >
                        {area.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 rounded-2xl bg-navy p-6 text-white sm:p-8">
                <h2 className="font-serif text-xl font-bold sm:text-2xl">Need Legal Advice?</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
                  Contact Lexis and Legis Law Associates for a confidential consultation on matters
                  related to {post.category.toLowerCase()} in Nepal.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/consultation" className="btn-gold text-sm">
                    Book Consultation
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-100 pt-8">
                <Breadcrumbs
                  items={breadcrumbs}
                  variant="light"
                  includeSchema={false}
                  className="mb-6 justify-start"
                />
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-navy"
                >
                  <span aria-hidden="true">←</span>
                  Back to News &amp; Events
                </Link>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {tableOfContents.length > 2 && (
                  <nav
                    aria-label="Table of contents"
                    className="rounded-2xl border border-gray-100 bg-light-gray p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      In This Article
                    </p>
                    <ol className="mt-4 space-y-2">
                      {tableOfContents.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block text-sm leading-snug text-gray-600 transition hover:text-primary"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Quick Contact
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    Speak with our {post.category.toLowerCase()} team in Kathmandu.
                  </p>
                  <Link href="/consultation" className="btn-primary mt-4 w-full text-sm">
                    Get Advice
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
