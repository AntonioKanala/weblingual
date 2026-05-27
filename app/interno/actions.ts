"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { evaluacionSchema, type EvaluacionInput } from "@/lib/interno/schema";

export type GuardarResultado =
  | { ok: true; id: string; ghlOk: boolean; ghlError: string | null }
  | { ok: false; error: string };

// Guarda la ficha en Supabase (fuente de verdad) y luego la dispara a GHL vía n8n.
// El envío a GHL NO bloquea: si falla, la ficha ya quedó guardada y se puede reintentar.
export async function guardarEvaluacion(input: EvaluacionInput): Promise<GuardarResultado> {
  const parsed = evaluacionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }
  const d = parsed.data;

  // Quién llenó la ficha (para trazabilidad).
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const row = {
    dentalink_cita_id: d.dentalink_cita_id,
    dentalink_paciente_id: d.dentalink_paciente_id ?? null,
    nombre_paciente: d.nombre_paciente ?? null,
    rut: d.rut ?? null,
    telefono: d.telefono ?? null,
    email: d.email ?? null,
    doctor_evaluador: d.doctor_evaluador,
    tipo_caso: d.tipo_caso,
    precio_cotizado: d.precio_cotizado,
    objecion_principal: d.objecion_principal,
    nivel_interes: d.nivel_interes,
    duracion_estimada: d.duracion_estimada || null,
    tiene_seguro: d.tiene_seguro || null,
    nombre_isapre: d.nombre_isapre || null,
    nombre_seguro: d.nombre_seguro || null,
    plan_pago: d.plan_pago || null,
    foto_caso_similar: d.foto_caso_similar || null,
    notas_doctor: d.notas_doctor || null,
    fase_seguimiento: d.fase_seguimiento || "Fase 1",
    created_by: user?.id ?? null,
  };

  const { data: inserted, error } = await supabaseAdmin()
    .from("evaluaciones")
    .insert(row)
    .select("id")
    .single();

  if (error || !inserted) {
    return { ok: false, error: `No se pudo guardar: ${error?.message ?? "error desconocido"}` };
  }

  // Disparo a GHL vía n8n.
  let ghlOk = false;
  let ghlError: string | null = null;
  const webhook = process.env.N8N_EVALUACION_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evaluacion_id: inserted.id, ...row }),
      });
      ghlOk = res.ok;
      if (!res.ok) ghlError = `n8n respondió ${res.status}`;
    } catch (e) {
      ghlError = e instanceof Error ? e.message : "Error llamando a n8n";
    }

    await supabaseAdmin()
      .from("evaluaciones")
      .update({
        enviado_ghl: ghlOk,
        enviado_ghl_at: ghlOk ? new Date().toISOString() : null,
        ghl_response: ghlError ? { error: ghlError } : { ok: true },
      })
      .eq("id", inserted.id);
  } else {
    ghlError = "Webhook de n8n no configurado (N8N_EVALUACION_WEBHOOK_URL)";
  }

  revalidatePath("/interno/agenda");
  return { ok: true, id: inserted.id, ghlOk, ghlError };
}
