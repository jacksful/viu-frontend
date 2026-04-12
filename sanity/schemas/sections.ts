import { defineType, defineField } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline (Line 1)", type: "string" }),
    defineField({ name: "headlineLine2", title: "Headline (Line 2)", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "trustBadges",
      title: "Trust Badges",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare: ({ title }) => ({ title: title || "Hero Section" }),
  },
});

export const statsBar = defineType({
  name: "statsBar",
  title: "Stats Bar",
  type: "object",
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value" },
            { name: "label", type: "string", title: "Label" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Stats Bar" }),
  },
});

export const featureSection = defineType({
  name: "featureSection",
  title: "Feature Section",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "headingLine1", title: "Heading (Line 1)", type: "string" }),
    defineField({
      name: "headingLine2",
      title: "Heading (Line 2 - Accent Color)",
      type: "string",
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Image Right", value: "imageRight" },
          { title: "Image Left", value: "imageLeft" },
        ],
      },
      initialValue: "imageRight",
    }),
    defineField({
      name: "backgroundStyle",
      title: "Background Style",
      type: "string",
      options: {
        list: [
          { title: "White", value: "white" },
          { title: "Light Gray", value: "light" },
          { title: "Dark (Navy)", value: "dark" },
        ],
      },
      initialValue: "white",
    }),
    defineField({
      name: "image",
      title: "Section Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "features",
      title: "Feature Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            { name: "icon", type: "string", title: "Icon Name (lucide)" },
          ],
        },
      ],
    }),
    defineField({
      name: "overlayCard",
      title: "Overlay Card",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "title", type: "string", title: "Title" },
        { name: "content", type: "text", title: "Content" },
      ],
    }),
  ],
  preview: {
    select: { title: "badge" },
    prepare: ({ title }) => ({ title: title || "Feature Section" }),
  },
});

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "supportEmail", title: "Support Email", type: "string" }),
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Question" },
            { name: "answer", type: "text", title: "Answer" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "FAQ Section" }),
  },
});

export const ctaBanner = defineType({
  name: "ctaBanner",
  title: "CTA Banner",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "buttonText", title: "Button Text", type: "string" }),
    defineField({ name: "showContactForm", title: "Show Contact Form", type: "boolean" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "CTA Banner" }),
  },
});
