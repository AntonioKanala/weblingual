import { Suspense } from "react";
import type { Metadata } from "next";
import { FormularioExperiencia } from "@/components/sections/formulario-experiencia";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Tu experiencia | ${SITE_NAME}`,
  description:
    "Cuéntanos cómo estuvo tu experiencia en Clínica Lingual. Tu opinión nos ayuda a mejorar la atención.",
  alternates: { canonical: "/tu-experiencia" },
  // Es una página a la que se llega por un enlace personal desde el correo:
  // no tiene sentido que la indexen los buscadores.
  robots: { index: false, follow: false },
};

export default function TuExperienciaPage() {
  return (
    <section className="bg-background-light pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="mx-auto max-w-xl px-6 sm:px-10">
        <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
          <FormularioExperiencia />
        </Suspense>
      </div>
    </section>
  );
}
