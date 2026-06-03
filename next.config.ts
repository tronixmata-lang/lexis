import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
