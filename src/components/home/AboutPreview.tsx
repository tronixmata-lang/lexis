import Link from "next/link";
import { BRAND, TRUST_STATS } from "@/lib/constants";

export default function AboutPreview() {
  return (
    <section className="section-padding bg-navy text-white">
      <div className="container-narrow">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-primary/25 via-navy/40 to-gold/10 p-8 shadow-2xl lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08),transparent_60%)]" />
            <div className="pointer-events-none absolute left-5 top-5 h-10 w-10 border-l-2 border-t-2 border-gold/50" />
            <div className="pointer-events-none absolute bottom-5 right-5 h-10 w-10 border-b-2 border-r-2 border-gold/50" />
            <div className="relative grid grid-cols-2 gap-4">
              {TRUST_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
                >
                  <p className="font-serif text-2xl font-bold text-gold sm:text-3xl">{stat.value}</p>
                  <p className="mt-2 text-xs font-medium leading-snug text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="section-eyebrow-dark">About The Firm</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{BRAND.legalName}</h2>
            <p className="mt-6 leading-relaxed text-gray-300">
              A fast-growing law firm based in Kathmandu with working units all over Nepal. We specialize in Patent, Copyright, Trademark, Corporate Laws, Designs, Litigation and Arbitration, with international clients across the United States, Canada, Australia, India, England, Europe, and beyond.
            </p>
            <p className="mt-4 leading-relaxed text-gray-300">
              Our underlying belief is to provide incredibly reliable, quality and prompt services at a low cost. Timely advice saves time, effort and costs, this is where we create value for our clients.
            </p>
            <Link href="/about" className="btn-gold mt-8 inline-block">
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
