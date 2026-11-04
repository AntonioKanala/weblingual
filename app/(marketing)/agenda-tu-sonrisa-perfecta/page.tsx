"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { AgendaEmbed } from "@/components/ui/agenda-embed";
import { CONTACT } from "@/lib/constants";
import { ArrowDown, Gift, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const DENTALINK_AGENDA =
  "https://f925e25a786881c8ce0d386b933134a116578770.agenda.softwaredentalink.com/agenda/especialidad";

// Sin emoji a propósito: wa.me los cambia por "�" al redirigir a
// api.whatsapp.com (las tildes sí pasan bien).
const WHATSAPP_CONTROL = `${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hola, necesito agendar mi control de ortodoncia, por favor",
)}`;

export default function AgendaPage() {
  // El agendamiento ocurre dentro del iframe de GoHighLevel, así que este
  // es el último paso del embudo que el sitio puede medir por sí mismo
  // (después viene `agenda_open`, al pulsar «Ver horarios disponibles»).
  useEffect(() => {
    trackEvent("agenda_view");
  }, []);

  return (
    <>
      {/* Hero: corto, para que la agenda quede cerca del primer pantallazo */}
      <section className="bg-background-dark pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <FadeIn>
            <div className="text-center">
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Agenda tu Evaluación de Ortodoncia Invisible
              </h1>
              <p className="mt-4 text-lg font-medium text-white/80 sm:text-xl">
                Evaluación inicial gratuita con un especialista en ortodoncia
                lingual, en Las Condes.
              </p>
              <a
                href="#ya-eres-paciente"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                ¿Ya eres paciente? Agenda tu control aquí
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-background-light py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          {/* La herramienta primero; la explicación, de refuerzo debajo */}
          <FadeIn>
            <h2 className="mb-6 text-center font-display text-2xl font-bold text-text-light sm:text-3xl">
              Agenda nuevos pacientes
            </h2>
            <AgendaEmbed />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mx-auto mt-14 max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold text-text-light sm:text-3xl">
                Qué pasa en tu evaluación
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
                Revisamos tu caso, resolvemos tus dudas y te damos un plan de
                tratamiento con plazos y presupuesto claros. Si quieres conocer
                el proceso completo antes de venir, puedes leer sobre{" "}
                <Link
                  href="/ortodoncia-lingual"
                  className="text-accent-gold-dark underline underline-offset-2"
                >
                  cómo funciona la ortodoncia lingual
                </Link>{" "}
                o revisar{" "}
                <Link
                  href="/precios-ortodoncia-lingual"
                  className="text-accent-gold-dark underline underline-offset-2"
                >
                  cómo se arma el presupuesto
                </Link>
                .
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent-gold/10 px-6 py-4 text-left">
                <Gift className="h-6 w-6 shrink-0 text-accent-gold-dark" />
                {/* Vigente para pacientes nuevos que agendan por la web (confirmado
                    por la clínica el 3-nov-2026). Sin "este mes": no tiene plazo. */}
                <p className="text-sm font-medium text-text-light sm:text-base">
                  ¿Primera vez en Clínica Lingual? Agenda tu evaluación por la web
                  y, si inicias tratamiento de Brackets Invisibles, te regalamos un{" "}
                  <strong className="text-accent-gold-dark">Blanqueamiento</strong>.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Pacientes en tratamiento: un solo lugar, sin competir con la agenda */}
          <FadeIn delay={0.2}>
            <div
              id="ya-eres-paciente"
              className="mt-20 scroll-mt-28 rounded-3xl bg-[#f5f3f0] p-8 sm:p-12"
            >
              <div className="text-center">
                <h2 className="font-display text-2xl font-bold text-text-light sm:text-3xl">
                  ¿Ya eres paciente?
                </h2>
                <p className="mt-2 text-sm uppercase tracking-wider text-text-muted">
                  Elige una de estas 2 opciones
                </p>
              </div>

              <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
                <a
                  href={WHATSAPP_CONTROL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-text-light/10 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-green-500/30 hover:shadow-md"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 transition-colors group-hover:bg-green-100">
                    <MessageCircle className="h-8 w-8 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-text-light">
                      Control de ortodoncia
                    </h3>
                    <p className="mt-1 text-sm font-medium text-green-700">
                      WhatsApp de secretaría
                    </p>
                  </div>
                </a>

                <a
                  href={DENTALINK_AGENDA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-text-light/10 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-accent-gold/30 hover:shadow-md"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10 transition-colors group-hover:bg-accent-gold/20">
                    <Sparkles className="h-8 w-8 text-accent-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-text-light">
                      Controles y urgencias
                    </h3>
                    <p className="mt-1 text-sm font-medium text-text-muted">
                      Agenda online
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
