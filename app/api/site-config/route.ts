import { NextRequest, NextResponse } from "next/server";
import { getSiteConfig, updateSiteConfig } from "@/lib/db";

export async function GET() {
  try {
    const config = await getSiteConfig();
    return NextResponse.json({
      success: true,
      data: config,
    });
  } catch (error: any) {
    console.error("API GET /api/site-config error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch site configuration" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateSiteConfig(body);
    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("API PUT /api/site-config error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update site configuration" },
      { status: 500 }
    );
  }
}