import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(), // Enable TypeScript paths resolution
    react(), // Enable React support
    // Additional plugins as needed
  ],
  // Other configuration options
});