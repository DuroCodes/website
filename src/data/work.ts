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

const GITHUB_USER = "durocodes";
const BERRY_PINNED_URL = `https://pinned.berrysauce.dev/get/${GITHUB_USER}`;

/** Pin order used when the third-party host blocks the build. */
const PINNED_REPO_NAMES = [
  "spongebin",
  "audit",
  "spark",
  "pokefetch",
  "advent-of-code",
  "crony",
];

/**
 * Last known pins. Used only when both remote lookups fail, so `astro build`
 * still emits /work and /llms-full.txt.
 */
const FALLBACK_REPOS: PinnedRepo[] = [
  {
    owner: "DuroCodes",
    repo: "spongebin",
    description: "a code-uploading site made of sponge",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: "2",
    forks: "2",
  },
  {
    owner: "DuroCodes",
    repo: "audit",
    description: "a tool to validate advent of code solutions",
    language: "Rust",
    languageColor: "#dea584",
    stars: "1",
    forks: "0",
  },
  {
    owner: "DuroCodes",
    repo: "spark",
    description: "A TypeScript-first Discord.js handler",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: "8",
    forks: "2",
  },
  {
    owner: "DuroCodes",
    repo: "pokefetch",
    description: "Display a random Pokémon from the PokéAPI in your terminal.",
    language: "Go",
    languageColor: "#00ADD8",
    stars: "10",
    forks: "3",
  },
  {
    owner: "DuroCodes",
    repo: "advent-of-code",
    description: "solutions to advent of code",
    language: "Rust",
    languageColor: "#dea584",
    stars: "2",
    forks: "0",
  },
  {
    owner: "DuroCodes",
    repo: "crony",
    description:
      "a simple and powerful command line cron job manager and scheduler written in Rust.",
    language: "Rust",
    languageColor: "#dea584",
    stars: "9",
    forks: "1",
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

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  owner: { login: string };
}

function mapBerryRepos(repos: BerryPinnedRepo[]): PinnedRepo[] {
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

function mapGitHubRepos(repos: GitHubRepo[]): PinnedRepo[] {
  const byName = new Map(repos.map((repo) => [repo.name, repo]));

  return PINNED_REPO_NAMES.flatMap((name) => {
    const repo = byName.get(name);
    if (!repo) return [];

    return [
      {
        owner: repo.owner.login,
        repo: repo.name,
        description: repo.description ?? "",
        language: repo.language ?? "",
        languageColor: "",
        stars: String(repo.stargazers_count),
        forks: String(repo.forks_count),
      },
    ];
  });
}

async function pinnedFromBerry(): Promise<PinnedRepo[] | null> {
  const response = await fetch(BERRY_PINNED_URL);
  if (!response.ok) return null;

  const repos = (await response.json()) as BerryPinnedRepo[];
  if (!Array.isArray(repos) || repos.length === 0) return null;

  return mapBerryRepos(repos);
}

async function pinnedFromGitHub(): Promise<PinnedRepo[] | null> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "durocodes-website",
      },
    },
  );
  if (!response.ok) return null;

  const repos = (await response.json()) as GitHubRepo[];
  if (!Array.isArray(repos)) return null;

  const pinned = mapGitHubRepos(repos);
  return pinned.length > 0 ? pinned : null;
}

async function loadPinnedRepos(): Promise<PinnedRepo[]> {
  try {
    const live = await pinnedFromBerry();
    if (live) return live;
  } catch {
    // pinned.berrysauce.dev returns 403 from Vercel's build network.
  }

  try {
    const github = await pinnedFromGitHub();
    if (github) return github;
  } catch {
    // Unauthenticated GitHub requests can be rate limited during a build.
  }

  return FALLBACK_REPOS;
}

let pinnedRepos: Promise<PinnedRepo[]> | undefined;

export function getPinnedRepos(): Promise<PinnedRepo[]> {
  pinnedRepos ??= loadPinnedRepos();
  return pinnedRepos;
}
