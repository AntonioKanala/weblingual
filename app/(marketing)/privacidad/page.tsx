import { CONTACT, SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad y Datos Personales | Clínica Lingual",
  description:
    "Cómo Clínica Lingual trata tus datos personales y de salud según la Ley 21.719: qué datos usamos, para qué, con qué proveedores y cómo ejercer tus derechos.",
  alternates: {
    canonical: "/privacidad",
  },
  openGraph: {
    title: "Política de Privacidad y Datos Personales | Clínica Lingual",
    description:
      "Cómo tratamos y protegemos tus datos personales y de salud en Clínica Lingual.",
    url: "/privacidad",
  },
};

const VERSION = "2.0";
const VIGENCIA = "3 de noviembre de 2026";

const asuntoDerechos = encodeURIComponent(
  "Ejercicio de derechos sobre mis datos personales",
);
const MAIL_DERECHOS = `mailto:${CONTACT.email}?subject=${asuntoDerechos}`;
const WA_DERECHOS = `${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hola, quiero ejercer mis derechos sobre mis datos personales (acceso, rectificación, supresión, oposición o portabilidad). Mi nombre es: ",
)}`;

type Seccion = {
  id?: string;
  title: string;
  body?: string;
  items?: string[];
  extra?: "derechos" | "reabrirAviso";
};

const sections: Seccion[] = [
  {
    title: "1. Responsable del tratamiento",
    body: `${SITE_NAME}, clínica especializada en ortodoncia lingual, con domicilio en ${CONTACT.address}, es responsable del tratamiento de los datos personales que nos entregas a través de este sitio web, de nuestra agenda en línea y de nuestros canales de contacto. Puedes escribirnos a ${CONTACT.email} o llamarnos al ${CONTACT.phone}.`,
  },
  {
    title: "2. Datos que tratamos",
    items: [
      "Al agendar en línea: nombre, teléfono y correo electrónico.",
      "Al escribirnos desde un formulario o por WhatsApp: nombre, teléfono, el motivo de tu consulta y lo que decidas contarnos.",
      "Durante la atención clínica: información de salud (ficha clínica, radiografías y registros fotográficos), que se trata con reserva conforme a la Ley 20.584 sobre derechos y deberes de los pacientes.",
      "Si aceptas la medición del sitio: datos de navegación agregados (páginas vistas, dispositivo, origen de la visita).",
    ],
  },
  {
    title: "3. Para qué los usamos y con qué base",
    items: [
      "Coordinar tu evaluación y tus citas — porque tú nos lo pides al agendar o escribirnos.",
      "Atenderte y llevar tu ficha clínica — por obligación legal (normativa sanitaria).",
      "Emitir presupuestos y documentos tributarios — por obligación legal.",
      "Enviarte información sobre nuestros servicios — solo con tu consentimiento, que puedes retirar cuando quieras.",
      "Medir de forma agregada el uso del sitio — solo si lo aceptas en el aviso de medición.",
    ],
    body: "No vendemos ni cedemos tus datos a terceros con fines comerciales.",
  },
  {
    title: "4. Proveedores y transferencias internacionales",
    items: [
      "LeadConnector (GoHighLevel): agenda en línea y comunicación con pacientes. Trata los datos en Estados Unidos.",
      "Dentalink: software de gestión clínica y agenda de pacientes en tratamiento.",
      "Google: Google Analytics (solo si aceptas la medición), Google Maps y YouTube (solo si pulsas el botón para cargarlos). Trata los datos en Estados Unidos.",
      "Meta (WhatsApp): cuando eliges escribirnos por WhatsApp.",
      "Vercel: alojamiento del sitio web. Trata los datos en Estados Unidos.",
    ],
    body: "Estos proveedores tratan solo los datos necesarios para prestar su servicio, por cuenta nuestra y bajo condiciones de confidencialidad. Como algunos operan fuera de Chile, tus datos pueden transferirse al extranjero.",
  },
  {
    title: "5. Registros fotográficos y casos clínicos",
    body: "Las fotografías de casos clínicos publicadas en este sitio se difunden únicamente con la autorización expresa y previa del paciente. Puedes revocar esa autorización en cualquier momento y retiraremos el material a la brevedad.",
  },
  {
    id: "derechos",
    title: "6. Tus derechos y cómo ejercerlos",
    body: `Conforme a la Ley 21.719 sobre protección de datos personales, puedes pedir acceso a tus datos, su rectificación, su supresión, oponerte a su tratamiento (por ejemplo, a recibir comunicaciones comerciales) y solicitar su portabilidad o su bloqueo temporal. Escríbenos a ${CONTACT.email} con el asunto «Ejercicio de derechos sobre mis datos personales», o por WhatsApp. Te confirmaremos la recepción y responderemos dentro de 30 días corridos. Si no recibes respuesta o no estás conforme, puedes reclamar ante la Agencia de Protección de Datos Personales.`,
    extra: "derechos",
  },
  {
    title: "7. Seguridad y conservación",
    body: "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra acceso, pérdida o divulgación no autorizados. Conservamos los datos de contacto mientras sean necesarios para la finalidad por la que los entregaste, y la ficha clínica por el plazo mínimo que exige la normativa sanitaria (al menos quince años).",
  },
  {
    title: "8. Cookies y almacenamiento en tu navegador",
    items: [
      "Fuentes tipográficas: se sirven desde nuestro propio servidor; no se consulta a terceros.",
      "Google Analytics (cookies _ga y _ga_LK9227318P, de Google, duran hasta 2 años): solo se instalan si aceptas la medición en el aviso que aparece al entrar. Si la rechazas, no se carga nada.",
      "Tu decisión sobre la medición, y si ya abriste la agenda en línea, se guardan en el almacenamiento local de tu navegador (no son cookies ni salen de tu equipo), para no volver a preguntarte.",
      "El mapa de Google Maps, los videos de YouTube y la agenda en línea son servicios de terceros: se cargan solo cuando pulsas el botón correspondiente.",
    ],
    body: "Puedes cambiar tu decisión sobre la medición con el botón de abajo, y bloquear o eliminar las cookies desde la configuración de tu navegador sin que ello impida navegar por el sitio.",
    extra: "reabrirAviso",
  },
  {
    title: "9. Cambios a esta política",
    body: "Si cambiamos esta política, publicaremos aquí la nueva versión con su fecha de vigencia.",
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
          <p className="mt-2 text-sm text-white/60">
            Versión {VERSION} · vigente desde el {VIGENCIA}
          </p>
        </div>
      </section>

      <section className="bg-background-light py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-xl font-bold text-text-light sm:text-2xl">
                  {section.title}
                </h2>
                {section.items && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-text-muted">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.body && (
                  <p className="mt-3 leading-relaxed text-text-muted">
                    {section.body}
                  </p>
                )}
                {section.extra === "derechos" && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={MAIL_DERECHOS}
                      className="rounded-full bg-background-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
                    >
                      Escribir a {CONTACT.email}
                    </a>
                    <a
                      href={WA_DERECHOS}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-text-light/20 px-5 py-2.5 text-sm font-semibold text-text-light transition-colors hover:border-accent-gold hover:text-accent-gold"
                    >
                      Pedirlo por WhatsApp
                    </a>
                  </div>
                )}
                {section.extra === "reabrirAviso" && (
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
