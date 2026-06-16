import type { Metadata } from "next";
import Link from "next/link";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import PageHeader from "@/components/PageHeader";
import { BRAND, CONTACT, TRUST_STATS, WHY_CHOOSE } from "@/lib/constants";
import { createNavPageMetadata } from "@/lib/nav-seo";

export const metadata: Metadata = createNavPageMetadata("/about");

const EXPERTISE = [
  {
    title: "Corporate Litigation",
    summary:
      "Legal disputes arising from business operations, shareholder conflicts, breach of contract, corporate governance, IP, employment, M&A, and regulatory compliance.",
    approach:
      "Strategic assessment, rigorous representation, alternative dispute resolution when suitable, and close client partnership aligned with business objectives.",
  },
  {
    title: "Commercial Arbitration",
    summary:
      "Efficient, confidential, and binding dispute resolution for contractual disputes, cross-border transactions, joint ventures, IP, M&A, and public procurement matters.",
    approach:
      "Customized arbitration agreements, strategic case assessment, institutional and ad hoc advocacy, and global enforcement under the New York Convention.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" subtitle={BRAND.tagline} />

      {/* Stats strip */}
      <section className="border-b border-gray-100 bg-white py-12">
        <div className="container-narrow">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Firm story */}
      <section className="section-padding bg-light-gray">
        <div className="container-narrow">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">Who We Are</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-navy sm:text-4xl">
                {BRAND.legalName}
              </h2>
              <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  {BRAND.legalName} is a fast-growing law firm based in Kathmandu with working units all
                  over Nepal and international clients in the United States, Canada, Australia, India,
                  England, Europe, and many other countries.
                </p>
                <p>
                  We specialize in Patent, Copyright, Trademark, Corporate Laws, Designs, Litigation and
                  Arbitration across courts and tribunals, providing services across almost all important
                  facets of law in different jurisdictions.
                </p>
                <p>
                  We are a team of professionally managed attorneys providing global legal services with a
                  fundamental belief in reliable, quality, and prompt service at a fair cost. Timely advice
                  saves time, effort, and costs for our clients.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg sm:p-10">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-gold" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Commitment</p>
              <blockquote className="mt-4 font-serif text-xl leading-relaxed text-navy">
                &ldquo;Every scope of work is well-defined and communicated to the client, well in advance.
                We take pride in earning repeat work from existing clients through trust and results.&rdquo;
              </blockquote>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-light-gray p-4">
                  <p className="text-2xl font-bold text-primary">18+</p>
                  <p className="mt-1 text-sm text-gray-600">Practice Areas</p>
                </div>
                <div className="rounded-xl bg-light-gray p-4">
                  <p className="text-2xl font-bold text-primary">Global</p>
                  <p className="mt-1 text-sm text-gray-600">Client Reach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CoreValuesSection />

      {/* Expertise */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Areas of Strength</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-navy sm:text-4xl">
              Litigation &amp; Arbitration Expertise
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {EXPERTISE.map((area) => (
              <article
                key={area.title}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="h-1.5 bg-gradient-to-r from-primary to-gold" />
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-navy">{area.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{area.summary}</p>
                  <div className="mt-6 rounded-xl bg-light-gray p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">Our Approach</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{area.approach}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-padding bg-light-gray">
        <div className="container-narrow">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Our Difference</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-navy sm:text-4xl">
              Why {BRAND.name}?
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 text-white">
        <div className="container-narrow px-4 text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Ready to Work With Our Team?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            Meet our attorneys or reach out to discuss your legal matter. We serve clients in Kathmandu,
            across Nepal, and internationally.
          </p>
          <p className="mt-3 text-sm text-gray-400">
            {CONTACT.address} · {CONTACT.hours} · {CONTACT.days}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/team" className="btn-gold">
              Meet Our Team
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
