/**
 * Envío de eventos a GA4.
 *
 * El sitio solo tenía el snippet de configuración, así que GA4 registraba
 * page_views y nada más: la tasa de conversión de la propiedad era 0,00%
 * porque no había ningún evento que medir.
 *
 * Las acciones de contacto disparan además `generate_lead`, que ya está
 * registrado como evento clave, para que la propiedad mida conversiones sin
 * depender de registrar nombres nuevos a mano en la consola de GA4.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-LK9227318P";

/**
 * Dominios a los que GA4 debe propagar el _gl para no romper la sesión.
 * El agendamiento real ocurre dentro del widget de GoHighLevel y, como
 * alternativa, en el subdominio de agenda de Dentalink.
 */
export const GA_LINKER_DOMAINS = [
  "clinicalingual.cl",
  "link.canala-studio.com",
  "agenda.softwaredentalink.com",
];

export type EventoConversion =
  /** Envío del formulario que abre WhatsApp con los datos ya escritos. */
  | "whatsapp_form_submit"
  /** Clic en el botón flotante de WhatsApp. */
  | "whatsapp_click"
  /** Clic en un teléfono (tel:). */
  | "phone_click"
  /** Llegada a la página de agendamiento. */
  | "agenda_view";

/**
 * Eventos clave YA registrados en la propiedad (Administrar → Eventos clave):
 * purchase, generate_lead, y cinco `*_vambe` que quedaron de un proveedor
 * anterior y hoy no los dispara nadie.
 *
 * Ninguno de los nombres de `EventoConversion` está en esa lista, así que por
 * sí solos GA4 los recibe como eventos normales y la propiedad seguiría
 * marcando 0 conversiones. Para no depender de que alguien entre a la consola
 * a registrarlos, las acciones que son contacto real disparan ADEMÁS
 * `generate_lead`, que ya es evento clave desde octubre de 2025.
 */
const ACCIONES_DE_CONTACTO: ReadonlySet<EventoConversion> = new Set([
  "whatsapp_form_submit",
  "whatsapp_click",
  "phone_click",
]);

/** Nombre del evento clave estándar de GA4 para un lead. */
const EVENTO_CLAVE_LEAD = "generate_lead";

export const trackEvent = (
  name: EventoConversion,
  params: Record<string, string | number | undefined> = {},
) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const comunes = {
    // El origen permite separar orgánico de campañas al cruzar con el CRM.
    page_path: window.location.pathname,
    ...params,
  };

  window.gtag("event", name, comunes);

  // `agenda_view` es una vista de página, no un contacto: no cuenta como lead.
  if (ACCIONES_DE_CONTACTO.has(name)) {
    // `method` permite volver a separar en GA4 qué acción generó el lead.
    window.gtag("event", EVENTO_CLAVE_LEAD, { ...comunes, method: name });
  }
};
