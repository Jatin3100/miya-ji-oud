import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const result = await verifyUser(email, password);

    if (!result.success || !result.user) {
      return NextResponse.json(
        { success: false, error: result.error || "Invalid credentials." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful. Welcome back.",
        user: result.user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API POST /api/auth/login error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
