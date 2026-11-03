import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { getDashboardResenas } from "@/lib/interno/resenas";

export const dynamic = "force-dynamic";

export async function GET() {
  const { filas } = await getDashboardResenas();

  const filasExport = filas.map((f) => ({
    ID: f.id,
    Fecha: f.creado_el.slice(0, 10),
    Nombre: f.nombre,
    RUT: f.rut ?? "",
    Teléfono: f.telefono ?? "",
    Correo: f.email ?? "",
    Puntuación: `${f.puntuacion} estrellas`,
    Comentario: f.detalle ?? "Sin comentario",
    "¿Dejó reseña en Google?": f.dejoGoogle ? "Sí" : "No / Pendiente",
    "¿Recibió WhatsApp seguimiento?": f.recibioWa ? "Sí" : "No",
    "Programado 28-sep (WA2)": f.tagWa2 ? "Sí" : "No",
    "Tipo de acción recomendada":
      f.tipoAccion === "wa_primer_toque"
        ? "Enviar 1er WhatsApp seguimiento"
        : f.tipoAccion === "wa_segundo_toque"
          ? "Enviar 2do toque (28-sep)"
          : f.tipoAccion === "wa_atencion_reclamo"
            ? "Llamar / Gestionar reclamo"
            : f.tipoAccion === "google_confirmado"
              ? "Confirmado en Google"
              : "Sin teléfono",
    "GHL Contact ID": f.ghl_contact_id ?? "",
    "Tags GHL": f.tags.join(", "),
  }));

  const hoja = XLSX.utils.json_to_sheet(filasExport);
  hoja["!cols"] = [
    { wch: 6 },
    { wch: 12 },
    { wch: 28 },
    { wch: 14 },
    { wch: 16 },
    { wch: 26 },
    { wch: 14 },
    { wch: 45 },
    { wch: 22 },
    { wch: 26 },
    { wch: 20 },
    { wch: 30 },
    { wch: 24 },
    { wch: 40 },
  ];
  hoja["!autofilter"] = { ref: hoja["!ref"] ?? "A1" };

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Reseñas y Feedback");

  const cuerpo = XLSX.write(libro, { type: "array", bookType: "xlsx" }) as ArrayBuffer;

  const fechaHoy = new Date().toISOString().slice(0, 10);
  const nombreArchivo = `resenas-lingual-${fechaHoy}.xlsx`;

  return new NextResponse(cuerpo, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${nombreArchivo}"`,
    },
  });
}
