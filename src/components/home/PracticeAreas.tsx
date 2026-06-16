import Link from "next/link";
import { PRACTICE_AREAS, PRACTICE_AREAS_INTRO } from "@/lib/constants";
import PracticeAreaCard from "@/components/practice/PracticeAreaCard";

export default function PracticeAreas() {
  return (
    <section className="section-padding bg-light-gray">
      <div className="container-narrow">
        <div className="text-center">
          <p className="section-eyebrow">What We Do</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Our Practice Areas</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">{PRACTICE_AREAS_INTRO}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRACTICE_AREAS.slice(0, 8).map((area, index) => (
            <PracticeAreaCard
              key={area.slug}
              slug={area.slug}
              title={area.title}
              navLabel={area.navLabel}
              description={area.description}
              image={area.image}
              index={index}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/practice-areas" className="btn-primary">
            View All {PRACTICE_AREAS.length} Practice Areas
          </Link>
        </div>
      </div>
    </section>
  );
}
