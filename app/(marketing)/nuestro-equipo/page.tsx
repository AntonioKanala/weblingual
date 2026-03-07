import { FadeIn } from "@/components/animations/fade-in";
import { URLS } from "@/lib/constants";
import { ArrowRight, Award, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestro Equipo | Clínica Lingual Santiago",
  description:
    "Conoce al equipo de ortodoncistas especialistas en ortodoncia lingual de Clínica Lingual. Miembros de la ESLO, Las Condes, Santiago.",
};

const teamMembers = [
  {
    name: "Dr. Especialista Principal",
    role: "Director Clínico — Ortodoncista",
    bio: "Especialista en ortodoncia lingual con más de 5,000 tratamientos finalizados. Miembro activo de la ESLO (European Society of Lingual Orthodontics).",
    image:
      "https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb5ef66cf904b5ac0d8c4.webp",
    credentials: ["Miembro ESLO", "Ortodoncia Lingual", "+5,000 tratamientos"],
  },
  {
    name: "Dra. Especialista",
    role: "Ortodoncista",
    bio: "Especialista en ortodoncia con formación en técnica lingual. Enfocada en tratamientos estéticos y casos complejos de maloclusión.",
    image:
      "https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb6de8edd42cfa5a448d6.webp",
    credentials: ["Ortodoncia", "Casos complejos", "Estética dental"],
  },
];

const clinicFeatures = [
  {
    icon: Award,
    title: "Miembros ESLO",
    description:
      "European Society of Lingual Orthodontics — la sociedad que agrupa a los ortodoncistas linguales más capacitados del mundo.",
  },
  {
    icon: GraduationCap,
    title: "Formación continua",
    description:
      "Nuestro equipo se capacita constantemente en las últimas técnicas y avances de la ortodoncia lingual.",
  },
  {
    icon: MapPin,
    title: "Las Condes, Santiago",
    description:
      "Ubicados en Las Condes con instalaciones modernas y tecnología de diagnóstico 3D de última generación.",
  },
];

export default function EquipoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background-dark pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Nuestro equipo
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] text-white">
              Especialistas en ortodoncia lingual
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/60">
              Más de 5,000 tratamientos finalizados. Miembros de la ESLO.
              Formación exclusiva en la técnica lingual.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ESLO Credential Banner */}
      <section className="border-b border-text-light/5 bg-background-light py-10">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
              <Image
                src="/images/eslo-badge.png"
                alt="ESLO — European Society of Lingual Orthodontics"
                width={100}
                height={100}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div>
                <h2 className="font-display text-2xl font-bold text-text-light">
                  Miembros de la ESLO
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
                  La European Society of Lingual Orthodontics (ESLO) es la
                  sociedad científica que agrupa a los ortodoncistas linguales
                  más capacitados del mundo. Ser miembro garantiza que nuestros
                  profesionales cumplen los más altos estándares de formación y
                  práctica clínica en ortodoncia lingual.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team Members */}
      <section className="bg-background-light py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              El equipo
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
              Quiénes somos
            </h2>
            <p className="mt-3 text-sm text-text-muted">
              Actualiza con las fotos y datos reales de tu equipo.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {teamMembers.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.15}>
                <div className="group overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="font-display text-2xl font-bold text-text-light">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent-gold">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-text-muted">
                      {member.bio}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {member.credentials.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-accent-gold/10 px-3 py-1 text-[10px] font-semibold text-accent-gold"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Features */}
      <section className="bg-[#f5f3f0] py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-text-light md:text-4xl">
              Nuestra clínica
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {clinicFeatures.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-gold/10">
                    <feature.icon className="h-5 w-5 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-text-light">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {feature.description}
                    </p>
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
            <h2 className="max-w-2xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Conoce al equipo en persona
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/50">
              Agenda tu evaluación inicial y visita nuestras instalaciones en
              Las Condes.
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
