export default function HomeSectionSkeleton() {
  return (
    <section className="section-padding animate-pulse bg-light-gray" aria-hidden="true">
      <div className="container-narrow">
        <div className="mx-auto h-4 w-32 rounded bg-gray-200" />
        <div className="mx-auto mt-3 h-10 w-64 rounded bg-gray-200" />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-72 rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    </section>
  );
}
