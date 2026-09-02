import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Resolves the "@/*" alias from tsconfig, so tests import modules the same
  // way the app does.
  plugins: [tsconfigPaths()],
  test: {
    // Pure functions only — nothing here needs a DOM.
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
