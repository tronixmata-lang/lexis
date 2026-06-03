import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { BRAND, FIRM_MOTO, WHY_CHOOSE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Lexis and Legis Law Associates — a leading law firm in Kathmandu, Nepal offering commercial, civil, IP, litigation and arbitration services.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle={BRAND.tagline}
        breadcrumb="About"
      />
      <section className="section-padding">
        <div className="container-narrow max-w-4xl">
          <div className="prose-legal text-gray-700">
            <p className="text-lg leading-relaxed">
              {BRAND.legalName} is a fast-growing law firm based in Kathmandu with working units all over Nepal and international clients in the United States, Canada, Australia, India, England, Europe, and many other countries. It provides services across almost all important facets of law in different jurisdictions and specializes in Patent, Copyright, Trademark, Corporate Laws, Designs, Litigation and Arbitration in all courts and Tribunals.
            </p>
            <p className="mt-4 leading-relaxed">
              We are a team of professionally managed Attorneys providing global legal services. The underlying belief of the firm is to provide incredibly reliable, quality and prompt services at a low cost. A timely right advice could save a lot of time, efforts and costs for a client. This is where the firm utilizes its expertise and experience in creating value for its clients.
            </p>
            <p className="mt-4 leading-relaxed">
              The firm takes pride in declaring that it gets huge work time and again from its existing clients, and attributes its success to its fundamental policy of growth of its members and associates. We communicate with clients very well at every stage, and every scope of work is well-defined and made known to the client, well in advance.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-navy">Our Moto</h2>
            <ul className="mt-4 space-y-2">
              {FIRM_MOTO.map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-700">
                  <span className="text-gold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-navy">Corporate Litigation</h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              Corporate litigation refers to legal disputes arising from business operations and corporate affairs—conflicts within a company (shareholders, partners, directors) and external disputes involving customers, competitors, regulatory bodies, or other entities. This includes breach of contract, corporate governance, intellectual property, employment issues, fiduciary duties, mergers and acquisitions, and regulatory compliance.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              Our approach includes strategic assessment, rigorous representation, alternative dispute resolution when suitable, and close client partnership to align litigation strategy with business objectives and risk tolerance.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-navy">Commercial Arbitration</h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              We provide expert legal representation for efficient, confidential, and binding dispute resolution outside traditional courts—including contractual disputes, cross-border transactions, joint venture conflicts, IP and trade secrets, M&A disputes, sector-specific arbitration (finance, construction, energy), and public procurement disputes.
            </p>
            <p className="mt-4 leading-relaxed text-gray-700">
              We assist with customized arbitration agreements, strategic case assessment, experienced advocacy in institutional and ad hoc proceedings, and global enforcement leveraging international treaties such as the New York Convention.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-navy">Why {BRAND.name}?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {WHY_CHOOSE.map((item) => (
                <div key={item.title} className="rounded-lg border border-gray-100 p-4">
                  <h3 className="font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/team" className="btn-primary">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
