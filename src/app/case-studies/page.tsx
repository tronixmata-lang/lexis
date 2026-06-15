import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import SetBreadcrumbs from "@/components/BreadcrumbContext";
import PageHeader from "@/components/PageHeader";
import { getCaseStudies } from "@/lib/data";
import { caseStudiesTrail } from "@/lib/breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies",
  description:
    "Success stories and case studies from Lexis and Legis Law Associates, a leading law firm in Kathmandu, Nepal.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  const breadcrumbs = caseStudiesTrail();

  return (
    <>
      <SetBreadcrumbs items={breadcrumbs} />
      <PageHeader
        title="Case Studies"
        subtitle="Proven results for our clients"
        breadcrumbItems={breadcrumbs}
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
