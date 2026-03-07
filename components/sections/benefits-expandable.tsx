"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { benefits } from "@/content/benefits";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Quote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const BenefitsExpandable = () => {
  const [activeId, setActiveId] = useState(benefits[0].id);
  const activeBenefit = benefits.find((b) => b.id === activeId)!;

  return (
    <section className="bg-[#f5f3f0] py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
            Por qué elegirnos
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl lg:text-5xl">
            Lo que nos hace diferentes
          </h2>
        </FadeIn>

        {/* AG1 Quality Standards layout: image left + accordion right */}
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Active benefit image */}
          <FadeIn direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeBenefit.image}
                    alt={activeBenefit.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>

          {/* Right — Accordion items */}
          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-0 divide-y divide-text-light/10">
              {benefits.map((benefit) => {
                const isActive = activeId === benefit.id;
                return (
                  <div key={benefit.id} className="py-6 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setActiveId(benefit.id)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <h3
                        className={cn(
                          "font-display text-lg font-bold transition-colors lg:text-xl",
                          isActive ? "text-text-light" : "text-text-muted"
                        )}
                      >
                        {benefit.title}
                      </h3>
                      <ChevronDown
                        className={cn(
                          "mt-1 h-5 w-5 shrink-0 transition-all duration-300",
                          isActive
                            ? "rotate-180 text-accent-gold"
                            : "text-text-muted"
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.35, ease: [0.25, 0.1, 0, 1] },
                            opacity: { duration: 0.25 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4">
                            <p className="text-base leading-relaxed text-text-muted">
                              {benefit.longDescription}
                            </p>

                            {benefit.testimonial && (
                              <div className="mt-5 flex gap-3 rounded-xl bg-white p-4">
                                <Quote className="mt-0.5 h-5 w-5 shrink-0 text-accent-gold" />
                                <div>
                                  <p className="text-sm italic text-text-light">
                                    &ldquo;{benefit.testimonial.quote}&rdquo;
                                  </p>
                                  <p className="mt-2 text-xs font-semibold text-accent-gold">
                                    — {benefit.testimonial.name}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
