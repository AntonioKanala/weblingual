import { Suspense } from "react";
import type { Metadata } from "next";
import { GraciasResena } from "@/components/sections/gracias-resena";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Gracias | ${SITE_NAME}`,
  description:
    "Gracias por contarnos cómo estuvo tu experiencia en Clínica Lingual.",
  alternates: { canonical: "/tu-experiencia/gracias" },
  // Se llega por un enlace personal desde el correo: no tiene sentido indexarla.
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <section className="bg-background-light pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="mx-auto max-w-xl px-6 sm:px-10">
        <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
          <GraciasResena />
        </Suspense>
      </div>
    </section>
  );
}
