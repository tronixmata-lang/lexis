import Link from "next/link";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { BRAND, CONTACT, PRACTICE_AREAS } from "@/lib/constants";
import { getNavSeo, NAV_LINKS } from "@/lib/nav-seo";

export default function Footer() {
  return (
    <footer>
      <div className="bg-navy text-white">
        <div className="container-narrow section-padding">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="max-w-sm">
              <Logo size="footer" />
              <div className="mt-6 border-l-2 border-gold pl-4">
                <p className="font-serif text-lg font-bold leading-snug text-white">
                  {BRAND.legalName}
                </p>
                <p className="mt-2 text-sm font-semibold text-gold">{BRAND.tagline}</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                Professional legal services in commercial and civil law.
              </p>
              <p className="mt-3 text-sm text-gray-300">
                <span className="font-semibold text-white">{CONTACT.address}</span>
              </p>
              <SocialLinks />
            </div>

            <div>
              <h3 className="mb-4 font-serif text-lg text-gold">Quick Links</h3>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      title={getNavSeo(link.href)?.title}
                      className="text-sm text-gray-300 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-serif text-lg text-gold">Practice Areas</h3>
              <ul className="space-y-2">
                {PRACTICE_AREAS.slice(0, 6).map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/${area.slug}`}
                      title={`${area.navLabel ?? area.title} in Nepal`}
                      className="text-sm text-gray-300 transition-colors hover:text-gold"
                    >
                      {area.navLabel ?? area.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-serif text-lg text-gold">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <span className="block text-gold/80">Office</span>
                  {CONTACT.address}
                </li>
                <li>
                  <span className="block text-gold/80">Phone</span>
                  <div className="mt-1 space-y-1">
                    {CONTACT.phones.map((p) => (
                      <a
                        key={p.tel}
                        href={`tel:${p.tel}`}
                        className="block min-h-11 py-1 hover:text-gold"
                      >
                        {p.display}
                      </a>
                    ))}
                  </div>
                </li>
                <li>
                  <span className="block text-gold/80">Hours</span>
                  {CONTACT.hours}
                  <br />
                  {CONTACT.days}
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-gold">
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
              <Link href="/consultation" title={getNavSeo("/consultation")?.title} className="btn-gold mt-6 inline-block text-sm">
                Book Consultation
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Developed by{" "}
              <a
                href="https://nepatronix.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-300 transition-colors hover:text-gold"
              >
                Nepatronix
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
