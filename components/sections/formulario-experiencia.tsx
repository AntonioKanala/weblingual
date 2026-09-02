"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CONTACT } from "@/lib/constants";
import { TarjetaExperiencia } from "./tarjeta-experiencia";
import { ExperienciaExito } from "./experiencia-exito";

type Estado = "form" | "enviando" | "listo" | "error";

// Formato de RUT chileno, con o sin puntos: 12.345.678-9 o 12345678-9.
// No valida dígito verificador (módulo 11): con el formato basta.
const RUT_REGEX = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/;

/**
 * Formulario al que llegan TODAS las estrellas del correo (1 a 5). Antes,
 * quien marcaba 5 saltaba directo a /tu-experiencia/gracias sin dejar datos;
 * ahora toda calificación pasa por acá para poder contactar al paciente y
 * para que quede participando del sorteo.
 */
export function FormularioExperiencia() {
  const params = useSearchParams();
  const ratingRaw = Number.parseInt(params.get("rating") ?? "", 10);
  const rating =
    Number.isFinite(ratingRaw) && ratingRaw >= 1 && ratingRaw <= 5
      ? ratingRaw
      : null;
  const contactId = params.get("c");
  const nombreInicial = (params.get("nombre") ?? "").trim();

  const [nombre, setNombre] = useState(nombreInicial);
  const [rut, setRut] = useState("");
  const [rutError, setRutError] = useState(false);
  const [estado, setEstado] = useState<Estado>("form");

  if (estado === "listo") {
    return <ExperienciaExito rating={rating} nombre={nombre} />;
  }

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    const rutLimpio = rut.trim();
    const rutValido = RUT_REGEX.test(rutLimpio);
    setRutError(!rutValido);
    if (!nombreLimpio || !rutValido) return;

    setEstado("enviando");
    try {
      const res = await fetch("/api/experiencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          contactId,
          nombre: nombreLimpio,
          rut: rutLimpio,
        }),
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
        Confírmanos tu nombre y RUT para dejar registrada tu opinión. Lo lee
        una persona del equipo, no un robot.
      </p>

      <div className="mt-6 rounded-xl border border-accent-green/30 bg-accent-green/10 px-4 py-3 text-sm text-accent-green">
        Al completar este formulario participas por el sorteo de una{" "}
        <strong>Higiene Dental + un Blanqueamiento</strong>. El sorteo cierra
        el <strong>30 de septiembre de 2026</strong> y avisamos a la persona
        ganadora por WhatsApp o teléfono.
      </div>

      <form onSubmit={enviar} className="mt-8 flex flex-col gap-6" noValidate>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="nombre"
            className="font-display text-lg font-semibold text-neutral-900"
          >
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1A6B4F]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="rut"
            className="font-display text-lg font-semibold text-neutral-900"
          >
            RUT
          </label>
          <input
            id="rut"
            name="rut"
            type="text"
            required
            inputMode="text"
            value={rut}
            onChange={(e) => {
              setRut(e.target.value);
              if (rutError) setRutError(false);
            }}
            placeholder="12.345.678-9"
            aria-invalid={rutError}
            aria-describedby={rutError ? "rut-error" : undefined}
            className={`w-full rounded-xl border px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1A6B4F] ${
              rutError ? "border-red-400" : "border-neutral-200"
            }`}
          />
          <p className="text-xs text-neutral-500">
            Lo usamos para identificarte si sales sorteada o sorteado.
          </p>
          {rutError && (
            <p id="rut-error" className="text-sm text-red-600">
              Revisa el formato del RUT, por ejemplo 12.345.678-9.
            </p>
          )}
        </div>

        {estado === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            No pudimos enviar tu respuesta. Inténtalo otra vez, o escríbenos
            por WhatsApp al {CONTACT.phone}.
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
