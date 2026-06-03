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
      className="card-hover group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg"
    >
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gold/5 transition-transform group-hover:scale-110" />
      <span className="text-xs font-semibold text-gold/80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all group-hover:from-primary group-hover:to-primary/80 group-hover:text-white">
        <PracticeIcon name={icon} />
      </div>
      <h2 className="relative mt-5 text-lg font-semibold text-navy group-hover:text-primary">
        {displayTitle}
      </h2>
      <p className="relative mt-2 text-sm leading-relaxed text-gray-600 line-clamp-3">
        {description}
      </p>
      <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
        View details
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
