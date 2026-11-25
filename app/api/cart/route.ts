import { NextRequest, NextResponse } from "next/server";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "@/lib/db";

export async function GET() {
  try {
    const summary = await getCart();
    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch (error: any) {
    console.error("API GET /api/cart error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const summary = await addToCart(productId, quantity);
    return NextResponse.json({
      success: true,
      message: "Product added to cart",
      data: summary,
    });
  } catch (error: any) {
    console.error("API POST /api/cart error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || typeof quantity !== "number") {
      return NextResponse.json(
        { success: false, error: "Valid productId and numeric quantity are required" },
        { status: 400 }
      );
    }

    const summary = await updateCartItem(productId, quantity);
    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch (error: any) {
    console.error("API PUT /api/cart error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    let summary;
    if (productId) {
      summary = await removeFromCart(productId);
    } else {
      summary = await clearCart();
    }

    return NextResponse.json({
      success: true,
      message: productId ? "Item removed from cart" : "Cart cleared",
      data: summary,
    });
  } catch (error: any) {
    console.error("API DELETE /api/cart error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete item from cart" },
      { status: 500 }
    );
  }
}