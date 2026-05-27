import Link from "next/link";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { InternoHeader } from "@/components/interno/InternoHeader";
import { getAgendaDelDia } from "@/lib/interno/data";
import {
  normalizarFecha,
  fechaLegible,
  hoyEnSantiago,
  sumarDias,
} from "@/lib/interno/fecha";

export const dynamic = "force-dynamic";

function estadoBadge(estado: string | null): string {
  const e = (estado ?? "").toLowerCase();
  if (e.includes("atend") || e.includes("asist") || e.includes("confirm"))
    return "bg-emerald-50 text-emerald-700";
  if (e.includes("anul") || e.includes("no asiste") || e.includes("no responde"))
    return "bg-red-50 text-red-700";
  return "bg-zinc-100 text-zinc-600";
}

function hhmm(hora: string | null): string {
  return hora ? hora.slice(0, 5) : "--:--";
}

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ fecha?: string }>;
}) {
  const { fecha: fechaParam } = await searchParams;
  const fecha = normalizarFecha(fechaParam);
  const citas = await getAgendaDelDia(fecha);
  const esHoy = fecha === hoyEnSantiago();
  const pendientes = citas.filter((c) => !c.evaluada).length;

  return (
    <>
      <InternoHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold capitalize text-[#1A1A1A]">
              {fechaLegible(fecha)}
            </h1>
            <p className="mt-1 text-sm text-[#6B6B6B]">
              {citas.length} cita{citas.length === 1 ? "" : "s"} · {pendientes} sin evaluar
              {esHoy && " · hoy"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/interno/agenda?fecha=${sumarDias(fecha, -1)}`}
              className="rounded-lg border border-black/10 bg-white p-2 hover:bg-black/[0.03]"
              aria-label="Día anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <form action="/interno/agenda" className="flex items-center gap-2">
              <input
                type="date"
                name="fecha"
                defaultValue={fecha}
                className="rounded-lg border border-black/15 px-3 py-1.5 text-sm outline-none focus:border-[#C9A96E]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#1A1A1A] px-3 py-1.5 text-sm font-medium text-white hover:bg-black"
              >
                Ver
              </button>
            </form>
            <Link
              href={`/interno/agenda?fecha=${sumarDias(fecha, 1)}`}
              className="rounded-lg border border-black/10 bg-white p-2 hover:bg-black/[0.03]"
              aria-label="Día siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {citas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-16 text-center text-[#6B6B6B]">
            No hay citas agendadas para este día.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-black/10 bg-black/[0.02] text-left text-xs uppercase tracking-wider text-[#6B6B6B]">
                <tr>
                  <th className="px-4 py-3 font-medium">Hora</th>
                  <th className="px-4 py-3 font-medium">Paciente</th>
                  <th className="px-4 py-3 font-medium">Tratamiento</th>
                  <th className="px-4 py-3 font-medium">Profesional</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 text-right font-medium">Ficha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {citas.map((c) => (
                  <tr key={c.id} className="hover:bg-black/[0.015]">
                    <td className="whitespace-nowrap px-4 py-3 font-medium tabular-nums">
                      {hhmm(c.hora_inicio)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#1A1A1A]">{c.nombre_paciente ?? "—"}</div>
                      {c.paciente?.celular || c.paciente?.telefono ? (
                        <div className="text-xs text-[#6B6B6B]">
                          {c.paciente?.celular ?? c.paciente?.telefono}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-[#6B6B6B]">{c.nombre_tratamiento ?? "—"}</td>
                    <td className="px-4 py-3 text-[#6B6B6B]">{c.nombre_dentista ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${estadoBadge(
                          c.estado_cita,
                        )}`}
                      >
                        {c.estado_cita ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {c.evaluada ? (
                        <Link
                          href={`/interno/agenda/${c.id}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline"
                        >
                          <Check className="h-4 w-4" /> Evaluada
                        </Link>
                      ) : (
                        <Link
                          href={`/interno/agenda/${c.id}`}
                          className="inline-block rounded-lg bg-[#C9A96E] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#b8965a]"
                        >
                          Evaluar
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
