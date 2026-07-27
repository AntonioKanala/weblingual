import { supabaseAdmin } from "@/lib/supabase/admin";
import { PROFESIONAL_EVALUACION } from "./constants";
import { sumarDias } from "./fecha";
import type { Paciente } from "./types";

// ---------------------------------------------------------------------------
// Reglas de negocio
// ---------------------------------------------------------------------------
//
// "Asistió a la evaluación" = tiene una cita en la agenda de Evaluación Inicial
// con estado "Atendido".
//
// "Inició tratamiento"      = tiene un tratamiento con precio (total > 0) y con
//                             algún abono (abonado > 0), fechado desde 30 días ANTES
//                             de la evaluación en adelante.
//                             Se excluye "Diagnóstico" porque va siempre en $0 y se
//                             le crea a todo el mundo en la evaluación misma.
//
// Todo lo que asistió y NO cumple lo segundo es la lista de llamado.
//
// Lo de los 30 días antes no es capricho: en Dentalink el tratamiento se registra
// con la fecha en que se armó el presupuesto, que suele ser DÍAS ANTES de la cita
// de evaluación formal. Sin esa ventana, 17 pacientes que ya habían pagado su
// ortodoncia caían en la lista de llamado. Se midió la distribución real: 19 de
// los 22 pagos previos ocurren dentro de los 7 días, y a partir de los 30 la cifra
// se aplana (22 → 25 a los 60 → 26 a los 90), así que 30 separa bien al que acaba
// de iniciar del que fue paciente hace años y vuelve a evaluarse.

const TRATAMIENTOS_NO_CUENTAN = ["diagnóstico", "diagnostico"];
const DIAS_GRACIA_ANTES = 30;

export type FilaLlamado = {
  citaId: number;
  pacienteId: number;
  nombre: string;
  rut: string | null;
  telefono: string | null;
  email: string | null;
  fechaEvaluacion: string;
  diasDesde: number;
  // Contexto de la ficha de evaluación, si la secretaria alcanzó a llenarla.
  precioCotizado: string | null;
  objecion: string | null;
  nivelInteres: string | null;
  doctorEvaluador: string | null;
  notasDoctor: string | null;
  // Contexto de Dentalink
  tratamientoCotizado: string | null;
  montoCotizado: number | null;
  // Seguimiento
  ultimaLlamada: { resultado: string; llamado_at: string; notas: string | null } | null;
  vecesLlamado: number;
};

function diasEntre(desde: string, hasta: Date): number {
  const [y, m, d] = desde.split("-").map(Number);
  const inicio = Date.UTC(y, m - 1, d);
  const fin = Date.UTC(hasta.getUTCFullYear(), hasta.getUTCMonth(), hasta.getUTCDate());
  return Math.max(0, Math.round((fin - inicio) / 86_400_000));
}

/**
 * Pacientes que asistieron a su evaluación inicial en el rango y todavía
 * no inician tratamiento. Ordenados por fecha de evaluación descendente
 * (los más recientes primero, que son los que más rinde llamar).
 */
