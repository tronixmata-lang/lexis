import Image from "next/image";
import type { CaseStudy } from "@/lib/types";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="card-hover overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-10 h-1.5 bg-linear-to-r from-primary to-gold" />
        <div className="relative h-44 bg-slate-100 sm:h-48">
          <Image
            src={study.image ?? "/blog-card-placeholder.svg"}
            alt={study.title}
            fill
            unoptimized={study.image?.endsWith(".svg")}
            className="object-cover transition duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-primary shadow-sm">
          {study.category}
        </span>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-navy">{study.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{study.summary}</p>
        <p className="mt-4 border-t border-gray-100 pt-4 text-sm font-medium leading-relaxed text-primary">
          {study.outcome}
        </p>
      </div>
    </article>
  );
}
