import { createBrowserClient } from "@supabase/ssr";

// Cliente para el browser (login, logout en componentes cliente).
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
