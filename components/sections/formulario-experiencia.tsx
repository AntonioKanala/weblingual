"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CONTACT } from "@/lib/constants";
import { TarjetaExperiencia } from "./tarjeta-experiencia";

const MOTIVOS = [
  "La atención o el trato",
  "Los tiempos de espera",
  "El resultado del tratamiento",
  "El precio o la forma de pago",
  "La comunicación: respuestas, recordatorios, agenda",
  "Otra cosa",
] as const;

type Estado = "form" | "enviando" | "listo" | "error";

/**
 * Formulario al que llegan las estrellas 1 a 4 del correo. Quien marcó 5 va a
 * /tu-experiencia/gracias, que es otra página: el paciente ya eligió en el
 * correo y no tiene sentido volver a preguntárselo.
 */
export function FormularioExperiencia() {
  const params = useSearchParams();
  const ratingRaw = Number.parseInt(params.get("rating") ?? "", 10);
  const rating =
    Number.isFinite(ratingRaw) && ratingRaw >= 1 && ratingRaw <= 4
      ? ratingRaw
      : null;
  const contactId = params.get("c");
  const nombre = (params.get("nombre") ?? "").trim();

  const [motivo, setMotivo] = useState<string>(MOTIVOS[0]);
  const [detalle, setDetalle] = useState("");
  const [estado, setEstado] = useState<Estado>("form");

  if (estado === "listo") {
    return (
      <TarjetaExperiencia eyebrow="Recibido" titulo="Gracias, de verdad.">
        <p className="text-lg text-neutral-800">
          Tu respuesta ya llegó a la clínica.
        </p>
        <p className="mt-4 text-neutral-600">
          Esto es lo que nos permite ir ajustando cómo atendemos. Se agradece el
          minuto.
        </p>
      </TarjetaExperiencia>
    );
  }

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("enviando");
    try {
      const res = await fetch("/api/experiencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, contactId, nombre, motivo, detalle }),
      });
      setEstado(res.ok ? "listo" : "error");
    } catch {
      setEstado("error");
    }
  };

  return (
    <TarjetaExperiencia eyebrow="Tu opinión" titulo="Gracias por decírnoslo.">
      {rating !== null && (
        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-gold/15 px-4 py-2 font-body text-sm font-semibold text-[#B08D4F]">
          <span className="tracking-widest">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </span>
          <span>{rating} de 5</span>
        </p>
      )}

      <p className="text-lg text-neutral-800">
        Cuéntanos en qué podemos mejorar. Lo lee una persona del equipo, no un
        robot, y es lo que nos permite dar mejor atención a los pacientes que
        vienen después.
      </p>

      <form onSubmit={enviar} className="mt-8 flex flex-col gap-7">
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 font-display text-lg font-semibold text-neutral-900">
            ¿En qué podemos mejorar?
          </legend>
          {MOTIVOS.map((m) => (
            <label
              key={m}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                motivo === m
                  ? "border-[#1A6B4F] bg-accent-gold/10"
                  : "border-neutral-200 hover:border-accent-gold"
              }`}
            >
              <input
                type="radio"
                name="motivo"
                value={m}
                checked={motivo === m}
                onChange={() => setMotivo(m)}
                className="h-4 w-4 accent-[#1A6B4F]"
              />
              <span className="text-neutral-800">{m}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 font-display text-lg font-semibold text-neutral-900">
            Cuéntanos con tus palabras
          </legend>
          <textarea
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            rows={5}
            placeholder="Lo que quieras contarnos. Mientras más concreto, más nos sirve."
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1A6B4F]"
          />
        </fieldset>

        {estado === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            No pudimos enviar tu respuesta. Inténtalo otra vez, o escríbenos por
            WhatsApp al {CONTACT.phone}.
          </p>
        )}

        <button
          type="submit"
          disabled={estado === "enviando"}
          className="w-full rounded-xl bg-[#1A6B4F] px-6 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-[#155941] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A6B4F]"
        >
          {estado === "enviando" ? "Enviando…" : "Enviar"}
        </button>
      </form>
    </TarjetaExperiencia>
  );
}
