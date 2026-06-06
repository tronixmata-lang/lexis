"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import NavbarPracticeDropdown from "./NavbarPracticeDropdown";
import { NAV_LINKS } from "@/lib/constants";
import { AREA_ICONS, PRACTICE_AREA_ORDER } from "@/lib/area-icons";
import { PracticeIcon } from "@/components/icons/PracticeIcons";
import { PRACTICE_NAV_LABELS } from "@/lib/practice-nav-labels";

const MAIN_LINKS = NAV_LINKS.filter((l) => l.href !== "/practice-areas");

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) < 8) {
        return;
      }

      if (currentScrollY <= 0) {
        setVisible(true);
      } else if (delta > 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showNavbar = visible || open;

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md transition-transform duration-300 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
          <ul className="flex flex-col items-center gap-1">
            <li className="w-full max-w-xs">
              <Link
                href="/"
                className="block py-2 text-center text-sm font-medium text-dark-text"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="w-full max-w-sm">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-dark-text"
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
                <ul className="mb-2 max-h-72 space-y-1 overflow-y-auto border-t border-gold/20 pt-3">
                  {PRACTICE_AREA_ORDER.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/${slug}`}
                        className="flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-navy transition-colors hover:bg-primary/5 hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:h-4 [&_svg]:w-4">
                          <PracticeIcon name={AREA_ICONS[slug] ?? "document"} />
                        </span>
                        <span className="text-left">{PRACTICE_NAV_LABELS[slug]}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/practice-areas"
                      className="block py-2 text-center text-sm font-semibold text-primary"
                      onClick={() => setOpen(false)}
                    >
                      View all practice areas →
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {MAIN_LINKS.filter((l) => l.href !== "/").map((link) => (
              <li key={link.href} className="w-full max-w-xs">
                <Link
                  href={link.href}
                  className="block py-2 text-center text-sm font-medium text-dark-text"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="w-full max-w-xs">
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
