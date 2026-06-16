import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import OrganizationSchema from "@/components/OrganizationSchema";
import { createPageMetadata } from "@/lib/seo";
import { getLayoutSeo } from "@/lib/layout-seo";
import { BRAND, SITE_TITLE } from "@/lib/constants";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const { settings, keywords } = await getLayoutSeo();

  return {
    ...createPageMetadata({
      title: settings.siteTitle,
      description: settings.defaultDescription,
      path: "/",
      image: settings.ogImage ?? DEFAULT_OG_IMAGE,
      keywords,
    }),
    title: {
      default: settings.siteTitle || SITE_TITLE,
      template: `%s | ${BRAND.name}`,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexislegis.com"),
    verification: settings.googleSiteVerification
      ? { google: settings.googleSiteVerification }
      : undefined,
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
        { url: BRAND.logo, type: "image/png", sizes: "724x345" },
      ],
      apple: [{ url: "/icon-192.png", type: "image/png", sizes: "192x192" }],
      shortcut: "/icon-48.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <Suspense fallback={null}>
          <OrganizationSchema />
        </Suspense>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
