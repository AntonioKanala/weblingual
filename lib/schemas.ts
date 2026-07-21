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
  // AggregateRating removido: solo debe volver con el rating y conteo REALES
  // de la ficha de Google Business Profile, respaldados por reseñas visibles en la página.
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
