"use client";

import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

export interface LocationMapProps {
  compact?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

/**
 * El mapa de Google no se carga solo: se muestra un aviso y el iframe se crea
 * recién cuando la persona pulsa «Cargar mapa».
 */
export const LocationMap = ({
  compact = false,
  theme = "light",
  className,
}: LocationMapProps) => {
  const isDark = theme === "dark";
  const [cargado, setCargado] = useState(false);
  const alto = compact ? 200 : 380;
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "overflow-hidden",
          compact ? "rounded-xl" : "rounded-2xl",
        )}
      >
        {cargado ? (
          <iframe
            src={CONTACT.mapsEmbedSrc}
            width="100%"
            height={alto}
            style={{ border: 0, display: "block" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Clínica Lingual"
          />
        ) : (
          <div
            style={{ height: alto }}
            className={cn(
              "flex flex-col items-center justify-center gap-3 px-5 text-center text-sm",
              isDark ? "bg-white/5 text-white/70" : "bg-[#f5f3f0] text-text-muted",
            )}
          >
            <MapPin className="h-5 w-5 text-accent-gold" />
            <p className="max-w-xs">
              El mapa lo entrega Google Maps. Al cargarlo, Google recibe datos
              de tu visita.
            </p>
            <button
              type="button"
              onClick={() => setCargado(true)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                isDark
                  ? "border-accent-gold/60 text-accent-gold hover:bg-accent-gold/10"
                  : "border-text-light/20 text-text-light hover:border-accent-gold hover:text-accent-gold",
              )}
            >
              Cargar mapa
            </button>
          </div>
        )}
      </div>
      <a
        href={CONTACT.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-3 inline-flex items-center gap-2 text-sm font-medium transition-colors",
          isDark
            ? "text-accent-gold hover:text-accent-gold-light"
            : "text-text-light hover:text-accent-gold",
        )}
      >
        <MapPin className="h-4 w-4" />
        <span>Abrir en Google Maps</span>
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
};
