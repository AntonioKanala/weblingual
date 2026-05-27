import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InternoHeader } from "@/components/interno/InternoHeader";
import { EvaluacionForm } from "@/components/interno/EvaluacionForm";
import { getCitaDetalle } from "@/lib/interno/data";

export const dynamic = "force-dynamic";

export default async function CitaPage({
  params,
}: {
  params: Promise<{ citaId: string }>;
}) {
  const { citaId } = await params;
  const id = Number(citaId);
  if (!Number.isFinite(id)) notFound();

  const detalle = await getCitaDetalle(id);
  if (!detalle) notFound();

  const { cita, paciente, evaluacion } = detalle;
  const telefono = paciente?.celular ?? paciente?.telefono ?? null;

  return (
    <>
      <InternoHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/interno/agenda"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a la agenda
        </Link>

        <div className="mb-6 rounded-2xl border border-black/10 bg-white p-6">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">
            {cita.nombre_paciente ?? "Paciente"}
          </h1>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#6B6B6B] sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wider">RUT</dt>
              <dd className="text-[#1A1A1A]">{paciente?.rut ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider">Teléfono</dt>
              <dd className="text-[#1A1A1A]">{telefono ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider">Email</dt>
              <dd className="truncate text-[#1A1A1A]">{paciente?.email ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider">Tratamiento</dt>
              <dd className="text-[#1A1A1A]">{cita.nombre_tratamiento ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider">Profesional</dt>
              <dd className="text-[#1A1A1A]">{cita.nombre_dentista ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider">Fecha cita</dt>
              <dd className="text-[#1A1A1A]">{cita.fecha ?? "—"}</dd>
            </div>
          </dl>
        </div>

        <EvaluacionForm
          citaId={cita.id}
          pacienteId={cita.id_paciente}
          nombrePaciente={cita.nombre_paciente}
          rut={paciente?.rut ?? null}
          telefono={telefono}
          email={paciente?.email ?? null}
          previa={evaluacion}
        />
      </main>
    </>
  );
}
