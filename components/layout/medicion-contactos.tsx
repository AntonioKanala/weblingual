"use client";

import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

/**
 * Mide los clics de contacto de TODO el sitio con un solo listener delegado:
 * `tel:` (phone_click) y enlaces de WhatsApp (whatsapp_click). Antes solo el
 * botón flotante y el formulario disparaban eventos, así que GA4 marcaba 0
 * llamadas aunque el teléfono aparece en el footer y en cada landing.
 *
 * Los elementos que ya miden por su cuenta llevan `data-track-propio` y se
 * saltan para no contar doble. Si la persona no aceptó la medición, `gtag`
 * no existe y `trackEvent` no hace nada.
 */
export const MedicionContactos = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || a.closest("[data-track-propio]")) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { source: "enlace" });
      } else if (/wa\.me\/|api\.whatsapp\.com|wa\.link\//.test(href)) {
        trackEvent("whatsapp_click", { source: "enlace" });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
};
