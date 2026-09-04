import { supabaseAdmin } from "@/lib/supabase/admin";
import { contactosPorTag, contarPorTag, type ContactoGHL } from "./ghl";
import { PROFESIONAL_EVALUACION } from "./constants";
import { variantesBusqueda } from "./telefono";

// Definición de las campañas que el CRM sabe leer. El tag de audiencia es a
// quién se le envió; el de interesado, quién respondió que sí.
export type Campana = {
  slug: string;
  nombre: string;
  // Uno o varios tags de audiencia (p. ej. una campaña segmentada en S1/S2
  // que igual se reporta como una sola pestaña). Se suman/combinan al leer.
  tagAudiencia: string | string[];
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
  {
    // Todavía no se lanza (al 27-07-2026 ambos tags existen en GHL con 0 contactos).
    // La pestaña queda lista para que se llene sola cuando empiece a etiquetarse.
    slug: "agosto-oferta",
    nombre: "Oferta Agosto",
    tagAudiencia: "agosto 26 oferta",
    tagInteresado: "interesado agosto 26 oferta",
    desde: "2026-08-01",
  },
  {
    // Workflow "Reactivación Septiembre 2026" en GHL: una sola rama de
    // respuesta para ambos segmentos (S1 y S2), por eso es una sola pestaña
    // con dos tags de audiencia y un solo tagInteresado ("interesado sept
    // 26", no "interesado aguinaldo 26 s1/s2" — ese último nunca se conectó
    // a nada real).
    slug: "aguinaldo-sept-2026",
    nombre: "Aguinaldo Septiembre 2026",
    tagAudiencia: ["aguinaldo 26 s1", "aguinaldo 26 s2"],
    tagInteresado: "interesado sept 26",
    desde: "2026-09-02",
  },
  {
    // No es una reactivación (no busca agendar evaluación), así que las
    // columnas agendó/asistió/inició del embudo compartido no aplican mucho
    // acá — se dejan igual por consistencia con el resto del CRM.
    // tagInteresado = el tag que se aplica a CUALQUIERA que completa el
    // formulario de /tu-experiencia (1 a 5 estrellas), porque es el único tag
    // universal de respuesta: mide participación real, no solo audiencia.
    slug: "resenas-sept-2026",
    nombre: "Reseñas Sept 2026",
    tagAudiencia: "campaña reseñas 2026",
    tagInteresado: "sorteo higiene blanqueamiento sept 26",
    desde: "2026-09-02",
  },
];

// En GHL el "no interesado" se marca con otro tag, sin quitar el de interesado,
// así que un contacto puede tener los dos a la vez. Hay muchas variantes escritas
// a mano ("no interesada", "nointeresada", "no interesado.", ...), de ahí el regex.
// Los "no quiere que la llamen" son pedidos explícitos de no contacto: pesan más.
const TAG_NEGATIVO = /^(no\s*est[aá]\s*interesad|no\s*interesad|nointeresad|descartad)/i;
const TAG_NO_LLAMAR = /^(no\s*quiere\s*(mas\s*)?(llamadas|que\s*la\s*llamen)|no\s*contactar)/i;

/** Devuelve el motivo por el que NO hay que llamar a este contacto, o null. */
function motivoDescarte(tags: string[]): string | null {
  for (const t of tags) {
    if (TAG_NO_LLAMAR.test(t.trim())) return `Pidió no ser contactado (“${t}”)`;
  }
  for (const t of tags) {
    if (TAG_NEGATIVO.test(t.trim())) return `Marcado no interesado (“${t}”)`;
  }
  return null;
}

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
  // Solo se llena para campañas de reseñas (tabla `resenas`, match directo
  // por ghl_contact_id). En el resto de las campañas queda null siempre.
  puntuacion: number | null;
  comentario: string | null;
  // "dejó reseña" / "resena google" se aplican A MANO en GHL cuando alguien
  // del equipo confirma que la persona efectivamente publicó en Google — no
  // se puede saber solo con haber enviado el formulario interno.
  dejoResena: boolean;
};

