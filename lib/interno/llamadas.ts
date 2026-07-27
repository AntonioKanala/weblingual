// Constantes y tipos del seguimiento de llamadas.
//
// Viven acá y NO en app/interno/crm/actions.ts porque ese archivo lleva
// "use server", y de un módulo "use server" Next.js solo deja exportar
// funciones async. Exportar la constante desde ahí hacía que llegara vacía
// al cliente y el formulario de "Anotar" no funcionara.

export const RESULTADOS_LLAMADA = [
  "Contactado",
  "No contesta",
  "Volver a llamar",
  "Agendó",
  "No interesado",
  "Número equivocado",
] as const;

export type ResultadoLlamada = (typeof RESULTADOS_LLAMADA)[number];

export type RegistroLlamada = {
  origen: "no_iniciaron" | "campana";
  resultado: string;
  notas?: string;
  nombre?: string;
  telefono?: string | null;
  dentalinkCitaId?: number;
  dentalinkPacienteId?: number | null;
  ghlContactId?: string;
  campana?: string;
};
