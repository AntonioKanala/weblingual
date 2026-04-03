import { FadeIn } from "@/components/animations/fade-in";
import { URLS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { ClinicalCaseViewer, ClinicalCaseData } from "@/components/ui/clinical-case-viewer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Casos Clínicos | Clínica Lingual Santiago",
  description:
    "Mira los resultados reales de nuestros tratamientos de ortodoncia lingual. Antes y después de casos reales en Clínica Lingual, Santiago.",
};

const clinicalCases: ClinicalCaseData[] = [
  {
    id: "caso-1",
    title: "Caso Clínico 1: Apiñamiento",
    description: "Corrección de apiñamiento dental con ortodoncia lingual, mostrando un cambio significativo en el perfil y la alineación frontal, con etapas de Antes, Durante y Después.",
    views: {
      cara: { antes: "/images/upload/Caso 1 Frontal Inicio.jpg", durante: "/images/upload/Caso 1 Frontal Durante.jpg", despues: "/images/upload/Caso 1 Frontal Final.jpg" },
      frente: { antes: "/images/upload/Caso 1 Dientes Frontal Antes.jpg", durante: "/images/upload/Caso 1 Dientes Frontal Durante.jpg", despues: "/images/upload/Caso 1 Dientes Frontal Final.jpg" },
      superior: { antes: "/images/upload/Caso 1 Dientes Adentro Inicio.jpg", durante: "/images/upload/Caso 1 Dientes Adentro Durante.jpg", despues: "/images/upload/Caso 1 Dientes Andentro Final.jpg" },
    },
  },
  {
    id: "caso-2",
    title: "Caso Clínico 2: Corrección de Estética Avanzada, Mordida Cubierta y Apiñamiento Dental",
    description: "Corrección de estética avanzada, mordida cubierta y apiñamiento dental, con registro del progreso a mitad del tratamiento.",
    views: {
      cara: { antes: "/images/upload/Caso 2 Frontal Antes.jpg", durante: "/images/upload/Caso 2 Frontal Durante.jpg", despues: "/images/upload/Caso 2 Frontal Después.jpg" },
      frente: { antes: "/images/upload/Caso 2 Dientes Frontal Antes.jpg", durante: "/images/upload/Caso 2 Dientes Frontal Durante.jpg", despues: "/images/upload/Caso 2 Dientes Frontal Después.jpg" },
      superior: { antes: "/images/upload/Caso 2 Dientes Adentro Antes.png", durante: "/images/upload/Caso 2 Dientes Adentro Durante.jpg", despues: "/images/upload/Caso 2 Dientes Adentro Después.jpg" },
    },
  },
  {
    id: "mordida-abierta",
    title: "Corrección de Mordida Abierta",
    description: "Cierre de mordida anterior con ortodoncia, mejorando la función y la estética del paciente.",
    views: {
      cara: { antes: "/images/upload/Mordida Abierta Cara Antes.png", despues: "/images/upload/Mordida Abierta Cara Después.png" },
      frente: { antes: "/images/upload/Mordida Abierta Dientes Antes.png", despues: "/images/upload/Mordida Abierta Dientes Después.png" },
    },
  },
  {
    id: "apinamiento-severo",
    title: "Resolución de Apiñamiento",
    description: "Alineación de piezas dentales para resolver apiñamiento, creando un arco fluido y natural.",
    views: {
      cara: { antes: "/images/upload/Apiñamiento Cara Antes.png", despues: "/images/upload/Apiñamiento Cara Después.png" },
      frente: { antes: "/images/upload/Apiñamiento Dientes Antes.png", despues: "/images/upload/Apiñamiento Dientes Después.png" },
    },
  },
  {
    id: "mordida-cruzada",
    title: "Corrección de Mordida Cruzada",
    description: "Expansión y desenganche de mordida cruzada para lograr oclusión armónica.",
    views: {
      cara: { antes: "/images/upload/Mordida Cruzada Cara Antes.png", despues: "/images/upload/Mordida Cruzada Cara Después.png" },
      frente: { antes: "/images/upload/Mordida Cruzada Dientes Antes.jpg", despues: "/images/upload/Mordida Cruzada Dientes Después.jpg" },
    },
  },
  {
    id: "compresion-maxilar",
    title: "Compresión Maxilar",
    description: "Corrección de compresión maxilar para un desarrollo y forma óptimos de los arcos.",
    views: {
      cara: { antes: "/images/upload/Compresión Maxilar Cara Antes.png", despues: "/images/upload/Compresión Maxilar Cara Después.jpg" },
      frente: { antes: "/images/upload/Compresión Maxilar Dientes Antes.jpg", despues: "/images/upload/Compresión Maxilar Dientes Después.png" },
    },
  },
  {
    id: "caso-alineadores-5",
    title: "Caso de Alineadores 5",
    description: "Excelentes resultados estéticos utilizando sistema Invisalign/Alineadores.",
    views: {
      cara: { antes: "/images/upload/Caso 5 Alineadores Cara Antes.jpg", despues: "/images/upload/Caso 5 Alineadores Cara Después.jpg" },
      frente: { antes: "/images/upload/Caso 5 Alineadores Dientes Antes.jpg", despues: "/images/upload/Caso 5 Alineadores Dientes Después.jpg" },
    },
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
              Transformaciones reales, desde diferentes ángulos y etapas. Cada caso demuestra la
              precisión y efectividad de la ortodoncia invisible y nuestros alineadores.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Case Viewer Section */}
      <section className="bg-background-light py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold text-text-light md:text-4xl">
                Explora nuestras transformaciones
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                Utiliza las diferentes pestañas de cada caso para cambiar la toma (Cara, Frente, Superior o Inferior) 
                y el botón inferior para navegar por las etapas del tratamiento (Antes, Durante y Después).
              </p>
            </div>
          </FadeIn>

          <div className="mt-20 flex flex-col gap-24 border-t border-text-light/10 pt-16">
            {clinicalCases.map((clinicalCase, i) => (
              <FadeIn key={clinicalCase.id} delay={0.1}>
                {/* Side-by-Side Layout for Case Details and Viewer */}
                <div className={cn("grid gap-12 lg:grid-cols-12 lg:items-start", i % 2 !== 0 && "lg:flex-row-reverse")}>
                  {/* Text Details (Left/Right alternating depending on index or responsive) */}
                  <div className={cn("lg:col-span-4 lg:sticky lg:top-32", i % 2 !== 0 && "lg:col-start-9 lg:row-start-1")}>
                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10 text-xl font-bold text-accent-gold mb-6">
                        {String(i + 1).padStart(2, "0")}
                     </div>
                    <h3 className="font-display text-3xl font-bold leading-tight text-text-light md:text-4xl">
                      {clinicalCase.title}
                    </h3>
                    <p className="mt-5 text-base leading-relaxed text-text-muted">
                      {clinicalCase.description}
                    </p>
                  </div>
                  
                  {/* Interactive Viewer Component */}
                  <div className={cn("lg:col-span-8", i % 2 !== 0 && "lg:col-start-1 lg:row-start-1")}>
                    <ClinicalCaseViewer data={clinicalCase} />
                  </div>
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
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
                ¿Listo para tu transformación?
              </h2>
              <p className="mt-4 text-base text-white/60">
                Agenda tu evaluación y lograremos la sonrisa simétrica y sana que mereces.
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
