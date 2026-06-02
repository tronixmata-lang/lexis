import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/constants";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Get In Touch</p>
            <h2 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Contact Us Today</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Schedule a consultation with our experienced legal team. We respond to all inquiries within 24 hours.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold">📍</span>
                <span className="text-gray-700">{BRAND.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold">📞</span>
                <a href={`tel:${BRAND.phone}`} className="text-gray-700 hover:text-primary">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-gold">✉️</span>
                <a href={`mailto:${BRAND.email}`} className="text-gray-700 hover:text-primary">
                  {BRAND.email}
                </a>
              </li>
            </ul>
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
