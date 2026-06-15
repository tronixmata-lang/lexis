import Link from "next/link";

type BlogEmptyStateProps = {
  category?: string;
  query?: string;
};

export default function BlogEmptyState({ category, query }: BlogEmptyStateProps) {
  const hasQuery = Boolean(query?.trim());

  return (
    <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center shadow-sm sm:px-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-gold/15 text-2xl">
        📰
      </div>
      <h2 className="mt-6 font-serif text-2xl font-bold text-navy">No articles found</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-600">
        {hasQuery && category
          ? `We couldn't find any articles in ${category} matching "${query?.trim()}".`
          : hasQuery
            ? `We couldn't find any articles matching "${query?.trim()}".`
            : category
              ? `There are no articles published in ${category} yet.`
              : "Try adjusting your search or browse all topics."}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/blog" className="btn-primary">
          View all articles
        </Link>
        <Link href="/contact" className="inline-flex items-center justify-center rounded-md border border-gray-200 px-6 py-3 text-sm font-semibold text-navy transition hover:border-primary hover:text-primary">
          Ask our legal team
        </Link>
      </div>
    </div>
  );
}
