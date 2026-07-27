import Link from "next/link";

const PESTANAS = [
  { href: "/interno/agenda", etiqueta: "Agenda del día" },
  { href: "/interno/crm/no-iniciaron", etiqueta: "Asistió y no inició" },
  { href: "/interno/crm/campana", etiqueta: "Campañas" },
];

export function CrmNav({ activa }: { activa: string }) {
  return (
    <nav className="mb-6 flex flex-wrap gap-1 border-b border-black/10">
      {PESTANAS.map((p) => {
        const esActiva = activa.startsWith(p.href);
        return (
          <Link
            key={p.href}
            href={p.href}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition ${
              esActiva
                ? "border-[#C9A96E] text-[#1A1A1A]"
                : "border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]"
            }`}
          >
            {p.etiqueta}
          </Link>
        );
      })}
    </nav>
  );
}

export function Tarjeta({
  etiqueta,
  valor,
  detalle,
  acento,
}: {
  etiqueta: string;
  valor: string | number;
  detalle?: string;
  acento?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        acento ? "border-[#C9A96E]/40 bg-[#C9A96E]/10" : "border-black/10 bg-white"
      }`}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B6B6B]">
        {etiqueta}
      </div>
      <div className="mt-1 text-2xl font-semibold tabular-nums text-[#1A1A1A]">{valor}</div>
      {detalle && <div className="mt-0.5 text-xs text-[#6B6B6B]">{detalle}</div>}
    </div>
  );
}
