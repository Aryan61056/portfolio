import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pins the workspace root explicitly — without this, Turbopack walks up
  // looking for a lockfile and can pick up an unrelated one outside this
  // project (e.g. a parent directory that isn't this git repo).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
