import Image from "next/image";
import Link from "next/link";

interface PracticeAreaCardProps {
  slug: string;
  title: string;
  navLabel?: string;
  description: string;
  image: string;
  index?: number;
}

export default function PracticeAreaCard({
  slug,
  title,
  navLabel,
  description,
  image,
  index = 0,
}: PracticeAreaCardProps) {
  const displayTitle = navLabel ?? title;

  return (
    <Link
      href={`/${slug}`}
      className="card-hover group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ring-1 ring-black/[0.04] transition-all hover:border-primary/30 hover:shadow-xl"
    >
      <div className="absolute inset-y-0 left-0 z-10 w-1 bg-gradient-to-b from-primary via-primary/80 to-gold" />

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy/5">
        <Image
          src={image}
          alt={displayTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
        <span
          className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-1 font-serif text-lg font-bold leading-none text-navy/70 backdrop-blur-sm"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-navy group-hover:text-primary">
          {displayTitle}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
          {description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
          View details
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
