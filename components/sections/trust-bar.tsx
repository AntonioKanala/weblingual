import { FadeIn } from "@/components/animations/fade-in";
import { FlaskConical, Users } from "lucide-react";
import Image from "next/image";

const credentials = [
  {
    icon: "eslo",
    text: "Miembros de la ESLO",
    subtext: "European Society of Lingual Orthodontics",
  },
  {
    icon: "science",
    text: "Respaldado por biomecánica",
    subtext: "Traslación pura cerca del centro de resistencia",
  },
  {
    icon: "patients",
    text: "+5,000 tratamientos finalizados",
    subtext: "Experiencia clínica comprobada en Chile",
  },
];

export const TrustBar = () => {
  return (
    <section className="border-b border-text-light/5 bg-background-light py-6 lg:py-8">
      <FadeIn>
        <div className="flex flex-col items-start gap-6 px-6 sm:px-10 md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-20 lg:px-16 xl:px-24">
          {credentials.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              {item.icon === "eslo" ? (
                <Image
                  src="/images/eslo-badge.png"
                  alt="ESLO"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : item.icon === "science" ? (
                <FlaskConical className="h-5 w-5 text-text-muted" />
              ) : (
                <Users className="h-5 w-5 text-text-muted" />
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-text-light">
                  {item.text}
                </p>
                <p className="text-[10px] text-text-muted">
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};
