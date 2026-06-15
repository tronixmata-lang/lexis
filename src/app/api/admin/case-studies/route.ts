import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCaseStudiesFresh, saveCaseStudies } from "@/lib/data";
import type { CaseStudy } from "@/lib/types";

async function requireAuth() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getCaseStudiesFresh());
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as CaseStudy;
  const items = await getCaseStudiesFresh();
  const newItem: CaseStudy = { ...body, id: body.id || crypto.randomUUID() };
  items.unshift(newItem);
  await saveCaseStudies(items);
  return NextResponse.json(newItem);
}

export async function PUT(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as CaseStudy;
  const items = await getCaseStudiesFresh();
  const index = items.findIndex((s) => s.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[index] = body;
  await saveCaseStudies(items);
  return NextResponse.json(body);
}

export async function DELETE(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  const items = (await getCaseStudiesFresh()).filter((s) => s.id !== id);
  await saveCaseStudies(items);
  return NextResponse.json({ success: true });
}
