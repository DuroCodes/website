import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export const get = async (ctx) =>
  rss({
    title: "duro • blog",
    description: "Personal website/blog on programming",
    site: ctx.site,
    items: await pagesGlobToRssItems(
      import.meta.glob("./blog/**/*.{md,mdx}"),
    ),
    stylesheet: "/rss/styles.xsl",
  });

