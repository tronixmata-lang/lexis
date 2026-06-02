import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="section-padding bg-navy text-white">
      <div className="container-narrow">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div
            className="aspect-[4/3] rounded-lg bg-cover bg-center shadow-xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80')",
            }}
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">About The Firm</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Excellence in Legal Practice</h2>
            <p className="mt-6 leading-relaxed text-gray-300">
              Lexis &amp; Legis was founded with a mission to provide accessible, high-quality legal services to businesses and individuals in Nepal. Our team combines deep local expertise with international best practices.
            </p>
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold text-gold">Mission</h3>
                <p className="text-sm text-gray-300">Deliver practical, effective legal solutions that protect our clients&apos; interests.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gold">Vision</h3>
                <p className="text-sm text-gray-300">To be Nepal&apos;s most trusted law firm for corporate, litigation, and advisory services.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gold">Values</h3>
                <p className="text-sm text-gray-300">Integrity, transparency, excellence, and client-centric service in everything we do.</p>
              </div>
            </div>
            <Link href="/about" className="btn-gold mt-8 inline-block">
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
