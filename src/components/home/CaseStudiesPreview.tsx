import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

export default function CaseStudiesPreview({ studies }: { studies: CaseStudy[] }) {
  const featured = studies.filter((s) => s.featured).slice(0, 3);

  return (
    <section className="section-padding bg-light-gray">
      <div className="container-narrow">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Proven Results</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Case Studies</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((study) => (
            <article key={study.id} className="card-hover rounded-lg bg-white p-6 shadow-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {study.category}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-navy">{study.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{study.summary}</p>
              <p className="mt-4 border-t border-gray-100 pt-4 text-sm font-medium text-primary">
                {study.outcome}
              </p>
            </article>
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
