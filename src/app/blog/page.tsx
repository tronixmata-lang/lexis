import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import PageHeader from "@/components/PageHeader";
import { getBlogPosts } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Legal News and Articles",
  description:
    "Expert articles on Nepalese law from Lexis and Legis: carbon trading, e-commerce, NRN citizenship, family law and more.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        title="News & Events"
        subtitle="Legal insights and updates from our team"
        breadcrumbItems={[
          { name: "Home", path: "/" },
          { name: "News & Events", path: "/blog" },
        ]}
      />
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
