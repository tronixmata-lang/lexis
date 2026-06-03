"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  PRACTICE_AREAS_COLUMN_1,
  PRACTICE_AREAS_COLUMN_2,
  PRACTICE_NAV_LABELS,
} from "@/lib/practice-nav-labels";

export default function NavbarPracticeDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li ref={ref} className="relative">
      <div className="flex items-center gap-2">
        <Link
          href="/practice-areas"
          className="text-sm font-medium text-dark-text transition-colors hover:text-primary"
        >
          Practice Areas
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-sm text-dark-text transition hover:border-primary hover:text-primary"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label="Toggle practice areas menu"
        >
          <svg
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-[min(100vw-2rem,520px)] before:absolute before:-top-2 before:left-6 before:h-0 before:w-0 before:border-8 before:border-transparent before:border-b-white before:content-['']">
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
            <div className="flex flex-col gap-2 border-b border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  18 Practice Areas
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Browse our full range of legal services and support.
                </p>
              </div>
              <Link
                href="/practice-areas"
                className="text-sm font-semibold text-primary transition-colors hover:text-navy"
                onClick={() => setOpen(false)}
              >
                View all practice areas →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2">
              <ul className="space-y-1 rounded-2xl bg-white p-2 shadow-sm">
                {PRACTICE_AREAS_COLUMN_1.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      className="block rounded-2xl px-4 py-3 text-sm font-semibold text-navy transition-colors hover:bg-primary/5 hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {PRACTICE_NAV_LABELS[slug]}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-1 rounded-2xl bg-white p-2 shadow-sm">
                {PRACTICE_AREAS_COLUMN_2.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      className="block rounded-2xl px-4 py-3 text-sm font-semibold text-navy transition-colors hover:bg-primary/5 hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {PRACTICE_NAV_LABELS[slug]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
