// "Hoy" en la zona horaria de la clínica (Chile), en formato YYYY-MM-DD,
// independientemente de la zona del servidor (Vercel corre en UTC).
export function hoyEnSantiago(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Valida que un string sea una fecha YYYY-MM-DD; si no, devuelve hoy.
export function normalizarFecha(fecha: string | undefined | null): string {
  if (fecha && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
  return hoyEnSantiago();
}

// "2026-05-27" -> "martes 27 de mayo"
export function fechaLegible(fecha: string): string {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(y, m - 1, d));
}

// Suma días a una fecha YYYY-MM-DD (para navegación prev/next).
export function sumarDias(fecha: string, dias: number): string {
  const [y, m, d] = fecha.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + dias);
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
