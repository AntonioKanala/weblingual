"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { HASHTAG } from "@/lib/constants";
import { Instagram } from "lucide-react";
import Image from "next/image";

const instagramPosts = [
  {
    id: "1",
    image:
      "https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/66dd4ecfab806ec7a53a9ada.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "2",
    image:
      "https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb5ef66cf904b5ac0d8c4.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "3",
    image:
      "https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb6de8edd42cfa5a448d6.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "4",
    image:
      "https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb7ef22549f5498daded8.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "5",
    image:
      "https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb493350bac47a8e031e2.webp",
    url: "https://instagram.com/clinicalingual",
  },
  {
    id: "6",
    image:
      "https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/66dd4ecf766f9862f1350235.webp",
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
