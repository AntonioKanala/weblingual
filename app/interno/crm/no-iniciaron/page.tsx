import { InternoHeader } from "@/components/interno/InternoHeader";
import { CrmNav, Tarjeta } from "@/components/interno/CrmNav";
import { CeldaTelefono } from "@/components/interno/CeldaTelefono";
import { RegistrarLlamada } from "@/components/interno/RegistrarLlamada";
import { getNoIniciaron, contarAtendidos, resumir } from "@/lib/interno/crm";
import { hoyEnSantiago, normalizarFecha, sumarDias } from "@/lib/interno/fecha";

export const dynamic = "force-dynamic";

const MENSAJE_WA =
  "Hola! Te escribimos de Clínica Lingual 😊 Estuviste en tu evaluación con nosotros y queríamos saber si te quedó alguna duda sobre tu tratamiento.";

function pesos(monto: number): string {
  return `$${monto.toLocaleString("es-CL")}`;
}

function colorDias(dias: number): string {
  if (dias <= 7) return "bg-emerald-50 text-emerald-700";
  if (dias <= 30) return "bg-amber-50 text-amber-700";
  return "bg-zinc-100 text-zinc-600";
}

function colorResultado(resultado: string): string {
  if (resultado === "Agendó") return "bg-emerald-50 text-emerald-700";
  if (resultado === "No interesado" || resultado === "Número equivocado")
    return "bg-red-50 text-red-700";
  if (resultado === "Volver a llamar") return "bg-amber-50 text-amber-700";
  return "bg-zinc-100 text-zinc-600";
}

