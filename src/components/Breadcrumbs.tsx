import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "dark" | "light";
  includeSchema?: boolean;
};

export default function Breadcrumbs({
  items,
  className = "",
  variant = "dark",
  includeSchema = true,
}: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  const isLight = variant === "light";
  const justify = className.includes("justify-") ? "" : "justify-center";

  return (
    <>
      {includeSchema && <JsonLd data={breadcrumbSchema(items)} />}
      <nav className={`${className} ${justify}`.trim()} aria-label="Breadcrumb">
        <ol
          className={`inline-flex flex-nowrap items-center gap-x-2 text-sm ${
            isLight ? "text-gray-500" : "text-gray-300"
          }`}
        >
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
                  <span
                    className={`font-semibold ${isLight ? "text-navy" : "text-white"}`}
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className={`transition-colors ${
                      isLight ? "hover:text-primary" : "text-gray-300 hover:text-gold"
                    }`}
                  >
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
