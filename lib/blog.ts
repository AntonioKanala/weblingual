import fs from "fs";
import path from "path";

export type BlogCategory =
  | "ortodoncia-lingual"
  | "comparativas"
  | "cuidado-diario"
  | "seguros-y-financiamiento"
  | "clinica-lingual";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  readTimeMinutes: number;
  category: BlogCategory;
  wordCount: number;
  bodyHtml: string;
};

export type BlogPostSummary = Omit<BlogPost, "bodyHtml">;

export const BLOG_CATEGORIES: Record<BlogCategory, string> = {
  "ortodoncia-lingual": "Ortodoncia Lingual",
  comparativas: "Comparativas",
  "cuidado-diario": "Cuidado Diario",
  "seguros-y-financiamiento": "Seguros y Financiamiento",
  "clinica-lingual": "Clínica Lingual",
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog-posts");

/**
 * Publicación programada: un post con publishedAt futuro vive en el repo
 * (y se despliega) pero se mantiene invisible -- fuera de /blog, del
 * sitemap y de la home -- hasta que su fecha llega. No hay caché de
 * módulo aquí a propósito: junto con `revalidate` en las páginas que
 * consumen esto, permite que un post programado aparezca solo con el
 * paso del tiempo, sin un nuevo deploy.
 */
const loadAllPosts = (): BlogPost[] => {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  const todayIso = new Date().toISOString().slice(0, 10);
  const posts = files
    .map(
      (file) =>
        JSON.parse(
          fs.readFileSync(path.join(POSTS_DIR, file), "utf-8"),
        ) as BlogPost,
    )
    .filter((post) => post.publishedAt <= todayIso);
  posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return posts;
};

export const getAllBlogPosts = (): BlogPostSummary[] =>
  loadAllPosts().map((post) => {
    const summary: Partial<BlogPost> = { ...post };
    delete summary.bodyHtml;
    return summary as BlogPostSummary;
  });

export const getAllBlogSlugs = (): string[] =>
  loadAllPosts().map((p) => p.slug);

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  loadAllPosts().find((p) => p.slug === slug);

export const getRelatedBlogPosts = (
  post: BlogPost,
  limit = 3,
): BlogPostSummary[] =>
  getAllBlogPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
