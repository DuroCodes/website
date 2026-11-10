import { getCollection } from "astro:content";
import { postMarkdown } from "../../util/llms";

export const getStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => data.draft !== true);

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
};

export const GET = ({ props, site }) => {
  return new Response(postMarkdown(props.post, site), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
