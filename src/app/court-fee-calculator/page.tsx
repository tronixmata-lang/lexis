import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CourtFeeCalculator from "@/components/tools/CourtFeeCalculator";
import {
  APPLICABLE_CASE_TYPES,
  COURT_FEE_LEGAL_BASIS,
  COURT_FEE_SLABS,
  FIXED_FEE_CASES,
} from "@/lib/court-fees";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Court Fee Calculator",
  description:
    "Calculate court filing fees for civil cases in Nepal. Slab-wise breakdown, legal basis, and applicable case types.",
  path: "/court-fee-calculator",
});

export default function CourtFeeCalculatorPage() {
  return (
    <>
      <PageHeader
        title="Court Fee Calculator"
        subtitle="Professional tool for estimating court filing fees in Nepal"
      />

      <section className="border-b border-gray-100 bg-white py-12">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Legal Resource</p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Court fee is a mandatory payment when filing a plaint, appeal, or counterclaim before a
              civil court in Nepal. This calculator assists clients, advocates, and court officials in
              determining the fee payable based on the value or amount claimed.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light-gray">
        <div className="container-narrow">
          <CourtFeeCalculator />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">Legal Framework</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-navy">When is court fee required?</h2>
              <div className="prose-legal mt-6 space-y-4 text-gray-700">
                <p>
                  Under Section 63, every person filing a plaint, appeal, or counterclaim in a civil
                  matter must pay court fee at the time of filing. The amount is determined by the
                  value of the subject matter or the amount claimed in the suit.
                </p>
                <p>
                  The rate of court fee is not a flat percentage of the total claim. Instead, Nepal
                  follows a progressive slab system under Section 69, where each prescribed rate applies
                  only to the portion of the claim falling within that specific bracket.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {COURT_FEE_LEGAL_BASIS.sections.map((section) => (
                <article
                  key={section.number}
                  className="rounded-xl border border-gray-100 bg-light-gray p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Section {section.number}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-bold text-navy">{section.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{section.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light-gray">
        <div className="container-narrow">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Official Rates</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-navy">Court fee structure</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              The following rates are prescribed under Section 69. Each rate applies only to the portion
              of the claim within the stated range.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Claim amount range</th>
                  <th className="px-6 py-4 font-semibold">Court fee rate</th>
                </tr>
              </thead>
              <tbody>
                {COURT_FEE_SLABS.map((slab) => (
                  <tr key={slab.label} className="border-t border-gray-100">
                    <td className="px-6 py-4 font-medium text-navy">{slab.label}</td>
                    <td className="px-6 py-4 text-gray-600">{slab.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">Applicability</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-navy">Common case types</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Court fee under the progressive slab system generally applies to civil and commercial
                claims where the relief sought is quantifiable in monetary terms.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {APPLICABLE_CASE_TYPES.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-100 p-5 transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-serif text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">Exceptions</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-navy">Fixed-fee cases</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Section 70 provides that certain matters carry a fixed court fee of Rs. 500 regardless
                of the claimed amount. This calculator does not apply to those cases.
              </p>
              <ul className="mt-6 space-y-3">
                {FIXED_FEE_CASES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-gray-100 bg-light-gray px-4 py-3 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
