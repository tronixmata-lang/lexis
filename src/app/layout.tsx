import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import OrganizationSchema from "@/components/OrganizationSchema";
import { mergeSeoKeywords } from "@/lib/blog-seo";
import { getBlogPosts } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/fetch";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, posts] = await Promise.all([getSiteSettings(), getBlogPosts()]);

  return {
    ...createPageMetadata({
      title: settings.siteTitle,
      description: settings.defaultDescription,
      path: "/",
      image: settings.ogImage,
      keywords: mergeSeoKeywords(settings.allKeywords, posts),
    }),
    title: {
      default: settings.siteTitle,
      template: "%s || Lexislegis",
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
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/lexis.png", type: "image/png" },
      ],
      apple: "/apple-icon.svg",
      shortcut: "/lexis.png",
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
        <OrganizationSchema />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
