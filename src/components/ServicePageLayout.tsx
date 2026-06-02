import Link from "next/link";
import ContactForm from "./ContactForm";
import PageHeader from "./PageHeader";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  slug: string;
}

export default function ServicePageLayout({
  title,
  subtitle,
  description,
  services,
}: ServicePageLayoutProps) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} breadcrumb="Practice Area" />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="prose-legal text-gray-700">
                <p className="text-lg leading-relaxed">{description}</p>
              </div>
              <h2 className="mt-10 text-2xl font-bold text-navy">Our Services Include</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-2">
                    <span className="mt-1 text-gold">✓</span>
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-lg border border-gray-100 bg-light-gray p-6">
              <h3 className="text-lg font-semibold text-navy">Request Consultation</h3>
              <p className="mt-2 text-sm text-gray-600">
                Speak with our {title.toLowerCase()} specialists.
              </p>
              <div className="mt-6">
                <ContactForm source={title} compact />
              </div>
              <Link href="/consultation" className="btn-gold mt-6 block w-full text-center text-sm">
                Book Online
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
