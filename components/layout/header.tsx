"use client";

import { MobileNav } from "@/components/layout/mobile-nav";
import { ASSETS, URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClinicaDropdownOpen, setIsClinicaDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background-dark/95 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16 lg:py-5 xl:px-24">
        {/* Logo */}
        <Link href={URLS.home} className="relative h-10 w-28 shrink-0 lg:h-12 lg:w-36">
          <Image
            src={ASSETS.logo}
            alt="Clínica Lingual"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation — AG1 style: clean, spaced, minimal */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Nuestra Clínica Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsClinicaDropdownOpen(true)}
            onMouseLeave={() => setIsClinicaDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white">
              Nuestra Clínica
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {/* Dropdown Menu */}
            {isClinicaDropdownOpen && (
              <div className="absolute left-0 top-full mt-3 min-w-[200px] rounded-xl border border-white/10 bg-background-dark/95 p-2 shadow-2xl backdrop-blur-xl">
                <Link
                  href={URLS.tratamiento}
                  className="block rounded-lg px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  El Tratamiento
                </Link>
                <Link
                  href={URLS.equipo}
                  className="block rounded-lg px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Nuestro Equipo
                </Link>
              </div>
            )}
          </div>

          <Link
            href={URLS.testimonios}
            className="text-[13px] font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white"
          >
            Testimonios
          </Link>

          <Link
            href={URLS.casosClinicos}
            className="text-[13px] font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white"
          >
            Casos Clínicos
          </Link>

          <Link
            href={URLS.pago}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white"
          >
            Botón de Pago
          </Link>
        </div>

        {/* CTA Button — AG1 style: pill shape */}
        <div className="hidden lg:block">
          <Link
            href={URLS.agenda}
            className="inline-flex items-center gap-2 rounded-full bg-accent-gold px-6 py-2.5 text-sm font-semibold text-background-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            Agenda
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-white lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
