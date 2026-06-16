import { WHY_CHOOSE } from "@/lib/constants";

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="text-center">
          <p className="section-eyebrow">Our Difference</p>
          <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Why Choose Lexis and Legis</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item) => (
            <div key={item.title} className="relative rounded-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
