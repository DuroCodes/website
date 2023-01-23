import rss from "@astrojs/rss";

export const get = () =>
  rss({
    title: "duro • blog",
    description: "Personal website/blog on programming",
    site: import.meta.env.SITE,
    items: import.meta.glob("./blog/**/*.{md,mdx}"),
    stylesheet: "/rss/styles.xsl",
  });
