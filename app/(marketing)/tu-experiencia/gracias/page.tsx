import { redirect } from "next/navigation";

/**
 * Ruta vieja: hasta ago-2026, quien marcaba 5 estrellas en el correo llegaba
 * directo acá (sin pasar por el formulario). Ahora las 5 calificaciones usan
 * el mismo formulario en /tu-experiencia, así que esto es solo un redirect
 * de compatibilidad por si queda algún enlace de 5 estrellas ya enviado
 * apuntando a /tu-experiencia/gracias.
 */
export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const qs = new URLSearchParams({ rating: "5" });

  const c = sp.c;
  const nombre = sp.nombre;
  if (typeof c === "string" && c) qs.set("c", c);
  if (typeof nombre === "string" && nombre) qs.set("nombre", nombre);

  redirect(`/tu-experiencia?${qs.toString()}`);
}
