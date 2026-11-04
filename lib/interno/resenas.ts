import { supabaseAdmin } from "@/lib/supabase/admin";
import { contactosPorTag, type ContactoGHL } from "./ghl";
import { aE164, linkWhatsApp, soloDigitos } from "./telefono";

export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ??
  "https://search.google.com/local/writereview?placeid=ChIJ23b4DSHPYpYRA7DF4PQp8YA";

export type ResenaFila = {
  id: number;
  creado_el: string;
  ghl_contact_id: string | null;
  nombre: string;
  puntuacion: number;
  motivo: string | null;
  detalle: string | null;
  enviado_ghl: boolean;
  rut: string | null;
  telefono: string | null;
  email: string | null;
  dejoGoogle: boolean;
  recibioWa: boolean;
  tagWa2: boolean;
  tags: string[];
  mensajeWhatsApp: string;
  tipoAccion:
    | "wa_primer_toque"
    | "wa_segundo_toque"
    | "wa_atencion_reclamo"
    | "google_confirmado"
    | "sin_telefono";
};

export type DashboardResenas = {
  filas: ResenaFila[];
  resumen: {
    totalRespuestas: number;
    personasUnicas: number;
    promedio: number;
    estrellas5: number;
    estrellas4: number;
    estrellas3: number;
    estrellas2: number;
    estrellas1: number;
    conComentario: number;
    dejoGoogle: number;
    pendientesGoogle: number;
    urgentesSinWa: number;
    programados28Sep: number;
    meta44FaltantesMin: number;
    meta44FaltantesMax: number;
  };
  comentariosDestacados: {
    id: number;
    nombre: string;
    puntuacion: number;
    detalle: string;
    fecha: string;
    telefono: string | null;
  }[];
};

function generarMensajeWhatsApp(
  nombre: string,
  puntuacion: number,
  dejoGoogle: boolean,
  recibioWa: boolean,
  tagWa2: boolean,
): { mensaje: string; tipoAccion: ResenaFila["tipoAccion"] } {
  const primerNombre = nombre.trim().split(" ")[0] || "Hola";

  if (puntuacion === 5) {
    if (dejoGoogle) {
      return {
        mensaje: `Hola ${primerNombre} 😊 Queríamos agradecerte de parte de todo el equipo de Clínica Lingual por tu excelente calificación y por compartir tu reseña en Google. ¡Ya estás participando en el sorteo de Higiene + Blanqueamiento de septiembre! Mucha suerte 🎉`,
        tipoAccion: "google_confirmado",
      };
    }
    if (tagWa2 || recibioWa) {
      return {
        mensaje: `${primerNombre}, última vez que te molesto con esto 😊 Nos pusiste 5 estrellas hace unos días y todavía tenemos tu cupo en el sorteo de la Higiene + Blanqueamiento guardado. Cierra el miércoles 30. Solo falta que dejes la reseña en Google — toma menos de un minuto: ${GOOGLE_REVIEW_URL} ¡Muchas gracias de verdad! 🙏`,
        tipoAccion: "wa_segundo_toque",
      };
    }
    return {
      mensaje: `Hola ${primerNombre} 😊 Te escribo de Clínica Lingual. Muchísimas gracias por tu calificación de 5 estrellas en nuestra encuesta. Ya estás participando en el sorteo de Higiene + Blanqueamiento de este miércoles 30. ¿Nos ayudarías publicando tu reseña también en Google? Nos apoya muchísimo y toma menos de un minuto: ${GOOGLE_REVIEW_URL} ¡Gracias! 🙏`,
      tipoAccion: "wa_primer_toque",
    };
  }

  // 1 a 4 estrellas (feedback y quejas internas)
  return {
    mensaje: `Hola ${primerNombre}, te escribimos de Clínica Lingual. Leímos con mucha atención los comentarios que nos dejaste en la encuesta sobre tu experiencia con nosotros. Queremos pedirte sinceras disculpas por los inconvenientes y nos gustaría poder conversar contigo para revisar tu caso y darte una solución. ¿A qué hora te acomodaría que te llamemos?`,
    tipoAccion: "wa_atencion_reclamo",
  };
}

