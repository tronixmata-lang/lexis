import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageLayout from "@/components/ServicePageLayout";
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
  return {
    title: page.title,
    description: page.subtitle,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const page = SERVICE_PAGES[service];
  if (!page) notFound();

  return (
    <ServicePageLayout
      title={page.title}
      subtitle={page.subtitle}
      description={page.description}
      services={page.services}
      slug={service}
    />
  );
}
