import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // El blog viejo (Wix/GHL) vivía en /blog/category/* y /blog/author/*.
      // Los posts en sí migraron a /post/[slug] con la misma URL exacta.
      {
        source: "/blog/category/:category",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/author/:author",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/msgsndr/**",
      },
      {
        protocol: "https",
        hostname: "assets.cdn.filesafe.space",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
