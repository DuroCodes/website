export interface Experience {
  title: string;
  company: string;
  dateRange: string;
  summary: string;
}

export const githubUser = "DuroCodes";

export const pinnedReposUrl = "https://pinned.berrysauce.dev/get/durocodes";

export const pinnedRepos = [
  "spongebin",
  "audit",
  "spark",
  "pokefetch",
  "advent-of-code",
  "crony",
];

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
