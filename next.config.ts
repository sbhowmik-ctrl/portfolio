import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Standalone disabled for local Windows builds (symlinks require admin/Developer Mode).
  // Re-enable for Docker/Linux deployment if needed.
  ...(process.env.NODE_ENV === "production" && process.platform !== "win32"
    ? { output: "standalone" }
    : {}),
};

export default nextConfig;
