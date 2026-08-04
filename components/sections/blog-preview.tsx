import { FadeIn } from "@/components/animations/fade-in";
import { getAllBlogPosts } from "@/lib/blog";
import { URLS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const BlogPreview = () => {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section className="bg-background-light py-20 lg:py-28">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Blog
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-text-light md:text-4xl lg:text-[2.75rem]">
              Aprende más sobre ortodoncia lingual
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href={URLS.blog}
              className="inline-flex items-center gap-2 rounded-full border border-text-light/20 px-6 py-3 text-sm font-medium text-text-light transition-all hover:border-text-light/40 hover:bg-text-light/5"
            >
              Ver todo el blog
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
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
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-text-light">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
