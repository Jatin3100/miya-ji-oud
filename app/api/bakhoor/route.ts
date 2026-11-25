import { NextResponse } from "next/server";
import { getBakhoorProducts } from "@/lib/db";

export async function GET() {
  try {
    const products = await getBakhoorProducts();
    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
      primaryProduct: products[0] || null,
    });
  } catch (error: any) {
    console.error("API GET /api/bakhoor error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bakhoor products" },
      { status: 500 }
    );
  }
}