import { FadeIn } from "@/components/animations/fade-in";
import { VideoPlayer } from "@/components/ui/video-player";
import { VideoPlayerProvider } from "@/components/ui/video-player-context";
import { WhatsAppForm } from "@/components/ui/whatsapp-form";
import { videoTestimonials } from "@/content/testimonials";
import { CONTACT, URLS } from "@/lib/constants";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  EyeOff,
  Gift,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ortodoncia Invisible en Las Condes | Clínica Lingual",
  description:
    "Cambia tu sonrisa sin que nadie se entere. Brackets linguales 100% invisibles, personalizados con tecnología 3D. +5,000 tratamientos finalizados. Escríbenos por WhatsApp y agenda tu evaluación.",
  alternates: {
    canonical: "/landing/ortodoncia-invisible",
  },
  openGraph: {
    title: "Ortodoncia Invisible en Las Condes | Clínica Lingual",
    description:
      "Brackets linguales 100% invisibles. +5,000 tratamientos finalizados en Santiago.",
    url: "/landing/ortodoncia-invisible",
  },
};

// Número al que conversan los CTAs de esta landing. La landing original (lingualclinica.cl)
// usaba +56 9 7807 4000 — confirmar cuál es la línea de campaña vigente antes de publicar.
const WHATSAPP_DIGITS = "56954127979";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent("Hola, quiero información sobre la ortodoncia invisible")}`;

const benefits = [
  {
    icon: EyeOff,
    title: "Totalmente invisible",
    description:
      "Los brackets van por la cara interna de tus dientes. Nadie los ve en el 99% de las situaciones cotidianas.",
  },
  {
    icon: HeartPulse,
    title: "Para casos complejos",
    description:
      "Corrige mordidas y apiñamientos que los alineadores transparentes no pueden solucionar.",
  },
  {
    icon: Sparkles,
    title: "Hechos a tu medida",
    description:
      "Cada bracket se diseña en 3D para tus dientes: tratamiento más preciso y cómodo.",
  },
  {
    icon: BadgeCheck,
    title: "No daña el esmalte frontal",
    description:
      "Al ir por dentro, tus dientes se ven intactos durante y después del tratamiento.",
  },
];

const team = [
  {
    name: "Dr. José Kuhn",
    role: "Cirujano Dentista",
    image: "/images/upload/Jose Kuhn.webp",
    credential: "Registro N° 403439",
  },
  {
    name: "Dr. Pablo Bórquez",
    role: "Cirujano Dentista",
    image: "/images/upload/Pablo Borquez.webp",
    credential: "Registro N° 477222",
  },
  {
    name: "Dra. Bárbara Sepúlveda",
    role: "Cirujana Dentista",
    image: "/images/upload/Bárbara Sepúlveda.webp",
    credential: "Registro N° 435023",
  },
  {
    name: "Dr. Vicente Martínez",
    role: "Cirujano Dentista",
    image: "/images/upload/Vicente Martinez.webp",
    credential: "Registro N° 612851",
  },
];

const evaluationIncludes = [
  "Conversación con un especialista sobre tu caso",
  "Revisión clínica y diagnóstico inicial",
  "Plan de tratamiento con plazos estimados",
  "Presupuesto claro y opciones de pago en cuotas",
];

const faqs = [
  {
    q: "¿De verdad no se ven los brackets?",
    a: "Correcto. Van adheridos a la cara interna (lingual) de los dientes, por lo que son invisibles desde fuera. Es la única técnica de ortodoncia verdaderamente invisible: no hay alineadores ni brackets a la vista.",
  },
  {
    q: "¿Me costará hablar?",
    a: "Los primeros días hay una adaptación natural de la lengua. Más del 95% de nuestros pacientes recupera el habla normal en menos de dos semanas.",
  },
  {
    q: "¿Sirve para mi caso?",
    a: "La ortodoncia lingual resuelve desde apiñamientos leves hasta mordidas complejas que los alineadores no pueden tratar. En la evaluación inicial confirmamos si tu caso aplica y te damos un plazo estimado.",
  },
  {
    q: "¿Cuánto cuesta y cómo se paga?",
    a: "El valor depende de cada caso y se define en tu presupuesto tras la evaluación. Trabajamos con cuota inicial más cuotas sin interés con tarjeta de crédito, y muchos pacientes cubren parte con su seguro complementario.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: `Estamos en ${CONTACT.addressShort}, con estacionamiento en el edificio. También puedes partir la conversación por WhatsApp sin moverte de tu casa.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function LandingOrtodonciaInvisiblePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-background-dark pt-24 lg:pt-28">
        <div className="relative grid lg:min-h-[680px] lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center px-6 pb-16 pt-12 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
            <FadeIn>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent-gold text-accent-gold"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-white/70">
                  +5,000 tratamientos finalizados
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,4.8vw,4.25rem)] font-bold leading-[1.05] text-white">
                Cambia tu sonrisa sin que nadie se entere.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                Ortodoncia lingual 100% invisible en Las Condes: brackets
                personalizados con tecnología 3D que van por la cara interna de
                tus dientes.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#evaluacion"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-4 text-sm font-semibold text-background-dark shadow-2xl transition-all hover:scale-[1.02] hover:shadow-accent-gold/30"
                >
                  Quiero mi evaluación
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
                >
                  <MessageCircle className="h-4 w-4 text-green-400" />
                  WhatsApp directo
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-accent-gold" />
                  Miembros ESLO
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-accent-gold" />
                  Las Condes, Santiago
                </span>
              </div>
            </FadeIn>
          </div>

          <div className="relative h-[55vh] min-h-[380px] w-full lg:h-auto lg:min-h-0">
            <Image
              src="/images/lifestyle/paciente-resultado.webp"
              alt="Paciente sonriendo con su resultado de ortodoncia lingual invisible"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background-dark via-transparent to-transparent lg:block" />
          </div>
        </div>
      </section>

      {/* OFERTA BANNER */}
      <section className="bg-accent-gold">
        <div className="px-6 py-8 sm:px-10 lg:px-16 lg:py-10 xl:px-24">
          <FadeIn>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4 md:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background-dark/10 md:h-14 md:w-14">
                  <Gift className="h-6 w-6 text-background-dark md:h-7 md:w-7" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-background-dark md:text-2xl">
                    Blanqueamiento gratis este mes
                  </h2>
                  <p className="mt-1 text-sm text-background-dark/80 md:text-base">
                    Si inicias tu tratamiento de brackets invisibles tras tu
                    evaluación inicial.
                  </p>
                </div>
              </div>
              <a
                href="#evaluacion"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-background-dark px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-all hover:scale-[1.02] hover:bg-black"
              >
                Aprovechar ahora
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EL FUTURO ES LINGUAL */}
      <section className="bg-background-light py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                Ortodoncia invisible
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                El futuro de la ortodoncia es lingual.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
                La ortodoncia lingual ofrece soluciones avanzadas que mejoran la
                apariencia y función de tu sonrisa, fortaleciendo tu salud bucal
                a largo plazo.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
                A diferencia de los brackets tradicionales y los alineadores,
                los brackets linguales trabajan las 24 horas, no dependen de tu
                disciplina y no se ven: sigues con tu vida normal mientras tu
                sonrisa cambia.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/images/lifestyle/brackets-personalizados.webp"
                  alt="Brackets linguales personalizados diseñados con tecnología 3D"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-background-dark py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Beneficios
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white md:text-4xl">
              Por qué miles ya eligieron la ortodoncia lingual
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-accent-gold/30 hover:bg-white/[0.07]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/15">
                    <b.icon className="h-6 w-6 text-accent-gold" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
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

      {/* EQUIPO */}
      <section className="bg-background-light py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Nuestro equipo
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-text-light md:text-4xl">
              Conoce a las personas detrás de Clínica Lingual
            </h2>
            <p className="mt-4 max-w-xl text-base text-text-muted">
              Expertos en ortodoncia, alineadores y brackets — con registro de
              la Superintendencia de Salud.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role} en Clínica Lingual`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold text-text-light">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-accent-gold">
                      {member.role}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {member.credential}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-8">
              <Link
                href={URLS.equipo}
                className="inline-flex items-center gap-2 text-sm font-medium text-text-light underline-offset-4 hover:underline"
              >
                Ver todo el equipo
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIOS EN VIDEO */}
      <section className="bg-[#f5f3f0] py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Testimonios reales
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-text-light md:text-4xl">
              Pacientes reales, con nombre y rostro
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
        </div>
      </section>

      {/* FORMULARIO WHATSAPP */}
      <section id="evaluacion" className="bg-background-light py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                Da el primer paso
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Cuéntanos de tu sonrisa y te respondemos por WhatsApp.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
                Tu evaluación inicial incluye:
              </p>
              <ul className="mt-5 space-y-3">
                {evaluationIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base text-text-light"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-2 text-sm text-text-muted">
                <p className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent-gold" />
                  <a href={CONTACT.phoneHref} className="hover:underline">
                    {CONTACT.phone}
                  </a>
                </p>
                <br />
                <p className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent-gold" />
                  {CONTACT.address}
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="rounded-3xl border border-text-light/10 bg-white p-6 shadow-xl sm:p-8">
                <WhatsAppForm
                  phone={WHATSAPP_DIGITS}
                  source="Landing Ortodoncia Invisible"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f5f3f0] py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
              Lo que todos preguntan antes de empezar
            </h2>
          </FadeIn>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-text-light/10">
            {faqs.map((f, i) => (
              <FadeIn key={f.q} delay={i * 0.05}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-left">
                    <span className="font-display text-base font-bold text-text-light md:text-lg">
                      {f.q}
                    </span>
                    <span className="mt-1 text-accent-gold transition-transform group-open:rotate-45">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
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
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-background-dark py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/lifestyle/paciente-riendo-perfil.webp"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/90 to-background-dark/60" />
        </div>
        <div className="relative px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] text-white">
              Nadie tiene por qué enterarse. Solo notar el resultado.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/60">
              Escríbenos hoy y da el primer paso hacia tu nueva sonrisa.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#evaluacion"
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-4 text-sm font-semibold text-background-dark shadow-2xl transition-all hover:scale-[1.02] hover:shadow-accent-gold/30"
              >
                Quiero mi evaluación
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-green-400" />
                O escríbenos directo por WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
