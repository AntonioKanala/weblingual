"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Star } from "lucide-react";
import Image from "next/image";

const G_LOGO = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";

const mockReviews = [
  {
    id: 1,
    author: "Catalina Muñoz",
    rating: 5,
    text: "Excelente experiencia en Clínica Lingual. El proceso de ortodoncia invisible fue exactamente lo que prometieron. Nadie notó que llevaba brackets y los resultados son espectaculares. El Dr. Díaz y su equipo son unos verdaderos profesionales.",
    date: "Hace 2 semanas",
  },
  {
    id: 2,
    author: "Felipe Arriagada",
    rating: 5,
    text: "La mejor decisión que pude tomar. Fui por un tratamiento de alineadores y me explicaron todo al detalle. La clínica es de primer nivel, super moderna y la atención es un 10/10 desde que entras por la puerta.",
    date: "Hace 1 mes",
  },
  {
    id: 3,
    author: "Daniela Rivas",
    rating: 5,
    text: "Me daba mucho nervio empezar un tratamiento de ortodoncia, pero el equipo técnico de Clínica Lingual me dio demasiada confianza. Cero dolor, muy estético y los controles mensuales son súper rápidos. %100 recomendados en Santiago.",
    date: "Hace 2 meses",
  },
];

export const GoogleReviews = () => {
  return (
    <section className="bg-background-light py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <FadeIn>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-widest text-text-muted">
                Excelencia en Google Reviews
              </span>
            </div>
            
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-light md:text-4xl lg:text-5xl">
              Lo que dicen nuestros pacientes
            </h2>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              <div className="flex flex-col items-end border-r border-text-light/10 pr-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="mt-1 font-bold text-text-light text-xl">5.0</p>
              </div>
              <div className="flex items-center gap-3">
                <Image src={G_LOGO} alt="Google logo" width={32} height={32} className="h-8 w-8" />
                <div className="text-left leading-tight">
                  <p className="font-semibold text-text-light">Mejor valorados</p>
                  <a 
                    href="https://www.google.com/search?kgmid=/g/11vz9ph2wf&hl=es-CL&q=Cl%C3%ADnica+Lingual+%7C+Cl%C3%ADnica+de+Ortodoncia+Invisible+en+Las+Condes" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-text-muted hover:text-accent-gold transition-colors font-medium underline-offset-4 hover:underline"
                  >
                    Ver todas las reseñas en Google →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {mockReviews.map((review, i) => (
            <FadeIn key={review.id} delay={i * 0.1} direction="up">
              <div className="flex h-full flex-col rounded-3xl border border-text-light/5 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/10 font-display font-bold text-accent-gold">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-text-light leading-none">{review.author}</p>
                      <p className="text-xs text-text-muted mt-1">{review.date}</p>
                    </div>
                  </div>
                  <Image src={G_LOGO} alt="Google Icon" width={20} height={20} className="opacity-80" />
                </div>
                
                <div className="mt-5 flex gap-1">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                
                <p className="mt-4 text-sm leading-relaxed text-text-muted flex-grow">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn delay={0.4}>
            <div className="mt-16 flex justify-center">
              <a
                href="https://www.google.com/search?kgmid=/g/11vz9ph2wf&hl=es-CL&q=Cl%C3%ADnica+Lingual+%7C+Cl%C3%ADnica+de+Ortodoncia+Invisible+en+Las+Condes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-text-light/20 bg-transparent px-8 py-3 text-sm font-semibold text-text-light transition-all hover:bg-black/5 hover:border-text-light/40"
              >
                Dejar una reseña en Google
              </a>
            </div>
        </FadeIn>
      </div>
    </section>
  );
};
