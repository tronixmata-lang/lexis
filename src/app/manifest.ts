import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";
import { DEFAULT_SITE_DESCRIPTION } from "@/lib/seo-keywords";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: "Lexis & Legis",
    description: DEFAULT_SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0A1F44",
    theme_color: "#0F4FA8",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: BRAND.logo,
        sizes: "724x345",
        type: "image/png",
      },
    ],
  };
}
