import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";
import type { CaseStudy } from "@/lib/types";

export default function CaseStudiesPreview({ studies }: { studies: CaseStudy[] }) {
  const featured = studies.filter((s) => s.featured).slice(0, 3);

  return (
    <section className="section-padding bg-light-gray">
      <div className="container-narrow">
        <div className="text-center">
          <p className="section-eyebrow">Our Specialization</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Areas of Expertise</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/case-studies" className="btn-primary">
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
