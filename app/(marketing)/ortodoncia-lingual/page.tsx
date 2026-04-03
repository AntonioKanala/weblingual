import { ComparisonTable } from "@/components/sections/comparison-table";
import { FadeIn } from "@/components/animations/fade-in";
import { ScienceTabs } from "@/components/sections/science-tabs";
import { FAQ } from "@/components/sections/faq";
import { URLS } from "@/lib/constants";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ortodoncia Lingual | El Tratamiento Invisible | Clínica Lingual",
  description:
    "Descubre la ortodoncia lingual: brackets 100% invisibles, personalizados con tecnología 3D. Eficaz para casos complejos. +5,000 tratamientos en Santiago.",
};

const timelineSteps = [
  {
    week: "Semana 1-2",
    title: "Adaptación",
    description:
      "Tu lengua se adapta a los brackets en pocos días. Puede haber una leve alteración del habla que desaparece rápidamente.",
    percent: "95% de adaptación",
  },
  {
    week: "Mes 1-2",
    title: "Primeros movimientos",
    description:
      "Los dientes comienzan a moverse de forma controlada. Los brackets trabajan 24/7 sin que tengas que hacer nada.",
    percent: "Movimiento activo",
  },
  {
    week: "Mes 3-6",
    title: "Cambios visibles",
    description:
      "Notarás mejoras significativas en la alineación. Los casos de apiñamiento se resuelven progresivamente.",
    percent: "Resultados visibles",
  },
  {
    week: "Mes 6-18",
    title: "Resultado final",
    description:
      "Sonrisa perfecta y mordida corregida. Se retiran los brackets y se coloca un retenedor para mantener los resultados.",
    percent: "Sonrisa perfecta",
  },
];

const benefitTabs = [
  {
    title: "100% Invisible",
    description:
      "Al estar en la cara interna de los dientes, los brackets linguales son completamente invisibles desde el exterior. Es la única técnica de ortodoncia verdaderamente invisible — sin ataches, sin férulas, sin nada que se vea.",
    image: "/images/upload/Fotos Stock/Modelo lingual close up.webp",
  },
  {
    title: "Casos complejos",
    description:
      "A diferencia de los alineadores (41-50% de precisión en anteriores), la ortodoncia lingual alcanza hasta 95% de precisión. Resuelve mordidas cruzadas, apiñamientos severos, casos de extracciones y maloclusiones esqueléticas Clase II y III.",
    image: "/images/upload/Fotos Stock/atención al paciente.webp",
  },
  {
    title: "Personalizados 3D",
    description:
      "Cada bracket se fabrica a medida para la anatomía de tus dientes usando tecnología de escaneo y diseño 3D. Esto asegura un ajuste perfecto, máxima comodidad y movimientos dentales precisos desde el primer día.",
    image: "/images/upload/Fotos Stock/Modelo lingual mano.webp",
  },
  {
    title: "Protege el esmalte",
    description:
      "Los brackets tradicionales pueden dejar marcas en el esmalte frontal visible. La ortodoncia lingual protege la cara visible de tus dientes, y la superficie interna tiene mayor grosor de esmalte y mejor irrigación salival.",
    image: "/images/upload/Fotos Stock/brackets linguales en boca.webp",
  },
  {
    title: "Trabaja 24/7",
    description:
      "Sin depender de tu disciplina. Los alineadores exigen 22 horas diarias de uso y dependen de tu memoria. Los brackets linguales trabajan continuamente, las 24 horas del día, los 7 días de la semana, sin interrupciones.",
    image: "/images/upload/Fotos Stock/sala de espera v1.webp",
  },
];

const testimonials = [
  {
    name: "Werner M.",
    quote:
      "Nunca pensé que podría corregir mis dientes sin que nadie lo notara. La ortodoncia lingual me dio la confianza de sonreír durante todo el tratamiento.",
  },
  {
    name: "María M.",
    quote:
      "Tenía un caso complicado que otros métodos no podían tratar. La ortodoncia lingual solucionó todos mis problemas dentales de forma discreta y eficaz.",
  },
  {
    name: "José R.",
    quote:
      "Los frenillos linguales son la mejor solución para quienes desean corregir su sonrisa sin comprometer la estética.",
  },
];

export default function TratamientoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background-dark pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              El tratamiento
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] text-white">
              ¿Qué es la Ortodoncia Lingual?
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              Conoce el tratamiento de brackets invisibles revolucionario que
              cambió la ortodoncia para siempre. Brackets personalizados,
              colocados en la cara interna de tus dientes, para que nadie los
              vea.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent-gold text-accent-gold"
                  />
                ))}
              </div>
              <span className="text-sm text-white/50">
                +5,000 Tratamientos Finalizados
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={URLS.agenda}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-semibold text-background-dark transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                Agenda tu evaluación inicial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Benefits — Sticky scroll like AG1 benefits tabs */}
      <section className="bg-background-light py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Beneficios
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-text-light md:text-4xl lg:text-5xl">
              Los beneficios de la ortodoncia lingual
            </h2>
          </FadeIn>

          <div className="mt-14 space-y-20 lg:space-y-32">
            {benefitTabs.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={0.1}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <h3 className="font-display text-2xl font-bold text-text-light md:text-3xl">
                      {benefit.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-text-muted">
                      {benefit.description}
                    </p>
                  </div>
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — "What to expect" like AG1 */}
      <section className="bg-background-dark py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Qué esperar
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Tu evolución con ortodoncia lingual
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timelineSteps.map((step, i) => (
              <FadeIn key={step.week} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-accent-gold/30 hover:bg-white/[0.07]">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-gold">
                    {step.week}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {step.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold text-accent-gold/70">
                    {step.percent}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Science Tabs — reuse from homepage */}
      <ScienceTabs />

      {/* Comparison Table — reuse from homepage */}
      <ComparisonTable />

      {/* Testimonials */}
      <section className="bg-[#f5f3f0] py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Testimonios
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-text-light md:text-4xl">
              Lo que dicen nuestros pacientes
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="mb-3 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-3.5 w-3.5 fill-accent-gold text-accent-gold"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-text-light">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-xs font-semibold text-text-muted">
                    — {t.name}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-dark py-24 lg:py-32">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] text-white">
              ¿Quieres experimentar el cambio?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/50">
              Agenda tu evaluación inicial y descubre cómo la ortodoncia lingual
              puede transformar tu sonrisa.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href={URLS.agenda}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-semibold text-background-dark transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                Agenda tu evaluación inicial gratuita
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+5622944471"
                className="text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                o llámanos al (2) 2944 4714
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </>
  );
}
