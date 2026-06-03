import Link from "next/link";
import { BRAND, FIRM_MOTO } from "@/lib/constants";

export default function AboutPreview() {
  return (
    <section className="section-padding bg-navy text-white">
      <div className="container-narrow">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/40 to-gold/20 flex items-center justify-center p-8">
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-gold">Our Moto</p>
              <ul className="mt-6 space-y-3 text-left text-sm text-gray-200">
                {FIRM_MOTO.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-gold">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">About The Firm</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{BRAND.legalName}</h2>
            <p className="mt-6 leading-relaxed text-gray-300">
              A fast-growing law firm based in Kathmandu with working units all over Nepal. We specialize in Patent, Copyright, Trademark, Corporate Laws, Designs, Litigation and Arbitration—with international clients across the United States, Canada, Australia, India, England, Europe, and beyond.
            </p>
            <p className="mt-4 leading-relaxed text-gray-300">
              Our underlying belief is to provide incredibly reliable, quality and prompt services at a low cost. Timely advice saves time, effort and costs—this is where we create value for our clients.
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
