import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { CAMPANAS, getCampana, type FilaCampana } from "@/lib/interno/campana";
import { hoyEnSantiago } from "@/lib/interno/fecha";

export const dynamic = "force-dynamic";

const SIN_FICHA = "Sin dato (no está en Dentalink)";

function antesDeLaCampana(f: FilaCampana): string {
  if (f.pacienteId === null) return SIN_FICHA;
  if (!f.historial) return "Sin dato (no se pudo leer el historial)";
  if (f.historial.estado === "asistio") return "Ya asistió a evaluación";
  if (f.historial.estado === "no_vino") return "Agendó y no vino";
  return "Nunca agendó evaluación";
}

// Misma lectura que la columna "Estado" del dashboard, pero separando el
// "Agendado" en si la hora todavía está por venir o ya pasó sin que llegara.
function despuesDeLaCampana(f: FilaCampana, hoy: string): string {
  if (f.pacienteId === null) return SIN_FICHA;
  if (f.inicio) return "Inició tratamiento";
  if (f.asistio) return "Asistió, no inició";
  if (!f.agendo) return "Sin agendar";
  const anulada = /anulad/i.test(f.estadoCita ?? "");
  if (f.fechaCita && f.fechaCita >= hoy && !anulada) return "Agendado, por venir";
  return "Agendó y no vino";
}

// Vive bajo /interno/ a propósito: el middleware ya protege todo ese árbol
// (matcher "/interno/:path*"), así que esta ruta queda protegida gratis sin
// duplicar el chequeo de sesión de Supabase acá.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("c");
  const campana = CAMPANAS.find((x) => x.slug === slug) ?? CAMPANAS[0];

  const { filas } = await getCampana(campana);
  const hoy = hoyEnSantiago();

  const filasExport = filas.map((f) => ({
    Nombre: f.nombre,
    RUT: f.rut ?? "",
    Teléfono: f.telefono ?? "",
    Correo: f.email ?? "",
    "Fecha de respuesta": f.fechaRespuesta ? f.fechaRespuesta.slice(0, 10) : "",
    "Ficha Dentalink": f.pacienteId ?? "",
    // Historial hasta el día del envío: el "antes" de la campaña.
    "Antes de la campaña": antesDeLaCampana(f),
    "Fecha (antes)": f.historial?.fecha ?? "",
    "Evaluaciones agendadas antes": f.historial ? f.historial.vecesAgendo : "",
    "Estado de su última evaluación": f.historial?.ultimoEstado ?? "",
    // Lo que pasó desde el envío en adelante.
    "Después de la campaña": despuesDeLaCampana(f, hoy),
    "Fecha cita (después)": f.fechaCita ?? "",
    "Estado cita (después)": f.estadoCita ?? "",
    "Último llamado": f.ultimaLlamada ? f.ultimaLlamada.llamado_at.slice(0, 10) : "",
    "Resultado del llamado": f.ultimaLlamada?.resultado ?? "",
    Llamados: f.vecesLlamado,
  }));

  const hoja = XLSX.utils.json_to_sheet(filasExport);
  hoja["!cols"] = [
    { wch: 28 }, { wch: 14 }, { wch: 16 }, { wch: 30 }, { wch: 16 },
    { wch: 14 }, { wch: 30 }, { wch: 13 }, { wch: 14 }, { wch: 26 },
    { wch: 30 }, { wch: 14 }, { wch: 22 }, { wch: 14 }, { wch: 24 }, { wch: 10 },
  ];
  // Filtros en el encabezado: la lista se usa para llamar por segmento.
  hoja["!autofilter"] = { ref: hoja["!ref"] ?? "A1" };
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Interesados");
  // "array" (ArrayBuffer) y no "buffer": el Buffer de Node ya no es asignable a
  // BodyInit con los tipos de Node 24, y el build de Next tipa esta ruta.
  const cuerpo = XLSX.write(libro, { type: "array", bookType: "xlsx" }) as ArrayBuffer;

  const nombreArchivo = `${campana.slug}-interesados.xlsx`;

  return new NextResponse(cuerpo, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${nombreArchivo}"`,
    },
  });
}
