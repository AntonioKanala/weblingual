import { supabaseAdmin } from "@/lib/supabase/admin";
import { contactosPorTag, contarPorTag, type ContactoGHL } from "./ghl";
import { PROFESIONAL_EVALUACION } from "./constants";
import { variantesBusqueda } from "./telefono";

// Definición de las campañas que el CRM sabe leer. El tag de audiencia es a
// quién se le envió; el de interesado, quién respondió que sí.
export type Campana = {
  slug: string;
  nombre: string;
  tagAudiencia: string;
  tagInteresado: string;
  desde: string; // para contar agendamientos posteriores al envío
};

export const CAMPANAS: Campana[] = [
  {
    slug: "dia-del-amigo",
    nombre: "Día del Amigo",
    tagAudiencia: "dia del amigo julio 26",
    tagInteresado: "interesado amigo julio 26",
    desde: "2026-07-18",
  },
  {
    // `desde` sale de los datos, no del nombre del tag: los 23 contactos con el
    // tag de interesado se modificaron entre el 22-06 y el 01-07-2026, así que
    // el envío fue a fines de junio. Si hubo un reenvío posterior, ajustar acá.
    slug: "vacaciones-invierno",
    nombre: "Vacaciones de Invierno",
    tagAudiencia: "vacas de invierno 26 junio",
    tagInteresado: "interesado vacas de inv 26",
    desde: "2026-06-22",
  },
  {
    // Ojo: al 27-07-2026 esta campaña tiene 1.521 contactos en la audiencia pero
    // CERO con el tag de interesado, así que la tabla sale vacía a propósito.
    // La audiencia comparte contactos con el tag "promo julio 2026" (mismos 1.521).
    slug: "invierno-julio",
    nombre: "Invierno Julio",
    tagAudiencia: "invierno julio 2026",
    tagInteresado: "interesado invierno julio 26",
    desde: "2026-07-01",
  },
];

export type FilaCampana = {
  contactId: string;
  nombre: string;
  telefono: string | null;
  email: string | null;
  pacienteId: number | null;
  // Estado en Dentalink, posterior al envío de la campaña
  agendo: boolean;
  asistio: boolean;
  inicio: boolean;
  fechaCita: string | null;
  estadoCita: string | null;
  ultimaLlamada: { resultado: string; llamado_at: string } | null;
  vecesLlamado: number;
};

export type EmbudoCampana = {
  enviados: number;
  interesados: number;
  agendaron: number;
  asistieron: number;
  iniciaron: number;
};

/**
 * Cruza los interesados de una campaña de GHL con lo que efectivamente
 * pasó en Dentalink: si agendaron evaluación, si asistieron y si iniciaron.
 *
 * El match se hace primero por el custom field dentalinkPatientId (confiable
 * pero poco poblado) y, si no está, por teléfono normalizado.
 */
