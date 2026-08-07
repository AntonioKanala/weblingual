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
      // Restos indexados del sitio viejo en Wix/GHL — Search Console todavía
      // les manda impresiones. El blog vivía además en /promociones/b/[slug]
      // con el mismo slug que ahora usa /post/[slug].
      {
        source: "/home-1",
        destination: "/",
        permanent: true,
      },
      {
        source: "/resenas",
        destination: "/testimonios",
        permanent: true,
      },
      {
        source: "/promociones",
        destination: "/precios-ortodoncia-lingual",
        permanent: true,
      },
      {
        source: "/promociones/b/:slug",
        destination: "/post/:slug",
        permanent: true,
      },
      {
        source: "/promociones/c/:path*",
        destination: "/",
        permanent: true,
      },
      // El sitio viejo a veces se indexó con "www" — el dominio real es sin www.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.clinicalingual.cl" }],
        destination: "https://clinicalingual.cl/:path*",
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
