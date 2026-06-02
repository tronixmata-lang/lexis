import { promises as fs } from "fs";
import path from "path";
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

export async function getBlogPosts(): Promise<BlogPost[]> {
  return readJson<BlogPost[]>("blog.json", []);
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await writeJson("blog.json", posts);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return readJson<Testimonial[]>("testimonials.json", []);
}

export async function saveTestimonials(
  testimonials: Testimonial[]
): Promise<void> {
  await writeJson("testimonials.json", testimonials);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return readJson<CaseStudy[]>("case-studies.json", []);
}

export async function saveCaseStudies(studies: CaseStudy[]): Promise<void> {
  await writeJson("case-studies.json", studies);
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
