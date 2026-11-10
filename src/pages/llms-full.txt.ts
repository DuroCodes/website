import type { APIRoute } from "astro";
import { llmsFullTxt } from "../util/llms";

export const GET: APIRoute = async ({ site }) => {
  return new Response(await llmsFullTxt(site), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
