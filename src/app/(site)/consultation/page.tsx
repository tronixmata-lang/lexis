import type { Metadata } from "next";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import ScheduleOnlineFallback from "@/components/ScheduleOnlineFallback";
import { getCalendlyUrl } from "@/lib/calendly";
import { createNavPageMetadata } from "@/lib/nav-seo";

export const metadata: Metadata = createNavPageMetadata("/consultation");

export default function ConsultationPage() {
  const calendlyUrl = getCalendlyUrl();

  return (
    <>
      <PageHeader
        title="Book a Consultation"
        subtitle="Schedule a meeting with our legal experts"
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-navy">Schedule Online</h2>
              <p className="mt-4 text-gray-600">
                Choose a convenient time for your initial consultation. Our team will review your matter and provide guidance on next steps.
              </p>
              {calendlyUrl ? (
                <CalendlyEmbed url={calendlyUrl} />
              ) : (
                <ScheduleOnlineFallback />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy">Or Send a Request</h2>
              <p className="mt-4 text-gray-600">
                Prefer we contact you? Fill out this form and we&apos;ll schedule a call.
              </p>
              <div className="mt-8 rounded-lg border border-gray-100 bg-light-gray p-6">
                <ContactForm source="consultation" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}