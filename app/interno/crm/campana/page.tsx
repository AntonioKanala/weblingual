import Link from "next/link";
import { InternoHeader } from "@/components/interno/InternoHeader";
import { CrmNav, Tarjeta } from "@/components/interno/CrmNav";
import { CeldaTelefono } from "@/components/interno/CeldaTelefono";
import { RegistrarLlamada } from "@/components/interno/RegistrarLlamada";
import { CAMPANAS, getCampana } from "@/lib/interno/campana";

export const dynamic = "force-dynamic";

const MENSAJE_WA =
  "Hola! Te escribimos de Clínica Lingual 😊 Vimos que te interesó nuestra promoción y queríamos ayudarte a agendar tu evaluación.";

function porcentaje(parte: number, total: number): string {
  if (!total) return "0%";
  return `${Math.round((parte / total) * 100)}%`;
}

export default async function CampanaPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const campana = CAMPANAS.find((x) => x.slug === c) ?? CAMPANAS[0];

  let datos: Awaited<ReturnType<typeof getCampana>> | null = null;
  let error: string | null = null;
  try {
    datos = await getCampana(campana);
  } catch (e) {
    error = e instanceof Error ? e.message : "Error desconocido leyendo GHL";
  }

  return (
    <>
      <InternoHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <CrmNav activa="/interno/crm/campana" />

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Campaña · {campana.nombre}</h1>
          <p className="mt-1 text-sm text-[#6B6B6B]">
            Quienes respondieron que sí, cruzados con lo que realmente pasó en Dentalink.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {CAMPANAS.map((x) => (
            <Link
              key={x.slug}
              href={`/interno/crm/campana?c=${x.slug}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                x.slug === campana.slug
                  ? "bg-[#1A1A1A] text-white"
                  : "border border-black/15 bg-white text-[#6B6B6B] hover:text-[#1A1A1A]"
              }`}
            >
              {x.nombre}
            </Link>
          ))}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-sm text-red-700">
            <p className="font-medium">No se pudo leer GoHighLevel.</p>
            <p className="mt-1">{error}</p>
            <p className="mt-3 text-red-600">
              Revisa que <code>GHL_API_TOKEN</code> y <code>GHL_LOCATION_ID</code> estén
              configurados en las variables de entorno de Vercel.
            </p>
          </div>
        ) : datos ? (
          <>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <Tarjeta etiqueta="Enviados" valor={datos.embudo.enviados} detalle="audiencia total" />
              <Tarjeta
                etiqueta="Interesados"
                valor={datos.embudo.interesados}
                detalle={porcentaje(datos.embudo.interesados, datos.embudo.enviados)}
                acento
              />
              <Tarjeta
                etiqueta="Agendaron"
                valor={datos.embudo.agendaron}
                detalle={porcentaje(datos.embudo.agendaron, datos.embudo.interesados)}
              />
              <Tarjeta
                etiqueta="Asistieron"
                valor={datos.embudo.asistieron}
                detalle={porcentaje(datos.embudo.asistieron, datos.embudo.interesados)}
              />
              <Tarjeta
                etiqueta="Iniciaron"
                valor={datos.embudo.iniciaron}
                detalle={porcentaje(datos.embudo.iniciaron, datos.embudo.interesados)}
              />
            </div>

            {datos.embudo.descartados.length > 0 && (
              <div className="mb-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                <p>
                  Se apartaron <strong>{datos.embudo.descartados.length}</strong> contacto
                  {datos.embudo.descartados.length === 1 ? "" : "s"} que tienen el tag de interesado
                  pero también uno de rechazo. No aparecen en la lista de abajo:
                </p>
                <ul className="mt-2 space-y-0.5">
                  {datos.embudo.descartados.map((d) => (
                    <li key={`${d.nombre}-${d.motivo}`} className="text-xs">
                      · <strong>{d.nombre}</strong> — {d.motivo}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {datos.embudo.sinCruzar > 0 && (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <strong>{datos.embudo.sinCruzar} de {datos.embudo.interesados} interesados</strong> no
                se pudieron cruzar con Dentalink: su teléfono y correo en GoHighLevel no coinciden con
                ninguna ficha, y les falta el campo <code>dentalinkPatientId</code>. De esos contactos
                el sistema <em>no sabe</em> si agendaron o iniciaron — aparecen como “Sin dato” y hay
                que revisarlos a mano. Las cifras de agendaron / asistieron / iniciaron son por lo
                tanto un piso, no el total real.
              </div>
            )}

            {datos.filas.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-16 text-center text-[#6B6B6B]">
                Nadie tiene el tag “{campana.tagInteresado}” en GoHighLevel.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
                <table className="w-full text-sm">
                  <thead className="border-b border-black/10 bg-black/[0.02] text-left text-xs uppercase tracking-wider text-[#6B6B6B]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Contacto</th>
                      <th className="px-4 py-3 font-medium">Teléfono</th>
                      <th className="px-4 py-3 font-medium">Ficha Dentalink</th>
                      <th className="px-4 py-3 font-medium">Estado</th>
                      <th className="px-4 py-3 font-medium">Seguimiento</th>
                      <th className="px-4 py-3 text-right font-medium">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {datos.filas.map((f) => (
                      <tr key={f.contactId} className="align-top hover:bg-black/[0.015]">
                        <td className="px-4 py-3">
                          <div className="font-medium text-[#1A1A1A]">{f.nombre}</div>
                          {f.email && <div className="text-xs text-[#6B6B6B]">{f.email}</div>}
                        </td>
                        <td className="px-4 py-3">
                          <CeldaTelefono telefono={f.telefono} mensajeWhatsApp={MENSAJE_WA} />
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {f.pacienteId ? (
                            <span className="text-[#6B6B6B]">Paciente #{f.pacienteId}</span>
                          ) : (
                            <span className="text-amber-700">No encontrado en Dentalink</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {/* Sin paciente de Dentalink no se sabe NADA de este contacto.
                                Mostrar "Sin agendar" acá sería afirmar algo falso. */}
                            {f.pacienteId === null ? (
                              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
                                Sin dato · verificar a mano
                              </span>
                            ) : f.inicio ? (
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                Inició
                              </span>
                            ) : f.asistio ? (
                              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                                Asistió, no inició
                              </span>
                            ) : f.agendo ? (
                              <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
                                Agendado
                              </span>
                            ) : (
                              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
                                Sin agendar
                              </span>
                            )}
                          </div>
                          {f.fechaCita && (
                            <div className="mt-1 text-xs text-[#6B6B6B]">
                              {f.fechaCita} · {f.estadoCita}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {f.ultimaLlamada ? (
                            <>
                              <div className="font-medium text-[#1A1A1A]">
                                {f.ultimaLlamada.resultado}
                              </div>
                              <div className="text-[#6B6B6B]">
                                {f.ultimaLlamada.llamado_at.slice(0, 10)}
                                {f.vecesLlamado > 1 && ` · ${f.vecesLlamado} intentos`}
                              </div>
                            </>
                          ) : (
                            <span className="text-[#B0B0B0]">Sin llamar</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end">
                            <RegistrarLlamada
                              base={{
                                origen: "campana",
                                nombre: f.nombre,
                                telefono: f.telefono,
                                ghlContactId: f.contactId,
                                dentalinkPacienteId: f.pacienteId,
                                campana: campana.tagInteresado,
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
          </>
        ) : null}
      </main>
    </>
  );
}
