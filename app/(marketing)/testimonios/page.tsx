import { FadeIn } from "@/components/animations/fade-in";
import { VideoPlayer } from "@/components/ui/video-player";
import { URLS } from "@/lib/constants";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonios | Clínica Lingual Santiago",
  description:
    "Conoce las historias reales de nuestros pacientes. +5,000 tratamientos de ortodoncia lingual finalizados con éxito en Santiago, Chile.",
};

const videoTestimonials = [
  {
    id: "bayron",
    name: "Bayron",
    quote: "No tuve que operarme",
    subtitle: "Para todos los casos",
    videoId: "OAm3zlpruY0",
  },
  {
    id: "xiomara",
    name: "Xiomara",
    quote: "Quería que fuera secreto",
    subtitle: "Tratamiento invisible",
    videoId: "K24wjfBe8GE",
  },
  {
    id: "hao",
    name: "Hao W.",
    quote: "Mil veces mejor que los normales",
    subtitle: "Estos no se ven",
    videoId: "FQRNqkHoA6c",
  },
];

const writtenTestimonials = [
  {
    name: "Werner M.",
    date: "Mayo 2023",
    quote:
      "Nunca pensé que podría corregir mis dientes sin que nadie lo notara. La ortodoncia lingual me dio la confianza de sonreír durante todo el tratamiento. ¡Los resultados son increíbles!",
  },
  {
    name: "María M.",
    date: "Mayo 2023",
    quote:
      "Tenía un caso complicado que otros métodos no podían tratar. La ortodoncia lingual solucionó todos mis problemas dentales de forma discreta y eficaz.",
  },
  {
    name: "José R.",
    date: "Junio 2023",
    quote:
      "Los frenillos linguales son la mejor solución para quienes desean corregir su sonrisa sin comprometer la estética.",
  },
  {
    name: "Yamila R.",
    date: "2023",
    quote:
      "Nadie se dio cuenta. De hecho cuando yo comentaba que tenía brackets, todos me decían: ¿Dónde están?",
  },
  {
    name: "María C.",
    date: "2023",
    quote:
      "A la semana de ponérmelos estaba cantando igual que antes. La adaptación fue mucho más rápida de lo que esperaba.",
  },
  {
    name: "Teresita D.",
    date: "2023",
    quote:
      "En la adolescencia me puse los frenillos tradicionales y no quería lo mismo, pero si necesitaba brackets para arreglar mi mordida. La ortodoncia lingual fue la solución perfecta.",
  },
];

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

          <FadeIn delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] text-white">
              Más de 5,000 pacientes satisfechos
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/60">
              Historias reales de personas que transformaron su sonrisa con
              ortodoncia lingual en Clínica Lingual.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="bg-background-light py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Videos
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
              Escucha sus historias
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {videoTestimonials.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.1}>
                <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <VideoPlayer
                    type="youtube"
                    src={t.videoId}
                    title={`Testimonio de ${t.name}`}
                    className="rounded-none"
                  />
                  <div className="p-5">
                    <p className="font-display text-lg font-semibold text-text-light">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="mt-2 text-sm font-medium text-accent-gold">
                      {t.name}
                    </p>
                    <p className="text-xs text-text-muted">{t.subtitle}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="bg-[#f5f3f0] py-20 lg:py-28">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Reseñas
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-light md:text-4xl">
              Lo que dicen nuestros pacientes
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {writtenTestimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.05}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="mb-3 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-3 w-3 fill-accent-gold text-accent-gold"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-text-light">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs font-semibold text-text-muted">
                      — {t.name}
                    </p>
                    <p className="text-[10px] text-text-muted/60">{t.date}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
