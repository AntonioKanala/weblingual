import { createClient } from "@supabase/supabase-js";

// Cliente con service_role: SOLO en servidor (Server Components, Server Actions,
// Route Handlers). Bypassea RLS — nunca exponer esta key al browser.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);
