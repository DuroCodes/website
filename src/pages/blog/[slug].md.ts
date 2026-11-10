import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { postMarkdown } from "../../util/llms";

interface Props {
  post: CollectionEntry<"blog">;
}

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => data.draft !== true);

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export const GET: APIRoute<Props> = ({ props, site }) => {
  return new Response(postMarkdown(props.post, site), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
