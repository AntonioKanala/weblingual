import { FadeIn } from "@/components/animations/fade-in";
import { URLS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CtaStatement = () => {
  return (
    <section className="relative overflow-hidden bg-background-dark py-32 lg:py-44">
      {/* Subtle gradient accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-accent-gold/5 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-accent-green/5 blur-[120px]" />
      </div>

      <div className="relative px-6 sm:px-10 lg:px-16 xl:px-24">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
            El paso definitivo
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h2 className="mt-6 max-w-5xl font-display text-[clamp(2rem,8vw,5.5rem)] font-bold leading-[1.05] text-white">
            El Futuro de la Ortodoncia es Lingual
          </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            La ortodoncia lingual ofrece soluciones avanzadas que mejoran la
            apariencia y función de tu sonrisa, fortaleciendo tu salud bucal a
            largo plazo.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href={URLS.tratamiento}
              className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-semibold text-background-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Aprender más sobre la Ortodoncia Invisible
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={URLS.agenda}
              className="inline-flex items-center gap-1 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              Agendar evaluación
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