export async function getNoIniciaron(
  desde: string,
  hasta: string,
): Promise<{ filas: FilaLlamado[]; excluidosNoContactar: number }> {
  const db = supabaseAdmin();

  const { data: citasRaw, error } = await db
    .from("citas")
    .select("id,id_paciente,nombre_paciente,fecha")
    .eq("nombre_dentista", PROFESIONAL_EVALUACION)
    .eq("estado_cita", "Atendido")
    .gte("fecha", desde)
    .lte("fecha", hasta)
    .order("fecha", { ascending: false })
    .limit(1000);

  if (error) throw new Error(`Error leyendo evaluaciones atendidas: ${error.message}`);

  const citas = (citasRaw ?? []) as {
    id: number;
    id_paciente: number;
    nombre_paciente: string | null;
    fecha: string;
  }[];
  if (citas.length === 0) return { filas: [], excluidosNoContactar: 0 };

  const pacienteIds = [...new Set(citas.map((c) => c.id_paciente).filter(Boolean))];
  const citaIds = citas.map((c) => c.id);

  const [noContactarRes, pacRes, tratRes, evalRes, llamRes] = await Promise.all([
    // Lista de no contactar de Dentalink (vive solo en el esquema `core`).
    // Son 7.750 personas; llamarlas sería un problema, no una oportunidad.
    supabaseAdmin()
      .schema("core")
      .from("pacientes_no_contactar")
      .select("id_paciente")
      .in("id_paciente", pacienteIds),
    db.from("pacientes").select("id,rut,nombre,apellidos,telefono,celular,email").in("id", pacienteIds),
    db
      .from("tratamientos")
      .select("id_paciente,nombre,fecha,total,abonado")
      .in("id_paciente", pacienteIds)
      .gt("total", 0)
      .limit(5000),
    // Estas dos tablas pueden no existir todavía; si fallan se tratan como vacías.
    db
      .from("evaluaciones")
      .select(
        "dentalink_cita_id,precio_cotizado,objecion_principal,nivel_interes,doctor_evaluador,notas_doctor",
      )
      .in("dentalink_cita_id", citaIds),
    db
      .from("seguimiento_llamadas")
      .select("dentalink_cita_id,resultado,notas,llamado_at")
      .in("dentalink_cita_id", citaIds)
      .order("llamado_at", { ascending: false }),
  ]);

  const noContactar = new Set(
    ((noContactarRes.data ?? []) as { id_paciente: number }[]).map((r) => r.id_paciente),
  );

  const pacientes = new Map(((pacRes.data ?? []) as Paciente[]).map((p) => [p.id, p]));

  type Trat = { id_paciente: number; nombre: string | null; fecha: string | null; total: number; abonado: number };
  const tratamientos = (tratRes.data ?? []) as Trat[];

  const evaluaciones = new Map(
    ((evalRes.data ?? []) as Record<string, string | number | null>[]).map((e) => [
      e.dentalink_cita_id as number,
      e,
    ]),
  );

  type Llamada = { dentalink_cita_id: number; resultado: string; notas: string | null; llamado_at: string };
  const llamadasPorCita = new Map<number, Llamada[]>();
  for (const l of (llamRes.data ?? []) as Llamada[]) {
    const arr = llamadasPorCita.get(l.dentalink_cita_id) ?? [];
    arr.push(l);
    llamadasPorCita.set(l.dentalink_cita_id, arr);
  }

  const hoy = new Date();
  const filas: FilaLlamado[] = [];
  let excluidosNoContactar = 0;

  for (const c of citas) {
    // Nunca listar a quien pidió no ser contactado.
    if (noContactar.has(c.id_paciente)) {
      excluidosNoContactar += 1;
      continue;
    }

    const desdeCorte = sumarDias(c.fecha, -DIAS_GRACIA_ANTES);
    const delPaciente = tratamientos.filter((t) => t.id_paciente === c.id_paciente);
    const relevantes = delPaciente.filter(
      (t) =>
        !TRATAMIENTOS_NO_CUENTAN.includes((t.nombre ?? "").trim().toLowerCase()) &&
        (t.fecha ?? "") >= desdeCorte,
    );

    // Si ya abonó algo en un tratamiento posterior a la evaluación, inició: fuera de la lista.
    if (relevantes.some((t) => Number(t.abonado) > 0)) continue;

    // El tratamiento cotizado más caro sirve de contexto para la llamada.
    const cotizado = relevantes.sort((a, b) => Number(b.total) - Number(a.total))[0] ?? null;

    const p = pacientes.get(c.id_paciente);
    const ev = evaluaciones.get(c.id);
    const llamadas = llamadasPorCita.get(c.id) ?? [];

    filas.push({
      citaId: c.id,
      pacienteId: c.id_paciente,
      nombre:
        c.nombre_paciente ||
        [p?.nombre, p?.apellidos].filter(Boolean).join(" ").trim() ||
        "Sin nombre",
      rut: p?.rut ?? null,
      telefono: p?.celular || p?.telefono || null,
      email: p?.email ?? null,
      fechaEvaluacion: c.fecha,
      diasDesde: diasEntre(c.fecha, hoy),
      precioCotizado: (ev?.precio_cotizado as string) ?? null,
      objecion: (ev?.objecion_principal as string) ?? null,
      nivelInteres: (ev?.nivel_interes as string) ?? null,
      doctorEvaluador: (ev?.doctor_evaluador as string) ?? null,
      notasDoctor: (ev?.notas_doctor as string) ?? null,
      tratamientoCotizado: cotizado?.nombre ?? null,
      montoCotizado: cotizado ? Number(cotizado.total) : null,
      ultimaLlamada: llamadas[0]
        ? { resultado: llamadas[0].resultado, llamado_at: llamadas[0].llamado_at, notas: llamadas[0].notas }
        : null,
      vecesLlamado: llamadas.length,
    });
  }

  return { filas, excluidosNoContactar };
}

export type ResumenNoIniciaron = {
  atendidos: number;
  iniciaron: number;
  noIniciaron: number;
  sinLlamar: number;
  montoEnJuego: number;
  excluidosNoContactar: number;
};

export function resumir(
  filas: FilaLlamado[],
  atendidos: number,
  excluidosNoContactar: number,
): ResumenNoIniciaron {
  return {
    atendidos,
    // Los excluidos no iniciaron: simplemente no se pueden llamar.
    iniciaron: atendidos - filas.length - excluidosNoContactar,
    noIniciaron: filas.length,
    sinLlamar: filas.filter((f) => f.vecesLlamado === 0).length,
    montoEnJuego: filas.reduce((s, f) => s + (f.montoCotizado ?? 0), 0),
    excluidosNoContactar,
  };
}

/** Cuántas evaluaciones se atendieron en el rango (denominador del embudo). */
export async function contarAtendidos(desde: string, hasta: string): Promise<number> {
  const { count } = await supabaseAdmin()
    .from("citas")
    .select("id", { count: "exact", head: true })
    .eq("nombre_dentista", PROFESIONAL_EVALUACION)
    .eq("estado_cita", "Atendido")
    .gte("fecha", desde)
    .lte("fecha", hasta);
  return count ?? 0;
}
