export interface PinnedRepo {
  owner: string;
  repo: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  forks: string;
}

export interface Experience {
  title: string;
  company: string;
  dateRange: string;
  summary: string;
}

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

interface BerryPinnedRepo {
  author: string;
  name: string;
  description: string | null;
  language: string | null;
  languageColor: string | null;
  stars: number;
  forks: number;
}

export async function getPinnedRepos(): Promise<PinnedRepo[]> {
  const response = await fetch("https://pinned.berrysauce.dev/get/durocodes");

  if (!response.ok) {
    throw new Error(`Pinned repos request failed: ${response.status}`);
  }

  const repos = (await response.json()) as BerryPinnedRepo[];

  return repos.map((repo) => ({
    owner: repo.author,
    repo: repo.name,
    description: repo.description ?? "",
    language: repo.language ?? "",
    languageColor: repo.languageColor ?? "",
    stars: String(repo.stars),
    forks: String(repo.forks),
  }));
}
