import { unstable_cache } from "next/cache";
import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";
import { isSanityConfigured } from "../../sanity/env";
import {
  getSanityBlogPostBySlug,
  getSanityBlogPosts,
} from "@/sanity/lib/fetch";
import {
  CACHE_TAGS,
  REVALIDATE_SECONDS,
  revalidateBlogCache,
  revalidateCaseStudiesCache,
  revalidateTestimonialsCache,
} from "./cache";
import type { BlogPost, CaseStudy, Inquiry, Testimonial } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

async function readBlogPosts(): Promise<BlogPost[]> {
  return readJson<BlogPost[]>("blog.json", []);
}

async function readTestimonials(): Promise<Testimonial[]> {
  return readJson<Testimonial[]>("testimonials.json", []);
}

async function readCaseStudies(): Promise<CaseStudy[]> {
  return readJson<CaseStudy[]>("case-studies.json", []);
}

const getCachedBlogPosts = unstable_cache(readBlogPosts, ["blog-posts"], {
  tags: [CACHE_TAGS.blog],
  revalidate: REVALIDATE_SECONDS.content,
});

const getCachedTestimonials = unstable_cache(readTestimonials, ["testimonials"], {
  tags: [CACHE_TAGS.testimonials],
  revalidate: REVALIDATE_SECONDS.content,
});

const getCachedCaseStudies = unstable_cache(readCaseStudies, ["case-studies"], {
  tags: [CACHE_TAGS.caseStudies],
  revalidate: REVALIDATE_SECONDS.content,
});

/** Cached — use on public pages. Prefers Sanity when configured. */
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  if (isSanityConfigured()) {
    const posts = await getSanityBlogPosts();
    if (posts.length > 0) return posts;
  }
  return getCachedBlogPosts();
});

/** Uncached — use in admin API or JSON fallback */
export async function getBlogPostsFresh(): Promise<BlogPost[]> {
  if (isSanityConfigured()) {
    const posts = await getSanityBlogPosts();
    if (posts.length > 0) return posts;
  }
  return readBlogPosts();
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await writeJson("blog.json", posts);
  revalidateBlogCache();
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  if (isSanityConfigured()) {
    const post = await getSanityBlogPostBySlug(slug);
    if (post) return post;
  }
  const posts = await getCachedBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return getCachedTestimonials();
}

export async function getTestimonialsFresh(): Promise<Testimonial[]> {
  return readTestimonials();
}

export async function saveTestimonials(
  testimonials: Testimonial[]
): Promise<void> {
  await writeJson("testimonials.json", testimonials);
  revalidateTestimonialsCache();
}

export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  return getCachedCaseStudies();
});

export async function getCaseStudiesFresh(): Promise<CaseStudy[]> {
  return readCaseStudies();
}

export async function saveCaseStudies(studies: CaseStudy[]): Promise<void> {
  await writeJson("case-studies.json", studies);
  revalidateCaseStudiesCache();
}

export async function getInquiries(): Promise<Inquiry[]> {
  return readJson<Inquiry[]>("inquiries.json", []);
}

export async function saveInquiries(inquiries: Inquiry[]): Promise<void> {
  await writeJson("inquiries.json", inquiries);
}

export async function addInquiry(
  inquiry: Omit<Inquiry, "id" | "createdAt" | "read">
): Promise<Inquiry> {
  const inquiries = await getInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  inquiries.unshift(newInquiry);
  await saveInquiries(inquiries);
  return newInquiry;
}
