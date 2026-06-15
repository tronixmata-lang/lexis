"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import type { BlogCategoryCount } from "@/lib/blog-filters";

type BlogToolbarProps = {
  categories: BlogCategoryCount[];
  totalCount: number;
  filteredCount: number;
  activeCategory?: string;
  activeQuery?: string;
};

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5 text-primary/70"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"
      />
    </svg>
  );
}

function buildBlogUrl(category?: string, query?: string) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  const trimmedQuery = query?.trim();
  if (trimmedQuery) {
    params.set("q", trimmedQuery);
  }

  const search = params.toString();
  return search ? `/blog?${search}` : "/blog";
}

export default function BlogToolbar({
  categories,
  totalCount,
  filteredCount,
  activeCategory,
  activeQuery = "",
}: BlogToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(activeQuery);
  const hasFilters = Boolean(activeCategory || activeQuery.trim());

  useEffect(() => {
    setQuery(activeQuery);
  }, [activeQuery]);

  const navigate = useCallback(
    (nextCategory?: string, nextQuery?: string) => {
      startTransition(() => {
        router.push(buildBlogUrl(nextCategory, nextQuery), { scroll: false });
      });
    },
    [router]
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const currentQuery = searchParams.get("q") ?? "";
      if (query.trim() === currentQuery.trim()) {
        return;
      }

      navigate(activeCategory, query);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [query, activeCategory, navigate, searchParams]);

  function handleCategorySelect(category?: string) {
    navigate(category, query);
  }

  function clearFilters() {
    setQuery("");
    startTransition(() => {
      router.push("/blog", { scroll: false });
    });
  }

  return (
    <section className="border-b border-gray-200/80 bg-white">
      <div className="h-1 bg-linear-to-r from-primary via-primary to-gold" />

      <div className="container-narrow px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="relative flex-1">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles by title, topic, or keyword..."
              className="w-full rounded-2xl border border-gray-200 bg-light-gray/60 py-4 pl-14 pr-14 text-sm text-navy shadow-inner shadow-white/80 transition focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-sm text-gray-400 transition hover:bg-gray-100 hover:text-navy"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-light-gray/50 px-5 py-3.5 lg:min-w-[220px] lg:justify-center">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-navy">{filteredCount}</span>{" "}
              {filteredCount === 1 ? "article" : "articles"}
              {hasFilters ? " found" : " published"}
            </p>
            {isPending && (
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
            )}
          </div>
        </div>

        <div className="my-7 h-px bg-gray-100" />

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-gray-400">
              Browse by category
            </p>
            <p className="text-xs text-gray-400">{totalCount} total articles</p>
          </div>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible">
            <button
              type="button"
              onClick={() => handleCategorySelect()}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                !activeCategory
                  ? "border-navy bg-navy text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-600 hover:border-primary/25 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              All Topics
              <span
                className={`min-w-[1.5rem] rounded-full px-2 py-0.5 text-center text-xs ${
                  !activeCategory ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {totalCount}
              </span>
            </button>

            {categories.map((category) => {
              const isActive = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => handleCategorySelect(category.name)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "border-primary bg-primary text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-600 hover:border-primary/25 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {category.name}
                  <span
                    className={`min-w-[1.5rem] rounded-full px-2 py-0.5 text-center text-xs ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {hasFilters && (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
              Active filters
            </span>
            {activeCategory && (
              <span className="rounded-full border border-white bg-white px-3 py-1 text-xs font-semibold text-navy shadow-sm">
                {activeCategory}
              </span>
            )}
            {activeQuery.trim() && (
              <span className="rounded-full border border-white bg-white px-3 py-1 text-xs font-semibold text-navy shadow-sm">
                &ldquo;{activeQuery.trim()}&rdquo;
              </span>
            )}
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto text-xs font-semibold text-primary underline-offset-2 transition hover:text-navy hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
