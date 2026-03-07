import { FadeIn } from "@/components/animations/fade-in";
import Image from "next/image";

const brands = [
  {
    name: "Ciencia",
    image:
      "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d95cd0ec821a7386a9942.png",
  },
  {
    name: "Materiales Premium",
    image:
      "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d962e96b7578b4f63c3ec.png",
  },
  {
    name: "Optimización",
    image:
      "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d967f9d31c71e063d22c3.png",
  },
  {
    name: "Confianza Profesional",
    image:
      "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d96c0d91b508f2955b9c0.png",
  },
  {
    name: "Evolución Constante",
    image:
      "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d97730c2bc7ae6b21bce9.png",
  },
  {
    name: "Eco-friendly",
    image:
      "https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d977248971adac2065d80.png",
  },
];

export const BrandMarquee = () => {
  return (
    <section className="bg-background-light py-14 lg:py-20">
      <FadeIn>
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          Tecnología y certificaciones que nos respaldan
        </p>

        {/* AG1-style: static logo row, clean, no animation */}
        <div className="flex flex-wrap items-center justify-center gap-10 px-6 sm:px-10 lg:gap-16 lg:px-16 xl:px-24">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-14 w-28 items-center justify-center opacity-40 transition-opacity duration-300 hover:opacity-80 lg:w-32"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={120}
                height={50}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};
