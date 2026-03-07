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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "5000",
    bestRating: "5",
  },
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
