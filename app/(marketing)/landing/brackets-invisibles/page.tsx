import { FadeIn } from "@/components/animations/fade-in";
import { VideoPlayer } from "@/components/ui/video-player";
import { VideoPlayerProvider } from "@/components/ui/video-player-context";
import { videoTestimonials } from "@/content/testimonials";
import { CONTACT, URLS } from "@/lib/constants";
import {
  ArrowRight,
  Check,
  Clock,
  CreditCard,
  EyeOff,
  Gift,
  HeartPulse,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brackets Invisibles | Ortodoncia Lingual — Clínica Lingual Santiago",
  description:
    "Tu sonrisa perfecta sin que nadie se entere. Brackets 100% invisibles, personalizados con tecnología 3D. Cuota inicial $250.000 + 11 cuotas sin interés. Evaluación inicial gratis en Las Condes.",
};

const benefits = [
  {
    icon: EyeOff,
    title: "100% Invisible",
    description: "Olvídate de los brackets metálicos. Nadie verá tu tratamiento.",
  },
  {
    icon: Sparkles,
    title: "Personalizados 3D",
    description: "Cada bracket hecho a la medida de tus dientes con tecnología digital.",
  },
  {
    icon: HeartPulse,
    title: "Eficaz",
    description: "Resuelve casos complejos que los alineadores no pueden corregir.",
  },
  {
    icon: Clock,
    title: "Trabaja 24/7",
    description: "Sin pausas, sin disciplina. Tu tratamiento avanza solo.",
  },
];

const includesList = [
  "Estudio inicial completo (radiografía panorámica)",
  "Diseño 3D personalizado de tus brackets",
  "Instalación de brackets linguales",
  "12 controles de seguimiento",
  "Higiene profesional incluida",
  "Atención por nuestro equipo especialista miembro ESLO",
];

const faqs = [
  {
    q: "¿Realmente no se ven los brackets?",
    a: "Correcto. Al ir adheridos a la cara interna (lingual) de los dientes, son 100% invisibles desde fuera. Es la única técnica de ortodoncia verdaderamente invisible.",
  },
  {
    q: "¿Me afectará el habla?",
    a: "Hay una leve adaptación los primeros días. Más del 95% de pacientes recupera el habla normal en menos de 2 semanas.",
  },
  {
    q: "¿Cuánto dura el tratamiento?",
    a: "Entre 12 y 18 meses dependiendo de la complejidad de tu caso. En la evaluación inicial te damos un plazo estimado.",
  },
  {
    q: "¿Puedo financiar el tratamiento?",
    a: "Sí. Trabajamos con cuota inicial + 11 cuotas sin interés con tarjeta de crédito de todos los bancos. Si tienes seguro complementario, gran parte se puede cubrir por esa vía.",
  },
  {
    q: "¿Sirve para casos complejos?",
    a: "Sí. La ortodoncia lingual resuelve mordidas cruzadas, apiñamientos severos, extracciones y maloclusiones Clase II y III — casos donde los alineadores no son efectivos.",
  },
];

