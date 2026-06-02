import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getTestimonials, saveTestimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/types";

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getTestimonials());
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as Testimonial;
  const items = await getTestimonials();
  const newItem: Testimonial = { ...body, id: body.id || crypto.randomUUID() };
  items.unshift(newItem);
  await saveTestimonials(items);
  return NextResponse.json(newItem);
}

export async function PUT(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as Testimonial;
  const items = await getTestimonials();
  const index = items.findIndex((t) => t.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[index] = body;
  await saveTestimonials(items);
  return NextResponse.json(body);
}

export async function DELETE(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  const items = (await getTestimonials()).filter((t) => t.id !== id);
  await saveTestimonials(items);
  return NextResponse.json({ success: true });
}
