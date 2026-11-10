import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.preprocess(
      (value) =>
        value instanceof Date ? value.toISOString().slice(0, 10) : value,
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "pubDate must be YYYY-MM-DD"),
    ),
    draft: z.boolean().optional(),
    readingTime: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
