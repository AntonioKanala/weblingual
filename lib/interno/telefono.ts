// Normalización de teléfonos chilenos para poder llamar, abrir WhatsApp
// y cruzar contactos de GHL con pacientes de Dentalink (que los guardan
// en formatos distintos: "+56950180428", "950180428", "9 5018 0428", ...).

/** Deja solo dígitos y quita el prefijo país. Devuelve "" si no parece teléfono. */
export function soloDigitos(valor: string | null | undefined): string {
  const d = (valor ?? "").replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("56")) return d.slice(2);
  return d;
}

/** Formato E.164 para wa.me y tel:. "950180428" -> "+56950180428" */
export function aE164(valor: string | null | undefined): string | null {
  const d = soloDigitos(valor);
  // Chile: móvil 9XXXXXXXX (9 dígitos) o fijo de 8-9 dígitos.
  if (d.length < 8 || d.length > 9) return null;
  return `+56${d}`;
}

/** true si es celular chileno (empieza en 9 y tiene 9 dígitos) → sirve WhatsApp. */
export function esCelular(valor: string | null | undefined): boolean {
  const d = soloDigitos(valor);
  return d.length === 9 && d.startsWith("9");
}

/** Link de WhatsApp con mensaje opcional pre-cargado. */
export function linkWhatsApp(valor: string | null | undefined, mensaje?: string): string | null {
  const e164 = aE164(valor);
  if (!e164 || !esCelular(valor)) return null;
  const base = `https://wa.me/${e164.replace("+", "")}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/** "950180428" -> "+56 9 5018 0428" (para mostrar en pantalla). */
export function formatearParaMostrar(valor: string | null | undefined): string {
  const d = soloDigitos(valor);
  if (d.length === 9 && d.startsWith("9")) {
    return `+56 ${d[0]} ${d.slice(1, 5)} ${d.slice(5)}`;
  }
  if (d.length === 8) return `+56 2 ${d.slice(0, 4)} ${d.slice(4)}`;
  return valor ?? "—";
}

/**
 * Variantes de un teléfono para buscarlo en Supabase, donde Dentalink lo
 * guardó en cualquiera de estos formatos. Se usa con el filtro `in.()`.
 */
export function variantesBusqueda(valor: string | null | undefined): string[] {
  const d = soloDigitos(valor);
  if (!d) return [];
  return [...new Set([d, `56${d}`, `+56${d}`, `0${d}`])];
}
