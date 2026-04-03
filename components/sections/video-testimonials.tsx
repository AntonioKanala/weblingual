"use client";

import { VideoPlayer } from "@/components/ui/video-player";
import { FadeIn } from "@/components/animations/fade-in";
import { videoTestimonials } from "@/content/testimonials";
import { URLS } from "@/lib/constants";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const VideoTestimonials = () => {
  return (
    <section className="bg-background-light py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* Left: Heading + CTA — AG1 "Over 50,000 Satisfied Customers" style */}
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-gold text-accent-gold" />
                ))}
              </div>
              <p className="text-sm text-text-muted">
                +5,000 tratamientos finalizados con éxito
              </p>

              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-text-light md:text-4xl lg:text-[2.75rem]">
                Más de 5,000 pacientes satisfechos
              </h2>

              <Link
                href={URLS.testimonios}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-text-light/20 px-6 py-3 text-sm font-medium text-text-light transition-all hover:border-text-light/40 hover:bg-text-light/5"
              >
                Ver todos los testimonios
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </FadeIn>

          {/* Right: Video cards in row — AG1 style portrait thumbnails */}
          <div className="grid gap-5 sm:grid-cols-3">
            {videoTestimonials.filter(t => t.type !== "instagram").slice(0, 3).map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.1} direction="up">
                <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Video */}
                  <VideoPlayer
                    type={testimonial.type === "video" ? "youtube" : ((testimonial.type as "youtube" | "native" | "instagram") || "youtube")}
                    src={testimonial.videoUrl!}
                    title={`Testimonio de ${testimonial.name}`}
                    className="rounded-none"
                  />

                  {/* Content */}
                  <div className="flex flex-col p-5">
                    <p className="font-display text-base italic text-text-light mb-4 text-balance">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      {testimonial.image && (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent-gold/20">
                          <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                        </div>
                      )}
                      <p className="text-sm font-bold text-text-muted">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
