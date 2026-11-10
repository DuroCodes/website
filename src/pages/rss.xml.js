import rss from "@astrojs/rss";
import { rssDate } from "../util/dates.ts";
import { getPublishedPosts } from "../util/posts.ts";

export const GET = async (ctx) => {
  const posts = await getPublishedPosts();
  const items = posts.map((post) => ({
    link: `/blog/${post.slug}/`,
    title: post.data.title,
    pubDate: rssDate(post.data.pubDate),
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
