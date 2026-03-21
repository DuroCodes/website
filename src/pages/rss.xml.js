import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET = async (ctx) => {
  const posts = await getCollection("blog");
  const items = posts
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).valueOf() -
        new Date(a.data.pubDate).valueOf(),
    )
    .map((post) => ({
      link: `/blog/${post.slug}/`,
      title: post.data.title,
      pubDate: new Date(post.data.pubDate),
      description: post.data.description,
    }));

  return rss({
    title: "duro • blog",
    description: "Personal website/blog on programming",
    site: ctx.site,
    items,
    stylesheet: "/rss/pretty-feed-v3.xsl",
  });
};
