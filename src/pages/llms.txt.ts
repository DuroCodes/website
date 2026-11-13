import { llmsTxt } from "../util/llms";

export const GET = async ({ site }: { site: URL }) => {
  return new Response(await llmsTxt(site), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
