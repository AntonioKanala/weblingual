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

      {/* AG1-style horizontal scroll cards */}
      <div className="mt-12 lg:mt-16">
        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 sm:px-10 lg:px-16 xl:px-24"
          style={{ scrollbarWidth: "none" }}
        >
          {journeySteps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1} direction="up">
              <div className="w-[300px] flex-shrink-0 snap-start lg:w-[320px]">
                <div className="group cursor-pointer overflow-hidden rounded-2xl bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="320px"
                    />
                    {/* Step number overlay */}
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold text-sm font-bold text-background-dark">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* CTA */}
      <FadeIn delay={0.5}>
        <div className="mt-8 px-6 sm:px-10 lg:px-16 xl:px-24">
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
