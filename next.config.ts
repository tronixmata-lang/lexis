import type { NextConfig } from "next";

const staticAssetCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  transpilePackages: ["next-sanity", "sanity"],
  async headers() {
    return [
      {
        source: "/lexis.png",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/icon-:size.png",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/favicon.ico", destination: "/icon-48.png", permanent: true },
      { source: "/corporate-law", destination: "/company-law", permanent: true },
      { source: "/litigation", destination: "/civil-and-criminal-litigation", permanent: true },
      { source: "/intellectual-property", destination: "/intellectual-property-law", permanent: true },
      { source: "/contract-drafting", destination: "/commercial-contracts", permanent: true },
      { source: "/startup-advisory", destination: "/foreign-investment", permanent: true },
      { source: "/arbitration", destination: "/public-procurement-and-arbitration", permanent: true },
      { source: "/tax-compliance", destination: "/tax-law", permanent: true },
      { source: "/real-estate", destination: "/property-law", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      {
        source: "/capital-markets",
        destination: "/capital-markets-and-securities-law",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
