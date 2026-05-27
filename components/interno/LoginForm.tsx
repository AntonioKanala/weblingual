"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError("Correo o contraseña incorrectos.");
        return;
      }
      router.push("/interno/agenda");
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
    >
      <div className="mb-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A96E]">
          Clínica Lingual
        </p>
        <h1 className="mt-1 text-xl font-semibold text-[#1A1A1A]">Panel interno</h1>
        <p className="mt-1 text-sm text-[#6B6B6B]">Ingresa con tu cuenta de la clínica</p>
      </div>

      <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">Correo</label>
      <input
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
      />

      <label className="mb-1 block text-sm font-medium text-[#1A1A1A]">Contraseña</label>
      <input
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-[#C9A96E]"
      />

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[#1A6B4F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#155a42] disabled:opacity-50"
      >
        {pending ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}
