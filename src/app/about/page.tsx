import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { WHY_CHOOSE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Lexis & Legis — our mission, vision, values, and commitment to legal excellence in Nepal.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Lexis & Legis"
        subtitle="Excellence in legal practice since our founding"
        breadcrumb="About"
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-2">
            <div
              className="aspect-[4/3] rounded-lg bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80')",
              }}
            />
            <div className="prose-legal text-gray-700">
              <h2 className="text-2xl font-bold text-navy">Our Story</h2>
              <p>
                Lexis &amp; Legis was established by a team of experienced attorneys committed to raising the standard of legal services in Nepal. We recognized that businesses and individuals needed accessible, practical legal counsel—not just theoretical advice.
              </p>
              <p>
                Today, we serve a diverse clientele ranging from multinational corporations and growing startups to individuals navigating personal legal matters. Our multidisciplinary team brings together expertise in corporate law, litigation, intellectual property, and regulatory compliance.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gold">Mission</h3>
              <p className="mt-3 text-gray-600">
                To deliver practical, effective, and results-driven legal solutions that protect our clients&apos; interests and enable their success.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gold">Vision</h3>
              <p className="mt-3 text-gray-600">
                To be Nepal&apos;s most trusted law firm, recognized for excellence in corporate advisory, litigation, and client service.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gold">Values</h3>
              <p className="mt-3 text-gray-600">
                Integrity, transparency, excellence, and a relentless client-centric approach guide every matter we handle.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-navy">Why Clients Choose Us</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {WHY_CHOOSE.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-2xl text-gold">◆</span>
                  <div>
                    <h3 className="font-semibold text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/team" className="btn-primary">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
