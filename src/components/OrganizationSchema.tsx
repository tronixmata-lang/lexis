import JsonLd from "./JsonLd";
import { getBlogTitles } from "@/lib/blog-seo";
import { getBlogPosts } from "@/lib/data";
import { GOOGLE_REVIEWS } from "@/lib/google-reviews-data";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export default async function OrganizationSchema() {
  const posts = await getBlogPosts();
  const blogTitles = getBlogTitles(posts);

  return (
    <JsonLd
      data={[
        organizationSchema(
          GOOGLE_REVIEWS.rating > 0
            ? { rating: GOOGLE_REVIEWS.rating, totalReviews: GOOGLE_REVIEWS.totalReviews }
            : undefined,
          blogTitles
        ),
        websiteSchema(),
      ]}
    />
  );
}