export async function getDashboardResenas(): Promise<DashboardResenas> {
  const db = supabaseAdmin();

  // 1. Respuestas desde Supabase (fuente de verdad)
  const { data: resenasData, error: errResenas } = await db
    .from("resenas")
    .select("*")
    .order("creado_el", { ascending: false });

  if (errResenas) {
    throw new Error(`Error leyendo resenas de Supabase: ${errResenas.message}`);
  }

  const resenasRaw = (resenasData ?? []) as {
    id: number;
    creado_el: string;
    ghl_contact_id: string | null;
    nombre: string;
    puntuacion: number;
    motivo: string | null;
    detalle: string | null;
    enviado_ghl: boolean;
    rut: string | null;
  }[];

  // 2. Traer contactos de GHL con tag del sorteo en una sola consulta rápida
  let contactosGHL: ContactoGHL[] = [];
  try {
    contactosGHL = await contactosPorTag("sorteo higiene blanqueamiento sept 26", 200);
  } catch (e) {
    console.error("[getDashboardResenas] GHL contactosPorTag:", e);
  }

  const ghlPorId = new Map<string, ContactoGHL>();
  for (const c of contactosGHL) {
    ghlPorId.set(c.id, c);
  }

  // 3. Traer datos de pacientes en Supabase para respaldar teléfonos y emails faltantes
  const rutsLimpios = resenasRaw
    .map((r) => (r.rut ?? "").replace(/\./g, "").trim().toLowerCase())
    .filter(Boolean);

  type Paciente = { id: number; rut: string | null; celular: string | null; telefono: string | null; email: string | null };
  let pacientes: Paciente[] = [];
  if (rutsLimpios.length > 0) {
    const { data: pacData } = await db
      .from("pacientes")
      .select("id,rut,celular,telefono,email")
      .in("rut", rutsLimpios);
    pacientes = (pacData ?? []) as Paciente[];
  }

  const pacPorRut = new Map<string, Paciente>();
  for (const p of pacientes) {
    if (p.rut) {
      pacPorRut.set(p.rut.replace(/\./g, "").trim().toLowerCase(), p);
    }
  }

  // 4. Mapear y enriquecer cada reseña
  const filas: ResenaFila[] = resenasRaw.map((r) => {
    const rutLimpio = (r.rut ?? "").replace(/\./g, "").trim().toLowerCase();
    const ghl = r.ghl_contact_id ? ghlPorId.get(r.ghl_contact_id) : undefined;
    const pac = rutLimpio ? pacPorRut.get(rutLimpio) : undefined;

    const tags = ghl?.tags ?? [];
    const tagsLower = tags.map((t) => t.trim().toLowerCase());

    const dejoGoogle = tagsLower.some(
      (t) => t === "dejó reseña" || t === "resena google" || t === "reseña google",
    );
    const tagWa2 = tagsLower.some((t) => t.includes("wa2") || t.includes("28sep"));
    const recibioWa = tagsLower.some(
      (t) => t.includes("wa seguimiento") || t.includes("resena recordatorio enviado") || tagWa2,
    );

    const telefono = ghl?.phone ?? pac?.celular ?? pac?.telefono ?? null;
    const email = ghl?.email ?? pac?.email ?? null;

    const { mensaje, tipoAccion } = generarMensajeWhatsApp(
      r.nombre,
      r.puntuacion,
      dejoGoogle,
      recibioWa,
      tagWa2,
    );

    return {
      id: r.id,
      creado_el: r.creado_el,
      ghl_contact_id: r.ghl_contact_id,
      nombre: r.nombre,
      puntuacion: r.puntuacion,
      motivo: r.motivo,
      detalle: r.detalle,
      enviado_ghl: r.enviado_ghl,
      rut: r.rut,
      telefono,
      email,
      dejoGoogle,
      recibioWa,
      tagWa2,
      tags,
      mensajeWhatsApp: mensaje,
      tipoAccion: !telefono ? "sin_telefono" : tipoAccion,
    };
  });

  // 5. Estadísticas agregadas
  const total = filas.length;
  const sumaNotas = filas.reduce((acc, f) => acc + f.puntuacion, 0);
  const promedio = total > 0 ? Number((sumaNotas / total).toFixed(1)) : 0;

  const estrellas5 = filas.filter((f) => f.puntuacion === 5).length;
  const estrellas4 = filas.filter((f) => f.puntuacion === 4).length;
  const estrellas3 = filas.filter((f) => f.puntuacion === 3).length;
  const estrellas2 = filas.filter((f) => f.puntuacion === 2).length;
  const estrellas1 = filas.filter((f) => f.puntuacion === 1).length;

  const personasUnicasSet = new Set(
    filas.map((f) => f.ghl_contact_id || f.rut || f.nombre),
  );
  const conComentario = filas.filter((f) => f.detalle && f.detalle.trim().length > 0).length;

  const dejoGoogleCount = filas.filter((f) => f.puntuacion === 5 && f.dejoGoogle).length;
  const pendientesGoogle = filas.filter((f) => f.puntuacion === 5 && !f.dejoGoogle).length;

  const urgentesSinWa = filas.filter(
    (f) => f.puntuacion === 5 && !f.dejoGoogle && !f.recibioWa && f.telefono,
  ).length;

  const programados28Sep = filas.filter(
    (f) => f.puntuacion === 5 && !f.dejoGoogle && f.tagWa2,
  ).length;

  // Comentarios destacados para el panel
  const comentariosDestacados = filas
    .filter((f) => f.detalle && f.detalle.trim().length > 0)
    .map((f) => ({
      id: f.id,
      nombre: f.nombre,
      puntuacion: f.puntuacion,
      detalle: f.detalle!,
      fecha: f.creado_el.slice(0, 10),
      telefono: f.telefono,
    }));

  return {
    filas,
    resumen: {
      totalRespuestas: total,
      personasUnicas: personasUnicasSet.size,
      promedio,
      estrellas5,
      estrellas4,
      estrellas3,
      estrellas2,
      estrellas1,
      conComentario,
      dejoGoogle: dejoGoogleCount,
      pendientesGoogle,
      urgentesSinWa,
      programados28Sep,
      meta44FaltantesMin: 16,
      meta44FaltantesMax: 22,
    },
    comentariosDestacados,
  };
}
