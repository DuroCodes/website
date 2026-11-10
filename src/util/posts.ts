import { getCollection } from "astro:content";
import { parsePostDate } from "./dates";

export const getPublishedPosts = async () => {
  const posts = await getCollection("blog", ({ data }) => data.draft !== true);

  return posts.sort(
    (a, b) =>
      parsePostDate(b.data.pubDate).valueOf() -
      parsePostDate(a.data.pubDate).valueOf(),
  );
};
