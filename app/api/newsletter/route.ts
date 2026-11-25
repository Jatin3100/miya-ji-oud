import { NextRequest, NextResponse } from "next/server";
import { addSubscriber, getSubscribers } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const result = await addSubscriber(email);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      alreadySubscribed: result.alreadySubscribed,
    });
  } catch (error: any) {
    console.error("API POST /api/newsletter error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process newsletter subscription" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error: any) {
    console.error("API GET /api/newsletter error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}