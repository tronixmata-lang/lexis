import JsonLd from "./JsonLd";
import { siteNavigationSchema } from "@/lib/nav-seo";
import { absoluteUrl } from "@/lib/seo";

export default function SiteNavigationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": siteNavigationSchema().map((item) => ({
          ...item,
          url: absoluteUrl(item.url),
        })),
      }}
    />
  );
}
