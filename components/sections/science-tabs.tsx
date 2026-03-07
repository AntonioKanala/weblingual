"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const researchTabs = [
  {
    id: "biomecanica",
    label: "Biomecánica",
    headline:
      "Los brackets linguales aplican fuerza más cerca del centro de resistencia del diente, permitiendo traslación pura.",
    description:
      "AL SITUARSE EN LA CARA INTERNA DEL DIENTE, LOS BRACKETS ESTÁN MUCHO MÁS CERCA DEL CENTRO DE RESISTENCIA. ESTO MINIMIZA LOS MOMENTOS DE FUERZA INDESEADOS, PERMITIENDO MOVIMIENTOS EN CUERPO QUE LOS ALINEADORES NO PUEDEN IGUALAR.",
    cta: { label: "Conocer el tratamiento", href: "/ortodoncia-lingual" },
    image: "/images/biomecanica.png",
  },
  {
    id: "predictibilidad",
    label: "Predictibilidad",
    headline:
      "Los alineadores solo alcanzan entre 41% y 50% de precisión en dientes anteriores.",
    description:
      "EN UN ANÁLISIS COMPARATIVO, LA ORTODONCIA LINGUAL ALCANZA HASTA UN 95% DE PRECISIÓN EN MOVIMIENTOS ANTERIORES. LOS ALINEADORES SUFREN DE RELAJACIÓN DEL ESTRÉS Y CARECEN DE AGARRE MECÁNICO FIRME, LO QUE PROVOCA QUE RESBALEN EN DIENTES CILÍNDRICOS.",
    cta: { label: "Ver estudios", href: "/ortodoncia-lingual" },
    image: "/images/precision-barras.png",
  },
  {
    id: "refinamientos",
    label: "Refinamientos",
    headline:
      "70-80% de los casos con alineadores requieren series adicionales no planificadas.",
    description:
      "LA MAYORÍA DE LOS TRATAMIENTOS CON ALINEADORES NECESITAN FÉRULAS ADICIONALES O INCLUSO BRACKETS TRADICIONALES PARA FINALIZAR CORRECTAMENTE EL CASO. CON ORTODONCIA LINGUAL, EL PLAN DE TRATAMIENTO SE EJECUTA CON PRECISIÓN DESDE EL INICIO.",
    cta: { label: "Agendar evaluación", href: "/agenda-tu-sonrisa-perfecta" },
    image: "/images/refinamientos.png",
  },
  {
    id: "cierre",
    label: "Cierre de espacios",
    headline:
      "En casos de extracciones, los alineadores provocan tipping coronario en lugar de traslación radicular.",
    description:
      "EL 'EFECTO MONTAÑA RUSA': LAS CORONAS SE INCLINAN HACIA EL ESPACIO DE EXTRACCIÓN MIENTRAS LAS RAÍCES PERMANECEN EN SU LUGAR, TRAUMATIZANDO EL PERIODONTO. LA ORTODONCIA LINGUAL MUEVE EL DIENTE COMPLETO EN BLOQUE.",
    cta: { label: "Conocer más", href: "/ortodoncia-lingual" },
    image: "/images/cierre-espacios.png",
  },
  {
    id: "independencia",
    label: "24/7 Activo",
    headline:
      "La ortodoncia lingual trabaja las 24 horas sin depender de la disciplina del paciente.",
    description:
      "A DIFERENCIA DE LOS ALINEADORES, QUE EXIGEN 22 HORAS DIARIAS DE USO Y DEPENDEN DE LA MEMORIA DEL USUARIO, LOS BRACKETS LINGUALES TRABAJAN CONTINUAMENTE. SIN INTERRUPCIONES, SIN EXCUSAS, SIN PÉRDIDA DE EFICACIA.",
    cta: { label: "Agendar evaluación", href: "/agenda-tu-sonrisa-perfecta" },
    image: "/images/reloj-24h.png",
  },
];

export const ScienceTabs = () => {
  const [activeTab, setActiveTab] = useState(researchTabs[0].id);
  const activeContent = researchTabs.find((tab) => tab.id === activeTab)!;

  return (
    <section className="bg-background-light py-24 lg:py-32">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* AG1-style: big left-aligned heading */}
        <FadeIn>
          <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] text-text-light">
            La ciencia detrás de la superioridad lingual
          </h2>
        </FadeIn>

        {/* AG1-style tabs — text with underline, NOT pills */}
        <FadeIn delay={0.15}>
          <div className="mt-8 mb-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            <div className="flex w-max gap-8 border-b border-text-light/10 px-1 pr-8">
              {researchTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative shrink-0 pb-4 text-base font-medium transition-colors duration-300",
                    activeTab === tab.id
                      ? "text-text-light"
                      : "text-text-muted hover:text-text-light"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-light"
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Content — AG1 research style: text left + chart/image right */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0, 1] }}
              className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
            >
              {/* Text */}
              <div>
                <h3 className="font-display text-2xl font-bold leading-snug text-text-light md:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
                  {activeContent.headline}
                </h3>

                <p className="mt-6 text-xs font-medium uppercase leading-relaxed tracking-[0.05em] text-text-muted">
                  {activeContent.description}
                </p>

                <Link
                  href={activeContent.cta.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-text-light transition-colors hover:text-accent-gold"
                >
                  {activeContent.cta.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Image / Chart */}
              <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-[#f5f3f0] p-6 lg:p-10">
                <Image
                  src={activeContent.image}
                  alt={activeContent.headline}
                  width={800}
                  height={500}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
