import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Ids de los custom fields de GHL (creados por API el 27-ago-2026).
const CF = {
  puntuacion: "v3IW0gHwvg1IP9RSiof0",
  motivo: "AwrhQ1jpPLm6Gu6hYpYn",
  detalle: "u6k7o8tWo2dnMximUl0W",
  canal: "tibGGWX9A27zEu0ljnUn",
} as const;

const MOTIVOS_VALIDOS = new Set([
  "La atención o el trato",
  "Los tiempos de espera",
  "El resultado del tratamiento",
  "El precio o la forma de pago",
  "La comunicación: respuestas, recordatorios, agenda",
  "Otra cosa",
]);

type Cuerpo = {
  rating?: unknown;
  contactId?: unknown;
  nombre?: unknown;
  motivo?: unknown;
  detalle?: unknown;
};

function texto(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let cuerpo: Cuerpo;
  try {
    cuerpo = (await req.json()) as Cuerpo;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const rating =
    typeof cuerpo.rating === "number" && cuerpo.rating >= 1 && cuerpo.rating <= 5
      ? Math.trunc(cuerpo.rating)
      : null;
  const motivo = texto(cuerpo.motivo, 120);
  const detalle = texto(cuerpo.detalle, 4000);
  const nombre = texto(cuerpo.nombre, 120);
  const contactId = texto(cuerpo.contactId, 60);

  if (!rating && !detalle) {
    return NextResponse.json({ ok: false, error: "Respuesta vacía" }, { status: 400 });
  }
  if (motivo && !MOTIVOS_VALIDOS.has(motivo)) {
    return NextResponse.json({ ok: false, error: "Motivo no válido" }, { status: 400 });
  }

  // 1 · Guardar SIEMPRE en Supabase primero. Es la fuente de verdad: si GHL
  //     falla, la respuesta del paciente no se pierde y queda para reintentar.
  let guardado = false;
  try {
    const { error } = await supabaseAdmin()
      .from("resenas")
      .insert({
        ghl_contact_id: contactId || null,
        nombre: nombre || null,
        puntuacion: rating,
        motivo: motivo || null,
        detalle: detalle || null,
        enviado_ghl: false,
      });
    guardado = !error;
    if (error) console.error("[experiencia] Supabase:", error.message);
  } catch (e) {
    console.error("[experiencia] Supabase:", e);
  }

  // 2 · Empujar a GHL. Best-effort: si no hay credenciales o falla, la fila
  //     queda con enviado_ghl = false y se reintenta desde el CRM.
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (token && locationId && contactId) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const base = "https://services.leadconnectorhq.com";

      const campos = [
        { id: CF.puntuacion, value: String(rating ?? "") },
        { id: CF.motivo, value: motivo },
        { id: CF.detalle, value: detalle },
        { id: CF.canal, value: "web" },
      ].filter((c) => c.value !== "");

      const rCampos = await fetch(`${base}/contacts/${contactId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ customFields: campos }),
      });

      // El tag es lo que dispara el workflow "Resenas 02 - Feedback interno".
      const rTag = await fetch(`${base}/contacts/${contactId}/tags`, {
        method: "POST",
        headers,
        body: JSON.stringify({ tags: ["feedback interno"] }),
      });

      if (rCampos.ok && rTag.ok && guardado) {
        await supabaseAdmin()
          .from("resenas")
          .update({ enviado_ghl: true })
          .eq("ghl_contact_id", contactId)
          .order("creado_el", { ascending: false })
          .limit(1);
      }
      if (!rCampos.ok || !rTag.ok) {
        console.error("[experiencia] GHL:", rCampos.status, rTag.status);
      }
    } catch (e) {
      console.error("[experiencia] GHL:", e);
    }
  }

  // Al paciente le respondemos OK si su respuesta quedó guardada en algún lado.
  return NextResponse.json({ ok: guardado }, { status: guardado ? 200 : 500 });
}
