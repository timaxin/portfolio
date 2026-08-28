import {
  siClaude,
  siDocker,
  siElasticsearch,
  siExpress,
  siGit,
  siGithubactions,
  siGrafana,
  siHtml5,
  siJavascript,
  siJest,
  siLaravel,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siReactquery,
  siRedux,
  siSass,
  siStyledcomponents,
  siTailwindcss,
  siTestinglibrary,
  siTimescale,
  siTypescript,
  siVercel,
  siVuedotjs,
  siWindsurf,
  type SimpleIcon,
} from "simple-icons";

/**
 * Presentation layer for `profile.stack`. It is keyed by the item strings in
 * profile.ts rather than replacing them, because those same strings go into the
 * bot's system prompt through `buildKnowledgeBase()`.
 */
const icons: Record<string, SimpleIcon> = {
  // Frontend
  TypeScript: siTypescript,
  "JavaScript (ES6+)": siJavascript,
  React: siReact,
  "Next.js (App Router)": siNextdotjs,
  Redux: siRedux,
  "TanStack Query": siReactquery,
  "Tailwind CSS": siTailwindcss,
  "styled-components": siStyledcomponents,
  SASS: siSass,
  "Vue / Vuex": siVuedotjs,
  "HTML5 / CSS3": siHtml5,

  // Backend
  "Node.js": siNodedotjs,
  Express: siExpress,
  "Nest.js": siNestjs,
  PostgreSQL: siPostgresql,
  TimescaleDB: siTimescale,
  MySQL: siMysql,
  Prisma: siPrisma,
  Laravel: siLaravel,

  // Testing
  Jest: siJest,
  "React Testing Library": siTestinglibrary,

  // Infrastructure
  Git: siGit,
  Docker: siDocker,
  "CI/CD (GitHub Actions, GitLab CI, GoCD)": siGithubactions,
  ElasticSearch: siElasticsearch,
  Grafana: siGrafana,
  Vercel: siVercel,

  // AI workflows
  "Claude Code": siClaude,
  Windsurf: siWindsurf,
};

/**
 * Groups that get the icon grid, by their English label. The rest — "Domains"
 * and "Ways of working" — are not tools, and dressing "Mentoring" up with a logo
 * would be clickbait, so they stay a plain list.
 */
const GRID_GROUPS = ["Frontend", "Backend", "Testing", "Infrastructure", "AI workflows"];

export function isGridGroup(englishLabel: string): boolean {
  return GRID_GROUPS.includes(englishLabel);
}

export function iconFor(name: string): SimpleIcon | undefined {
  return icons[name];
}

/**
 * Stand-in for the items Simple Icons has no logo for — Playwright and AWS were
 * dropped from the set, and "Spec-driven development" never had one.
 *
 * Acronyms keep their letters (AWS, REST), camel case is condensed to its
 * capitals (WebSockets → WS), everything else falls back to initials.
 */
export function monogram(name: string): string {
  // "PL" would read as the Polish locale next to the language switcher.
  if (name === "Playwright") return "PW";

  const bare = name.replace(/\(.*?\)/g, " ").trim();
  const words = bare.split(/[^A-Za-z0-9]+/).filter(Boolean);
  const first = words[0] ?? name;

  if (first.length <= 4 && first === first.toUpperCase()) return first;

  const humps = first.match(/[A-Z]/g);
  if (humps && humps.length > 1) return humps.slice(0, 3).join("");

  if (words.length > 1) return words.slice(0, 2).map((word) => word[0].toUpperCase()).join("");

  return first.slice(0, 2).toUpperCase();
}

/**
 * Tile labels sit under an 88px cell, so the parenthetical in
 * "CI/CD (GitHub Actions, GitLab CI, GoCD)" would push the row several lines
 * deep. The full string stays as the tile's `title`.
 */
export function displayName(name: string): string {
  return name.replace(/\s*\(.*?\)/g, "").trim();
}

/** Perceived brightness of a `RRGGBB` string, 0 (black) to 1 (white). */
function luminance(hex: string): number {
  const channel = (offset: number) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

function mixWith(hex: string, target: number, amount: number): string {
  const blend = (offset: number) =>
    Math.round(parseInt(hex.slice(offset, offset + 2), 16) * (1 - amount) + target * amount)
      .toString(16)
      .padStart(2, "0");
  return `#${blend(0)}${blend(2)}${blend(4)}`;
}

/**
 * Brand colours are chosen against white pages, so a near-black logo vanishes in
 * the dark theme and a near-white one washes out in the light theme. Both get
 * nudged; the site has no theme toggle, so each variant is handed to CSS as its
 * own custom property.
 */
export function brandColors(hex: string): { light: string; dark: string } {
  const level = luminance(hex);
  return {
    light: level > 0.6 ? mixWith(hex, 0, 0.35) : `#${hex}`,
    dark: level < 0.18 ? mixWith(hex, 255, 0.65) : `#${hex}`,
  };
}
