"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { PracticeIcon } from "@/components/icons/PracticeIcons";
import { AREA_ICONS, PRACTICE_AREA_ORDER } from "@/lib/area-icons";
import { PRACTICE_NAV_LABELS } from "@/lib/practice-nav-labels";

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
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[min(100vw-2rem,760px)] -translate-x-1/2 before:absolute before:-top-2 before:left-1/2 before:h-0 before:w-0 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white before:content-[''] lg:left-0 lg:translate-x-0 lg:before:left-8 lg:before:translate-x-0">
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
            <div className="flex flex-col gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  18 Practice Areas
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Pick a service to learn more or get legal support.
                </p>
              </div>
              <Link
                href="/practice-areas"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-navy"
                onClick={() => setOpen(false)}
              >
                View all practice areas
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="grid max-h-[min(70vh,520px)] grid-cols-1 gap-1 overflow-y-auto p-3 sm:grid-cols-2 lg:grid-cols-3">
              {PRACTICE_AREA_ORDER.map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-primary/5"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white [&_svg]:h-5 [&_svg]:w-5">
                    <PracticeIcon name={AREA_ICONS[slug] ?? "document"} />
                  </span>
                  <span className="text-sm font-medium leading-snug text-navy group-hover:text-primary">
                    {PRACTICE_NAV_LABELS[slug]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
