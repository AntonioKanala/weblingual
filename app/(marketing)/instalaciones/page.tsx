import { FadeIn } from "@/components/animations/fade-in";
import { getBreadcrumbSchema } from "@/lib/schemas";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { LocationMap } from "@/components/ui/location-map";
import { CONTACT, URLS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestras Instalaciones | Clínica Lingual Santiago",
  description:
    "Conoce nuestras instalaciones en Las Condes: recepción, sala de espera, box clínico, sala de presupuestos, sala de análisis de casos y estacionamiento.",
  alternates: {
    canonical: "/instalaciones",
  },
  openGraph: {
    title: "Nuestras Instalaciones | Clínica Lingual Santiago",
    description:
      "Conoce nuestras instalaciones en Las Condes: box clínico, salas de análisis y más.",
    url: "/instalaciones",
  },
};

type Space = {
  title: string;
  description: string;
  image: string;
};

const FALLBACK = "/images/team/placeholder.png";

const spaces: Space[] = [
  {
    title: "Estacionamiento",
    description:
      "Estacionamientos disponibles en el edificio con acceso directo a la clínica para que tu llegada sea cómoda.",
    image: "/images/instalaciones/estacionamiento.webp",
  },
  {
    title: "Espacio co-work",
    description:
      "Un ambiente luminoso y cómodo donde puedes esperar trabajando o conectarte con nuestro equipo en un entorno relajado.",
    image: "/images/instalaciones/recepcion.webp",
  },
  {
    title: "Sala de espera",
    description:
      "Diseñada para que esperes con comodidad, con un ambiente cuidado y tranquilo antes de tu atención.",
    image: "/images/instalaciones/sala-espera.webp",
  },
  {
    title: "Box clínico",
    description:
      "Equipado con tecnología de última generación para realizar tu tratamiento con la mayor precisión y seguridad.",
    image: "/images/instalaciones/box.webp",
  },
  {
    title: "Sala de presupuestos",
    description:
      "Un espacio privado donde conversamos contigo el plan de tratamiento y las alternativas de financiamiento.",
    image: "/images/instalaciones/presupuestos.webp",
  },
  {
    title: "Sala de análisis de casos",
    description:
      "Donde nuestro equipo planifica cada caso en detalle, revisando radiografías, escáneres 3D y diseñando tu tratamiento.",
    image: "/images/instalaciones/analisis-casos.webp",
  },
];

export default function InstalacionesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Instalaciones", path: "/instalaciones" },
            ]),
          ),
        }}
      />
      {/* Hero */}
      <section className="bg-background-dark pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Nuestras instalaciones
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] text-white">
              Un espacio pensado para ti
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-white/60">
              Conoce los espacios donde te atendemos: desde la recepción hasta
              el box clínico, cada área está diseñada para que tu experiencia
              sea cómoda, segura y profesional.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Spaces Grid */}
      <section className="bg-background-light py-16 lg:py-20">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {spaces.map((space, i) => (
              <FadeIn key={space.title} delay={(i % 3) * 0.1}>
                <div className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f3f0]">
                    <ImageWithFallback
                      src={space.image}
                      fallbackSrc={FALLBACK}
                      alt={space.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-text-light">
                      {space.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {space.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-[#f5f3f0] py-16 lg:py-20">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                Ubicación
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
                Encuéntranos en Las Condes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                {CONTACT.address}
              </p>
              <a
                href={CONTACT.phoneHref}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-gold transition-colors hover:text-accent-gold-light"
              >
                {CONTACT.phone}
              </a>
            </FadeIn>
            <FadeIn delay={0.1}>
              <LocationMap />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-dark py-20 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <h2 className="max-w-2xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Visítanos en persona
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/50">
              Agenda tu evaluación inicial y conoce nuestras instalaciones.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href={URLS.agenda}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-semibold text-background-dark transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              Agenda tu evaluación inicial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
