import { NextRequest, NextResponse } from "next/server";
import { addContactMessage, getContactMessages } from "@/lib/db";

export async function GET() {
  try {
    const messages = await getContactMessages();
    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error: any) {
    console.error("API GET /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const result = await addContactMessage({ name, email, phone, message });
    return NextResponse.json({
      success: true,
      message: "Your message has been received by our Royal Concierge.",
      id: result.id,
    });
  } catch (error: any) {
    console.error("API POST /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit message" },
      { status: 500 }
    );
  }
}