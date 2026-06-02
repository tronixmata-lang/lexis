import Link from "next/link";
import { PRACTICE_AREAS } from "@/lib/constants";
import { PracticeIcon } from "@/components/icons/PracticeIcons";

export default function PracticeAreas() {
  return (
    <section className="section-padding bg-light-gray">
      <div className="container-narrow">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">What We Do</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Practice Areas</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Comprehensive legal services tailored to businesses, startups, and individuals across Nepal.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRACTICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/${area.slug}`}
              className="card-hover group rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <PracticeIcon name={area.icon} />
              </div>
              <h3 className="text-lg font-semibold text-navy">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{area.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/practice-areas" className="btn-primary">
            View All Practice Areas
          </Link>
        </div>
      </div>
    </section>
  );
}
