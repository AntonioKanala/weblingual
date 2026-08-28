"use client";

import { useSearchParams } from "next/navigation";
import { URLS } from "@/lib/constants";
import { TarjetaExperiencia } from "./tarjeta-experiencia";

// Enlace de reseña del Perfil de Empresa de Google.
// PENDIENTE: definir NEXT_PUBLIC_GOOGLE_REVIEW_URL en Vercel con el enlace real
// (Perfil de Empresa → "Pedir reseñas"). Sin esa variable, el botón lleva al home.
const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? URLS.home;

/** Página a la que llega quien marcó 5 estrellas en el correo. */
export function GraciasResena() {
  const nombre = (useSearchParams().get("nombre") ?? "").trim();

  return (
    <TarjetaExperiencia eyebrow="Cinco estrellas" titulo="Qué bueno leer esto.">
      <p className="text-lg text-neutral-800">
        Gracias por tomarte el minuto{nombre ? `, ${nombre}` : ""}.
      </p>
      <p className="mt-4 text-neutral-600">
        Si te animas a contarlo en Google, ayudas a que alguien que lo está
        pensando se decida. Es lo que más nos sirve, y no toma más de un minuto.
      </p>
      <a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#1A6B4F] px-6 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-[#155941] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A6B4F]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 5.9 6.6 1-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-1L12 2.5z" />
        </svg>
        Escribir mi reseña en Google
      </a>
      <p className="mt-3 text-center text-sm text-neutral-500">
        Se abre Google. Si ya usas Gmail, no necesitas crear ninguna cuenta.
      </p>
    </TarjetaExperiencia>
  );
}
