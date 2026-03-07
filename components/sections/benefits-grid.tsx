"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { benefits } from "@/content/benefits";
import Image from "next/image";

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

      {/* AG1-style dark horizontal scroll — text overlays image */}
      <div className="mt-12 lg:mt-16">
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 sm:px-10 lg:gap-5 lg:px-16 xl:px-24"
          style={{ scrollbarWidth: "none" }}
        >
          {benefits.map((benefit, i) => (
            <FadeIn key={benefit.id} delay={i * 0.1} direction="up">
              <div className="w-[300px] flex-shrink-0 snap-start sm:w-[340px] lg:w-[360px]">
                <div className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl">
                  {/* Uppercase label — top left */}
                  <div className="absolute left-0 top-0 z-10 p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
                      {benefit.id === "invisible"
                        ? "Estética"
                        : benefit.id === "eficaz"
                          ? "Eficacia clínica"
                          : benefit.id === "personalizado"
                            ? "Tecnología 3D"
                            : "Protección dental"}
                    </span>
                  </div>

                  {/* Image fills entire card */}
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="360px"
                  />

                  {/* Dark gradient overlay from bottom for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Text overlaying image — bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 lg:p-6">
                    <h3 className="font-display text-xl font-bold text-white lg:text-2xl">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