export default async function NoIniciaronPage({
  searchParams,
}: {
  searchParams: Promise<{ desde?: string; hasta?: string; solo?: string }>;
}) {
  const params = await searchParams;
  const hasta = normalizarFecha(params.hasta ?? hoyEnSantiago());
  const desde = normalizarFecha(params.desde ?? sumarDias(hasta, -60));
  const soloSinLlamar = params.solo === "sin-llamar";

  const [filasTodas, atendidos] = await Promise.all([
    getNoIniciaron(desde, hasta),
    contarAtendidos(desde, hasta),
  ]);

  const resumen = resumir(filasTodas, atendidos);
  const filas = soloSinLlamar ? filasTodas.filter((f) => f.vecesLlamado === 0) : filasTodas;
  const conversion = atendidos > 0 ? Math.round((resumen.iniciaron / atendidos) * 100) : 0;

  return (
    <>
      <InternoHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <CrmNav activa="/interno/crm/no-iniciaron" />

        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Asistió y no inició</h1>
            <p className="mt-1 text-sm text-[#6B6B6B]">
              Pacientes que vinieron a su evaluación y todavía no empiezan tratamiento. Ordenados
              del más reciente al más antiguo.
            </p>
          </div>

          <form action="/interno/crm/no-iniciaron" className="flex flex-wrap items-center gap-2">
            <input
              type="date"
              name="desde"
              defaultValue={desde}
              className="rounded-lg border border-black/15 px-3 py-1.5 text-sm outline-none focus:border-[#C9A96E]"
            />
            <span className="text-sm text-[#6B6B6B]">a</span>
            <input
              type="date"
              name="hasta"
              defaultValue={hasta}
              className="rounded-lg border border-black/15 px-3 py-1.5 text-sm outline-none focus:border-[#C9A96E]"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#1A1A1A] px-3 py-1.5 text-sm font-medium text-white hover:bg-black"
            >
              Ver
            </button>
          </form>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Tarjeta etiqueta="Asistieron" valor={resumen.atendidos} detalle="evaluaciones atendidas" />
          <Tarjeta etiqueta="Iniciaron" valor={resumen.iniciaron} detalle={`${conversion}% de conversión`} />
          <Tarjeta etiqueta="No iniciaron" valor={resumen.noIniciaron} detalle="para llamar" acento />
          <Tarjeta etiqueta="Sin llamar" valor={resumen.sinLlamar} detalle="nadie los ha contactado" />
          <Tarjeta
            etiqueta="En juego"
            valor={pesos(resumen.montoEnJuego)}
            detalle="suma de lo cotizado"
          />
        </div>

        <div className="mb-3 flex flex-wrap gap-2 text-sm">
          <a
            href={`/interno/crm/no-iniciaron?desde=${desde}&hasta=${hasta}`}
            className={`rounded-lg px-3 py-1.5 font-medium ${
              soloSinLlamar ? "text-[#6B6B6B] hover:text-[#1A1A1A]" : "bg-[#1A1A1A] text-white"
            }`}
          >
            Todos ({filasTodas.length})
          </a>
          <a
            href={`/interno/crm/no-iniciaron?desde=${desde}&hasta=${hasta}&solo=sin-llamar`}
            className={`rounded-lg px-3 py-1.5 font-medium ${
              soloSinLlamar ? "bg-[#1A1A1A] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
            }`}
          >
            Sin llamar ({resumen.sinLlamar})
          </a>
        </div>

        {filas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-16 text-center text-[#6B6B6B]">
            No hay pacientes pendientes en este rango.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-black/10 bg-black/[0.02] text-left text-xs uppercase tracking-wider text-[#6B6B6B]">
                <tr>
                  <th className="px-4 py-3 font-medium">Paciente</th>
                  <th className="px-4 py-3 font-medium">Teléfono</th>
                  <th className="px-4 py-3 font-medium">Evaluación</th>
                  <th className="px-4 py-3 font-medium">Cotizado</th>
                  <th className="px-4 py-3 font-medium">Contexto</th>
                  <th className="px-4 py-3 font-medium">Seguimiento</th>
                  <th className="px-4 py-3 text-right font-medium">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filas.map((f) => (
                  <tr key={f.citaId} className="align-top hover:bg-black/[0.015]">
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#1A1A1A]">{f.nombre}</div>
                      {f.rut && <div className="text-xs text-[#6B6B6B]">{f.rut}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <CeldaTelefono telefono={f.telefono} mensajeWhatsApp={MENSAJE_WA} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="tabular-nums text-[#1A1A1A]">{f.fechaEvaluacion}</div>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colorDias(
                          f.diasDesde,
                        )}`}
                      >
                        hace {f.diasDesde} día{f.diasDesde === 1 ? "" : "s"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {f.montoCotizado ? (
                        <>
                          <div className="font-medium tabular-nums text-[#1A1A1A]">
                            {pesos(f.montoCotizado)}
                          </div>
                          <div className="text-xs text-[#6B6B6B]">{f.tratamientoCotizado}</div>
                        </>
                      ) : (
                        <span className="text-xs text-[#6B6B6B]">Sin cotizar</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#6B6B6B]">
                      {f.objecion || f.nivelInteres || f.doctorEvaluador ? (
                        <div className="space-y-0.5">
                          {f.nivelInteres && <div>Interés: {f.nivelInteres}</div>}
                          {f.objecion && <div>Objeción: {f.objecion}</div>}
                          {f.doctorEvaluador && <div>Dr(a): {f.doctorEvaluador}</div>}
                          {f.notasDoctor && <div className="italic">“{f.notasDoctor}”</div>}
                        </div>
                      ) : (
                        <span className="text-[#B0B0B0]">Sin ficha</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {f.ultimaLlamada ? (
                        <>
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colorResultado(
                              f.ultimaLlamada.resultado,
                            )}`}
                          >
                            {f.ultimaLlamada.resultado}
                          </span>
                          <div className="mt-1 text-xs text-[#6B6B6B]">
                            {f.ultimaLlamada.llamado_at.slice(0, 10)}
                            {f.vecesLlamado > 1 && ` · ${f.vecesLlamado} intentos`}
                          </div>
                        </>
                      ) : (
                        <span className="text-xs text-[#B0B0B0]">Sin llamar</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end">
                        <RegistrarLlamada
                          base={{
                            origen: "no_iniciaron",
                            nombre: f.nombre,
                            telefono: f.telefono,
                            dentalinkCitaId: f.citaId,
                            dentalinkPacienteId: f.pacienteId,
                          }}
                        />
                      </div>
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
