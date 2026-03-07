"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { faqItems } from "@/content/faq";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="bg-background-light py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* AG1-style: two-column layout with heading left, accordion right */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          {/* Left: Heading */}
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                FAQ
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl lg:text-5xl">
                Preguntas Frecuentes
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Todo lo que necesitas saber sobre la ortodoncia lingual.
              </p>
            </div>
          </FadeIn>

          {/* Right: Accordion */}
          <FadeIn delay={0.2}>
            <div className="divide-y divide-text-light/10">
              {faqItems.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="py-6 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-start justify-between gap-4 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-lg font-semibold transition-colors duration-200",
                          isOpen ? "text-text-light" : "text-text-light/80"
                        )}
                      >
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-1 h-5 w-5 shrink-0 text-accent-gold transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-base leading-relaxed text-text-muted">
                            {item.answer}
                          </p>
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
