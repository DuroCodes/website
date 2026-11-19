export interface Experience {
  title: string;
  company: string;
  dateRange: string;
  summary: string;
}

export const githubUser = "DuroCodes";
export const githubReposUrl = `https://api.github.com/users/${githubUser}/repos?per_page=100&type=owner`;

export const pinnedRepos = {
  spongebin: {
    description:
      "pastebin for code snippets; rendered with shiki and monaco editor",
    language: "TypeScript",
  },
  audit: {
    description: "tool to validate advent of code solutions",
    language: "Rust",
  },
  spark: {
    description: "typescript-first discord.js bot handler",
    language: "TypeScript",
  },
  pokefetch: {
    description: "display a random pokémon from the pokéapi in your terminal",
    language: "Go",
  },
  mise: {
    description: "self-hosted recipe manager",
    language: "TypeScript",
  },
  crony: {
    description:
      "a simple and powerful command line cron job manager and scheduler",
    language: "Rust",
  },
} as const;

export const repoStats = (body: unknown) => {
  if (!Array.isArray(body)) return {};

  return Object.fromEntries(
    body.flatMap((repo) => {
      if (
        typeof repo !== "object" ||
        repo === null ||
        !("name" in repo) ||
        typeof repo.name !== "string" ||
        !("stargazers_count" in repo) ||
        typeof repo.stargazers_count !== "number"
      ) {
        return [];
      }

      return [
        [
          repo.name,
          {
            stars: String(repo.stargazers_count),
          },
        ],
      ];
    }),
  );
};

export const loadRepoStats = async () => {
  try {
    const response = await fetch(githubReposUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "durocodes-website",
      },
    });
    if (!response.ok) return {};

    return repoStats(await response.json());
  } catch {
    return {};
  }
};

export const experience: Experience[] = [
  {
    title: "Software Engineer Intern",
    company: "BlueCross BlueShield of Tennessee",
    dateRange: "Jan 2026 — May 2026",
    summary:
      "Worked on the Payments team to help write claims processing workflows in C#, PowerShell, and SQL Server.",
  },
  {
    title: "Full-Stack Software Engineer Intern",
    company: "Gemstone Trading",
    dateRange: "Aug 2025 — Present",
    summary:
      "Worked directly with the founder to help build initial algorithmic trading web application, expected to launch in April 2026.",
  },
];
