import { FadeIn } from "@/components/animations/fade-in";
import {
  BLOG_CATEGORIES,
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";
import { getBlogPostingSchema, getBreadcrumbSchema } from "@/lib/schemas";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const generateStaticParams = () =>
  getAllBlogSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    // Sin sufijo de marca: varios títulos originales ya rondan el límite de
    // 60 caracteres y el sufijo los empujaría a truncarse en el SERP.
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/post/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/post/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.coverImage }],
    },
  };
};

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogPostingSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/post/${post.slug}` },
            ]),
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-background-dark pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <FadeIn>
            <Link
              href={`/blog#${post.category}`}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold"
            >
              {BLOG_CATEGORIES[post.category]}
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] text-white">
              {post.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-6 flex items-center gap-5 text-sm text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTimeMinutes} min de lectura
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-background-light">
        <div className="mx-auto -mt-10 max-w-4xl px-6 sm:px-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
            />
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-background-light py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          <div
            className="
              [&_p]:mt-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-text-muted [&_p]:first:mt-0
              [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text-light
              [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-text-light
              [&_strong]:font-semibold [&_strong]:text-text-light
              [&_a]:font-medium [&_a]:text-accent-gold [&_a]:underline [&_a]:underline-offset-2
              [&_ul]:mt-5 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-text-muted [&_ul]:[list-style-type:disc]
              [&_ol]:mt-5 [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:text-text-muted [&_ol]:[list-style-type:decimal]
              [&_li]:leading-relaxed
              [&_img]:mt-6 [&_img]:w-full [&_img]:rounded-2xl [&_img]:object-cover
              [&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent-gold [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-text-light
            "
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />

          <FadeIn>
            <div className="mt-12 rounded-3xl bg-[#f5f3f0] p-8 text-center sm:p-10">
              <p className="font-display text-xl font-bold text-text-light">
                ¿Listo para dar el primer paso?
              </p>
              <p className="mt-2 text-sm text-text-muted">
                Agenda tu evaluación inicial y resuelve tus dudas con un
                especialista en ortodoncia lingual.
              </p>
              <Link
                href="/agenda-tu-sonrisa-perfecta"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-gold px-7 py-3.5 text-sm font-semibold text-background-dark transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                Agenda tu evaluación inicial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-[#f5f3f0] py-16 lg:py-20">
          <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
            <FadeIn>
              <h2 className="font-display text-2xl font-bold text-text-light md:text-3xl">
                Sigue leyendo
              </h2>
            </FadeIn>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <FadeIn key={r.slug} delay={i * 0.08}>
                  <Link
                    href={`/post/${r.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#f5f3f0]">
                      <Image
                        src={r.coverImage}
                        alt={r.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-base font-bold leading-snug text-text-light">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
