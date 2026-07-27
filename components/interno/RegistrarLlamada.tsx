"use client";

import { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import {
  registrarLlamada,
  RESULTADOS_LLAMADA,
  type RegistroLlamada,
} from "@/app/interno/crm/actions";

// Formulario compacto para anotar el resultado de una llamada sin salir de la lista.
// Se abre con <details> para no depender de una librería de popovers.
export function RegistrarLlamada({ base }: { base: Omit<RegistroLlamada, "resultado" | "notas"> }) {
  const [abierto, setAbierto] = useState(false);
  const [resultado, setResultado] = useState<string>(RESULTADOS_LLAMADA[0]);
  const [notas, setNotas] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);
  const [pendiente, iniciar] = useTransition();

  function guardar() {
    setError(null);
    iniciar(async () => {
      const r = await registrarLlamada({ ...base, resultado, notas });
      if (r.ok) {
        setListo(true);
        setAbierto(false);
        setNotas("");
      } else {
        setError(r.error);
      }
    });
  }

  if (listo) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
        <Check className="h-3.5 w-3.5" /> Anotado
      </span>
    );
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="rounded-lg border border-black/15 bg-white px-2.5 py-1 text-xs font-medium text-[#1A1A1A] transition hover:bg-black/[0.03]"
      >
        Anotar
      </button>
    );
  }

  return (
    <div className="min-w-[210px] space-y-2 rounded-lg border border-black/10 bg-white p-2 shadow-sm">
      <select
        value={resultado}
        onChange={(e) => setResultado(e.target.value)}
        className="w-full rounded-md border border-black/15 px-2 py-1 text-xs outline-none focus:border-[#C9A96E]"
      >
        {RESULTADOS_LLAMADA.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <input
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
        placeholder="Nota (opcional)"
        className="w-full rounded-md border border-black/15 px-2 py-1 text-xs outline-none focus:border-[#C9A96E]"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={guardar}
          disabled={pendiente}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-[#1A1A1A] px-2 py-1 text-xs font-semibold text-white hover:bg-black disabled:opacity-60"
        >
          {pendiente && <Loader2 className="h-3 w-3 animate-spin" />} Guardar
        </button>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="rounded-md border border-black/15 px-2 py-1 text-xs text-[#6B6B6B] hover:bg-black/[0.03]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
