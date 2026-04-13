"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";
import { Check, Minus, X } from "lucide-react";

interface ComparisonRow {
  feature: string;
  lingual: "yes" | "partial" | "no";
  alineadores: "yes" | "partial" | "no";
  tradicional: "yes" | "partial" | "no";
  lingualNote?: string;
  alineadoresNote?: string;
  tradicionalNote?: string;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "100% Invisible",
    lingual: "yes",
    alineadores: "partial",
    tradicional: "no",
    alineadoresNote: "Ataches visibles",
  },
  {
    feature: "Casos complejos",
    lingual: "yes",
    alineadores: "no",
    tradicional: "yes",
    alineadoresNote: "Solo leves/moderados",
  },
  {
    feature: "Rotación de caninos",
    lingual: "yes",
    alineadores: "no",
    tradicional: "yes",
    lingualNote: "Control total",
    alineadoresNote: "Requiere aparatología extra",
  },
  {
    feature: "Cierre de extracciones",
    lingual: "yes",
    alineadores: "no",
    tradicional: "yes",
    lingualNote: "Control radicular autónomo",
    alineadoresNote: "Requiere aditamentos",
  },
  {
    feature: "Activo 24/7",
    lingual: "yes",
    alineadores: "no",
    tradicional: "yes",
    alineadoresNote: "Depende del paciente",
  },
  {
    feature: "No daña esmalte frontal",
    lingual: "yes",
    alineadores: "partial",
    tradicional: "no",
    alineadoresNote: "Ataches lo afectan",
  },
  {
    feature: "Control de torque radicular",
    lingual: "yes",
    alineadores: "partial",
    tradicional: "partial",
    lingualNote: "Máximo control",
    alineadoresNote: "Parcial",
    tradicionalNote: "Parcial",
  },
];

const StatusIcon = ({ status }: { status: "yes" | "partial" | "no" }) => {
  if (status === "yes")
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-gold/20 sm:h-9 sm:w-9">
        <Check className="h-4 w-4 text-accent-gold sm:h-5 sm:w-5" />
      </div>
    );
  if (status === "partial")
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-text-muted/10 sm:h-9 sm:w-9">
        <Minus className="h-4 w-4 text-text-muted sm:h-5 sm:w-5" />
      </div>
    );
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 sm:h-9 sm:w-9">
      <X className="h-4 w-4 text-red-400 sm:h-5 sm:w-5" />
    </div>
  );
};

const StatusCell = ({
  status,
  note,
  isGold,
}: {
  status: "yes" | "partial" | "no";
  note?: string;
  isGold?: boolean;
}) => (
  <div className="flex flex-col items-center gap-1">
    <StatusIcon status={status} />
    {note && (
      <span
        className={cn(
          "text-center text-[9px] leading-tight sm:text-[10px]",
          isGold ? "text-accent-gold/80" : "text-text-muted/60"
        )}
      >
        {note}
      </span>
    )}
  </div>
);

export const ComparisonTable = () => {
  return (
    <section className="bg-background-light py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
            Comparativa clínica
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold text-text-light md:text-4xl lg:text-5xl">
            Ortodoncia Lingual vs. las alternativas
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-muted">
            Datos basados en literatura científica y experiencia clínica de más de 5,000 tratamientos.
          </p>
        </FadeIn>

        {/* Desktop Table (hidden on mobile) */}
        <FadeIn delay={0.2}>
          <div className="mt-12 hidden sm:block lg:mt-16">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-text-light/10">
                  <th className="pb-5 pr-8 text-left text-sm font-medium text-text-muted">
                    Característica
                  </th>
                  <th className="pb-5 text-center">
                    <span className="rounded-full bg-accent-gold/10 px-4 py-1.5 text-sm font-bold text-accent-gold">
                      Lingual
                    </span>
                  </th>
                  <th className="pb-5 text-center">
                    <span className="rounded-full bg-text-muted/10 px-4 py-1.5 text-sm font-medium text-text-muted">
                      Alineadores
                    </span>
                  </th>
                  <th className="pb-5 text-center">
                    <span className="rounded-full bg-text-muted/10 px-4 py-1.5 text-sm font-medium text-text-muted">
                      Tradicional
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "group border-b border-text-light/5 transition-all duration-300 hover:bg-white hover:shadow-md",
                      i === comparisonData.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="py-5 pr-8 text-sm font-semibold text-text-light">
                      {row.feature}
                    </td>
                    <td className="py-5 text-center">
                      <StatusCell status={row.lingual} note={row.lingualNote} isGold />
                    </td>
                    <td className="py-5 text-center">
                      <StatusCell status={row.alineadores} note={row.alineadoresNote} />
                    </td>
                    <td className="py-5 text-center">
                      <StatusCell status={row.tradicional} note={row.tradicionalNote} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Mobile Cards (visible only on mobile) */}
        <FadeIn delay={0.2}>
          <div className="mt-12 sm:hidden">
            {/* Sticky column legend */}
            <div className="sticky top-[72px] z-10 -mx-6 border-b border-text-light/10 bg-background-light/95 px-6 py-3 backdrop-blur-md">
              <div className="grid grid-cols-[1fr_1fr_1fr] gap-1">
                <div className="flex flex-col items-center">
                  <span className="rounded-full bg-accent-gold/10 px-3 py-1 text-[11px] font-bold text-accent-gold">
                    Lingual
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="rounded-full bg-text-muted/10 px-3 py-1 text-[11px] font-medium text-text-muted">
                    Alineadores
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="rounded-full bg-text-muted/10 px-3 py-1 text-[11px] font-medium text-text-muted">
                    Tradicional
                  </span>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="divide-y divide-text-light/5">
              {comparisonData.map((row) => (
                <div key={row.feature} className="py-5">
                  <p className="mb-4 text-center text-[13px] font-bold text-text-light">
                    {row.feature}
                  </p>
                  <div className="grid grid-cols-[1fr_1fr_1fr] gap-1">
                    <StatusCell status={row.lingual} note={row.lingualNote} isGold />
                    <StatusCell status={row.alineadores} note={row.alineadoresNote} />
                    <StatusCell status={row.tradicional} note={row.tradicionalNote} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Bottom note */}
        <FadeIn delay={0.3}>
          <p className="mt-8 text-xs text-text-muted/60">
            Fuente: Datos basados en literatura científica publicada y experiencia clínica de más de 5,000 tratamientos.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
