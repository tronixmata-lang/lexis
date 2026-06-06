import Link from "next/link";
import ContactForm from "./ContactForm";
import PageHeader from "./PageHeader";
import { BRAND } from "@/lib/constants";

import type { ServiceSubsection } from "@/lib/services";

interface ServicePageLayoutProps {
  title: string;
  navLabel?: string;
  subtitle: string;
  description: string;
  services: string[];
  slug: string;
  body?: string[];
  subsections?: ServiceSubsection[];
  faq?: string;
}

export default function ServicePageLayout({
  title,
  navLabel,
  subtitle,
  description,
  services,
  slug,
  body,
  subsections,
  faq,
}: ServicePageLayoutProps) {
  const displayTitle = navLabel ?? title;

  return (
    <>
      <PageHeader
        title={displayTitle}
        subtitle={subtitle}
        breadcrumbItems={[
          { name: "Home", path: "/" },
          { name: "Practice Areas", path: "/practice-areas" },
          { name: displayTitle, path: `/${slug}` },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl border-l-4 border-gold bg-light-gray/50 p-6 sm:p-8">
                <p className="text-lg leading-relaxed text-gray-800">{description}</p>
              </div>

              {body && body.length > 0 && (
                <div className="prose-legal mt-8 space-y-4 text-gray-700">
                  {body.map((paragraph) => (
                    <p key={paragraph.slice(0, 60)} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {subsections && subsections.length > 0 && (
                <div className="mt-10 space-y-8">
                  {subsections.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-xl font-bold text-navy">{section.title}</h3>
                      <ul className="mt-4 space-y-2">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-gray-700">
                            <span className="mt-1 text-gold">•</span>
                            <span className="text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-12">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-navy">
                  <span className="h-8 w-1 rounded-full bg-gold" />
                  Services We Provide
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                        ✓
                      </span>
                      <span className="text-sm text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {faq && (
                <div className="mt-10 rounded-xl border border-gray-100 bg-light-gray p-6">
                  <h3 className="text-lg font-bold text-navy">Frequently Asked</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq}</p>
                </div>
              )}

              <div className="mt-10 rounded-xl bg-navy p-6 text-white sm:p-8">
                <h3 className="font-serif text-xl font-bold">Why Lexis And Legis?</h3>
                <p className="mt-2 text-sm text-gray-300">
                  {faq ??
                    "Lexis and Legis is a leading law firm in Nepal, offering professional legal services in commercial and civil law, including legal consultations, document drafting, and court representation."}
                </p>
                <Link href="/contact" className="btn-gold mt-6 inline-block text-sm">
                  Discuss Your Matter
                </Link>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                <div className="bg-gradient-to-r from-navy to-primary px-6 py-5">
                  <h3 className="text-lg font-semibold text-white">Request Consultation</h3>
                  <p className="mt-1 text-sm text-gray-200">
                    Speak with our {title.toLowerCase()} team
                  </p>
                </div>
                <div className="p-6">
                  <ContactForm source={title} compact />
                  <Link
                    href="/consultation"
                    className="btn-gold mt-4 block w-full text-center text-sm"
                  >
                    Book Online
                  </Link>
                  <div className="mt-3 space-y-1 text-center">
                    {BRAND.phones.map((p) => (
                      <a
                        key={p.tel}
                        href={`tel:${p.tel}`}
                        className="block text-sm font-medium text-primary hover:underline"
                      >
                        {p.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
