import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import unocss from "unocss/astro";
import react from "@astrojs/react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkReadingTime } from "./src/util/readingTime.mjs";

export default defineConfig({
  site: "https://www.durocodes.me",
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [rehypeAutolinkHeadings],
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "vitesse-dark"
    }
  },
  integrations: [unocss(), mdx(), sitemap(), prefetch(), react()]
});
