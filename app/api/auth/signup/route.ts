import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, phone } = body;

    const result = await createUser({
      name,
      email,
      password,
      phone,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Signup failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Welcome to the Miya Ji Oud Royal Patronage.",
        user: result.user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API POST /api/auth/signup error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during signup." },
      { status: 500 }
    );
  }
}
