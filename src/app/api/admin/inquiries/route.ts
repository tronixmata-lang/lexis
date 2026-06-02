import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getInquiries, saveInquiries } from "@/lib/data";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getInquiries());
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, read } = await request.json();
  const inquiries = await getInquiries();
  const index = inquiries.findIndex((i) => i.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  inquiries[index].read = read;
  await saveInquiries(inquiries);
  return NextResponse.json(inquiries[index]);
}
