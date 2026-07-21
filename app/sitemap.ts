import type { MetadataRoute } from "next";

const BASE_URL = "https://clinicalingual.cl";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/ortodoncia-lingual", priority: 0.9, changeFrequency: "monthly" },
    {
      path: "/agenda-tu-sonrisa-perfecta",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    { path: "/casos-clinicos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/testimonios", priority: 0.8, changeFrequency: "monthly" },
    { path: "/nuestro-equipo", priority: 0.7, changeFrequency: "monthly" },
    { path: "/instalaciones", priority: 0.6, changeFrequency: "monthly" },
    {
      path: "/landing/brackets-invisibles",
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      path: "/landing/ortodoncia-invisible",
      priority: 0.6,
      changeFrequency: "monthly",
    },
    { path: "/privacidad", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terminos", priority: 0.2, changeFrequency: "yearly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
