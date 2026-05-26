import { ComparisonTable } from "@/components/sections/comparison-table";
import { FadeIn } from "@/components/animations/fade-in";
import { ScienceTabs } from "@/components/sections/science-tabs";
import { FAQ } from "@/components/sections/faq";
import { VideoPlayer } from "@/components/ui/video-player";
import { VideoPlayerProvider } from "@/components/ui/video-player-context";
import { videoTestimonials } from "@/content/testimonials";
import { CONTACT, URLS } from "@/lib/constants";
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
    bullets: [
      "Invisibles en el 99% de situaciones cotidianas",
      "Sin ataches estéticos visibles en los dientes",
      "Sin férulas transparentes que se noten al hablar",
      "Ideal para profesionales, eventos y vida pública",
    ],
    image: "/images/lifestyle/lifestyle-sombrero-exterior.webp",
  },
  {
    title: "Casos complejos",
    description:
      "A diferencia de los alineadores (41-50% de precisión en movimientos de anteriores), la ortodoncia lingual alcanza hasta 95% de precisión. Resuelve casos que los alineadores no pueden abordar de forma fiable.",
    bullets: [
      "Mordidas cruzadas y apiñamientos severos",
      "Casos con extracciones y cierre de espacios",
      "Maloclusiones esqueléticas Clase II y III",
      "Control radicular tridimensional real",
    ],
    image: "/images/lifestyle/atencion-multidisciplinaria.webp",
  },
  {
    title: "Personalizados 3D",
    description:
      "Cada bracket se fabrica a medida para la anatomía de tus dientes usando tecnología de escaneo y diseño 3D. Esto asegura un ajuste perfecto, máxima comodidad y movimientos dentales precisos desde el primer día.",
    bullets: [
      "Escáner intraoral 3D — sin pastas de impresión",
      "Brackets diseñados para tu anatomía dental única",
      "Arcos robotizados doblados a tu medida",
      "Ajuste perfecto desde el día 1, mayor comodidad",
    ],
    image: "/images/lifestyle/brackets-personalizados.webp",
  },
  {
    title: "Protege el esmalte",
    description:
      "Los brackets tradicionales pueden dejar marcas blancas en el esmalte frontal visible. La ortodoncia lingual protege la cara visible de tus dientes, y la superficie interna tiene mayor grosor de esmalte y mejor irrigación salival.",
    bullets: [
      "Cero marcas blancas en la cara visible del diente",
      "Esmalte lingual más grueso y resistente",
      "Mayor flujo salival = menor riesgo de caries",
      "Recomendado en pacientes con esmalte sensible",
    ],
    image: "/images/beneficios/protege-esmalte.webp",
  },
  {
    title: "Trabaja 24/7",
    description:
      "Sin depender de tu disciplina. Los alineadores exigen 22 horas diarias de uso y dependen de tu memoria. Los brackets linguales trabajan continuamente, las 24 horas del día, los 7 días de la semana, sin interrupciones.",
    bullets: [
      "Acción ortodóntica continua, sin pausas",
      "No hay que recordar ponérselos ni cambiarlos",
      "No se pierden ni se rompen como las férulas",
      "Resultados predecibles independientes del paciente",
    ],
    image: "/images/lifestyle/dra-pinkas-atendiendo.webp",
  },
];

export default function TratamientoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background-dark pb-16 pt-32 lg:pb-20 lg:pt-40">
        {/* Background image — brackets personalizados */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/lifestyle/box-atencion-paciente.webp"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/85 to-background-dark/40" />
        </div>
        <div className="relative px-6 sm:px-10 lg:px-16 xl:px-24">
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
      <section className="bg-background-light py-16 lg:py-20">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Beneficios
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-text-light md:text-4xl lg:text-5xl">
              Los beneficios de la ortodoncia lingual
            </h2>
          </FadeIn>

          <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-20">
            {benefitTabs.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={0.1}>
                <div className="grid items-stretch gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
                  {/* Text column — wider (3fr) */}
                  <div
                    className={`flex flex-col justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <h3 className="font-display text-2xl font-bold text-text-light md:text-3xl lg:text-4xl">
                      {benefit.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-text-muted lg:text-lg">
                      {benefit.description}
                    </p>
                    <ul className="mt-6 space-y-3 border-t border-text-light/10 pt-6">
                      {benefit.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-relaxed text-text-light/80 lg:text-base"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Image column — narrower (2fr), fills text height on lg+ */}
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[420px] ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — "What to expect" like AG1 */}
      <section className="bg-background-dark py-16 lg:py-20">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Qué esperar
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Tu evolución con ortodoncia lingual
            </h2>
          </FadeIn>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Video Testimonials */}
      <section className="bg-[#f5f3f0] py-16 lg:py-20">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Testimonios
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-text-light md:text-4xl">
              Lo que dicen nuestros pacientes
            </h2>
          </FadeIn>

          <VideoPlayerProvider>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {videoTestimonials.slice(0, 3).map((t, i) => (
                <FadeIn key={t.id} delay={i * 0.1}>
                  <VideoPlayer
                    type="youtube"
                    src={t.videoUrl!}
                    title={`Testimonio de ${t.name}`}
                    className="bg-[#f5f3f0]"
                  />
                </FadeIn>
              ))}
            </div>
          </VideoPlayerProvider>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex justify-center">
              <Link
                href={URLS.testimonios}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-semibold text-background-dark transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                Ver más testimonios
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-dark py-20 lg:py-24">
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
                href={CONTACT.phoneHref}
                className="text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                o llámanos al {CONTACT.phone}
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
