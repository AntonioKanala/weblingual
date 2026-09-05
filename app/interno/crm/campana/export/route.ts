import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { CAMPANAS, getCampana } from "@/lib/interno/campana";

export const dynamic = "force-dynamic";

// Vive bajo /interno/ a propósito: el middleware ya protege todo ese árbol
// (matcher "/interno/:path*"), así que esta ruta queda protegida gratis sin
// duplicar el chequeo de sesión de Supabase acá.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("c");
  const campana = CAMPANAS.find((x) => x.slug === slug) ?? CAMPANAS[0];

  const { filas } = await getCampana(campana);

  const filasExport = filas.map((f) => ({
    Nombre: f.nombre,
    RUT: f.rut ?? "",
    Teléfono: f.telefono ?? "",
    Correo: f.email ?? "",
    "Fecha de respuesta": f.fechaRespuesta ? f.fechaRespuesta.slice(0, 10) : "",
  }));

  const hoja = XLSX.utils.json_to_sheet(filasExport);
  hoja["!cols"] = [{ wch: 28 }, { wch: 14 }, { wch: 16 }, { wch: 30 }, { wch: 16 }];
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
