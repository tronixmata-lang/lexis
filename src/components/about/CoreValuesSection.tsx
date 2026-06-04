import { FIRM_MOTO } from "@/lib/constants";

const VALUE_DETAILS: Record<(typeof FIRM_MOTO)[number], string> = {
  "Client Oriented":
    "We put client needs first and tailor every strategy to your objectives and circumstances.",
  "Professional and Efficient Service Delivery":
    "Quality legal work delivered promptly, with clear communication at every stage.",
  Confidentiality:
    "Your matters are handled with the utmost discretion, trust, and professional integrity.",
};

export default function CoreValuesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">What We Stand For</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-navy sm:text-4xl">Our Core Values</h2>
          <p className="mt-4 text-gray-600">
            The principles that guide every client relationship and every matter we handle.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FIRM_MOTO.map((value) => (
            <article
              key={value}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-light-gray p-8 transition-all hover:border-primary/20 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-gold opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold text-navy">{value}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{VALUE_DETAILS[value]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
