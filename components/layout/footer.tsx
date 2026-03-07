import { ASSETS, CONTACT, HASHTAG, URLS } from "@/lib/constants";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark">
      {/* Main Footer — AG1 style: generous spacing, muted text, clean grid */}
      <div className="px-6 py-16 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-6 lg:col-span-1">
            <div className="relative h-12 w-36">
              <Image
                src={ASSETS.logo}
                alt="Clínica Lingual"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/40">
              Especialistas en ortodoncia lingual en Las Condes, Santiago.
              +5,000 tratamientos finalizados.
            </p>
            <p className="text-sm font-medium text-accent-gold">
              {HASHTAG}
            </p>
          </div>

          {/* Clínica Column */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Clínica
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={URLS.tratamiento}
                  className="text-sm text-white/40 transition-colors hover:text-white"
                >
                  El Tratamiento
                </Link>
              </li>
              <li>
                <Link
                  href={URLS.equipo}
                  className="text-sm text-white/40 transition-colors hover:text-white"
                >
                  Nuestro Equipo
                </Link>
              </li>
              <li>
                <Link
                  href={URLS.casosClinicos}
                  className="text-sm text-white/40 transition-colors hover:text-white"
                >
                  Casos Clínicos
                </Link>
              </li>
            </ul>
          </div>

          {/* Pacientes Column */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Pacientes
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={URLS.testimonios}
                  className="text-sm text-white/40 transition-colors hover:text-white"
                >
                  Testimonios
                </Link>
              </li>
              <li>
                <Link
                  href={URLS.agenda}
                  className="text-sm text-white/40 transition-colors hover:text-white"
                >
                  Agenda tu Evaluación
                </Link>
              </li>
              <li>
                <Link
                  href={URLS.pago}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 transition-colors hover:text-white"
                >
                  Botón de Pago
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto Column */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/40">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold/60" />
                <span>{CONTACT.location}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/40">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold/60" />
                <span>+56 9 XXXX XXXX</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/40">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold/60" />
                <span>contacto@clinicalingual.cl</span>
              </li>
            </ul>

            {/* Social Media Links — AG1 style: subtle circles */}
            <div className="mt-6 flex items-center gap-2">
              {[
                { href: "https://instagram.com/clinicalingual", label: "Instagram", icon: "IG" },
                { href: "https://facebook.com/clinicalingual", label: "Facebook", icon: "FB" },
                { href: "https://youtube.com/@clinicalingual", label: "YouTube", icon: "YT" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-xs font-medium text-white/40 transition-all hover:border-accent-gold/40 hover:text-accent-gold"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
            <p className="text-xs text-white/30">
              © {currentYear} Clínica Lingual. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacidad"
                className="text-xs text-white/30 transition-colors hover:text-white/60"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-xs text-white/30 transition-colors hover:text-white/60"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
