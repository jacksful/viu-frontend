import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "statsBar" },
        { type: "featureSection" },
        { type: "faqSection" },
        { type: "ctaBanner" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Meta Title" },
        { name: "description", type: "text", title: "Meta Description" },
        { name: "ogImage", type: "image", title: "OG Image" },
      ],
    }),
  ],
});
