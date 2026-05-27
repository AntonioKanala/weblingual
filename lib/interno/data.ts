import { supabaseAdmin } from "@/lib/supabase/admin";
import { PROFESIONAL_EVALUACION } from "./constants";
import type { Cita, Paciente, CitaConPaciente } from "./types";

const CITA_COLS =
  "id,id_paciente,nombre_paciente,estado_cita,nombre_tratamiento,nombre_dentista,fecha,hora_inicio,hora_fin,comentarios";
const PACIENTE_COLS = "id,rut,nombre,apellidos,telefono,celular,email";

// Agenda de un día: citas de esa fecha + datos del paciente + si ya fue evaluada.
export async function getAgendaDelDia(fecha: string): Promise<CitaConPaciente[]> {
  const { data, error } = await supabaseAdmin
    .from("citas")
    .select(CITA_COLS)
    .eq("fecha", fecha)
    .eq("nombre_dentista", PROFESIONAL_EVALUACION)
    .order("hora_inicio", { ascending: true });

  if (error) throw new Error(`Error leyendo citas: ${error.message}`);

  const citas = (data ?? []) as Cita[];
  if (citas.length === 0) return [];

  const pacienteIds = [...new Set(citas.map((c) => c.id_paciente).filter(Boolean))];
  const citaIds = citas.map((c) => c.id);

  const [pacientesRes, evalsRes] = await Promise.all([
    supabaseAdmin.from("pacientes").select(PACIENTE_COLS).in("id", pacienteIds),
    // evaluaciones puede no existir todavía; si falla, se trata como vacío.
    supabaseAdmin.from("evaluaciones").select("dentalink_cita_id").in("dentalink_cita_id", citaIds),
  ]);

  const pacientes = (pacientesRes.data ?? []) as Paciente[];
  const pacienteMap = new Map(pacientes.map((p) => [p.id, p]));
  const evaluadas = new Set(
    ((evalsRes.data ?? []) as { dentalink_cita_id: number }[]).map((e) => e.dentalink_cita_id),
  );

  return citas.map((c) => ({
    ...c,
    paciente: pacienteMap.get(c.id_paciente) ?? null,
    evaluada: evaluadas.has(c.id),
  }));
}

export type EvaluacionRow = {
  id: string;
  doctor_evaluador: string;
  tipo_caso: string;
  precio_cotizado: string;
  objecion_principal: string;
  nivel_interes: string;
  duracion_estimada: string | null;
  tiene_seguro: string | null;
  nombre_isapre: string | null;
  nombre_seguro: string | null;
  plan_pago: string | null;
  foto_caso_similar: string | null;
  notas_doctor: string | null;
  fase_seguimiento: string | null;
  enviado_ghl: boolean | null;
};

const EVAL_COLS =
  "id,doctor_evaluador,tipo_caso,precio_cotizado,objecion_principal,nivel_interes,duracion_estimada,tiene_seguro,nombre_isapre,nombre_seguro,plan_pago,foto_caso_similar,notas_doctor,fase_seguimiento,enviado_ghl";

// Detalle de una cita para la pantalla del formulario (con evaluación previa si existe).
export async function getCitaDetalle(citaId: number): Promise<{
  cita: Cita;
  paciente: Paciente | null;
  evaluacion: EvaluacionRow | null;
} | null> {
  const { data: cita } = await supabaseAdmin
    .from("citas")
    .select(CITA_COLS)
    .eq("id", citaId)
    .maybeSingle();

  if (!cita) return null;
  const citaTyped = cita as Cita;

  const [pacRes, evalRes] = await Promise.all([
    supabaseAdmin
      .from("pacientes")
      .select(PACIENTE_COLS)
      .eq("id", citaTyped.id_paciente)
      .maybeSingle(),
    supabaseAdmin
      .from("evaluaciones")
      .select(EVAL_COLS)
      .eq("dentalink_cita_id", citaId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  return {
    cita: citaTyped,
    paciente: (pacRes.data ?? null) as Paciente | null,
    evaluacion: (evalRes.data ?? null) as EvaluacionRow | null,
  };
}
