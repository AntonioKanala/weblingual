import { CONTACT, SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Clínica Lingual",
  description:
    "Términos y condiciones de uso del sitio web de Clínica Lingual y de la información sobre tratamientos de ortodoncia lingual que aquí se publica.",
  alternates: {
    canonical: "/terminos",
  },
  openGraph: {
    title: "Términos y Condiciones | Clínica Lingual",
    description:
      "Condiciones de uso del sitio web de Clínica Lingual y de la información publicada.",
    url: "/terminos",
  },
};

const sections = [
  {
    title: "1. Sobre este sitio",
    body: `Este sitio web pertenece a ${SITE_NAME}, clínica especializada en ortodoncia lingual ubicada en ${CONTACT.address}. Al navegar por el sitio aceptas estos términos y condiciones de uso.`,
  },
  {
    title: "2. Información de carácter general",
    body: "Los contenidos de este sitio —descripciones de tratamientos, beneficios, plazos estimados y casos clínicos— tienen fines informativos y no constituyen diagnóstico ni indicación de tratamiento. Todo tratamiento de ortodoncia requiere una evaluación clínica presencial previa realizada por un profesional habilitado, y sus resultados y plazos varían según cada paciente.",
  },
  {
    title: "3. Agenda de citas",
    body: "La solicitud de horas a través del sitio o de nuestros canales de contacto queda sujeta a confirmación por parte de la clínica. Si no puedes asistir a una cita, te pedimos avisar con anticipación razonable para reasignar el cupo.",
  },
  {
    title: "4. Precios, promociones y pagos",
    body: "Los valores, promociones y facilidades de pago publicados son referenciales y pueden cambiar sin previo aviso; el valor definitivo de un tratamiento se entrega en el presupuesto individual tras la evaluación inicial. Los pagos en línea se procesan a través de Webpay; las condiciones de cada promoción vigente se informan al momento de presupuestar.",
  },
  {
    title: "5. Casos clínicos y testimonios",
    body: "Las fotografías de casos y los testimonios publicados corresponden a pacientes reales de la clínica que autorizaron su difusión. Ilustran resultados obtenidos en esos casos particulares y no garantizan resultados idénticos en otros pacientes.",
  },
  {
    title: "6. Propiedad intelectual",
    body: `Los textos, marcas, logotipos, fotografías y videos de este sitio son de propiedad de ${SITE_NAME} o se usan con autorización de sus titulares. No está permitida su reproducción o uso comercial sin autorización previa y por escrito.`,
  },
  {
    title: "7. Enlaces y servicios de terceros",
    body: "El sitio puede enlazar a servicios de terceros (agenda en línea, WhatsApp, pasarela de pago, redes sociales). Esos servicios se rigen por sus propios términos y políticas, que te recomendamos revisar.",
  },
  {
    title: "8. Responsabilidad",
    body: "Procuramos mantener la información del sitio actualizada y el servicio disponible, pero no garantizamos la ausencia de errores u interrupciones. Nada en estos términos limita los derechos que te reconocen la Ley 19.496 sobre protección de los derechos de los consumidores y la Ley 20.584 sobre derechos y deberes de los pacientes.",
  },
  {
    title: "9. Legislación aplicable y contacto",
    body: `Estos términos se rigen por las leyes de la República de Chile. Para consultas o reclamos, contáctanos al ${CONTACT.phone} o visítanos en ${CONTACT.address}.`,
  },
];

export default function TerminosPage() {
  return (
    <>
      <section className="bg-background-dark pb-16 pt-36 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-white/70">
            Condiciones de uso del sitio web de {SITE_NAME} y de la información
            que aquí se publica.
          </p>
          <p className="mt-2 text-sm text-white/40">
            Última actualización: julio de 2026
          </p>
        </div>
      </section>

      <section className="bg-background-light py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold text-text-light sm:text-2xl">
                  {section.title}
                </h2>
                <p className="mt-3 leading-relaxed text-text-muted">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
