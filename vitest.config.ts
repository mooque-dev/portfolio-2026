import { defineConfig } from "vitest/config";
import path from "path";

// Unit tests run in Node (the code under test is server-side: content parsing,
// the rate limiter, and the API route handlers). The `@/*` alias mirrors
// tsconfig so imports match the app.
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    environment: "node",
    include: ["__tests__/**/*.test.ts"],
  },
});
