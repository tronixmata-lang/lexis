import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, legalMatter, message, source } = body;

    if (!name || !phone || !email || !legalMatter) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const inquiry = await addInquiry({
      name: String(name),
      phone: String(phone),
      email: String(email),
      legalMatter: String(legalMatter),
      message: message ? String(message) : undefined,
      source: source ? String(source) : "website",
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch {
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
