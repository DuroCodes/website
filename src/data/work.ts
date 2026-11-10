export interface Experience {
  title: string;
  company: string;
  dateRange: string;
  summary: string;
}

export const githubUser = "DuroCodes";

export const githubReposUrl = `https://api.github.com/users/${githubUser}/repos?per_page=100&type=owner`;

export const pinnedRepos = {
  spongebin: "TypeScript",
  audit: "Rust",
  spark: "TypeScript",
  pokefetch: "Go",
  "advent-of-code": "Rust",
  crony: "Rust",
};

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
        typeof repo.stargazers_count !== "number" ||
        !("forks_count" in repo) ||
        typeof repo.forks_count !== "number"
      ) {
        return [];
      }

      return [
        [
          repo.name,
          {
            stars: String(repo.stargazers_count),
            forks: String(repo.forks_count),
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
