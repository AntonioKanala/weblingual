import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Ids de los custom fields de GHL (creados por API el 27-ago-2026).
// motivo/detalle ya no se piden en el formulario (se reemplazaron por
// nombre + rut), pero sus ids quedan documentados por si el campo sigue
// visible en la ficha del contacto en GHL.
const CF = {
  puntuacion: "v3IW0gHwvg1IP9RSiof0",
  canal: "tibGGWX9A27zEu0ljnUn",
} as const;

// Mismo formato que valida el formulario (con o sin puntos), sin dígito
// verificador: es defensa en profundidad, no la única validación.
const RUT_REGEX = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/;

// Tag que se agrega a TODOS los que envían el formulario (1 a 5 estrellas):
// es lo que los deja participando en el sorteo de higiene + blanqueamiento
// de septiembre 2026.
const TAG_SORTEO = "sorteo higiene blanqueamiento sept 26";
// Dispara el workflow "Resenas 02 - Feedback interno" (ratings 1 a 4).
const TAG_FEEDBACK_INTERNO = "feedback interno";
// Tags de 5 estrellas. Ya existen en la cuenta de GHL, se reutilizan tal cual.
const TAG_RESENA_5 = "resena 5";
const TAG_DEJO_RESENA = "dejó reseña";

type Cuerpo = {
  rating?: unknown;
  contactId?: unknown;
  nombre?: unknown;
  rut?: unknown;
};

function texto(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let cuerpo: Cuerpo;
  try {
    cuerpo = (await req.json()) as Cuerpo;
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido" },
      { status: 400 },
    );
  }

  const rating =
    typeof cuerpo.rating === "number" &&
    cuerpo.rating >= 1 &&
    cuerpo.rating <= 5
      ? Math.trunc(cuerpo.rating)
      : null;
  const nombre = texto(cuerpo.nombre, 120);
  const rut = texto(cuerpo.rut, 20);
  const contactId = texto(cuerpo.contactId, 60);

  if (!rating) {
    return NextResponse.json(
      { ok: false, error: "Calificación inválida" },
      { status: 400 },
    );
  }
  if (!nombre) {
    return NextResponse.json(
      { ok: false, error: "Falta el nombre" },
      { status: 400 },
    );
  }
  if (!RUT_REGEX.test(rut)) {
    return NextResponse.json(
      { ok: false, error: "RUT inválido" },
      { status: 400 },
    );
  }

  // 1 · Guardar SIEMPRE en Supabase primero. Es la fuente de verdad: si GHL
  //     falla, la respuesta del paciente no se pierde y queda para reintentar.
  let guardado = false;
  try {
    const { error } = await supabaseAdmin()
      .from("resenas")
      .insert({
        ghl_contact_id: contactId || null,
        nombre,
        puntuacion: rating,
        rut,
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

      // rut no tiene custom field propio en GHL todavía: queda solo en
      // Supabase (no se inventa un custom field nuevo por código).
      const campos = [
        { id: CF.puntuacion, value: String(rating) },
        { id: CF.canal, value: "web" },
      ];

      const tags = [TAG_SORTEO];
      if (rating <= 4) tags.push(TAG_FEEDBACK_INTERNO);
      if (rating === 5) tags.push(TAG_RESENA_5, TAG_DEJO_RESENA);

      const rCampos = await fetch(`${base}/contacts/${contactId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ customFields: campos }),
      });

      const rTag = await fetch(`${base}/contacts/${contactId}/tags`, {
        method: "POST",
        headers,
        body: JSON.stringify({ tags }),
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
