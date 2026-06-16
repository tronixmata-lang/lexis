import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactInfoPanel from "@/components/contact/ContactInfoPanel";
import { BRAND } from "@/lib/constants";
import { getNavSeo } from "@/lib/nav-seo";
import { createPageMetadata } from "@/lib/seo";
import { getContactPageContent } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactPageContent();
  const nav = getNavSeo("/contact");

  return createPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: "/contact",
    keywords: nav?.keywords,
  });
}

export default async function ContactPage() {
  const content = await getContactPageContent();
  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to get in touch with Lexis and Legis Law Associates."
  );
  const primaryPhone = content.phones[1] ?? content.phones[0];

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-navy to-navy" />
        <div className="container-narrow relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              {content.heroEyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              {content.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">{content.heroSubtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`tel:${primaryPhone.tel}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-bold text-navy transition-transform hover:scale-105"
              >
                Call {primaryPhone.display}
              </a>
              <a
                href={`${BRAND.social.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light-gray">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="sticky top-24 overflow-hidden rounded-2xl bg-navy p-6 text-center text-white shadow-xl sm:p-8">
                <h2 className="font-serif text-2xl font-bold">{content.getInTouchTitle}</h2>
                <p className="mt-2 text-sm text-gray-400">
                  {content.hours} · {content.days}
                </p>
                <div className="mt-8">
                  <ContactInfoPanel content={content} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">
                <div className="mb-8 border-b border-gray-100 pb-6">
                  <h2 className="text-2xl font-bold text-navy">{content.formTitle}</h2>
                  <p className="mt-2 text-gray-600">{content.formSubtitle}</p>
                </div>
                <ContactForm source="contact-page" full darkLabels />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
