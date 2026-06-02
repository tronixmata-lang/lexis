import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { PracticeIcon } from "@/components/icons/PracticeIcons";
import { PRACTICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Explore our legal practice areas including corporate law, litigation, IP, startup advisory, and more in Nepal.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHeader
        title="Practice Areas"
        subtitle="Comprehensive legal services for every need"
        breadcrumb="Services"
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-8 md:grid-cols-2">
            {PRACTICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/${area.slug}`}
                className="card-hover flex gap-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <PracticeIcon name={area.icon} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-navy">{area.title}</h2>
                  <p className="mt-2 text-sm text-gray-600">{area.description}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-primary">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
