"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ArrowRight, MessageCircle, Sparkles, Gift } from "lucide-react";

export default function AgendaPage() {
  return (
    <div className="bg-background-light pt-24 pb-12 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <FadeIn>
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-text-light sm:text-5xl lg:text-6xl">
              Agenda.
            </h1>
            <p className="mt-4 text-xl font-medium text-text-light sm:text-2xl">
              Cambia tu sonrisa sin que nadie se entere
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-accent-gold">
              Expertos en Ortodoncia Invisible en Las Condes
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-8 max-w-lg text-center">
            <a
              href="https://f925e25a786881c8ce0d386b933134a116578770.agenda.softwaredentalink.com/agenda/especialidad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-accent-gold bg-transparent px-8 py-3.5 text-sm font-semibold text-accent-gold transition-all hover:bg-accent-gold hover:text-white sm:w-auto"
            >
              Si ya eres paciente de la clínica, Agenda aquí
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-text-light sm:text-3xl">
              Descubre un Tratamiento 100% Invisible
            </h2>
            <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent-gold/10 px-6 py-4 text-left">
              <Gift className="h-6 w-6 shrink-0 text-accent-gold" />
              <p className="text-sm font-medium text-text-light sm:text-base">
                Agenda tu Evaluación Inicial y obtén un{" "}
                <strong className="text-accent-gold">Blanqueamiento Gratis</strong> este mes si
                inicias tratamiento de Brackets Invisibles.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Canala Widget for New Patients */}
        <FadeIn delay={0.3}>
          <div className="mt-16">
            <h3 className="mb-6 text-center font-display text-2xl font-bold text-text-light sm:text-3xl">
              Agenda Nuevos Pacientes
            </h3>
            <div className="overflow-hidden rounded-2xl border border-text-light/10 bg-white shadow-xl">
              <iframe
                src="https://link.canala-studio.com/widget/booking/5m1hsxhm7R3E5aEH5C97"
                style={{
                  width: "100%",
                  border: "none",
                  overflow: "hidden",
                  minHeight: "750px",
                }}
                scrolling="no"
                id="5m1hsxhm7R3E5aEH5C97_1714076757138"
                title="Agenda tu evaluación inicial"
              />
            </div>
          </div>
        </FadeIn>

        {/* Existing Patients Options */}
        <FadeIn delay={0.4}>
          <div className="mt-20 rounded-3xl bg-[#f5f3f0] p-8 sm:p-12">
            <div className="text-center">
              <h3 className="font-display text-2xl font-bold text-text-light sm:text-3xl">
                ¿Eres paciente?
              </h3>
              <p className="mt-2 text-sm uppercase tracking-wider text-text-muted">
                Selecciona una de estas 2 opciones
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
              {/* WhatsApp */}
              <a
                href="https://wa.link/8lqyfh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 rounded-2xl border border-text-light/10 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-green-500/30 hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 transition-colors group-hover:bg-green-100">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-text-light">
                    Control Ortodoncia
                  </h4>
                  <p className="mt-1 text-sm font-medium text-green-600">
                    WhatsApp Secretaria
                  </p>
                </div>
              </a>

              {/* Dentalink Online */}
              <a
                href="https://f925e25a786881c8ce0d386b933134a116578770.agenda.softwaredentalink.com/agenda/especialidad"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 rounded-2xl border border-text-light/10 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-accent-gold/30 hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10 transition-colors group-hover:bg-accent-gold/20">
                  <Sparkles className="h-8 w-8 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-text-light">
                    Urgencias Pacientes
                  </h4>
                  <p className="mt-1 text-sm font-medium text-accent-gold">
                    Agenda Online
                  </p>
                </div>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
