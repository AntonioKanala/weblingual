"use client";

import { Button } from "@/components/ui/button";
import { ASSETS, URLS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [isClinicaOpen, setIsClinicaOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background-dark/95 backdrop-blur-md lg:hidden"
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm bg-background-dark shadow-2xl lg:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-text-dark/10 p-6">
                <div className="relative h-10 w-28">
                  <Image
                    src={ASSETS.logo}
                    alt="Clínica Lingual"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-text-dark transition-colors hover:bg-text-dark/10"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-6">
                <div className="space-y-2">
                  {/* Nuestra Clínica Accordion */}
                  <div>
                    <button
                      onClick={() => setIsClinicaOpen(!isClinicaOpen)}
                      className="flex w-full items-center justify-between rounded-lg p-3 text-left font-body text-base font-medium text-text-dark transition-colors hover:bg-text-dark/5"
                    >
                      Nuestra Clínica
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${isClinicaOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isClinicaOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pl-4 pt-2">
                            <Link
                              href={URLS.tratamiento}
                              onClick={onClose}
                              className="block rounded-lg p-3 text-sm text-text-dark/80 transition-colors hover:bg-accent-gold/10 hover:text-accent-gold"
                            >
                              El Tratamiento
                            </Link>
                            <Link
                              href={URLS.equipo}
                              onClick={onClose}
                              className="block rounded-lg p-3 text-sm text-text-dark/80 transition-colors hover:bg-accent-gold/10 hover:text-accent-gold"
                            >
                              Nuestro Equipo
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Other Links */}
                  <Link
                    href={URLS.testimonios}
                    onClick={onClose}
                    className="block rounded-lg p-3 font-body text-base font-medium text-text-dark transition-colors hover:bg-text-dark/5"
                  >
                    Testimonios
                  </Link>

                  <Link
                    href={URLS.casosClinicos}
                    onClick={onClose}
                    className="block rounded-lg p-3 font-body text-base font-medium text-text-dark transition-colors hover:bg-text-dark/5"
                  >
                    Casos Clínicos
                  </Link>

                  <Link
                    href={URLS.pago}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="block rounded-lg p-3 font-body text-base font-medium text-text-dark transition-colors hover:bg-text-dark/5"
                  >
                    Botón de Pago
                  </Link>
                </div>
              </nav>

              {/* CTA Button */}
              <div className="border-t border-text-dark/10 p-6">
                <Link href={URLS.agenda} onClick={onClose}>
                  <Button variant="cta" className="w-full" showArrow>
                    Agenda tu Evaluación
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
