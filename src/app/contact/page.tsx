import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ContactInfoBar from "@/components/contact/ContactInfoBar";
import ContactInfoPanel from "@/components/contact/ContactInfoPanel";
import { BRAND, CONTACT, FIRM_MOTO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Lexis and Legis at Anamnagar Kathmandu. Call +977 15922904 or 9856044154. Open Sunday–Friday, 9 AM–7 PM. info@lexislegis.com",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-navy to-navy" />
        <div className="container-narrow relative z-10 px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Contact</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Your Legal Solution Starts Here
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
            Whether you require legal advice, consultation or case evaluation, do not hesitate to contact us.
            Your privacy is important to us and all details you share will be kept confidential.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {CONTACT.phones.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-navy transition-transform hover:scale-105"
              >
                Call {p.display}
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContactInfoBar />

      <section className="section-padding bg-light-gray">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="sticky top-24 overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-xl sm:p-8">
                <h2 className="font-serif text-2xl font-bold">Get In Touch</h2>
                <p className="mt-2 text-sm text-gray-400">
                  {CONTACT.hours} · {CONTACT.days}
                </p>
                <div className="mt-8">
                  <ContactInfoPanel />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">
                <div className="mb-8 border-b border-gray-100 pb-6">
                  <h2 className="text-2xl font-bold text-navy">Send Us a Message</h2>
                  <p className="mt-2 text-gray-600">
                    Fill out the form below and we will respond as soon as possible.
                  </p>
                </div>
                <ContactForm source="contact-page" full darkLabels />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white py-12">
        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gold">Our Moto</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-12">
            {FIRM_MOTO.map((item) => (
              <div key={item} className="flex items-center gap-2 text-navy">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
                  ✓
                </span>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-center text-white">
        <div className="container-narrow px-4">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Visit Our Office</h2>
          <p className="mt-3 text-lg text-gray-200">{CONTACT.address}</p>
          <p className="mt-4 text-gray-300">
            {CONTACT.hours} · {CONTACT.days}
          </p>
          <p className="mt-2">
            <a href={`mailto:${CONTACT.email}`} className="text-gold hover:underline">
              {CONTACT.email}
            </a>
          </p>
          <p className="mt-4 text-sm text-gray-400">{BRAND.legalName}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/practice-areas" className="btn-outline">
              Our Practice Areas
            </Link>
            <Link href="/consultation" className="btn-gold">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
