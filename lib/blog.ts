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

let cache: BlogPost[] | null = null;

const loadAllPosts = (): BlogPost[] => {
  if (cache) return cache;
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  const posts = files.map(
    (file) =>
      JSON.parse(
        fs.readFileSync(path.join(POSTS_DIR, file), "utf-8"),
      ) as BlogPost,
  );
  posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  cache = posts;
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
