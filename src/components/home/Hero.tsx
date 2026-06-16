import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[62vh] items-center bg-navy sm:min-h-[70vh]">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,79,168,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(201,162,39,0.12),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" aria-hidden="true" />

      <div className="container-narrow relative z-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 section-eyebrow-dark">Corporate Law Firm in Nepal</p>
          <h1 className="hero-lcp-title text-4xl sm:text-5xl lg:text-6xl">
            Leading Law Firm in Kathmandu, Nepal
          </h1>
          <p className="mt-6 hidden max-w-2xl font-sans text-lg leading-relaxed text-gray-300 sm:mx-auto sm:block sm:text-xl">
            Trusted legal advisors in commercial and civil law across Nepal.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/consultation" className="btn-gold text-center">
              Book Consultation
            </Link>
            <Link href="/contact" className="btn-outline text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
