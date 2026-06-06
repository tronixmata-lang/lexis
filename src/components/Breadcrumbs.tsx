import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export default function Breadcrumbs({
  items,
  className = "",
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav className={className} aria-label="Breadcrumb">
        <ol className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-300">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.path}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <span className="text-gold" aria-hidden>
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="font-semibold text-white" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="transition-colors hover:text-white">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
