// Cliente mínimo de GoHighLevel (LeadConnector) para el CRM de campañas.
// Solo lectura. Las credenciales van por env — nunca hardcodeadas.

const BASE = "https://services.leadconnectorhq.com";

export type ContactoGHL = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  rut: string | null;
  tags: string[];
  dateAdded: string | null;
  // Se usa como proxy de "cuándo respondió": es cuando se le agregó el tag
  // de interesado (o cualquier otro cambio), no una fecha específica de
  // ese tag — GHL no expone eso por contacto.
  dateUpdated: string | null;
  dentalinkPacienteId: number | null;
};

// Custom field de GHL que guarda el id del paciente en Dentalink.
const CAMPO_DENTALINK_ID = process.env.GHL_CAMPO_DENTALINK_ID ?? "BxC3NTfTW3XWgcELLj9t";
// Custom field de GHL que guarda el RUT del contacto.
const CAMPO_RUT = process.env.GHL_CAMPO_RUT ?? "NrPfWuO3fCKKTlD1ZrEI";

function credenciales() {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    throw new Error(
      "Faltan GHL_API_TOKEN y/o GHL_LOCATION_ID en las variables de entorno.",
    );
  }
  return { token, locationId };
}

type RespuestaBusqueda = {
  contacts?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    tags?: string[];
    dateAdded?: string | null;
    dateUpdated?: string | null;
    customFields?: { id?: string; value?: unknown }[];
  }[];
  total?: number;
};

async function buscar(tag: string, pageLimit: number, page: number): Promise<RespuestaBusqueda> {
  const { token, locationId } = credenciales();
  const res = await fetch(`${BASE}/contacts/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      locationId,
      page,
      pageLimit,
      filters: [{ field: "tags", operator: "eq", value: tag }],
    }),
    // La campaña no cambia minuto a minuto; 5 min de caché evita castigar la API.
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`GHL respondió ${res.status} buscando el tag "${tag}"`);
  }
  return (await res.json()) as RespuestaBusqueda;
}

/** Cuántos contactos tienen el tag (sin traerlos). */
export async function contarPorTag(tag: string): Promise<number> {
  const d = await buscar(tag, 1, 1);
  return d.total ?? 0;
}

/** Trae los contactos con un tag (hasta `maximo`). */
export async function contactosPorTag(tag: string, maximo = 500): Promise<ContactoGHL[]> {
  const salida: ContactoGHL[] = [];
  let page = 1;

  while (salida.length < maximo) {
    const d = await buscar(tag, Math.min(100, maximo - salida.length), page);
    const lote = d.contacts ?? [];
    if (lote.length === 0) break;

    for (const c of lote) {
      const campos = c.customFields ?? [];
      const campoDentalink = campos.find((f) => f.id === CAMPO_DENTALINK_ID);
      const valor = campoDentalink?.value;
      const dentalinkId = valor ? Number(String(valor)) : NaN;
      const campoRut = campos.find((f) => f.id === CAMPO_RUT);
      const rut = campoRut?.value ? String(campoRut.value).trim() : "";

      salida.push({
        id: c.id,
        firstName: c.firstName ?? null,
        lastName: c.lastName ?? null,
        email: c.email ?? null,
        phone: c.phone ?? null,
        rut: rut || null,
        tags: c.tags ?? [],
        dateAdded: c.dateAdded ?? null,
        dateUpdated: c.dateUpdated ?? null,
        dentalinkPacienteId: Number.isFinite(dentalinkId) ? dentalinkId : null,
      });
    }

    if (lote.length < 100) break;
    page += 1;
  }

  return salida;
}
