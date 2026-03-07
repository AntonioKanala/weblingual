import { FadeIn } from "@/components/animations/fade-in";
import { URLS } from "@/lib/constants";
import { ArrowRight, Camera } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casos Clínicos | Clínica Lingual Santiago",
  description:
    "Mira los resultados reales de nuestros tratamientos de ortodoncia lingual. Antes y después de casos reales en Clínica Lingual, Santiago.",
};

const caseCategories = [
  {
    title: "Apiñamiento",
    description:
      "Corrección de dientes apiñados con brackets linguales. Resultados predecibles sin comprometer la estética durante el tratamiento.",
    count: "Próximamente",
  },
  {
    title: "Mordida cruzada",
    description:
      "Tratamiento de mordidas cruzadas anteriores y posteriores con control tridimensional preciso.",
    count: "Próximamente",
  },
  {
    title: "Espacios y diastemas",
    description:
      "Cierre de espacios con traslación radicular completa, evitando el tipping coronario típico de los alineadores.",
    count: "Próximamente",
  },
  {
    title: "Casos complejos",
    description:
      "Maloclusiones esqueléticas Clase II y III resueltas con ortodoncia lingual y anclaje esquelético, evitando cirugía.",
    count: "Próximamente",
  },
];

export default function CasosClinicosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background-dark pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Evidencia clínica
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] text-white">
              Casos Clínicos Reales
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/60">
              Resultados reales de pacientes reales. Cada caso demuestra la
              precisión y efectividad de la ortodoncia lingual.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Case Categories */}
      <section className="bg-background-light py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Categorías
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
              Tipos de casos que tratamos
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {caseCategories.map((cat, i) => (
              <FadeIn key={cat.title} delay={i * 0.1}>
                <div className="group rounded-2xl border border-text-light/10 bg-white p-8 transition-all hover:border-accent-gold/20 hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-text-light">
                        {cat.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-muted">
                        {cat.description}
                      </p>
                    </div>
                    <Camera className="h-8 w-8 shrink-0 text-text-light/10" />
                  </div>
                  <p className="mt-5 text-xs font-semibold text-accent-gold">
                    {cat.count}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="bg-[#f5f3f0] py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                Próximamente
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
                Estamos preparando nuestra galería de casos
              </h2>
              <p className="mt-4 text-base text-text-muted">
                Pronto podrás ver fotos de antes y después de casos reales
                tratados con ortodoncia lingual. Mientras tanto, agenda tu
                evaluación y te mostraremos casos similares al tuyo en la
                consulta.
              </p>
              <Link
                href={URLS.agenda}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-semibold text-background-dark transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                Agenda tu evaluación inicial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
