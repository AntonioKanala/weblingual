"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export async function registrarLlamada(
  input: RegistroLlamada,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!RESULTADOS_LLAMADA.includes(input.resultado as ResultadoLlamada)) {
    return { ok: false, error: "Resultado no válido" };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Sesión expirada, vuelve a entrar" };

  const { error } = await supabaseAdmin()
    .from("seguimiento_llamadas")
    .insert({
      origen: input.origen,
      resultado: input.resultado,
      notas: input.notas?.trim() || null,
      nombre: input.nombre ?? null,
      telefono: input.telefono ?? null,
      dentalink_cita_id: input.dentalinkCitaId ?? null,
      dentalink_paciente_id: input.dentalinkPacienteId ?? null,
      ghl_contact_id: input.ghlContactId ?? null,
      campana: input.campana ?? null,
      llamado_por: user.id,
    });

  if (error) {
    // El caso típico es que todavía no se corrió seguimiento_llamadas.sql.
    const falta = error.message.includes("does not exist") || error.code === "42P01";
    return {
      ok: false,
      error: falta
        ? "Falta crear la tabla: corre supabase/seguimiento_llamadas.sql"
        : `No se pudo guardar: ${error.message}`,
    };
  }

  revalidatePath("/interno/crm/no-iniciaron");
  revalidatePath("/interno/crm/campana");
  return { ok: true };
}
