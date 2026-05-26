"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { URLS } from "@/lib/constants";
import { journeySteps } from "@/content/journey-steps";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Journey = () => {
  return (
    <section className="bg-background-dark py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
            Tu proceso
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Así es como inicia tu viaje
          </h2>
        </FadeIn>
      </div>

      {/* Mobile: horizontal scroll · Desktop: 4-col grid filling width */}
      <div className="mt-12 lg:mt-16">
        {/* Mobile horizontal scroll */}
        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 sm:px-10 lg:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {journeySteps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1} direction="up">
              <div className="w-[280px] flex-shrink-0 snap-start">
                <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="280px"
                    />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold text-sm font-bold text-background-dark">
                      {step.number}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Desktop grid — uses full width with connector line between steps */}
        <div className="hidden px-6 sm:px-10 lg:block lg:px-16 xl:px-24">
          <div className="relative grid grid-cols-4 gap-6 xl:gap-8">
            {/* Connector line behind step numbers */}
            <div
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[37%] hidden h-px bg-gradient-to-r from-accent-gold/0 via-accent-gold/40 to-accent-gold/0 lg:block"
              aria-hidden
            />
            {journeySteps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.1} direction="up">
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1280px) 25vw, 360px"
                    />
                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-accent-gold text-base font-bold text-background-dark shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="p-6 xl:p-7">
                    <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* CTA — centered */}
      <FadeIn delay={0.5}>
        <div className="mt-12 flex justify-center px-6 lg:mt-14">
          <Link
            href={URLS.agenda}
            className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-semibold text-background-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            Agenda tu evaluación inicial
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
};
