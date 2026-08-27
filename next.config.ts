import type { NextConfig } from "next";

/**
 * Одна кодовая база под два сценария:
 *  - обычная сборка (Vercel / next start) — работает роут /api/chat;
 *  - STATIC_EXPORT=1 — статика в out/ под GitHub Pages, API отдаёт Cloudflare Worker.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

/** Для github.io/<repo> нужен префикс пути; для своего домена оставьте пустым. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        // На GitHub Pages нет сервера оптимизации картинок.
        images: { unoptimized: true },
        // /projects → /projects/index.html, иначе Pages отдаст 404.
        trailingSlash: true,
      }
    : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
