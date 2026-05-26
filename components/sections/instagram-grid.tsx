"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { HASHTAG } from "@/lib/constants";
import { Instagram } from "lucide-react";
import Image from "next/image";

const instagramPosts = [
  {
    id: "1",
    image: "/images/lifestyle/paciente-riendo-perfil.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "2",
    image: "/images/lifestyle/brackets-personalizados.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "3",
    image: "/images/lifestyle/paciente-alineador-luz.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "4",
    image: "/images/lifestyle/lifestyle-sombrero-exterior.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "5",
    image: "/images/lifestyle/paciente-hombre-riendo.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "6",
    image: "/images/lifestyle/paciente-resultado.webp",
    url: "https://instagram.com/clinicalingual",
  },
];

export const InstagramGrid = () => {
  return (
    <section className="bg-[#f5f3f0] py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
            Comunidad
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-text-light md:text-4xl lg:text-5xl">
            Únete al movimiento {HASHTAG}
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Síguenos en Instagram y forma parte de la comunidad
          </p>
        </FadeIn>
      </div>

      {/* AG1-style full-bleed image grid */}
      <div className="mt-12 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6">
        {instagramPosts.map((post, i) => (
          <FadeIn key={post.id} delay={i * 0.05} direction="up">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden"
            >
              <Image
                src={post.image}
                alt={`${HASHTAG} - Post ${post.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.6vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background-dark/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="h-8 w-8 text-white" />
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
