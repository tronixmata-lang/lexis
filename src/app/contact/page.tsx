import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Lexis & Legis law firm in Nepal. Schedule a consultation with our legal team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We're here to help with your legal needs"
        breadcrumb="Contact"
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-navy">Get In Touch</h2>
              <p className="mt-4 text-gray-600">
                Fill out the form and our team will respond within 24 hours. For urgent matters, reach us via WhatsApp or phone.
              </p>
              <ul className="mt-8 space-y-4">
                <li>
                  <strong className="text-navy">Address:</strong>
                  <p className="text-gray-600">{BRAND.address}</p>
                </li>
                <li>
                  <strong className="text-navy">Phone:</strong>
                  <p>
                    <a href={`tel:${BRAND.phone}`} className="text-primary hover:underline">
                      {BRAND.phone}
                    </a>
                  </p>
                </li>
                <li>
                  <strong className="text-navy">Email:</strong>
                  <p>
                    <a href={`mailto:${BRAND.email}`} className="text-primary hover:underline">
                      {BRAND.email}
                    </a>
                  </p>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-100 bg-light-gray p-8">
              <ContactForm source="contact-page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
