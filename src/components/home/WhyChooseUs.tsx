import { WHY_CHOOSE } from "@/lib/constants";

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Our Difference</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Why Choose Lexis &amp; Legis</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item, i) => (
            <div key={item.title} className="relative rounded-lg border border-gray-100 p-6">
              <span className="font-serif text-4xl font-bold text-gold/30">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl font-semibold text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
