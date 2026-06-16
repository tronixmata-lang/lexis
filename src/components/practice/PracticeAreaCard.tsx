import Link from "next/link";
import { PracticeIcon } from "@/components/icons/PracticeIcons";

interface PracticeAreaCardProps {
  slug: string;
  title: string;
  navLabel?: string;
  description: string;
  icon: string;
  index?: number;
}

export default function PracticeAreaCard({
  slug,
  title,
  navLabel,
  description,
  icon,
  index = 0,
}: PracticeAreaCardProps) {
  const displayTitle = navLabel ?? title;

  return (
    <Link
      href={`/${slug}`}
      className="card-hover group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-md ring-1 ring-black/[0.04] transition-all hover:border-primary/30 hover:shadow-xl"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-primary/80 to-gold" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="text-primary transition-colors group-hover:text-navy">
          <PracticeIcon name={icon} />
        </div>
        <span className="decorative-index text-2xl leading-none" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h2 className="relative mt-5 font-serif text-lg font-semibold text-navy group-hover:text-primary">
        {displayTitle}
      </h2>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
        {description}
      </p>
      <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
        View details
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
