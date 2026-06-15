import type { Metadata } from "next";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import SetBreadcrumbs from "@/components/BreadcrumbContext";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import ScheduleOnlineFallback from "@/components/ScheduleOnlineFallback";
import { consultationTrail } from "@/lib/breadcrumbs";
import { getCalendlyUrl } from "@/lib/calendly";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Book Legal Consultation",
  description:
    "Schedule a consultation with experienced attorneys at Lexis and Legis Law Associates in Kathmandu, Nepal. Corporate, civil, IP and litigation advice.",
  path: "/consultation",
});

export default function ConsultationPage() {
  const calendlyUrl = getCalendlyUrl();
  const breadcrumbs = consultationTrail();

  return (
    <>
      <SetBreadcrumbs items={breadcrumbs} />
      <PageHeader
        title="Book a Consultation"
        subtitle="Schedule a meeting with our legal experts"
        breadcrumbItems={breadcrumbs}
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