import { faqItems } from "@/content/faq";

export const getFAQPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Clínica Lingual",
  description:
    "Especialistas en ortodoncia lingual en Las Condes, Santiago. +5,000 tratamientos. Brackets invisibles personalizados con tecnología 3D.",
  url: "https://clinicalingual.cl",
  logo: "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/668eb72f8edd42a40ba448f2.webp",
  image:
    "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/668eb72f8edd42a40ba448f2.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Las Condes",
    addressLocality: "Santiago",
    addressRegion: "Región Metropolitana",
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.4172,
    longitude: -70.5985,
  },
  // Rating real de la ficha de Google Business Profile (visible en el trust bar de la home).
  // Actualizar aquí y en trust-bar.tsx cuando cambie en Google.
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.2",
    reviewCount: "166",
    bestRating: "5",
  },
  telephone: "+56 2 2944 4714",
  priceRange: "$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
});

export const getBreadcrumbSchema = (
  items: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://clinicalingual.cl/" },
    ...items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: item.name,
      item: `https://clinicalingual.cl${item.path}`,
    })),
  ],
});

export const getPersonListSchema = (
  members: Array<{ name: string; role: string; image?: string }>,
) => ({
  "@context": "https://schema.org",
  "@graph": members.map((m) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    ...(m.image && !m.image.includes("placeholder")
      ? { image: `https://clinicalingual.cl${encodeURI(m.image)}` }
      : {}),
    worksFor: {
      "@type": "Dentist",
      name: "Clínica Lingual",
      url: "https://clinicalingual.cl",
    },
  })),
});

export const getVideoTestimonialsSchema = (
  testimonials: Array<{ name: string; quote: string; videoUrl?: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Testimonios de pacientes de Clínica Lingual",
  itemListElement: testimonials
    .filter((t) => t.videoUrl)
    .map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: `Testimonio de ${t.name}: ${t.quote}`,
        description: `${t.name} cuenta su experiencia con la ortodoncia lingual en Clínica Lingual, Santiago.`,
        embedUrl: `https://www.youtube.com/embed/${t.videoUrl}`,
        thumbnailUrl: `https://i.ytimg.com/vi/${t.videoUrl}/hqdefault.jpg`,
      },
    })),
});

export const getBlogPostingSchema = (post: {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  wordCount: number;
}) => {
  const url = `https://clinicalingual.cl/post/${post.slug}`;
  const image = post.coverImage.startsWith("http")
    ? post.coverImage
    : `https://clinicalingual.cl${post.coverImage}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title.slice(0, 110),
    description: post.description.slice(0, 200),
    image,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Equipo Clínica Lingual",
      url: "https://clinicalingual.cl/nuestro-equipo",
    },
    publisher: {
      "@type": "Organization",
      name: "Clínica Lingual",
      logo: {
        "@type": "ImageObject",
        url: "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/668eb72f8edd42a40ba448f2.webp",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "es-CL",
    wordCount: post.wordCount,
  };
};

export const getMedicalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Clínica Lingual",
  description:
    "Clínica especializada en ortodoncia lingual (brackets invisibles) en Las Condes, Santiago de Chile.",
  url: "https://clinicalingual.cl",
  medicalSpecialty: {
    "@type": "MedicalSpecialty",
    name: "Orthodontics",
  },
  availableService: {
    "@type": "MedicalProcedure",
    name: "Ortodoncia Lingual",
    description:
      "Tratamiento de ortodoncia con brackets colocados en la cara interna de los dientes, completamente invisible desde el exterior.",
  },
});
