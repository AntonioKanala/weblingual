import { createClient } from "@supabase/supabase-js";

// Cliente con service_role: SOLO en servidor (Server Components, Server Actions,
// Route Handlers). Bypassea RLS — nunca exponer esta key al browser.
//
// Se crea de forma PEREZOSA (no a nivel de módulo) para que el `next build`
// no intente instanciarlo durante "Collecting page data", cuando las env vars
// pueden no estar disponibles. El tipo se infiere desde crearAdmin() para no
// usar ReturnType<typeof createClient> (que rompe el tipado de .insert()).
function crearAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

let client: ReturnType<typeof crearAdmin> | null = null;

export function supabaseAdmin() {
  if (!client) client = crearAdmin();
  return client;
}