export async function getCampana(
  campana: Campana,
): Promise<{ filas: FilaCampana[]; embudo: EmbudoCampana }> {
  const db = supabaseAdmin();

  const [enviados, interesados] = await Promise.all([
    contarPorTag(campana.tagAudiencia),
    contactosPorTag(campana.tagInteresado, 500),
  ]);

  const porId = new Map<number, ContactoGHL>();
  const porTelefono = new Map<string, ContactoGHL>();
  const variantes: string[] = [];

  for (const c of interesados) {
    if (c.dentalinkPacienteId) porId.set(c.dentalinkPacienteId, c);
    for (const v of variantesBusqueda(c.phone)) {
      porTelefono.set(v, c);
      variantes.push(v);
    }
  }

  // Resolver el paciente de Dentalink de cada contacto.
  const pacientesEncontrados: { id: number; celular: string | null; telefono: string | null }[] = [];

  if (variantes.length > 0) {
    const [porCel, porTel] = await Promise.all([
      db.from("pacientes").select("id,celular,telefono").in("celular", variantes),
      db.from("pacientes").select("id,celular,telefono").in("telefono", variantes),
    ]);
    pacientesEncontrados.push(
      ...((porCel.data ?? []) as typeof pacientesEncontrados),
      ...((porTel.data ?? []) as typeof pacientesEncontrados),
    );
  }

  const contactoDePaciente = new Map<number, ContactoGHL>(porId);
  for (const p of pacientesEncontrados) {
    for (const campo of [p.celular, p.telefono]) {
      for (const v of variantesBusqueda(campo)) {
        const c = porTelefono.get(v);
        if (c && !contactoDePaciente.has(p.id)) contactoDePaciente.set(p.id, c);
      }
    }
  }

  const pacienteIds = [...contactoDePaciente.keys()];
  const pacienteDeContacto = new Map<string, number>();
  for (const [pid, c] of contactoDePaciente) pacienteDeContacto.set(c.id, pid);

  // Qué pasó con esos pacientes después del envío.
  // -1 nunca existe: evita ramificar el tipo cuando no hay pacientes que consultar.
  const idsConsulta = pacienteIds.length ? pacienteIds : [-1];

  const [citasRes, tratRes, llamRes] = await Promise.all([
    db
      .from("citas")
      .select("id_paciente,fecha,estado_cita,nombre_dentista")
      .in("id_paciente", idsConsulta)
      .gte("fecha", campana.desde)
      .order("fecha", { ascending: false }),
    db
      .from("tratamientos")
      .select("id_paciente,nombre,fecha,total,abonado")
      .in("id_paciente", idsConsulta)
      .gte("fecha", campana.desde)
      .gt("total", 0),
    db
      .from("seguimiento_llamadas")
      .select("ghl_contact_id,resultado,llamado_at")
      .eq("campana", campana.tagInteresado)
      .order("llamado_at", { ascending: false }),
  ]);

  type Cita = { id_paciente: number; fecha: string; estado_cita: string | null; nombre_dentista: string | null };
  const citas = (citasRes.data ?? []) as Cita[];
  type Trat = { id_paciente: number; abonado: number };
  const tratamientos = (tratRes.data ?? []) as Trat[];

  type Llamada = { ghl_contact_id: string; resultado: string; llamado_at: string };
  const llamadas = new Map<string, Llamada[]>();
  for (const l of (llamRes.data ?? []) as Llamada[]) {
    const arr = llamadas.get(l.ghl_contact_id) ?? [];
    arr.push(l);
    llamadas.set(l.ghl_contact_id, arr);
  }

  const filas: FilaCampana[] = interesados.map((c) => {
    const pacienteId = pacienteDeContacto.get(c.id) ?? null;
    const suyas = pacienteId ? citas.filter((x) => x.id_paciente === pacienteId) : [];
    const evaluaciones = suyas.filter((x) => x.nombre_dentista === PROFESIONAL_EVALUACION);
    const cita = evaluaciones[0] ?? suyas[0] ?? null;
    const hist = llamadas.get(c.id) ?? [];

    return {
      contactId: c.id,
      nombre: [c.firstName, c.lastName].filter(Boolean).join(" ").trim() || "Sin nombre",
      telefono: c.phone,
      email: c.email,
      pacienteId,
      agendo: suyas.length > 0,
      asistio: suyas.some((x) => x.estado_cita === "Atendido"),
      inicio: pacienteId
        ? tratamientos.some((t) => t.id_paciente === pacienteId && Number(t.abonado) > 0)
        : false,
      fechaCita: cita?.fecha ?? null,
      estadoCita: cita?.estado_cita ?? null,
      ultimaLlamada: hist[0] ? { resultado: hist[0].resultado, llamado_at: hist[0].llamado_at } : null,
      vecesLlamado: hist.length,
    };
  });

  return {
    filas,
    embudo: {
      enviados,
      interesados: filas.length,
      agendaron: filas.filter((f) => f.agendo).length,
      asistieron: filas.filter((f) => f.asistio).length,
      iniciaron: filas.filter((f) => f.inicio).length,
    },
  };
}
