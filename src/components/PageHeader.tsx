export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="container-narrow px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">{subtitle}</p>}
      </div>
    </section>
  );
}
