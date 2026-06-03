import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PracticeAreaCard from "@/components/practice/PracticeAreaCard";
import { PRACTICE_AREAS, PRACTICE_AREAS_INTRO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "18 practice areas at Lexis and Legis — litigation, foreign investment, IP, tax, aviation, capital markets, and more in Nepal.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHeader
        title="Practice Areas"
        subtitle="Professional legal services in commercial and civil law"
        breadcrumb="Services"
      />

      <section className="border-b border-gray-100 bg-white py-10">
        <div className="container-narrow px-4 text-center sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl leading-relaxed text-gray-600">{PRACTICE_AREAS_INTRO}</p>
          <p className="mt-4 text-sm font-medium text-primary">
            {PRACTICE_AREAS.length} specialized practice areas
          </p>
        </div>
      </section>

      <section className="section-padding bg-light-gray">
        <div className="container-narrow">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE_AREAS.map((area, index) => (
              <PracticeAreaCard
                key={area.slug}
                slug={area.slug}
                title={area.title}
                navLabel={area.navLabel}
                description={area.description}
                icon={area.icon}
                index={index}
              />
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-navy px-8 py-10 text-center text-white sm:px-12">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Need Legal Guidance?</h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-300">
              Our attorneys are ready to assist with consultations, document drafting, and court representation.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-gold">
                Contact Us
              </Link>
              <Link href="/consultation" className="btn-outline">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
