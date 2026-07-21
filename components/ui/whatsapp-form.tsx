"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

type WhatsAppFormProps = {
  /** Número en formato internacional sin "+", ej: "56954127979" */
  phone: string;
  /** Etiqueta de origen que se incluye en el mensaje, ej: "Landing Ortodoncia Invisible" */
  source?: string;
};

const motivos = [
  "Quiero alinear mis dientes",
  "Tengo un problema de mordida",
  "Quiero mejorar la estética de mi sonrisa",
  "Aún no lo sé, quiero una evaluación",
];

export const WhatsAppForm = ({ phone, source }: WhatsAppFormProps) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [motivo, setMotivo] = useState(motivos[0]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) {
      setError(true);
      return;
    }
    setError(false);
    const lines = [
      "Hola, quiero agendar mi evaluación de ortodoncia invisible.",
      "",
      `Nombre: ${nombre.trim()}`,
      `Teléfono: ${telefono.trim()}`,
      `Motivo: ${motivo}`,
    ];
    if (mensaje.trim()) lines.push(`Mensaje: ${mensaje.trim()}`);
    if (source) lines.push("", `(Desde: ${source})`);
    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener",
    );
  };

  const inputClass =
    "w-full rounded-xl border border-text-light/15 bg-white px-4 py-3 text-sm text-text-light placeholder:text-text-muted/60 focus:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="wf-nombre"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-light"
          >
            Nombre *
          </label>
          <input
            id="wf-nombre"
            type="text"
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="wf-telefono"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-light"
          >
            Teléfono *
          </label>
          <input
            id="wf-telefono"
            type="tel"
            autoComplete="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="+56 9 ..."
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="wf-motivo"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-light"
        >
          ¿Qué te gustaría mejorar?
        </label>
        <select
          id="wf-motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className={inputClass}
        >
          {motivos.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="wf-mensaje"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-light"
        >
          Cuéntanos algo más <span className="font-normal normal-case text-text-muted">(opcional)</span>
        </label>
        <textarea
          id="wf-mensaje"
          rows={3}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Ej: hace años quiero corregir mi mordida..."
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600" role="alert">
          Completa tu nombre y teléfono para que podamos responderte.
        </p>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gold px-8 py-4 text-sm font-semibold text-background-dark shadow-xl transition-all hover:scale-[1.01] hover:shadow-accent-gold/30"
      >
        <MessageCircle className="h-4 w-4" />
        Enviar por WhatsApp
      </button>
      <p className="text-center text-xs text-text-muted">
        Se abre WhatsApp con tu mensaje listo — respondemos en horario hábil.
      </p>
    </form>
  );
};
