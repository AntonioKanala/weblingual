import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin } from "lucide-react";

export interface LocationMapProps {
  compact?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

export const LocationMap = ({
  compact = false,
  theme = "light",
  className,
}: LocationMapProps) => {
  const isDark = theme === "dark";
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "overflow-hidden",
          compact ? "rounded-xl" : "rounded-2xl",
        )}
      >
        <iframe
          src={CONTACT.mapsEmbedSrc}
          width="100%"
          height={compact ? 200 : 380}
          style={{ border: 0, display: "block" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Clínica Lingual"
        />
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
        <span>Cómo llegar</span>
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
};
