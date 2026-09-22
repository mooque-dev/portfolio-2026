import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        // The recipe app case study moved to the project's real name.
        source: "/work/ai-recipe-book",
        destination: "/work/forkestrate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
