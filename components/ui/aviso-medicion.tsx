"use client";

import { useCallback, useEffect, useState } from "react";
import { GA_LINKER_DOMAINS, GA_MEASUREMENT_ID } from "@/lib/analytics";

/**
 * Aviso de medición: Google Analytics solo se carga si la persona pulsa
 * «Aceptar». Antes de eso no se pide nada a googletagmanager.com.
 *
 * El stub `gtag()` del layout queda siempre definido (solo escribe en
 * `window.dataLayer`, sin red), así `trackEvent` nunca revienta; lo que se
 * bloquea es gtag.js y el `gtag('config')`.
 *
 * La decisión se guarda en localStorage con la misma clave que usan los
 * sitios estáticos (aviso-terceros.js). Cualquier elemento con
 * [data-aviso-reabrir] vuelve a mostrar el aviso.
 */

const CLAVE = "aviso-terceros-medicion";

declare global {
  interface Window {
    __gaActivo?: boolean;
    dataLayer?: unknown[];
  }
}

function leer(): string | null {
  try {
    return window.localStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

function guardar(valor: "si" | "no") {
  try {
    window.localStorage.setItem(CLAVE, valor);
  } catch {
    // Sin almacenamiento: se vuelve a preguntar en la próxima visita.
  }
}

function activarMedicion() {
  if (window.__gaActivo) return;
  window.__gaActivo = true;
  // El stub del layout es afterInteractive y puede llegar después de este
  // efecto: si aún no existe, se define igual (gtag.js exige `arguments`).
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    linker: { domains: GA_LINKER_DOMAINS },
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

export function AvisoMedicion() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const decision = leer();
    if (decision === "si") activarMedicion();
    else if (decision !== "no") setVisible(true);

    const reabrir = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-aviso-reabrir]");
      if (!el) return;
      e.preventDefault();
      try {
        window.localStorage.removeItem(CLAVE);
      } catch {
        // nada
      }
      setVisible(true);
    };
    document.addEventListener("click", reabrir);
    return () => document.removeEventListener("click", reabrir);
  }, []);

  const aceptar = useCallback(() => {
    guardar("si");
    setVisible(false);
    activarMedicion();
  }, []);

  const rechazar = useCallback(() => {
    guardar("no");
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de medición"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-2xl border border-text-light/10 bg-white p-5 text-sm leading-relaxed text-text-light shadow-2xl"
    >
      <p className="mb-4">
        Usamos Google Analytics para saber cuántas personas visitan este sitio.
        Solo se activa si lo aceptas.{" "}
        <a href="/privacidad" className="underline hover:text-accent-gold">
          Política de privacidad
        </a>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={aceptar}
          className="rounded-full bg-accent-gold px-5 py-2 font-semibold text-background-dark transition-colors hover:bg-accent-gold-light"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={rechazar}
          className="rounded-full border border-text-light/20 px-5 py-2 font-semibold text-text-light transition-colors hover:border-text-light/40"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
