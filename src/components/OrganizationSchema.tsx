import JsonLd from "./JsonLd";
import { getBlogPosts } from "@/lib/data";
import { getBlogTitles } from "@/lib/blog-seo";
import { getGoogleReviews } from "@/lib/google-reviews";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export default async function OrganizationSchema() {
  const [reviews, posts] = await Promise.all([getGoogleReviews(), getBlogPosts()]);
  const blogTitles = getBlogTitles(posts);

  return (
    <JsonLd
      data={[
        organizationSchema(
          reviews.rating > 0
            ? { rating: reviews.rating, totalReviews: reviews.totalReviews }
            : undefined,
          blogTitles
        ),
        websiteSchema(),
      ]}
    />
  );
}
