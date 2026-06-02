import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Book Consultation",
  description: "Schedule a legal consultation with Lexis & Legis. Online booking available.",
};

const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL;

export default function ConsultationPage() {
  return (
    <>
      <PageHeader
        title="Book a Consultation"
        subtitle="Schedule a meeting with our legal experts"
        breadcrumb="Consultation"
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-navy">Schedule Online</h2>
              <p className="mt-4 text-gray-600">
                Choose a convenient time for your initial consultation. Our team will review your matter and provide guidance on next steps.
              </p>
              {CALENDLY ? (
                <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    src={CALENDLY}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title="Book consultation"
                    className="min-h-[500px]"
                  />
                </div>
              ) : (
                <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-light-gray p-8 text-center">
                  <p className="text-gray-600">
                    Add your Calendly URL to <code className="text-sm">NEXT_PUBLIC_CALENDLY_URL</code> in{" "}
                    <code className="text-sm">.env.local</code> to enable online booking.
                  </p>
                </div>
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
