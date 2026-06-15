/**
 * Seed Sanity with existing blog.json, default SEO, and contact page content.
 *
 * Usage:
 *   SANITY_API_TOKEN=xxx npm run sanity:seed
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import path from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const SITE_TITLE = "Lexislegis || Best Consulting and Law Firm in nepal";
const DEFAULT_SITE_DESCRIPTION =
  "Lexislegis — best consulting and law firm in Nepal, Kathmandu (Anamnagar). Corporate law, litigation, divorce, family law, criminal defense, property law, NRN citizenship, internships and legal consultation.";

const PRIMARY_KEYWORDS = [
  "law firm in nepal",
  "law firm near me",
  "law firms in kathmandu",
  "best law firm in nepal",
  "divorce law firm in nepal",
];

const CONTACT = {
  address: "Anamnagar Kathmandu, Nepal",
  email: "info@lexislegis.com",
  hours: "09:00 AM to 07:00 PM",
  days: "Sunday - Friday",
  phones: [
    { display: "+977 15922904", tel: "+97715922904" },
    { display: "9856044154", tel: "+9779856044154" },
  ],
};

async function seed() {
  const blogPath = path.join(process.cwd(), "data", "blog.json");
  const posts = JSON.parse(readFileSync(blogPath, "utf-8"));

  console.log(`Seeding ${posts.length} blog posts...`);
  for (const post of posts) {
    const doc = {
      _type: "post",
      _id: `post-${post.slug}`,
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      publishedAt: post.publishedAt,
      imageUrl: post.image?.startsWith("http") ? post.image : undefined,
      featured: post.featured ?? false,
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ ${post.title}`);
  }

  console.log("Seeding site SEO settings...");
  await client.createOrReplace({
    _type: "siteSettings",
    _id: "siteSettings",
    siteTitle: SITE_TITLE,
    defaultDescription: DEFAULT_SITE_DESCRIPTION,
    primaryKeywords: PRIMARY_KEYWORDS,
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  });

  console.log("Seeding contact page...");
  await client.createOrReplace({
    _type: "contactPage",
    _id: "contactPage",
    metaTitle: "Contact Us",
    metaDescription: `Contact Lexis and Legis at ${CONTACT.address}. Call ${CONTACT.phones[0].display} or ${CONTACT.phones[1].display}.`,
    heroEyebrow: "Contact",
    heroTitle: "Your Legal Solution Starts Here",
    heroSubtitle:
      "Whether you require legal advice, consultation or case evaluation, do not hesitate to contact us. Your privacy is important to us and all details you share will be kept confidential.",
    formTitle: "Send Us a Message",
    formSubtitle: "Fill out the form below and we will respond as soon as possible.",
    getInTouchTitle: "Get In Touch",
    address: CONTACT.address,
    email: CONTACT.email,
    hours: CONTACT.hours,
    days: CONTACT.days,
    phones: CONTACT.phones.map((p) => ({ _key: p.tel, display: p.display, tel: p.tel })),
  });

  console.log("Done! Open /studio to review content.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
