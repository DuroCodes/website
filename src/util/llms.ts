import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CollectionEntry } from "astro:content";
import { experience, githubUser, pinnedRepos } from "../data/work";
import { getPublishedPosts } from "./posts";

const FALLBACK_SITE = "https://www.durocodes.me";

export const pageUrl = (site: URL | undefined, pathname: string) => {
  const hasExtension = pathname.split("/").pop()?.includes(".");
  const normalized =
    pathname.endsWith("/") || hasExtension ? pathname : `${pathname}/`;

  return new URL(normalized, site ?? FALLBACK_SITE).href;
};

const markdownBody = (source: string) =>
  source
    .replace(/<br\s*\/?>/gi, "\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export const postMarkdown = (
  post: CollectionEntry<"blog">,
  site: URL | undefined,
) => {
  const canonical = pageUrl(site, `/blog/${post.slug}`);

  return [
    "---",
    `title: ${JSON.stringify(post.data.title)}`,
    `description: ${JSON.stringify(post.data.description)}`,
    `published: ${post.data.pubDate}`,
    `canonical: ${JSON.stringify(canonical)}`,
    "---",
    "",
    markdownBody(post.body),
    "",
  ].join("\n");
};

const faqMarkdown = async () => {
  const raw = await readFile(
    path.join(process.cwd(), "src/pages/faq.md"),
    "utf8",
  );
  const body = raw.replace(/^---[\s\S]*?---\s*/, "");
  return markdownBody(body);
};

export const llmsTxt = async (site: URL | undefined) => {
  const posts = await getPublishedPosts();
  const home = pageUrl(site, "/");
  const postLinks = posts
    .map(
      (post) =>
        `- [${post.data.title}](${pageUrl(site, `/blog/${post.slug}.md`)}): ${post.data.description}`,
    )
    .join("\n");

  return `# David (Duro)

> Computer science student at East Tennessee State University and full-stack software engineer.

David publishes this site as Duro. He mainly works in TypeScript, Python, and Rust. Email him at david@durocodes.me, or reach him on Discord as _duro.

## Pages

- [Home](${home}): Bio and contact details
- [Work](${pageUrl(site, "/work")}): Experience and projects
- [Blog](${pageUrl(site, "/blog")}): Writing on programming and tech
- [FAQ](${pageUrl(site, "/faq")}): Name, languages, and editor themes
- [RSS](${pageUrl(site, "/rss.xml")}): Blog feed
- [Sitemap](${pageUrl(site, "/sitemap-index.xml")}): Every HTML page

## Posts

${postLinks}

## Elsewhere

- [GitHub](https://github.com/durocodes): Source code
- [Discord](https://discord.com/users/283312847478325251): _duro
- [Last.fm](https://www.last.fm/user/duroo_): Listening history
- [Quartz](https://quartz.durocodes.me/): Notes

## Optional

- [Full site text](${pageUrl(site, "/llms-full.txt")}): Bio, experience, FAQ, and every post in one file
`;
};

export const llmsFullTxt = async (site: URL | undefined) => {
  const [posts, faq] = await Promise.all([getPublishedPosts(), faqMarkdown()]);

  const experienceText = experience
    .map(
      (role) =>
        `### ${role.title}, ${role.company}\n\n${role.dateRange}\n\n${role.summary}`,
    )
    .join("\n\n");

  const projectText = Object.entries(pinnedRepos)
    .map(
      ([repo, language]) =>
        `- [${repo}](https://github.com/${githubUser}/${repo}): ${language}`,
    )
    .join("\n");

  const postText = posts
    .map((post) => {
      return [
        `### ${post.data.title}`,
        "",
        `Published: ${post.data.pubDate}`,
        `URL: ${pageUrl(site, `/blog/${post.slug}`)}`,
        "",
        post.data.description,
        "",
        markdownBody(post.body),
      ].join("\n");
    })
    .join("\n\n");

  return `# David (Duro)

> Computer science student at East Tennessee State University and full-stack software engineer.

David publishes this site as Duro. He mainly works in TypeScript, Python, and Rust.

- Email: david@durocodes.me
- Discord: https://discord.com/users/283312847478325251
- GitHub: https://github.com/durocodes
- Last.fm: https://www.last.fm/user/duroo_
- Notes: https://quartz.durocodes.me/

## Home

I'm David (Duro online). I'm a computer science student at East Tennessee State University.

I enjoy working as a full-stack software engineer, working with TypeScript, Python, and Rust.

In my free time, I like to tinker, listen to music, and play video games (mostly Minecraft).

## Experience

${experienceText}

## Projects

Pinned repositories from GitHub:

${projectText}

## FAQ

${faq}

## Posts

${postText}
`;
};
