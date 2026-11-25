import { NextResponse } from "next/server";
import { getFeaturedGallery } from "@/lib/db";

export async function GET() {
  try {
    const gallery = await getFeaturedGallery();
    return NextResponse.json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error: any) {
    console.error("API GET /api/featured error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch featured gallery" },
      { status: 500 }
    );
  }
}