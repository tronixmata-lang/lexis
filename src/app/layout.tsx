import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { BRAND } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} | Law Firm in Nepal`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Trusted legal advisors in Nepal delivering corporate law, litigation, IP, startup advisory, and comprehensive legal services for businesses and individuals.",
  keywords: [
    "law firm in Nepal",
    "corporate lawyer Nepal",
    "litigation attorney Nepal",
    "intellectual property Nepal",
    "startup legal advisor",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BRAND.name,
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
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
