import { FadeIn } from "@/components/animations/fade-in";
import { BLOG_CATEGORIES, getAllBlogPosts, type BlogCategory } from "@/lib/blog";
import { getBreadcrumbSchema } from "@/lib/schemas";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// Revalida cada hora para que los posts programados (publishedAt futuro)
// aparezcan solos en su fecha, sin necesitar un nuevo deploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Ortodoncia Lingual y Salud Bucal | Clínica Lingual",
  description:
    "Guías, cuidados y respuestas a tus dudas sobre ortodoncia lingual, brackets invisibles, alineadores y seguros dentales en Chile.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Ortodoncia Lingual y Salud Bucal | Clínica Lingual",
    description:
      "Guías y respuestas sobre ortodoncia lingual, brackets invisibles y seguros dentales en Chile.",
    url: "/blog",
  },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = Object.keys(BLOG_CATEGORIES) as BlogCategory[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema([{ name: "Blog", path: "/blog" }])),
        }}
      />

      {/* Hero */}
      <section className="bg-background-dark pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Blog
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] text-white">
              Todo sobre ortodoncia lingual
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg text-white/60">
              Guías, cuidados diarios, comparativas y respuestas a las preguntas
              más frecuentes sobre brackets linguales, alineadores y seguros
              dentales en Chile.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category pills (anchors, sin JS) */}
      <section className="border-b border-text-light/10 bg-background-light py-6">
        <div className="flex flex-wrap gap-3 px-6 sm:px-10 lg:px-16 xl:px-24">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="rounded-full border border-text-light/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted transition-colors hover:border-accent-gold hover:text-accent-gold"
            >
              {BLOG_CATEGORIES[cat]}
            </a>
          ))}
        </div>
      </section>

      {/* Post grid, agrupado por categoría */}
      <section className="bg-background-light py-16 lg:py-24">
        <div className="space-y-20 px-6 sm:px-10 lg:px-16 xl:px-24">
          {categories.map((cat) => {
            const catPosts = posts.filter((p) => p.category === cat);
            if (catPosts.length === 0) return null;
            return (
              <div key={cat} id={cat} className="scroll-mt-28">
                <FadeIn>
                  <h2 className="font-display text-2xl font-bold text-text-light md:text-3xl">
                    {BLOG_CATEGORIES[cat]}
                  </h2>
                </FadeIn>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {catPosts.map((post, i) => (
                    <FadeIn key={post.slug} delay={(i % 3) * 0.08}>
                      <Link
                        href={`/post/${post.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#f5f3f0]">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-display text-lg font-bold leading-snug text-text-light">
                            {post.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-muted">
                            {post.description}
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {post.readTimeMinutes} min
                            </span>
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-dark py-20 lg:py-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <h2 className="max-w-2xl font-display text-3xl font-bold text-white md:text-4xl">
              ¿Tienes dudas sobre tu caso?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-white/50">
              Agenda una evaluación inicial y resuelve tus dudas directamente
              con un especialista.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href="/agenda-tu-sonrisa-perfecta"
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
