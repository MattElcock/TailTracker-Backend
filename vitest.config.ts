import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // adjust "src" to your base folder
    },
  },
  test: {
    coverage: {
      reporter: ["lcov"],
    },
  },
});
