#!/usr/bin/env node
/**
 * Статический экспорт для GitHub Pages.
 *
 * `output: "export"` не переваривает POST-роуты, поэтому src/app/api на время
 * сборки уезжает в сторону и возвращается на место в finally — даже если сборка упала.
 */
import { spawnSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";

const API_DIR = "src/app/api";
const PARKED_DIR = ".api-offline";

const parked = existsSync(API_DIR);
if (parked) renameSync(API_DIR, PARKED_DIR);

try {
  const result = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1" },
  });
  process.exitCode = result.status ?? 1;
} finally {
  if (parked) renameSync(PARKED_DIR, API_DIR);
}
