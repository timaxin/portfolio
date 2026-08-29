/**
 * Reducing a technology name to comparable keys.
 *
 * Two lists spell the same thing differently: `profile.stack` labels a grid tile
 * "Vue / Vuex" or "Next.js (App Router)", while `project.stack` lists the plain
 * "Vue", "Vuex", "Next.js". Neither can be reshaped — both feed the bot's system
 * prompt — so they meet here instead.
 *
 * Deliberately dependency-free: the browser needs this to read a `?tech=` value,
 * and pulling it out of the content modules would drag the icon set along.
 */

/** Drops the qualifier: "CI/CD (GitHub Actions, GitLab CI, GoCD)" → "CI/CD". */
export function displayName(name: string): string {
  return name.replace(/\s*\(.*?\)/g, "").trim();
}

/** "Vue / Vuex" → ["vue", "vuex"]; "Next.js (App Router)" → ["next.js"]. */
export function techKeys(name: string): string[] {
  return displayName(name)
    .split("/")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}
