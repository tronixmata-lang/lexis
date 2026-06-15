import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Contact",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "formTitle",
      title: "Form Section Title",
      type: "string",
      initialValue: "Send Us a Message",
    }),
    defineField({
      name: "formSubtitle",
      title: "Form Section Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "getInTouchTitle",
      title: "Sidebar Title",
      type: "string",
      initialValue: "Get In Touch",
    }),
    defineField({
      name: "address",
      title: "Office Address",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "hours",
      title: "Opening Hours",
      type: "string",
    }),
    defineField({
      name: "days",
      title: "Opening Days",
      type: "string",
    }),
    defineField({
      name: "phones",
      title: "Phone Numbers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "display", title: "Display", type: "string" },
            { name: "tel", title: "Tel Link (e.g. +9779856044154)", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page Content" }),
  },
});
