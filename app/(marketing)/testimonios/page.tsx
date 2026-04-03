import { FadeIn } from "@/components/animations/fade-in";
import { VideoPlayer } from "@/components/ui/video-player";
import { URLS } from "@/lib/constants";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonios | Clínica Lingual Santiago",
  description:
    "Conoce las historias reales de nuestros pacientes. +5,000 tratamientos de ortodoncia lingual finalizados con éxito en Santiago, Chile.",
};

import { GoogleReviews } from "@/components/sections/google-reviews";
import { videoTestimonials } from "@/content/testimonials";

export default function TestimoniosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background-dark pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <div className="mb-4 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-accent-gold text-accent-gold"
                />
              ))}
            </div>
            <p className="text-sm text-white/50">
              +5,000 tratamientos finalizados con éxito
            </p>
          </FadeIn>

          <FadeIn>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] text-white">
              Más de 5,000 pacientes satisfechos
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
             <p className="mt-6 max-w-xl text-lg text-white/60">
               Historias reales de personas que transformaron su sonrisa con
               nuestros especialistas en Clínica Lingual.
             </p>
          </FadeIn>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="bg-background-light py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Videos & Casos
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
              Escucha sus historias
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videoTestimonials.map((t, i) => (
              <FadeIn key={t.id} delay={(i % 3) * 0.1}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <VideoPlayer
                    type={t.type === "video" ? "youtube" : (t.type as any || "youtube")}
                    src={t.videoUrl!}
                    title={`Testimonio de ${t.name}`}
                    className="rounded-none bg-[#f5f3f0]"
                  />
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="font-display text-base font-semibold text-text-light italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-auto pt-4 flex items-center gap-3">
                      {t.image && (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent-gold/20">
                          <Image src={t.image} alt={t.name} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-accent-gold">
                          {t.name}
                        </p>
                        {t.type === "instagram" && (
                           <p className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">Instagram Reel</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* CTA */}
      <section className="bg-background-dark py-24 lg:py-32">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <h2 className="max-w-2xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Sé el próximo caso de éxito
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/50">
              Más de 5,000 personas ya transformaron su sonrisa. Tú puedes ser
              la siguiente.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href={URLS.agenda}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-gold px-8 py-3.5 text-sm font-semibold text-background-dark transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              Agenda tu evaluación inicial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
