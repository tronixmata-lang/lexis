import Link from "next/link";

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="container-narrow px-4 text-center sm:px-6 lg:px-8">
        {breadcrumb && (
          <nav className="mb-4 text-sm text-gray-300" aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-2 text-gray-300">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-gold">/</li>
              <li className="font-semibold text-white">{breadcrumb}</li>
            </ol>
          </nav>
        )}
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">{subtitle}</p>}
      </div>
    </section>
  );
}
