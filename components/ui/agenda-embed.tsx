"use client";

import { trackEvent } from "@/lib/analytics";
import { CalendarDays, Lock } from "lucide-react";
import Script from "next/script";
import { useEffect, useState } from "react";

const WIDGET_SRC =
  "https://link.canala-studio.com/widget/booking/5m1hsxhm7R3E5aEH5C97";
const WIDGET_SCRIPT = "https://link.canala-studio.com/js/form_embed.js";
const CLAVE_RECORDAR = "agenda-abierta";

/**
 * La agenda de GoHighLevel es un tercero: al cargarla, el proveedor recibe la
 * IP y datos del navegador (y trae Google Fonts y unpkg con ella). Por la Ley
 * 21.719 no se carga sola: se muestra una fachada y el iframe se crea recién
 * cuando la persona pulsa «Ver horarios disponibles». Si ya la abrió antes en
 * este navegador, se carga directo para no pedirle el mismo clic dos veces.
 */
export const AgendaEmbed = () => {
  const [abierta, setAbierta] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(CLAVE_RECORDAR) === "1") setAbierta(true);
    } catch {
      // Sin almacenamiento (modo privado): se muestra la fachada y listo.
    }
  }, []);

  const abrir = () => {
    setAbierta(true);
    trackEvent("agenda_open");
    try {
      window.localStorage.setItem(CLAVE_RECORDAR, "1");
    } catch {
      // Sin almacenamiento: la próxima vez vuelve a pedir el clic.
    }
  };

  if (abierta) {
    return (
      <div className="min-h-[750px] overflow-hidden rounded-2xl border border-text-light/10 bg-white shadow-xl">
        <iframe
          src={WIDGET_SRC}
          style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "750px" }}
          scrolling="no"
          id="OCEdH6prfEDBCI7unTk7_1784592578264"
          title="Agenda tu evaluación inicial"
        />
        <Script src={WIDGET_SCRIPT} strategy="afterInteractive" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-text-light/10 bg-white px-6 py-12 text-center shadow-xl sm:px-12">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-gold/10">
        <CalendarDays className="h-7 w-7 text-accent-gold-dark" />
      </div>
      <div>
        <p className="font-display text-2xl font-bold text-text-light">
          Elige el día y la hora de tu evaluación
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Evaluación inicial gratuita · Las Condes · toma menos de un minuto
        </p>
      </div>
      <button
        type="button"
        onClick={abrir}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gold px-8 py-4 text-base font-semibold text-background-dark shadow-lg transition-all hover:scale-[1.02] hover:shadow-accent-gold/30 sm:w-auto"
      >
        <CalendarDays className="h-5 w-5" />
        Ver horarios disponibles
      </button>
      <p className="flex max-w-md items-start gap-2 text-left text-xs leading-relaxed text-text-muted">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          La agenda la entrega nuestro sistema de reservas, de un proveedor
          externo (LeadConnector). Al abrirla, ese proveedor recibe datos de tu
          visita; lo que ingreses se usa solo para coordinar tu evaluación,
          según nuestra{" "}
          <a href="/privacidad" className="underline hover:text-accent-gold-dark">
            política de privacidad
          </a>
          .
        </span>
      </p>
    </div>
  );
};
