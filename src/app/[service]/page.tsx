import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServicePageLayout from "@/components/ServicePageLayout";
import { createPageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { SERVICE_PAGES } from "@/lib/services";

export async function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const page = SERVICE_PAGES[service];
  if (!page) return { title: "Service" };

  const displayTitle = page.navLabel ?? page.title;

  return createPageMetadata({
    title: `${displayTitle} in Nepal`,
    description: `${page.subtitle}. Expert legal services from Lexis and Legis Law Associates in Kathmandu, Nepal.`,
    path: `/${service}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const page = SERVICE_PAGES[service];
  if (!page) notFound();

  const displayTitle = page.navLabel ?? page.title;

  return (
    <>
      <JsonLd data={serviceSchema(service, displayTitle, page.description)} />
      <ServicePageLayout
        title={page.title}
        navLabel={page.navLabel}
        subtitle={page.subtitle}
        description={page.description}
        services={page.services}
        body={page.body}
        subsections={page.subsections}
        faq={page.faq}
        slug={service}
      />
    </>
  );
}
