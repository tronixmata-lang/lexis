import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { TEAM_MEMBERS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Legal Team",
  description:
    "Meet the experienced legal professionals at Lexis and Legis Law Associates, a leading law firm in Kathmandu, Nepal.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Our Legal Team"
        subtitle="Experienced attorneys dedicated to your success"
        breadcrumbItems={[
          { name: "Home", path: "/" },
          { name: "Our Team", path: "/team" },
        ]}
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.name}
                className="card-hover overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-navy to-primary">
                  <span className="font-serif text-5xl font-bold text-white/30">
                    {member.name.split(" ").pop()?.[0]}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-navy">{member.name}</h2>
                  <p className="text-sm font-medium text-gold">{member.role}</p>
                  <p className="mt-1 text-xs text-primary">{member.specialty}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}