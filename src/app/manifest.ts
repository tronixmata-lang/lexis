import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";
import { DEFAULT_SITE_DESCRIPTION } from "@/lib/seo-keywords";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: "Lexislegis",
    description: DEFAULT_SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0A1F44",
    theme_color: "#0F4FA8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/lexis.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
