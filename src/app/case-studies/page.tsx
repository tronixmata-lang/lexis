import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getCaseStudies } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies",
  description:
    "Success stories and case studies from Lexis and Legis Law Associates, a leading law firm in Kathmandu, Nepal.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <>
      <PageHeader
        title="Case Studies"
        subtitle="Proven results for our clients"
        breadcrumb="Success Stories"
        breadcrumbItems={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ]}
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((study) => (
              <article key={study.id} className="card-hover rounded-lg bg-white p-6 shadow-sm">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {study.category}
                </span>
                <h2 className="mt-4 text-xl font-semibold text-navy">{study.title}</h2>
                <p className="mt-3 text-sm text-gray-600">{study.summary}</p>
                <p className="mt-4 border-t border-gray-100 pt-4 text-sm font-medium text-primary">
                  {study.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
