import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { BRAND, CONTACT } from "@/lib/constants";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Get In Touch</p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Contact Us Today</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Visit us in Anamnagar, Kathmandu, or reach out by phone or email. We respond to all inquiries
              promptly during office hours.
            </p>
            <ul className="mt-8 space-y-5">
              <li>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">Our Offices</p>
                <p className="mt-1 text-gray-700">{CONTACT.address}</p>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">Contact Info</p>
                <div className="mt-1 space-y-1">
                  {CONTACT.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="block text-gray-700 hover:text-primary">
                      {p.display}
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">Opening Hours</p>
                <p className="mt-1 text-gray-700">{CONTACT.hours}</p>
                <p className="text-sm text-gray-500">{CONTACT.days}</p>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">Our Email</p>
                <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-gray-700 hover:text-primary">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <Link href="/contact" className="btn-primary mt-8 inline-block text-sm">
              Full Contact Page →
            </Link>
          </div>
          <div className="rounded-lg border border-gray-100 bg-light-gray p-6 sm:p-8">
            <h3 className="mb-6 text-xl font-semibold text-navy">Send Us a Message</h3>
            <ContactForm source="homepage" />
          </div>
        </div>
      </div>
    </section>
  );
}
