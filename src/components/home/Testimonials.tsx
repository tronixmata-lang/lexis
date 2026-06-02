import type { Testimonial } from "@/lib/types";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const featured = items.filter((t) => t.featured);

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Client Voices</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">What Our Clients Say</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((t) => (
            <blockquote key={t.id} className="rounded-lg border border-gray-100 bg-light-gray p-6">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">&ldquo;{t.content}&rdquo;</p>
              <footer className="mt-6">
                <p className="font-semibold text-navy">{t.name}</p>
                <p className="text-sm text-gray-500">
                  {t.role}, {t.company}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
