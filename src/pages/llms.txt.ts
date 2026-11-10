import type { APIRoute } from "astro";
import { llmsTxt } from "../util/llms";

export const GET: APIRoute = async ({ site }) => {
  return new Response(await llmsTxt(site), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
