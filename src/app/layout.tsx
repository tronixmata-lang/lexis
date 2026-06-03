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
    "Lexis and Legis Law Associates — leading law firm in Kathmandu, Nepal. Commercial law, litigation, foreign investment, IP, tax, and corporate legal services.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexislegis.com"),
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
    images: [
      {
        url: "/lexis.png",
        alt: `${BRAND.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    images: ["/lexis.png"],
  },
  icons: {
    icon: "/lexis.png",
    apple: "/lexis.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="index" href="/" />
      </head>
      <body className="min-h-screen antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
