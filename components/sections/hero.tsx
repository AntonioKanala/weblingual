"use client";

import { ASSETS, SITE_SUBTITLE, SITE_TAGLINE, URLS } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ease = [0.25, 0.1, 0, 1] as const;

export const Hero = () => {
  return (
    <section className="relative flex min-h-screen w-full items-end overflow-hidden bg-background-dark pb-20 pt-32 lg:items-center lg:pb-32">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={ASSETS.videos.hero} type="video/mp4" />
        </video>
        {/* AG1-style overlay: dark gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 via-background-dark/70 to-background-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-background-dark/40" />
      </div>

      {/* Content — LEFT aligned like AG1 */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-5 py-2.5 backdrop-blur-sm"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-accent-gold text-accent-gold" />
              ))}
            </div>
            <span className="text-xs font-semibold tracking-wide text-accent-gold">
              +5,000 Tratamientos Finalizados
            </span>
          </motion.div>

          {/* Headline — AG1 uses huge, bold, left-aligned headlines */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="font-display text-[clamp(2rem,10vw,6rem)] font-bold leading-[1.05] tracking-tight text-white"
          >
            {SITE_TAGLINE}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-6 max-w-xl font-body text-lg leading-relaxed text-white/70 lg:text-xl"
          >
            {SITE_SUBTITLE}
          </motion.p>

          {/* CTAs — AG1 style: primary solid + secondary text link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href={URLS.agenda}
              className="group inline-flex items-center justify-center gap-3 rounded-lg bg-accent-gold px-8 py-4 font-body text-base font-semibold text-background-dark transition-all duration-300 hover:bg-accent-gold-light hover:shadow-lg hover:shadow-accent-gold/20"
            >
              Empieza tu nueva sonrisa
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href={URLS.tratamiento}
              className="group inline-flex items-center gap-2 px-4 py-4 font-body text-base font-medium text-white/80 transition-colors hover:text-white"
            >
              Conoce el tratamiento
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* ESLO Badge — AG1 "Informed Sport" style, floating right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease }}
          className="mt-10 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md lg:flex-col lg:items-center lg:px-6 lg:py-5">
            <Image
              src="/images/eslo-badge.png"
              alt="ESLO — European Society of Lingual Orthodontics"
              width={80}
              height={80}
              className="h-16 w-16 object-contain lg:h-20 lg:w-20"
            />
            <div className="lg:text-center">
              <p className="text-xs font-semibold text-white">Miembros ESLO</p>
              <p className="text-[10px] leading-tight text-white/50">
                European Society of
                <br />
                Lingual Orthodontics
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — subtle, bottom center */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll hacia el contenido"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-white/40" />
        </motion.div>
      </motion.button>
    </section>
  );
};
