"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { benefits } from "@/content/benefits";
import type { Benefit } from "@/types";
import Image from "next/image";

const benefitLabel = (id: Benefit["id"]) => {
  if (id === "invisible") return "Estética";
  if (id === "eficaz") return "Eficacia clínica";
  if (id === "personalizado") return "Tecnología 3D";
  return "Protección dental";
};

const BenefitCard = ({ benefit }: { benefit: Benefit }) => (
  <div className="group relative aspect-[3/4] h-full cursor-pointer overflow-hidden rounded-2xl">
    <div className="absolute left-0 top-0 z-10 p-5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
        {benefitLabel(benefit.id)}
      </span>
    </div>
    <Image
      src={benefit.image}
      alt={benefit.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      sizes="(max-width: 1024px) 320px, 25vw"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 z-10 p-5 lg:p-6">
      <h3 className="font-display text-xl font-bold text-white lg:text-2xl">
        {benefit.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        {benefit.description}
      </p>
    </div>
  </div>
);

export const BenefitsGrid = () => {
  return (
    <section className="bg-background-dark py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <FadeIn>
          <h2 className="max-w-xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Beneficios de la Ortodoncia Lingual
          </h2>
        </FadeIn>
      </div>

      {/* Mobile: horizontal scroll · Desktop: 4-col grid filling width */}
      <div className="mt-12 lg:mt-16">
        {/* Mobile horizontal scroll */}
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 sm:px-10 lg:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {benefits.map((benefit, i) => (
            <FadeIn key={benefit.id} delay={i * 0.1} direction="up">
              <div className="w-[280px] flex-shrink-0 snap-start sm:w-[320px]">
                <BenefitCard benefit={benefit} />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden px-6 sm:px-10 lg:block lg:px-16 xl:px-24">
          <div className="grid grid-cols-4 gap-5 xl:gap-6">
            {benefits.map((benefit, i) => (
              <FadeIn key={benefit.id} delay={i * 0.1} direction="up">
                <BenefitCard benefit={benefit} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