export type EmbudoCampana = {
  enviados: number;
  interesados: number;
  agendaron: number;
  asistieron: number;
  iniciaron: number;
  /** Interesados que no se pudieron cruzar con Dentalink: de ellos NO se sabe nada. */
  sinCruzar: number;
  /** Contactos apartados por tener tag de "no interesado" o de no contactar. */
  descartados: { nombre: string; motivo: string }[];
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

  const tagsAudiencia = Array.isArray(campana.tagAudiencia)
    ? campana.tagAudiencia
    : [campana.tagAudiencia];

  const [conteos, interesados] = await Promise.all([
    Promise.all(tagsAudiencia.map((t) => contarPorTag(t))),
    contactosPorTag(campana.tagInteresado, 500),
  ]);
  // Los tags de audiencia son mutuamente excluyentes (cada contacto entra a
  // un solo segmento), así que sumar los conteos no duplica gente.
  const enviados = conteos.reduce((a, b) => a + b, 0);

  const porId = new Map<number, ContactoGHL>();
  const porTelefono = new Map<string, ContactoGHL>();
  const porEmail = new Map<string, ContactoGHL>();
  const variantes: string[] = [];
  const emails: string[] = [];

  for (const c of interesados) {
    if (c.dentalinkPacienteId) porId.set(c.dentalinkPacienteId, c);
    for (const v of variantesBusqueda(c.phone)) {
      porTelefono.set(v, c);
      variantes.push(v);
    }
    const mail = (c.email ?? "").trim().toLowerCase();
    // "notiene@email.com" es el relleno que usa la clínica cuando no hay correo.
    if (mail && mail !== "notiene@email.com") {
      porEmail.set(mail, c);
      emails.push(mail);
    }
  }

  // Resolver el paciente de Dentalink de cada contacto: por teléfono o por correo.
  type PacienteMatch = { id: number; celular: string | null; telefono: string | null; email: string | null };
  const pacientesEncontrados: PacienteMatch[] = [];

  const consultas = [];
  if (variantes.length > 0) {
    consultas.push(
      db.from("pacientes").select("id,celular,telefono,email").in("celular", variantes),
      db.from("pacientes").select("id,celular,telefono,email").in("telefono", variantes),
    );
  }
  if (emails.length > 0) {
    consultas.push(db.from("pacientes").select("id,celular,telefono,email").in("email", emails));
  }
  if (consultas.length > 0) {
    for (const res of await Promise.all(consultas)) {
      pacientesEncontrados.push(...((res.data ?? []) as PacienteMatch[]));
    }
  }

  const contactoDePaciente = new Map<number, ContactoGHL>(porId);
  for (const p of pacientesEncontrados) {
    if (contactoDePaciente.has(p.id)) continue;
    for (const campo of [p.celular, p.telefono]) {
      for (const v of variantesBusqueda(campo)) {
        const c = porTelefono.get(v);
        if (c && !contactoDePaciente.has(p.id)) contactoDePaciente.set(p.id, c);
      }
    }
    const mail = (p.email ?? "").trim().toLowerCase();
    if (mail && !contactoDePaciente.has(p.id)) {
      const c = porEmail.get(mail);
      if (c) contactoDePaciente.set(p.id, c);
    }
  }

  const pacienteIds = [...contactoDePaciente.keys()];
  const pacienteDeContacto = new Map<string, number>();
  for (const [pid, c] of contactoDePaciente) pacienteDeContacto.set(c.id, pid);

  // Qué pasó con esos pacientes después del envío.
  // -1 nunca existe: evita ramificar el tipo cuando no hay pacientes que consultar.
  const idsConsulta = pacienteIds.length ? pacienteIds : [-1];

  const contactIds = interesados.map((c) => c.id);

  const [citasRes, tratRes, llamRes, resenasRes] = await Promise.all([
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
    // Solo aplica a campañas de reseñas, pero es barato pedirlo siempre: si
    // ningún interesado dejó fila en `resenas`, esto vuelve vacío y no hace
    // nada. Match directo por ghl_contact_id, no hace falta cruzar con Dentalink.
    contactIds.length
      ? db
          .from("resenas")
          .select("ghl_contact_id,puntuacion,detalle,creado_el")
          .in("ghl_contact_id", contactIds)
          .order("creado_el", { ascending: false })
      : Promise.resolve({ data: [] as { ghl_contact_id: string; puntuacion: number; detalle: string | null }[] }),
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

  type Resena = { ghl_contact_id: string; puntuacion: number; detalle: string | null };
  // Viene ordenado por creado_el desc: la primera fila por contacto es la más reciente.
  const resenaPorContacto = new Map<string, Resena>();
  for (const r of (resenasRes.data ?? []) as Resena[]) {
    if (!resenaPorContacto.has(r.ghl_contact_id)) resenaPorContacto.set(r.ghl_contact_id, r);
  }

  // Apartar a quien ya dijo que no: tener el tag de interesado no basta si
  // después lo marcaron como no interesado o pidió que no lo llamaran.
  const descartados: { nombre: string; motivo: string }[] = [];
  const llamables = interesados.filter((c) => {
    const motivo = motivoDescarte(c.tags);
    if (motivo) {
      descartados.push({
        nombre: [c.firstName, c.lastName].filter(Boolean).join(" ").trim() || "Sin nombre",
        motivo,
      });
      return false;
    }
    return true;
  });

  const filas: FilaCampana[] = llamables.map((c) => {
    const pacienteId = pacienteDeContacto.get(c.id) ?? null;
    const suyas = pacienteId ? citas.filter((x) => x.id_paciente === pacienteId) : [];
    const evaluaciones = suyas.filter((x) => x.nombre_dentista === PROFESIONAL_EVALUACION);
    const cita = evaluaciones[0] ?? suyas[0] ?? null;
    const hist = llamadas.get(c.id) ?? [];
    const resena = resenaPorContacto.get(c.id) ?? null;
    const dejoResena = c.tags.some((t) => {
      const n = t.trim().toLowerCase();
      return n === "dejó reseña" || n === "resena google" || n === "reseña google";
    });

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
      puntuacion: resena?.puntuacion ?? null,
      comentario: resena?.detalle ?? null,
      dejoResena,
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
      // Sin paciente de Dentalink no sabemos si agendó, asistió ni inició.
      // Contarlos aparte evita leer "sin agendar" donde en realidad es "sin dato".
      sinCruzar: filas.filter((f) => f.pacienteId === null).length,
      descartados,
    },
  };
}
