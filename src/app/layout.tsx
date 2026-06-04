import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import OrganizationSchema from "@/components/OrganizationSchema";
import { BRAND } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: `${BRAND.name} | Law Firm in Nepal`,
    description:
      "Leading law firm in Kathmandu, Nepal. Corporate law, litigation, foreign investment, intellectual property, tax, and corporate legal services.",
    path: "/",
  }),
  title: {
    default: `${BRAND.name} | Law Firm in Nepal`,
    template: `%s | ${BRAND.name}`,
  },
  keywords: [
    "law firm in Nepal",
    "law firm in Kathmandu",
    "corporate lawyer Nepal",
    "litigation attorney Nepal",
    "intellectual property Nepal",
    "foreign investment lawyer Nepal",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexislegis.com"),
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/lexis.png",
    apple: "/lexis.png",
  },
};

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
