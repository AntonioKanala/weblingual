import { FadeIn } from "@/components/animations/fade-in";
import { URLS } from "@/lib/constants";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const checklistItems = [
  "Buscas un tratamiento 100% invisible, sin que nadie lo note",
  "Tienes un caso complejo que los alineadores no pueden resolver",
  "Eres profesional, artista o figura pública y necesitas discreción",
  "Quieres resultados precisos sin depender de tu disciplina diaria",
  "Ya usaste alineadores y no obtuviste los resultados esperados",
];

const gridImages = [
  {
    src: "/images/upload/Fotos Stock/sala de espera v2.webp",
    alt: "Paciente sonriendo con ortodoncia lingual",
  },
  {
    src: "/images/upload/Fotos Stock/Modelo lingual mano.webp",
    alt: "Consulta de ortodoncia lingual",
  },
  {
    src: "/images/upload/Fotos Stock/Modelo lingual close up.webp",
    alt: "Tratamiento de ortodoncia lingual",
  },
  {
    src: "/images/upload/Fotos Stock/dentista revisando casos.webp",
    alt: "Resultado de ortodoncia lingual",
  },
];

export const IdealForYou = () => {
  return (
    <section className="bg-[#f5f3f0] py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Heading + Checklist + CTA */}
          <FadeIn>
            <div>
              <h2 className="max-w-lg font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] text-text-light">
                La ortodoncia lingual es ideal para ti si...
              </h2>
              <p className="mt-4 text-base text-text-muted">
                Diseñamos cada tratamiento para adaptarse a tu vida. Es perfecto si:
              </p>

              <ul className="mt-8 space-y-4">
                {checklistItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-green" />
                    <span className="text-sm leading-relaxed text-text-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={URLS.agenda}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-background-dark px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-background-dark/80"
              >
                Agenda tu evaluación
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          {/* Right: 2x2 Image Grid — AG1 "Designed to Support" style */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl">
              {gridImages.map((img, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
