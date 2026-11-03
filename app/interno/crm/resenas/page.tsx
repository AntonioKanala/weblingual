import Link from "next/link";
import { InternoHeader } from "@/components/interno/InternoHeader";
import { CrmNav, Tarjeta } from "@/components/interno/CrmNav";
import { CeldaTelefono } from "@/components/interno/CeldaTelefono";
import { getDashboardResenas, type ResenaFila } from "@/lib/interno/resenas";
import { Star, MessageCircle, AlertCircle, CheckCircle2, TrendingUp, Sparkles, Download } from "lucide-react";

export const dynamic = "force-dynamic";

function porcentaje(parte: number, total: number): string {
  if (!total) return "0%";
  return `${Math.round((parte / total) * 100)}%`;
}

function RenderEstrellas({ nota }: { nota: number }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        nota === 5
          ? "bg-emerald-50 text-emerald-700"
          : nota === 4
            ? "bg-sky-50 text-sky-700"
            : nota === 3
              ? "bg-amber-50 text-amber-700"
              : "bg-red-50 text-red-700"
      }`}
    >
      {"★".repeat(nota)}
      {"☆".repeat(5 - nota)}
      <span className="ml-1 text-[11px] font-mono">{nota}.0</span>
    </span>
  );
}

export default async function ResenasCrmPage({
  searchParams,
}: {
  searchParams: Promise<{ f?: string }>;
}) {
  const { f } = await searchParams;
  const filtro = f ?? "todas";

  let datos: Awaited<ReturnType<typeof getDashboardResenas>> | null = null;
  let error: string | null = null;

  try {
    datos = await getDashboardResenas();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error cargando datos de reseñas";
  }

  // Filtrado de filas
  let filasMostrar: ResenaFila[] = [];
  if (datos) {
    switch (filtro) {
      case "5estrellas":
        filasMostrar = datos.filas.filter((row) => row.puntuacion === 5);
        break;
      case "4estrellas":
        filasMostrar = datos.filas.filter((row) => row.puntuacion === 4);
        break;
      case "bajas":
        filasMostrar = datos.filas.filter((row) => row.puntuacion <= 3);
        break;
      case "comentarios":
        filasMostrar = datos.filas.filter((row) => row.detalle && row.detalle.trim().length > 0);
        break;
      case "pendientes_google":
        filasMostrar = datos.filas.filter((row) => row.puntuacion === 5 && !row.dejoGoogle);
        break;
      case "urgentes_wa":
        filasMostrar = datos.filas.filter(
          (row) => row.puntuacion === 5 && !row.dejoGoogle && !row.recibioWa,
        );
        break;
      case "wa2_28sep":
        filasMostrar = datos.filas.filter(
          (row) => row.puntuacion === 5 && !row.dejoGoogle && row.tagWa2,
        );
        break;
      default:
        filasMostrar = datos.filas;
        break;
    }
  }

  return (
    <>
      <InternoHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <CrmNav activa="/interno/crm/resenas" />

        {/* Encabezado */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-[#1A1A1A]">
                Campaña de Reseñas & Feedback
              </h1>
              <span className="rounded-full bg-[#C9A96E]/20 px-2.5 py-0.5 text-xs font-semibold text-[#8C6D2D]">
                Septiembre 2026
              </span>
            </div>
            <p className="mt-1 text-sm text-[#6B6B6B]">
              Control de satisfacción de pacientes, gestión de feedback interno y embudo de conversión a Google Reviews.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/interno/crm/resenas/export"
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/15 bg-white px-3 py-1.5 text-sm font-medium text-[#1A1A1A] hover:bg-black/[0.03]"
            >
              <Download className="h-4 w-4 text-[#6B6B6B]" />
              Descargar Excel
            </a>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            <p className="font-semibold">Ocurrió un error leyendo las reseñas:</p>
            <p className="mt-1">{error}</p>
          </div>
        ) : datos ? (
          <>
            {/* Tarjetas KPI Superiores */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <Tarjeta
                etiqueta="Respuestas"
                valor={datos.resumen.totalRespuestas}
                detalle={`${datos.resumen.personasUnicas} personas únicas`}
              />
              <Tarjeta
                etiqueta="Nota Promedio"
                valor={`${datos.resumen.promedio} ★`}
                detalle="calificación interna"
                acento
              />
              <Tarjeta
                etiqueta="5 Estrellas"
                valor={datos.resumen.estrellas5}
                detalle={porcentaje(datos.resumen.estrellas5, datos.resumen.totalRespuestas)}
              />
              <Tarjeta
                etiqueta="En Google"
                valor={datos.resumen.dejoGoogle}
                detalle={`${porcentaje(datos.resumen.dejoGoogle, datos.resumen.estrellas5)} de los 5★`}
              />
              <Tarjeta
                etiqueta="Pendientes Google"
                valor={datos.resumen.pendientesGoogle}
                detalle="potencial de reseñas"
              />
              <Tarjeta
                etiqueta="Meta 4.4 Google"
                valor={`~${datos.resumen.meta44FaltantesMin} a ${datos.resumen.meta44FaltantesMax}`}
                detalle="reseñas 5★ faltantes"
              />
            </div>

            {/* Banner Objetivo Meta 4.4 Estrellas en Google */}
            <div className="mb-6 overflow-hidden rounded-2xl border border-[#C9A96E]/40 bg-gradient-to-r from-[#FFFDF9] via-[#FAF6ED] to-[#F5ECE0] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#C9A96E]" />
                    <h3 className="font-semibold text-[#1A1A1A]">
                      Objetivo: Subir el perfil de Google a 4.4 Estrellas
                    </h3>
                  </div>
                  <p className="text-sm text-[#555]">
                    Hoy el perfil en Google cuenta con <strong>4.3 ★</strong> (sobre 198 reseñas). Para que Google redondee y muestre <strong>4.4 ★</strong>, el promedio acumulado debe llegar a <strong>4.35</strong>.
                  </p>
                  <p className="text-xs text-[#777]">
                    Matemáticamente faltan entre <strong>16 y 22 reseñas de 5★</strong>. ¡Tenemos <strong>60 pacientes satisfechos</strong> que pusieron 5★ en la encuesta y aún no publican en Google! Si convertimos solo el 27% de ellos, la meta se cumple de inmediato.
                  </p>
                </div>
                <div className="shrink-0 rounded-xl bg-white/80 p-3 text-center shadow-sm">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B6B6B]">
                    Conversión Necesaria
                  </div>
                  <div className="text-xl font-bold text-[#8C6D2D]">
                    {Math.round((datos.resumen.meta44FaltantesMin / datos.resumen.pendientesGoogle) * 100)}%
                  </div>
                  <div className="text-[10px] text-[#888]">16 de 60 pendientes</div>
                </div>
              </div>
            </div>

            {/* Alertas Accionables de Seguimiento WhatsApp */}
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              {/* Alerta 1: Los 6 nuevos 5★ sin WA */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-amber-900">
                        Nuevos 5★ Sin WhatsApp ({datos.resumen.urgentesSinWa})
                      </h4>
                      <Link
                        href="/interno/crm/resenas?f=urgentes_wa"
                        className="text-xs font-semibold text-amber-800 underline hover:text-amber-950"
                      >
                        Ver los {datos.resumen.urgentesSinWa}
                      </Link>
                    </div>
                    <p className="mt-1 text-xs text-amber-800">
                      Respondieron 5★ recientemente (entre el 26 y 28 de sep) y <strong>aún no han recibido</strong> el WhatsApp de agradecimiento con el link a Google.
                    </p>
                  </div>
                </div>
              </div>

              {/* Alerta 2: Tanda 28-sep (WA2) */}
              <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sky-900">
                        Recordatorio 28-SEP · 2do Toque ({datos.resumen.programados28Sep})
                      </h4>
                      <Link
                        href="/interno/crm/resenas?f=wa2_28sep"
                        className="text-xs font-semibold text-sky-800 underline hover:text-sky-950"
                      >
                        Ver los {datos.resumen.programados28Sep}
                      </Link>
                    </div>
                    <p className="mt-1 text-xs text-sky-800">
                      Tienen tag <code>resena wa2 28sep</code>. Es el recordatorio final por el cierre del sorteo de higiene + blanqueamiento del miércoles 30.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pestañas de Filtro */}
            <div className="mb-4 flex flex-wrap items-center gap-1.5 border-b border-black/10 pb-3">
              {[
                { key: "todas", label: `Todas (${datos.resumen.totalRespuestas})` },
                { key: "5estrellas", label: `5 Estrellas (${datos.resumen.estrellas5})` },
                { key: "pendientes_google", label: `5★ Pendientes Google (${datos.resumen.pendientesGoogle})` },
                { key: "urgentes_wa", label: `5★ Sin WA (${datos.resumen.urgentesSinWa})` },
                { key: "wa2_28sep", label: `5★ 2do Toque 28-sep (${datos.resumen.programados28Sep})` },
                { key: "4estrellas", label: `4 Estrellas (${datos.resumen.estrellas4})` },
                {
                  key: "bajas",
                  label: `1-3 Estrellas (${datos.resumen.estrellas3 + datos.resumen.estrellas2 + datos.resumen.estrellas1})`,
                },
                { key: "comentarios", label: `Con Comentario (${datos.resumen.conComentario})` },
              ].map((tab) => {
                const activo = filtro === tab.key;
                return (
                  <Link
                    key={tab.key}
                    href={`/interno/crm/resenas?f=${tab.key}`}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      activo
                        ? "bg-[#1A1A1A] text-white"
                        : "border border-black/10 bg-white text-[#6B6B6B] hover:bg-black/[0.03] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>

            {/* Resumen de Comentarios y Feedback Cualitativo */}
            {filtro === "comentarios" || filtro === "bajas" ? (
              <div className="mb-6 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B6B6B]">
                  Comentarios y Feedback Dejados por Pacientes ({filasMostrar.length})
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {filasMostrar
                    .filter((f) => f.detalle && f.detalle.trim().length > 0)
                    .map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-xl border p-4 ${
                          item.puntuacion <= 3
                            ? "border-red-200 bg-red-50/40"
                            : item.puntuacion === 4
                              ? "border-sky-200 bg-sky-50/30"
                              : "border-emerald-200 bg-emerald-50/30"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold text-[#1A1A1A]">{item.nombre}</div>
                            <div className="text-xs text-[#6B6B6B]">
                              RUT: {item.rut || "—"} · {item.creado_el.slice(0, 10)}
                            </div>
                          </div>
                          <RenderEstrellas nota={item.puntuacion} />
                        </div>
                        <p className="mt-2 text-xs italic text-[#333]">
                          &ldquo;{item.detalle}&rdquo;
                        </p>
                        <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-2">
                          <CeldaTelefono
                            telefono={item.telefono}
                            mensajeWhatsApp={item.mensajeWhatsApp}
                          />
                          <span className="text-[11px] font-medium text-[#6B6B6B]">
                            {item.puntuacion <= 3 ? "Reclamo interno" : "Feedback"}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : null}

            {/* Tabla Principal de Reseñas */}
            <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
              <table className="w-full text-sm">
                <thead className="border-b border-black/10 bg-black/[0.02] text-left text-xs uppercase tracking-wider text-[#6B6B6B]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Fecha</th>
                    <th className="px-4 py-3 font-medium">Paciente</th>
                    <th className="px-4 py-3 font-medium">Nota</th>
                    <th className="px-4 py-3 font-medium">Comentario</th>
                    <th className="px-4 py-3 font-medium">Estado Google</th>
                    <th className="px-4 py-3 font-medium">Seguimiento WA</th>
                    <th className="px-4 py-3 font-medium">Contactar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filasMostrar.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-[#6B6B6B]">
                        No hay reseñas bajo este filtro.
                      </td>
                    </tr>
                  ) : (
                    filasMostrar.map((f) => (
                      <tr key={f.id} className="align-top hover:bg-black/[0.015]">
                        <td className="whitespace-nowrap px-4 py-3 text-xs text-[#6B6B6B]">
                          {f.creado_el.slice(0, 10)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-[#1A1A1A]">{f.nombre}</div>
                          <div className="text-xs text-[#6B6B6B]">
                            {f.rut ? `RUT: ${f.rut}` : f.email ? f.email : "Sin RUT"}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <RenderEstrellas nota={f.puntuacion} />
                        </td>
                        <td className="max-w-xs px-4 py-3 text-xs text-[#1A1A1A]">
                          {f.detalle ? (
                            <span className="font-normal text-[#222]">{f.detalle}</span>
                          ) : (
                            <span className="text-[#B0B0B0]">Sin comentario</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {f.puntuacion === 5 ? (
                            f.dejoGoogle ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                <CheckCircle2 className="h-3 w-3" /> Publicada
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                                Pendiente
                              </span>
                            )
                          ) : (
                            <span className="text-xs text-[#B0B0B0]">N/A (Feedback interno)</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-xs">
                          {f.puntuacion === 5 ? (
                            f.tagWa2 ? (
                              <span className="rounded-full bg-sky-50 px-2 py-0.5 font-medium text-sky-700">
                                2do Toque (28-sep)
                              </span>
                            ) : f.recibioWa ? (
                              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-600">
                                WA Enviado
                              </span>
                            ) : (
                              <span className="rounded-full bg-red-50 px-2 py-0.5 font-semibold text-red-700">
                                Urgente: Sin WA
                              </span>
                            )
                          ) : (
                            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-800">
                              Por contactar
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <CeldaTelefono
                            telefono={f.telefono}
                            mensajeWhatsApp={f.mensajeWhatsApp}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </main>
    </>
  );
}