export default function LandingBracketsInvisiblesPage() {
  return (
    <>
      {/* HERO — Split 50/50 layout (Invisalign-style) */}
      <section className="relative overflow-hidden bg-background-dark pt-24 lg:pt-28">
        <div className="relative grid lg:min-h-[720px] lg:grid-cols-2">
          {/* LEFT — Text on dark */}
          <div className="relative z-10 flex flex-col justify-center px-6 pb-16 pt-12 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
            <FadeIn>
              <div className="inline-flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent-gold" />
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-gold">
                  Brackets invisibles
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,4.8vw,4.5rem)] font-bold leading-[1.02] text-white">
                Tu sonrisa perfecta sin que nadie se entere.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-7 inline-flex max-w-fit items-center gap-3 rounded-full bg-accent-gold px-5 py-2.5 shadow-lg shadow-accent-gold/20">
                <EyeOff className="h-4 w-4 text-background-dark" />
                <span className="text-sm font-semibold text-background-dark">
                  Invisibles, cómodos, eficaces y personalizados
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-7 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                La única ortodoncia verdaderamente invisible. Hechos a medida con
                tecnología 3D — sin alineadores que se vean ni depender de tu disciplina.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href={URLS.agenda}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-4 text-sm font-semibold text-background-dark shadow-2xl transition-all hover:scale-[1.02] hover:shadow-accent-gold/30"
                >
                  Agenda tu evaluación gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.phone}
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="mt-7 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="text-sm text-white/60">+5,000 tratamientos finalizados · Miembros ESLO</p>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — Lifestyle photo full-bleed */}
          <div className="relative h-[60vh] min-h-[400px] w-full lg:h-auto lg:min-h-0">
            <Image
              src="/images/lifestyle/paciente-riendo-perfil.webp"
              alt="Paciente sonriendo después de su tratamiento de ortodoncia lingual"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient fade into dark on the left edge for lg+ */}
            <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background-dark via-transparent to-transparent lg:block" />

            {/* Circular promo badge — top right */}
            <div className="absolute right-4 top-4 z-20 sm:right-8 sm:top-8 lg:right-10 lg:top-10">
              <div className="relative flex h-32 w-32 -rotate-12 items-center justify-center rounded-full bg-accent-gold p-4 shadow-2xl shadow-black/40 sm:h-36 sm:w-36 md:h-40 md:w-40">
                <div className="text-center leading-tight text-background-dark">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-wider md:text-xs">
                    Paga en
                  </p>
                  <p className="font-display text-2xl font-bold md:text-3xl">
                    11 cuotas
                  </p>
                  <p className="font-display text-[10px] font-semibold uppercase tracking-wider md:text-xs">
                    sin interés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO CTA BANNER — Full-width gold (Invisalign-style) */}
      <section className="relative overflow-hidden bg-accent-gold">
        <div className="px-6 py-8 sm:px-10 lg:px-16 lg:py-10 xl:px-24">
          <FadeIn>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4 md:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background-dark/10 md:h-14 md:w-14">
                  <Gift className="h-6 w-6 text-background-dark md:h-7 md:w-7" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-background-dark md:text-2xl lg:text-3xl">
                    Tu primera evaluación dental es gratis
                  </h2>
                  <p className="mt-1 text-sm text-background-dark/80 md:text-base">
                    Análisis 3D + plan personalizado con un especialista miembro de la ESLO. Sin compromiso.
                  </p>
                </div>
              </div>
              <Link
                href={URLS.agenda}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-background-dark px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-all hover:scale-[1.02] hover:bg-black"
              >
                Agenda tu hora dental
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* QUÉ ES */}
      <section className="bg-background-light py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                ¿Qué es?
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Brackets que van por dentro, no por fuera.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
                Los brackets linguales se adhieren a la cara interna de tus dientes
                — el lado que mira hacia tu lengua. Son completamente invisibles desde el exterior y se fabrican a medida para tu boca usando escaneo 3D y diseño digital.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
                A diferencia de los alineadores, no dependen de tu disciplina:
                trabajan las 24 horas del día y resuelven casos complejos que otras
                técnicas no pueden tratar.
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="/images/lifestyle/brackets-personalizados.webp"
                  alt="Brackets linguales personalizados con tecnología 3D"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4 BENEFICIOS */}
      <section className="bg-background-dark py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Beneficios
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Por qué elegir ortodoncia lingual
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-accent-gold/30 hover:bg-white/[0.07]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/15">
                    <b.icon className="h-6 w-6 text-accent-gold" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-white">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {b.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGEN LIFESTYLE FULL-BLEED */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden lg:h-[70vh]">
        <Image
          src="/images/lifestyle/paciente-riendo-perfil.webp"
          alt="Paciente sonriendo después de su tratamiento de ortodoncia lingual"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/30 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-16 lg:items-center lg:pb-0">
          <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
            <FadeIn>
              <p className="font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl max-w-2xl text-balance">
                &ldquo;Cambia tu sonrisa sin que nadie se entere.&rdquo;
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* POR QUÉ CLÍNICA LINGUAL */}
      <section className="bg-background-light py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                ¿Por qué Clínica Lingual?
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Especialistas exclusivos en ortodoncia lingual.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
                Somos la primera clínica en Chile dedicada exclusivamente a la
                ortodoncia lingual. Nuestro equipo está formado por especialistas
                miembros de la ESLO, capacitados en las técnicas más avanzadas.
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <ul className="space-y-4">
                {[
                  {
                    title: "+5,000 tratamientos finalizados",
                    sub: "Experiencia clínica comprobada en Chile.",
                  },
                  {
                    title: "Miembros ESLO",
                    sub: "European Society of Lingual Orthodontics — el estándar mundial.",
                  },
                  {
                    title: "Tecnología 3D propia",
                    sub: "Escaneo intraoral + diseño digital de cada bracket.",
                  },
                  {
                    title: "Ubicación premium en Las Condes",
                    sub: "Instalaciones modernas, estacionamiento, fácil acceso.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-gold/10">
                      <Check className="h-5 w-5 text-accent-gold" />
                    </div>
                    <div>
                      <p className="font-display text-base font-bold text-text-light">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-text-muted">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TECNOLOGÍA */}
      <section className="bg-[#f5f3f0] py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/images/lifestyle/box-atencion-paciente.webp"
                  alt="Tecnología 3D Clínica Lingual"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                Tecnología
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
                Escaneo intraoral 3D y diseño digital de cada bracket.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
                En tu evaluación inicial hacemos un escaneo digital de tu boca
                (sin moldes incómodos). Con ese escáner diseñamos en 3D el plan de tu tratamiento y la posición exacta de cada bracket, hecho a la medida de tus dientes.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
                Esto asegura ajuste perfecto, máxima comodidad y movimientos
                dentales precisos desde el primer día.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROMO / OFERTA */}
      <section className="bg-background-dark py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Promoción vigente
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Inicia tu tratamiento este mes y aprovecha tu seguro complementario.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Como recién empieza el año, tu seguro complementario tiene el tope
              anual completo disponible. La mayoría de nuestros pacientes cubre
              buena parte del tratamiento por esa vía.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Cuotas */}
            <FadeIn delay={0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-accent-gold/30 bg-gradient-to-br from-accent-gold/10 to-transparent p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-accent-gold" />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-gold">
                    Plan en cuotas
                  </p>
                </div>
                <p className="mt-6 font-display text-2xl font-bold text-white md:text-3xl">
                  Cuota inicial
                </p>
                <p className="mt-2 font-display text-4xl font-bold text-accent-gold md:text-5xl">
                  $250.000
                </p>
                <p className="mt-6 font-display text-xl font-bold text-white">
                  + 11 cuotas sin interés
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-accent-gold md:text-4xl">
                  $119.000<span className="text-base font-medium text-white/60"> /mes</span>
                </p>
                <p className="mt-4 text-sm text-white/50">
                  TC todos los bancos · Sin interés
                </p>
              </div>
            </FadeIn>

            {/* Contado */}
            <FadeIn delay={0.2}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-accent-gold" />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-gold">
                    Al contado
                  </p>
                </div>
                <p className="mt-6 font-display text-2xl font-bold text-white md:text-3xl">
                  Paga al contado
                </p>
                <p className="mt-2 font-display text-4xl font-bold text-accent-gold md:text-5xl">
                  $1.350.000
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-gold/15 px-4 py-1.5">
                  <span className="text-xs font-semibold text-accent-gold">
                    Ahorras $210.000
                  </span>
                </div>
                <ul className="mt-8 space-y-3">
                  {includesList.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-white/40">
              Promoción válida hasta el 30 de abril del año en curso. No acumulable
              con otros descuentos o convenios. Sujeta a evaluación inicial y
              factibilidad clínica del caso.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10">
              <Link
                href={URLS.agenda}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-4 text-sm font-semibold text-background-dark shadow-2xl transition-all hover:scale-[1.02] hover:shadow-accent-gold/30"
              >
                Quiero agendar mi evaluación
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-[#f5f3f0] py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Testimonios reales
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
                    className="bg-white shadow-sm"
                  />
                </FadeIn>
              ))}
            </div>
          </VideoPlayerProvider>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex justify-center">
              <Link
                href={URLS.testimonios}
                className="inline-flex items-center gap-2 rounded-full border border-text-light/20 px-6 py-3 text-sm font-medium text-text-light transition-all hover:border-text-light/40 hover:bg-text-light/5"
              >
                Ver más testimonios
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA EMOCIONAL FINAL */}
      <section className="relative overflow-hidden bg-background-dark py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/lifestyle/paciente-resultado.webp"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/90 to-background-dark/60" />
        </div>

        <div className="relative px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.05] text-white">
              Tu mejor sonrisa empieza con una evaluación.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/60">
              Conversamos contigo en 15 minutos, revisamos tu caso y te hacemos
              el cálculo real con tu seguro. Sin compromiso.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href={URLS.agenda}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-4 text-sm font-semibold text-background-dark shadow-2xl transition-all hover:scale-[1.02] hover:shadow-accent-gold/30"
              >
                Reserva tu evaluación gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {CONTACT.phone}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background-light py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
              Resolvemos tus dudas
            </h2>
          </FadeIn>

          <div className="mt-12 mx-auto max-w-3xl divide-y divide-text-light/10">
            {faqs.map((f, i) => (
              <FadeIn key={f.q} delay={i * 0.05}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-left">
                    <span className="font-display text-base font-bold text-text-light md:text-lg">
                      {f.q}
                    </span>
                    <span className="mt-1 text-accent-gold transition-transform group-open:rotate-45">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 4a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H5a1 1 0 1 1 0-2h4V5a1 1 0 0 1 1-1z" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                    {f.a}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-12 flex justify-center">
              <Link
                href={URLS.agenda}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-semibold text-background-dark transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                Reserva una hora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
