import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getBlogPostsFresh, saveBlogPosts } from "@/lib/data";
import type { BlogPost } from "@/lib/types";

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await getBlogPostsFresh();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as BlogPost;
  const posts = await getBlogPostsFresh();
  const newPost: BlogPost = {
    ...body,
    id: body.id || crypto.randomUUID(),
    slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
  };
  posts.unshift(newPost);
  await saveBlogPosts(posts);
  return NextResponse.json(newPost);
}

export async function PUT(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as BlogPost;
  const posts = await getBlogPostsFresh();
  const index = posts.findIndex((p) => p.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  posts[index] = body;
  await saveBlogPosts(posts);
  return NextResponse.json(body);
}

export async function DELETE(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  const posts = await getBlogPostsFresh();
  const filtered = posts.filter((p) => p.id !== id);
  await saveBlogPosts(filtered);
  return NextResponse.json({ success: true });
}
