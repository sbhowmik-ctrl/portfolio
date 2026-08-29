import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    "@copilotkit/react-core",
    "@copilotkit/runtime",
    "@copilotkit/a2ui-renderer",
    "@a2ui/web_core",
    "lit",
  ],
  // Standalone disabled for local Windows builds (symlinks require admin/Developer Mode).
  // Re-enable for Docker/Linux deployment if needed.
  ...(process.env.NODE_ENV === "production" && process.platform !== "win32"
    ? { output: "standalone" }
    : {}),
};

export default nextConfig;
