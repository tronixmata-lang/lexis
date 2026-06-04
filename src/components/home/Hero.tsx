import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center bg-navy">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />

      <div className="container-narrow relative z-10 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
            Corporate Law Firm in Nepal
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Leading Law Firm in Kathmandu, Nepal
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-300 sm:text-xl">
            Welcome to {BRAND.name}. Trusted legal advisors delivering professional and efficient services in commercial and civil law.
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
