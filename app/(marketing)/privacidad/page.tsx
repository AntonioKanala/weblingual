import { CONTACT, SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Clínica Lingual",
  description:
    "Política de privacidad de Clínica Lingual: cómo tratamos y protegemos tus datos personales y de salud conforme a la legislación chilena.",
  alternates: {
    canonical: "/privacidad",
  },
  openGraph: {
    title: "Política de Privacidad | Clínica Lingual",
    description:
      "Cómo tratamos y protegemos tus datos personales y de salud en Clínica Lingual.",
    url: "/privacidad",
  },
};

const sections = [
  {
    title: "1. Responsable del tratamiento",
    body: `${SITE_NAME}, clínica especializada en ortodoncia lingual, con domicilio en ${CONTACT.address}, es responsable del tratamiento de los datos personales que nos entregas a través de este sitio web, de nuestros formularios de agenda y de nuestros canales de contacto (teléfono y WhatsApp).`,
  },
  {
    title: "2. Datos que recopilamos",
    body: "Recopilamos los datos que nos entregas voluntariamente al agendar una evaluación o contactarnos: nombre, teléfono, correo electrónico y el motivo de tu consulta. Durante la atención clínica se genera además información de salud (ficha clínica, radiografías, registros fotográficos), que se trata con reserva conforme a la Ley 20.584 sobre derechos y deberes de los pacientes.",
  },
  {
    title: "3. Finalidad del tratamiento",
    body: "Usamos tus datos para gestionar tu agenda de citas, contactarte respecto de tu evaluación o tratamiento, emitir presupuestos y documentos tributarios, y —solo si lo autorizas— enviarte información sobre nuestros servicios. No vendemos ni cedemos tus datos a terceros con fines comerciales.",
  },
  {
    title: "4. Encargados y herramientas de terceros",
    body: "Para operar utilizamos proveedores tecnológicos que procesan datos por cuenta nuestra: plataformas de agenda y comunicación con pacientes, alojamiento web y herramientas de analítica. Estos proveedores solo tratan los datos necesarios para prestar el servicio y bajo condiciones de confidencialidad.",
  },
  {
    title: "5. Registros fotográficos y casos clínicos",
    body: "Las fotografías de casos clínicos publicadas en este sitio se difunden únicamente con la autorización expresa y previa del paciente. Puedes revocar esa autorización en cualquier momento contactándonos, y retiraremos el material a la brevedad.",
  },
  {
    title: "6. Tus derechos",
    body: "Conforme a la legislación chilena sobre protección de datos personales (Ley 19.628 y sus modificaciones), puedes solicitar acceso, rectificación, cancelación o bloqueo de tus datos, así como oponerte a su uso con fines de comunicación comercial. Para ejercer estos derechos, escríbenos o llámanos a los contactos indicados más abajo.",
  },
  {
    title: "7. Seguridad y conservación",
    body: "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra acceso, pérdida o divulgación no autorizados. La ficha clínica se conserva por los plazos que exige la normativa sanitaria vigente.",
  },
  {
    title: "8. Cookies, medición y herramientas de terceros",
    body: "Las fuentes tipográficas del sitio se sirven desde nuestro propio servidor. Usamos Google Analytics para medir de forma agregada el uso de las páginas, pero solo se activa si lo aceptas en el aviso que aparece al entrar; si lo rechazas, no se carga. El mapa de Google Maps, los videos de YouTube y la agenda en línea son servicios de terceros: el mapa y los videos se cargan solo cuando pulsas el botón correspondiente, y la agenda funciona dentro de la página de agendamiento. Puedes cambiar tu decisión sobre la medición con el botón de abajo y bloquear o eliminar las cookies desde la configuración de tu navegador sin que ello impida navegar por el sitio.",
    reabrirAviso: true,
  },
  {
    title: "9. Contacto",
    body: `Para cualquier consulta sobre esta política o el tratamiento de tus datos, contáctanos al ${CONTACT.phone} o visítanos en ${CONTACT.address}.`,
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <section className="bg-background-dark pb-16 pt-36 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Política de Privacidad
          </h1>
          <p className="mt-4 text-white/70">
            Cómo tratamos y protegemos tus datos personales y de salud en{" "}
            {SITE_NAME}.
          </p>
          <p className="mt-2 text-sm text-white/40">
            Última actualización: 22 de octubre de 2026
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
                {"reabrirAviso" in section && section.reabrirAviso && (
                  <button
                    type="button"
                    data-aviso-reabrir
                    className="mt-4 rounded-full border border-text-light/20 px-5 py-2 text-sm font-semibold text-text-light transition-colors hover:border-accent-gold hover:text-accent-gold"
                  >
                    Cambiar mi decisión sobre la medición
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
