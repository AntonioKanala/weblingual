import { URLS } from "@/lib/constants";
import { TarjetaExperiencia } from "./tarjeta-experiencia";

// Enlace de reseña del Perfil de Empresa de Google.
const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? URLS.home;

/**
 * Estado de éxito que se muestra dentro de /tu-experiencia después de enviar
 * el formulario. Antes vivía en una ruta aparte (/tu-experiencia/gracias)
 * solo para quien marcaba 5 estrellas; ahora todas las calificaciones pasan
 * por el mismo formulario y terminan acá, con copy distinto según el rating.
 */
export function ExperienciaExito({
  rating,
  nombre,
}: {
  rating: number | null;
  nombre: string;
}) {
  const esCincoEstrellas = rating === 5;
  const nombreLimpio = nombre.trim();

  return (
    <TarjetaExperiencia
      eyebrow={esCincoEstrellas ? "Cinco estrellas" : "Recibido"}
      titulo={esCincoEstrellas ? "Qué bueno leer esto." : "Gracias, de verdad."}
    >
      <p className="text-lg text-neutral-800">
        Gracias por tomarte el minuto{nombreLimpio ? `, ${nombreLimpio}` : ""}.
      </p>

      {esCincoEstrellas ? (
        <p className="mt-4 text-neutral-600">
          Tu respuesta ya quedó registrada en la clínica.
        </p>
      ) : (
        <p className="mt-4 text-neutral-600">
          Tu respuesta ya llegó a la clínica. Alguien del equipo te va a
          contactar directamente para conversarlo.
        </p>
      )}

      <div className="mt-6 rounded-xl border border-accent-green/30 bg-accent-green/10 px-4 py-3 text-sm text-accent-green">
        {esCincoEstrellas ? (
          <>
            Solo te falta <strong>dejar tu reseña en Google</strong> y ya
            estarás participando por el sorteo de una{" "}
            <strong>Higiene Dental + un Blanqueamiento</strong>. El sorteo
            cierra el <strong>30 de septiembre de 2026</strong> y avisamos a
            la persona ganadora por WhatsApp o teléfono.
          </>
        ) : (
          <>
            Ya estás participando por el sorteo de una{" "}
            <strong>Higiene Dental + un Blanqueamiento</strong>. El sorteo
            cierra el <strong>30 de septiembre de 2026</strong> y avisamos a
            la persona ganadora por WhatsApp o teléfono.
          </>
        )}
      </div>

      {esCincoEstrellas && (
        <>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-[#1A6B4F] px-6 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-[#155941] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A6B4F]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M12 2.5l2.9 5.9 6.6 1-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-1L12 2.5z" />
            </svg>
            Dejar mi reseña en Google
          </a>
          <p className="mt-3 text-center text-sm text-neutral-500">
            Se abre Google en una pestaña nueva. Si ya usas Gmail, no
            necesitas crear ninguna cuenta.
          </p>
        </>
      )}
    </TarjetaExperiencia>
  );
}
