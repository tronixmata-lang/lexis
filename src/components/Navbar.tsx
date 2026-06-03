"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import NavbarPracticeDropdown from "./NavbarPracticeDropdown";
import { NAV_LINKS, PRACTICE_AREAS } from "@/lib/constants";
import { PRACTICE_NAV_LABELS } from "@/lib/practice-nav-labels";

const MAIN_LINKS = NAV_LINKS.filter((l) => l.href !== "/practice-areas");

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="container-narrow flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          <li>
            <Link
              href="/"
              className="text-sm font-medium text-dark-text transition-colors hover:text-primary"
            >
              Home
            </Link>
          </li>
          <NavbarPracticeDropdown />
          {MAIN_LINKS.filter((l) => l.href !== "/").map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-dark-text transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/consultation" className="btn-gold text-sm">
            Book Consultation
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="max-h-[85vh] overflow-y-auto border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                className="block py-2 text-sm font-medium text-dark-text"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-dark-text"
                onClick={() => setPracticeOpen(!practiceOpen)}
              >
                Practice Areas
                <svg
                  className={`h-4 w-4 ${practiceOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {practiceOpen && (
                <ul className="mb-2 ml-2 max-h-64 overflow-y-auto border-l-2 border-gold/30 pl-3">
                  {PRACTICE_AREAS.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={`/${area.slug}`}
                        className="block py-2 text-sm font-semibold text-navy hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        {PRACTICE_NAV_LABELS[area.slug] ?? area.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/practice-areas"
                      className="block py-2 text-sm font-medium text-primary"
                      onClick={() => setOpen(false)}
                    >
                      View all →
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {MAIN_LINKS.filter((l) => l.href !== "/").map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-sm font-medium text-dark-text"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/consultation"
                className="btn-gold mt-2 block w-full text-center"
                onClick={() => setOpen(false)}
              >
                Book Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
