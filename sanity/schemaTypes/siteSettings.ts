import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site SEO Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "defaultDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "primaryKeywords",
      title: "Primary SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "High-priority keywords for meta tags and discoverability.",
    }),
    defineField({
      name: "googleSiteVerification",
      title: "Google Site Verification Code",
      type: "string",
    }),
    defineField({
      name: "ogImage",
      title: "Default Social Share Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site SEO Settings" }),
  },
});
