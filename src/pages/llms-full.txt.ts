import { llmsFullTxt } from "../util/llms";

export const GET = async ({ site }: { site: URL }) => {
  return new Response(await llmsFullTxt(site), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
