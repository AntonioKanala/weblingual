import { faqItems } from "@/content/faq";
import { CONTACT } from "@/lib/constants";

/**
 * Un único @id para el negocio, para que Dentist y MedicalOrganization se
 * fusionen en la misma entidad en vez de leerse como dos organizaciones.
 */
const CLINICA_ID = "https://clinicalingual.cl/#clinica";

/** Perfiles oficiales — los mismos que enlaza el footer. */
const SAME_AS = [
  "https://www.instagram.com/clinicalingual",
  "https://www.facebook.com/clinicalingual",
  "https://www.youtube.com/@clinicalingual",
];

/** Comunas donde la clínica capta pacientes (una sola dirección, en Las Condes). */
const AREA_SERVIDA = [
  "Las Condes",
  "Vitacura",
  "Providencia",
  "Ñuñoa",
  "Lo Barnechea",
  "La Reina",
  "Santiago",
].map((name) => ({ "@type": "City", name }));

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
  "@id": CLINICA_ID,
  name: "Clínica Lingual",
  description:
    "Especialistas en ortodoncia lingual en Las Condes, Santiago. +5,000 tratamientos. Brackets invisibles personalizados con tecnología 3D.",
  url: "https://clinicalingual.cl",
  logo: "https://clinicalingual.cl/images/migrated/668eb72f8edd42a40ba448f2.webp",
  image:
    "https://clinicalingual.cl/images/migrated/668eb72f8edd42a40ba448f2.webp",
  // NAP idéntico al de la ficha de Google Business Profile. Antes decía
  // streetAddress "Las Condes" (que es la comuna, no la calle) y unas
  // coordenadas a 5,1 km de la clínica.
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cam. El Alba 8760, oficina 701",
    addressLocality: "Las Condes",
    addressRegion: "Región Metropolitana",
    postalCode: "7560795",
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.4064762,
    longitude: -70.5446002,
  },
  hasMap: CONTACT.mapsLink,
  areaServed: AREA_SERVIDA,
  sameAs: SAME_AS,
  // Fijo publicado en Google Business Profile. El móvil de WhatsApp, que es
  // el que ve el usuario en la web, va como punto de contacto adicional.
  telephone: "+56 2 2944 4714",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: CONTACT.phone,
      areaServed: "CL",
      availableLanguage: "Spanish",
    },
  ],
  // Sin aggregateRating: Google no considera elegible el marcado de reseñas
  // que una entidad se pone a sí misma (self-serving review markup) en
  // LocalBusiness/Organization. La nota real vive en el trust bar y en la ficha.
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
        url: "https://clinicalingual.cl/images/migrated/668eb72f8edd42a40ba448f2.webp",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "es-CL",
    wordCount: post.wordCount,
  };
};

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://clinicalingual.cl/#website",
  name: "Clínica Lingual",
  url: "https://clinicalingual.cl",
  inLanguage: "es-CL",
  publisher: { "@id": CLINICA_ID },
});

export const getMedicalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  // Mismo @id que el Dentist: se fusionan en una sola entidad en vez de
  // competir como dos organizaciones distintas con el mismo nombre.
  "@id": CLINICA_ID,
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
