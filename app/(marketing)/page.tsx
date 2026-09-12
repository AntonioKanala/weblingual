import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { BenefitsGrid } from "@/components/sections/benefits-grid";
import { BenefitsExpandable } from "@/components/sections/benefits-expandable";
import { ScienceTabs } from "@/components/sections/science-tabs";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { VideoTestimonials } from "@/components/sections/video-testimonials";
import { IdealForYou } from "@/components/sections/ideal-for-you";
import { Journey } from "@/components/sections/journey";
import { CtaStatement } from "@/components/sections/cta-statement";
import { InstagramGrid } from "@/components/sections/instagram-grid";
import { BlogPreview } from "@/components/sections/blog-preview";
import { FAQ } from "@/components/sections/faq";
import {
  getFAQPageSchema,
  getLocalBusinessSchema,
  getMedicalOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/schemas";
import type { Metadata } from "next";

// Revalida cada hora: la sección "Aprende más" muestra los posts más
// recientes, incluyendo los que se programaron a futuro.
export const revalidate = 3600;

export const metadata: Metadata = {
  // La home no tenía título ni descripción propios: heredaba los del layout
  // raíz, escritos para "ortodoncia lingual" y "brackets invisibles". Eso la
  // ponía a competir contra /ortodoncia-lingual por las mismas consultas y se
  // las ganaba sin convertirlas (posición 3,9 en "frenillos linguales chile"
  // con cero clics). La home se queda con la marca y la categoría; el término
  // de tratamiento es de /ortodoncia-lingual.
  title: "Clínica Lingual | Ortodoncia Invisible en Santiago",
  description:
    "Clínica especializada en ortodoncia invisible en Las Condes, Santiago. +5.000 tratamientos finalizados por un equipo miembro de la ESLO. Agenda tu evaluación.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQPageSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getLocalBusinessSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getMedicalOrganizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebSiteSchema()),
        }}
      />

      {/* Sections — AG1 flow order */}
      <Hero />
      <TrustBar />
      <BenefitsGrid />
      <BenefitsExpandable />
      <ScienceTabs />
      <ComparisonTable />
      <VideoTestimonials />
      <IdealForYou />
      <Journey />
      <CtaStatement />
      <InstagramGrid />
      <BlogPreview />
      <FAQ />
    </>
  );
}
