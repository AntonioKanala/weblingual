import { FadeIn } from "@/components/animations/fade-in";
import { getBreadcrumbSchema } from "@/lib/schemas";
import { URLS } from "@/lib/constants";
import {
  ArrowRight,
  Check,
  CreditCard,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precio de la Ortodoncia Lingual en Chile | Clínica Lingual",
  description:
    "Cuánto cuesta la ortodoncia lingual en Clínica Lingual: planes de pago en cuotas, valor al contado, qué incluye la evaluación y cómo usar tu seguro complementario.",
  alternates: {
    canonical: "/precios-ortodoncia-lingual",
  },
  openGraph: {
    title: "Precio de la Ortodoncia Lingual en Chile | Clínica Lingual",
    description:
      "Planes de pago, valor al contado y qué incluye el tratamiento de ortodoncia lingual en Las Condes.",
    url: "/precios-ortodoncia-lingual",
  },
};

const includesList = [
  "Estudio inicial completo (radiografía panorámica)",
  "Diseño 3D personalizado de tus brackets",
  "Instalación de brackets linguales",
  "12 controles de seguimiento",
  "Higiene profesional incluida",
  "Atención por nuestro equipo especialista miembro ESLO",
];

const priceFaqs = [
  {
    q: "¿Cuánto cuesta la ortodoncia lingual?",
    a: "El valor depende de la complejidad de tu caso: cantidad de piezas a mover, si hay que cerrar espacios o corregir mordida, y la duración estimada del tratamiento. Como referencia, un plan reciente en Clínica Lingual fue de $250.000 de cuota inicial más 11 cuotas de $119.000 sin interés, o $1.350.000 al contado — pero el valor exacto solo se confirma tras tu evaluación.",
  },
  {
    q: "¿Puedo pagar en cuotas?",
    a: "Sí. Trabajamos con cuota inicial más cuotas sin interés con tarjeta de crédito de todos los bancos. En tu evaluación te mostramos las opciones disponibles según el valor final de tu tratamiento.",
  },
  {
    q: "¿Sirve mi seguro complementario?",
    a: "La mayoría de nuestros pacientes cubre parte del tratamiento con su seguro complementario (Consorcio, Isapres, cajas de compensación, seguros de bancos retail, entre otros). Puedes revisar cómo funciona el reembolso en nuestro blog o consultarlo directamente en tu evaluación.",
  },
  {
    q: "¿La evaluación inicial tiene costo?",
    a: "Agenda tu evaluación inicial para conocer el valor exacto de tu caso, con diagnóstico 3D y plan de tratamiento detallado.",
  },
];

export default function PreciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Precios", path: "/precios-ortodoncia-lingual" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: priceFaqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-background-dark pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Precios y financiamiento
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] text-white">
              ¿Cuánto cuesta la ortodoncia lingual?
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-white/60">
              El valor final depende de la complejidad de tu caso. Aquí te
              mostramos un ejemplo real de plan de pago y cómo funciona el
              presupuesto, para que llegues informado a tu evaluación.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Planes de referencia */}
      <section className="bg-background-dark pb-16 lg:pb-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="max-w-2xl text-sm text-white/50">
              Valores de referencia de un plan reciente, sujetos a evaluación
              inicial y factibilidad clínica de cada caso. No representan una
              promoción vigente ni un precio fijo — tu presupuesto real se
              define después del diagnóstico 3D.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10">
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
                  $119.000
                  <span className="text-base font-medium text-white/60">
                    {" "}
                    /mes
                  </span>
                </p>
                <p className="mt-4 text-sm text-white/50">
                  TC todos los bancos · Sin interés
                </p>
              </div>
            </FadeIn>

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
                <ul className="mt-8 space-y-3">
                  {includesList.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10">
              <Link
                href={URLS.agenda}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-4 text-sm font-semibold text-background-dark shadow-2xl transition-all hover:scale-[1.02] hover:shadow-accent-gold/30"
              >
                Agenda tu evaluación y recibe tu presupuesto real
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Seguros */}
      <section className="bg-background-light py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/10">
                <HeartPulse className="h-6 w-6 text-accent-gold" />
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-text-light md:text-4xl">
                Tu seguro complementario puede cubrir parte del tratamiento
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                La mayoría de nuestros pacientes cubre buena parte del valor
                con su seguro complementario. En tu evaluación revisamos qué
                plan tienes y cómo aprovecharlo.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                Sigue leyendo
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/post/reembolso-dental-consorcio-en-chile"
                    className="text-base font-medium text-text-light underline underline-offset-2 hover:text-accent-gold"
                  >
                    Reembolso dental con Consorcio en Chile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/post/companias-de-seguros-de-salud-complementarios-chile"
                    className="text-base font-medium text-text-light underline underline-offset-2 hover:text-accent-gold"
                  >
                    Compañías de seguros de salud complementarios en Chile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/post/isapres-planes-complementarios-chile-tratamientos-dentales"
                    className="text-base font-medium text-text-light underline underline-offset-2 hover:text-accent-gold"
                  >
                    Isapres y planes complementarios para tratamientos dentales
                  </Link>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f5f3f0] py-16 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-text-light md:text-3xl">
              Preguntas sobre el precio
            </h2>
          </FadeIn>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-text-light/10">
            {priceFaqs.map((f, i) => (
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
    </>
  );
}
