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
      {
        source: "/home-1/c/:path*",
        destination: "/",
        permanent: true,
      },
      // El blog viejo también vivía en /blog/c/[categoria]/b/[slug] y /blog/tag/[tag].
      {
        source: "/blog/c/:category/b/:slug",
        destination: "/post/:slug",
        permanent: true,
      },
      {
        source: "/blog/tag/:tag",
        destination: "/blog",
        permanent: true,
      },

      // ---------------------------------------------------------------
      // Bloques del sitio viejo que quedaron en 404 sin redirect.
      // Entre los dos acumulan ~176.000 impresiones históricas en Search
      // Console y en octubre de 2025 todavía valían 22.231 impresiones y
      // 119 clics en un solo mes. Google seguía rastreándolos en agosto
      // de 2026, así que el 301 aún puede recuperar parte de esa señal.
      // ---------------------------------------------------------------

      // Seguros complementarios. Consorcio tiene su propio post (hoy la
      // segunda URL del sitio por clics), el resto va a la guía general.
      // Se indexaron con y sin mayúsculas, de ahí las dos variantes.
      {
        source: "/seguro-complementario-consorcio-clinica-lingual",
        destination: "/post/reembolso-dental-consorcio-en-chile",
        permanent: true,
      },
      {
        source: "/seguro-complementario-Consorcio-clinica-lingual",
        destination: "/post/reembolso-dental-consorcio-en-chile",
        permanent: true,
      },
      {
        source: "/seguro-complementario-:aseguradora",
        destination: "/post/companias-de-seguros-de-salud-complementarios-chile",
        permanent: true,
      },

      // Páginas de comuna. Las tres que ya tienen artículo propio van a él;
      // el resto a la página de tratamiento.
      {
        source: "/clinica-dental-las-condes",
        destination: "/post/ortodoncia-las-condes-brackets-invisibles",
        permanent: true,
      },
      {
        source: "/clinica-dental-providencia",
        destination: "/post/ortodoncia-lingual-providencia",
        permanent: true,
      },
      {
        source: "/clinica-dental-vitacura",
        destination: "/post/ortodoncia-lingual-vitacura",
        permanent: true,
      },
      {
        source: "/clinica-dental-nunoa",
        destination: "/post/ortodoncia-lingual-nunoa",
        permanent: true,
      },
      {
        source: "/clinica-dental-:comuna",
        destination: "/ortodoncia-lingual",
        permanent: true,
      },

      // Páginas de tratamiento del sitio viejo.
      {
        source: "/placas-de-dientes-placas-de-ortodoncia",
        destination: "/post/alineadores-invisibles-chile-sonrisa-perfecta",
        permanent: true,
      },
      {
        source: "/frenillos-linguales-en-chile-frenillos-invisibles",
        destination: "/post/frenillos-linguales-chile",
        permanent: true,
      },
      {
        source: "/alineadores-invisibles-precio-chile-invisalign-invisiline",
        destination: "/precios-ortodoncia-lingual",
        permanent: true,
      },
      {
        source: "/brackets-invisibles-bracket-lingual",
        destination: "/post/brackets-invisibles-chile",
        permanent: true,
      },
      {
        source: "/frenillos-invisibles-tratamiento-ortodoncia-cerca-de-mi-google",
        destination: "/post/frenillos-linguales-chile",
        permanent: true,
      },
      {
        source: "/alineadores-invisibles-tratamiento-ortodoncia-cerca-de-mi-google",
        destination: "/post/alineadores-invisibles-chile-sonrisa-perfecta",
        permanent: true,
      },
      {
        source: "/brackets-invisibles-tratamiento-ortodoncia-cerca-de-mi-google",
        destination: "/post/brackets-invisibles-chile",
        permanent: true,
      },
      {
        source: "/brackets-linguales-tratamiento-ortodoncia-cerca-de-mi-google",
        destination: "/ortodoncia-lingual",
        permanent: true,
      },
      {
        source: "/ortodoncia-lingual-tratamiento-ortodoncia-cerca-de-mi",
        destination: "/ortodoncia-lingual",
        permanent: true,
      },
      {
        source: "/ortodoncia-lingual-tratamiento-ortodoncia-cerca-de-mi-google",
        destination: "/ortodoncia-lingual",
        permanent: true,
      },
      {
        source: "/ortodoncia-lingual-842801",
        destination: "/ortodoncia-lingual",
        permanent: true,
      },
      // Carillas no es un servicio de la clínica: va a la home.
      {
        source: "/carillas-dentales-cerca-de-mi-google",
        destination: "/",
        permanent: true,
      },

      // ---------------------------------------------------------------
      // Posts consolidados. Search Console mostraba estas dos parejas
      // compitiendo entre sí por las mismas consultas, sin que ninguna
      // llegara a rankear: se conserva la de mejor posición y la otra
      // redirige. El contenido retirado queda en content/blog-posts-consolidados.
      // ---------------------------------------------------------------
      {
        source: "/post/frenillos-linguales-en-chile-mejor-opcion-para-ti",
        destination: "/post/frenillos-linguales-chile",
        permanent: true,
      },
      {
        source: "/post/afecta-el-bruxismo-a-tu-tratamiento-de-ortodoncia-invisible",
        destination: "/post/bruxismo-ortodoncia-invisible-impacto-soluciones",
        permanent: true,
      },

      // Restos sueltos del sitio viejo.
      {
        source: "/politica-de-privacidad",
        destination: "/privacidad",
        permanent: true,
      },
      {
        source: "/comentarios",
        destination: "/testimonios",
        permanent: true,
      },
      {
        source: "/gracias",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gracias-ig",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sorteo-hotel-h",
        destination: "/",
        permanent: true,
      },
      {
        source: "/empresas",
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
